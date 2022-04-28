<template>
	<view class="container">
		<view class="rightFloat" style="top:20rpx;">
			<text>规则</text>
		</view>
		<view class="topImage">

		</view>
		<view class="topTisp">每次猜对获得2点欧气，每轮比赛进行2场后不可再猜测</view>
		<view class="contestContainer">
			<view class="contest-teamCard-container uni-flex" style="margin-bottom: 66rpx;">
				<confrontCard v-for="(item,index) in getEightList('westList')" :item='item' :key='index'
					@onClickSup='actionSupot'></confrontCard>
				<view class="line lineOne"></view>
			</view>
			<view class="contest-teamCard-container uni-flex just-center" style="margin-bottom: 52rpx;">
				<confrontCard @onClickSup='actionSupot' :item="getHalfAndFinal('westHalfOf')"></confrontCard>
			</view>
			<view class="contest-teamCard-container uni-flex just-center" style="margin-bottom: 55rpx;">
				<confrontCard @onClickSup='actionSupot' :isBig='true' :item="getHalfAndFinal('finalData')"></confrontCard>
				<view class="line lineTwo"></view>
			</view>
			<view class="contest-teamCard-container uni-flex just-center" style="margin-bottom: 66rpx;">
				<confrontCard @onClickSup='actionSupot' :item="getHalfAndFinal('eastHalfOf')"></confrontCard>
			</view>
			<view class="contest-teamCard-container uni-flex">
				<confrontCard v-for="(item,index) in getEightList('eastList')" @onClickSup='actionSupot' :key='index'
					:item='item'></confrontCard>
				<view class="line lineThree"></view>
			</view>
		</view>
		<view class="confirmModal" :class="{confirmModalShow:modalShow}">
			<view class="close" @click="modalShow=false"></view>
			<view class="tips">请选择您支持的球队</view>
			<view class="chioceContainer">
				<view class="teamChoice" @click='supportTeam(1,nowSelectTeamData.name_1)'>{{nowSelectTeamData.name_1}}
				</view>
				<view class="teamChoice" @click='supportTeam(2,nowSelectTeamData.name_2)'>{{nowSelectTeamData.name_2}}
				</view>
			</view>
		</view>
		<view class="ruleModal" v-show="ruleShow">
			<view class="close" @click="ruleShow=false"></view>
			<view class="rule-title">规则说明</view>
			<view class="rule-particulars">
				<text>1.NBA季候赛期间，玩家在活动页面支持自己喜爱的球队就可免费获得欧气</text><br>
				<text>2.欧气获取：</text><br>
				<text>1) 首次分享活动页+5欧气数 (限1次)</text>
			</view>
		</view>
		<view class="mask" v-show="modalShow||ruleShow"></view>
		<view class="bottomContainer">
			<view class="bottom-button share" @click="shareWx">
				<text>分享</text>
				<text>首次分享欧气+5</text>
			</view>
			<view class="bottom-button goLoot" @click="pageJump('/pages/act/loot/index')">前往欧皇夺宝</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component,
		Prop,
		Vue
	} from "vue-property-decorator";
	import {
		formatNumber
	} from '@/tools/util'
	import BaseComponent from "@/base/BaseComponent.vue";
	import confrontCard from './components/confrontCard.vue'
	@Component({
		components: {
			confrontCard
		}
	})
	export default class ClassName extends BaseComponent {

		modalShow: boolean = false;
		formatNumber: any = formatNumber;
		ruleShow: boolean = false;
		eastList: any = [] //东部8进4
		eastHalfOf: any = {} //东部半决赛
		westList: any = [] //西部8进4
		westHalfOf: any = {} //西部半决赛
		finalData: any = {} //总决赛
		noneData: any = {
			supportTeam: -1, //支持的球队，1 球队1，2 球队2， 0 未支持，-1 不可支持
		}
		nowSelectTeamData: any = {}
		onLoad() {
			this.reqNewData()
		}
		onShow() {
			uni.hideLoading()
		}
		onPullDownRefresh() {
			this.reqNewData(() => {
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 500)
			})
		}
		actionSupot(item: any) {
			this.nowSelectTeamData = item
			this.modalShow = true
		}

		//支持球队
		supportTeam(team: number, teamName: string) {
			app.http.Post('activity/playoff/support/' + this.nowSelectTeamData.id, {
				team,
				teamName
			}, (res: any) => {
				this.modalShow = false
				uni.showToast({
					title: '支持成功'
				})
			})
		}
		//分享
		shareWx() {
			uni.showLoading({
				title: '请稍等'
			})
			uni.share({
				provider: "weixin",
				type: 0,
				imageUrl: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.14/loot/loot_sw/0/1649923645699n8fv080wdf.jpg",
				title: "下一个欧皇就是你！",
				summary: '完成任务，免费参与卡世界欧皇夺宝。',
				scene: "WXSceneSession",
				href: 'https://www.ka-world.com/share/h5/#/pages/loot/loot',
				success: (res: any) => {},
				fail: (err: any) => {
					console.log("失败原因=>", err);
					uni.showToast({
						title: "分享失败",
						icon: "none"
					});
				},
				complete: (res: any) => {
					uni.hideLoading()
				}
			});
			setTimeout(() => {
				this.completeTask()
			}, 2000)
		}
		completeTask() {
			app.http.Post('activity/playoff/share/luckyGas/get', {}, (res: any) => {
				uni.showToast({
					title: '分享成功,欧气+5!'
				})
			})
		}
		classifyData(allList: any) {
			let eastList: any = []
			let westList: any = []
			allList.forEach((item: any) => {
				if (item.zone == 1 && item.place == 8) eastList.push(item) //8进4东部赛区
				if (item.zone == 1 && item.place == 4) this.eastHalfOf = item //半决赛东部赛区
				if (item.zone == 2 && item.place == 8) westList.push(item) //8进4西部部赛区
				if (item.zone == 2 && item.place == 4) this.westHalfOf = item //半决赛西部部赛区
				if (item.zone == 3 && item.place == 2) this.finalData = item //总决赛
			})
			this.eastList = eastList
			this.westList = westList
		}
		reqNewData(cb ? : Function) {
			app.http.Get('dataApi/activity/playoff', {}, (res: any) => {
				this.classifyData(res.list || [])
				cb && cb()
			})
		}
		pageJump(url: string) {
			if (!url) return
			uni.navigateTo({
				url
			})
		}
		private get getEightList() {
			const _this: any = this
			return function(key: string) {
				if (_this[key].length == 2) return _this[key]
				const lenth: number = _this[key].length
				const fillArr: any = new Array(2 - lenth).fill(_this.noneData)
				return [..._this[key], ...fillArr]
			}
		}
		private get getHalfAndFinal() {
			const _this: any = this
			return function(key: string) {
				if (Object.keys(_this[key]).length < 3) return _this.noneData
				return _this[key]
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #472256;
	}

	.container {
		width: 750rpx;
		height: 1334rpx;
		background-size: 100% 100%;
		background-image: url(../../../static/act/teamContest/back_img.png);

		.rightFloat {
			width: 100rpx;
			height: 96rpx;
			position: absolute;
			right: 4rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/goldRank/active_rule.png);
			font-size: 20rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			letter-spacing: 2rpx;
			line-height: 96rpx;

			text {
				/* position: relative;
				top: 30rpx; */
			}
		}
	}

	.topImage {
		width: 680rpx;
		height: 210rpx;
		background-size: 100% 100%;
		position: relative;
		background-image: url(../../../static/act/teamContest/top.png);
		position: relative;
		right: 36rpx;

	}

	.topTisp {
		text-align: center;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		position: relative;
		letter-spacing: 2rpx;
		margin-bottom: 13rpx;
	}

	.contestContainer {
		/* padding: 0 47rpx; */
		width: 660rpx;
		margin: 0 auto;
		position: relative;
		padding-bottom: calc(140rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
	}

	.bottomContainer {
		width: 750rpx;
		background-size: 100% 100%;
		position: fixed;
		bottom: 0;
		background-image: url(../../../static/act/teamContest/white_bottom.png);
		height: calc(124rpx + constant(safe-area-inset-bottom));
		height: calc(124rpx + env(safe-area-inset-bottom));
		z-index: 3;
		display: flex;
		justify-content: center;

		.bottom-button {
			width: 343rpx;
			height: 78rpx;
			border-radius: 3rpx;
			letter-spacing: 2rpx;
			margin-top: 22rpx;
		}

		.share {
			border: 2rpx solid #DADADA;
			margin-right: 22rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			text {
				font-family: Alibaba PuHuiTi;
				color: #5E5D5D;
				font-weight: 400;
				display: block;
				width: 100%;
				text-align: center;
			}

			text:first-child {
				font-size: 31rpx;
			}

			text:last-child {
				font-size: 21rpx;
			}

		}

		.goLoot {
			background: #EF3333;
			font-size: 33rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 78rpx;
		}
	}

	.contest-teamCard-container {
		align-items: center;
		justify-content: space-between;
		position: relative;

		.line {
			background-size: 100% 100%;
			position: absolute;
			z-index: 1;
		}

		.lineOne {
			width: 408rpx;
			height: 102rpx;
			background-image: url(../../../static/act/teamContest/lineOne.png);
			bottom: -54rpx;
			left: 0;
			right: 0;
			margin: auto;
		}

		.lineTwo {
			width: 40rpx;
			height: 656rpx;
			background-size: 100% 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-image: url(../../../static/act/teamContest/lineTwo.png);
			position: absolute;
		}

		.lineThree {
			width: 408rpx;
			height: 102rpx;
			background-image: url(../../../static/act/teamContest/lineThree.png);
			top: -54rpx;
			left: 0;
			right: 0;
			margin: auto;
		}
	}

	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 8;
	}

	.confirmModal {
		width: 516rpx;
		height: 317rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		top: 447rpx;
		z-index: 9;
		opacity: 0;
		transform: scale(0);
		transition: all 0.3s;

		.close {
			width: 36rpx;
			height: 33rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/teamContest/close.png);
			position: absolute;
			top: -75rpx;
			right: 0;
		}

		.tips {
			text-align: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 89rpx;
		}

		.chioceContainer {
			padding: 0 27rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 57rpx;

			.teamChoice {
				width: 221rpx;
				height: 65rpx;
				background: #E13737;
				border-radius: 3rpx;
				text-align: center;
				font-size: 29rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #FFFFFF;
				letter-spacing: 2rpx;
				line-height: 65rpx;
			}
		}
	}

	.confirmModalShow {
		opacity: 1;
		transform: scale(1);
	}

	.ruleModal {
		width: 750rpx;
		height: calc(950rpx + constant(safe-area-inset-bottom));
		height: calc(950rpx + env(safe-area-inset-bottom));
		background: #FFFFFF;
		border-radius: 5rpx 5rpx 0px 0px;
		position: fixed;
		bottom: 0;
		z-index: 9;

		.close {
			width: 29rpx;
			height: 27rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/teamContest/black_close.png);
			position: absolute;
			top: 23rpx;
			right: 23rpx;
		}

		.rule-title {
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin: 30rpx 0;
			text-align: center;
		}

		.rule-particulars {
			padding: 0 35rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #7D8288;

		}
	}

	.just-center {
		justify-content: center;
	}
</style>
