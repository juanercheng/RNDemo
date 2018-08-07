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
import { Container,  Button } from 'native-base';
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';

import styles from './SetStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';
import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';
//import { NativeModules } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class SoftWare extends Component {
    static navigationOptions = ({navigation}) => ({
       headerTitle: "软件更新",
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
            currentVersion: '3.2.0',
            newVersion: '3.3.0'
        };
    }

    componentDidMount() {


    }

     //接收下载进度
    componentWillMount(){
//       DeviceEventEmitter.addListener('LOAD_PROGRESS',(msg)=>{
//           let title = "当前下载进度：" + msg
//           ToastAndroid.show(title, ToastAndroid.SHORT);
//       });
    }

    //版本更新
//    _Update = () => {
//
//       // Android
//       Http.get(Api.api_checkupdate, null, false, (result)=>{
//           if(result.ok) {
//               // 下载最新Apk
//               NativeModules.upgrade.upgrade(this.state.apkUrl);
//           }
//       });
//       // iOS
//       NativeModules.upgrade.upgrade('Apple ID',(msg) =>{
//           if('YES' == msg) {
//              //跳转到APP Stroe
//              NativeModules.upgrade.openAPPStore('Apple ID');
//           } else {
//               alert('当前为最新版本');
//           }
//       })
//
//    }

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

    renderView() {
        return (
            <View>
               <View></View>
               <View>
                    <Text>当前版本</Text>
                    <Text>{this.state.currentVersion}</Text>
               </View>
               <View>
                   <Text>新版更新</Text>
                   <Text>{this.state.newVersion}</Text>
               </View>

               {
                    this.state.newVersion == '暂无新版' ?
                    <Text>无新版本</Text>
                    :
                    <TouchableOpacity>
                        <Text>立即更新</Text>
                    </TouchableOpacity>
               }
            </View>

        );

    }

}