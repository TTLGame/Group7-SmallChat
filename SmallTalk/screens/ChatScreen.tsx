import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ChatListItem from "../components/ChatListItem";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import chatRooms from "../data/ChatRoom";
import NewMessageButton from "../components/NewMessageButton";
import {useEffect, useState} from "react";
import {getUser} from "./queries";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {onCreateChatRoom, onCreateMessage} from "../graphql/subscriptions";
import {messagesByChatRoom} from "../graphql/queries";



export default function ChatScreen() {
    const [chatRooms, setChatRooms] = useState([]);

    const fetchChatRooms = async () => {
        try {
            const userInfo = await Auth.currentAuthenticatedUser();

            const userData = await API.graphql(
                graphqlOperation(
                    getUser, {
                        id: userInfo.attributes.sub,
                    }
                )
            )
            setChatRooms(userData.data.getUser.chatRoomUser.items)
        }catch (e) {

        }
    }


    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onCreateChatRoom)
        ).subscribe({
            next: (data) => {
                const newChatRoom = data.value.data.onCreateChatRoom;
                console.log(data);
                //if (newChatRoom.user.id !== route.params.id) {
                 //   console.log("Message is in another room!")
                 //   return;
                //}
                fetchChatRooms();
                // setMessages([newMessage, ...messages]);
            }
        });

        return () => subscription.unsubscribe();
    }, [])


    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();

                const userData = await API.graphql(
                    graphqlOperation(
                        getUser, {
                            id: userInfo.attributes.sub,
                        }
                    )
                )

                setChatRooms(userData.data.getUser.chatRoomUser.items)
            } catch (e) {
                console.log(e);
            }
        }
        fetchChatRooms();
    }, []);


    return (
    <View style={styles.container}>
       <FlatList
           style={{width:'100%'}}
           data={chatRooms}
           renderItem={({item}) => <ChatListItem chatRoom={item.chatRoom}/>}
           keyExtractor={(item)=>item.id}
       />
       <NewMessageButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
});
