import { addMeal, getMeal, Meal, updateMeal } from "@/storage/meals";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, globalStyles } from "../styles/global";

export default function AddMealScreen() {
  const [savedMeal, setSavedMeal] = useState<Meal | null>(null);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const { id, from } = useLocalSearchParams<{ id: string; from: string }>();
  const clearFields = () => {
    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setSavedMeal(null);
  };

  const handleReset = () => {
    clearFields();
  };

  const handleUpdateOrAddMeal = async () => {
    if (!name || !calories) {
      Alert.alert("Error", "Please enter a meal name and calories.");
      return;
    }

    const mealToSave = {
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    };

    if (savedMeal) {
      await updateMeal({
        ...savedMeal,
        ...mealToSave,
      });
    } else {
      await addMeal(mealToSave);
    }

    const successMessage = savedMeal
      ? "Meal updated successfully!"
      : "Meal added successfully!";

    clearFields();

    Alert.alert("Success", successMessage);

    if (from === "meals") {
      router.navigate("/meals");
    } else {
      router.navigate("/");
    }
  };

  const loadMeal = async (id: string) => {
    const fetchedMeal = await getMeal(id);
    if (fetchedMeal) {
      setSavedMeal(fetchedMeal);
      setName(fetchedMeal.name);
      setCalories(String(fetchedMeal.calories));
      setProtein(String(fetchedMeal.protein));
      setCarbs(String(fetchedMeal.carbs));
      setFat(String(fetchedMeal.fat));
    } else {
      clearFields();
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        loadMeal(id);
      } else {
        clearFields();
      }
    }, [id]),
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>
          {savedMeal ? "Update" : "Add"} Meal
        </Text>
        {savedMeal && (
          <TouchableOpacity onPress={handleReset}>
            <Text style={globalStyles.clearButton}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Meal name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Calories"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Protein (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Carbs (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Fat (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={fat}
          onChangeText={setFat}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdateOrAddMeal}>
        <Text style={styles.buttonText}>
          {savedMeal ? "Update" : "Add"} Meal
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
