<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-09-14 16:12:36
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-09-14 18:28:23
 * @FilePath: \card-world\src\pages\act\dewu\list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav :title="title" :transition="false" :needIconShadow="false" :needRightTools="['客服', '规则']"
            @onClickRule="onClickRule">
        </transitionNav>
        <view class="topBannerContainer">
            <image class="banner" src="/static/act/dewu/card4.png"></image>
        </view>
        <view class="bigTitle center">01.话题点赞榜</view>
        <view class="tips center"><text class="blue">发布球星卡内容</text>并关联本话题即可参与</view>
        <view class="rankContainer">
            <view class="myRank uni-flex jb ac">
                <view class="myRank_rank">我的排名：{{ myRank || "暂未上榜" }}</view>
                <view class="goPush" @click="onClickPush">去发布</view>
            </view>
            <view class="tableTitle"></view>
            <scroll-view scroll-y="true" style="height:700rpx" @scrolltolower="scrolltolower">
                <view v-for="(item, index) in  rankList" :key="index">
                    {{ item }}</view>
            </scroll-view>
            <view class="rankTips">*温馨提示：优惠券于活动结束后自动发放，得物评级&保护券请<text class="blue">联系客服</text>领取</view>
        </view>
        <view class="bigTitle center">02.晒评级 送礼品</view>
        <view class="tips center"><text class="blue">发布得物评级相关内容</text>并关联本话题即可领奖</view>
        <view class="reqContainer">
            <view class="req"><text class="blue">参与要求：</text>发布的内容需本人原创并关联“#得物评级”话题。内容需与得物评级相关，如：发布评级后寄回的卡片照；分享评级的过程等等。
            </view>
            <view class="req"><text
                    class="blue">领奖说明：</text>发布后请联系卡世界客服并附上原创相关证明，核实后将为您发放奖励。5元无门槛券立即发放，得物免费评级券请向卡世界客服提供得物注册ID与手机号并于5个工作日内发放至您的得物账号
            </view>
            <view class="reqButton uni-flex alc">
                <view class="button flexCenter" @click="lxkf">联系客服</view>
                <view class="button flexCenter" @click="onClickPush">去发布</view>
            </view>
        </view>
        <view class="bigTitle center">03.精选内容</view>
        <waterfalls style="width: 750rpx;margin-top: 10rpx;" ref="waterfall" :showBottom="true" :detailBack="false"
            :isMine="false" :value="list" :refresh="false" :showEmpty="false">
        </waterfalls>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import waterfalls from "@/pages/cardForum/components/waterfalls.vue"
import { releaseByTopic } from "@/pages/cardForum/func"
const navRule = {
    "规则": {
        emitAction: "onClickRule",
        icon: "/static/act/dewu/rule.png",
        style: {
            width: "36rpx",
            height: "36rpx",
            marginRight: "20rpx"
        }
    }
}
@Component({
    components: {
        waterfalls
    }
})
export default class ClassName extends BaseNode {
    navRule = navRule
    topicsId: number = 51
    isFetchEnd: boolean = false
    rankIsFetchEnd:boolean=false
    firstReqEnd: boolean = false
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
        topicId: 0,
        scrollId: "",
        st: 0,
        sn: "",
        od: "hot"
    }
    rankQueryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
    }
    rankList: any = []
    list: any = []
    myLikeNum: number = 0
    maxRank: number = 0
    myRank: number = 0
    title: string = ""
    topData: any = {}
    onLoad(query: any) {
        if (query.topicsId) this.topicsId = +query.topicsId
        this.reqList()
        this.reqRankList()
        this.reqNewData()
    }
    lxkf() {
        let params = { agentExten: '' }
        app.platform.heliService(params)
    }
    onClickPush() {
        app.platform.hasLoginToken(() => {
            releaseByTopic(this.topicsId)
        })
    }
    onClickRule() {
        console.log("点击规则");
        uni.navigateTo({
            url: "/pages/act/dewu/topicRule"
        })

    }
    scrolltolower() {
        if (this.rankIsFetchEnd) return
        this.rankQueryParams.fetchFrom += this.rankQueryParams.fetchSize
        this.reqRankList()
    }
    reqRankList() {
        app.http.Get(`dataApi/cardCircle/topic/award/list/${this.topicsId}`, this.rankQueryParams, (res: any) => {
            const list = res.list || []
            this.rankIsFetchEnd = res.isFetchEnd
            this.rankQueryParams.fetchFrom == 1 ? this.rankList = list : this.rankList.push(...list)
            this.myLikeNum = res.myLikeNum
            this.myRank = res.myRank || 0
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/cardCircle/topic/detail/` + this.topicsId, {}, (res: any) => {
            this.topData = res.data
            this.maxRank = res.data.maxRank || 20
            this.title = res.data.name
        })
    }
    reqList() {
        this.queryParams.topicId = this.topicsId
        this.queryParams.timeStamp = Math.round(+new Date() / 1000)
        app.http.Get(`dataApi/cardCircle/search/dt`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.firstReqEnd = true
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.scrollId = res.scrollId
            this.list.push(...list)
            this.firstReqEnd = true
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f2f2f2;
}

.center {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.jb {
    justify-content: space-between;
}

.flex1 {
    flex: 1;
}

.navRight_text {
    color: #000000;
}

.ac {
    align-items: center;
}

.bigTitle {}

.tips {}

.rankContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 30rpx;

    .rankTips {}
}

.blue {
    color: #02a7f0;
}

.topBannerContainer {
    width: 750rpx;
    height: 500rpx;

    .banner {
        width: 100%;
        height: 100%;
    }
}

.reqContainer {
    width: 600rpx;
    border: 1rpx solid #000000;
    box-sizing: border-box;
    padding: 30rpx;

    .reqButton {
        justify-content: center;

        .button {
            margin-left: 30rpx;
            width: 170rpx;
            height: 50rpx;
            background-color: #169bd5;
            color: #fff;
            font-weight: bold;
            border-radius: 3rpx;
        }
    }
}
</style>
