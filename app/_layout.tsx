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

  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
      </View>
    );
  }
  
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
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
