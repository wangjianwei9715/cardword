<template>
    <view class="content">
        <view class="pageTopContainer">
            <view class="status"
                :style="{ paddingTop: app.statusBarHeight + 'px', backgroundColor: `rgba(255,255,255,${scrollTopPercent})` }">
            </view>
            <view class="pageTop" ref="pageTop" id="pageTop"
                :style="{ backgroundColor: `rgba(255,255,255,${scrollTopPercent})` }">
                <image class="back" :class="{ filterBlack: scrollTopPercent > 0.6 }"
                    src="../../../static/act/rankSelect/back.png" @click="app.platform.pageBack()" />
                <view class="pageTitle" :style="{ opacity: scrollTopPercent }">SELECT登顶计划</view>
                <view style="display: flex;align-items: center;">
                    <image class="share" :class="{ filterBlack: scrollTopPercent > 0.6 }"
                        src="../../../static/act/rankSelect/share.png" @click="operationShow = true" />
                    <image class="kefu" :class="{ filterBlack: scrollTopPercent > 0.6 }"
                        src="../../../static/act/rankSelect/kefu.png" @click="onClickKef" />
                </view>
            </view>
        </view>
        <!-- <view class="topStatus" style="width:750rpx;background-color: #060405;"
            :style="{ height: app.statusBarHeight + 'px' }"></view> -->
        <view class="rankBanner">
            <image src='../../../static/act/rankSelect/rankBanner.jpg' />
            <view class="hdsm flexCenter" @click="pageJump('/pages/act/rankSelect/description')">
                活动<br />
                说明
            </view>
        </view>
        <view class="rewardContainer" style="position: relative;bottom: 30rpx;">
            <view class="reward_font">
                奖励<br />
                预览
            </view>
            <view class="reward_line"></view>
            <view class="rollStaticContent" id='rollStaticContent' v-if="awardShow">
                <!-- rollAnim -->
                <view class="rollContent" id='rollContent' :animation="animationData">
                    <view class="rollItem" v-for="(item, index) in awardList" :key="index + 'rollOne'">
                        <image class="rollReward" :src="$parsePic(decodeURIComponent(item.pic_url))" />
                        <view class="rewardLevel flexCenter">
                            {{ (item.start_rank == item.end_rank) ? `第${item.start_rank}名` :
                                    `第${item.start_rank}-${item.end_rank}名`
                            }}
                        </view>
                    </view>
                    <view class="rollItem" v-for="(item, index) in awardList" :key="index + 'rollTwo'"
                        v-if="awardList.length >= 7">
                        <image class="rollReward" :src="$parsePic(decodeURIComponent(item.pic_url))" />
                        <view class="rewardLevel flexCenter">
                            {{ (item.start_rank == item.end_rank) ? `第${item.start_rank}名` :
                                    `第${item.start_rank}-${item.end_rank}名`
                            }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="luckContainer" style="position: relative;bottom: 30rpx;">
            <view class="luck_font">前500名参与幸运大抽奖！</view>
            <view class="luck_look flexCenter" @click="pageJump('/pages/act/rankSelect/draw')">查看</view>
        </view>
        <view class="actProgressContainer" style="position: relative;bottom: 30rpx;">
            <view class="progress_item" :class="{ progress_itemHasLine: index != 3 }"
                v-for="(item, index) in actProgress" :key="index">
                <image :src="`/static/act/rankSelect/${checkImage(item, index)}.png`" />
                <view class="progress_title positionCenter">{{ item.name }}</view>
                <view class="progress_time positionCenter">
                    {{ isNumber(item.timeStamp) ? dateFormatMSHMS(item.timeStamp, '.') :
                            `${dateFormatMS(item.timeStamp[0], '.')}~${dateFormatMS(item.timeStamp[1], '.')}`
                    }}
                </view>
            </view>
        </view>
        <view class="rankContainer" style="position: relative;bottom: 30rpx;">
            <view class="rank_top">
                <view class="rank_title">21-22 SELECT积分榜</view>
                <view class="rank_pointText" @click="pageJump('/pages/act/rankSelect/pointsDetails')">查看积分明细</view>
            </view>
            <view class="rank_line"></view>
            <view class="rank_tr rank_tr_myRank">
                <view class="leftCorner flexCenter">我的成绩</view>
                <muqian-lazyLoad class="rankAvatar" borderRadius="50%"
                    :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar" />
                <view class="rankMyInfo" style="width: 160rpx;">
                    <view class="myInfo line1" style="margin-bottom:12rpx;">{{ myRank.userName || "获取中" }}</view>
                    <view class="myInfo">{{ myRank.isPass ? `第${myRank.rank}名` : "未入榜" }}</view>
                </view>
                <view class="rankPoint">
                    <view class="get">已获取：{{ myRank.get_score != undefined ? myRank.get_score : '获取中' }}</view>
                    <view class="freeze">冻结中：{{ myRank.lock_score != undefined ? myRank.lock_score : '获取中' }}</view>
                </view>
                <muqian-lazyLoad v-if="myRank.isPass" class="rankReward" borderRadius="3rpx"
                    :src="$parsePic(decodeURIComponent(myRank.awardPic))" />

                <view class="rankMyInfo" v-else>
                    <view class="myInfo" style="margin-bottom:12rpx;font-size: 23rpx;">距离入榜还需</view>
                    <view class="myInfo" style="font-size: 23rpx;">
                        {{ myRank.passScore != undefined ? myRank.passScore : '获取中' }}</view>
                </view>
            </view>
            <view class="rank_header">
                <view class="rank_header_item" style="margin-right:81rpx">排行</view>
                <view class="rank_header_item" style="margin-right:122rpx">用户名</view>
                <view class="rank_header_item flex1 hasQuestion" @click="reqPointConfig">
                    积分
                    <image src="../../../static/act/rankSelect/wh.png" />
                </view>
                <view class="rank_header_item">奖励</view>
            </view>

            <view class="rank_tr" :class="{ rank_my: item.isMy }" v-for="(item, index) in rankList">
                <view class="rankTd flexCenter rankNum" :class="[index <= 2 ? `rank${index + 1}` : '']">{{ index > 2 ?
                        (index + 1) : ""
                }}
                </view>
                <muqian-lazyLoad class="rankAvatar" borderRadius="50%"
                    :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : (item.userName == '虚位以待' ? '/static/goods/v2/waitAvatar.png' : defaultAvatar)" />
                <view class="rankName line2">{{ item.userName }}</view>
                <view class="rankPoint">
                    <view class="get">已获取：{{ item.get_score }}</view>
                    <view class="freeze">冻结中：{{ item.lock_score }}</view>
                </view>
                <muqian-lazyLoad class="rankReward" borderRadius="3rpx" @click="prviewImages(item.awardPic_url)"
                    :src="$parsePic(decodeURIComponent(item.awardPic_url))" />
            </view>
            <view style="opacity:0;height:36rpx"></view>
        </view>
        <view class="safeArea"></view>
        <view class="bottomContainer">
            <view class="buttonItem flexCenter" @click="onClickGoBuy">
                <image src="../../../static/act/rankSelect/add.png" />
                <view class="button flexCenter">立即上车SELECT</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <bottomDrawer :showDrawer.sync="descriptionShow" :needSafeArea="true" padding="24rpx 20rpx 120rpx 20rpx"
            :height="790" heightType="rpx" title="积分说明">
            <view class="descriptionContainer">
                <view class="des_title">
                    一.如何获取积分
                </view>
                <view class="des_content">
                    活动期间，参与卡世界21-22select系列拼团，根据不同拼团形式、卡种倍数、球员倍数、球队倍数结算发放给用户 <br />
                    【拼团期间将会冻结此订单的积分，拼团成功后发放至用户，拼团失败则会扣除对应订单冻结的积分】
                </view>
                <view class="des_title">
                    二.卡密倍数
                </view>
                <view class="des_content red">
                    卡种基础分：{{ pointConfig.cardSetBasicsScore || '获取中' }}<br />
                    球员基础分：{{ pointConfig.playerBasicsScore || '获取中' }}<br />
                    球队基础分：{{ pointConfig.teamBasicsScore || '获取中' }}<br />
                </view>
                <view class="des_title">
                </view>
                <view class="des_content">
                    2.倍数说明<br />
                    关键字倍数
                </view>
                <view class="des_content red"
                    v-if="pointConfig.cardSet_multiple && pointConfig.cardSet_multiple.length">
                    <view v-for="(item, index) in pointConfig.cardSet_multiple">
                        {{ item.multiple }}倍{{ item.describe ? `(${item.describe})` : '' }}：{{ item.keyword.join('、') }}
                    </view>
                </view>
                <view class="des_title">
                </view>
                <view class="des_content">球员倍数</view>
                <view class="des_content red" v-if="pointConfig.player_multiple && pointConfig.player_multiple.length">
                    <view v-for="(item, index) in pointConfig.player_multiple">
                        {{ item.multiple }}倍{{ item.describe ? `(${item.describe})` : '' }}：{{ item.keyword.join('、') }}
                    </view>
                </view>
                <view class="des_title">
                </view>
                <view class="des_content">球队倍数</view>
                <view class="des_content red" v-if="pointConfig.team_multiple && pointConfig.team_multiple.length">
                    <view v-for="(item, index) in pointConfig.team_multiple">
                        {{ item.multiple }}倍{{ item.describe ? `(${item.describe})` : '' }}：{{ item.keyword.join('、') }}
                    </view>
                </view>
            </view>
        </bottomDrawer>
        <share :operationShow.sync='operationShow' :shareData="shareData" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
import { parsePic, dateFormatMSHMS, dateFormatMS } from '@/tools/util'

@Component({})
export default class ClassName extends BaseNode {
    operationShow: boolean = false
    descriptionShow: boolean = false
    defaultAvatar: any = app.defaultAvatar
    dateFormatMS = dateFormatMS
    dateFormatMSHMS = dateFormatMSHMS
    rankQuery: any = {
        fetchFrom: 1,
        fetchSize: 30
    }
    awardList: any = []
    awardShow: boolean = false
    duration: any = 60 * 1000
    app = app
    isFetchEnd: any = true
    rankList: any = []
    actProgress: any = [
        { name: '获取积分', description: '获取积分', timeStamp: [1666627200, 1667923199], sIcon: 'sBuy' },
        { name: '积分解冻期', description: '积分解冻期', timeStamp: [1667923200, 1668787199], icon: 'lock', sIcon: 'sLock' },
        { name: '榜单结算', description: '榜单结算', timeStamp: 1668787200, icon: 'order', sIcon: 'sOrder' },
        { name: '幸运大抽奖', description: '幸运大抽奖', timeStamp: 1669014000, icon: 'gift', sIcon: 'sGift' }
    ]
    myRank: any = {}
    scrollTop: number = 0
    MAX_HEIGHT: number = 0
    animation: any = null
    animationData: any = {}
    shareData: any = {
        shareUrl: `share/${app.localTest ? "testH5" : "h5"}/#/pages/act/rankSelect`,
        title: "SELECT登顶计划",
        summary: "SELECT登顶计划",
        thumb: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.10.21/seller/info/1666340825471m0k5sxd2ln.jpg"
    };
    pointConfig: any = {

    }
    width: number = 0
    startAnimationTimer: any = null
    nowTimeStamp: number = Math.round(+new Date() / 1000)
    private get scrollTopPercent() {
        return this.scrollTop / (this.MAX_HEIGHT * 2)
    }
    @Watch('awardShow')
    onShowChanged(val: any, oldVal: any) {
        console.log('当前val:', val);
        if (!val) return
        if (this.awardList.length && this.awardList.length >= 7) {
            this.$nextTick(() => {
                this.getRollWidth().then((width: any) => {
                    this.width = width
                    this.setDurationAnimation(this.duration)
                    this.animation.translateX(0 - (width)).step()
                    this.animationData = this.animation.export()
                    this.startAnimation()
                })
            })
        }
    }
    onShow() {
    }
    onLoad(query: any) {
        this.onEventUI("resetAn", (res) => {
            this.resetAn()
        });
        app.platform.hasLoginToken(() => {
            this.reqMyRank()
            this.reqAllRank()
            this.resetAn()
        })

        this.$nextTick(() => {
            const query: any = uni.createSelectorQuery().in(this)
            query
                .select('#pageTop')
                .boundingClientRect((data: any) => {
                    this.MAX_HEIGHT = data.height
                })
                .exec();

        })
        setInterval(() => {
            this.nowTimeStamp = Math.round(+new Date() / 1000)
        }, 1000)
    }
    onPageScroll(data: any) {
        this.scrollTop = data.scrollTop
    }
    resetAn() {
        this.awardList = []
        this.awardShow=false
        this.reqRewardList()
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
    getRollWidth() {
        return new Promise((resolve, reject) => {
            const query: any = uni.createSelectorQuery().in(this)
            let longWidth: any = 0
            let smallWidth: any = 0
            let timer: any = null
            setTimeout(() => {
                query.select("#rollContent").boundingClientRect((data: any) => {
                    console.log(data);

                    longWidth = data.width

                }).exec()
                query.select("#rollStaticContent").boundingClientRect((data: any) => {
                    console.log(data);

                    smallWidth = data.width
                }).exec()
                timer = setInterval(() => {
                    if (longWidth && smallWidth) {
                        clearInterval(timer)
                        resolve(longWidth - smallWidth)
                    }
                }, 100)
            }, 200)
        })
    }
    startAnimation(isFirst?: any) {
        this.startAnimationTimer && clearInterval(this.startAnimationTimer)
        this.startAnimationTimer = setInterval(() => {
            console.log(3444444);

            this.setZeroDurationAnimation()
            this.animation.translateX(0).step()
            this.animationData = this.animation.export()
            setTimeout(() => {
                this.setDurationAnimation(this.duration)
                this.animation.translateX(0 - (this.width)).step()
                this.animationData = this.animation.export()
            }, 100)
        }, this.duration)
    }
    setZeroDurationAnimation() {
        this.animation = uni.createAnimation({
            duration: 0,
            timingFunction: "linear",
            delay: 0
        })
    }
    setDurationAnimation(duration: number) {
        this.animation = uni.createAnimation({
            duration: this.duration,
            timingFunction: "linear",
            delay: 500
        })
    }
    prviewImages(picString: string) {
        if (!picString) return
        const picArr: any = picString.split(',').map(item => parsePic(decodeURIComponent(item)))
        uni.previewImage({
            current: 0,
            urls: picArr
        })
    }
    pageJump(url: string) {
        uni.navigateTo({
            url
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
            // url: '/pages/goods/goods_find_list?classType=100'
            // url: '/pages/act/rankSelect/goodsList'
            url: '/pages/goods/goods_seriesDetail?seriesId=3'
        })
    }
    isNumber(data: any) {
        return typeof data === 'number'
    }
    checkImage(item: any, index: number) {
        if (!item.icon) return item.sIcon
        const ItemStamp = this.isNumber(item.timeStamp) ? item.timeStamp : item.timeStamp[0]
        const TIME_DIFF: any = this.nowTimeStamp - ItemStamp
        return TIME_DIFF >= 0 ? item.sIcon : item.icon
    }
    reqRewardList() {
        this.awardShow = false
        app.http.Get('dataApi/selectRank/award/list', {isLucky:0,activityTp:1}, (res: any) => {
            this.awardList = res.list || []
            this.awardShow = true


        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', this.rankQuery, (res: any) => {
            this.isFetchEnd = res.isFetchEnd
            const dataList = res.list || []
            this.rankList = this.rankQuery.fetchFrom == 1 ? dataList : [...this.rankList, ...dataList]
            cb && cb()
        })
    }
    reqPointConfig() {
        app.http.Get(`dataApi/selectRank/multiple/config`, {activityTp:1}, (res: any) => {

            Object.keys(res.data).map((key: any) => {
                console.log(key);

                //@ts-ignore
                if (typeof res.data[key] == 'null') {
                    res.data[key] = []
                }
            })
            console.log(res.data);
            this.descriptionShow = true
            this.pointConfig = res.data
        })
    }
    //我的rank
    reqMyRank() {
        app.http.Get('dataApi/selectRank/my/data', {}, (res: any) => {
            this.myRank = res.data || {}
        })
    }


}
</script>

<style lang="scss">
page {
    background: #421d17;
    width: 750rpx;
    overflow-x: hidden;
}

.rollStaticContent {
    // width: 750rpx;
    flex: 1;
    height: 101rpx;
    // height: 208rpx;
    // background-size: 100% 100%;
    overflow: hidden;
    position: relative;

    @keyframes rowup {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        100% {
            -webkit-transform: translate3d(-5340px, 0, 0);
            transform: translate3d(-5340px, 0, 0);
        }
    }



    .rollContent {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        height: inherit;
        margin: auto;

        .rollItem {
            flex-wrap: nowrap;
            width: 101rpx;
            height: 101rpx;
            // background: #FFFFFF;
            border-radius: 3rpx;
            position: relative;
            overflow: hidden;
            margin-right: 9rpx;

            .rollReward {
                width: 101rpx;
                height: 101rpx;
                position: absolute;
                top: 0;
                // bottom: 0;
                z-index: -1;
                // background-color: red;
                border-radius: 3rpx;
                display: block;
            }

            .rewardLevel {
                z-index: 33;
                width: 101rpx;
                height: 24rpx;
                background: rgba(0, 0, 0, .38);
                border-radius: 0rpx 0rpx 3rpx 3rpx;
                position: absolute;
                bottom: 0;
                left: 0;
                font-size: 19rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                white-space: nowrap;
            }
        }
    }

    .rollAnim {
        animation: 120s rowup linear infinite normal;
        -webkit-animation: 120s rowup linear infinite normal;
    }


}

.pageTopContainer {
    position: fixed;
    top: 0;
    z-index: 200;

    .pageTop {
        background-color: rgba(255, 255, 255, 0);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 36rpx;
        justify-content: space-between;
        width: 750rpx;
        height: 88rpx;
        /* transition: all 0.2s linear; */
    }

    .btn-back {

        background: rgba(0, 0, 0, 0);
        font-family: uniicons;
        font-size: 46rpx;
        font-weight: normal;
        font-style: normal;
        color: #3C3C3C;
    }

    .pageTitle {
        font-size: 32rpx;
        color: #3C3C3C;
        position: absolute;
        font-family: HYQiHei;
        font-weight: bold;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        pointer-events: none;
    }

    .kefu {
        width: 36rpx;
        height: 34rpx;
    }

    .share {
        width: 34rpx;
        height: 34rpx;
        margin-right: 39rpx;
    }

    .back {
        width: 19rpx;
        height: 35rpx;
    }

    .filterBlack {
        -webkit-filter: invert(1) hue-rotate(270deg);
        filter: invert(1) hue-rotate(270deg);
    }

    .rightIcon {
        width: 40rpx;
        height: 40rpx;
        opacity: 0;
    }
}

.rankBanner {
    width: 750rpx;
    height: 453rpx;
    background-size: 100% 100%;
    // background-image: url('../../../static/act/rankSelect/rankBanner.jpg');
    position: relative;

    image {
        width: inherit;
        height: inherit;
        position: absolute;
    }

    .hdsm {
        width: 73rpx;
        height: 81rpx;
        position: absolute;
        right: 5rpx;
        top: 163rpx;
        background-size: 100% 100%;
        background-image: url('../../../static/act/rankSelect/hdsm.png');
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #FFFEFE;
        line-height: 24rpx;
        text-shadow: 0rpx 8rpx 13rpx #56160C;
    }

    // 
}

.bannerFont {
    background-size: 100% 100%;
    background-image: url('../../../static/act/rankSelect/rankFont.png');
    width: 500rpx;
    height: 107rpx;
    margin-top: 237rpx;
}

.descriptionContainer {

    .des_title {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 10rpx;
    }

    .des_content {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 36rpx;
        letter-spacing: 2rpx;

        view {
            font-size: inherit;
        }
    }

    .red {
        color: #FA1545;
    }
}

.rankContainer {
    width: 710rpx;
    background: #6E1E11;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 0 30rpx;

    .rank_top {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding-top: 37rpx;
    }

    .rank_title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFF6D6;
        letter-spacing: 4rpx;
    }

    .rank_pointText {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #B6B5B5;
        text-decoration: underline;
        margin-left: 23rpx;
    }

    .rank_line {
        width: 650rpx;
        height: 1rpx;
        background: #989797;
        margin: 25rpx 0;
    }

    .rank_header {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        padding: 0 44rpx 0 28rpx;
        margin-bottom: 18rpx;

        .rank_header_item {
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #FEFFFF;
            // text-align: center;
        }

        .hasQuestion {
            display: flex;
            align-items: center;

            image {
                width: 28rpx;
                height: 28rpx;
                margin-left: 9rpx;
            }
        }
    }
}

.flex1 {
    flex: 1;
}

.rewardContainer {
    width: 710rpx;
    height: 133rpx;
    background: #9B8885;
    border-radius: 3rpx;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 32rpx;

    .reward_font {
        font-size: 54rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 49rpx;
        text-shadow: 0rpx 2rpx 1rpx rgba(50, 21, 16, 0.78);
    }

    .reward_line {
        width: 1rpx;
        height: 88rpx;
        background: #E2E2E2;
        margin: 0 24rpx;
    }
}

.luckContainer {
    background-size: 100% 100%;
    width: 750rpx;
    height: 75rpx;
    margin-top: 20rpx;
    background-image: url('../../../static/act/rankSelect/luckPic.png');
    display: flex;
    box-sizing: border-box;
    padding: 0 50rpx 0 106rpx;
    justify-content: space-between;
    align-items: center;

    .luck_font {
        font-size: 37rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
    }

    .luck_look {
        width: 108rpx;
        height: 42rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 4rpx 6rpx 0rpx #000000;
        border-radius: 3rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #421D17;
    }
}

.actProgressContainer {
    display: flex;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 70rpx;
    justify-content: space-between;
    margin-top: 36rpx;
    margin-bottom: 100rpx;

    .progress_item {
        width: 74rpx;
        height: 74rpx;
        position: relative;
        white-space: nowrap;

        image {
            width: inherit;
            height: inherit;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .progress_itemHasLine::after {
        content: "";
        display: block;
        width: 113rpx;
        height: 7rpx;
        background: #92736F;
        border-radius: 3rpx;
        position: absolute;
        left: 74rpx;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .progress_title {

        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        top: 86rpx;
    }

    .progress_time {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        top: 124rpx;
    }

    .positionCenter {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
}

.rank_tr {
    display: flex;
    align-items: center;
    width: 650rpx;
    height: 160rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx #56160C;
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0 20rpx;
    align-items: center;
    margin-bottom: 13rpx;

    .rankNum {
        width: 58rpx;
        height: 53rpx;
        background-size: 100% 100%;
        margin-right: 40rpx;
        font-size: 39rpx;
        font-family: Impact;
        font-weight: 400;
        color: #333333;
    }

    .rank1 {
        background-image: url("../../../static/act/rankSelect/rank1.png");
    }

    .rank2 {
        background-image: url("../../../static/act/rankSelect/rank2.png");
    }

    .rank3 {
        background-image: url("../../../static/act/rankSelect/rank3.png");
    }

    .rankAvatar {
        width: 50rpx;
        height: 50rpx;
        // background: #421D17;
        border-radius: 50%;
        margin-right: 16rpx;
    }

    .rankName {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        width: 140rpx;
    }

    .line2 {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden; //溢出内容隐藏
        text-overflow: ellipsis; //文本溢出部分用省略号表示
        display: -webkit-box; //特别显示模式
        -webkit-line-clamp: 2; //行数
        line-clamp: 2;
        -webkit-box-orient: vertical; //盒子中内容竖直排列
    }

    .rankPoint {
        display: flex;
        flex-direction: column;
        flex: 1;
        // background-color: red;
        text-align: center;

        .get {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #6E1E11;
            margin-bottom: 10rpx;
        }

        .freeze {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #A0BED8;
        }
    }

    .rankReward {
        width: 105rpx;
        height: 105rpx;
        // background: #421D17;
        border-radius: 3rpx;
    }
}

.rank_my {
    outline: 4rpx solid #FA1545;
}

.rank_tr_myRank {
    margin-bottom: 46rpx;
    height: 160rpx;
    box-sizing: border-box;
    padding: 31rpx 17rpx 24rpx 20rpx;
    align-items: center;

    .leftCorner {
        width: 112rpx;
        height: 32rpx;
        background: linear-gradient(106deg, rgba(172, 105, 40, 0.63), rgba(248, 238, 167, 0.63), rgba(138, 84, 7, 0.63));
        border-radius: 3rpx 0rpx 3rpx 0rpx;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #421D17;
    }

    .rankAvatar {
        width: 89rpx;
        height: 89rpx;
        // background: #421D17;
        border-radius: 50%;
        margin-right: 26rpx;
    }

    .rankMyInfo {
        display: flex;
        flex-direction: column;
        margin-right: 8rpx;
        white-space: nowrap;

        .myInfo {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;

        }

        .line1 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.rankTd {
    display: flex;
    align-items: center;

}

.safeArea {
    opacity: 0;
    height: 140rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

.bottomContainer {
    width: 750rpx;
    background-color: #fa1545;
    position: fixed;
    height: 120rpx;
    // height: calc(120rpx + constant(safe-area-inset-bottom));
    // height: calc(120rpx + env(safe-area-inset-bottom));
    bottom: 0;
    left: 0;

    .buttonItem {
        height: 120rpx;

        image {
            width: 42rpx;
            height: 42rpx;
            margin-right: 17rpx;
        }
    }

    .button {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: 4rpx;
    }
}

.alc {
    display: flex;
    align-items: center;
}
</style>
