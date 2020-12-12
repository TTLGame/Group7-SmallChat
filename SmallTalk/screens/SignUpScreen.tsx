import React from 'react';

import {Text, View, StyleSheet, TextInput,TouchableOpacity} from 'react-native'

export default function SignUpScreen() {
    return (
        <View style ={{alignItems:'center',height:'100%',width:'100%',justifyContent:'center'}}>
        <View style = {styles.Leftcircle} ></View>
        <View style = {styles.Rightcircle} ></View>
        <View style={{width:'100%' ,marginTop:200}}>
            <Text style={{fontSize: 36,alignSelf: 'center'}}>Sign Up</Text>
            <TextInput
                style={styles.inputField}
                //onChangeText={text => onChangeText(text)}
                placeholder = 'UserName'
                />
            <TextInput
                style={styles.inputField}
                //onChangeText={text => onChangeText(text)}
                placeholder = 'PassWord'
                secureTextEntry={true}
                />
            <TouchableOpacity style={{
                alignSelf: 'center',
                padding: 20,
                backgroundColor:'#8022d9',
                width:'80%',
                marginTop: 60,
                borderRadius: 20,
            }}>
            <Text style ={{alignSelf: 'center',fontSize:20}}>Sign Up</Text>
            </TouchableOpacity>
            <Text style ={{alignSelf: 'center',fontSize:10, marginTop: 20}}>Already have an account?
            <Text style ={{color:'#8022d9'}}> Sign In</Text>
            </Text>

                
                
            


        </View>
        </View>

      
    );
}
const styles =StyleSheet.create({
    Leftcircle:{
        backgroundColor: '#23a6d5',
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        left: -50,
        top:-50,
    },
    Rightcircle:{
        backgroundColor: '#8022d9',
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        right: -100,
        top:-200,
    },
    inputField:{
         height: 40, 
         borderColor: 'gray', 
         borderWidth: 0,
         borderBottomWidth:1,
          width:'80%' ,
          marginTop:30,
          alignSelf: 'center',
          
    }
})