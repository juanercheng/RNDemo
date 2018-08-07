/**
 * Created by Ld by 2018/8/1.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const AccountStyle = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        height: 130,
    },
    headBox: {
        flexDirection: 'row',
    },
    head: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    credit:{
        fontSize: 12,
        color: '#fff',
        width:60,
        height: 20,
        backgroundColor: '#000',
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 5
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    }
});
export default AccountStyle;