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
import { Toast, WhiteSpace, WingBlank} from 'antd-mobile';
//import Toast, {DURATION} from 'react-native-easy-toast';
import styles from './SetStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';
import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';
import ImagePicker from 'react-native-image-picker';

export default class FeedBack extends Component {
    static navigationOptions = ({navigation}) => ({
       headerTitle: "意见反馈",
       headerStyle: {
           backgroundColor: "#fff",

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
            text: '',
            mobile: '',
        };
    }




    componentDidMount() {
        setTimeout(() => {
            Toast.hide();
        }, 3000);

    }


    componentWillUnmount() {

    }



    //DES加密
    encryptByDES(message, key) {
        var CryptoJS = require("crypto-js");
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }



    _SubMit() {
        let data = {};
        data.mobile = this.state.mobile;
        data.text = this.state.text;
        console.log(data);

        if (this.state.text == '' || !this.state.text){
            return alert('请输入反馈');
        }
        if (this.state.mobile == '' || !this.state.mobile){
            return alert('请输入手机号');
        }
        if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.state.mobile))) {
            return alert('请输入正确的手机号')
        }else {
            //DES加密
            console.log(data)
//            this.fetchData(data);
            const { goBack } = this.props.navigation;
            goBack ();
        }
    }


    fetchData(data){
        return fetch(url , {
            method: 'POST',
        }).then(response => response.json())
        .then(responseJson => {
            return responseJson;
            const { goBack } = this.props.navigation;
            goBack ();
        })
        .catch(error => {
            console.error(error);
        });
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

    renderView() {
        return (
           <View style={{padding: 20}}>
                <Text>请填写您的意见和建议</Text>
                <TextInput style={{height:100,textAlignVertical:'top',borderWidth:1,borderColor: '#000'}}
                    multiline={true}
                    underlineColorAndroid='transparent'
                    placeholder="请填写您的意见和建议"
                    clearTextOnFocus={true}
                    maxLength={100}
                    onChangeText={ (text) => this.setState({text})}
                ></TextInput>
                <Text>请填写您的联系方式</Text>
                <TextInput style={{height:30,textAlignVertical:'top',borderWidth:1,borderColor: '#000'}}
                    placeholder="请输入手机号码"
                    keyboardType='phone-pad'
                    placeholderTextColor="#888888"
                    underlineColorAndroid='transparent'
                    onChangeText={(mobile) => this.setState({mobile})}
                ></TextInput>
                <TouchableOpacity onPress={() => this._SubMit()}
                >
                    <Text>提交</Text>
                </TouchableOpacity>
           </View>

        );

    }

}