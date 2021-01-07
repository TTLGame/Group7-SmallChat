import React, {useEffect, useState} from "react";
import {View,Text,Image,TouchableWithoutFeedback} from "react-native";
import {ChatRoom, User} from "../../types";
import styles from "./style";
import {useNavigation} from'@react-navigation/native'

import {API, graphqlOperation,Auth} from "aws-amplify";
import {createChatRoom, createChatRoomUser} from "../../graphql/mutations";



export type UserListItemProps = {
    chatRoom: ChatRoom;
    user: User;
}



const UserListItem=(props: UserListItemProps)=>{
    const { user,chatRoom } =props;



    const onClick = async () => {

        console.log(route.params.id);
        try {
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: user.id,
                            chatRoomID:'',
                        }
                    }
                )
            )
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{uri:user.imageUri}} style={styles.avatar}/>
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={1}  style={styles.lastMess}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default UserListItem;