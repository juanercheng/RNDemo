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

import styles from './AccountStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';

import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';
import RecordItem from './RecordItem';

export default class Account extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: "我的账户",
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
            user: '张女士',
            money: 500,
            data: {
                id: 0,
                reduce: 1000,
                add: 2000,
                date: '2018-8-15',
            },
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
        const { navigate } = this.props.navigation;
        const { data } = this.state;
        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.headBox}>
                        <Image style={styles.head}
                            source={require('./../../../../images/mine/touxiang.png')} />
                        <View style={{alignSelf:'center',marginLeft:15}}>
                            <Text style={{fontWeight:'bold'}}>{this.state.user}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{this.state.money}元</Text>
                        <Text>可用余额</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigate('Recharge') }
                    style={{height:30,wdith:'100%',backgroundColor:'pink'}}
                >
                    <Text>立即充值</Text>
                </TouchableOpacity>
                <Text>交易记录</Text>
                /*<FlatList
                    keyExtractor={ (item) => item.id }
                    data={ this.state.data }
                    renderItem={
                        ({item}) => (
                            <RecordItem reduce={item.reduce}
                            add={item.add}
                            date={item.date}
                         />)
                    }
                />*/
            </View>

        );

    }

}