<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-02-09 11:41:27
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-02-09 16:24:11
 * @FilePath: \card-world\src\pages\userinfo\user_identity.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <u-loading-page :loading="showLoadin && !authSuccessShow" loading-text="认证中" loading-color="#fe3e58"
            icon-size="146rpx">
            <view>
                <view class="bigAuth">认证中</view>
                <view class="tips">实名信息即将核验完成，请勿离开或关闭当前页面</view>
            </view>
        </u-loading-page>
        <template v-if="!showLoadin && !authSuccessShow">
            <view class="topTips flexCenter">为了保障您的账号安全，请完成认证，认证信息将用于身份核实，我们会对信息进行严格保密</view>
            <view class="submitForm">
                <view class="formItem uni-flex">
                    <view class="label">真实姓名</view>
                    <view class="rightInput flexCenter">
                        <input type="text" v-model.trim="identityParams.realName" placeholder="输入真实姓名"
                            @blur="realNameBlur = true" />
                        <view class="errorTips" v-if="realNameTipsShow">请填写正确的姓名</view>
                    </view>
                </view>
                <view class="borderBottom"></view>
                <view class="formItem uni-flex">
                    <view class="label">身份证号</view>
                    <view class="rightInput flexCenter">
                        <input type="idcard" :maxlength="18" v-model.trim="identityParams.identityNum"
                            placeholder="输入身份证号" @blur="identityNumBlur = true" />
                        <view class="errorTips" v-if="identityNumTipsShow">请填写正确的身份证号</view>
                    </view>
                </view>
                <view class="borderBottom"></view>
                <view class="buyReadTop" @click="isReadAgreement = !isReadAgreement">
                    <view class="bottom-gm-gx" :class="{ 'bottom-gm-check': isReadAgreement }"></view>
                    <text>已阅读并同意</text>
                    <text style="color:#E0635F" @click.stop="toAgreement">《实名认证服务协议》</text>
                </view>
                <view class="submitButton flexCenter" :class="{ submitButton_can: canSubmit }"
                    @tap="$u.throttle(submit, 1500)">同意协议并认证</view>
            </view>
        </template>
        <view class="successPage" v-if="authSuccessShow">
            <view class="successIcon">

            </view>
            <view class="bigAuth">认证成功</view>
            <view class="tips">页面将在{{ closeCountDown }}s后关闭</view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const realNameReg = /^[\u00B7\u3007\u3400-\u9FFF\uE000-\uF8FF\uF900-\uFAFF\u{20000}-\u{2FFFF}\u{30000}-\u{3FFFF}]+$/u
const identityNumReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
@Component({})
export default class ClassName extends BaseNode {
    isReadAgreement: boolean = false
    identityParams: any = {
        realName: "",
        identityNum: ""
    }
    realNameBlur: boolean = false
    identityNumBlur: boolean = false
    showLoadin: boolean = false//认证loading bol
    authSuccessShow: boolean = false//认证成功bol
    delayTimer: any = null
    closeTimer: any = null
    closeCountDown: number = 5
    public get realNameTipsShow() {
        if (!this.realNameBlur) return false
        if (!this.identityParams.realName) return true
        if (!realNameReg.test(this.identityParams.realName)) return true
        return false
    }
    public get identityNumTipsShow() {
        if (!this.identityNumBlur) return false
        if (!this.identityParams.identityNum) return true
        if (!identityNumReg.test(this.identityParams.identityNum)) return true
        return false
    }
    public get canSubmit() {
        let oneNotHasValue = Object.values(this.identityParams).includes("")
        return !oneNotHasValue && !this.identityNumTipsShow && !this.realNameTipsShow
    }
    onLoad(query: any) {
    }
    onUnload() {
        this.delayTimer && clearTimeout(this.delayTimer)
        this.closeTimer && clearInterval(this.closeTimer)
    }
    submit() {
        if (!this.isReadAgreement) {
            uni.showToast({
                title: "请先阅读勾选,《实名认证服务协议》",
                icon: 'none'
            })
            return
        }
        if (!this.canSubmit) {
            uni.showToast({
                title: "请填写正确信息",
                icon: 'none'
            })
            return
        }
        this.showLoadin = true
        this.delayTimer && clearTimeout(this.delayTimer)
        this.delayTimer = setTimeout(this.authentication, 1000)
    }
    authentication() {
        app.http.Post("me/authentication", this.identityParams, (res: any) => {
            this.showLoadin = false
            this.authSuccessShow = true
            this.startCloseTimer()
            setTimeout(() => {
                uni.$emit("identityAuthGet")
            }, 500)
        }, (err: any) => {
            this.showLoadin = false
            this.authSuccessShow = false
        })
    }
    startCloseTimer() {
        this.closeTimer = setInterval(() => {
            if (this.closeCountDown <= 1) {
                clearInterval(this.closeTimer)
                app.platform.pageBack(1)
                return
            }
            this.closeCountDown--
        }, 1000)
    }
    toAgreement() {
        uni.navigateTo({
            url: '/pages/userinfo/security/idAgreement'
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
}

.buyReadTop {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 86rpx;

    text {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        // margin-left: 8rpx;
    }
}

.readContent {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #9A9A9E;
    // margin-top: 22rpx;

    text {
        font-weight: 600;
    }
}

.submitButton {
    width: 620rpx;
    height: 86rpx;
    background: #CBCBD1;
    border-radius: 5rpx;
    font-size: 36rpx;
    font-weight: 400;
    color: #FFFFFF;
    margin-top: 45rpx;
    transition: all 0.5s;
}

.submitButton_can {
    background-color: #111111;
}

.bottom-gm-gx {
    width: 31rpx;
    height: 31rpx;
    background-image: url(@/static/userinfo/identity/agg_dis.png);
    background-size: 100% 100%;
    margin-right: 10rpx;
}

.bottom-gm-check {
    background-image: url(@/static/userinfo/identity/agg.png);
}

.topTips {
    width: 750rpx;
    height: 150rpx;
    background-size: 100% 100%;
    background-image: url(@/static/userinfo/identity/topBanner.png);
    font-size: 28rpx;
    box-sizing: border-box;
    padding: 0 55rpx;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 48rpx;
}

.submitForm {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 50rpx 0 50rpx;
}

.borderBottom {
    width: 100%;
    height: 1rpx;
    background-color: #F5F5F5;
    margin-top: 42rpx;

}

.formItem {
    align-items: center;
    // height: 80rpx;
    // border-bottom: 1rpx solid #F5F5F5;
    margin-top: 58rpx;

    // justity-content: space-between;
    .label {
        font-size: 28rpx;
        font-weight: normal;
        color: #1B1B1D;
    }

    .rightInput {
        // width: 100%;
        flex: 1;
        margin-left: 42rpx;
        position: relative;
        height: inherit;
        font-size: 28rpx;

        input {
            flex: 1;
            font-size: 28rpx;
            // width: inherit;
            height: 20rpx;

        }

        .errorTips {
            position: absolute;
            bottom: -38rpx;
            left: 0;
            color: #f24422;
        }
    }
}

.successPage {
    display: flex;
    flex-direction: column;
    align-items: center;

    .successIcon{
        width: 112rpx;
        height: 112rpx;
        margin-top: 330rpx;
        margin-bottom: 30rpx;
        background-size: 100% 100%;
        background-image: url(@/static/userinfo/identity/success_big.png);
    }
}

.bigAuth {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20rpx;
    text-align: center;
}

.tips {
    font-size: 24rpx;
    font-weight: 400;
    color: #9A9A9E;
}
</style>
