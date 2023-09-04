<template>
    <view class="content">
        <view class="orther-setting">

            <view class="setting" @click.stop="onClickPhone">
                <view class="name">手机号</view>
                <view class="grayText">{{ formData.hasPhone ? formData.phoneNumber : '未绑定' }}</view>
                <view class="icon-right"></view>
            </view>
            <view class="setting" @click.stop="onClickPwd">
                <view class="name">{{ formData.hasPwd ? '修改' : '设置' }}登录密码</view>
                <view class="grayText">{{ formData.hasPwd ? '去修改' : '去设置' }}</view>
                <view class="icon-right"></view>
            </view>
            <view class="setting" @click.stop="onClickIdentity">
                <view class="name">实名认证</view>
                <view class="grayText">{{ formData.identityAuth ? formData.realName : '未认证' }}</view>
                <view class="icon-right"></view>
            </view>
            <view class="setting" @click.stop="onClickWechat">
                <view class="name">微信账号</view>
                <view class="grayText">{{ formData.hasWechat ? (formData.wechatNickName || '已绑定') : '未绑定' }}</view>
                <view class="icon-right"></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
import { PhoneCodeType } from "@/tools/DataExchange"
@Component({})
export default class ClassName extends BaseNode {
    settingTab = [
        // { id: 1, name: "修改密码/设置登录密码", url: "/pages/login/change_password" },
        // { id: 2, name: "实名认证", url: "/pages/userinfo/security/user_identity" },
    ];
    xiaoxiDefault = false;
    orderRich = app.orderRich
    fileSizeString = "";
    needRemove = true;
    identityAuth: boolean = false
    realName: string = ""
    formData: any = {
        bindPhoneTime: 0,
        hasPhone: false,
        hasWechat: false,
        canBindPhone: true,
        hasPwd: false,
        identityAuth: false,
        phoneNumber: "",
        realName: "",
        wechatNickName: ""
    }
    onLoad(query: any) {
        this.formatSize();
        // this.getAccountInfo()
        // this.onEventUI('identityAuthGet', (res) => {

        // })
    }
    onShow() {
        this.getAccountInfo()
    }
    onClickWechat() {
        if (this.formData.hasWechat) {
            if (!this.formData.hasPhone) {
                uni.showModal({
                    title: "提示",
                    content: "账号需绑定手机号才可进行解绑操作,是否前去绑定手机号?",
                    success: (res: any) => {
                        if (res.confirm) {
                            uni.navigateTo({
                                url: "/pages/login/checkPhone?type=" + PhoneCodeType.BIND_PHONE
                            })
                        }
                    }
                })
                return
            }
            uni.showModal({
                title: '提示',
                content: "是否解除微信绑定?",
                success: (res: any) => {
                    if (res.confirm) {
                        app.http.Post("user/unbind/wechat", {}, (res: any) => {
                            uni.showToast({
                                title: "成功解绑"
                            })
                            setTimeout(() => {
                                this.getAccountInfo()
                            }, 500)
                        })
                    }
                }
            })
        } else {
            uni.showModal({
                title: '提示',
                content: "是否绑定微信",
                success: (res: any) => {
                    if (res.confirm) {
                        uni.login({
                            provider: 'weixin',
                            success: (loginRes: any) => {
                                let params = {
                                    weixinToken: loginRes.authResult.access_token,
                                    unionid: loginRes.authResult.unionid,
                                    openid: loginRes.authResult.openid,
                                }
                                console.log(params);
                                app.http.Post(`user/bind/wechat`, params, (data: any) => {
                                    uni.showToast({
                                        title: "绑定成功"
                                    })
                                    setTimeout(() => {
                                        this.getAccountInfo()
                                    }, 500)
                                })
                            },
                            fail: (loginRes: any) => {
                                uni.showToast({ title: '请确认已经安装微信', icon: 'none' })
                            }
                        });
                    }
                }
            })
        }
    }
    onClickIdentity() {
        if (this.formData.identityAuth) return
        uni.navigateTo({
            url: `/pages/userinfo/security/user_identity`
        })
    }
    onClickPwd() {
        if (!this.formData.hasPhone) {
            uni.showModal({
                title: "提示",
                content: "设置密码需要绑定手机号，是否前去绑定手机号？",
                success: (res: any) => {
                    if (res.confirm) {
                        uni.navigateTo({
                            url: "/pages/login/checkPhone?type=" + PhoneCodeType.BIND_PHONE
                        })
                    }
                }
            })
            return
        }
        uni.navigateTo({
            url: `/pages/login/checkPhone?type=${PhoneCodeType.SET_PWD}&maskPhone=${this.formData.phoneNumber}`
        })
    }
    onClickPhone() {
        if (this.formData.hasPhone) {
            if (!this.formData.canBindPhone) {
                uni.showToast({
                    title: "每月只可换绑一次",
                    icon: "none"
                })
                return
            }
            uni.showModal({
                title: '提示',
                content: `是否换绑手机号,每月只可换绑一次`,
                success: (res: any) => {
                    if (res.confirm) {
                        uni.navigateTo({
                            url: `/pages/login/checkPhone?type=${PhoneCodeType.CHANGE_BIND_PHONE}&maskPhone=${this.formData.phoneNumber}`
                        })
                    }
                }
            })
        } else {
            uni.navigateTo({
                url: "/pages/login/checkPhone?type=" + PhoneCodeType.BIND_PHONE
            })
        }
    }
    onClickNavigateto(url: string) {
        // if (item.id == 2 && this.identityAuth) return
        uni.navigateTo({
            url: url,
        });
    }
    formatSize() {
        // #ifdef APP-PLUS
        //@ts-ignore
        plus.cache.calculate((size: any) => {
            if (size <= 0) {
                this.needRemove = false;
                this.fileSizeString = "0B";
                return;
            }
            if (size < 1024) {
                this.fileSizeString = size + "B";
            } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
                this.fileSizeString = Math.floor((size / 1024) * 100) / 100 + "KB";
            } else if (size / 1024 / 1024 >= 1) {
                this.fileSizeString =
                    Math.floor((size / 1024 / 1024) * 100) / 100 + "M";
            }
        });
        // #endif
    }
    getAccountInfo() {
        app.http.Get('dataApi/me/account/info', {}, (res: any) => {
            this.formData = res.data
        })
    }
    getMyIdentity() {
        app.http.Get('dataApi/me/getMyIdentity', {}, (res: any) => {
            this.identityAuth = res.identityAuth
            this.realName = res.data.realName
        })
    }
}
</script>

<style lang="scss">
.icon-right {
    width: 10rpx;
    height: 16rpx;
    background: url(@/static/goods/jinru@2x.png) no-repeat center;
    background-size: 100% 100%;
    margin-left: 8rpx;
}

.content {
    width: 100%;
    box-sizing: border-box;
}

.orther-setting {
    width: 100%;
    box-sizing: border-box;
    padding: 0 32rpx;

    .setting {
        width: 100%;
        height: 98rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        // justity-content: space-between;
        border-bottom: 1px solid #f1f1f4;

        .name {
            font-size: 24rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: #14151a;
            flex: 1;
        }

        .grayText {
            font-size: 24rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            // font-weight: 600;
            color: #aaaaaa;
            margin-right: 6rpx;
        }

        .right {
            height: 98rpx;
            display: flex;
            align-items: center;
            justity-content: flex-end;
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #aaaabb;
        }
    }
}

uni-switch .uni-switch-input {
    margin-right: 0 !important;
}

.logout {
    width: 718rpx;
    height: 88rpx;
    background: #14151b;
    border-radius: 4rpx;
    margin: 0 auto;
    margin-top: 60rpx;
    text-align: center;
    line-height: 88rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #ffffff;
}
</style>
