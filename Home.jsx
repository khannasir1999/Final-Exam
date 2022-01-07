import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import file from "./Books.rtf";
import * as firebase from 'firebase';
import 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDyTO-xA3RYMZH8xbNryojiDewbHBBvEwI",
  authDomain: "finallabexam-8bb0d.firebaseapp.com",
  projectId: "finallabexam-8bb0d",
  storageBucket: "finallabexam-8bb0d.appspot.com",
  messagingSenderId: "668268942914",
  appId: "1:668268942914:web:b10059eb4cc92700d0ffdb",
  measurementId: "G-4HCPSSHD72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const getTextFromData = useRef(null);

  useEffect(() => {
    getTextFromData.current();
  }, []);

  const handleSearch = () => {
    if (!search) return setError("Please enter and item to search");
    let temp = data.filter((item) => item.indexOf(search) !== -1);
    if (temp.length < 1) return setError("No items were found");
    setData(temp);
  };

  const handleReset = () => {
    getTextFromData.current();
  };

  getTextFromData.current = async () => {
    const rawData = await fetch(file);
    let text = await rawData.text();
    let books = [];
    while (text.indexOf("@", text.indexOf("@") + 1) !== -1) {
      let book = text.slice(
        text.indexOf("@"),
        text.indexOf("@", text.indexOf("@") + 1)
      );
      books.push(book);
      text = text.replace(book, "");
    }
    setData(books);
    console.log(books);
  };

  firebase.
firestore()
.collection("Flutter for Beginners")
.where("description", "in", ["flutter", "beginners"])
.get()
.then((querySnapshot) => {
  console.log("Search data using");

  querySnapshot.forEach((documentSnapshot) => {
    console.log(
      "Chapter and search is in :",
      documentSnapshot.data().key,
      documentSnapshot.data().title,
      documentSnapshot.data().description
    );
  });
});

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        placeholder="Search for a book"
        onChangeText={(text) => {
          setSearch(text);
          setError("");
        }}
        style={styles.textInput}
      />
      <View style={styles.btns}>
        <Button title="Search" style={styles.btn} onPress={handleSearch} />
        <View style={styles.space}></View>
        <Button title="Reset" style={styles.btn} onPress={handleReset} />
      </View>
      {error && <Text style={styles.err}>{error}</Text>}
      {data.map((book, index) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("BookDetail", { book })}
          key={index}
        >
          <Text style={styles.book}>
            {book.slice(book.indexOf("@") + 1, book.indexOf("&"))}
          </Text>
        </TouchableOpacity>
      ))}
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginBottom: 5,
  },
  err: {
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
  },
  btns: {
    flex: 0.3,

    flexDirection: "row",
  },
  space: {
    width: 50,
    height: 50,
  },
  book: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "red",
  },
});
