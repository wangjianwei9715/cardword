/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-25 20:11:24
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-09-05 16:38:09
 * @FilePath: \jichao_app_2\src\pages\cardForum\func\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const MAX_HEIGHT = uni.upx2px(478)
const WIDTH = uni.upx2px(360)
const MIN_HEIGHT = uni.upx2px(246)
const app = getApp().globalData.app
let bufferImageList = []
export function releaseByTopic(id) {
    uni.navigateTo({
        url: `/pages/cardForum/release?topicId=${id}`
    })
}
export function formatNumber(number, keepNum = 0, type = "cn") {//
    let result = '' + number;
    if (number >= 100000000) {
        result = (number / 100000000).toFixed(keepNum) + '亿'
    } else if (number >= 10000) {
        result = (number / 10000).toFixed(keepNum) + (type == "cn" ? '万' : 'w')
    }
    return result;
}
const DRAFT_STORAGE_KEY = "cardForum_draft"
//获取草稿箱
export function getDraftList(type, userId) {
    let list = uni.getStorageSync(DRAFT_STORAGE_KEY) || []
    if (!list || !list.length) return []
    list = list.filter((item) => {
        return (type == "all" ? true : item.type == type) && (userId ? item.userId === userId : true)
    })
    return list.sort((x, y) => {
        return y.stamp - x.stamp
    })
}
//删除草稿
export function delDraftDetail(draftId, userId) {
    let list = getDraftList("all", userId)
    const findIndex = list.findIndex((item) => {
        return item.draftId === draftId
    })
    if (findIndex >= 0) list.splice(findIndex, 1)
    uni.setStorageSync(DRAFT_STORAGE_KEY, list)
}
//关注话题
export function followTopic(id, isFollow) {
    return new Promise((re, rj) => {
        app.http.Post(`cardCircle/${isFollow ? 'un/' : ''}follow/topic/` + id, {}, () => {
            re && re(true)
        }, (err) => {
            rj(err)
        })
    })
}
//关注用户
export function followActionByUser(userId, isFollow) {
    return new Promise((resolve, reject) => {
        app.http.Post(`cardCircle/${isFollow ? 'un/' : ''}follow/user/${userId}`, {}, (res) => {
            uni.$emit("userFollow", {
                userId: userId,
                data: res.data || {}
            })
            resolve(true)
        }, (err) => {
            reject(false)
        })
    })
}
export function getVideoPath(url) {
    const urlList = url.split(",")
    for (let index = 0; index < urlList.length; index++) {
        const path = getApp().globalData.parsePic(decodeURIComponent(urlList[index]))
        if (uni.$u.test.video(path) && path.indexOf("x-oss-process=video/snapshot") < 0) return path
    }
    return ""
}
const Detail_State_Map = {
    "1": "",
    "2": "该动态已私密",
    "-1": "该动态已删除",
    "9999": "未知的动态状态"
}
export function getForumDetail(code) {
    return new Promise((resolve, reject) => {
        app.http.GetWithCrypto(`dataApi/cardCircle/detail/${code}`, {}, (res) => {
            const isMine = (res.data.bit & 1) === 1
            if (res.state != 1 && !isMine) {
                uni.$emit("forumDetailError", res.state)
                reject({
                    state: res.state,
                    msg: Detail_State_Map[String(res.state || "9999")]
                })
                return
            } else {
                resolve(res)
            }
        }, (err) => {
            reject({
                state: undefined,
                msg: err
            })
        })
    })
}
export function ossStitching(url, params) {
    const hasParams = decodeURIComponent(url).indexOf("?") >= 0
    return url + `${hasParams ? '&' : '?'}${params}`
}
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12}$/;
export function testCode(code) {
    return pattern.test(code);
}
export function getImageInfo(item) {
    return new Promise((re, rj) => {
        const findItem = bufferImageList.find((buffer) => {
            return (item.code == buffer.code && item.cover == buffer.cover)
        })
        if (findItem) {
            item.mode = findItem.mode
            item.width = findItem.width
            item.height = findItem.height
            re(item)
        } else {
            re(item)
            // uni.getImageInfo({
            //     src: thumbnail(item.cover, needParse),
            //     success: (res) => {
            //         if (res.width < WIDTH) {
            //             res.height = (WIDTH / res.width) * res.height
            //             res.width = WIDTH
            //         }
            //         const widthFixHeight = (WIDTH / res.width) * res.height
            //         if (widthFixHeight > MAX_HEIGHT) {
            //             item.mode = "aspectFit"
            //             item.width = (res.width / res.height) * MAX_HEIGHT
            //             item.height = MAX_HEIGHT
            //         } else {
            //             item.mode = "widthFix"
            //             item.height = widthFixHeight
            //         }
            //         re(item)
            //         bufferImageList.push({
            //             code: item.code,
            //             cover: item.cover,
            //             mode: item.mode,
            //             width: item.width,
            //             height: item.height
            //         })
            //     },
            //     fail: (err) => {
            //         re(item)
            //     }
            // })
        }
    })
}
export function getImageByLocal(item) {
    const findItem = app.cardForumImgLocal[item.code]
    return findItem
}
export function pushImage(item) {
    app.cardForumImgLocal[item.code] = { width: item.width, height: item.height, mode: item.mode }
}
export const CardForumTagMap = {
    FOLLOW: {
        name: "关注",
        tag: "follow"
    },
    ALL: {
        name: "推荐",
        tag: "all"
    },
    SHOW: {
        name: "SHOW卡",
        tag: "show"
    },
    //  VIDEO:{
    //     name: '视频',
    //     tag: 'video'
    // }, 
    COLUMN: {
        name: "专栏",
        tag: "column"
    },
    // SWAP:{
    //     name: '交流',
    //     tag: 'swap'
    // }, 
    ALBUM: {
        name: "卡册",
        tag: "album"
    },
    BASKET: {
        name: "篮球",
        tag: "basket"
    },
    FOOT: {
        name: "足球",
        tag: "foot"
    },
    ANIME_TV: {
        name: "动漫影视",
        tag: "animeTv"
    },
    REST: {
        name: "其他",
        tag: "rest"
    }
}