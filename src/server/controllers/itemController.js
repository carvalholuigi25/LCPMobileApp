import { fetchAllItems, fetchAllItemsById, insertItemsData, updateItemsData, deleteItemsData, deleteAllItemsData } from '../services/itemService';

export const getAllItemsController = async () => {
  try {
    const items = await fetchAllItems();
    // Handle the fetched items as needed
    console.log(items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

export const getAllItemsByIdController = async (mid) => {
  try {
    const items = await fetchAllItemsById(mid);
    // Handle the fetched items as needed
    console.log(items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

export const insertItemsController = async (name, desc) => {
  try {
    const items = await insertItemsData(name, desc);
    // Handle the inserted items as needed
    console.log(items);
  } catch (error) {
    console.error('Error inserting items:', error);
  }
};

export const updateItemsController = async (mid, name, desc) => {
  try {
    const items = await updateItemsData(mid, name, desc);
    // Handle the updated items as needed
    console.log(items);
  } catch (error) {
    console.error('Error updating items:', error);
  }
};

export const deleteItemsController = async (mid) => {
  try {
    const items = await deleteItemsData(mid);
    // Handle the deleted items by id as needed
    console.log(items);
  } catch (error) {
    console.error('Error deleting items:', error);
  }
};

export const deleteAllItemsController = async () => {
  try {
    const items = await deleteAllItemsData();
    // Handle the deleted all items as needed
    console.log(items);
  } catch (error) {
    console.error('Error deleting items:', error);
  }
};

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100