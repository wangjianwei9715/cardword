/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-19 18:05:04
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-26 10:24:55
 * @FilePath: \card-world\src\pages\cardForum\func\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { app } from "@/app"
import CardForum from "../interface/public"
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
}
//话题
export function getTopics(params: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        app.http.Post(`cardCircle/topic/list`, params, (res: any) => {
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
//关注
export function followActionByUser(userId: number, isFollow: boolean): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        app.http.Post(`cardCircle/${isFollow ? 'un/' : ''}follow/user/${userId}`, {}, (res: any) => {
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