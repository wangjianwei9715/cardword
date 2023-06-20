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