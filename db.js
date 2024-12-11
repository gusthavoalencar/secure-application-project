import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbFilePath = path.resolve('./database.db');

export const openDatabase = async () => {
  return open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
};

export const useDatabase = async (callback) => {
  const db = await openDatabase();
  try {
    return await callback(db);
  } finally {
    await db.close();
  }
};
