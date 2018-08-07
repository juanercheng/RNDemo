/**
 * Created by Ld on 2018/8/1.
 */

import React, { Component } from 'react';
import {
    Alert,
    TextInput,
    View,
    Platform,
    Image,
    Linking,
    FlatList,
    DeviceEventEmitter,
    TouchableOpacity,
    ViewPagerAndroid,
    ScrollView,
    TouchableHighlight,
    Text
} from 'react-native';
import { Container,  Button} from 'native-base';


import { List, Checkbox, Flex } from 'antd-mobile';


import styles from './RechargeStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';
import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';

import *as wechat from 'react-native-wechat';
import Alipay from './../../common/Alipay';


export default class Recharge extends Component {
    static navigationOptions = ({navigation}) => ({
       headerTitle: "账户充值",
       headerStyle: {
           backgroundColor: "#fff",
           elevation: 0,
           width: '100%',
           textAlign: 'center'
       },
       headerTitleStyle: {
           color: "#000",
       },
       headerTintColor:"#000",
       tabBarVisible: false,
       headerLeft:(
           <Button transparent style={SettingStyle.Back} onPress={()=>navigation.goBack()}>
               <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/fanhui.png')} />
           </Button>
       ),
    });
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            check: false,
            money: [ 888, 1888, 2888, 3888 ],

        };
    }


//建议在应用启动时初始化，初始化之前无法使用此模块的其他方法。WeChat模块只需要初始化一次。
    componentDidMount() {
        wechat.registerApp('your appid')

    }


    componentWillUnmount() {

    }




    render() {
        if (this.state.loading && !this.state.error) {
            return <LoginView/>
        } else if (this.state.error) {
            //请求失败view
            return <ErrorView/>
        }else{
            return this.renderView();
        }
    }

    _WxPay(){
     alert('微信支付');
//        http.postData( 'url',
//        function(res){
//            wechat.isWXAppInstalled()
//            .then((isInstalled)=>{
//                 if(isInstalled){
//                     wechat.openWXApp();
//                     wechat.pay(
//                           {
//                               partnerId: '',  // 商家向财付通申请的商家id
//                               prepayId: '',   // 预支付订单
//                               nonceStr: '',   // 随机串，防重发
//                               timeStamp: '',  // 时间戳，防重发
//                               package: '',    // 商家根据财付通文档填写的数据和签名
//                               sign: ''        // 商家根据微信开放平台文档对数据做的签名
//                           }
//                       ).then((success)=>{
//                           console.log(success)
//                       }).catch((error)=>{
//                           console.log(error)
//                       })
//                 }else {
//                     console.log('没有安装微信软件，请您安装微信之后再试')
//                 }
//             })
//         }
    }


    _AliPay() {
        alert('支付宝支付');
    }


    _checkMoney(value) {
        alert(value);
    }

    renderView() {
        return (
            <View style={styles.container}>
                <View style={styles.itemRow}>
                    {
                        this.state.money.map( (value,index) => (
                                <TouchableOpacity onPress={() => this. _checkMoney(value)}
                                    style={styles.row}
                                    activeOpacity={1}
                                >
                                    <Text style={{alignSelf:'center'}}>{value}元</Text>
                                </TouchableOpacity>
                        ))
                    }
                </View>
                <Text>请选择支付方式</Text>
                <View style={{borderColor:'#000',borderWidth:1,padding: 10}}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this._AliPay()}
                        style={{flexDirection:'row',height:30,borderBottomWidth:1,borderColor:'#DBDBDB'}}
                    >
                        <Text>支付宝支付</Text>
                        <Image source={
                            this.state.check ?
                            require('./../../../../images/mine/checked.png')
                            :
                            require('./../../../../images/mine/check.png')
                            }
                        />
                    </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => this._WxPay()}
                        activeOpacity={1}
                        style={{flexDirection:'row',height:30}}
                     >
                        <Text>微信支付</Text>
                        <Image source={
                            this.state.check ?
                            require('./../../../../images/mine/checked.png')
                            :
                            require('./../../../../images/mine/check.png')
                            }
                        />
                     </TouchableOpacity>
                </View>
            </View>
        );

    }

}







