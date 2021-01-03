import React, {useEffect, useState} from 'react'
import {Text, TextInput, TouchableOpacity, View,KeyboardAvoidingView,Platform} from "react-native";
import styles from "../InputBox/style";
import {Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {createMessage} from '../../graphql/mutations';
import {API, Auth, graphqlOperation} from "aws-amplify";



    const InputBox = (props) => {

        const {chatRoomID} = props;

        const [message, setMessage] = useState('');
        const [myUserId, setMyUserId] = useState(null);

        useEffect(() => {
            const fetchUser = async () => {
                const userInfo = await Auth.currentAuthenticatedUser();
                setMyUserId(userInfo.attributes.sub);
            }
            fetchUser();
        }, [])

        const onMicrophonePress = () => {
            console.warn('Microphone')
        }

        const onSendPress = async () => {
            try {
                const newMessageData = await API.graphql(
                    graphqlOperation(
                        createMessage, {
                            input: {
                                content: message,
                                userID: myUserId,
                                chatRoomID
                            }
                        }
                    )
                )

                await updateChatRoomLastMessage(newMessageData.data.createMessage.id)
            } catch (e) {
                console.log(e);
            }

            setMessage('');
        }

        const onPress = () => {
            if (!message) {
                onMicrophonePress();
            } else {
                onSendPress();
            }
        }


        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={100}
                style={{width: '100%'}}
            >
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                       <FontAwesome5 name="laugh-beam" size={24} color="grey"/>
                        <TextInput
                            placeholder={"Type a message"}
                            style={styles.textInput}
                            multiline
                            value={message}
                            onChangeText={setMessage}
                        />
                        <Entypo name="attachment" size={24} color="grey" style={styles.icon}/>
                        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon}/>}
                    </View>
                    <TouchableOpacity onPress={onPress}>
                        <View style={styles.buttonContainer}>
                            {!message
                                ? <MaterialCommunityIcons name="microphone" size={28} color="white"/>
                                : <MaterialIcons name="send" size={28} color="white"/>}
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

export default InputBox;