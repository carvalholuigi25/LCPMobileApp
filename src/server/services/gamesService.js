import { getAllGames, getAllGamesById, insertGames, updateGames, deleteGames, deleteAllGames } from '../repositories/gamesRepository';

export const fetchAllGames = () => {
  return getAllGames();
};

export const fetchAllGamesById = (mid) => {
  return getAllGamesById(mid);
};

export const insertGamesData = (item) => {
  return insertGames(item);
};

export const updateGamesData = (mid, item) => {
  return updateGames(mid, item);
};

export const deleteGamesData = (mid) => {
  return deleteGames(mid);
};

export const deleteAllGamesData = () => {
  return deleteAllGames();
};

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100