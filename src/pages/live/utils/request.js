import { Md5 } from "ts-md5";
import { nowTime } from './tools'
//把回调模式处理成promise模式,直播页面容易调试处理
const app = getApp().globalData.app
const requestMethods = ['Get', 'Post']
const factoryPromise = (url, data = {}, method = 'Get') => {
    if (!requestMethods.includes(method)) {
        uni.showToast({
            title: '请求模式错误',
            icon: 'none'
        })
        return
    }
    return new Promise((resolve, reject) => {
        app.http[method](url, data, (res) => {
            resolve(res)
        }, (err) => {
            reject(err)
        })
    })
}
export const getLiveRoomData = (roomID) => {
    const ts = nowTime();
    const params = {
        ts,
        sign: Md5.hashStr(`1001room_${roomID}_${ts}`)
    };
    return factoryPromise(`funcApi/brodcast/third/1001/roomInfo/${roomID}`, params)
}
export const getMerchantMessage = (merchantAlias) => {
    return factoryPromise(`dataApi/merchant/1/detail/${merchantAlias}`)
}
export const getUserProfile = (roomID) => {
    return factoryPromise(`funcApi/brodcast/third/1001/user/login/${roomID}`, {
        version: "1.0.0"
    }, 'Post')
}
export const logOutRoom = (roomID, uid) => {
    return factoryPromise(`funcApi/brodcast/third/1001/user/logout/${roomID}`, { uid }, 'Post')
}