<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-04-27 16:40:21
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-09-14 15:02:00
 * @FilePath: \card-world\src\pages\act\dewu\rule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="title">活动说明</view>
        <view class="desc">
            2023.09.015~2023.10.07用户可通过活动页面消耗一定卡币兑换得物免费卡牌评级券(限35pt及以下可用)。两种组合可供兑换。</view>
        <view class="desc">1）得物免费卡牌评级券x1合计1200份，每位用户限兑1次，兑完即止。</view>
        <view class="desc">2）得物免费卡牌评级券x2+卡牌回寄包邮券x1，合计900份，每位用户限兑1次，兑完即止。</view>
        <view class="desc red">您获得的得物免费卡牌评级券仅限35pt及以下卡片可用</view>
        <view class="desc" style="margin-top: 10rpx;">
            同时在得物app下单5张卡牌评级（得物app内将5笔评级订单合并即可），评级订单完成后额外附赠1张得物免费卡牌评级券(限35pt及以下可用)！下单后，7个工作日内自动发放至得物账户。
        </view>
        <view class="title">使用说明</view>
        <view class="desc">1）每张评级券可免费评级一张卡片，有效期至2023.05.07，过期作废。</view>
        <view class="desc">2）用户在卡世界app兑换成功后，通过活动页面专属入口跳转到得物app领取评级券。</view>
        <view class="desc">3）获得评级券的用户可登录得物app，通过 探索-鉴别服务-评级卡服务或直接在购买页搜索【卡牌评级】 按照操作流程进行评级。</view>
        <view class="imgContainer">
            <!-- <image mode="aspectFill" @click="prvImg(index)" v-for="(item, index) in pics" :key="index" :src="item"></image> -->
            <image mode="heightFix" @click="prvImg(0)" src="/static/act/dewu/rule1.png">
            </image>
            <image mode="heightFix" @click="prvImg(1)" src="/static/act/dewu/rule2.png">
            </image>
            <image mode="heightFix" @click="prvImg(2)" src="/static/act/dewu/rule3.png">
            </image>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    pics: any = [
        "/static/act/dewu/rule1.png",
        "/static/act/dewu/rule2.png",
        "/static/act/dewu/rule3.png"
    ]
    onLoad(query: any) {
    }
    prvImg(index: number) {
        uni.previewImage({
            urls: this.pics,
            current: index
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #000;
    color: #fff;
}

.content {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    display: block;
}

.title {
    font-weight: bold;
    font-size: 34rpx;
    margin-top: 30rpx;
    margin-bottom: 14rpx;
}

.desc {
    font-size: 26rpx;
    line-height: 40rpx;
    // text-indent: 2em;
}

.imgContainer {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 40rpx;

    image {
        display: block;
        height: 406rpx;
    }
}

.red {
    color: #00feff;
    font-weight: bold;
}
</style>
