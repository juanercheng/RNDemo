import React, { Component } from 'react';
import { Container,Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    View,
    Image,
    TouchableOpacity,
    ViewPagerAndroid,
    StyleSheet,
    TouchableHighlight,
    ImageBackground
}from 'react-native';
import SettingStyle from '../../js/SettingStyle'
export default class ErrorView extends Component {
    render() {
        return (
            <View style={SettingStyle.emptyWrap}>
                <Text style={[SettingStyle.font14,{color:"#999"}]}>无法定位当前位置，请开启GPS定位</Text>
            </View>
        );
    }
}

module.exports = ErrorView;