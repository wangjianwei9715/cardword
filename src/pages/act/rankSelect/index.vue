<template>
    <view class="content">
        <view class="rewardContainer">

        </view>
        <view class="actProgressContainer">

        </view>
        <view class="rankContainer">
            <view class="rankTr">
                <view class="rankTd">排行</view>
                <view class="rankTd">用户名</view>
                <view class="rankTd">积分</view>
                <view class="rankTd">奖励</view>
            </view>
            <view class="rankTr" v-for="(item,index) in rankList">
                <view class="rankTd flexCenter rankNum" :class="[index<=2?`rank${index+1}`:'']">{{index+1}}</view>
                <view class="rankTd">
                    <muqian-lazyLoad :src="item.userAvatar?$parsePic(decodeURIComponent(item.userAvatar)):defaultAvatar"/>
                    <view>
                        {{item.userName}}
                    </view>
                </view>
                <view class="rankTd">
                    <view>已获取：{{item.get_score}}</view>
                    <view>冻结中：{{item.lock_score}}</view>
                </view>
                <view class="rankTd" @click="prviewImages(item.awardPic_url)">
                    <muqian-lazyLoad :src="$parsePic(decodeURIComponent(item.awardPic_url))" />
                </view>
            </view>
        </view>
        <view class="bottomContainer">
            <view class="buttonItem flexCenter">
                <view class="button flexCenter" @click="onClickGoBuy">参与拼团</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <bottomDrawer :showDrawer.sync="descriptionShow" title="积分说明">
            <view class="descriptionContainer">
                1.如何获得积分

                用户可通过参与one and one 系列拼团获得对应活动积分，拼团期间积分保持冻结状态，在拼团完成时则会发放至用户积分中

                2.积分说明
                根据不同卡密，用户获得的积分倍数也不同，基础卡密为1，若玩家随机到指定卡密则会以卡密倍数x单价的形式发放给用户，不同的球队倍数也不同，将x用户拼团时的单价结算给用户

                注：活动卡密可转赠，但活动积分不会同卡密一起转增

                2.指定倍数

                球队倍数：

                球员倍数：

                基础分：

                关键字倍数：
            </view>
        </bottomDrawer>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
import { parsePic } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    descriptionShow: boolean = false
    defaultAvatar:any=app.defaultAvatar
    rankQuery: any = {
        fetchFrom: 1,
        fetchSize: 30
    }
    isFetchEnd: any = true
    rankList: any = []
    actProgress: any = [
        { name: '拼团新系列', description: '获取活动积分', zhTime: '10.20 12:00' },
        { name: '冻结积分', description: '结算最终积分', zhTime: '10.22 12:00' },
        { name: '名单核算', description: '公示中奖名单', zhTime: '10.25 12:00' },
        { name: '幸运抽奖', description: '直播抽取奖励', zhTime: '10.30 12:00' }
    ]
    myRank: any = {}
    onLoad(query: any) {
        app.platform.hasLoginToken(() => {
            this.reqMyRank()
            this.reqAllRank()
            this.reqRewardList()
        })
    }
    onPullDownRefresh() {
        this.rankQuery.fetchFrom = 1
        this.reqAllRank(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.rankQuery.fetchFrom += this.rankQuery.fetchSize
        this.reqAllRank()
    }
    prviewImages(picString: string) {
        if (!picString) return
        const picArr: any = picString.split(',').map(item => parsePic(decodeURIComponent(item)))
        uni.previewImage({
            current: 0,
            urls: picArr
        })
    }
    onClickKef() {
        let params = {
            agentExten: ''
        }
        app.platform.heliService(params)
    }
    onClickGoBuy() {
        uni.navigateTo({
            url: '/pages/goods/goods_find_list?classType=100'
        })
    }
    reqRewardList() {
        app.http.Get('dataApi', {}, (res: any) => {

        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi', this.rankQuery, (res: any) => {
            this.isFetchEnd = res.isFetchEnd
            const dataList = res.list || []
            this.rankList = this.rankQuery.fetchFrom == 1 ? dataList : [...this.rankList, ...dataList]
            cb && cb()
        })
    }
    //我的rank
    reqMyRank() {
        app.http.Get('dataApi/selectRank/home', {}, (res: any) => {
            this.myRank = res.data || {}
        })
    }


}
</script>

<style lang="scss">
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
}

.rankContainer {
    width: 100%;
}

.rewardContainer {
    display: flex;
    box-sizing: border-box;
}

.actProgressContainer {
    display: flex;
}

.rankTr {
    display: flex;
    align-items: center;

    .rankNum {
        background-size: 100% 100%;
    }

    .rank1 {
        background-image: url("");
    }

    .rank2 {
        background-image: url("");
    }

    .rank3 {
        background-image: url("");
    }
}

.rankTd {
    display: flex;
    align-items: center;

}

.bottomContainer {
    width: 750rpx;
    background-color: #fff;
    position: fixed;
    height: calc(100rpx + constant(safe-area-inset-bottom));
    height: calc(100rpx + env(safe-area-inset-bottom));
    bottom: 0;
    left: 0;

    .buttonItem {
        height: 100rpx;
    }
}

.alc {
    display: flex;
    align-items: center;
}
</style>
