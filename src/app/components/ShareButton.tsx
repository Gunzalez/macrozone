import { Meal } from "@/storage/meals";
import { colors } from "@/styles/global";
import { getTotals } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Share, TouchableOpacity } from "react-native";

export default function ShareButton({ meals }: { meals: Meal[] }) {
  const handleShare = async () => {
    const totals = getTotals({ meals });

    await Share.share({
      message: `MacroZone Daily Summary\n\nCalories: ${totals.calories}\nProtein: ${totals.protein}g\nCarbs: ${totals.carbs}g\nFat: ${totals.fat}g\n\nMeals: ${meals.length} logged today`,
    });
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
