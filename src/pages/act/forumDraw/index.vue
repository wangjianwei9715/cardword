<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-07-24 17:01:39
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-24 17:27:31
 * @FilePath: \card-world\src\pages\act\forumDraw\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="topBanner"></view>
        <view class="drawContainer">
            <view class="drawBlock" :class="[`drawBlock${index + 1}`, index == nowHeightLight ? `heightLight` : '']"
                v-for="(item, index) in drawList">

            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    drawList: any = [
        { label: "奖品1" },
        { label: "奖品2" },
        { label: "奖品3" },
        { label: "奖品4" },
        { label: "奖品5" },
        { label: "奖品6" },
        { label: "奖品7" },
        { label: "奖品8" }
    ]
    nowHeightLight: number = 0
    onLoad(query: any) {
        setTimeout(() => {
            this.startDraw(7)
        }, 2000)
    }
    startDraw(endIndex:number){
        
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
.drawContainer {
    display: grid;
    width: 750rpx;
    flex-wrap: wrap;
    grid-template-columns: repeat(3, 220rpx);
    grid-template-rows: repeat(3, 220rpx);
    grid-column-gap: 20rpx;
    grid-row-gap: 20rpx;
    justify-content: center;
    margin-top: 30rpx;
}

.drawBlock {
    width: 220rpx;
    height: 220rpx;
    // background-color: red;
    background-color: rgba(255, 0, 0, .4);
}

.heightLight {
    outline: 4rpx solid red;
}

.drawBlock1 {
    grid-area: 1 / 1 / 2 / 2;
}

.drawBlock2 {
    grid-area: 1 / 2 / 2 / 3;
}

.drawBlock3 {
    grid-area: 1 / 3 / 2 / 4;
}

.drawBlock4 {
    grid-area: 2 / 3 / 3 / 4;
}

.drawBlock5 {
    grid-area: 3 / 3 / 4 / 4;
}

.drawBlock6 {
    grid-area: 3 / 2 / 4 / 3;
}

.drawBlock7 {
    grid-area: 3 / 1 / 4 / 2;
}

.drawBlock8 {
    grid-area: 2 / 1 / 3 / 2;
}
</style>
