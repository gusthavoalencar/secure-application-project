import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbFilePath = path.resolve('./database.db');

const loadDatabase = async () => {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  return db;
};

export default loadDatabase;
