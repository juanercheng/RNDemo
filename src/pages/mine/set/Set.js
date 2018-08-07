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
import ImagePicker from 'react-native-image-picker';

export default class Set extends Component {
    static navigationOptions = ({navigation}) => ({
       headerTitle: "设置",
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
        };
    }

    componentDidMount() {


    }


    componentWillUnmount() {

    }


    _Sets(page) {
        const navigation = this.props.navigation;
        navigation.navigate(page);
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
            <View style={styles.SetContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.SetRow}
                    onPress={() => this._Sets('FeedBack')}
                >
                    <Image style={styles.SetIcon}
                        source={require('./../../../../images/header/news.png')} />
                    <Text>意见反馈</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.SetRow}
                    onPress={() => this._Sets('SoftWare')}
                >
                    <Image style={styles.SetIcon}
                        source={require('./../../../../images/header/news.png')} />
                    <Text>软件更新</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.SetRow}
                    onPress={() => this._Sets('PushSet')}
                >
                    <Image style={styles.SetIcon}
                        source={require('./../../../../images/header/news.png')} />
                    <Text>推送设置</Text>
                </TouchableOpacity>
            </View>

        );

    }

}