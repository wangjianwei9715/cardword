<template>
	<view>
		<view class="ruleContent">
			<view class="title">活动规则</view>
			<view class="txt">
				玩家参与篮球、足球类拼团有概率获取金色卡密积分（自选球队玩法除外）
				<br>
				<text class="emphasis">金卡积分=金卡×卡密单价</text>（如：小明参与10组单价为2.5元的拼团，抽到2张金色卡密，共获得5积分）
			</view>
			<view class="theSecondaryTitle">玩法一：今日榜单</view>
			<view class="txt">·活动分为15期，每期1天(0点开始，23:59:59结束），根据玩家当日获取金色卡密积分由高到低排名，位于<text
					class="emphasis">今日榜单前30名</text>的玩家可获取相应奖励
			</view>
			<view class="txt">·每期活动结束后，可结算排名奖励；实物类奖品请联系客服发货(包邮)；优惠券类奖品将在2小时内自动发放至我的-优惠券，有效期为60天，请注意查收</view>
			<view class="theSecondaryTitle">玩法二：积分总榜</view>
			<view class="txt">·活动共15天，4.24-5.8为活动期，5.9-5.10为公示期，5.11 0点后开始根据榜单排名结算奖品<text class="emphasis">积分总榜前100名的玩家可获取相应大奖
				</text></view>
			<view class="txt">·实物类奖品请联系客服发货(包邮)；优惠券类奖品将在2小时内自动发放至我的-优惠券，有效期为60天，请注意查收</view>
			<view class="txt">.为了榜单的公平公正，拼团失败的商品，将在结束后扣除此产品最后48小时所获得的金卡积分，48小时前获得的金卡积分仍然累计。总榜5.8日结束，5.9~5.10为公示期，公示期期间金卡积分不会再增加，但会对部分拼团失败的产品48内获得的积分进行扣除；5.11日 0点后更具榜单排名正常发放奖励。望悉知，如有疑问，可联系平台客服为您解答。</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.ruleContent {
		padding: 0 32rpx;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		letter-spacing: 2rpx;

		.title {
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin-top: 36rpx;
		}

		.txt {
			line-height: 48rpx;
			margin-top: 12rpx;
		}

		.theSecondaryTitle {
			font-size: 31rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			position: relative;
			text-indent: 1em;
			margin-top: 50rpx;
		}

		.emphasis {
			font-weight: bold;
		}
	}
</style>
