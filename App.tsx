import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/sreens/Login";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import InsideLayout from "./app/sreens/InsideLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeAppsFlyer } from "./appsFlyerConfig";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });

    AsyncStorage.getItem("hasCompletedQuiz").then((value) => {
      if (value === "true") {
        setHasCompletedQuiz(true);
      }
    });

    // initializeAppsFlyer();
  }, []);

  console.log(hasCompletedQuiz);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="InsideLayout"
            component={InsideLayout}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
