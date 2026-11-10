# Banco Neon — preparação

A aplicação atual usa IndexedDB/Dexie no navegador para cadastros locais. **Não existe ainda conexão com Neon nem sincronização multiaparelho.**

Quando a API segura for implementada:
1. Criar projeto PostgreSQL no Neon.
2. Guardar `DATABASE_URL` somente nas variáveis privadas do servidor (nunca `NEXT_PUBLIC_`).
3. Criar tabelas com UUID, `created_at`, `updated_at`, `deleted_at`, `version` e `tenant_id`.
4. Implementar autenticação e autorização no servidor.
5. Implementar endpoint de sincronização idempotente com validação de conflito.
6. Fazer backup e importar dados antigos somente depois de conferir os arquivos exportados e os totais.

Não cole credenciais neste repositório.
