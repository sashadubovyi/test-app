import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { RadioButton } from "react-native-paper";

const SecondPage = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("less 18");
  const user = FIREBASE_AUTH.currentUser;
  const userUid = user?.uid;

  useEffect(() => {
    const todoRef = collection(FIREBASE_DB, "quiz");
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: any[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  const addAnswer = async () => {
    const doc = addDoc(collection(FIREBASE_DB, "quiz"), {
      userId: userUid,
      title: selectedValue,
      question: "Cash on your bank acc:",
      rightAnswer: selectedValue === "200,000$>",
    });
    setSelectedValue("");
  };

  return (
    <View style={s.container}>
      <View style={s.form}>
        <Text>How many cash on your bank account?</Text>
        <View>
          <RadioButton.Group
            onValueChange={(newValue) => setSelectedValue(newValue)}
            value={selectedValue}
          >
            <RadioButton.Item label="<50,000$" value="<50,000$" />
            <RadioButton.Item
              label="50,000$-200,000$"
              value="50,000$-200,000$"
            />
            <RadioButton.Item label="200,000$>" value="200,000$>" />
          </RadioButton.Group>
        </View>
        <TouchableOpacity
          style={[s.button, selectedValue === "" && s.disabledButton]}
          onPress={() => {
            addAnswer();
            navigation.navigate("FinalPage");
          }}
          disabled={selectedValue === ""}
        >
          <Text
            style={[
              s.textButton,
              selectedValue === "" && s.textButtonDissabled,
            ]}
          >
            Next Page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecondPage;

const s = StyleSheet.create({
  container: {
    padding: 20,
  },
  form: {
    alignItems: "flex-start",
    gap: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#50bcee",
    backgroundColor: "#5ea5c611",
  },
  disabledButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#b3b3b3b0",
    padding: 10,
    backgroundColor: "#b3b3b331",
  },
  textButton: {
    color: "#50bcee",
    fontSize: 15,
  },
  textButtonDissabled: {
    color: "#b3b3b3b0",
  },
});
