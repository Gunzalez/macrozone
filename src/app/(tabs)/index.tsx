import { getMeals, Meal } from "@/storage/meals";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "../../styles/global";
import CopyButton from "../components/CopyButton";
import HomeHeader from "../components/HeaderBar";
import MacroGrid from "../components/MarcoGrid";
import RecentMeals from "../components/RecentMeals";
import ShareButton from "../components/ShareButton";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
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
        <Text style={globalStyles.title}>MacroZone</Text>
        <ShareButton meals={meals} />
      </View>

      <HomeHeader />
      <MacroGrid meals={meals} />
      <CopyButton meals={meals} />
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}
