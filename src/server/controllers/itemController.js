import { fetchAllItems } from '../services/itemService';

export const getAllItemsController = async () => {
  try {
    const items = await fetchAllItems();
    // Handle the fetched items as needed
    console.log(items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Add more controller methods for create, update, and delete operations
// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100