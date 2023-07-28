import { getAllItems } from '../repositories/itemRepository';

export const fetchAllItems = () => {
  return getAllItems();
};

// Add more methods for create, update, and delete operations
// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100