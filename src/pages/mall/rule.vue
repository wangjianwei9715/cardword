<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-22 15:09:17
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-22 15:14:51
 * @FilePath: \card-world\src\pages\mall\mallRule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="ruleContainer">
            <view class="rule" v-for="(item, index) in mallExchangeRule" :key="index">{{ item.content }}</view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import {
    mallExchangeRule
} from "@/tools/DataRules";
@Component({})
export default class ClassName extends BaseNode {
    mallExchangeRule: any = mallExchangeRule
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

.ruleContainer {
    padding: 30rpx 33rpx 0 33rpx;
    font-size: 25rpx;
    
    
    color: #7D8288;
    .rule{
        margin-bottom: 20rpx;
    }
}
</style>
