import {StyleSheet} from 'react-native';

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        width:"100%",
        justifyContent:'space-between',
        padding:10,
    },
    lefContainer:{
        flexDirection:'row',
    },
    midContainer:{
        justifyContent:'space-around',
    },
    avatar:{
        width:60,
        height:60,
        marginRight:15,
        borderRadius:50,
    },
    avatarRoom:{
        width:40,
        height:40,
        borderRadius:50,
    },
    username:{
        fontWeight:'bold',
        fontSize:15,
    },
    lastMess:{
        fontSize:15,
        color:'grey',
        width:'100%',
        overflow:'hidden',
    },
    time:{
        fontSize:12,
        color:'grey',
    }
});

export default styles;


