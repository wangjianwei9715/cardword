<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-22 15:09:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-18 11:38:37
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
@Component({})
export default class ClassName extends BaseNode {
    rule: any = rule
    onLoad(query: any) {
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
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
    font-family: PingFang SC;
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
