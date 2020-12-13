import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ContractListItem from "../components/ContactListItem";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import users from "../data/User";
import NewMessageButton from "../components/NewMessageButton";


export default function ContactsScreen() {
  return (
    <View style={styles.container}>
       <FlatList
           style={{width:'100%'}}
           data={users}
           renderItem={({item}) => <ContractListItem user={item}/>}
           keyExtractor={(item)=>item.id}
       />
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
