import React, {useState} from "react";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {TouchableOpacity, View, Modal, Alert} from "react-native";
import styles from './style'
import {useNavigation} from "@react-navigation/native";
import Swal from 'sweetalert2'



const AddUserButton=()=>{
    const Swal = require('sweetalert2')
    const [modalVisible, setModalVisible] = useState(false);
    const onPress=() =>{
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        />
    }

    return(
        <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Entypo name="add-user" size={24} color="white"/>
        </TouchableOpacity>
        </View>
    )
}

export default AddUserButton