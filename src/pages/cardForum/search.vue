<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-14 14:03:01
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-14 14:40:58
 * @FilePath: \card-world\src\pages\cardForum\search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="header-banner">
            <statusbar />
            <view class="tab-header">
                <view class="header-search">
                    <view class="search-icon"></view>
                    <input class="search-input" type="text" focus v-model="searchTetxt" :placeholder="placeholder"
                        confirm-type="search" @confirm="onClickSearch()" />
                </view>
                <view v-if="searchTetxt == ''" class="header-right" @click="app.platform.pageBack()">取消</view>
                <view v-else class="header-right" @click="onClickSearch()">搜索</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
type Hot = {
    title: string;
    id: number;
}
@Component({})
export default class ClassName extends BaseNode {
    app = app
    searchTetxt: string = ""
    placeholder: string = "搜你想搜..."
    hotSearchList: Array<Hot> = []
    onLoad(query: any) {
        //@ts-ignore
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('defaultText', (data: any) => {
            if (data.searchText) this.searchTetxt = data.searchText
        })
    }
    onClickSearch() {
        if (this.searchTetxt == "") {
            app.platform.pageBack()
            return
        }
        //@ts-ignore
        this.getOpenerEventChannel && this.getOpenerEventChannel().emit("receive", { searchText: this.searchTetxt })
        app.platform.pageBack()
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {
            this.hotSearchList = res.list
        })
    }

}
</script>

<style lang="scss">
.header-banner {
    width: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    z-index: 9;
    padding-bottom: 10rpx;
}

.tab-header {
    width: 100%;
    height: 104rpx;
    display: flex;
    box-sizing: border-box;
    padding: 0 20rpx;
    z-index: 10;
    align-items: center;
    justify-content: space-between;
}

.header-search {
    width: 640rpx;
    height: 64rpx;
    background: #F5F5F8;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 29rpx;
}

.search-input {
    width: 626rpx;
    height: 64rpx;
    background: #F5F5F5;
    border-radius: 3rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #14151A;
    padding-left: 76rpx
}

.search-icon {
    width: 28rpx;
    height: 28rpx;
    background: url(../../static/index/sousuo@2x.png) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    left: 28rpx;
    top: 50%;
    margin-top: -14rpx;
}

.header-right {
    height: 50rpx;
    line-height: 50rpx;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #14151A;
}
</style>
