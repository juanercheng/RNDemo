/**
 * Created by ChengJuan by 18-03-15
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
import MineIndex from './../mine/MineIndex';  //个人中心
import Recharge from './../mine/recharge/Recharge';  //立即充值
import Credit from './../mine/credit/Credit';  //信贷经理认证
import Account from './../mine/account/Account';  //我的账户
import SetPassword from './../mine/setpassword/SetPassword';  //设置密码
import Set from './../mine/set/Set';  //设置
import FeedBack from './../mine/set/FeedBack';  //意见反馈
import SoftWare from './../mine/set/SoftWare';  //软件更新
import PushSet from './../mine/set/PushSet';  //推送设置
const MinePages = StackNavigator({
    MineIndex: {screen: MineIndex},
    Recharge: {screen: Recharge},
    Credit: {screen: Credit},
    Account: {screen: Account},
    SetPassword: {screen: SetPassword},
    Set: {screen: Set},
    FeedBack: {screen: FeedBack},
    SoftWare: {screen: SoftWare},
    PushSet: {screen: PushSet},
},
{
    headerMode: 'float',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
},{
    initialRouteName:"MineIndex"
});
export default MinePages;