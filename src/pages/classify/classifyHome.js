/**
 * Created by juaner by 18-07-24
 */
import React, {Component} from 'react';
import { Container, Button, Text } from 'native-base';
import {Alert, TextInput, View, Platform, Image, Linking, FlatList, DeviceEventEmitter, TouchableOpacity, ViewPagerAndroid, ScrollView, TouchableHighlight,
} from 'react-native';
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';

import styles from './classifyStyle';
import SettingStyle from './../../js/SettingStyle'

import api from './../../js/api';
import global from './../../js/global';
import http from './../../js/http';

import LoginView from './../common/LoginView';  //正在加载
import NoDataView from './../common/NoDataView';  //列表数据加载完毕
import LoadingDataView from './../common/LoadingDataView';  //正在加载
import ErrorView from './../common/ErrorView';
import customerDetails from "./customerDetails";

let pageNo = 1;//当前第几页
let totalElements;//总的页数

export default class classifyHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            error: false,
            dataArray: [],
            pageSize:10,
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        };
    }

    //componentDidMount 执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    componentDidMount(){
        this.fetchData();
    }

    //在组件销毁的时候要将其移除
    componentWillUnmount(){
        pageNo = 1
    }

    //跳转到详情
    _next(name,id,type) {
        console.log(id);
        const navigation = this.props.navigation;
        navigation.navigate(name,{
            Id:id,
            Type:type
        });
    }

    fetchData(){
        let _this = this;
        let params ={
            pageCurrent:pageNo,
            pageSize:_this.state.pageSize,
            shopId:1
        };
        http.getData( api.news.newsUrl,params,
            function(res){
                if(res.code===0){
                    _this._data = res.object.baokuan;
                    console.log(res,989);
                    let data =  _this._data;
                    let dataBlob = [];
                    if(data.length>0){
                        data.map(function (item) {
                            dataBlob.push(item)
                        });
                    }

                    if( pageNo === 1){
                        _this.setState({
                            loading: false,
                            dataArray: dataBlob
                        })
                    }else{
                        _this.setState({
                            dataArray:_this.state.dataArray.concat(dataBlob),
                            loading: false,
                        })
                    }

                    totalElements = data.length;

                    if( totalElements <_this.state.pageSize){
                        _this.setState({showFoot:1});
                    }
                    data = null;
                    dataBlob = null;
                }else {
                    _this.setState({
                        error:true
                    })
                }
            }
        )
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
            <Container>
                <View searchBar rounded style={styles.header}>
                    <Text>客户</Text>
                </View>
                <FlatList
                    data={this.state.dataArray}
                    //使用 ref 可以获取到相应的组件
                    //ref={(flatList) => this._flatList = flatList}
                    //ListHeaderComponent={this._header}//header头部组件
                    ListFooterComponent={this._renderFooter.bind(this)}
                    //ItemSeparatorComponent={ItemDivideComponent}//分割线组件
                    //空数据视图,可以是React Component,也可以是一个render函数，或者渲染好的element。
                    ListEmptyComponent={this.createEmptyView()}
                    keyExtractor={this._keyExtractor}
                    //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                    //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                    //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
                    //getItemLayout={(data, index) => ( {length: 44, offset: (44 + 1) * index, index} )}
                    //决定当距离内容最底部还有多远时触发onEndReached回调。
                    //注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    onEndReachedThreshold={1}
                    //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                    onEndReached={this._onEndReached.bind(this)}
                    //下拉刷新
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                    //渲染列表数据
                    renderItem={({ item ,index}) => this._renderItem(item,index)}
                />
            </Container>
        );
    }

    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <NoDataView />
            );
        } else if(this.state.showFoot === 2) {
            return (
                <LoadingDataView />
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    };

    createEmptyView() {
        return (
            <View style={{backgroundColor:'#fff',height:'100%'}}>
                <View style={{backgroundColor:'#fff',alignItems:'center',paddingTop:50}}>
                    <Text style={[{color:'#999',marginTop:25},SettingStyle.font14]}>没有数据</Text>
                </View>
            </View>
        );
    };

    _onRefresh=()=>{
        pageNo=1;
        if(!this.state.refreshing){
            this.fetchData(pageNo);
        }
    };

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot !== 0 ){
            return ;
        }
        this.setState({showFoot:2});
        pageNo++;
        //获取数据
        this.fetchData( pageNo );
    }

    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;

    _renderItem = (value, index) => {
        return (
            <View style={styles.listItemBox}>
                <View style={styles.listItemName}>
                    <TouchableOpacity onPress={()=>this._next('customerDetails',value.id,'no')}>
                        <View style={SettingStyle.row}>
                            <Text>刘女士</Text>
                            <Text style={styles.userStatus}>已实名</Text>
                        </View>
                        <Text style={styles.time}>10分钟前</Text>
                    </TouchableOpacity>
                </View>
                <View style={[SettingStyle.row,styles.listItemTime]}>
                    <View style={[SettingStyle.row,styles.listItemTimeCon]}>
                        <Image source={require('../../../images/home/xiala.png')}/>
                        <Text>贷款期限3~12个月</Text>
                    </View>
                    <View  style={[SettingStyle.row,styles.listItemTimeCon]}>
                        <Image source={require('../../../images/home/xiala.png')}/>
                        <Text>金额1200，00元</Text>
                    </View>
                </View>
                <View style={[styles.listItemInfo]}>
                    <View style={[SettingStyle.row,styles.listItemInfoLi]}>
                        <Text>月收入10000元</Text>
                        <View style={[SettingStyle.row,styles.listItemInfoLis]}>
                            <Image source={require('../../../images/home/xiala.png')}/>
                            <Text>所在地区：上海市</Text>
                        </View>
                    </View>
                    <View style={[SettingStyle.row,styles.listItemInfoLi]}>
                        <Text>行业：IT行业</Text>
                        <View style={[SettingStyle.row,styles.listItemInfoLis]}>
                            <Image source={require('../../../images/home/xiala.png')}/>
                            <Text>户籍地址：上海市</Text>
                        </View>
                    </View>
                    <View style={[SettingStyle.row,styles.listItemAction]}>
                        <View style={[SettingStyle.row,styles.labelBox]}>
                            <Text style={styles.label}>房产</Text>
                            <Text style={styles.label}>车产</Text>
                            <Text style={styles.label}>社保公积金</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    };
}
