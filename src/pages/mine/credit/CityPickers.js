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
    Text
} from 'react-native';
import { Container,  Button } from 'native-base';
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';

import styles from './CreditStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';
import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';
import ImagePicker from 'react-native-image-picker';


import { PickerView } from 'antd-mobile';

const seasons = [
  [
    {
      label: '陕西省',
      value: '陕西省',
    },
    {
      label: '陕西省',
      value: '陕西省',
    },
  ],
  [
    {
      label: '西安市',
      value: '西安市',
    },
    {
      label: '渭南市',
      value: '渭南市',
    },
  ],
];

export default class CityPickers extends Component {
  state = {
    value: null,
  };
  onChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  }
  onScrollChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <PickerView
        onChange={this.onChange}
        onScrollChange={this.onScrollChange}
        value={this.state.value}
        data={seasons}
        cascade={false}
      />
    );
  }
}
