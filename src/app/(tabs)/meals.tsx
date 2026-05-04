import { clearAllMeals, getMeals, Meal } from "@/storage/meals";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/global";
import MealItem from "../components/MealItem";

export default function AllMealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  const handleClearAll = async () => {
    await clearAllMeals();
    loadMeals();
  };

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container} ref={scrollRef}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={globalStyles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={loadMeals}
              from={"meals"}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
