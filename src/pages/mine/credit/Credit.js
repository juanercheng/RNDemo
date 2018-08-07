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

import styles from './CreditStyle';

import api from './../../../js/api';
import global from './../../../js/global';
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';
import LoginView from './../../common/LoginView';
import ErrorView from './../../common/ErrorView';

import CityPickers from './CityPickers';

import ImagePicker from 'react-native-image-picker';

export default class Credit extends Component {
    static navigationOptions = ({navigation}) => ({
       headerTitle: "信贷经理认证",
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
            name: null,
            mobile: null,
            idNumber: null,
            company: null,
            companyMobile: null,
            avatarSource: null,
        };
    }



      DES加密
        encryptByDES(message, key) {
           var CryptoJS = require("crypto-js");
           var keyHex = CryptoJS.enc.Utf8.parse(key);
           var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
               mode: CryptoJS.mode.ECB,
               padding: CryptoJS.pad.Pkcs7
           });
           return encrypted.toString();
        }

        _Sub() {
           const { name, mobile, idNumber, company, companyMobile } = this.state;
           let dataSub = {};
           dataSub.name = name;
           dataSub.mobile = mobile;
           dataSub.idNumber = idNumber;
           dataSub.company = company;
           dataSub.companyMobile = companyMobile;
           if( name == null || !name )    {
               return alert('姓名不能为空');
           }
           if( mobile == null || !mobile )    {
               return alert('手机号码不能为空');
           }
           if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile))) {
               return alert('请输入正确的手机号码');
           }
           if (idNumber == null  || !idNumber){
               return alert('身份证号不能为空');
           }
           if (!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(idNumber))){
              return alert('请输入正确的身份证号');
           }
           if (company == null  || !company){
               return alert('公司名称不能为空');
           }
           if(companyMobile == null || !companyMobile ) {
               return alert('公司电话不能为空');
           }
           if(!(/^(\\+\\d{2}-)?0\\d{2,3}-\\d{7,8}$/.test(companyMobile))) {
               return alert('请输入正确的公司电话');
           }



    //       this.fetchSub(dataSub);
        }



       //提交接口
       fetchSub(data){
           return fetch( Util.Path ,{
               method:"post",
               headers:{
                   "Content-type":"application:/x-www-form-urlencoded"
               },
           })
               .then((response) => response.json())
               .then((responseJson) => {
                   if(responseJson.code == 0){
                       console.log(responseJson);
                       const { goBack } = this.props.navigation;
                       goBack();
                   }else{
                       console.log(responseJson.msg);
                   }
               })
               .catch(function(err){
                   console.log("Fetch错误:"+err);
               });
       }

        //选择图片
        selectPhotoTapped = () => {
            const options = {
                title: null,
                cancelButtonTitle: '取消',
                takePhotoButtonTitle: '相机',
                chooseFromLibraryButtonTitle: '从相册选择',
                cameraType: 'back',
                mediaType: 'photo',
                videoQuality: 'high',
                durationLimit: 10,
                maxWidth: 300,
                maxHeight: 300,
                quality: 0.8,
                angle: 0,
                allowsEditing: false,
                noData: false,
                storageOptions: {
                    skipBackup: true
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('用户取消了选择！');
                }
                else if (response.error) {
                    console.log('ImagePicker发生错误: ', response.error);
                }
                else if (response.customButton) {
                    console.log('自定义点击按钮: ', response.customButton);
                }
                else {
                    let source = { uri: response.uri };
                    // You can also display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                    this.setState({
                        avatarSource: source
                    });
                }
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
            <ScrollView>
            <View style={styles.container}>

                 <TextInput
                    placeholder="请输入姓名"
                    underlineColorAndroid='transparent'
                    style={styles.inputBox}
                    onChangeText={ (name) => this.setState({name}) }
                 />
                                <TextInput
                                    placeholder="请输入手机号"
                                    keyboardType={'phone-pad'}
                                    underlineColorAndroid='transparent'
                                    style={styles.inputBox}
                                    onChangeText={ (mobile) => this.setState({mobile}) }
                                />
                                <TextInput
                                    placeholder="请输入身份证号"
                                    underlineColorAndroid='transparent'
                                    style={styles.inputBox}
                                    onChangeText={ (idNumber) => this.setState({idNumber}) }
                                />
                                 <TextInput
                                    placeholder="请输入公司名称"
                                    underlineColorAndroid='transparent'
                                    style={styles.inputBox}
                                    onChangeText={ (company) => this.setState({company}) }
                                 />
                                <TextInput
                                    placeholder="请输入公司电话"
                                    keyboardType={'number-pad'}
                                    underlineColorAndroid='transparent'
                                    style={styles.inputBox}
                                    onChangeText = {(companyMobile) => this.setState({companyMobile})}
                                />
                                <CityPickers />
                                <View>
                                    <Text>审核状态:</Text>
                                </View>
                                <View>
                                    <Text>请上传证件照</Text>
                                    <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
                                        <Image  style={styles.head}
                                            source={
                                                this.state.avatarSource ?
                                                this.state.avatarSource :
                                                require('./../../../../images/mine/zhengmianshenfenzheng.png')} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => this._Sub()}>
                                    <Text>提交</Text>
                                </TouchableOpacity>

             </View>
             </ScrollView>
        )

    }

}