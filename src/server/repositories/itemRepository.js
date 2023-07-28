import { useState } from 'react';
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

export const getAllItemsById = (mid) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items WHERE id = ?',
        [mid],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

export const insertItems = (name, desc) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (name, description) VALUES (?,?)',
        [name, desc],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

export const updateItems = (mid, name, desc) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [name, desc, mid],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

export const deleteItems = (mid) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?',
        [mid],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

export const deleteAllItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100