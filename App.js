// @refresh reset
import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, Text } from 'react-native'
import firebase from "firebase";
import * as long from 'firebase'
import 'firebase/firestore'




const firebaseConfig = {
  apiKey: "AIzaSyCm7blQpEtwS2_RD6tZ3HEATLiH5hJh9JU",
  authDomain: "chat-app-ea01b.firebaseapp.com",
  projectId: "chat-app-ea01b",
  storageBucket: "chat-app-ea01b.appspot.com",
  messagingSenderId: "1086841687765",
  appId: "1:1086841687765:web:753cca2091fe82174ddc5c"
};
// // Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function App() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
      readUser()
      const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
          const messagesFirestore = querySnapshot
              .docChanges()
              .filter(({ type }) => type === 'added')
              .map(({ doc }) => {
                  const message = doc.data()
                  //createdAt is firebase.firestore.Timestamp instance
                  //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                  return { ...message, createdAt: message.createdAt.toDate() }
              })
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          appendMessages(messagesFirestore)
      })
      return () =>unsubscribe()
  }, [])

  const appendMessages = useCallback(
      (messages) => {
          setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
      },
      [messages]
  )

  async function readUser() {
      const user = await AsyncStorage.getItem('user')
      if (user) {
          setUser(JSON.parse(user))
      }
  }
  async function handlePress() {
      const _id = Math.random().toString(36).substring(7)
      const user = { _id, name }
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
  }
  async function handleSend(messages) {
      const writes = messages.map((m) => chatsRef.add(m))
      await Promise.all(writes)
  }

  if (!user){

    return (
      <View style={styles.container}>
        {/* <TextInput style={styles.input} placeholder="Enter your name" value={name} onTextInput={setName}>We don't have a user</TextInput> */}
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter your name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={name}
               onChangeText={setName}
               />
          <Button title="Submit" onPress ={handlePress}/>     
      </View>
    );
  }
  return (
      <GiftedChat messages = {messages} user={user} onSend={handleSend}/>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input:{
    height:50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderColor: 'gray',
    marginBottom: 20,
  }
});
