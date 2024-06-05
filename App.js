import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";

import { init } from "./util/database";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  // ---- Initialize database
  const [dbInitialized, setDbInitialized] = useState(false);

  // SQLite initialization whenever the app is launched.
  useEffect(() => {
    async function initDB() {
      try {
        await init();
        setDbInitialized(true); // Database initialized successfully.
      } catch (err) {
        console.log(err);
      }
    }
    initDB();
  }, []);

  if (!dbInitialized) {
    return null; // return null to display the splash screen.
  } else {
    // hide the splash screen.
    SplashScreen.hideAsync();
  }
  // ----

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add-circle-outline"
                  size={26}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add  Place",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Loading Place...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
