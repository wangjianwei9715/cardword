<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-01-10 15:11:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-14 17:23:51
 * @FilePath: \jichao_app_2\src\pages\act\imm\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav @getNavHeight="getNavHeight" ref='transitionNav' :needIconShadow="false" title="冲排名 赢豪礼">
            <template slot="slotRight">
                <navigator url="/pages/act/imm/rule" hover-class="none" class="sp-tips-index sp-tips-index2">
                    <view class="rightTitle">规则说明</view>
                </navigator>

            </template>
        </transitionNav>
        <view class="topBannerContainer">
            <image class="topBanner" src="@/static/act/imm/topBanner.png" />
            <view class="topOne"></view>
            <view class="topTwo"></view>
            <view class="pd"></view>
            <view class="goBuy flexCenter" @click="onClickGoBuy">立即上车</view>
            <!-- <u-button text="立即上车"
                style="position:absolute ;bottom:0;width:200rpx;left:0;right:0;margin:auto;"></u-button> -->
        </view>
        <view class="rankContainer">
            <view class="rank_tag">
                <view class="tag_item"
                    :class="{ tag_left: index == 0, tag_right: index == 1, tag_left_noselect: index == 0 && rankTag.index !== index, tag_right_noselect: index == 1 && rankTag.index !== index }"
                    v-for="(item, index) in rankTag.list" @click="onClickTagChange(item, index)">
                    <view class="tag_title">{{ item.label }}</view>
                    <view class="tag_time">{{ isNumber(item.timeStamp) ?dateFormatMSHMS(item.timeStamp, '.') :
                    `${dateFormatMS(item.timeStamp[0], '.')}~${dateFormatMS(item.timeStamp[1], '.')}`
                    }} {{ parseTips(item.timeTips) || "" }}</view>
                </view>
            </view>
            <view class="rank_tips" :class="{ jb: rankTag.index == 1 }">
                <view class="tips">{{ rankTag.list[rankTag.index].tips }}</view>
                <view class="lookLive flexCenter" v-if="rankTag.index == 1" @click="getLiveData">观看直播</view>
            </view>
            <u-skeleton rows="10" style="width: 650rpx" :rowsWidth="rowsWidth" :rowsHeight="rowsHeight" :title="false"
                :loading="!requestSuccess"></u-skeleton>
            <template v-if="rankTag.index == 0">
                <view class="rank_tr" :class="{ rank_my: item.isMy }" v-for="(item, index) in rankList">
                    <view class="rank_num" :class="[index <= 2 ? `rank${index + 1}` : '']">{{ index > 2 ?
                        (index + 1) : ""
                    }}
                    </view>
                    <muqian-lazyLoad class="rank_avatar" borderRadius="50%"
                        :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : (item.userName == '虚位以待' ? '/static/goods/v2/waitAvatar.png' : defaultAvatar)" />
                    <view class="rank_pointInfo">
                        <view class="rank_userName">{{ item.userName }}</view>
                        <view class="rank_point" v-if="item.userName !== '虚位以待'">
                            {{`积分${item.get_score || 0}(冻结${item.lock_score || 0})`}}
                        </view>
                    </view>
                    <muqian-lazyLoad class="rank_reward" borderRadius="3rpx" @click="previewImage(item)"
                        :src="$parsePic(decodeURIComponent(item.awardPic_url))" />
                </view>
            </template>
            <template v-if="rankTag.index == 1">
                <view class="draw_tr" v-for="(item, index) in awardList" :key="index">
                    <view class="draw_infoContainer border">
                        <muqian-lazyLoad class="draw_img" borderRadius="3rpx" @click="previewImage(item)"
                            :src="$parsePic(decodeURIComponent(item.pic))" />
                        <view class="draw_infoRight">
                            <view class="draw_name">{{ item.name }}</view>
                            <view class="draw_condition">
                                <view style="margin-right:30rpx">抽奖数量：{{ item.num || 0 }}</view>
                                <view>参与条件：{{ (item.start_rank == item.end_rank) ? `第${item.start_rank}名` :
                                    `第${item.start_rank}-${item.end_rank}名`
                                }}</view>
                            </view>
                        </view>
                    </view>
                    <view class="draw_onPrize">
                        <view class="prize_item gray">中奖用户 :</view>
                        <template v-if="item.luckyUsers && item.luckyUsers.length">
                            <view class="prize_item" v-for="(prizeItem, prizeIndex) in item.luckyUsers">
                                <muqian-lazyLoad borderRadius="50%" class="avatar"
                                    :src="prizeItem.avatar ? $parsePic(decodeURIComponent(prizeItem.avatar)) : defaultAvatar" />
                                <view class="name">{{ prizeItem.userName }}</view>
                            </view>
                        </template>
                        <template v-else>
                            <view class="prize_item">
                                <view class="name">暂未开奖</view>
                            </view>

                        </template>
                    </view>
                </view>
            </template>
        </view>
        <view class="bottomSafeArea" style="height:140rpx"></view>
        <view class="bottomFixedPay">
            <view class="payContainer">
                <view class="rank_num">{{ myRank.rank || '500+' }}</view>
                <muqian-lazyLoad borderRadius="50%" class="rank_avatar"
                    :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar"></muqian-lazyLoad>
                <view class="rank_pointInfo">
                    <view class="rank_userName">{{ myRank.userName || "获取中" }}</view>
                    <view class="rank_point">{{`积分${myRank.get_score || 0}(冻结${myRank.lock_score || 0})`}}</view>
                </view>
                <template v-if="rankTag.index == 0">
                    <muqian-lazyLoad class="rank_reward" borderRadius="3rpx" v-if="myRank.isPass"
                        :src="$parsePic(decodeURIComponent(myRank.awardPic))" />
                    <view class="rank_normal" v-if="!myRank.isPass">距离入榜还需<br>{{ myRank.passScore || '获取中' }}积分</view>
                </template>
                <template v-if="rankTag.index == 1">
                    <view class="noDraw" :class="{ canDraw: myRank.isPass }">
                        {{ myRank.isPass ? `当前排名\n可参与抽奖` : `当前排名\n不可参与抽奖` }}</view>
                </template>
            </view>
            <!-- <view class="bottomSafeArea"></view> -->
        </view>
        <previewImage ref="previewImage" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic, dateFormatMSHMS, dateFormatMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    rowsHeight: any = new Array(10).fill('135rpx');
    rowsWidth: any = new Array(10).fill('650rpx');
    requestSuccess: boolean = false;
    rankQuery: any = {
        fetchFrom: 1,
        fetchSize: 100,
        activityTp: 4
    }
    parsePic = parsePic
    rankList: any = []
    isFetchEnd: boolean = false
    navHeight: number = 0
    dateFormatMSHMS = dateFormatMSHMS
    dateFormatMS = dateFormatMS
    defaultAvatar: any = app.defaultAvatar
    awardList: any = []
    myRank: any = {}
    liveData: any = {}
    seriesId: any = 3
    roomId: any = null;
    nowTimeStamp: number = Math.round(+new Date() / 1000)
    rankTag: any = {
        index: 0,
        list: [
            { label: '积分榜单', timeStamp: [1673884800, 1675180799], tips: "参与任意拼团获取积分，21-22IMM积分翻倍", timeTips: '(进行中)' },
            { label: '幸运抽奖', timeStamp: 1676444400, tips: "前500名参与幸运大抽奖", timeTips: "" }
        ]
    }
    onLoad(query: any) {
        if (query.seriesId) this.seriesId = query.seriesId
        if (query.roomId) this.roomId = query.roomId
        app.platform.hasLoginToken(() => {
            this.reqAllRank()
            this.reqMyRank()
        })
    }
    onShow() {
        this.nowTimeStamp = Math.round(+new Date() / 1000);
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onPullDownRefresh() {
        this.rankQuery.fetchFrom = 1
        this.reqAllRank(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        // if (this.isFetchEnd) return
        // this.rankQuery.fetchFrom += this.rankQuery.fetchSize
        // this.reqAllRank()
    }
    getNavHeight(event: any) {
        this.navHeight = event
    }
    isNumber(data: any) {
        return typeof data === 'number'
    }
    parseTips(tips: string) {
        if (!tips) return ""
        const ActivityPeriod: any = [1673884800, 1675180799]//活动期
        const ThawPeriod: any = [1675180800, 1676044799]//解冻期
        const DrawPeriod: number = 1676358000//抽奖日期
        if (this.nowTimeStamp < ActivityPeriod[0]) return "(暂未开始)";
        if (this.nowTimeStamp >= ActivityPeriod[0] && this.nowTimeStamp <= ActivityPeriod[1]) return "(进行中)";
        if (this.nowTimeStamp >= ThawPeriod[0] && this.nowTimeStamp <= ThawPeriod[1]) return "(榜单解冻期)";
        if (this.nowTimeStamp > ThawPeriod[1] && this.nowTimeStamp < DrawPeriod) return "(已定榜)";
        if (this.nowTimeStamp >= DrawPeriod) return "(已定榜)";
    }
    goLiveRoom() {
        if (!this.liveData.roomId) {
            uni.showToast({
                title: '直播暂未开始',
                icon: 'none'
            })
            return
        }
        if (this.liveData.roomId && this.liveData.third == 1001) {
            app.platform.goZgLive({
                roomID: this.liveData.roomId,
                isAnchor: false,
                state: this.liveData.state,
                playCode: this.liveData.playCode,
                goodCode: this.liveData.goodCode,
                alias: this.liveData.merchantAlias,
                type: 1
            })
            return
        }
        app.platform.goWeChatLive({ playCode: this.liveData.playCode, goodCode: "" })
    }
    getLiveData() {
        if (!this.roomId) {
            app.http.Get('dataApi/home', {}, (res: any) => {
                let addList: any = res.addList || []
                if (addList.length) {
                    const fineItem: any = addList.find((item: any) => {
                        return decodeURIComponent(item.target.page).indexOf('act/imm/index') != -1
                    })
                    if (fineItem) {
                        const page: string = fineItem.target.page;
                        let urlStr = page.split('?')[1]
                        let obj: any = {};
                        let paramsArr = urlStr.split('&')
                        for (let i = 0, len = paramsArr.length; i < len; i++) {
                            // 再通过 = 将每一个参数分割为 key:value 的形式
                            let arr = paramsArr[i].split('=')
                            obj[arr[0]] = arr[1];
                        }
                        this.roomId = obj.roomId
                        if(obj.seriesId) this.seriesId=obj.seriesId
                    }
                }
                this.goLive()
            })

            return
        }
        this.goLive()
    }
    goLive() {
        if (!this.roomId) {
            uni.showToast({
                title: "暂未开启直播",
                icon: 'none'
            })
            return
        }
        app.platform.goZgLive({
            roomID: +this.roomId,
            isAnchor: false
        })
    }
    onClickGoBuy() {
        uni.navigateTo({
            url: `/pages/goods/goods_seriesDetail?seriesId=${this.seriesId}`
        })
    }
    onClickTagChange(item: any, index: number) {
        if (this.rankTag.index == index) return
        if (index == 0) this.reqAllRank()
        if (index == 1) this.reqRewardList()
        this.rankTag.index = index
    }
    previewImage(item: any) {
        //@ts-ignore
        this.$refs.previewImage.show({
            urls: [{ src: this.parsePic(decodeURIComponent(item.awardPic_url || item.pic)), title: item.awardName || item.name }]
        })
    }
    reqRewardList() {
        app.http.Get('dataApi/selectRank/lucky/award/list', { activityTp: 4 }, (res: any) => {
            this.requestSuccess = true
            this.awardList = res.list || []
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', this.rankQuery, (res: any) => {
            this.requestSuccess = true
            this.isFetchEnd = res.isFetchEnd
            const dataList = res.list || []
            this.rankList = this.rankQuery.fetchFrom == 1 ? dataList : [...this.rankList, ...dataList]
            cb && cb()
        })
    }
    //我的rank
    reqMyRank() {
        app.http.Get('dataApi/selectRank/my/data', { activityTp: 4 }, (res: any) => {
            this.myRank = res.data || {}
        })
    }

}
</script>

<style lang="scss">
page {
    background: #1b2d35;
    font-family: PingFang SC;
}

.rightTitle {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
}

.topBannerContainer {
    width: 750rpx;
    height: 500rpx;
    // background-image: url('@/static/act/imm/topBanner.png');
    background-size: 100% 100%;
    position: relative;

    .topBanner {
        width: 750rpx;
        height: 435rpx;
        position: absolute;
        top: 0;
    }

    .topOne {
        width: 377rpx;
        height: 100rpx;
        background-image: url('@/static/act/imm/topOne.png');
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: 140rpx;
    }

    .topTwo {
        width: 588rpx;
        height: 126rpx;
        background-image: url('@/static/act/imm/topTwo.png');
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: 253rpx;
    }
}

.pd {
    width: 750rpx;
    height: 152rpx;
    position: absolute;
    left: 0;
    bottom: 0;
    background-image: url('@/static/act/imm/dpd.png');
    background-size: 100% 100%;
}

.goBuy {
    width: 246rpx;
    height: 80rpx;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-image: url('@/static/act/imm/button.png');
    background-size: 100% 100%;
    font-size: 33rpx;
    font-weight: 600;
    color: #FEFEFE;
}

.bottomFixedPay {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    background-color: #F1075A;

    .payContainer {
        display: flex;
        box-sizing: border-box;
        width: inherit;
        height: 135rpx;
        align-items: center;
        padding: 0rpx 67rpx 0rpx 48rpx;
        justify-content: space-between;

        .rank_num {
            font-size: 39rpx;
            font-family: Impact;
            font-weight: 400;
            background-size: 100% 100%;
            color: #FFFFFF;
        }

        .rank_pointInfo {
            .rank_userName {
                color: #fff;
                font-size: 26rpx;
            }

            .rank_point {
                color: #fff;
                font-size: 26rpx;
            }
        }
    }
}

.rank_tr {
    display: flex;
    align-items: center;
    width: 650rpx;
    height: 135rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx #56160C;
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0rpx 17rpx 0rpx 20rpx;
    align-items: center;
    margin-bottom: 15rpx;
}

.rank_num {
    width: 60rpx;
    height: 54rpx;
    font-size: 39rpx;
    font-family: Impact;
    font-weight: 400;
    background-size: 100% 100%;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rank1 {
    background-image: url("@/static/act/imm/rank1.png");
}

.rank2 {
    background-image: url("@/static/act/imm/rank2.png");
}

.rank3 {
    background-image: url("@/static/act/imm/rank3.png");
}

.rank_avatar {
    width: 60rpx;
    height: 60rpx;
    margin-left: 32rpx;
    margin-right: 20rpx;
}

.rank_tips {
    width: inherit;
    box-sizing: border-box;
    padding: 0 30rpx;
    display: flex;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FEFEFE;
    margin-top: 28rpx;
    justify-content: center;
    margin-bottom: 22rpx;
    align-items: center;

    .tips {
        font-size: 23rpx;
    }
}

.jb {
    justify-content: space-between;
}

.lookLive {
    width: 125rpx;
    height: 44rpx;
    font-size: 23rpx;
    border: 2rpx solid #FFFFFF;
    border-radius: 21rpx;
}

.rankContainer {
    width: 710rpx;
    background: #44436A;
    border-radius: 18rpx 18rpx 3rpx 3rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10rpx;
    margin-top: 37rpx;
}

.rank_tag {
    display: flex;
    color: #fff;
    box-sizing: border-box;
    // margin: 20rpx 0;
    position: relative;
    height: 110rpx;
    width: inherit;

    .tag_item {
        width: 372rpx;
        height: 110rpx;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #FFF6D6;
        position: absolute;
        justify-content: center;
    }

    .tag_item_select {
        color: #F1075A;
    }

    .tag_title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: 600;
    }

    .tag_time {
        font-size: 21rpx;
        font-family: PingFang SC;
    }

    .tag_left {
        left: 0;
    }

    .tag_left_noselect {
        background-image: url("@/static/act/imm/leftSelect.png");
        color: #F1075A;
    }

    .tag_right_noselect {
        background-image: url("@/static/act/imm/rightSelect.png");
        color: #F1075A;
    }

    .tag_right {
        right: 0;
    }
}



.rank_pointInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    .rank_userName {
        color: #333333;
        font-size: 23rpx;
        font-weight: 600;
    }

    .rank_point {
        color: #949494;
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
    }
}

