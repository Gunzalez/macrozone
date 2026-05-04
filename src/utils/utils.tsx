import { Meal } from "@/storage/meals";

export function prepareValue(value: string): number {
  return Math.abs(Number(value)) || 0;
}

export function getTotals({ meals }: { meals: Meal[] }) {
  return meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}
