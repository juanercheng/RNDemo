/**
 * Created by chengjuan on 2018/8/2.
 */
import React, {Component} from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Footer,
    FooterTab,
    Title,
    Text,
    Tab,
    TabHeading,
    Button,
    Icon,
    Input
} from 'native-base';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Toast,WhiteSpace, WingBlank ,Modal,List} from 'antd-mobile-rn';

import styles from './classifyStyle';
import SettingStyle from './../../js/SettingStyle'

import api from './../../js/api';
import global from './../../js/global';
import http from './../../js/http';

import LoginView from './../common/LoginView';  //正在加载
import NoDataView from './../common/NoDataView';  //列表数据加载完毕
import LoadingDataView from './../common/LoadingDataView';  //正在加载
import ErrorView from './../common/ErrorView';

const Item = List.Item
const Brief = Item.Brief
export default class customerDetails extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: ("客户信息"),
        headerStyle: {
            backgroundColor: "#fff",
            elevation: 0
        },
        headerTitleStyle: {
            color: "#000",
            alignSelf: 'center'
        },
        headerTintColor: "#000",
        tabBarVisible: false,
        headerLeft:(
            <TouchableOpacity transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('../../../images/header/fanhui.png')} />
            </TouchableOpacity>
        ),
    })

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            error: false,
            data:null,
            type:null,
            modalVisible: false
        }
    }
    componentDidMount() {
        this.setState({
            type:this.props.navigation.state.params.Type
        },()=>console.log(this.state.type,'type'));
        this.fetchData();
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    };

    _next(routName,orderNo,type) {
        const {navigate} = this.props.navigation;
        navigate(routName, {
            orderNo: orderNo,
            type: type,
            key:this.props.navigation.state.key
        })
    }

    fetchData() {
        let params ={
            productId:this.props.navigation.state.params.Id||13,
            productType:10000,
            token:'ac91a4a5-15be-4adf-acbc-57a39ee15dd4'
        };
        let _this = this;
        http.postData( api.news.info,params,
            function(res){
                console.log(res);
                if(res.code===0){
                    _this._data = res.object;
                    _this.setState({
                        loading: false,
                        data:_this._data,
                    });
                }
            }
        )
    }

    message(){
        return(
            <View>
                <Image source={require('../../../images/header/fanhui.png')} />
                <Text>您的余额不足，请充值</Text>
            </View>
        )
    }
    take(id){
        this.setState({ modalVisible: true });
        // Modal.alert('温馨提示', ('您的余额不足，请充值'), [
        //     { text: '取消', onPress: () => console.log('cancel') },
        //     { text: '确认', onPress: () => {
        //             console.log('cancel')
        //        this._next('Recharge')
        //     }}
        // ]);
    }
    confirm(){
        this.setState({ modalVisible: false });
        this._next('Recharge')
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
        return(
            <Container>
                <View style={styles.topBox}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.writeText}>刘女士</Text>
                            <Text style={styles.blueText}>已实名</Text>
                        </View>
                        <Text style={styles.writeText}>10分钟前</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.writeText}>138092373</Text>
                        <Image source={require('../../../images/header/fanhui.png')}/>
                    </View>
                    <View  style={styles.topCenterBox}>
                        <View >
                            <Text>10000.00元</Text>
                            <Text>贷款金额</Text>
                        </View>
                        <View>
                            <Text>24个月</Text>
                            <Text>贷款期限</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.ContentDetails}>
                    <View style={styles.ContentDetailsItem}>
                        <View style={styles.Item01}>
                            <Image source={require('../../../images/header/fanhui.png')}/>
                            <Text style={styles.Item01Tilte}>个人信息</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>年龄：30</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>城市：上海</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>户籍地址：上海</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>学历：本科</Text>
                        </View>
                    </View>
                    <View style={styles.ContentDetailsItem}>
                        <View style={styles.Item01}>
                            <Image source={require('../../../images/header/fanhui.png')}/>
                            <Text style={styles.Item01Tilte}>工作信息</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>月收入：10000元</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>收入形式：工资</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>公司名称：没有就隐藏掉</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>职业身份：工程师</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>社保公积：有</Text>
                        </View>
                    </View>
                    <View style={styles.ContentDetailsItem}>
                        <View style={styles.Item01}>
                            <Image source={require('../../../images/header/fanhui.png')}/>
                            <Text style={styles.Item01Tilte}>资产信息</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>信用卡额度：500000元</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>信用记录：优良</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>微粒贷：有</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>房产：有</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>不接受抵押（没有就隐藏掉）</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>车产：有</Text>
                        </View>
                        <View>
                            <Text style={styles.ItemText}>商业保险：有</Text>
                        </View>
                    </View>
                </View>
                {
                    this.state.type !== 'no' ? (
                        <View style={styles.buttonBox}>
                            <TouchableOpacity onPress={()=>this.take()}><Text style={styles.btnText}>立即抢单</Text></TouchableOpacity>
                        </View>
                    ) : null
                }
                <Modal
                    animationType="fade"
                    transparent={true}
                    style={styles.alert}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}>
                    <View style={{ marginTop:1}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{flex:11,textAlign:'center'}}>温馨提示</Text>
                            <Image source={require('../../../images/header/fanhui.png')}
                                   style={{flex:1}}
                                   onPress={() => {this.setState({ modalVisible: false });
                                   }}/>
                        </View>
                        <View style={styles.alertContent}>
                            <Image source={require('../../../images/1.png')}
                                   style={{width:50,height:50}}/>
                            <Text style={[styles.alertContentText,SettingStyle.font14]}>您的余额不足，请充值</Text>
                        </View>
                        <View style={styles.btnBox}>
                            <TouchableOpacity style={[styles.alertBtn,styles.btnCancel]}
                                onPress={() => {this.setState({ modalVisible: false });}}>
                                <Text style={styles.btnCancelText}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.alertBtn,styles.btnConfirm]}
                                onPress={() => this.confirm()}>
                                <Text style={styles.btnConfirmText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }
}