import { fetchAllGames, fetchAllGamesById, insertGamesData, updateGamesData, deleteGamesData, deleteAllGamesData } from '../services/gamesService';

export const getAllGamesController = async () => {
  try {
    const games = await fetchAllGames();
    // Handle the fetched games as needed
    console.log(games);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

export const getAllGamesByIdController = async (mid) => {
  try {
    const games = await fetchAllGamesById(mid);
    // Handle the fetched games as needed
    console.log(games);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

export const insertGamesController = async (objdata) => {
  try {
    const games = await insertGamesData(objdata);
    // Handle the inserted games as needed
    console.log(games);
  } catch (error) {
    console.error('Error inserting games:', error);
  }
};

export const updateGamesController = async (mid, objdata) => {
  try {
    const games = await updateGamesData(mid, objdata);
    // Handle the updated games as needed
    console.log(games);
  } catch (error) {
    console.error('Error updating games:', error);
  }
};

export const deleteGamesController = async (mid) => {
  try {
    const games = await deleteGamesData(mid);
    // Handle the deleted games by id as needed
    console.log(games);
  } catch (error) {
    console.error('Error deleting games:', error);
  }
};

export const deleteAllGamesController = async () => {
  try {
    const games = await deleteAllGamesData();
    // Handle the deleted all games as needed
    console.log(games);
  } catch (error) {
    console.error('Error deleting games:', error);
  }
};

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100