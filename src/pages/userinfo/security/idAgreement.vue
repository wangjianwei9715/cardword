<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-02-09 11:41:27
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-02-09 13:32:39
 * @FilePath: \card-world\src\pages\userinfo\user_identity.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <!-- <u-loading-page :loading="false" loading-text="认证中" loading-color="#fe3e58" icon-size="146rpx"></u-loading-page> -->
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

</style>
