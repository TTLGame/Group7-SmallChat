import React from 'react';
import {AntDesign} from '@expo/vector-icons'
import {Text, View, StyleSheet, TextInput,TouchableOpacity, Platform, ImagePropTypes} from 'react-native'
import * as imagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
export default function SignUpScreen() {
    const getPermission = async ()=>{
        if (Platform.OS !== "web"){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            return status;
        }
    }
    const pickImage = async () =>{
        try {
            let result = await imagePicker.launchImageLibraryAsync({
                mediaTypes: imagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.5,
            })
            if (!result.cancelled){
                // set img
            }
        }
        
        catch(error){
            console.log("Error")
        }
    }
    const addProfilePicture = async() =>{
        const status = await getPermission();
        if (status !=='granted'){
            alert("We need persission to access your camera")
            return 
        }
        pickImage()
        
    }
    return (
        <View style ={{alignItems:'center',height:'100%',width:'100%',justifyContent:'center'}}>
        <View style = {styles.Leftcircle} ></View>
        <View style = {styles.Rightcircle} ></View>
        <View style={{width:'100%' ,marginTop:200}}>
            <Text style={{fontSize: 36,alignSelf: 'center'}}>Sign Up</Text>
            <TouchableOpacity style ={styles.ProfileContainer} onPress ={addProfilePicture} >
                <AntDesign style ={{alignSelf:'center'}}name="plus" size ={24} color ="#ffffff"></AntDesign>
            </TouchableOpacity>
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
          
    },
    ProfileContainer:{
        backgroundColor: "#e1e2e6",
        width: 80,
        height: 80,
        borderRadius:40,
        alignSelf:'center',
        overflow:'hidden',
        justifyContent:'center',
        marginTop:16,
    },
})