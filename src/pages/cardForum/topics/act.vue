<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-15 17:02:36
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-15 17:24:39
 * @FilePath: \card-world\src\pages\cardForum\topics\act.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <navigationbar title="挑战话题" rightText="查看往期" @onClickRightText="onClickRightText"></navigationbar>
        <div class="titleWrap">本期话题</div>
        <div class="titleWrap">
            <div class="title">排名奖励</div>
            <div class="rightText">我的最高获赞188</div>
        </div>
        <div class="rankWrap" v-for="(item, index) in 10">
            <div class="rankNum">{{ index + 1 }}</div>
            <muqian-lazyLoad :src="app.defaultAvatar" borderRadius="50%" class="avatar"></muqian-lazyLoad>
            <div class="userInfo">
                <div class="userName">xxxxxxxx</div>
                <div class="likeNum">199获赞</div>
            </div>
            <div class="award">100元无门槛券</div>
        </div>
        <div class="titleWrap">
            <div class="title">规则说明</div>
            <!-- <div class="rightText">我的最高获赞188</div> -->
        </div>
        <div>
            1、本期活动时间：2020.01.01-2020.01.01。活动期间，用户发布本话题动态即可参与，活动结束后点赞数最高的x位用户获得相应奖励。
            2、若发布多个本话题动态，则取点赞数最高的作品参与；若两名或多名用户点赞数相同，则按发布时间排名。
            3、活动截至后，优惠券奖品自动发放，实物类奖品请联系客服发放
        </div>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    app = app
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20
    }
    list: any = []
    totalPage: number = 0
    onLoad(query: any) {
        // this.reqNewData()
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    onPullDownRefresh() {
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    onClickRightText(){
        uni.navigateTo({
            url:"/pages/cardForum/topics/list"
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.totalPage = res.totalPage
            this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
.titleWrap {
    width: 750rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.rankWrap {
    box-sizing: border-box;
    padding: 0 25rpx;
    width: 750rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;

    .rankNum {
        width: 100rpx;
        text-align: center;
    }

    .avatar {
        width: 66rpx;
        height: 66rpx;
        margin-right: 20rpx;
    }

    .userInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
    }

    .userName {
        margin-bottom: 6rpx;
    }
}
</style>
