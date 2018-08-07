/**
 * Created by ChengJuan by 18-07-24
 */
import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Button,
    ScrollableTab,
    TouchableHighlight,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import HomePage from './../home/HomeContent';
import Login from './../home/login/Login';
import locationCity from './../home/location/locationCity'
import locationProvince from './../home/location/locationProvince'
import customerDetails from './../classify/customerDetails'
import news from './../home/news/news'
import newsDetails from "../home/news/newsDetails";
import Recharge from './../mine/recharge/Recharge';  //立即充值

const HomePages = StackNavigator({
    Home: {screen: HomePage},
    // Login: {
    //     screen: Login,
    //     navigationOptions: {
    //         header: null,
    //         tabBarVisible: false
    //     },
    // },
    locationCity: {screen: locationCity},
    locationProvince: {screen: locationProvince},
    customerDetails: {screen: customerDetails},
    news:{screen: news},
    newsDetails:{screen:newsDetails},
    Recharge: {screen: Recharge},
}, {
    headerMode: 'float',
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
}, {
    initialRouteName: "Home"
});
export default HomePages;