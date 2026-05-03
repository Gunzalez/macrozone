import { ScrollView, Text } from "react-native";
import HeaderBar from "../components/HeaderBar";
import MacroGrid from "../components/MarcoGrid";
import { globalStyles } from "../styles/global";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HeaderBar />
      <MacroGrid />
    </ScrollView>
  );
}
