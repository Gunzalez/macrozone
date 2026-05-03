import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import HomeHeader from "./components/header";
import { globalStyles } from "./styles/global";

export default function Index() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <Link href="/meals" style={globalStyles.button}>
        <Text>View Meals</Text>
      </Link>
    </ScrollView>
  );
}
