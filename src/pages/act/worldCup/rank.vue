<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:20:31
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-14 16:29:20
 * @FilePath: \card-world\src\pages\act\worldCup\rank.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="awardContainer">
            <view class="uni-flex jb alc">
                <view class="title">奖励预览</view>
                <navigator url="/pages/act/worldCup/award" hover-class="none">
                    <view class="allList alc">
                        <text>奖励列表</text>
                        <image class="rightDot" src="/static/act/worldCup/blueBack.png"></image>
                    </view>
                </navigator>

            </view>
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
        <view class="drawContainer">

        </view>
        <view class="rankContainer">
            <view class="actProgressContainer">
                <view class="progress_item" :class="{ progress_itemHasLine: index != 3 }"
                    v-for="(item, index) in actProgress" :key="index">
                    <image :src="`/static/act/worldCup/${checkImage(item, index)}.png`" />
                    <view class="progress_title positionCenter">{{ item.name }}</view>
                    <view class="progress_time positionCenter">
                        {{ isNumber(item.timeStamp) ? dateFormatMSHMS(item.timeStamp, '.') :
                                `${dateFormatMS(item.timeStamp[0], '.')}~${dateFormatMS(item.timeStamp[1], '.')}`
                        }}
                    </view>
                </view>
            </view>
            <view class="rank_tr rank_tr_myRank">
                <view class="leftCorner flexCenter">我的成绩</view>
                <muqian-lazyLoad class="rankAvatar" borderRadius="50%"
                    :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar" />
                <view class="rankMyInfo" style="width: 160rpx;">
                    <view class="myInfo line1" style="margin-bottom:12rpx;">{{ myRank.userName || "获取中" }}</view>
                    <!-- <view class="myInfo">{{ myRank.isPass ? `第${myRank.rank}名` : "未入榜" }}</view> -->
                    <view class="myInfo">{{ `第${myRank.rank}名` }}</view>
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
                <!-- @click="reqPointConfig" -->
                <view class="rank_header_item flex1 hasQuestion">
                    积分
                    <!-- <image src="../../../static/act/rankSelect/wh.png" /> -->
                </view>
                <view class="rank_header_item">奖励</view>
            </view>

            <view class="rank_tr" :class="{ rank_my: item.isMy }" v-for="(item, index) in rankList">
                <view class="rankTd flexCenter rankNum" :class="[index <= 2 ? `rank${index + 1}` : '']">{{ index + 1
                }}
                </view>
                <muqian-lazyLoad class="rankAvatar" borderRadius="50%"
                    :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : (item.userName == '虚位以待' ? '/static/goods/v2/waitAvatar.png' : defaultAvatar)" />
                <view class="rankName">{{ item.userName }}</view>
                <view class="rankPoint">
                    <view class="get">已获取：{{ item.get_score }}</view>
                    <view class="freeze">冻结中：{{ item.lock_score }}</view>
                </view>
                <view class="rankReward flexCenter" @click="prviewImages(item.awardPic_url)">{{ item.awardName }}</view>
                <!-- <muqian-lazyLoad class="rankReward" borderRadius="3rpx" @click="prviewImages(item.awardPic_url)"
                    :src="$parsePic(decodeURIComponent(item.awardPic_url))" /> -->
            </view>
            <view style="opacity:0;height:36rpx"></view>
        </view>
        <!-- <navigator url="/pages/act/worldCup/pointDetail" hover-class="none">
            <button>记录</button>
        </navigator>
        <navigator url="/pages/act/worldCup/award" hover-class="none">
            <button>奖励</button>
        </navigator>
        <navigator url="/pages/act/worldCup/description" hover-class="none">
            <button>规则</button>
        </navigator> -->

    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic, dateFormatMSHMS, dateFormatMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    defaultAvatar: any = app.defaultAvatar
    dateFormatMS = dateFormatMS
    dateFormatMSHMS = dateFormatMSHMS
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20
    }
    list: any = []
    myRank: any = {}
    totalPage: number = 0
    awardList: any = []
    rankList: any = []
    width: number = 0
    duration: any = 60 * 1000
    animation: any = null
    animationData: any = {}
    awardShow: boolean = false
    actProgress: any = [
        { name: '获取积分', description: '获取积分', timeStamp: [1667059200, 1668441599], sIcon: 'sBall' },
        { name: '积分解冻期', description: '积分解冻期', timeStamp: [1668441600, 1669305599], icon: 'ball', sIcon: 'sBall' },
        { name: '榜单结算', description: '榜单结算', timeStamp: 1669305600, icon: 'ball', sIcon: 'sBall' },
        { name: '幸运大抽奖', description: '幸运大抽奖', timeStamp: 1669359600, icon: 'ball', sIcon: 'sBall' }
    ]
    startAnimationTimer: any = null
    nowTimeStamp: any = Math.round(+new Date() / 1000)
    mounted() {
        app.platform.hasLoginToken(() => {
            this.reqRewardData()
            this.reqAllRank()
            this.reqMyRank()
        })
        setInterval(() => {
            this.nowTimeStamp = Math.round(+new Date() / 1000)
        }, 1000)
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
    prviewImages(picString: string) {
        if (!picString) return
        const picArr: any = picString.split(',').map(item => parsePic(decodeURIComponent(item)))
        uni.previewImage({
            current: 0,
            urls: picArr
        })
    }
    startAnimation(isFirst?: any) {
        this.startAnimationTimer && clearInterval(this.startAnimationTimer)
        this.startAnimationTimer = setInterval(() => {
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
    checkImage(item: any, index: number) {
        if (!item.icon) return item.sIcon
        const ItemStamp = this.isNumber(item.timeStamp) ? item.timeStamp : item.timeStamp[0]
        const TIME_DIFF: any = this.nowTimeStamp - ItemStamp
        return TIME_DIFF >= 0 ? item.sIcon : item.icon
    }
    isNumber(data: any) {
        return typeof data === 'number'
    }
    reqRewardData() {
        this.awardShow = false
        app.http.Get('dataApi/selectRank/award/list', { activityTp: 3 }, (res: any) => {
            this.awardList = res.list || []
            setTimeout(() => {
                this.awardShow = true
            }, 100)
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', { activityTp: 3 }, (res: any) => {
            this.rankList = res.list || []
            cb && cb()
        })
    }
    reqMyRank() {
        app.http.Get('dataApi/selectRank/my/data', { activityTp: 3 }, (res: any) => {
            this.myRank = res.data || {}
        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
}

.awardContainer {
    width: 711rpx;
    height: 215rpx;
    background-size: 100% 100%;
    background-image: url('/static/act/worldCup/awardContainer.png');
    box-sizing: border-box;
    padding: 23rpx 26rpx;

    .title {
        font-size: 40rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
    }

    .allList {
        width: 190rpx;
        height: 50rpx;
        background-size: 100% 100%;
        background-image: url('/static/act/worldCup/block1.png');
        justify-content: flex-end;
        box-sizing: border-box;
        padding-right: 11rpx;
        display: flex;

        text {
            font-size: 27rpx;
            font-weight: 600;
            color: #04253C;
            display: block;
            font-family: PingFang SC;
        }
    }

    .rightDot {
        width: 14rpx;
        height: 25rpx;
        display: block;
        margin-left: 8rpx;
    }
}

.drawContainer {
    width: 711rpx;
    height: 114rpx;
    background-size: 100% 100%;
    background-image: url('/static/act/worldCup/drawBlock.png');
    margin-top: 12rpx;
}

.rankContainer {
    width: 711rpx;
    margin-top: 18rpx;
    min-height: 1371rpx;
    background: rgba(2, 16, 37, .58);
    border: 1rpx solid;
    border-image: linear-gradient(0deg, rgba(52, 57, 255, .58), rgba(92, 235, 116, .58)) 10 10;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 0 18rpx;

    .rank_top {
        display: flex;
        width: 658rpx;
        height: 97rpx;
        background-size: 100% 100%;
        background-image: url('../../../static/act/oAo/fontBak.png');
        margin: 0 auto;
        // padding-top: 37rpx;
    }

    .rank_title {
        font-size: 41rpx;
        font-family: FZLanTingHei-HC-GBK;
        font-weight: 400;
        color: #FFFFFF;
        // letter-spacing: 4rpx;
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

.rank_tr {
    display: flex;
    align-items: center;
    width: 672rpx;
    height: 140rpx;
    background: linear-gradient(90deg, #238E1A, #37C32C, #238E1A);
    // background: #FFFFFF;
    // box-shadow: 0rpx 4rpx 13rpx 0rpx #56160C;
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0 20rpx;
    align-items: center;
    margin-bottom: 10rpx;

    .rankNum {
        width: 63rpx;
        height: 84rpx;
        background-size: 100% 100%;
        margin-right: 40rpx;
        font-size: 55rpx;
        font-family: FZDHTJW;
        font-weight: normal;
        color: #FFFFFF;
    }

    .rank1 {
        color: #FFFFFF;
        font-weight: bold;
        background: linear-gradient(-14deg, #EABC61 0%, #FAD778 50.244140625%, #EABC61 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .rank2 {
        color: #FFFFFF;
        font-weight: bold;
        background: linear-gradient(-14deg, #E0D6F4 0%, #E5F2FA 23.193359375%, #FBDFFB 40.72265625%, #C2E8F6 75.3173828125%, #DDDBDB 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .rank3 {
        color: #FFFFFF;
        font-weight: bold;
        background: linear-gradient(-14deg, #CCA84A 0%, #E5D2A3 46.240234375%, #D2B25F 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .rankAvatar {
        width: 68rpx;
        height: 68rpx;
        // background: #421D17;
        border-radius: 50%;
        margin-right: 20rpx;
    }

    .rankName {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fff;
        width: 90rpx;
        white-space: nowrap;
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
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFF600;
            margin-bottom: 10rpx;
        }

        .freeze {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #fff;
        }
    }

    .rankReward {
        width: 125rpx;
        height: 105rpx;
        // background: #421D17;
        border-radius: 3rpx;
        line-height: 30rpx;
        // linh
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
    }
}

.rank_my {
    outline: 4rpx solid #fee571;
}

.rank_tr_myRank {
    margin-bottom: 46rpx;
    height: 152rpx;
    box-sizing: border-box;
    padding: 51rpx 17rpx 24rpx 20rpx;
    align-items: center;

    .leftCorner {
        width: 109rpx;
        height: 33rpx;
        background: linear-gradient(90deg, #C1976F, #FEF1C7, #CCA27C);
        border-radius: 0rpx 0rpx 5rpx 0rpx;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0C2853;
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
            color: #fff;

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

.actProgressContainer {
    display: flex;
    width: 675rpx;
    height: 207rpx;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0 24rpx;
    justify-content: space-between;
    margin-top: 20rpx;
    margin-bottom: 0rpx;

    .progress_item {
        width: 100rpx;
        height: 100rpx;
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
        width: 120rpx;
        height: 5rpx;
        background: #fff;
        border-radius: 3rpx;
        position: absolute;
        left: 74rpx;
        top: 0;
        bottom: 0;
        margin: auto;
        bottom: 14rpx;
    }

    .progress_title {
        font-size: 22rpx;
        font-weight: 400;
        color: #FFFFFF;
        top: 90rpx;
    }

    .progress_time {
        font-size: 16rpx;
        font-weight: 400;
        color: #fff;
        top: 124rpx;
    }

    .positionCenter {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
}

.rollStaticContent {
    flex: 1;
    height: 101rpx;
    display: flex;
    overflow: hidden;
    position: relative;
    margin-top: 26rpx;

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

.flex1 {
    flex: 1;
}

.jb {
    justify-content: space-between;
}

.alc {
    align-items: center;
}
</style>
