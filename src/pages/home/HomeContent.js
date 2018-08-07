/**
 * Created by chengjuan by 18-07-24
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
    Modal,
    ScrollView,
    ListView,
    TouchableHighlight,
} from 'react-native';
import { Container,  Button,Text,Header,Tabs,Tab, ScrollableTab,TabHeading, } from 'native-base';
import { Toast,WhiteSpace } from 'antd-mobile-rn';

import styles from './HomeStyle';
import SettingStyle from './../../js/SettingStyle'
import api from './../../js/api';
import global from './../../js/global';
import http from './../../js/http';

import LoginView from './../common/LoginView'
import ErrorView from './../common/ErrorView'
import NoDataView from './../common/NoDataView';
import LoadingDataView from './../common/LoadingDataView';

// import HomeList from './HomeList'

let pageNo = 1;//当前第几页
let totalElements;//总的页数

export default class HomeContent extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cityName:'定位',
            error: false,
            Tab:[
                {id:0,title:'全部',isSelected:true},
                {id:1,title:'社保贷',isSelected:false},
                {id:2,title:'公积金贷1',isSelected:false},
                {id:3,title:'公积金贷22',isSelected:false},
                {id:4,title:'公积金贷222',isSelected:false},
                {id:5,title:'公积金贷2222',isSelected:false},
                {id:6,title:'公积金贷222222',isSelected:false},
                {id:7,title:'公积金贷333333',isSelected:false},
                {id:8,title:'公积金贷3公积金贷3',isSelected:false},
                {id:9,title:'公积金贷3公积金贷3',isSelected:false},
            ],
            longitude:108.95200333333332,
            latitude:34.332,
            Type:1,
            isVisible: false,
            shop:[],
            dataArray:[],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            refreshing: false,
        };
    }

    //componentDidMount 执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    componentDidMount(){
        //定位
        this._location();
    }

    //在组件销毁的时候要将其移除
    componentWillUnmount(){
        pageNo = 1
    };

    //路由跳转及传参
    endClick(routName,id,type) {
        const { navigate } = this.props.navigation;
        navigate( routName ,{
            Id:id,
            Type:type
        })
    }

    //定位
    _location(){
        let _this = this
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let longitude = JSON.stringify(position.coords.longitude);//经度
                let latitude = JSON.stringify(position.coords.latitude);//纬度
                console.log(longitude,latitude)
                let params;
                if (this.props.navigation.state.params === undefined){
                    params = {
                        longitude:_this.state.longitude,
                        latitude:_this.state.latitude,
                        distance:10000
                    };
                }else{
                    params = {
                        cityId:this.props.navigation.state.params.cityid
                    };
                    this.setState({
                        cityName:this.props.navigation.state.params.cityname
                    })
                }
                //这是获取当前所在城市的接口
                fetch('https://api.map.baidu.com/geocoder/v2/?output=json&ak=cDCkkEQi3R9SjxEOxUI70liDMGiGzNO0&location='+this.state.latitude+','+this.state.longitude+'&qq-pf-to=pcqq.c2c')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    // console.log(responseJson.result.addressComponent.city);
                    if(responseJson.status===0){
                        if(this.props.navigation.state.params === undefined){
                            this.setState({
                                cityName:responseJson.result.addressComponent.city,
                                loading:false,
                            })
                        }
                        _this.fetchData(params)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            (error) =>{
                console.log(error);
                _this.setState({
                    loading:false,
                    error:true
                });
            },
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
        );
    }

    fetchData(params) {
        //获取数据
        let _this = this
        http.postNoTokenData( api.home.getShopForNearby,params,
            function(res){
                if (res.code === 0){
                    _this._data = res.object;
                    let data =  _this._data;
                    let dataBlob = [];
                    if(data.length>0){
                        data.map(function (item) {
                            dataBlob.push(item)
                        });
                    }
                    totalElements = data.length;

                    if( pageNo === 1){
                        if(data.length>0){
                            _this.setState({
                                // loading:false,
                                dataArray: dataBlob
                            });
                            if( totalElements <10){
                                _this.setState({showFoot:1});
                            }
                        }else {
                            _this.setState({
                                // loading:false,
                                showFoot: 0
                            })
                        }
                    }else{
                        _this.setState({
                            dataArray:_this.state.dataArray.concat(dataBlob),
                            // loading:false,
                        })
                        if( totalElements <10){
                            _this.setState({showFoot:1});
                        }
                    }

                    data = null;
                    dataBlob = null;
                }else{
                    console.log(res.msg)
                }
            }
        )
    }

    //下拉选择订单
    showSpinner() {
        this.setState({
            isVisible: !this.state.isVisible,
        });
    }
    //下拉列表每一行点击事件
    onItemClick(spinnerItem) {
        this.setState({
            isVisible: false
        });
    }

    //tabs切换
    tabClick (index, item){
        let array = this.state.Tab;
        for (let i = 0; i < array.length; i++) {
            let item = array[i];
            item.isSelected = false;
            if (i === index) {
                item.isSelected = true;
            }
        }

        this.setState({Tab: this.state.Tab,showFoot:2})

        //列表数据接口
        let params;
        params = {
            longitude:this.state.longitude,
            latitude:this.state.latitude,
            distance:10000
        };
        this.setState({
            dataArray:[],
        })
        this.fetchData(params)
    }
    //END tabs切换

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

    //主内容
    renderView() {
        let _this = this
        return (
            <Container>
                <View searchBar rounded style={styles.header}>
                    <TouchableOpacity onPress={()=>this.endClick('locationProvince',this.state.cityName)}
                                      style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>{this.state.cityName}</Text>
                        <Image source={require('../../../images/home/xiala.png')}
                               style={{marginLeft: 5}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.endClick('news')}
                        style={{position:'relative',flexDirection:'row',alignItems:'center'}}>
                        <Image source={require('../../../images/home/xiaoxi.png')}
                               style={{marginRight: 5}}/>
                        {
                            this.state.newsNum?(<Image source={require('./../../../images/header/news.png')}/>):null
                        }
                        <Text>消息</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    {
                        _this.renderTopic()
                    }
                    <View style={styles.select}>
                        <TouchableOpacity onPress={()=>_this.showSpinner()}
                                          style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text>全部订单</Text>
                            <Image source={_this.state.isVisible?require('../../../images/home/xiala.png'):require('../../../images/home/xiala.png')} />
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.isVisible?(
                            <View style={styles.selectBox}>
                                <TouchableOpacity  onPress={()=>_this.onItemClick(0)}>
                                    <Text style={styles.selectItem}>全部订单</Text>
                                </TouchableOpacity>
                                <TouchableOpacity   onPress={()=>_this.onItemClick(1)}>
                                    <Text style={styles.selectItem}>可抢订单</Text>
                                </TouchableOpacity>
                            </View>
                        ):null
                    }
                </View>
                {
                    _this.renderListView()
                }
                {/*<HomeList Type='2' onClick={this.endClick} nextClick={(routName,id,title) => {this.endClick(routName,id)}}  />*/}
            </Container>
        );
    }
    //END主内容

    //顶部tab渲染
    renderTopic() {
        return (
            <View style={styles.topic}>
                <FlatList
                    data={this.state.Tab}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderTopicItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    extraData={this.state}
                />
            </View>
        )
    }
    renderTopicItem = ({ index,item }) => {
        let _this = this
        return (
            <TouchableOpacity style={item.isSelected?styles.topicItemActive:styles.topicItem}
                              key={item.id}
                              onPress={()=>_this.tabClick(index,item)} >
                <Text style={item.isSelected?styles.Active:styles.topicTitle} >{item.title}</Text>
            </TouchableOpacity>
        )
    }
    //END顶部tab渲染

    //列表渲染
    renderListView(){
        return(
            <View>
                <FlatList
                    data={this.state.dataArray}

                    //使用 ref 可以获取到相应的组件
                    //ref={(flatList) => this._flatList = flatList}
                    //ListHeaderComponent={this._header}//header头部组件

                    ListFooterComponent={this._renderFooter.bind(this)}

                    //ItemSeparatorComponent={ItemDivideComponent}//分割线组件

                    //空数据视图,可以是React Component,也可以是一个render函数，或者渲染好的element。
                    // ListEmptyComponent={this._createEmptyView()}

                    keyExtractor={this._keyExtractor}

                    //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                    //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                    //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
                    //                      getItemLayout={(data, index) => ( {length: 44, offset: (44 + 1) * index, index} )}

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
            </View>
        )
    }
    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <NoDataView/>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <LoadingDataView />
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text> </Text>
                </View>
            );
        }
    };
    _createEmptyView(){
        return (
            <View>
                <Text style={[{color:'#999',marginTop:25,textAlign:'center'},SettingStyle.font14]}>暂无数据</Text>
            </View>
        );
    };
    _onRefresh=()=>{
        pageNo=1;
        if(!this.state.refreshing){
            // this.fetchData(pageNo);
        }
    };
    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        this.setState({showFoot:2});
        pageNo++;
        //获取数据
        // this.fetchData( pageNo );
    }
    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;
    _renderItem = (value, index) => {
        let busOrderDetailsVoList = value.busOrderDetailsVoList;
        return (
            <View style={styles.listItemBox}>
                <View style={styles.listItemName}>
                    <View style={SettingStyle.row}>
                        <Text>刘女士</Text>
                        <Text style={styles.userStatus}>已实名</Text>
                    </View>
                    <Text style={styles.time}>10分钟前</Text>
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
                        <TouchableOpacity onPress={()=>this.endClick('customerDetails',value.id,1)}>
                            <View style={{height:100}} >
                                <Text>可接单</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };
    //END列表渲染

}
