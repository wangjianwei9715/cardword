/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-19 18:05:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-11 16:09:14
 * @FilePath: \jichao_app_2\src\pages\cardForum\func\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { app } from "@/app"
import CardForum from "../interface/public"
import { parsePic } from "@/tools/util"
export enum CardForumReportSource {
    /**卡册 */
    BY_KACE = 1,
    /**动态 */
    BY_DT = 2,
    /**评论 */
    BY_COM = 3,
    /**用户 */
    BY_USER = 4

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
    /**source=3 为评论id且必传 */
    target?: number
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
export function getDraftList(type: ("cardBook" | "dynamic" | "all"), userId?: number): Array<any> {
    let list = uni.getStorageSync(DRAFT_STORAGE_KEY) || []
    if (!list || !list.length) return []
    list = list.filter((item: any) => {
        return (type == "all" ? true : item.type == type) && (userId ? item.userId === userId : true)
    })
    return list.sort((x: any, y: any) => {
        return y.stamp - x.stamp
    })
}
//获取草稿data
export function getDraftDetail(draftId: string, userId?: number): any {
    const list = getDraftList("all", userId)
    const findItem = list.find((item: any) => {
        return item.draftId === draftId
    })
    return findItem ? findItem.data : {}
}
//删除草稿
export function delDraftDetail(draftId: string, userId?: number) {
    let list = getDraftList("all", userId)
    const findIndex = list.findIndex((item: any) => {
        return item.draftId === draftId
    })
    if (findIndex >= 0) list.splice(findIndex, 1)
    uni.setStorageSync(DRAFT_STORAGE_KEY, list)
}
//存储草稿箱
export function storageDraft(data: any, type: ("cardBook" | "dynamic"), draftId?: string): Promise<string> {
    return new Promise(async (resovle, reject) => {
        const userinfo = await app.user.getUserInfo()
        let beforeList = getDraftList("all")
        let saveData: any = {
            stamp: getStamp(),
            type,
            data,
        }
        if (!draftId) {
            saveData.draftId = uni.$u.guid(6)
            saveData.userId = userinfo.userId
            beforeList.unshift(saveData)
            uni.setStorageSync(DRAFT_STORAGE_KEY, beforeList)
            resovle(saveData.draftId)
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
            resovle(saveData.draftId)
        }
    })
}
export function formatterNolist(list: any[],dic:any): any[] {
    return list.map(({ seqIndex, ...rest }: any) => {
        const section = rest.section;
        const sectionSeqIndexFrom = section ? section.sectionSeqIndexFrom : undefined;
        const sectionSeqIndexEnd = section ? section.sectionSeqIndexEnd : undefined;
        const seqIndexes = section
            ? Array.from({ length: sectionSeqIndexEnd - sectionSeqIndexFrom + 1 }, (_, i) => sectionSeqIndexFrom + i)
            : [seqIndex];
        const params = {
            ...rest,
            ...dic[rest.dicKey],
            frontPic:rest.frontPic||'',
            backPic:rest.backPic||'',
        }
        return seqIndexes.map(seqIndex => ({ ...params, seqIndex }));
    }).flat();
}
