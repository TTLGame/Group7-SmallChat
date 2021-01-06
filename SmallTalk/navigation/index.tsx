import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
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
} from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";

import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import styles from "../components/ChatListItem/style";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen"

import {TouchableOpacity} from "react-native";
import {Auth} from "aws-amplify";

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

async function changePass() {
    try{
        await Auth.changePassword(user, 'oldPassword', 'newPassword');
    } catch(error){
        console.log(error);
    }
}

Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, 'oldPassword', 'newPassword');
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));

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
                  <TouchableOpacity onPress={changePass}>
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
              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  width: 60,
                  justifyContent: "space-between",
                  marginRight: 15,
                }}
              >
                <FontAwesome5 name="video" size={21} color={"white"} />
                <MaterialIcons name="call" size={21} color={"white"} />
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

      </Stack.Navigator>
   

  );
}
