import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme, useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, Image } from "react-native";
import {
  Octicons,
  Fontisto,
  AntDesign,
  FontAwesome5,
  MaterialIcons, Ionicons,
  MaterialCommunityIcons,
    Entypo,
} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import NotFoundScreen from "../screens/NotFoundScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";
import { RNCamera, FaceDetector } from 'react-native-camera';
import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import styles from "../components/ChatListItem/style";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen"
import UserListScreen from "../screens/UserListScreen";

import {TouchableOpacity} from "react-native";
import {Auth} from "aws-amplify";
import AddUserButton from "../components/AddUserButton";

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}


function takePicture() {
    const options = {};
//options.location = ...
    this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
}



// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.light.tint,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: Colors.light.background,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >

        <Stack.Screen
          name="Root"
          component={MainTabNavigator}
          options={{
            title: "SmallTalk",
            headerRight: () => (
              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  width: 60,
                  justifyContent: "space-between",
                  marginRight: 10,
                }}
              >
                  <TouchableOpacity onPress={takePicture}>
                      <Octicons name="search" size={21} color={"white"} />
                  </TouchableOpacity>
                <TouchableOpacity onPress={signOut}>
                    <Ionicons name="exit" size={21} color={"white"} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
        
          name="ChatRoom"
          component={ChatRoomScreen}
          options={({ route }) => ({
              title:route.params.name,
            /*headerTitleStyle:{
                        backgroundColor:'transparent',
                        flexDirection:"row",
                        width:60,
                        justifyContent:'space-between',
                    },*/
            /*headerLeft: ()=> (
                        <Image source={{uri:route.params.img}}  style={styles.avatarRoom}/>
                    ),*/
            headerRight: () => (
              <View>
                  <AddUserButton />
              </View>
            ),
          })}
        />
        {/*<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>*/}
        {/*<Stack.Screen name="SignUp" component={SignUpScreen}      options={{ headerShown: false }}/>*/}
        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
        />
          <Stack.Screen
              name="UserList"
              component={UserListScreen}
          />

      </Stack.Navigator>
   

  );
}
