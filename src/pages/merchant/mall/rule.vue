<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-22 15:09:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-29 15:06:17
 * @FilePath: \jichao_app_2\src\pages\merchant\mall\rule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="ruleContainer">
            <view class="rule" v-for="(item, index) in rule" :key="index">
                <view class="title" v-if="item.title">{{index+1}}.{{item.title}}</view>
                <view class="content" v-for="(listItem,listIndex) in item.list" :key="(index+1)+'_'+listIndex">
                    <text v-if="listItem.title">{{listItem.title}}</text>{{listItem.content}}
                </view>
                <view class="content" v-if="item.monthWeight">
                    <text>权重卡说明：</text>权重卡每月兑换上限为{{merchantInfo.maxMonthWeight}}权重分（计算累计兑换的权重分，并非商家积分)
                </view>
                <text v-if="item.time" class="time">{{item.time}}</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { rule } from "../constants/constants";
import { getMerchantIntegral } from '../utils/util';
@Component({})
export default class ClassName extends BaseNode {
    rule: any = rule
    merchantInfo:any = {
        maxMonthWeight:5000
    };
    onLoad(query: any) {
        if(query.maxMonthWeight){
            this.merchantInfo.maxMonthWeight = query.maxMonthWeight
        }else{
            this.getMerchantInfo()
        }
    }
    async getMerchantInfo(){
        const info = await getMerchantIntegral();
        this.merchantInfo = {
            maxMonthWeight:info.maxMonthWeight || 5000,
        }
    }
}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}
@mixin box {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 20rpx
}
.ruleContainer {
    @include box;
    padding: 30rpx 33rpx 0 33rpx;
    font-size: 25rpx;
    
    font-weight: 400;
    color: #7D8288;
    .title{
        @include box;
        color:#333;
        font-size: 30rpx;
        font-weight: bold;
    }
    .content{
        @include box;
        display: inline-block;
        text-indent: 30rpx;
        line-height: 45rpx;
    }
    text{
        color:#E6374C
    }
}
</style>
