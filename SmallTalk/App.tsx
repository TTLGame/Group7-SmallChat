import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { withAuthenticator } from 'aws-amplify-react-native';

import {Auth,API,graphqlOperation} from 'aws-amplify';

import {getUser} from "./graphql/queries";
import {createUser} from './graphql/mutations';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config)

import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen';

const randomImages=[
    'https://lh3.googleusercontent.com/proxy/SOEku8lI7wxIoCc_LsxfYQQo8n91En6g6GLNVv4giQzEPoO1eUrL_WbPT5qwSAIowm8kr4ISrIhn1l5HDvMrLLK30ZBxMQc',
]

const getRandomImage=()=>{
    return randomImages;
}

 function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  //run only first time
     useEffect( () => {
         const fetchUser = async () => {
             const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

             if (userInfo) {
                 const userData = await API.graphql(
                     graphqlOperation(
                         getUser,
                         { id: userInfo.attributes.sub }
                     )
                 )

                 if (userData.data.getUser) {
                     console.log("User is already registered in database");
                     return;
                 }

                 const newUser = {
                     id: userInfo.attributes.sub,
                     name: userInfo.username,
                     imageUri: getRandomImage(),
                     status: 'Hi, Nice to meet you',
                 }

                 await API.graphql(
                     graphqlOperation(
                         createUser,
                         { input: newUser }
                     )
                 )
             }
         }

         fetchUser();
     }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
     
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
