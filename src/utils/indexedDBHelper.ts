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
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveUser = async (user: User): Promise<void> => {
  try {
    const db = await initDB();
    await db.put(STORE_NAME, user);
  } catch (err) {
    console.error("Error saving user data:", err);
  }
};

export const getUser = async (id: string): Promise<User | undefined> => {
  try {
    const db = await initDB();
    const user = await db.get(STORE_NAME, id);
    return user;
  } catch (err) {
    console.error("Error retrieving user data:", err);
    return undefined;
  }
};

export const clearUser = async (): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.clear();
    await tx.done;
  } catch (err) {
    console.error("Error clearing user data:", err);
  }
};
