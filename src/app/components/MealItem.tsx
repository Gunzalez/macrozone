import { deleteMeal } from "@/storage/meals";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../styles/global";

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  from: "index" | "meals";
  onDelete: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  from,
  onDelete,
}: MealItemProps) {
  const handleLongPress = () => {
    Alert.alert("Delete Meal", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteMeal(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onDelete();
        },
      },
    ]);
  };

  const handlePress = () => {
    router.navigate({
      pathname: "/add-meal",
      params: { id: id, from: from },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleLongPress}
      onPress={handlePress}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {calories} cal • {protein}g P • {carbs}g C • {fat}g F
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  macros: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
