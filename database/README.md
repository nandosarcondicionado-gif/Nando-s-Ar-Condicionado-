# Banco de dados

O banco oficial será PostgreSQL no Neon. Não coloque credenciais no GitHub.

A modelagem será criada em migrações versionadas e testadas. As tabelas centrais previstas incluem:
- users, roles, permissions, user_permissions, audit_logs
- customers, customer_addresses, equipment
- quotes, quote_items, quote_approvals
- service_orders, service_order_items, service_order_assignments
- appointments, appointment_events
- inventory_products, inventory_movements, service_materials
- cash_accounts, financial_entries, receivables, payables, payments
- contracts, contract_equipment, preventive_visits
- sync_devices, sync_operations

Regras obrigatórias:
1. IDs UUID gerados no cliente para permitir criação offline.
2. Cada alteração sincronizada terá ID idempotente para evitar duplicação.
3. Alterações concorrentes terão política explícita de conflito e trilha de auditoria.
4. Valores financeiros serão calculados e validados no servidor.
5. Funcionários não receberão campos financeiros em consultas ou respostas da API.
6. Migração do banco antigo será feita por cópia, conferência de contagens e validação antes da ativação.
