<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-08-22 14:24:10
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-08-31 18:08:15
 * @FilePath: \card-world\src\pages\login\checkPhone.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <!-- <view class="loginTitle">忘记密码</view> -->
        <view class="inputContainer uni-flex ac" style="margin-top: 73rpx;">
            <picker class="phone-type" mode="selector" :disabled="checkNowUserPhone" @change="bindPickerChange"
                :value="phoneTypeIndex" :range="phoneTypeArray">
                <view class="phoneArea uni-flex ac">
                    <view class="num">{{ phoneTypeArray[phoneTypeIndex] }}</view>
                    <image class="arrow" src="/static/login/arrow.png"></image>
                </view>
            </picker>
            <input type="number" v-if="!checkNowUserPhone" class="input" v-model="phone"
                style="margin-left: 30rpx;margin-right: 10rpx;" placeholder="请输入手机号">
            <input type="text" v-if="checkNowUserPhone" class="input" :disabled="true" v-model="phone"
                style="margin-left: 30rpx;margin-right: 10rpx;" placeholder="请输入手机号">
            <image class="close" src="/static/login/close.png" @click="phone = ''" v-if="!checkNowUserPhone"></image>
        </view>
        <view class="inputContainer uni-flex ac" style="margin-top: 45rpx;">
            <input type="number" class="input" v-model="code" style="margin-right: 10rpx;" placeholder="请输入验证码">
            <view class="getCode flexCenter" @click="$u.throttle(getInterval, 1000)">{{ codeCountdown > 0 ?
                codeCountdown + 's后重发' :
                '获取验证码' }}</view>
        </view>
        <view class="submit flexCenter" :class="{ canSubmit: canSubmit }" @click="submit">确认</view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { phoneTypeArray, PhoneCodeType } from "@/tools/DataExchange"
@Component({})
export default class ClassName extends BaseNode {
    fillPhone: string = ""
    type: string = ""
    phoneTypeArray = phoneTypeArray
    phone: string = ""
    phoneTypeIndex: number = 0
    codeCountdown: number = 0
    code: string = ""
    toIndex: boolean = false
    sign: string = ""
    onLoad(query: any) {
        this.type = query.type
        if (query.sign) this.sign = query.sign
        if (query.toIndex) this.toIndex = true
        setTimeout(() => {
            if (this.type == PhoneCodeType.BIND_PHONE) {
                uni.setNavigationBarTitle({
                    title: "绑定手机"
                })
                return
            }
            if (this.type == PhoneCodeType.SET_PWD || this.type == PhoneCodeType.CHANGE_BIND_PHONE) {
                uni.setNavigationBarTitle({
                    title: "当前手机号验证"
                })
                this.phone = query.maskPhone
                return
            }
        }, 100)
    }
    public get canSubmit() {
        return this.phone && this.code
    }
    public get checkNowUserPhone() {
        return this.type == PhoneCodeType.CHANGE_BIND_PHONE || this.type == PhoneCodeType.SET_PWD
    }
    getInterval() {
        if (this.codeCountdown > 0) {
            return;
        }
        if (this.checkNowUserPhone) {
            //校验当前手机号发送验证码
            app.http.Post(`user/nowPhone/postCode`, {}, (res: any) => {
                this.codeCountdown = 60
                let interval = this.scheduler(() => {
                    if (this.codeCountdown <= 0) {
                        clearInterval(interval);
                    }
                    this.codeCountdown--;
                }, 1);
            })
        } else {
            let phone = this.phoneTypeArray[this.phoneTypeIndex] + this.phone;
            phone = app.platform.trimString(phone, '+')
            app.http.Post('user/code', { phone, type: this.type == PhoneCodeType.SET_PWD ? "forget" : this.type }, (data: any) => {
                this.codeCountdown = 60
                let interval = this.scheduler(() => {
                    if (this.codeCountdown <= 0) {
                        clearInterval(interval);
                    }
                    this.codeCountdown--;
                }, 1);
            })
        }
    }
    submit() {
        if (!this.canSubmit) return
        let phone = this.phoneTypeArray[this.phoneTypeIndex] + this.phone;
        phone = app.platform.trimString(phone, '+')
        //忘记密码校验验证码
        if (this.type == PhoneCodeType.FORGET) {
            app.http.Post('user/forget', { phone: phone, code: this.code }, (res: any) => {
                uni.redirectTo({
                    url: `/pages/login/change_password_v3?phone=${phone}&sign=${res.data.sign}&type=${this.type}`
                })
                return
            })
            return
        }
        //绑定手机号
        if (this.type == PhoneCodeType.BIND_PHONE) {
            app.http.Post('user/bindOrChange/phone', { phone: phone, code: this.code, sign: this.sign }, (res: any) => {
                uni.showModal({
                    title: "提示",
                    content: "绑定成功",
                    showCancel: false,
                    success: (res: any) => {
                        if (res.confirm) {
                            if (this.toIndex) {
                                app.navigateTo.switchTab(0)
                            } else {
                                app.platform.pageBack()
                            }

                        }
                    }
                })
                return
            })
            return
        }
        //校验当前手机号的验证码
        if (this.checkNowUserPhone) {
            app.http.Post(`user/nowPhone/checkCode/${this.code}`, {}, (res: any) => {
                if (this.type == PhoneCodeType.CHANGE_BIND_PHONE) {
                    uni.redirectTo({
                        url: `/pages/login/checkPhone?type=${PhoneCodeType.BIND_PHONE}&sign=${res.data.sign}`
                    })
                } else if (this.type == PhoneCodeType.SET_PWD) {
                    uni.redirectTo({
                        url: `/pages/login/change_password_v3?type=${PhoneCodeType.SET_PWD}&sign=${res.data.sign}`
                    })
                }
            })
            return
        }
    }
    bindPickerChange(val: any) {
        this.phoneTypeIndex = val.detail.value;
    }
}
</script>

<style lang="scss">
.ac {
    align-items: center;
}

.content {
    padding: 0 88rpx;
}

.loginTitle {
    font-size: 40rpx;
    
    font-weight: bold;
    color: #000000;
    margin-top: 10rpx;
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
        
        font-weight: 400;
        color: #333333;
        height: 54rpx;
    }

    .getCode {
        font-size: 26rpx;
        
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

.submit {
    width: 580rpx;
    height: 88rpx;
    font-size: 32rpx;
    
    font-weight: bold;
    background-color: #eeeeee;
    border-radius: 5rpx;
    color: #CCCCCC;
    margin-top: 50rpx;
    letter-spacing: 2rpx;
    transition: all 0.3s;
}

.canSubmit {
    background-color: #fa1545;
    color: #ffffff;
}
</style>
