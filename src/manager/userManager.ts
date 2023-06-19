export interface UserStreamline {
    userName: string;
    avatar: string;
    userId: number
}
import HttpRequest from "@/net/HttpRequest";
export default class userManager {

    private static instance: userManager;

    private constructor() {

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
        console.log(Object.values(this._userInfo).filter(Boolean).length == 0);
        const nowTime: number = Math.round(+new Date() / 1000)
        return (this.needRefresh || (nowTime - this._agoTime >= this._saveTime) || (Object.values(this._userInfo).filter(Boolean).length == 0))
    }
}
