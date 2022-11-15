<template>
    <view class="content">
        <view class="descriptionContainer" v-if="descriptionType == 0">
            <view>
                <view class="des_content" v-html="des">

                </view>
                <!-- <view @click="getElementScollTop"
                    style="color: #02a7f0;text-decoration:underline;font-size: 23rpx;margin-bottom:10rpx;">查看奖励</view> -->
            </view>
            <view class="des_title">
                活动时间说明
            </view>
            <view class="des_content">
                10.30~11.14 获取积分<br />
                11.15~11.24 积分解冻期<br />
                11.25 0:00 榜单结算<br />
                11.26 15:00 幸运大抽奖<br />
            </view>
            <view class="des_title" style="margin-top:10rpx">
                排行榜说明
            </view>
            <view class="des_content">
                <!-- 活动截止后，拼团购买21-22one and one系列将不再获得积分，冻结的积分会根据拼团是否成功录入或从冻结状态扣除<br /> -->
                排行榜每30分钟更新一次
            </view>
            <view class="des_title" style="margin-top:10rpx">
                积分说明
            </view>
            <view class="des_content">
                一.如何获取积分
            </view>
            <view class="des_content">
                活动期间，参与卡世界21-22one and one系列拼团，根据不同拼团形式、卡种倍数、球员倍数、球队倍数结算发放给用户 <br />
                【拼团期间将会冻结此订单的积分，拼团成功后发放至用户，拼团失败则会扣除对应订单冻结的积分】
            </view>
            <view class="des_content">
                二.卡密倍数
            </view>
            <view class="des_content red">
                卡种基础分：{{ pointConfig.cardSetBasicsScore || '获取中' }}<br />
                球员基础分：{{ pointConfig.playerBasicsScore || '获取中' }}<br />
                球队基础分：{{ pointConfig.teamBasicsScore || '获取中' }}<br />
            </view>
            <view class="des_title">
            </view>
            <view class="des_content red">
                例：基础分以拼团规格为单位.若拼团规格为1盒基础分为1，则规格为2盒的基础分为2，单箱基础分为10，以此类推
            </view>
            <view class="des_content">
                三.倍数说明<br />
                关键字倍数
            </view>
            <view class="des_content red" v-if="pointConfig.cardSet_multiple && pointConfig.cardSet_multiple.length">
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
        <view class="spRewardsContainer" v-if="descriptionType == 0">
            <view class="tips">活动截至后入榜前500名抽取n位幸运用户进行幸运抽奖</view>
            <view class="tips" @click="openRanDom">抽奖网站:<text
                    style="color: #02a7f0;text-decoration:underline;margin-left:6rpx">random.org</text></view>
        </view>
        <view class="descriptionContainer" v-if="descriptionType == 1">
            <view>
                <view class="des_content">
                    活动期间，参与【激情预测】，将根据预测的倍数获得相应的
                    世界豆奖励【参与期间扣除世界豆，截止投入后将无法继续
                    投入，公布结果后猜中的用户世界豆将以相应的倍数发放，
                    猜错则不返还】每次预测用户将根据对应的选项进行投入,用户
                    也可以在未达到投入上限的情况下进行追加投入
                </view>
            </view>
            <view class="des_title" style="margin-top:10rpx">
                倍数说明
            </view>
            <view class="des_content">
                倍数将根据实际客观情况产生调整，用户预测成功获得的世界豆取决于投注时的赔率，修改后的赔率只影响修改后参与投入的结果，不影响之前投注的赔数
            </view>
        </view>
        <view class="descriptionContainer" v-if="descriptionType == 2">
            <view>
                <view class="des_content">
                    活动期间参与【激情大抽奖】，每日早上九点开放晚上8:50
                    截止，每晚9点平台将公布中奖结果（公布时间存在延迟1-2
                    分钟，请耐心等待结果公布），开放期间，用户可以解锁奖券
                    每人每日可解锁6张，公布结果后会公示奖品的兑换码，兑换
                    码一致则为中奖
                    奖池内容将不定期更新，世界杯结束后（12月19日起），页面将保留3天，用户可自行分配剩余世界豆的使用途径
                </view>
            </view>
        </view>
        <view class="descriptionContainer" v-if="descriptionType == 3">
            <view>
                <view class="des_content">
                    活动期间，可通过竞猜、每日任务获取世界豆，世界豆可在世界豆商城中兑换对应奖励。世界杯结束后（12月19日起），世界豆商店将持续开放3天，用户可自行分配世界豆的使用途径
                </view>
            </view>
        </view>
        <view class="descriptionContainer" style="margin-top: 0;margin-bottom:80rpx">
            <view class="des_content">
                <text class="red">*</text>
                活动结束后，【世界豆商店】仍持续开放3天，

                用户可自行分配剩余世界豆的使用途径，3天后剩余世界豆

                将以卡币形式自动返还至用户账号
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
import { parsePic, dateFormatMSHMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    pointConfig: any = {}
    awardList: any = []
    des: string = `​
活动期间，参与平台任意足球系列拼团的用户，将根据拼团
的单价获得相应的积分奖励【拼团期间活动积分为冻结状态，拼团完成后则转化会用户获得的活动积分,拼团失败则从冻结积分中扣除】
活动截至入榜<text style="color:#FA1545">前50</text>的用户将获得对应的名次奖励
幸运大抽奖：排名<text style="color:#FA1545">前500名</text>的用户，平台将以直播的形式进行丰厚奖励抽取`;
    luckList: any = [
    ]
    descriptionType: number = 0
    onLoad(query: any) {
        this.descriptionType = +query.searchType
        if (this.descriptionType == 0) this.reqPointConfig()
        // this.reqPointConfig()
    }
    onReachBottom() {

    }
    onPulldDownRefresh() {

    }
    prviewImages(picString: string) {
        if (!picString) return
        const picArr: any = picString.split(',').map(item => parsePic(decodeURIComponent(item)))
        uni.previewImage({
            current: 0,
            urls: picArr
        })
    }
    getElementScollTop() {
        // uni.navigateTo({
        //     url: '/pages/act/worldCup/award'
        // })
        // const query: any = uni.createSelectorQuery()
        // query
        //     .select('.spRewardsContainer')
        //     .boundingClientRect((data: any) => {
        //         let pageScrollTop: any = Math.round(data.top)
        //         uni.pageScrollTo({
        //             scrollTop: pageScrollTop, //滚动的距离
        //             duration: 300, //过渡时间
        //         })
        //     })
        //     .exec()
    }
    openRanDom() {
        plus.runtime.openURL('https://www.random.org')
    }
    reqPointConfig() {
        app.http.Get(`dataApi/selectRank/multiple/config`, { activityTp: 3 }, (res: any) => {

            Object.keys(res.data).map((key: any) => {
                console.log(key);

                //@ts-ignore
                if (typeof res.data[key] == 'null') {
                    res.data[key] = []
                }
            })
            this.pointConfig = res.data
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

.canLucky {
    width: 207rpx;
    height: 207rpx;
}

.descriptionContainer {
    width: 710rpx;
    box-sizing: border-box;
    padding: 18rpx 30rpx 34rpx 30rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 20rpx;

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

    .des_gray {
        font-size: 19rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        margin-top: 25rpx;
    }

    .red {
        color: #FA1545;
    }
}

.desLine {
    width: 650rpx;
    height: 1rpx;
    background: #C0C0C0;
    margin-top: 105rpx;
    margin-bottom: 33rpx;
}

.spRewardsContainer {
    width: 710rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 34rpx 30rpx 35rpx 30rpx;
    margin-top: 20rpx;
    margin-bottom: 40rpx;

    .title {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 600;
        margin-bottom: 20rpx;
        color: #333333;
    }

    .tips {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .rewardsContainer {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;

        .rewardItem {
            margin-bottom: 22rpx;
            width: 207rpx;

            .rewardImage {
                width: inherit;
                height: 207rpx;
                // background: #DFDFDF;
                border-radius: 3rpx;
                margin-bottom: 15rpx;
            }

            .rewardRank {
                text-align: center;
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
            }

            .rewardName {
                font-weight: 400;
                text-align: center;
                margin-top: 10rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                color: #333333;
            }
        }
    }
}

.topTagContainer {
    display: flex;
    justify-content: space-between;
    padding: 0 40rpx;

    .tagItem {
        width: 68rpx;
        height: 68rpx;
        position: relative;

        image {
            width: inherit;
            height: inherit;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .tagTitle {
        white-space: nowrap;
        text-align: center;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        top: 74rpx;
    }

    .tagDes {
        white-space: nowrap;
        text-align: center;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        top: 108rpx;
    }

    .positionCenter {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
