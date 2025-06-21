#!/bin/bash
#
# RiskGuardian AI - Sistema Avançado de Proteção DeFi
# Author: Jistriane (jistriane@live.com)
# Description: Sistema completo de gestão de riscos para portfolios DeFi
# GitHub: https://github.com/Jistriane/RiskGuardian-AI-1.0
# LinkedIn: https://www.linkedin.com/in/jibso
# Twitter: @jistriane
# License: MIT
# Version: 1.0.0
# Created: 2025
#

# chromia/wait-for-postgres.sh
#!/bin/bash

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."

until curl -f postgres:5432 >/dev/null 2>&1; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is ready!"

# chromia/start-chromia.sh  
#!/bin/bash

echo "🔗 Starting Chromia Node with PostgreSQL backend..."

# Wait for PostgreSQL
./wait-for-postgres.sh

# Add PostgreSQL driver to classpath
export CLASSPATH="postgresql.jar:postchain.jar:$CLASSPATH"

# Start Chromia node
echo "🚀 Starting Postchain node..."
java $JAVA_OPTS \
  -cp "$CLASSPATH" \
  -Dpostchain.config.file=$POSTCHAIN_CONFIG_FILE \
  net.postchain.base.BaseConfigurationFactory \
  $POSTCHAIN_CONFIG_FILE