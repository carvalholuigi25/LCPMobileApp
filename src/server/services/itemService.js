import { getAllItems, getAllItemsById, insertItems, updateItems, deleteItems, deleteAllItems } from '../repositories/itemRepository';

export const fetchAllItems = () => {
  return getAllItems();
};

export const fetchAllItemsById = (mid) => {
  return getAllItemsById(mid);
};

export const insertItemsData = (name, desc) => {
  return insertItems(name, desc);
};

export const updateItemsData = (mid, name, desc) => {
  return updateItems(mid, name, desc);
};

export const deleteItemsData = (mid) => {
  return deleteItems(mid);
};

export const deleteAllItemsData = () => {
  return deleteAllItems();
}

// src: https://chat.openai.com/share/dce203e7-1502-4dae-b708-7bbf49142100