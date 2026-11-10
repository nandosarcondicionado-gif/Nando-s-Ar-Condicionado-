# Nando’s ClimaPro — plano de construção

## Objetivo
Criar um sistema novo, responsivo e instalável (PWA), com operação online/offline e sincronização segura, preservando os módulos e os dados do ClimaPro antigo.

## Stack inicial
- Next.js 15 + React 19 + TypeScript
- PostgreSQL no Neon
- Vercel para hospedagem
- IndexedDB/Dexie para fila e dados offline
- Service Worker para cache do app
- Sessões seguras no servidor e autorização por função/permissão

## Etapas
1. Fundação: repositório independente, ambientes, banco, autenticação, auditoria e perfis.
2. Cadastros: clientes, endereços/CEP, equipamentos e histórico.
3. Comercial: orçamentos, itens, descontos, aprovação, PDF e OS cliente/técnico.
4. Operação: agenda, capacidade diária, equipe, deslocamento e reagendamento.
5. Estoque: produtos, custos, reservas, consumo e devoluções por OS.
6. Financeiro: caixa, contas, pagamentos, conciliação e resultado por serviço.
7. Contratos: residências/empresas, parque de aparelhos e preventivas recorrentes.
8. Assistente técnico: base de conhecimento, pesquisa por marca/modelo/código e orientações de segurança.
9. Offline: operações pendentes, sincronização idempotente, conflitos e testes em dois dispositivos.
10. Migração: importar backups, comparar contagens, validar amostras e só então ativar.

## Regras de qualidade
- Nenhum dado financeiro exposto a técnico/ajudante.
- Nenhuma migração destrutiva no banco antigo.
- Sem credenciais no código ou no GitHub.
- Testes para cálculos, permissões, impressão, sincronização e restauração.
- O sistema só será considerado pronto após testes reais e conferência dos dados.
