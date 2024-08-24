import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "roboto": require('./../assets/fonts/Roboto-Regular.ttf'),
    "roboto-medium": require('./../assets/fonts/Roboto-Medium.ttf'),
    "roboto-bold": require('./../assets/fonts/Roboto-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }
  
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
