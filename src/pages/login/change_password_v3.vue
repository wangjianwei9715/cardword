<template>
    <view class="content">
        <view class="inputContainer uni-flex ac" style="margin-top: 52rpx;">
            <input class="input" :password="true" v-model="pwd1" placeholder="输入新的密码">
        </view>
        <view class="inputContainer uni-flex ac" style="margin-top: 45rpx;">
            <input class="input" :password="true" v-model="pwd2" placeholder="再次输入密码">
        </view>
        <view class="tips">6-16位密码</view>
        <view class="submit flexCenter" :class="{ canSubmit: canSubmit }" @click="sumit">确认</view>
    </view>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseNode from '../../base/BaseNode.vue';
import HttpRequest from "../../net/HttpRequest";
import { Md5 } from 'ts-md5';
import { app } from "@/app";
import { PhoneCodeType } from "@/tools/DataExchange"
@Component({})
export default class ClassName extends BaseNode {
    type: string = ""
    phone: string = ""
    sign: string = ""
    pwd1: string = ""
    pwd2: string = ""
    onLoad(query: any) {
        query.phone && (this.phone = query.phone)
        query.sign && (this.sign = query.sign)
        query.type && (this.type = query.type)
        if (this.type == PhoneCodeType.SET_PWD) {
            uni.setNavigationBarTitle({
                title: "设置密码"
            })
        }
    }
    public get canSubmit() {
        return this.pwd1 && this.pwd2
    }
    sumit() {
        if (!this.canSubmit) return
        if (this.pwd1.length > 16) {
            uni.showToast({
                title: '请输入正确长度的密码！',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if (this.pwd1 != this.pwd2 || this.pwd2 == '') {
            uni.showToast({
                title: '请输入正确的密码！',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        let Md5_password = Md5.hashStr(this.pwd2 + '_pmpm')
        if (this.type == PhoneCodeType.FORGET) {
            app.http.Post('user/forget2', { phone: this.phone, sign: this.sign, password: Md5_password }, (data: any) => {
                uni.showModal({
                    title: "提示",
                    content: "修改成功!",
                    showCancel: false,
                    success: (res: any) => {
                        if (res.confirm) app.platform.pageBack()
                    }
                })
            })
        } else if (this.type == PhoneCodeType.SET_PWD) {
            app.http.Post(`user/update/pwd`, { sign: this.sign, password: Md5_password }, (data: any) => {
                uni.showModal({
                    title: "提示",
                    content: "修改成功!",
                    showCancel: false,
                    success: (res: any) => {
                        if (res.confirm) app.platform.pageBack()
                    }
                })
            })
        }
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

.tips {
    font-size: 22rpx;
    
    font-weight: 400;
    color: #263858;
    width: 100%;
    margin-top: 21rpx;
    margin-bottom: 21rpx;
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
            
            font-weight: 600;
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
        height: 52rpx;
    }

    .getCode {
        font-size: 26rpx;
        
        font-weight: 400;
        color: #263858;
        width: 160rpx;
        height: 52rpx;
        outline: 2rpx solid #263858;
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
    letter-spacing: 2rpx;
    transition: all 0.3s;
}

.canSubmit {
    background-color: #fa1545;
    color: #ffffff;
}
</style>
