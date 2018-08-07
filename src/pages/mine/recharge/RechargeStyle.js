/**
 * Created by Ld by 2018/8/1.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const boxWidth = Util.size.width / 2 - 20 * 2;


const RechargeStyle = StyleSheet.create({
    container: {
        width: Util.size.width,
        height: Util.size.height,
        padding: 20,
        backgroundColor: '#fff'
    },
    itemRow: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    row: {
        width: boxWidth,
        height: 100,
        backgroundColor: '#DBDBDB',
        borderRadius: 10,
        alignItems: 'center',
        margin: 10
    }
});
export default RechargeStyle;