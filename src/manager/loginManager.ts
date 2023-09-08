/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-19 17:18:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-08 11:14:06
 * @FilePath: \jichao_app_2\src\manager\loginManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { app } from "@/app"
import { PhoneCodeType } from "@/tools/DataExchange"
import { iosConfig, androidConfig } from "@/pages/login/config";
const CONFIG = {
    businessId: "8909d52ddfb34451a68d0388ba953ec6",
    loginType: "quickLogin",
    timeout: 3000
}
export default class loginManager {
    private ydLogin: any = null
    private canYdLogin: boolean = false
    private redirect: string = ""
    private Return: boolean = false
    private read: boolean = false
    private actionMap: any = {}
    private token: string = ""
    private agoTokenTime: number = 0
    private USE_PLUGIN: boolean = true //启用插件
    private static instance: loginManager;

    private constructor() {
        //#ifdef APP-PLUS
        this.initFn()
        if (!this.ydLogin && this.USE_PLUGIN) {
            this.ydLogin = uni.requireNativePlugin('YD-Login')
        }
        if (this.ydLogin) {
            this.ydLogin.registerWithBusinessID(CONFIG, (data: any) => {
                if (!data.success) return
                this.setYdLoginView()
                this.ydLogin.shouldQuickLogin((res: any) => {
                    if (res.success) {
                        this.canYdLogin = true
                    }

                })
            })
        } else {
            console.log("不存在'网易易盾号码认证插件'," + app.version);
        }
        //#endif
    }
    static getIns(): loginManager {
        if (!loginManager.instance) {
            loginManager.instance = new loginManager();
        }
        return loginManager.instance;
    }
    async arouseLogin(redirect?: any, Return?: boolean, cb?: Function) {
        if (!redirect) redirect = "/" + await app.platform.currentPage();
        if (redirect) this.redirect = redirect
        if (Return) this.Return = true
        if (this.canYdLogin && this.ydLogin) {
            this.getPhoneNumberCompletion().then((result: any) => {
                if (!result.success) {
                    // TODO: 预取号失败处理
                    console.log("预取号失败");
                    this.toNoramlLogin(redirect, Return)
                } else {
                    this.setYdLoginView()
                    // TODO: 预取号成功处理，可以进行调起授权页
                    this.ydLogin.cucmctAuthorizeLoginCompletion((data: any) => {
                        const tokenData = {
                            ...data,
                            token: this.token,
                            uuid: uni.getSystemInfoSync().deviceId,
                            os: uni.getSystemInfoSync().platform,
                            device: uni.getSystemInfoSync().brand + uni.getSystemInfoSync().model,
                            //#ifdef APP-PLUS
                            channel: plus.runtime.channel ? plus.runtime.channel : ''
                            //#endif
                        }
                        this.listenYdAction({ viewId: "loginAction", action: "loginAction", data: tokenData })
                    })
                    this.ydLogin.checkedSelected(false)

                }
            })
        } else {
            this.toNoramlLogin(redirect, Return)
        }
    }
    private getPhoneNumberCompletion(): Promise<any> {
        return new Promise((re, rj) => {
            this.ydLogin.getPhoneNumberCompletion((result: any) => {
                if (result.success) {
                    this.token = result.token
                    this.agoTokenTime = Math.round(+new Date() / 1000)
                    re(result)
                } else {
                    rj()
                }
            })
        })
    }
    private isTab(redirect: string) {
        return Object.values(app.navigateTo.switchMap).includes(decodeURIComponent(redirect))
    }
    private toNoramlLogin(redirect: string, Return?: boolean, cb?: Function) {
        uni[this.isTab(redirect) ? "navigateTo" : "redirectTo"]({
            url: `/pages/login/login_oneKey?${redirect ? `redirect=${redirect}` : ""}${Return ? `&return=1` : ""}`
        })
    }
    private closeydLogin(arouseNewPage?: boolean, loginSuccess?: boolean) {
        if (this.ydLogin) this.ydLogin.closeAuthController()
        if (!arouseNewPage) {
            app.platform.currentPage().then((path: any) => {
                if (this.isTab("/" + decodeURIComponent(path))) {
                    app.navigateTo.switchTab(0)
                    return
                } else {
                    if (!loginSuccess) {
                        app.platform.pageBack(1)
                    }
                }
            })
        }
    }
    private setYdLoginView() {
        this.read = false
        this.ydLogin.setCustomView(uni.getSystemInfoSync().platform == 'android' ? androidConfig : iosConfig, (data: any) => {
            if (data.action == 'pageBack' || data.viewId == 'pageBack') {
                this.closeydLogin(false)
                return
            }
            if (data.action == 'otherLogin' || data.viewId == "otherLogin") {
                this.closeydLogin(true)
                this.toNoramlLogin(this.redirect, this.Return)
                return
            }
            if (data.authViewWillDisappear == "authViewDealloc") {
                //协议取消勾选
                this.ydLogin.checkedSelected(false)
            }
            if (data.action == "iosLoginAction") {
                this.ydLogin.authLoginButtonClick()
                return
            }
            this.listenYdAction(data)
        })
    }
    private initFn() {
        this.actionMap = {
            "wxLogin": (data?: any) => { this.wxLogin(data) },
            "pageBack": (data: any) => { },
            "loginAction": (data: any) => { this.onClickYundLogin(data) },
            "checkedAction": (data?: any) => { this.read = data.checked },
            "checkbox": (data: any) => { this.read = data.isCheckboxChecked }
        }
    }
    private listenYdAction(data: any) {
        const actionKey = app.platform.systemInfo.platform == 'android' ? 'viewId' : 'action'
        if (this.actionMap[data[actionKey]]) {
            this.actionMap[data[actionKey]](data)
        }
        if (this.actionMap[data.clickViewType]) {
            this.actionMap[data.clickViewType](data)
        }
    }
    private onClickYundLogin(data: any) {
        if (data.checked != undefined && !data.checked) {
            //#ifdef APP-PLUS
            plus.nativeUI.toast("请先阅读并同意协议！");
            //#endif
            //#ifdef H5
            uni.showToast({ title: '请先阅读并同意协议！', icon: 'none', duration: 2000 });
            //#endif
            return;
        }
        if (data.data) {
            if (data.data.success) {
                uni.showLoading({
                    title: ""
                })
                //留存5秒误差
                if (Math.round(+new Date() / 1000) - this.agoTokenTime > (2 * 60 - 5)) {
                    //预取号的token过期重新获取
                    this.getPhoneNumberCompletion().then((res) => {
                        data.data.token = res.token
                        this.postLogin("user/login/verify", data.data)
                    }).catch(() => {
                        this.toNoramlLogin(this.redirect, this.Return)
                    })
                } else {
                    this.postLogin("user/login/verify", data.data)
                }

            } else {
                this.closeydLogin(true)
            }
        }
        app.platform.UIClickFeedBack()
    }
    wxLogin(data?: any) {
        if (!this.read) {
            //#ifdef APP-PLUS
            plus.nativeUI.toast("请先阅读并同意协议！");
            //#endif
            //#ifdef H5
            uni.showToast({ title: '请先阅读并同意协议！', icon: 'none', duration: 2000 });
            //#endif
            return;
        }
        uni.getProvider({
            service: 'oauth',
            success: (res) => {
                if (~res.provider.indexOf('weixin')) {
                    uni.showLoading({
                        title: ""
                    })
                    if (this.isTab(this.redirect)) {
                        app.navigateTo.switchTab(0)
                    }
                    uni.login({
                        provider: 'weixin',
                        success: (loginRes: any) => {
                            let params = {
                                weixinToken: loginRes.authResult.access_token,
                                unionid: loginRes.authResult.unionid,
                                openid: loginRes.authResult.openid,
                                uuid: app.platform.deviceID,
                                os: app.platform.systemInfo.platform,
                                device: app.platform.systemInfo.brand + app.platform.systemInfo.model,
                                //#ifdef APP-PLUS
                                channel: plus.runtime.channel ? plus.runtime.channel : ''
                                //#endif
                            }
                            console.log("loginParams=>", params);
                            this.postLogin('user/login/wechat/app', params)
                        },
                        fail: (loginRes: any) => {
                            uni.showToast({ title: '请确认已经安装微信', icon: 'none' })
                        }
                    });
                }
            }
        });
    }
    postLogin(url: string, params: any) {
        app.http.Post(url, params, (data: any) => {
            uni.hideLoading();
            if (app.requestKey != '') {
                app.platform.checkShareNo(app.requestKey)
            }
            app.data = data.data;
            app.opKey = data.opKey;
            app.coupon = data.data.coupon;
            uni.setStorageSync("app_opk", data.opKey);
            app.socketInfo = data.app;
            app.token = { accessToken: data.accessToken, refreshToken: data.refreshToken };
            if (data.app.launchDomain && data.app.launchDomain != '') {
                uni.setStorageSync("configLaunchUrl", data.app.launchDomain);
            }
            this.postDomain()
            uni.setStorageSync("token", JSON.stringify(app.token));
            uni.setStorageSync("ksjUserId", data.data.userId);
            uni.$emit('loginSuccess');
            if (url == "user/login/verify") {
                uni.$emit("updateToken")
            }
            if (url == "user/login/wechat/app" && data.showBindPhone) {
                uni.redirectTo({
                    url: `/pages/login/checkPhone?type=${PhoneCodeType.BIND_PHONE}&toIndex=1`
                })
                return
            }
            this.loginSuccessJump()

        }, (err: any) => {
            if (url == `user/login/verify`) {
                this.toNoramlLogin(this.redirect, this.Return)
                this.closeydLogin(false)
            }
        })
    }
    postDomain() {
        let domian = app.bussinessApiDomain.slice(0, app.bussinessApiDomain.indexOf('/api'));
        if (app.service_url != '') {
            domian += '&' + app.service_url
        }
        if (app.familial) {
            domian += '&oldUser=true&version=' + app.version
        }

        app.http.Post('user/domain', { content: encodeURIComponent(domian) })
    }
    loginSuccessJump() {
        let redirect = decodeURIComponent(this.redirect);
        if (this.Return) {
            app.platform.pageBack(1)
            this.closeydLogin(false, true)
            return
        }
        if (!redirect) {
            this.toIndex()
            this.closeydLogin(false, true)
            return
        }
        if (redirect.indexOf("?") == -1) redirect += "?"
        const noneParamsPage: string = redirect.split('?')[0]
        if (!noneParamsPage) {
            this.toIndex()
            this.closeydLogin(false, true)
            return
        }
        const jumpType: string = this.isTab(noneParamsPage) ? "switchTab" : "redirectTo"
        //@ts-ignore
        uni[jumpType]({
            url: redirect
        });
        this.closeydLogin(true, true)
        return
    }
    toIndex() {
        app.navigateTo.switchTab(0)
    }
}
