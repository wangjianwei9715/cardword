<template>
    <view class="content">
        <view class="descriptionContainer">
            <view class="des_title">
                活动规则：
            </view>
            <view class="des_content">
                活动时间：2023.06.20-2023.07.10。活动期间，玩家参与拼团，在卡密特效玩法中有概率获得特殊样式的特卡，为本活动的活动道具（跳过卡密特效仍可获得），卡密单价越高出现概率越大，集齐指定特卡卡组即可领取丰厚奖励。也可将特卡赠与他人。
                <br />
				<br />
				<view class="sTitle">特别说明：<text style="color:red">获得的特卡将在拼团成功后累计，拼团失败则不累计。活动结束前获得的特卡，若活动结束后拼成也可累计至本活动，奖励正常发放；活动结束后在卡密特效玩法中仍可见特卡，但不再累计至本活动，并关闭特卡转赠功能</text></view>
                <view class="sTitle">赠送特卡：</view>特卡累计至活动后（即拼团成功后）可赠送他人，收到特卡的用户实时累计。赠送特卡仅赠送活动道具而非相应卡密。
                <br />
				<br />
                <view class="sTitle">奖励规则：</view>
				1、活动共xxx种特卡卡组，每种卡组设置独立奖品，奖品可重复获得，越早集齐玩家获得的奖励也更为丰厚丰厚。
				<br />
				<view class="sTitle"></view>
				2、集齐后（即最后一张特卡拼团成功，或收到他人赠送的最后一张特卡）奖品将自动发放并扣除该组特卡，优惠券类奖品自动发放至 我的-优惠券 页面，实物奖品需通过 活动页-我的记录-奖品记录 页面中提交发货申请。
				<br />
				<view class="sTitle">3、排名说明：</view>特卡在拼团成功后累计至活动，集齐排名按最后集齐的一张特卡实际累计至活动的时间排序。
				<br />
				<br />
				<view class="sTitle">特别情形1）购买时间更早但实际累计至活动时间更晚，则按实际累计至活动的时间排名</view>
				举例：张三、李四已集齐火焰特卡中除詹姆斯外的其他特卡。张三在A拼团中，获得詹姆斯火焰特卡，购买时间为5月1日10:00，拼成并累计至活动的时间为5月1日12:00；李四在B拼团中，获得詹姆斯火焰特卡，购买时间为5月1日10:30，拼成并累计至活动的时间为5月1日11:00。李四的集齐的最后一张特卡更早累计至活动，此种情况李四为第一名集齐，张三为第二名集齐
				<br />
				<br />
				<view class="sTitle">特别情形2）同一拼团有两名用户集齐了相同卡组，则按相应卡密的购买时间排名。</view>
				举例：张三、李四已集齐火焰特卡中除詹姆斯外的其他特卡。张三在A拼团中，获得詹姆斯火焰特卡，购买时间为5月1日10:00，拼成并累计至活动的时间为5月1日12:00；李四在A拼团中，获得詹姆斯火焰特卡，购买时间为5月1日10:30，拼成并累计至活动的时间为5月1日12:00。两名玩家在同一拼团完成火焰特卡卡组收集，此种情况为集齐最后一张特卡的订单越早排名越前，故张三为第一名，李四为第二名。
				<br />
				<br />
				<view class="sTitle">特别情形3）购买时间更早且拼团还在进行中，道具暂未累计至活动，但他人通过别人赠送的形式集齐了特卡，则按实际累计至活动的时间排名</view>
				举例：张三、李四已集齐火焰特卡中除詹姆斯外的其他特卡。张三在A拼团中，获得詹姆斯火焰特卡，购买时间为5月1日10:00，拼成并累计至活动的时间为5月1日12:00；李四在5月1日11:00收到了他人赠送的詹姆斯火焰特卡。此种情况李四的火焰特卡更早累计至活动，故李四为第一名，张三为第二名。
				<br />
            </view>

        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    app = app
    onLoad(query: any) {
    }
    onReachBottom() {

    }
    onPulldDownRefresh() {

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
