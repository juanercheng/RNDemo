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
    Text,
    Switch
} from 'react-native';
import { Container, Button } from 'native-base';
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';


import styles from './SetStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';
import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';
import ImagePicker from 'react-native-image-picker';

export default class PushSet extends Component {
    static navigationOptions = ({navigation}) => ({
       headerTitle: "推送设置",
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
            value: false,  //开关状态
            disabled: false,
        };
    }

    componentDidMount() {


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

    renderView() {
        return (
             <View style={{flexDirection:'row',paddingLeft:20,marginTop:20}}>
                <Text>推送设置</Text>
                <Switch style={{marginLeft:20}}
                    value={this.state.value}
                    disabled={this.state.disabled}
                    onValueChange={(value)=>{this.setState({value})}}
                    onTintColor='green'
                    thumbTintColor='#fff'
                    tintColor='#888'
                />
             </View>
        );

    }

}