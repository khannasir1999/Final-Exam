import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Details from './Details';
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

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookDetail" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
