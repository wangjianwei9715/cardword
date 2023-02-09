<template>
    <view class="content">
        <view class="orther-setting">
            <view class="setting" v-for="item in settingTab" :key="item.id" @click="onClickNavigateto(item)">
                <view class="name">{{ item.name }}</view>
                <view class="grayText" v-if="item.id == 2">{{ identityAuth?`已认证（${realName}）`: "未认证"}}</view>
                <view class="icon-right"></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
@Component({})
export default class ClassName extends BaseNode {
    settingTab = [
        { id: 1, name: "修改密码/设置登录密码", url: "/pages/login/change_password" },
        { id: 2, name: "实名认证", url: "/pages/userinfo/security/user_identity" },
    ];
    xiaoxiDefault = false;
    orderRich = app.orderRich
    fileSizeString = "";
    needRemove = true;
    identityAuth: boolean = false
    realName: string = ""
    onLoad(query: any) {
        this.formatSize();
        this.getMyIdentity()
        this.onEventUI('identityAuthGet', (res) => {
            this.getMyIdentity()
        })
    }
    onClickNavigateto(item: any) {
        if (item.id == 2 && this.identityAuth) return
        uni.navigateTo({
            url: item.url,
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
        // justify-content: space-between;
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
            justify-content: flex-end;
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
