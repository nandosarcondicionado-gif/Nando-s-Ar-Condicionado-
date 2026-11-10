import Dexie, { type Table } from "dexie";

export type EntityName = "clientes" | "equipamentos" | "orcamentos" | "ordens" | "agenda" | "estoque" | "financeiro" | "equipe" | "contratos";
export type LocalRecord = {
  id: string; module: EntityName; title: string; details: string;
  amount: number; status: string; customer: string; date: string;
  createdAt: string; updatedAt: string; syncStatus: "local" | "pending" | "synced";
};
export type PendingChange = {
  id: string; entity: EntityName; operation: "create" | "update" | "delete";
  payload: unknown; createdAt: string; status: "pending" | "syncing" | "error"; attempts: number;
};
class ClimaProOfflineDB extends Dexie {
  records!: Table<LocalRecord, string>;
  pendingChanges!: Table<PendingChange, string>;
  constructor() {
    super("nandos-climapro-offline");
    this.version(1).stores({
      pendingChanges: "id, entity, status, createdAt"
    });
    this.version(2).stores({
      pendingChanges: "id, entity, status, createdAt",
      records: "id, module, title, customer, date, status, updatedAt, syncStatus"
    });
  }
}
export const offlineDb = new ClimaProOfflineDB();
