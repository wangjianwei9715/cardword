<template>
    <view class="content">
        <!-- <navigationbar borderBottom="#fff" /> -->
        <view class="loginTitle">{{ pageInfo.title }}</view>
        <view class="loginTips">未注册手机号登录后将自动注册</view>
        <view class="inputContainer uni-flex ac">
            <picker class="phone-type" mode="selector" @change="bindPickerChange" :value="phoneTypeIndex"
                :range="phoneTypeArray">
                <view class="phoneArea uni-flex ac">
                    <view class="num">{{ phoneTypeArray[phoneTypeIndex] }}</view>
                    <image class="arrow" src="/static/login/arrow.png"></image>
                </view>
            </picker>
            <input type="number" class="input" v-model="phone" style="margin-left: 30rpx;margin-right: 10rpx;"
                placeholder="请输入手机号">
            <image class="close" src="/static/login/close.png" @click="phone = ''"></image>
        </view>
        <view class="inputContainer uni-flex ac" style="margin-top: 45rpx;">
            <input type="number" class="input" v-if="nowType == CODE_TYPE" v-model="code" style="margin-right: 10rpx;"
                :placeholder="pageInfo.placeholder">
            <input class="input" :password="true" v-if="nowType == PASSWORD_TYPE" v-model="password"
                style="margin-right: 10rpx;" :placeholder="pageInfo.placeholder">
            <view class="getCode flexCenter" v-if="nowType == CODE_TYPE" @click="$u.throttle(getInterval, 1000)">{{
                codeCountdown > 0 ?
                codeCountdown + 's后重发' :
                '获取验证码' }}</view>
        </view>
        <view class="changeContainer uni-flex ac" @click="changeType">
            <image class="change" src="/static/login/change.png"></image>
            <view class="changeText flex1">{{ pageInfo.nextType }}</view>
            <view class="changeText" v-if="nowType == PASSWORD_TYPE" @click.stop="goCheckPhone">忘记密码？</view>
        </view>
        <view class="submit flexCenter" @click="$u.throttle(onClickSubmit, 2000)" :class="{ canSubmit: canSubmit }">登录
        </view>
        <view class="agreementContainer uni-flex ac" @click="read = !read">
            <view class="checkBox" :class="{ checkBox_select: read }"></view>
            <view class="font">登录即自动注册，并同意</view>
            <view class="font font_xy" @click.stop="goXy">《隐私协议》</view>
        </view>
        <view class="otherLoginLine ac uni-flex">
            <view class="line"></view>
            <view class="text">其他方式登录</view>
            <view class="line"></view>
        </view>
        <view class="otherLoginContainer uni-flex ac">
            <image src="/static/login/apple.png" v-if="iosLogin" style="width: 100rpx;height: 100rpx;margin-right:20rpx;"
                @click="onClickAppleLogin"></image>
            <image src="/static/login/weixin@2x.png" style="width: 100rpx;height: 100rpx;" @click="wxLogin"></image>

        </view>
    </view>
</template>

