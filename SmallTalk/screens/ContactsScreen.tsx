import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ContractListItem from "../components/ContactListItem";
//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


//import NewMessageButton from "../components/NewMessageButton";
import {useEffect, useState} from "react";
import {graphqlOperation,API} from "aws-amplify";
import {listUsers} from "../graphql/queries";


export default function ContactsScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
            graphqlOperation(
                listUsers
            )
        )
        setUsers(usersData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, [])


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
