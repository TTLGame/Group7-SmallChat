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
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";

import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import styles from "../components/ChatListItem/style";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen"
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
        initialRouteName="Login"
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
                <Octicons name="search" size={21} color={"white"} />
                <Fontisto name="nav-icon-a" size={21} color={"white"} />
              </View>
            ),
          }}
        />
        <Stack.Screen
        
          name="ChatRoom"
          component={ChatRoomScreen}
          options={({ route }) => ({
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
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}      options={{ headerShown: false }}
/>

        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
   

  );
}
