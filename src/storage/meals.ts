import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

const MEALS_KEY = "meals";

export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMeal = async (
  meal: Omit<Meal, "id" | "createdAt">,
): Promise<Meal> => {
  const meals = await getMeals();
  const newMeal: Meal = {
    ...meal,
    id: uuid.v4() as string,
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));
  return newMeal;
};

export const updateMeal = async (meal: Meal): Promise<Meal> => {
  const meals = await getMeals();

  const index = meals.findIndex((m) => m.id === meal.id);

  if (index === -1) {
    throw new Error(`Meal with id ${meal.id} not found`);
  }

  const updatedMeal = { ...meals[index], ...meal };
  const updatedMeals = [...meals];
  updatedMeals[index] = updatedMeal;
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(updatedMeals));

  return updatedMeal;
};

export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
};

export const clearAllMeals = async (): Promise<void> => {
  await AsyncStorage.removeItem(MEALS_KEY);
};

export const getMeal = async (id: string): Promise<Meal | null> => {
  const meals = await getMeals();
  const meal = meals.find((meal) => meal.id === id);
  return meal ?? null;
};
