#!/bin/bash
# Asks for the Sanity token (hidden, never stored) and fills Sanity with the current site content.
cd "$(dirname "$0")/.." || exit 1
printf "Cola o token do Sanity e carrega Enter (nao aparece no ecra): "
read -rs SANITY_WRITE_TOKEN
echo
if [ -z "$SANITY_WRITE_TOKEN" ]; then echo "Nenhum token colado."; exit 1; fi
export SANITY_WRITE_TOKEN
export SANITY_PROJECT_ID=wrh1tvdi
node scripts/seed-content-to-sanity.mjs "$@"
