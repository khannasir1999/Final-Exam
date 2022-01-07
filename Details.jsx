import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TextInput,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
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

const Details = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [search, setSearch] = useState("");
  const [chaps, setChaps] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!search) return setError("Please enter and item to search");
    let temp = chaps.filter(
      (ch) =>
        ch.title.indexOf(search) !== -1 ||
        ch.data.join("").indexOf(search) !== -1
    );
    if (temp.length < 1) return setError("No items were found");
    setOldData(chaps);
    setChaps(temp);
  };

  const handleReset = () => {
    if (oldData && oldData.length) setChaps(oldData);
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  useEffect(() => {
    let { book } = route.params;
    let chapters = book.split("&");
    chapters = chapters.map((p) => p.split("$"));
    let obj = [];
    chapters.map(
      (chapter, index) =>
        index !== 0 && obj.push({ title: chapter[0], data: [chapter[1]] })
    );
    setChaps(obj);
    setData(chapters);
    console.log(chapters);
    firestore()
    .collection(book.slice(book.indexOf("@") + 1, book.indexOf("&")))
    .add({
      title:obj[chapter][index],
      decription:obj[chapter][index],
      key:index

    })
    .then(() => {
      console.log("Book added!");
    });


  }, []);

  return (
    <View>
      <TextInput
        value={search}
        placeholder="Search for a book"
        onChangeText={(text) => {
          setSearch(text);
          setError("");
        }}
        style={styles.textInput}
      />
      <Button title="Search" style={styles.btn} onPress={handleSearch} />
      <Button title="Reset" style={styles.btn} onPress={handleReset} />
      <Text>{error && <Text style={styles.err}>{error}</Text>}</Text>
      <SectionList
        sections={chaps}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.book}>{title}</Text>
        )}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "orange",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
  textInput: {
    height: 50,
    padding: 10,
  },
  err: {
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
  },
  book: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "red",
  },
});
