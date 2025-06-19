#!/bin/bash

echo "🔐 Configurando SSL/TLS Certificates - RiskGuardian AI"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create SSL directory
mkdir -p ssl/certificates ssl/private ssl/csr

echo -e "${YELLOW}📋 Escolha o tipo de certificado:${NC}"
echo "1. Certificados auto-assinados (desenvolvimento)"
echo "2. Let's Encrypt (produção)"
echo "3. Certificados customizados"

read -p "Opção (1-3): " ssl_option

case $ssl_option in
    1)
        echo -e "${BLUE}🔧 Gerando certificados auto-assinados...${NC}"
        
        # Generate private key
        openssl genrsa -out ssl/private/riskguardian.key 2048
        
        # Generate CSR
        openssl req -new -key ssl/private/riskguardian.key -out ssl/csr/riskguardian.csr -subj "/C=BR/ST=SP/L=SaoPaulo/O=RiskGuardian/OU=AI/CN=localhost"
        
        # Generate self-signed certificate
        openssl x509 -req -days 365 -in ssl/csr/riskguardian.csr -signkey ssl/private/riskguardian.key -out ssl/certificates/riskguardian.crt
        
        # Generate combined certificate for nginx
        cat ssl/certificates/riskguardian.crt ssl/private/riskguardian.key > ssl/certificates/riskguardian-combined.pem
        
        echo -e "${GREEN}✅ Certificados auto-assinados gerados!${NC}"
        ;;
        
    2)
        echo -e "${BLUE}🔧 Configurando Let's Encrypt...${NC}"
        
        # Install certbot if not present
        if ! command -v certbot &> /dev/null; then
            echo -e "${YELLOW}📦 Instalando Certbot...${NC}"
            sudo apt update
            sudo apt install -y certbot python3-certbot-nginx
        fi
        
        read -p "Digite seu domínio (ex: riskguardian.com): " domain_name
        read -p "Digite seu email: " email
        
        # Generate Let's Encrypt certificate
        sudo certbot certonly --standalone -d "$domain_name" --email "$email" --agree-tos --non-interactive
        
        # Copy certificates to our directory
        sudo cp "/etc/letsencrypt/live/$domain_name/fullchain.pem" ssl/certificates/riskguardian.crt
        sudo cp "/etc/letsencrypt/live/$domain_name/privkey.pem" ssl/private/riskguardian.key
        sudo chown $USER:$USER ssl/certificates/* ssl/private/*
        
        echo -e "${GREEN}✅ Certificados Let's Encrypt configurados!${NC}"
        
        # Setup auto-renewal
        echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
        ;;
        
    3)
        echo -e "${BLUE}🔧 Configuração de certificados customizados...${NC}"
        echo "Coloque seus arquivos:"
        echo "- Certificado: ssl/certificates/riskguardian.crt"
        echo "- Chave privada: ssl/private/riskguardian.key"
        echo "- Certificados intermediários: ssl/certificates/intermediate.crt (opcional)"
        ;;
esac

# Generate Diffie-Hellman parameters for enhanced security
echo -e "${BLUE}🔧 Gerando parâmetros Diffie-Hellman...${NC}"
openssl dhparam -out ssl/certificates/dhparam.pem 2048

# Set proper permissions
chmod 600 ssl/private/*
chmod 644 ssl/certificates/*

# Create nginx SSL configuration
cat > ssl/nginx-ssl.conf << EOF
# SSL Configuration for RiskGuardian AI
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name localhost;

    # SSL Certificates
    ssl_certificate /app/ssl/certificates/riskguardian.crt;
    ssl_certificate_key /app/ssl/private/riskguardian.key;
    ssl_dhparam /app/ssl/certificates/dhparam.pem;

    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_timeout 10m;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://backend:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # ElizaOS Agent
    location /elizaos {
        proxy_pass http://elizaos-agent:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name localhost;
    return 301 https://\$server_name\$request_uri;
}
EOF

echo -e "${GREEN}✅ Configuração SSL/TLS concluída!${NC}"
echo -e "${BLUE}📋 Arquivos gerados:${NC}"
echo "- ssl/certificates/riskguardian.crt"
echo "- ssl/private/riskguardian.key"
echo "- ssl/certificates/dhparam.pem"
echo "- ssl/nginx-ssl.conf"
echo ""
echo -e "${YELLOW}⚠️  Próximos passos:${NC}"
echo "1. Atualize docker-compose.yml para usar a configuração SSL"
echo "2. Reinicie os containers com SSL habilitado"
echo "3. Teste HTTPS em https://localhost" 