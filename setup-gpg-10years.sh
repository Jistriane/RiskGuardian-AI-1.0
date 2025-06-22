#!/bin/bash

# 🔐 Script para Configurar Chave GPG com 10 Anos de Validade
# Autor: Jistriane Santos
# Email: jistriane@live.com

echo "🔐 Configurando Chave GPG para 10 Anos de Validade..."

# Verificar se a chave já existe
KEY_ID="5D6ABD573870C473"

if gpg --list-secret-keys $KEY_ID >/dev/null 2>&1; then
    echo "✅ Chave GPG encontrada: $KEY_ID"
    
    # Configurar Git para usar a chave
    echo "🔧 Configurando Git para usar a chave GPG..."
    git config --global user.signingkey $KEY_ID
    git config --global commit.gpgsign true
    git config --global tag.gpgsign true
    git config --global gpg.program gpg
    
    echo "✅ Configuração do Git concluída!"
    
    # Exportar chave pública
    echo "📤 Exportando chave pública..."
    gpg --armor --export $KEY_ID > jistriane-gpg-public-key.asc
    
    echo "✅ Chave pública exportada para: jistriane-gpg-public-key.asc"
    
    # Mostrar informações da chave
    echo ""
    echo "📋 Informações da Chave GPG:"
    gpg --list-secret-keys --keyid-format LONG $KEY_ID
    
    echo ""
    echo "🎯 Próximos Passos:"
    echo "1. Adicionar a chave pública ao GitHub:"
    echo "   - Vá para GitHub Settings > SSH and GPG keys"
    echo "   - Clique em 'New GPG key'"
    echo "   - Cole o conteúdo do arquivo jistriane-gpg-public-key.asc"
    echo ""
    echo "2. Testar assinatura:"
    echo "   git commit --amend --no-edit -S"
    echo ""
    echo "3. Verificar assinatura:"
    echo "   git log --show-signature -1"
    
    # Teste de assinatura
    echo ""
    echo "🧪 Testando assinatura..."
    if git commit --amend --no-edit -S 2>/dev/null; then
        echo "✅ Teste de assinatura bem-sucedido!"
    else
        echo "⚠️ Erro no teste de assinatura. Verifique a configuração."
    fi
    
else
    echo "❌ Chave GPG não encontrada. Criando nova chave..."
    
    # Criar nova chave com 10 anos de validade
    cat > /tmp/gpg-batch <<EOF
%echo Generating a GPG key for Jistriane Santos
Key-Type: RSA
Key-Length: 4096
Subkey-Type: RSA
Subkey-Length: 4096
Name-Real: Jistriane Santos
Name-Comment: RiskGuardian AI Developer
Name-Email: jistriane@live.com
Expire-Date: 10y
Passphrase: 
%commit
%echo done
EOF

    echo "🔑 Gerando nova chave GPG com 10 anos de validade..."
    gpg --batch --generate-key /tmp/gpg-batch
    
    # Limpar arquivo temporário
    rm /tmp/gpg-batch
    
    # Obter o ID da nova chave
    NEW_KEY_ID=$(gpg --list-secret-keys --with-colons | grep sec | cut -d: -f5 | tail -1)
    
    echo "✅ Nova chave criada: $NEW_KEY_ID"
    
    # Configurar Git
    git config --global user.signingkey $NEW_KEY_ID
    git config --global commit.gpgsign true
    git config --global tag.gpgsign true
    git config --global gpg.program gpg
    
    # Exportar chave pública
    gpg --armor --export $NEW_KEY_ID > jistriane-gpg-public-key.asc
    
    echo "✅ Configuração completa!"
fi

echo ""
echo "🔒 Configuração de Segurança GPG Concluída!"
echo "📧 Desenvolvedor: Jistriane Santos (jistriane@live.com)"
echo "🛡️ Validade: 10 anos"
echo "🔐 Proteção: Máxima segurança ativada" 