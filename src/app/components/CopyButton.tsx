import { Meal } from "@/storage/meals";
import { colors } from "@/styles/global";
import { getTotals } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

type CopyButtonProps = {
  meals: Meal[];
};

export default function CopyButton({ meals }: CopyButtonProps) {
  const handleCopy = async () => {
    const totals = getTotals({ meals });

    const summary = `MacroZone Daily Summary\n\nCalories: ${totals.calories}\nProtein: ${totals.protein}g\nCarbs: ${totals.carbs}g\nFat: ${totals.fat}g\n\nMeals: ${meals.length} logged today`;

    await Clipboard.setStringAsync(summary);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied!", "Macro summary copied to clipboard.");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});
