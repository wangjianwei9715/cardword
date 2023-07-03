/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-19 18:05:04
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-30 18:58:45
 * @FilePath: \card-world\src\pages\cardForum\func\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { app } from "@/app"
import CardForum from "../interface/public"
import { parsePic } from "@/tools/util"
export enum CardForumReportSource {
    /**动态 */
    BY_DYNAMIC = 1,
    /**用户 */
    BY_USER = 2
}
export interface Report {
    /**被举报的用户id */
    byInformer: number
    /**1 动态，2 用户 */
    source: CardForumReportSource
    /**举报描述(最多200字) */
    reason: string
    /**举证图片 */
    pic: Array<string>
    /**违规类型(16标志位) */
    tpBit: number;
    /**动态或卡册编号 */
    dtCode: string;
}
//话题
export function getTopics(params: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        app.http.Get(`dataApi/cardCircle/topic/list`, params, (res: any) => {
            resolve(res)
        }, (err: any) => {
            reject(err)
        })
    })
}
//发布话题
export function releaseByTopic(id: number) {
    uni.navigateTo({
        url: `/pages/cardForum/release?topicId=${id}`
    })
}
//关注话题
export function followTopic(id: number): Promise<Boolean> {
    return new Promise((re, rj) => {
        app.http.Post(`cardCircle/follow/topic/` + id, {}, () => {
            re && re(true)
        }, (err: any) => {
            rj(err)
        })
    })
}
//关注用户
export function followActionByUser(userId: number, isFollow: boolean): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        app.http.Post(`cardCircle/${isFollow ? 'un/' : ''}follow/user/${userId}`, {}, (res: any) => {
            uni.$emit("userFollow", {
                userId: userId,
                data: res.data || {}
            })
            resolve(true)
        }, (err: any) => {
            reject(false)
        })
    })
}
//举报
export function reportAction(form: Report): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        app.http.Post(`cardCircle/report`, form, (res: any) => {
            resolve(true)
        }, (err: any) => {
            reject(false)
        })
    })
}
function getStamp() {
    return Math.round(+new Date() / 1000)
}

//获取视频地址
export function getVideoPath(url: string): string {
    const urlList = url.split(",")
    for (let index = 0; index < urlList.length; index++) {
        const path = parsePic(decodeURIComponent(urlList[index]))
        if (uni.$u.test.video(path) && path.indexOf("x-oss-process=video/snapshot") < 0) return path
    }
    return ""
}
const Detail_State_Map: any = {
    "1": "",
    "2": "该动态已私密",
    "-1": "该动态已删除",
    "9999": "未知的动态状态"
}
export function getForumDetail(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
        app.http.Get(`dataApi/cardCircle/detail/${code}`, {}, (res: any) => {
            if (res.state != 1) {
                uni.$emit("forumDetailError", res.state)
                reject({
                    state: res.state,
                    msg: Detail_State_Map[String(res.state || "9999")]
                })
                return
            } else {
                resolve(res)
            }
        }, (err: any) => {
            reject({
                state: undefined,
                msg: err
            })
        })
    })
}
const DRAFT_STORAGE_KEY = "cardForum_draft"
//获取草稿箱
export function getDraftList(type: ("cardBook" | "dynamic" | "all")): Array<any> {
    let list = uni.getStorageSync(DRAFT_STORAGE_KEY) || []
    if (!list || !list.length) return []
    if (type !== "all") {
        list = list.filter((item: any) => {
            return item.type == type
        })
    }
    return list.sort((x: any, y: any) => {
        return y.stamp - x.stamp
    })
}
//获取草稿data
export function getDraftDetail(draftId: string): any {
    const list = getDraftList("all")
    const findItem = list.find((item: any) => {
        return item.draftId === draftId
    })
    return findItem ? findItem.data : {}
}
//删除草稿
export function delDraftDetail(draftId: string) {
    let list = getDraftList("all")
    const findIndex = list.findIndex((item: any) => {
        return item.draftId === draftId
    })
    if (findIndex >= 0) list.splice(findIndex, 1)
    uni.setStorageSync(DRAFT_STORAGE_KEY, list)
}
//存储草稿箱
export function storageDraft(data: any, type: ("cardBook" | "dynamic"), draftId?: string): Promise<Boolean> {
    return new Promise((resovle, reject) => {
        let beforeList = getDraftList(type)
        let saveData: any = {
            stamp: getStamp(),
            type,
            data,
        }
        if (!draftId) {
            saveData.draftId = uni.$u.guid(6)
            beforeList.unshift(saveData)
            uni.setStorageSync(DRAFT_STORAGE_KEY, beforeList)
            resovle(true)
        } else {
            const findIndex = beforeList.findIndex((item: any) => {
                return item.draftId === draftId
            })
            if (findIndex >= 0) {
                beforeList[findIndex].stamp = getStamp()
                beforeList[findIndex].data = data
            } else {
                saveData.draftId = uni.$u.guid(4)
            }
            beforeList = beforeList.sort((x: any, y: any) => {
                return y.stamp - x.stamp
            })
            uni.setStorageSync(DRAFT_STORAGE_KEY, beforeList)
            resovle(true)
        }
    })
}