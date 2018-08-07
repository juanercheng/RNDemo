/**
 * Created by juaner by 18-07-24
 */
import {StyleSheet} from 'react-native';
import Util from './../../js/util';

const HomeStyle = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#ddd",
        height: 44,
    },

    topic: {
        width: Util.size.width*0.7,
        height:Util.size.width*0.1,
        alignItems:'center',
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
    },
    topicItem: {
        marginRight:10,
        marginLeft:10,
        paddingBottom:10,
        paddingTop:10,
    },
    topicItemActive:{
        marginRight:10,
        marginLeft:10,
        paddingBottom:10,
        paddingTop:10,
        borderBottomColor:'red',
        borderBottomWidth:5,
    },
    topicTitle:{
        color:'#666',
        paddingBottom:10,
    },
    Active:{
        color:"#333",
        paddingBottom:10,
    },

    select:{
        backgroundColor:'#fff',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        width:Util.size.width*0.3,
        height:Util.size.width*0.1,
        borderLeftColor:'#ddd',
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
    },
    selectBox:{
        width:Util.size.width*0.3,
        borderLeftColor:'#ddd',
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        borderBottomLeftRadius:20,
        position:'absolute',
        top:40,
        right:0,
        zIndex:9999,
        backgroundColor:'#fff'
    },
    selectItem:{
        padding:10,
        color:'#333',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        textAlign:'center'
    },
    listItemBox:{
        backgroundColor:'#fff',
    },
    listItemName:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userStatus:{
        backgroundColor:'blue',
        color:'#fff',
        padding:1
    },
    time:{},
    listItemTime:{},
    listItemTimeCon:{
        alignItems:'center'
    },
    listItemInfoLis:{
        alignItems:'center'
    },
    listItemInfo:{},
    listItemInfoLi:{
    },
    listItemAction:{
        justifyContent:'space-between',
        backgroundColor:'#ddd'
    },
    labelBox:{},
    label:{

    }

});
export default HomeStyle;