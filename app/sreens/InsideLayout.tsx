import { Text, TouchableOpacity } from "react-native";
import FirstPage from "./FirstPage";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SecondPage from "./SecondPage";
import StatisticPage from "./StatisticPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import ProfilePage from "./ProfilePage";

const InsideStack = createNativeStackNavigator();

const InsideLayout = ({ navigation }: any) => {
  const navigateToAppropriatePage = async () => {
    const hasCompletedQuiz = await AsyncStorage.getItem("hasCompletedQuiz");

    if (hasCompletedQuiz === "true") {
      navigation.navigate("ProfilePage");
    } else {
      navigation.navigate("FirstPage");
    }
  };

  useEffect(() => {
    navigateToAppropriatePage();
  }, []);

  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          gestureEnabled: false,
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => FIREBASE_AUTH.signOut()}
            >
              <Text>Log out</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <InsideStack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          gestureEnabled: false,
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => FIREBASE_AUTH.signOut()}
            >
              <Text>Log out</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <InsideStack.Screen
        name="FinalPage"
        component={StatisticPage}
        options={{
          gestureEnabled: false,
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => FIREBASE_AUTH.signOut()}
            >
              <Text>Log out</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <InsideStack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          gestureEnabled: false,
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => FIREBASE_AUTH.signOut()}
            >
              <Text>Log out</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </InsideStack.Navigator>
  );
};

export default InsideLayout;
