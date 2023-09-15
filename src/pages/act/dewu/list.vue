<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-09-14 16:12:36
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-09-15 10:39:27
 * @FilePath: \card-world\src\pages\act\dewu\list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav :title="title" :transition="false" :needIconShadow="false" :needRightTools="['客服', '规则']"
            @onClickRule="onClickRule">
        </transitionNav>
        <view class="faker" :style="{ height: navHeight + 'px' }"></view>
        <view class="topBannerContainer">
            <image class="banner" src="/static/act/dewu/listBanner.png"></image>
        </view>
        <view class="contentContainer">
            <view class="topRed" style="height: 84rpx;"></view>
            <view class="bigTitle center" style="margin-top: 76rpx;background-color: #000000;width: 750rpx;">01.话题点赞榜</view>
            <view class="tips center"><text class="blue">发布球星卡内容</text>并关联本话题即可参与</view>
            <view class="rankContainer">
                <view class="myRank uni-flex jb ac">
                    <view class="myRank_rank">我的排名：{{ myRank || "暂未上榜" }}</view>
                    <view class="goPush" @click="onClickPush">去发布 <image src="/static/act/dewu/redDot.png"></image>
                    </view>
                </view>
                <view class="tableTitle">
                    <view class="name" style="width: 33%;">排名</view>
                    <view class="name" style="width: 30%;">点赞数</view>
                    <view class="name" style="width: 30%;">奖励</view>
                    <view class="gz" style="left: 20rpx;"></view>
                    <view class="gz" style="left: 233rpx;"></view> 
                    <view class="gz" style="left: 450rpx;"></view> 
                    <view class="gz" style="right: 20rpx;"></view> 
                </view>
                <scroll-view scroll-y="true" class="scrollContainer" @scrolltolower="scrolltolower">
                    <view class="scrollItem uni-flex" v-for="(item, index) in  rankList" :key="index" @click="onClickRank(item)"
                        :style="{ marginTop: index == 0 ? `25rpx` : '0' }">
                        <view class="rankNum">{{ index + 1 }}</view>
                        <muqian-lazyLoad  borderRadius="50%" :src="avatar(item)" class="avatar"></muqian-lazyLoad>
                        <view class="userName u-line-1">{{ item.code ? item.userName : '虚位以待' }}</view>
                        <view class="likeContainer uni-flex alc">
                            <view class="likeNum">{{ item.likeNum }}</view>
                            <image src="/static/act/dewu/whiteGo.png" class="likeGo"></image>
                        </view>
                        <view class="awardName flex1 u-line-1">{{ item.awardName }}</view>
                    </view>
                </scroll-view>
                <view class="rankTips">*温馨提示：优惠券于活动结束后自动发放，得物评级&保护券请<text class="blue">联系客服</text>领取</view>
            </view>
            <view class="bigTitle center" style="margin-top: 40rpx;">02.晒评级 送礼品</view>
            <view class="tips center"><text class="blue">发布得物评级相关内容</text>并关联本话题即可领奖</view>
            <view class="uni-flex"
                style="box-sizing: border-box;width: 750rpx;padding: 0 25rpx;justify-content: space-between;align-items: center;margin-top: 42rpx;">
                <image src="/static/act/dewu/pt1.png" style="width: 286rpx;height: 117rpx;"></image>
                <image src="/static/act/dewu/add.png" style="width: 52rpx;height: 52rpx;"></image>
                <image src="/static/act/dewu/pt2.png" style="width: 286rpx;height: 117rpx;"></image>
            </view>
            <view class="reqContainer">
                <view class="req"><text class="blue"
                        style="font-weight: bold;">参与要求：</text>发布的内容需本人原创并关联“#得物评级”话题。内容需与得物评级相关，如：发布评级后寄回的卡片照；分享评级的过程等等。
                </view>
                <view class="req" style="margin-top: 30rpx;"><text class="blue"
                        style="font-weight: bold;">领奖说明：</text>发布后请联系卡世界客服并附上原创相关证明，核实后将为您发放奖励。5元无门槛券立即发放，得物免费评级券请向卡世界客服提供得物注册ID与手机号并于5个工作日内发放至您的得物账号
                </view>

            </view>
            <view class="reqButton uni-flex alc">
                <view class="button flexCenter" style="background-image: url('/static/act/dewu/lxkf.png');" @click="lxkf">
                    联系客服</view>
                <view class="button flexCenter" style="background-image: url('/static/act/dewu/goPush.png');color: #ffffff;"
                    @click="onClickPush">去发布</view>
            </view>
            <view class="bigTitle center" style="margin-top: 56rpx;margin-bottom: 25rpx;">03.精选内容</view>
            <waterfalls style="width: 750rpx;margin-top: 10rpx;" ref="waterfall" :showBottom="true" :detailBack="false"
                :isMine="false" :value="list" :refresh="false" :showEmpty="false">
            </waterfalls>
        </view>

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
    rankIsFetchEnd: boolean = false
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
    navHeight: number = app.statusBarHeight + uni.upx2px(88)
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
    onClickRank(item:any){
        if(!item.code) return
        uni.navigateTo({
            url:`/pages/cardForum/detail?code=${item.code}`
        })
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
    avatar(item: any) {
        if (!item.code) return `/static/goods/v2/waitAvatar.png`
        if (!item.avatar) return app.defaultAvatar
        //@ts-ignore
        return this.$parsePic(item.avatar)
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
    background-color: #000000;
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

.bigTitle {
    font-size: 52rpx;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #FFFFFF;
}

.tips {
    font-size: 27rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 2rpx;
    padding-top: 6rpx;
    width: 750rpx;
    background-color: #000000;
}

.rankContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 25rpx;
    margin-top: 40rpx;

    .rankTips {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 17rpx;
        line-height: 40rpx;

    }

    .myRank_rank {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
    }

    .goPush {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FA1545;
        display: flex;
        align-items: center;

        image {
            width: 17rpx;
            height: 26rpx;
            margin-left: 13rpx;
        }
    }

    .tableTitle {
        width: 710rpx;
        height: 92rpx;
        display: flex;
        align-items: center;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/tabletitle.png");
        margin-top: 30rpx;
        position: relative;
        .name {
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FA1545;
            text-align: center;
        }
        .gz{
            position: absolute;
            width: 25rpx;
            height: 40rpx;
            background-size: 100% 100%;
            background-image: url("@/static/act/dewu/kz.png");
            bottom: -20rpx;
        }
    }

    .scrollContainer {
        width: 710rpx;
        height: 580rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/scrollContainer.png");
        box-sizing: border-box;
        padding: 10rpx 36rpx 10rpx 20rpx;
        margin-top: -4rpx;
        .scrollItem {
            margin-bottom: 35rpx;
            height: 47rpx;
            align-items: center;
        }

        .rankNum {
            font-size: 33rpx;
            font-family: Impact;
            font-weight: 400;
            color: #FFFFFF;
            width: 50rpx;
            text-align: center;
            margin-right: 10rpx;
        }

        .avatar {
            width: 47rpx;
            height: 47rpx;
            // background: #FFFFFF;
            border-radius: 50%;
            margin-right: 20rpx;
        }

        .userName {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            // background-color: #000000;
            width: 150rpx;
            // height: 30rpx;
        }

        .likeContainer {
            // background-color: rgba(0, 0, 0, .3);
            width: 100rpx;
            align-items: center;
            justify-content: center;

            .likeNum {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
            }

            .likeGo {
                width: 14rpx;
                height: 21rpx;
                display: block;
                margin-left: 15rpx;
            }

        }

        .awardName {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            text-align: right;
        }
    }
}

.blue {
    color: #FA1545;


}

@font-face {
    font-family: "FZLanTingHeiS-H-GB";
    src: url("@/common/Tao/FZLanTingHeiSH.ttf");
}

.topBannerContainer {
    width: 750rpx;
    height: 644rpx;

    .banner {
        width: 100%;
        height: 100%;
    }
}

.reqContainer {
    // width: 600rpx;
    // border: 1rpx solid #000000;
    box-sizing: border-box;
    // padding: 30rpx;
    width: 750rpx;
    padding: 0 25rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    // color: #FA1545;
    color: #ffffff;
    margin-top: 24rpx;
    // line-height: 44rpx;
    .req{
        line-height: 44rpx;
    }


}

.reqButton {
    justify-content: center;
    padding: 0 12rpx;
    margin-top: 21rpx;

    .button {
        // margin-left: 30rpx;
        width: 355rpx;
        height: 126rpx;
        // background-color: #169bd5;
        color: #fff;
        font-weight: bold;
        // border-radius: 3rpx;
        background-size: 100%;
        font-size: 38rpx;
        font-family: FZLanTingHeiS-H-GB;
        font-weight: 400;
        color: #2C2C2C;
        letter-spacing: 2rpx;
    }
}

.contentContainer {
    width: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    bottom: 150rpx;
    // background-color: #000;

    .topRed {
        width: 750rpx;

        position: absolute;
        height: 84rpx;
        left: 0;
        top: 0;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/redTop.png");
    }
}</style>
