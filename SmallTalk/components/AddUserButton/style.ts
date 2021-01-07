import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles=StyleSheet.create({
    container:{
        backgroundColor:Colors.light.tint,
        //backgroundColor: "transparent",
        flexDirection: "row",
        width: 40,
        justifyContent: "space-between",
        marginRight: 15,
    },
})

export default  styles