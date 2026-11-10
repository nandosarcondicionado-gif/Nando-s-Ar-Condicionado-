import Dexie, { type Table } from "dexie";

export type PendingChange = {
  id: string;
  entity: string;
  operation: "create" | "update" | "delete";
  payload: unknown;
  createdAt: string;
  status: "pending" | "syncing" | "error";
  attempts: number;
};

class ClimaProOfflineDB extends Dexie {
  pendingChanges!: Table<PendingChange, string>;
  constructor() {
    super("nandos-climapro-offline");
    this.version(1).stores({
      pendingChanges: "id, entity, status, createdAt"
    });
  }
}
export const offlineDb = new ClimaProOfflineDB();
