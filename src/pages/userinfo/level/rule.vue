<template>
    <view class="content">
        <!-- <navigationbar title="规则说明" rightText="奖励预览" rightFont="12" @onClickRightText="onClickAward" /> -->
        <view class="descriptionContainer">
            <view class="des_title">
                卡圈等级说明
            </view>
            <view class="sTitle">卡圈等级</view>
            <view class="des_content">
                玩家完成每日任务、限定任务均可获得阅卡值用于提升卡圈等级。提升至5/9/10级可解锁特殊勋章。
                <br />
            </view>
            <view class="sTitle">每日/限定任务</view>
            <view class="des_content">
                每日任务当天限完成1次，每日0:00重置；限定任务在开放是均可循环完成。具体任务可查看卡圈等级页面
            </view>
            <view class="sTitle">各等级所需阅卡值</view>
            <view class="des_content">
                待补充
            </view>
            <view class="des_title" style="margin-top: 40rpx;">
                勋章说明
            </view>
            <view class="sTitle">勋章解锁</view>
            <view class="des_content">
                玩家完成指定任务即可解锁相应勋章。
            </view>
            <view class="sTitle">勋章的使用</view>
            <view class="des_content">
                点击已解锁勋章可进行佩戴，同时只能佩戴一个勋章。佩戴后，将在动态详情、评论、直播、拼团等页面中展示。
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
        
        font-weight: bold;
        color: #333333;
        margin-bottom: 10rpx;
    }

    .des_content {
        font-size: 23rpx;
        
        
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
        
        font-size: 23rpx;
        letter-spacing: 2rpx;
        margin-top: 20rpx;
    }

    .des_gray {
        font-size: 19rpx;
        
        
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
        
        font-weight: bold;
        margin-bottom: 20rpx;
        color: #333333;
    }

    .tips {
        font-size: 25rpx;
        
        
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
                
                
                color: #333333;
            }

            .rewardName {
                
                text-align: center;
                margin-top: 10rpx;
                font-size: 24rpx;
                
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
        
        
        color: #333333;
        top: 74rpx;
    }

    .tagDes {
        white-space: nowrap;
        text-align: center;
        font-size: 25rpx;
        
        
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
