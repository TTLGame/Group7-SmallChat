import * as React from 'react';
import {Button, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function UserScreen() {

  const changeName=()=>{

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
      <Button title={status} onPress={changeName}>Change Your Status</Button>
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