<script lang="ts">
const platform = uni.getSystemInfoSync().platform
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { phoneTypeArray, PhoneCodeType } from "@/tools/DataExchange"
import { Md5 } from "ts-md5";
const CODE_TYPE = 1
const PASSWORD_TYPE = 2
@Component({})
export default class ClassName extends BaseNode {
    CODE_TYPE = CODE_TYPE
    PASSWORD_TYPE = PASSWORD_TYPE
    read: boolean = false
    phoneTypeArray = phoneTypeArray
    phoneTypeIndex: number = 0
    phone: string = ""
    codeCountdown = 0;
    getCode: boolean = false
    code: string = ""
    password: string = ""
    nowType: number = 1
    actionMap: any = {}
    redirect: string = ""
    return: boolean = false
    iosLogin = app.iosPlatform;
    onLoad(query: any) {
        if (query.redirect) this.redirect = decodeURIComponent(query.redirect)
        if (query.return) this.return = true
    }
    onBackPress(type: any) {
        if (this.return) return
        app.navigateTo.switchTab(0)
        return true
    }
    beforeDestroy() {
    }
    public get pageInfo() {
        if (this.nowType == CODE_TYPE) {
            return {
                title: "手机号登录",
                placeholder: "请输入验证码",
                nextType: "密码登录"
            }
        } else {
            return {
                title: "手机号密码登录",
                placeholder: "请输入密码",
                nextType: "验证码登录"
            }
        }
    }
    public get canSubmit() {
        if (this.nowType == CODE_TYPE) {
            return this.phone && this.code
        } else {
            return this.phone && this.password
        }
    }
    goXy() {
        uni.navigateTo({
            url: '/pages/userinfo/user_privacy'
        })
    }
    // 苹果登录
    onClickAppleLogin() {
        uni.showLoading({ title: '加载中' });
        uni.login({
            provider: 'apple',
            success: (loginRes: any) => {
                let params = {
                    openid: loginRes.authResult.openid,
                    uuid: app.platform.deviceID,
                    os: app.platform.systemInfo.platform,
                    device: app.platform.systemInfo.brand + app.platform.systemInfo.model
                }
                this.postLogin('user/login/apple', params)
            },
            fail: (err) => {
                uni.hideLoading()
                // 登录失败  
            }
        });
    }
    wxLogin(data?: any) {
        // console.log("wxLogin", data);
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
    goCheckPhone() {
        uni.navigateTo({
            url: "/pages/login/checkPhone?type=" + PhoneCodeType.FORGET
        })
    }
    changeType() {
        if (this.nowType == CODE_TYPE) {
            this.nowType = PASSWORD_TYPE
        } else {
            this.nowType = CODE_TYPE
        }
    }
    getInterval() {
        if (this.codeCountdown > 0) {
            return;
        }
        let phone = this.phoneTypeArray[this.phoneTypeIndex] + this.phone;
        phone = app.platform.trimString(phone, '+')
        app.http.Post('user/code', { phone, type: PhoneCodeType.LOGIN }, (data: any) => {
            this.getCode = true
            this.codeCountdown = 60
            let interval = this.scheduler(() => {
                if (this.codeCountdown <= 0) {
                    clearInterval(interval);
                }
                this.codeCountdown--;
            }, 1);
        })
    }
    bindPickerChange(val: any) {
        this.phoneTypeIndex = val.detail.value;
    }
    onClickSubmit() {
        if (!this.canSubmit) return
        if (!this.read) {
            uni.showToast({ title: '请先阅读并同意协议！', icon: 'none', duration: 2000 });
            return;
        };

        let phone = this.phoneTypeArray[this.phoneTypeIndex] + this.phone;
        phone = app.platform.trimString(phone, '+')
        let params: any = {
            phone,
            uuid: app.platform.deviceID,
            os: app.platform.systemInfo.platform,
            device: app.platform.systemInfo.model,
            //#ifdef APP-PLUS
            channel: plus.runtime.channel ? plus.runtime.channel : ''
            //#endif
        };

        if (this.nowType == CODE_TYPE) {
            if (!this.getCode || this.code == '') {
                const title = !this.getCode ? '请先获取验证码！' : '请输入验证码'
                uni.showToast({ title, icon: 'none', duration: 2000 });
                return;
            }
            params.code = this.code;
        } else {
            if (this.password == '') {
                uni.showToast({ title: '请输入密码！', icon: 'none', duration: 2000 });
                return;
            } else if (this.password.length > 16) {
                uni.showToast({ title: '请输入有效的密码长度', icon: 'none', duration: 2000 });
                return;
            }
            params.password = Md5.hashStr(this.password + '_pmpm')
        }
        this.postLogin('user/login/phone', params)
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
            console.log("data=>data", data);
            app.platform.loginRecord()
            if (url == "user/login/wechat/app" && data.data.showBindPhone) {
                uni.redirectTo({
                    url: `/pages/login/checkPhone?type=${PhoneCodeType.BIND_PHONE}&toIndex=1`
                })
                return
            }
            this.loginSuccessJump()
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
        if (this.return) {
            app.platform.pageBack(1)
            return
        }
        if (!this.redirect) {
            this.toIndex()
            return
        }
        if (this.redirect.indexOf("?") == -1) this.redirect += "?"
        const noneParamsPage: string = this.redirect.split('?')[0]
        if (!noneParamsPage) {
            this.toIndex()
            return
        }
        const jumpType: string = (Object.values(app.navigateTo.switchMap)).includes(noneParamsPage) ? "switchTab" : "redirectTo"
        const _uni: any = uni
        _uni[jumpType]({
            url: this.redirect
        });
        return
    }
    toIndex() {
        app.navigateTo.switchTab(0)
    }

}
</script>

<style lang="scss">
.loginTitle {
    font-size: 40rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    margin-top: 10rpx;
}

.loginTips {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    margin-top: 23rpx;
    color: #DDDDDD;
    margin-bottom: 67rpx;
}

.ac {
    align-items: center;
}

.content {
    padding: 0 88rpx;
}

.inputContainer {
    width: 577rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #DDDDDD;
    padding-bottom: 22rpx;

    .phoneArea {
        border-right: 1rpx solid #DDDDDD;
        padding-right: 29rpx;

        .num {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
        }

        .arrow {
            width: 15rpx;
            height: 11rpx;
            margin-left: 13rpx;
        }
    }

    .close {
        width: 28rpx;
        height: 28rpx;
    }

    .input {
        flex: 1;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        height: 54rpx;
    }

    .getCode {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #263858;
        width: 160rpx;
        height: 50rpx;
        border: 2rpx solid #263858;
        border-radius: 40rpx;
    }

    .eye {
        width: 32rpx;
        height: 32rpx;
    }
}

.changeContainer {
    width: 100%;
    margin-top: 23rpx;
    margin-bottom: 44rpx;
}

.change {
    width: 25rpx;
    height: 20rpx;
    margin-right: 8rpx;
}

.changeText {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #263858;

}

.flex1 {
    flex: 1;
}

.submit {
    width: 580rpx;
    height: 88rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    background-color: #eeeeee;
    border-radius: 5rpx;
    color: #CCCCCC;
    letter-spacing: 2rpx;
    transition: all 0.3s;
}

.canSubmit {
    background-color: #fa1545;
    color: #ffffff;
}

.agreementContainer {
    width: 100%;
    margin-top: 26rpx;

    .checkBox {
        width: 22rpx;
        height: 22rpx;
        background-size: 100% 100%;
        background-image: url("/static/login/weixuan@2x.png");
        margin-right: 6rpx;
    }

    .checkBox_select {
        background-image: url("/static/login/check.png");
    }

    .font {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
    }

    .font_xy {
        color: #263858;
    }
}

.otherLoginContainer {
    width: 100%;
    justify-content: center;
    margin-top: 48rpx;
}

.otherLoginLine {
    width: 100%;
    justify-content: space-between;
    margin-top: 130rpx;

    .text {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #DDDDDD;
    }

    .line {
        width: 187rpx;
        height: 3rpx;
        background-size: 100% 100%;
        background-image: url("@/static/login/line.png");
        // border: 2rpx dashed #969696;
    }
}
</style>

