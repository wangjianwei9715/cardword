<template>
    <view class="content">
        <navigationShare navigatetoTitle="规则说明" rightText="奖励预览" rightFont="12" @onClickRightText="onClickAward" />
        <view :style="{ height: 88 + 'rpx', paddingTop: app.statusBarHeight + 'px' }"></view>
        <view class="descriptionContainer">
            <view class="des_title">
                积分榜单：
            </view>
            <view class="des_content">
                活动期间，参与平台拼团的用户，将根据拼团的单价获得相应的积分奖励【拼团期间活动积分为冻结状态，拼团完成后则转化会用户获得的活动积分,拼团失败则从冻结积分中扣除】
                <br />
                <br />
                活动截至入榜前50的用户将获得对应的名次奖励
                <br />
                <br />
                <view class="tips">活动截至后入榜前500名抽取n位幸运用户进行幸运抽奖</view>
                <view class="tips" @click="openRanDom">抽奖网站:<text
                        style="color: #02a7f0;text-decoration:underline;margin-left:6rpx">random.org</text></view>
                <br>
                <text style="color:red">*</text>进入积分解冻环节后，拼团将不再获得积分，冻结的积分会根据之前的拼团是否成功录入或从冻结状态中扣除<br>
                <br />
                <text style="color:red">*</text>榜单每30分钟更新一次<br>
                <br />
                <text style="color:red">*</text>考虑到参与手提系列预售的卡迷，积分计算开始时间调整为5月12日
                <br />
                <view class="sTitle"><text style="color:red">*</text>积分倍数：</view>
                普通商品拼团积分*1倍单价，21-22flawless系列（21-22手提）积分*3倍单价
                <br />
            </view>
            <view class="des_title" style="margin-top:40rpx">
                线上手提卡展
            </view>

            <view class="des_content">
                参与【线上手提卡展】投稿活动，在本次手提系列活动期间，卡迷们可以发布自己和手提系列卡片的相关照片、视频，说说自己和卡片的故事，或者点赞评论他人的优质内容以获取活动奖励，希望老卡迷们早日收到自己心水的卡，新卡迷们能涨涨经验，感受一下手提系列的魅力
            </view>
            <view class="sTitle"><text style="color:red">*</text>投稿要求：</view>
            <view class="des_content">
                发布手提系列卡片的照片以及文案内容，可以是自己收藏的（提交审核内容时提供卡片和账号id合拍），也可以不是自己收藏的（非本人收藏无需上传），但是要和手提系列相关（此活动须完成实名认证）
            </view>
            <view class="sTitle"><text style="color:red">*</text>投稿须知：</view>
            <view class="des_content">
                活动期间每日6:00-18:00审核通道开启可提交投稿内容审核，其余时间关闭
            </view>
            <view class="des_content">
                截止日为【7月1日 0:00】，截止日后将冻结点赞量以及停止投稿审核
            </view>
            <view class="sTitle"><text style="color:red">*</text>奖励内容：</view>
            <view class="des_content">
                1.每日前10名通过审核的用户：奖励50榜单积分+8元无门槛优惠券
            </view>
            <view class="des_content">
                2.点赞随机+榜单积分（10积分/次，每人每日上限5次）
            </view>
            <view class="des_content">
                3.评论随机+榜单积分（10积分/次，每人每日上限5次）
            </view>
            <view class="des_content">
                每日投稿奖励截止至6月19日 0:00前
            </view>
            <view class="sTitle" style="margin-top: 26rpx;">
                <text style="color:red">*</text>活动结束后颁发奖励<br>
            </view>
            <view class="des_content">
                1.最佳摄影奖:最佳拍摄内容（联合评选）
            </view>
            <view class="des_content">
                2.优质内容奖:综合叙事内容（联合评选）
            </view>
            <view class="des_content">
                3.最高人气奖:累计点赞最高
            </view>
            <view class="des_content">
                4.最佳手提奖:手提系列点赞最高
            </view>
            <view class="des_content" style="margin-top: 26rpx;">
                获奖信息将在平台资讯公告以及魔球社公众号中公布
            </view>
            <view class="des_content red" style="margin-top: 26rpx;">
                注意事项：参与活动需完成实名认证
            </view>
            <view class="des_content"  style="margin-top: 26rpx;">
                发货说明：实物商品平台将在1-30天内发货，收货地址为用户的默认收货地址，未填写地址的用户在中奖后联系客服安排发货
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
    app = app
    des: string =
        `
	活动期间，参与<text style="color:#FA1545">21-22one and one</text>拼团的用户，将根据拼团的类型获得相应的积分奖励【拼团期间活动积分为冻结状态，拼团完成后则转化会用户获得的活动积分,拼团失败则从冻结积分中扣除】
	<br/>
	活动截至<text style="color:#FA1545">入榜前50名</text>的用户将获得特殊奖励
	<br/>
	幸运大抽奖：<text style="color:#FA1545">排名前500名</text>的用户，平台将以直播的形式进行丰厚奖励抽取 
	`
    luckList: any = [
        // {pic:'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.10.25/seller/info/1/1666686598531v77703ivaa.png',name:'抽取10张100元券',rank:"第1-50名"},
        // {pic:'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.10.25/seller/info/1/1666686598531v77703ivaa.png',name:'抽取10张100元券',rank:"第1-200名"},
        // {pic:'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.10.25/seller/info/1/1666686588175ypd48tdht.jpg',name:"抽取Select原盒一盒",rank:"第1-500名"}
    ]
    onLoad(query: any) {
        this.reqRewardList()
        this.reqRewardListTwo()
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
        const query: any = uni.createSelectorQuery()
        query
            .select('.spRewardsContainer')
            .boundingClientRect((data: any) => {
                let pageScrollTop: any = Math.round(data.top)
                uni.pageScrollTo({
                    scrollTop: pageScrollTop, //滚动的距离
                    duration: 300, //过渡时间
                })
            })
            .exec()
    }
    openRanDom() {
        plus.runtime.openURL('https://www.random.org')
    }
    onClickAward() {
        uni.navigateTo({
            url: "/pages/act/portable/award"
        })
    }
    reqRewardList() {
        app.http.Get('dataApi/selectRank/award/list', { isLucky: 0, activityTp: 2 }, (res: any) => {
            this.awardList = res.list || []

        })
    }
    reqRewardListTwo() {
        app.http.Get('dataApi/selectRank/award/list', { isLucky: 1, activityTp: 2 }, (res: any) => {
            this.luckList = res.list || []
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
    padding: 38rpx 30rpx 34rpx 30rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 20rpx;

    .des_title {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: bold;
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

    .sTitle {
        color: #333333;
        font-weight: bold;
        font-family: PingFang SC;
        font-size: 23rpx;
        letter-spacing: 2rpx;
        margin-top: 20rpx;
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
        font-weight: bold;
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
