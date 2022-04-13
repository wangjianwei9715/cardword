<template>
	<!-- 夺宝主页 -->
	<view>
		<view class="topBanner">
			<view class="rightFloatItem" @click="pageJump('/pages/act/loot/loot_myPrize')"><text>我的</text></view>
			<view class="rightFloatItem rule"><text>奖品规则</text></view>
			<view class="rollContent" id='rollContent'>
				<view class="rollHidden" id='rollHidden' :style="{transform:`translateX(${rollX}px)`}">
					<view class="rollItem" v-for="item in testList">
						<image
							src="https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.12/loot/loot_sw/0/16497588173299mxhmh8ci.jpg"
							mode=""></image>
						<view class="name oneLineOver">加入了iphone13夺宝</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tagContent">
			<view class="tagItem" v-for="(item,index) in tag.list" :key='index'
				:class="{selectTagItem:index==tag.index}" @click="tagChange(item,index)">
				{{item.name}}
				<image src='../../../static/act/loot/select.png' />
			</view>
		</view>
		<view class="prizeContent">
			<view class="prizeItem" v-for="(item,index) in lootList" :key="index">
				<view class="bigPrize" v-if="item.isGood===1">
					<text>欧皇大奖</text>
				</view>
				<image class="prize-left" :src='item.tp===1?decodeURIComponent(item.award_pic):"https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.12/loot/loot_sw/0/1649763728509b9m4fq61v.png"' mode='aspectFill'></image>
				<view class="prize-right">
					<view class="title oneLineOver">{{item.name}}</view>
					<view class="probability">
						1欧气={{item.goData.getOdds}}%中奖率
					</view>
					<view class="progressContent uni-flex">
						<view class="progress">
							<view class="maskPro" :style="{width:(100-getPlan(item.take_num,item.total_num))+'%'}">
							</view>
						</view>
						<view class="contrast">{{item.take_num}}/{{item.total_num}}</view>
					</view>
					<view class="actionContent uni-flex">
						<view class="actionButton whiteBtn" @click="handleGetOq(item,true)">我的欧气码</view>
						<view class="actionButton blackBtn" @click="handleJoin(item,index)">1欧气参与</view>
					</view>
				</view>
			</view>
		</view>
		<view class="noneBlock"></view>
		<view class="bottomBlock">
			<view class="bootomBlock-content">
				<view class="myEg">
					<text style="margin-right: 12rpx;">我的欧气</text>
					<text style="color: #E23369;font-weight: bolder;font-size: 33rpx;">{{luckyGas}}</text>
				</view>
				<view class="getEq" @click="showDrawer=true">获取欧气</view>
			</view>
		</view>
		<!-- 任务弹窗 -->
		<view class="drawerCard" :class="{showDrawerCard:showDrawer}">
			<image src="../../../static/act/loot/close.png" class="close" mode="" @click="showDrawer=false"></image>
			<view class="title uni-flex">
				<text style="margin-left: 34rpx;">获取欧气</text>
				<text style="color: #88878C;font-size: 29rpx;margin-left: 16rpx;font-weight: normal;">任务每日更新</text>
			</view>
			<view class="taskContent">
				<view class="taskItem" v-for="(item,index) in taskList" :key='index'>
					<image class="taskIcon" :src="`../../../static/act/loot/${taskTipsList[item.id].pic}`" mode="">
					</image>
					<view class="taskTips">
						<view class="taskTips-top uni-flex">
							<view class="loop" v-if="item.id==5">循环任务</view>
							{{item.taskName}}
						</view>
						<view class="taskTips-bottom">欧气+{{item.taskReward}}</view>
					</view>
					<view class="taskButton" :class='{noneTaskButton:item.isUse===1}' @click="handleTask(item,index)">
						{{item.isUse===1?'明日再来':taskTipsList[item.id].tips}}
					</view>
				</view>
			</view>
		</view>
		<!-- 欧气值计数器弹窗 -->
		<view class="luckyGasModal" :class="{showLuck:luckyGasModalShow}">
			<image src="../../../static/act/loot/close.png" class="close" mode="" @click="luckyGasModalShow=false">
			</image>
			<view class="title">获取欧气码</view>
			<view class="counterModal uni-flex">
				<image class="reduce" src="../../../static/act/loot/-.png" @click="luckAction('reduce')"></image>
				<image class="line" src="../../../static/act/loot/line.png"></image>
				<view class="center">
					<view class="number">{{consumeLuckGas}}个</view>
					<view class="text">消耗{{consumeLuckGas}}欧气</view>
				</view>
				<image class="line" src="../../../static/act/loot/line.png"></image>
				<image class="add" src="../../../static/act/loot/+.png" @click="luckAction('add')"></image>
			</view>
			<view class="text" style="text-align: center;margin: 14rpx auto;">参与次数越多，夺宝概率越大</view>
			<view class="btn" @click="joinConfirm">确定参与</view>
		</view>
		<!-- 欧气码弹窗 -->
		<view class="oqModal" :class='{showOpModal:oqModalShow}'>
			<image src="../../../static/act/loot/close.png" class="close" mode="" @click="oqModalShow=false">
			</image>
			<view class="title">我的欧气码</view>
			<scroll-view class="oqCodeScroll" scroll-y="true" @scrolltolower='scrolltolower'>
				<view class="codeContent">
					<view class="codeItem" v-for="item in codeList">
						{{item}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-show="showDrawer || luckyGasModalShow || oqModalShow" @click="closeAll">
		</view>
	</view>
</template>

<script lang='ts'>
	import {
		app
	} from "@/app";
	import {
		Component,
		Prop,
		Vue,
		Watch
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		showDrawer: boolean = false; //任务弹窗
		operationShow: boolean = false;
		testList:any=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,];
		rollTimer: number = 0;
		rollX: number = 0;
		rollWidth:number=0;
		phoneWidth:number=0;
		tag: any = {
			index: 0,
			list: [{
					name: "进行中",
					value: 1
				},
				{
					name: "已开奖",
					value: 2
				},
				{
					name: "我参与的",
					value: 3
				}
			]
		};
		taskTipsList: any = {
			1: {
				pic: "share.png",
				tips: "去分享",
				action: "shareWx"
			},
			2: {
				pic: "thumbs.png",
				tips: "去完成",
				url: "/pages/act/calendar/list"
			},
			3: {
				pic: "shop.png",
				tips: "去完成",
				url: "/pages/act/calendar/list"
			},
			4: {
				pic: "group.png",
				tips: "去完成",
				url: "/pages/act/calendar/list"
			},
			5: {
				pic: "order.png",
				tips: "去完成",
				url: "/pages/act/calendar/list"
			}
		};
		luckyGas: number = 0; //个人欧气值
		consumeLuckGas: number = 1; //消耗欧气值
		taskList: any = [];
		selectItem: any = {};
		personJoinList: any = []; //用户参与列表(气泡轮播)
		luckyGasModalShow: boolean = false;
		oqModalShow: boolean = false;
		lootList: any = [];
		totalPage: number = 0;
		queryParams: any = {
			pageIndex: 1,
			pageSize: 20,
			tp: 1 //1 进行中，2 已开奖，3 我的参与
		};
		codeList:any=[];
		codeTotalPage:number=0;
		codeParams:any={
			pageIndex:1,
			pageSize:50
		}
		onLoad() {
			this.firstGetData()
		}
		onShow(){
			this.getTaskList();
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1;
				this.reqNewData();
			}
		}
		onPullDownRefresh(){
			this.firstGetData()
		}
		destroyed(){
			clearInterval(this.rollTimer)
		}
		firstGetData(){
			this.queryParams.index=1
			this.reqNewData();
			this.getPersonJoin();
			this.getTaskList();
			this.$nextTick(() => {
				this.getRollParams().then((res:any)=>{
					this.startRollInterval()
				})
			})
		}
		getPlan(now: number, all: number) {
			let width = Math.floor(Number(now) / Number(all) * 100);
			return width;
		}
		getRollParams(){
			return new Promise((resolve:any,reject:any)=>{
		const query:any = uni.createSelectorQuery().in(this);
		let selectCoun=0
			query.select('#rollContent').boundingClientRect((data: any) => {
				this.phoneWidth=data.width
				selectCoun+=1
			}).exec();
			query.select('#rollHidden').boundingClientRect((data: any) => {
				this.rollWidth=data.width
				selectCoun+=1
			}).exec();
			resolve()
			})
		}
		startRollInterval(){
			this.rollTimer = setInterval(() => {
					this.rollX -= 0.15
					if((this.rollWidth+this.rollX)<=this.phoneWidth){
						this.rollX=0
					}
				}, 10)
		}
		handleJoin(item: any, index: number) {
			if (this.luckyGas < 1) {
				this.showDrawer = true;
				uni.showToast({
					title: "欧气值不足,前去完成任务赚取欧气",
					icon: "none"
				});

				return;
			}
			this.selectItem = item;
			this.consumeLuckGas=1
			this.luckyGasModalShow=true
		}
		handleTask(item: any, index: number) {
			if (item.isUse == 1) {
				uni.showToast({
					title: "明天再来吧~",
					icon: "none"
				});
				return;
			}
			const taskTip = this.taskTipsList[item.id];
			if (!taskTip) return;
			if (taskTip.url) {
				this.pageJump(taskTip.url);
				return;
			}
			if (taskTip.action) {
				const _this: any = this;
				_this[taskTip.action](item);
			}
			// if(this.tas)
		}
		//微信分享
		shareWx(item: any) {
			uni.share({
				provider: "weixin",
				type: 5,
				imageUrl: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.12/loot/loot_sw/0/1649752567775crquv32j7.png",
				title: "欧皇夺宝",
				scene: "WXSceneSession",
				miniProgram: {
					id: "gh_5cf45dd26926",
					type: 0,
					path: "/pages/index/index",
					webUrl: "https://www.ka-world.com/"
				},
				success: (res: any) => {
					// this.getTaskList();
					this.completeTask(item)
				},
				fail: (err: any) => {
					console.log("失败原因=>", err);
					uni.showToast({
						title: "分享失败",
						icon: "none"
					});
				}
			});
		}
		//计数器加减操作
		luckAction(type: string) {
			if (
				(this.consumeLuckGas >= this.luckyGas&& type === "add") ||
				(this.consumeLuckGas === 1 && type === "reduce")
			)
				return;
				if(this.consumeLuckGas>=(this.selectItem.total_num-this.selectItem.take_num)&& type === "add") return
			let copyNum = this.consumeLuckGas;
			copyNum = type == "add" ? copyNum + 1 : copyNum - 1;
			this.consumeLuckGas = copyNum;
		}
		//欧气码触底事件
		scrolltolower() {
			if(this.codeParams.pageIndex < this.codeTotalPage){
				this.codeParams.pageIndex+=1
				this.handleGetOq(this.selectItem,false)
			}
		}
		handleGetOq(item: any,isRefsh:any=false) {
			if(isRefsh) this.codeParams.index=1
			app.http.Get('activity/snatchTreasure/myLuckyGasCode/'+item.id,this.codeParams,(res:any)=>{
				this.codeTotalPage=res.totalPage||0
				const arr = res.list || [];
				if (this.codeParams.pageIndex === 1) this.codeList = [];
				this.codeList = [...this.codeList, ...arr];
				if(isRefsh) this.oqModalShow = true
			})
			
		}
		//参与夺宝
		joinConfirm(){
			// console.log(this.selectItem);
			app.http.Post('activity/snatchTreasure/active/'+this.selectItem.id,{luckyGasNum:this.consumeLuckGas},(res:any)=>{
				this.queryParams.pageIndex=1
				this.getTaskList()
				uni.showToast({
					title:'参与成功'
				})
				this.reqNewData()
			})
			
		}
		//获取任务列表以及个人欧气值
		getTaskList() {
			app.http.Get("activity/snatchTreasure/index", {}, (res: any) => {
				this.luckyGas = res.data.luckyGasNum || 0;
				this.taskList = res.data.taskList || [];
			});
		}
		//获取用户参与列表
		getPersonJoin() {
			app.http.Get("activity/snatchTreasure/active/list", {}, (res: any) => {
				console.log(res);
				
				this.personJoinList = res.list || [];
			});
		}
		//完成任务
		completeTask(item: any) {
			console.log('任务完成==》activity/snatchTreasure/luckyGas/get/' + item.id)
			app.http.Post("activity/snatchTreasure/luckyGas/get/" + item.id, {}, (res: any) => {
				console.log(res)
				//更新最新欧气值
				this.getTaskList()
				this.closeAll()
			});
		}
		closeAll() {
			this.luckyGasModalShow = false
			this.showDrawer = false
			this.oqModalShow = false
		}
		//tag切换
		tagChange(item: any, index: number) {
			this.tag.index = index;
			this.queryParams.pageIndex = 1;
			this.queryParams.tp = item.value;
			this.reqNewData();
		}
		pageJump(url: string = "") {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
		//获取夺宝列表
		reqNewData() {
			app.http.Get(
				"activity/snatchTreasure/list",
				this.queryParams,
				(res: any) => {
					this.totalPage = res.totalPage || 0;
					const arr = res.list || [];
					if (this.queryParams.pageIndex === 1) this.lootList = [];
					this.lootList = [...this.lootList, ...arr];
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #060505;
	}

	.topBanner {
		width: 750rpx;
		height: 525rpx;
		background-size: 100% 100%;
		background-image: url("../../../static/act/loot/banner.png");
		position: relative;

		.rightFloatItem {
			position: absolute;
			right: 21rpx;
			background-size: 100% 100%;
			background-image: url('../../../static/act/loot/myPirce.png');
			top: 44rpx;
			width: 93rpx;
			height: 25rpx;
			z-index: 4;
			font-size: 19rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 400;
			text-align: right;
			line-height: 25rpx;
			color: #FFFFFF;
			white-space: nowrap;

			text {
				padding-right: 28rpx;
			}


		}

		.rollContent {
			width: 750rpx;
			position: absolute;
			height: 38rpx;
			top: 456rpx;
			overflow: hidden;

			.rollHidden {
				display: flex;
				flex-wrap: nowrap;
				height: 38rpx;
				position: absolute;

				.rollItem {
					// width: 306rpx;
					height: 38rpx;
					background-size: 100% 100%;
					background-image: url('../../../static/act/loot/green.png');
					margin-left: 14rpx;
					display: flex;
					align-items: center;
					flex-wrap: nowrap;

					image {
						display: block;
						width: 28rpx;
						height: 28rpx;
						border-radius: 50%;
						margin-left: 12rpx;
						margin-right: 14rpx;
					}

					.name {
						font-size: 25rpx;
						font-family: Alibaba PuHuiTi;
						font-weight: 400;
						color: #FFFFFF;
						max-width: 250rpx;
						margin-right: 12rpx;
					}
				}
			}
		}

		.rule {
			top: 90rpx;
			width: 123rpx;
			background-image: url('../../../static/act/loot/rule.png');
		}
	}

	.tagContent {
		display: flex;
		flex-wrap: nowrap;
		margin-top: 24rpx;

		.tagItem {
			font-size: 33rpx;
			font-family: FZLanTingHeiS-R-GB;
			font-weight: 400;
			color: #ffffff;
			position: relative;
			width: 33.33%;
			text-align: center;
			transition: all 0.3s;
			letter-spacing: 1rpx;

			image {
				width: 68rpx;
				height: 53rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%) scale(0);
				transition: all 0.3s;
			}
		}

		.selectTagItem {
			color: #89f756;
			font-weight: bold;

			image {
				transform: translate(-50%, -50%) scale(1);
			}
		}
	}

	.prizeContent {
		padding: 0 14rpx;
		margin-top: 28rpx;

		.prizeItem {
			height: 228rpx;
			background-size: 100% 100%;
			background-image: url("../../../static/act/loot/block7.png");
			margin-bottom: 18rpx;
			padding: 0rpx 12rpx;
			display: flex;
			align-items: center;
			position: relative;

			.bigPrize {
				background-size: 100% 100%;
				background-image: url("../../../static/act/loot/bigPrize.png");
				width: 120rpx;
				height: 28rpx;
				font-size: 19rpx;
				line-height: 28rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #ffffff;
				z-index: 1;
				position: absolute;
				left: 0;
				top: 0;
				text-align: right;

				text {
					text-align: right;
					padding-right: 13rpx;
				}
			}

			.prize-left {
				width: 209rpx;
				height: 209rpx;
				margin-right: 30rpx;
			}

			.prize-right {
				// margin-top: ;
				width: 470rpx;
				// background-color: red;
				height: 209rpx;
				.title {
					font-size: 29rpx;
					font-family: FZLanTingHeiS-R-GB;
					font-weight: 500;
					color: #333333;
					margin-bottom: 13rpx;
					// margin-top: 20rpx;
				}

				.probability {
					font-size: 25rpx;
					font-family: FZLanTingHeiS-R-GB;
					font-weight: 400;
					color: #88878c;
					margin-bottom: 13rpx;
				}

				.progressContent {
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;

					.progress {
						width: 343rpx;
						height: 9rpx;
						background-size: 100% 100%;
						background-image: url("../../../static/act/loot/progress.png");
						position: relative;
						display: flex;
						justify-content: flex-end;

						.maskPro {
							height: inherit;
							background-color: #fff;
						}
					}

					.contrast {
						font-size: 23rpx;
						font-family: FZLanTingHeiS-R-GB;
						font-weight: 400;
						color: #88878c;
					}
				}

				.actionContent {
					justify-content: flex-end;
					align-items: center;

					.actionButton {
						background-size: 100% 100%;
						font-family: FZLanTingHeiS-R-GB;
						font-weight: 400;
						text-align: center;
						line-height: 55rpx;
						height: 55rpx;
						width: 170rpx;
						font-size: 27rpx;
					}

					.whiteBtn {
						border: 2rpx solid rgba(136, 135, 140, 0.4);
						height: 52rpx;
						line-height: 52rpx;
						border-radius: 4rpx;
						color: #88878c;
					}

					.blackBtn {
						background-image: url("../../../static/act/loot/blackBtn.png");
						color: #89f756;
						margin-left: 17rpx;
					}
				}
			}
		}
	}


	.luckyGasModal {
		position: fixed;
		background-color: #fff;
		top: 433rpx;
		width: 523rpx;
		left: 0;
		right: 0;
		margin: auto;
		height: 369rpx;
		z-index: 999;
		transition: all 0.3s;
		opacity: 0;
		pointer-events: none;
		transform: scale(0);

		.title {
			font-size: 38rpx;
			font-family: FZLanTingHeiS-B-GB;
			font-weight: bolder;
			color: #333333;
			// margin: 0 auto;
			width: 100%;
			text-align: center;
			margin-top: 48rpx;
		}

		.counterModal {
			background-size: 100% 100%;
			background-image: url("../../../static/act/loot/counterModal.png");
			width: 442rpx;
			height: 102rpx;
			margin: 0 auto;
			margin-top: 35rpx;
			align-items: center;
			justify-content: space-evenly;

			image {
				display: block;
			}

			.line {
				width: 4rpx;
				height: 73rpx;
			}

			.reduce {
				width: 39rpx;
				height: 7rpx;
			}

			.add {
				width: 38rpx;
				height: 38rpx;
			}

			.center {
				text-align: center;
				width: 35%;

				.number {
					font-size: 38rpx;
					font-family: FZLanTingHeiS-B-GB;
					font-weight: bolder;
					color: #333333;
				}
			}
		}

		.text {
			font-size: 21rpx;
			font-family: FZLanTingHeiS-B-GB;
			font-weight: 400;
			color: #88878c;
		}

		.btn {
			height: 50rpx;
			font-size: 25rpx;
			font-family: FZLanTingHeiS-R-GB;
			font-weight: 400;
			color: #ffffff;
			text-align: center;
			line-height: 25rpx;
			width: 300rpx;
			background-color: #ff0016;
			margin: 0 auto;
			letter-spacing: 2rpx;
			line-height: 50rpx;
		}
	}

	.showLuck {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.oqModal {
		width: 565rpx;
		height: 387rpx;
		border-radius: 4rpx;
		position: fixed;
		top: 441rpx;
		left: 0;
		right: 0;
		margin: auto;
		background-color: #fff;
		z-index: 220;
		transform: scale(0);
		transition: all 0.3s;
		pointer-events: none;
		font-family: Alibaba PuHuiTi;

		.title {
			font-size: 33rpx;

			font-weight: bold;
			color: #333333;
			text-align: center;
			margin-top: 32rpx;
		}

		.oqCodeScroll {
			width: 90%;
			margin: 0 auto;
			height: 240rpx;
			margin-top: 35rpx;

			.codeContent {
				display: flex;
				flex-wrap: wrap;

				.codeItem {
					text-align: center;
					width: 20%;
					font-size: 21rpx;

					font-weight: 400;
					color: #333333;
					margin-bottom: 18rpx;
				}
			}

		}
	}

	.showOpModal {
		transform: scale(1);
		pointer-events: auto;
	}

	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 200;
	}



	.drawerCard {
		width: 750rpx;
		height: 685rpx;
		background-color: #fff;
		position: fixed;
		transition: all 0.3s;
		z-index: 1000;
		bottom: -1500rpx;
		opacity: 0;
		// bottom: -500rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		// visibility: hidden;


		.title {
			font-size: 38rpx;
			font-family: FZLanTingHeiS-B-GB;
			font-weight: bolder;
			color: #333333;
			align-items: center;
			margin-top: 46rpx;
		}

		.taskContent {
			padding: 0 21rpx;
			margin-top: 40rpx;
			font-family: FZLanTingHeiS-R-GB;

			.taskItem {
				display: flex;
				align-items: center;
				margin-bottom: 44rpx;

				.taskIcon {
					width: 65rpx;
					height: 65rpx;
					margin-right: 16rpx;
				}

				.taskTips {
					align-items: center;
					flex: 1;

					&-top {
						font-size: 29rpx;

						font-weight: 400;
						color: #333333;
						align-items: center;

						.loop {
							font-size: 20rpx;

							font-weight: 400;
							color: #ffffff;
							text-align: center;
							width: 100rpx;
							height: 25rpx;
							line-height: 25rpx;
							background-color: #ff0016;
							margin-right: 12rpx;
						}
					}

					&-bottom {
						font-size: 25rpx;

						font-weight: 400;
						color: #f5162b;
					}
				}

				.taskButton {
					height: 40rpx;
					line-height: 40rpx;
					font-size: 27rpx;
					font-family: FZLanTingHeiS-R-GB;
					font-weight: 400;
					color: #89f756;
					text-align: center;
					background-size: 100% 100%;
					background-image: url("../../../static/act/loot/blackBtn.png");
					width: 127rpx;
					text-align: center;
				}

				.noneTaskButton {
					color: #fff;
					background-image: url("../../../static/act/loot/grayBlock.png");
				}
			}
		}
	}

	.showDrawerCard {
		bottom: 0;
		opacity: 1;
	}

	.showAn {
		bottom: 0;
		visibility: visible;
	}

	.noneBlock {
		width: 750rpx;
		height: 102rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #060505;
	}

	.bottomBlock {
		width: 750rpx;
		position: fixed;
		background-color: #fff;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		position: fixed;
		bottom: 0;
		z-index: 3;
		letter-spacing: 2rpx;

		.bootomBlock-content {
			width: 94%;
			margin: 0 auto;
			height: 102rpx;
			justify-content: space-between;
			align-items: center;
			display: flex;

			.myEg {
				font-size: 29rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #333333;
				align-items: center;
				display: flex;

				text {
					display: block;
				}
			}

			.getEq {
				background-size: 100% 100%;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				text-align: center;
				line-height: 67rpx;
				height: 67rpx;
				width: 263rpx;
				background-image: url("../../../static/act/loot/blackBtn.png");
				color: #89f756;
				// margin-left: 17rpx;
			}
		}
	}

	.close {
		width: 29rpx;
		height: 27rpx;
		position: absolute;
		top: 21rpx;
		right: 21rpx;
	}
</style>
