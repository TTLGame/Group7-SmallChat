import * as React from 'react';
import { StyleSheet } from 'react-native';
import ChatListItem from "../components/ChatList Item";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ChatListItem chatRoom={{lastMess: {content:"Test!!!!!!"}}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
