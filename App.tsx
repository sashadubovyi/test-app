import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/sreens/Login";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import InsideLayout from "./app/sreens/InsideLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeAppsFlyer } from "./appsFlyerConfig";
import { WebView } from "react-native-webview";
import axios from "axios";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState<boolean>(false);
  const [isWebsiteExist, setIsWebsiteExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("userData")
      .then((userData) => {
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      })
      .catch((error) => {
        console.error("Помилка отримання даних користувача:", error);
      });

    onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
    });

    AsyncStorage.getItem("hasCompletedQuiz")
      .then((value) => {
        if (value === "true") {
          setHasCompletedQuiz(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Здійсніть HTTP запит на випадковий URL
    const randomUrl = "https://example.com"; // Замініть на ваш URL
    axios
      .get(randomUrl)
      .then((response) => {
        // Якщо запит успішний (статус 200), сайт існує
        setIsWebsiteExist(response.status === 200);
      })
      .catch((error) => {
        // Якщо сталася помилка, сайт не існує
        setIsWebsiteExist(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
