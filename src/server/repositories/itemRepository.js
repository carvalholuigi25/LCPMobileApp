import db from '../database/db';

export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

// Add more methods for create, update, and delete operations
// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100