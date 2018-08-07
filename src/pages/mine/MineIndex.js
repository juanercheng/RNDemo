/**
 * Created by juaner by 18-07-24
 */
import React, {Component} from 'react';
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
} from 'react-native';
import { Container,  Button} from 'native-base';
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';
import SettingStyle from './../../js/SettingStyle';
import styles from './MineStyle';

import api from './../../js/api';
import global from './../../js/global';
import http from './../../js/http';

import LoginView from './../common/LoginView';
import ErrorView from './../common/ErrorView';
import ImagePicker from 'react-native-image-picker';


export default class MineIndex extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            user: '张女士',
            money: 500,
            avatarSource: null,
            arr: ['立即充值','信贷经理认证','我的账户','设置密码'],
            PagesValue: [
                 { id: 0, page: 'Recharge', name: '立即充值' } ,
                 { id: 1, page: 'Credit', name: '信贷经理认证'} ,
                 { id: 2, page: 'Account', name: '我的账户'} ,
                 { id: 3, page: 'SetPassword', name: '设置密码'},
            ],
        };
    }

    //componentDidMount 执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    componentDidMount(){
        //消息未读条数：
//        this.newsNum();
    }

    //在组件销毁的时候要将其移除
    componentWillUnmount(){
    };

    //跳转到详情
    _next(id,productType) {
        console.log(id,productType);
        const navigation = this.props.navigation;
        navigation.navigate('commodityDetails',{
            productId:id,
            productType:productType
        });
    }

    newsNum(){
        let params ={};
        let _this = this;
        http.getData( api.news.newsUrl,params,
            function(res){
                _this._data = res.object;
                console.log(_this._data);
                if(_this._data){
                    _this.setState({
                        loading:false
                    });
                }
            }
        )
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


     //跳转其他页面
    _Pages(name) {
         const navigation = this.props.navigation;
         navigation.navigate(name);
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headBox}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.selectPhotoTapped}>
                            <Image  style={styles.head}
                                source={ this.state.avatarSource ? this.state.avatarSource : require('./../../../images/mine/touxiang.png')} />
                        </TouchableOpacity>
                        <View style={{alignSelf:'center',marginLeft:15}}>
                            <Text style={{fontWeight:'bold'}}>{this.state.user}</Text>
                            <Text style={styles.credit}>认证成功</Text>
                        </View>
                    </View>
                    <Text>账户余额：{this.state.money}</Text>
                </View>
                {
                    this.state.PagesValue.map(  (item) => {
                        console.log(item.page);
                         return (
                              <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this._Pages(item.page)}
                                style={{height: 50,width:'100%',backgroundColor:'#fff',borderBottomWidth:1,borderColor: '#e6e6e6'}}>
                                  <Text key={item.id}>{item.name}</Text>
                              </TouchableOpacity>
                          );
                        }
                    )
                }
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this._Pages('Set') }>
                    <Text>设置</Text>
                </TouchableOpacity>
            </View>
        );
    }







}
