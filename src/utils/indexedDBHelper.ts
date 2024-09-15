import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "appDB";
const STORE_NAME = "users";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    },
  });
};

export const saveUser = async (user: User): Promise<void> => {
  const db = await initDB();
  console.log(user);
  await db.put(STORE_NAME, user);
};

export const getUser = async (id: string): Promise<User | undefined> => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};
