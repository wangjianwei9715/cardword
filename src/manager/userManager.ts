/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-19 17:18:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-22 11:39:30
 * @FilePath: \jichao_app_2\src\manager\userManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Md5 } from "ts-md5"
import { app } from "@/app"
export interface UserStreamline {
    userName: string;
    avatar: string;
    userId: number
}
import HttpRequest from "@/net/HttpRequest";
export default class userManager {

    private static instance: userManager;

    private constructor() {
        uni.$on("loginSuccess", () => {
            this.needRefresh = true
        })
        uni.$on("finishName",()=>{
            this.needRefresh = true
        })
        uni.$on("finishAvatar",()=>{
            this.needRefresh = true
        })
    }
    needRefresh: boolean = true;
    private _userInfo: UserStreamline = {} as UserStreamline;
    private _agoTime: number = 0
    private _saveTime: number = 6 * 60 * 60
    static getIns(): userManager {
        if (!userManager.instance) {
            userManager.instance = new userManager();
        }

        return userManager.instance;
    }
    getUserInfo(): Promise<UserStreamline> {
        return new Promise((resolve, reject) => {
            if (!this.checkNeedRefresh()) {
                resolve(this._userInfo)
                return
            } else {
                HttpRequest.getIns().Get("dataApi/me/home", {}, (res: any) => {
                    this._userInfo.userId = res.data.userId
                    this._userInfo.userName = res.data.name
                    this._userInfo.avatar = res.data.avatar
                    this.needRefresh = false
                    this.markGetUserInfo()
                    resolve(this._userInfo)
                    return
                }, (err: any) => {
                    reject(err)
                })
            }

        })
    }
    private markGetUserInfo() {
        this.needRefresh = false
        this._agoTime = Math.round(+new Date() / 1000)
    }
    private checkNeedRefresh(): boolean {
        const nowTime: number = Math.round(+new Date() / 1000)
        return (this.needRefresh || (nowTime - this._agoTime >= this._saveTime) || (Object.values(this._userInfo).filter(Boolean).length == 0))
    }
    setViewerId() {
        return new Promise((re, rj) => {
            const ts: number = Math.round(+new Date() / 1000)
            const deviceId: string = uni.getSystemInfoSync().deviceId
            HttpRequest.getIns().Post("cardCircle/viewerId", { deviceId, ts, sn: Md5.hashStr(`viewerId_${ts}_${deviceId}`) }, (res: any) => {
                app.viewerId = res.viewerId
                uni.setStorageSync("viewerId", res.viewerId)
                re(res.viewerId)
                return
            }, (err: any) => {
                rj(err)
            })
        })
    }
    async getAppDataUserId(){
        let ksjUserId = uni.getStorageSync('ksjUserId');
        if (uni.$u.test.isEmpty(ksjUserId)) {
            const { userId } = await this.getUserInfo();
            ksjUserId = userId;
            uni.setStorageSync("ksjUserId", ksjUserId);
        }
        return ksjUserId
    }
}
