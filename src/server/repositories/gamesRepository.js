import { useState } from 'react';
import db from '../database/db';

export const getAllGames = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM games',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

export const getAllGamesById = (mid) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM games WHERE id=?',
        [mid],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error),
      );
    });
  });
};

export const insertGames = (objdata) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO games (title, description) VALUES (?, ?)',
        [objdata.title, objdata.description],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};

export const updateGames = (mid, objdata) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE games SET title=?, description=? WHERE id=?',
        [objdata.title, objdata.description, mid],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};

export const deleteGames = (mid) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM games WHERE id=?',
        [mid],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};

export const deleteAllGames = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM games',
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100