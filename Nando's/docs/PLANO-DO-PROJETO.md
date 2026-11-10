# Nando’s ClimaPro — plano de entrega

## Entregue nesta base
- Painel responsivo para celular e computador.
- Navegação pelos módulos: clientes, equipamentos, orçamentos, ordens de serviço, agenda, estoque, financeiro, equipe e contratos.
- Cadastro genérico local por módulo com pesquisa, edição e exclusão.
- IndexedDB/Dexie e fila local de alterações pendentes.
- Manifesto PWA e service worker básico para cache do aplicativo.
- Avisos explícitos de que sincronização na nuvem ainda não está ativa.

## Ainda precisa ser implementado e testado
- Modelos específicos e formulários completos de cada módulo.
- Neon PostgreSQL, API server-side, login e permissões reais.
- Sincronização entre aparelhos, resolução de conflitos e exclusão lógica.
- PDF profissional, assinaturas, fotos, geolocalização e WhatsApp.
- Migração dos backups do Supabase após validação.
- Testes de segurança, acessibilidade, build e operação.

## Segurança
Não usar esta versão para guardar dados reais sensíveis ou operar a empresa como sistema definitivo. O armazenamento local não é compartilhado entre aparelhos e pode ser apagado pelo navegador.
