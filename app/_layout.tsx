import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "poppins": require('./../assets/fonts/Poppins-Regular.ttf'),
    "poppins-semibold": require('./../assets/fonts/Poppins-SemiBold.ttf'),
    "poppins-bold": require('./../assets/fonts/Poppins-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <View style={styles.centered} ><Text>Loading...</Text></View>;
  }
  
  return (
    <Stack screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splashImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});
