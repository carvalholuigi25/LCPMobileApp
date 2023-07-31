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

export const insertGames = (item) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO games (title, description, platforms, category, gamemodes, releaseDate, rating, ageRate, publishers, companies, image, cover, isFeatured) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.title, item.description, item.platforms, item.category, item.gamemodes, item.releaseDate, item.rating, item.ageRate, item.publishers, item.companies, item.image, item.cover, item.isFeatured],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};

export const updateGames = (mid, item) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE games SET title=?, description=?, platforms=?, category=?, gamemodes=?, releaseDate=?, rating=?, ageRate=?, publishers=?, companies=?, image=?, cover=?, isFeatured=? WHERE id=?',
        [item.title, item.description, item.platforms, item.category, item.gamemodes, item.releaseDate, item.rating, item.ageRate, item.publishers, item.companies, item.image, item.cover, item.isFeatured, mid],
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