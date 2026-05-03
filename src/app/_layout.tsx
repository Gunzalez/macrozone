import { Stack } from "expo-router";
import { colors } from "./styles/global";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.header,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen name="meals" options={{ title: "Meals" }} />
    </Stack>
  );
}
