/**
 * Created by Ld on 2018/8/2.
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
    StyleSheet,
} from 'react-native';

import styles from './AccountStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';

import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';


export default class RecordItem extends Component {

//    constructor(props) {
//        super(props);
//        this.state = {
//            loading: false,
//            error: false,
//        };
//    }

    componentDidMount() {


    }


    componentWillUnmount() {

    }


    render() {
        const { reduce ,add ,date} = this.props;
        return(
             <View style={{backgroundColor:'#fff',marginTop:20}}>
                <View style={styles.itemRow}>
                    <Text>抢单成功</Text>
                    <Text>-{reduce}元</Text>
                </View>
                <View style={styles.itemRow}>
                    <Text>账户充值</Text>
                    <Text>+{add}元</Text>
                </View>
                <Text>交易时间:{date}</Text>
             </View>
        );
    }
}
