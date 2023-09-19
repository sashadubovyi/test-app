import React, { useState } from "react";
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const hasCompletedQuiz = await AsyncStorage.getItem("hasCompletedQuiz");
      console.log("hasCompletedQuiz:", hasCompletedQuiz);
    } catch (error: any) {
      console.log(error);
      alert("Sign In failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await AsyncStorage.setItem("hasCompletedQuiz", "false");
    } catch (error: any) {
      console.log(error);
      alert("Sign Up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.main}>
      <View style={s.container}>
        <View style={s.inputsContainer}>
          <TextInput
            style={s.input}
            placeholder="Enter your email..."
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={s.input}
            placeholder="Enter your password..."
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            textContentType="password"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#9900ff" />
        ) : (
          <View style={s.buttonsContainer}>
            <Button title="SignIn" onPress={signIn} />
            <Button title="SignUp" onPress={signUp} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;

const s = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: "#c6e1ef53",
    justifyContent: "center",
  },
  container: {
    padding: 50,
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#c6e1ef",
  },
  inputsContainer: {
    width: "100%",
    gap: 20,
  },
  input: {
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 100,
  },
});
