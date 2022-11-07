/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-10-27 15:19:30
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-01 15:30:13
 * @FilePath: \card-world\src\pages\live\utils\request.js
 * @Description:
 */
import { Md5 } from "ts-md5";
import { nowTime } from './tools'
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
export const startLiveBroadcast=(roomID)=>{
    return factoryPromise(`funcApi/brodcast/third/1001/achor/push/${roomID}`,'Post')
}