import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StatisticPage = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      const answersCollection = collection(FIREBASE_DB, "quiz");
      const answersSnapshot = await getDocs(answersCollection);

      const newTodos: any[] = [];

      answersSnapshot.forEach((doc) => {
        newTodos.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTodos(newTodos);
    };

    fetchAnswers();

    AsyncStorage.getItem("hasCompletedQuiz").then((value) => {
      if (value === "true") {
        setHasCompletedQuiz(true);
      }
    });
  }, []);

  const correctAnswersCount = todos.reduce((count, todo) => {
    if (todo.rightAnswer) {
      return count + 1;
    }
    return count;
  }, 0);

  const handleQuizRestart = async () => {
    const answersCollection = collection(FIREBASE_DB, "quiz");
    const answersSnapshot = await getDocs(answersCollection);

    const deletePromises: any[] = [];

    answersSnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);

    AsyncStorage.setItem("hasCompletedQuiz", "false");
    setHasCompletedQuiz(false);

    navigation.navigate("FirstPage");
  };

  const isAllAnswersCorrect = correctAnswersCount === todos.length;

  return (
    <View>
      <View>
        <Text>Your answers:</Text>
        {todos.map((todo) => (
          <Text
            key={todo.id}
            style={todo.rightAnswer ? s.rightAnswer : s.wrongAnswer}
          >
            {todo.title}
          </Text>
        ))}
        <Text>Correct Answers: {correctAnswersCount}</Text>
      </View>
      {isAllAnswersCorrect ? (
        <Button
          title="Go to your Profile"
          onPress={() => {
            AsyncStorage.setItem("hasCompletedQuiz", "true");
            setHasCompletedQuiz(true);

            navigation.navigate("ProfilePage");
          }}
        />
      ) : (
        <Button
          title="Restart quiz"
          onPress={() => {
            handleQuizRestart();
          }}
        />
      )}
    </View>
  );
};

export default StatisticPage;

const s = StyleSheet.create({
  rightAnswer: {
    color: "green",
  },
  wrongAnswer: {
    color: "red",
  },
});
