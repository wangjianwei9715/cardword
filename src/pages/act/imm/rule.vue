<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-01-10 16:18:45
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-01-10 16:21:50
 * @FilePath: \card-world\src\pages\act\imm\rule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
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
</style>
