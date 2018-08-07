import {StyleSheet} from 'react-native';
import Util from './../../js/util';
import HomeStyle from "../home/HomeStyle";

const classifyStyle = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ddd",
        height: 44,
    },
    //客户详情页面
    topBox:{
        backgroundColor:'blue'
    },
    writeText:{
        color:'#fff'
    },
    blueText:{
        color:'blue',
        backgroundColor:'#fff',
        paddingBottom:2,
        paddingTop : 2,
        paddingLeft: 2,
        paddingRight:2,
        borderRadius:5
    },
    topCenterBox:{
        // position:'absolute',
        // top:40,
        // right:0,
        width:'80%',
        flexDirection:'row',justifyContent:'space-around',backgroundColor:'#fff',
        alignSelf:'center',
    },
    ContentDetails:{},
    ContentDetailsItem:{},
    Item01:{
        flexDirection:'row'
    },
    Item01Tilte:{},
    ItemText:{},
    buttonBox:{
        width:'100%',
        backgroundColor:'blue'
    },
    btnText:{
        color:'#fff',textAlign:'center',
        paddingTop:10,
        paddingBottom:10
    },
    alert:{
        width:Util.size.width*0.5,
        height:Util.size.width*0.6,
        borderWidth:1,
        borderColor:'#ddd'
    },
    alertContent:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    alertContentText:{
        textAlign:'center',
    },
    btnBox:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    alertBtn:{
        borderWidth:1,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10
    },
    btnCancel:{
        backgroundColor:'#fff'
    },
    btnConfirm:{
        backgroundColor:'blue'
    },
    btnCancelText:{
        color:'blue'
    },
    btnConfirmText:{
        color:"#fff"
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
})
export default classifyStyle;