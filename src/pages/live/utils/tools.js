/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-10-27 15:20:40
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-11 11:49:56
 * @FilePath: \card-world\src\pages\live\utils\tools.js
 * @Description: tools
 */
const deviceInfo = getApp().globalData.app.platform.systemInfo //设备信息
export const nowTime = () => {
    return Math.round(new Date() / 1000)
}
export const goIndex = () => {
    uni.switchTab({
        url: '/pages/index/index'
    })
}
export const $confirm = (content = "提示", title = "直播间提示", showCancel = true) => {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title,
            content,
            showCancel,
            success: ({ confirm, cancel }) => {
                if (confirm) {
                    resolve()
                    return
                }
                if (cancel) {
                    reject()
                }
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
export const $toast = {
    success: (message = "", mask = false) => {
        uni.showToast({
            title: message,
            icon: 'success',
            mask
        })
    },
    info: (message = "", mask = false) => {
        uni.showToast({
            title: message,
            icon: 'none',
            mask
        })
    },
}
export const packInsertAlgorithm = (insertList, oldList) => {
    if (!insertList || !insertList.length) return []
    let
        deepOldList = JSON.parse(JSON.stringify(oldList)),
        countDownList = [],//倒计列表
        unCountDownList = [],//立即可领列表
        unCountDownIndex = -1;//可立即可领插入索引
    for (let i = 0, len = insertList.length; i < len; i++) {
        if (insertList[i].disappear) continue; //disappear:是否可以关闭入口
        //存在开抢时间
        if (insertList[i].startTime) {
            Number(insertList[i].startTime);
            insertList[i].state = 0; //state设为可抢
            countDownList.push(insertList[i]);
        } else {
            unCountDownList.push(insertList[i]);
        }
    }
    if (!deepOldList.length) return [...unCountDownList, countDownList] //老列表无长度直接返回新排序列表
    if (!unCountDownList.length) return [...deepOldList, ...countDownList] //插入列表无可立即领取
    //存在老列表&&有可立即领取列表
    unCountDownIndex = deepOldList.findIndex((item) => { //寻找老列表中最近的一个倒计时,若找到则说明这个倒计时元素的前一个就是可领取状态或者空
        return item.state != 0
    })
    if (unCountDownIndex == -1 && unCountDownList.length) {
        //未找到并且新立即可领列表中有可立即可领的
        deepOldList.unshift(...unCountDownList);
    }
    if (unCountDownIndex >= 0 && unCountDownList.length) {
        //找到
        deepOldList.splice(unCountDownIndex, 0, ...unCountDownList);
    }
    //插入一次倒计时红包
    deepOldList.push(...countDownList);
    return deepOldList
}