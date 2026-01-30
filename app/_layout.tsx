import { Stack } from "expo-router";
// import { Drawer } from "@/components/drawer";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
  // return <Drawer />;
}