.rank_reward {
    width: 105rpx;
    height: 105rpx;
}

.rank_normal {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
}

.canDraw {
    color: #fa0a64;
}

.noDraw {
    white-space: pre-wrap;
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
}

.draw_tr {
    width: 650rpx;
    // height: 223rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx #44436A;
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 20rpx 20rpx 0rpx 23rpx;
    margin-bottom: 15rpx;

    .draw_infoContainer {
        display: flex;

        margin-bottom: 16rpx;

        .draw_img {
            width: 113rpx;
            height: 113rpx;
            margin-right: 36rpx;
        }
    }

    .border {
        border-bottom: 1rpx solid #E6E6E6;
        padding-bottom: 20rpx;
    }

    .draw_infoRight {
        flex: 1;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
    }

    .draw_name {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 20rpx;
    }

    .draw_condition {

        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        display: flex;
        align-items: center;

        view {
            font-size: 21rpx;
        }

        // justify-content: space-between;
    }

    .draw_onPrize {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10rpx;

        .prize_item {
            width: 25%;
            color: #333333;
            display: flex;
            align-items: center;
            margin-bottom: 6rpx;
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            margin-bottom: 18rpx;

            .avatar {
                width: 34rpx;
                height: 34rpx;
                margin-right: 20rpx;
            }

            .name {
                font-size: 21rpx;
            }
        }

        .gray {
            color: #949494;
        }
    }
}
</style>
