import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("lcpmobileapp.db", "1.0.0", "LCP Mobile App", 200000);

const initDatabase = () => {
  if(db) {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS games (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NULL,
          platforms TEXT NULL,
          releaseDate DATETIME NULL,
          rating NUMBER NULL,
          ageRate NUMBER NULL,
          publishers TEXT NULL,
          companies TEXT NULL,
          image TEXT NULL,
          cover TEXT NULL,
          isFeatured BOOLEAN NULL
        );`,
      );
    });
  }
};

initDatabase();

export default db;

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100