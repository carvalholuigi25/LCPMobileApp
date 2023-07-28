import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("lcpmobileapp.db", "1.0.0", "LCP Mobile App", 200000);

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );`,
    );
  });
};

export default db;

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100