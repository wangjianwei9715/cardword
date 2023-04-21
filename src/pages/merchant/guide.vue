<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-04-20 15:51:21
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-21 13:37:46
 * @FilePath: \card-world\src\pages\merchant\guide.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="guideContent">
            <view class="guideWrap" v-for="(item, index) in list">
                <view class="type">{{ item.title }}</view>
                <view class="question" v-for="(son, sonIndex) in (item.question || [])" @click="goToDetail(son.id)">
                    <view class="title">{{ son.title }}</view>
                    <u-icon color="#63647f" size="26rpx" name="arrow-right"></u-icon>
                </view>
            </view>
            <empty v-if="!list || !list.length"/>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    list: any = []
    onLoad(query: any) {
        this.reqNewData()
    }
    goToDetail(id:number){
        uni.navigateTo({
            url:"/pages/merchant/guideDetail?id="+id
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/merchant/guide/list`, {}, (res: any) => {
            console.log(res);
            this.list = res.list || []
        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFangSC-Regular;
}

.guideContent {
    box-sizing: border-box;
    width: 750rpx;
    padding: 20rpx 30rpx;

    .guideWrap {
        margin-bottom: 60rpx;
    }

    .type {
        font-size: 34rpx;
        font-weight: bold;
        color: #1B1B1D;
        margin-bottom: 34rpx;
    }

    .question {
        display: flex;
        align-items: center;
        height: 80rpx;
        border-bottom: 1rpx solid #F5F5F5;
        justify-content: space-between;
        .title {
            font-size: 28rpx;
            color: #1B1B1D;
        }
    }
}
</style>
