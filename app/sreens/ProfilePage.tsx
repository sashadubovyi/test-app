import { collection, getDocs, where, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";

const ProfilePage = ({ navigation }: any) => {
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const user = FIREBASE_AUTH.currentUser;
  const userUid = user?.uid;
  const userEmail = user?.email;

  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const answersQuery = query(
          collection(FIREBASE_DB, "quiz"),
          where("userId", "==", userUid)
        );

        const answersSnapshot = await getDocs(answersQuery);
        const userAnswersData: any[] = [];

        answersSnapshot.forEach((doc) => {
          userAnswersData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setUserAnswers(userAnswersData);
      } catch (error) {
        console.error("Помилка при отриманні відповідей користувача:", error);
      }
    };

    fetchUserAnswers();
  }, [userUid]);

  return (
    <View style={s.main}>
      <View style={s.container}>
        <View style={s.userInfo}>
          <Text style={s.title}>Your email:</Text>
          <Text style={s.subTitle}>{userEmail}</Text>
        </View>
        {userAnswers.map((answer, index) => (
          <View key={index} style={s.userAnswers}>
            <Text style={s.title}>{answer.question}</Text>
            <Text style={s.subTitle}>{answer.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfilePage;

const s = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  container: {
    gap: 20,
  },
  userInfo: {
    alignItems: "center",
  },
  userAnswers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 15,
  },
});
