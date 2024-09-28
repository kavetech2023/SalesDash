import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Sale {
  id: string;
  product: string;
  amount: number;
  date: string;
}

export interface Objective {
  id: string;
  title: string;
  target: number;
  current: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export const storeSales = async (sales: Sale[]) => {
  try {
    await AsyncStorage.setItem('@sales', JSON.stringify(sales));
  } catch (e) {
    console.error('Error storing sales:', e);
  }
};

export const getSales = async (): Promise<Sale[]> => {
  try {
    const salesJson = await AsyncStorage.getItem('@sales');
    return salesJson != null ? JSON.parse(salesJson) : [];
  } catch (e) {
    console.error('Error getting sales:', e);
    return [];
  }
};

export const storeObjectives = async (objectives: Objective[]) => {
  try {
    await AsyncStorage.setItem('@objectives', JSON.stringify(objectives));
  } catch (e) {
    console.error('Error storing objectives:', e);
  }
};

export const getObjectives = async (): Promise<Objective[]> => {
  try {
    const objectivesJson = await AsyncStorage.getItem('@objectives');
    return objectivesJson != null ? JSON.parse(objectivesJson) : [];
  } catch (e) {
    console.error('Error getting objectives:', e);
    return [];
  }
};

export const storeInventory = async (inventory: InventoryItem[]) => {
  try {
    await AsyncStorage.setItem('@inventory', JSON.stringify(inventory));
  } catch (e) {
    console.error('Error storing inventory:', e);
  }
};

export const getInventory = async (): Promise<InventoryItem[]> => {
  try {
    const inventoryJson = await AsyncStorage.getItem('@inventory');
    return inventoryJson != null ? JSON.parse(inventoryJson) : [];
  } catch (e) {
    console.error('Error getting inventory:', e);
    return [];
  }
};