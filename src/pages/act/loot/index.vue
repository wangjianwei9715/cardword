<template>
	<!-- 夺宝主页 -->
	<view>
		<view class="topBanner">
			<image src="../../../static/act/loot/banner.png" class="bannerImg" mode=""></image>
			<view class="rightFloatItem" @click="ruleShow=true"><text>规则</text></view>
			<view class="rightFloatItem rule" @click="toMyPrize"><text>我的奖品</text></view>
			<view class="rollContent" id='rollContent'>
				<view class="rollHidden" id='rollHidden' ref='rollHidden' :class="{rollAnimation:rollAnimation}"
					:style="{transform:`translate3d(${rollX}px,0,0)`}">
					<view class="rollItem" :class="{getAewRollItem:item.tp===2}" v-for="item in personJoinList">
						<image
							:src="item.userAvatar?decodeURIComponent(item.userAvatar):defaultAvatar"
							mode=""></image>
						<view class="name oneLineOver">{{item.tp===2?'获得了':'加入了'}}{{item.name}}</view>
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
					<image src="../../../static/act/loot/bigPirze_icon.png" mode=""></image>
					<text>欧皇大奖</text>
				</view>
				<image class="prize-left" :src='decodeURIComponent(item.award_pic)' mode='aspectFill'></image>
				<view class="prize-right">
					<view class="title oneLineOver">{{item.name}}</view>
					<view class="probability publicText uni-flex" v-if="item.status==1">
						<text>{{dateFormatMSHMS(item.stopData.open_at)}}开奖</text>
						<view class="getUserInfo">
							<image :src="item.stopData.userAvatar?decodeURIComponent(item.stopData.userAvatar):defaultAvatar" mode=""></image>
							<view class="name publicText">
								{{item.stopData.userName}} 中奖
							</view>
						</view>
					</view>
					<view class="probability publicText">
						{{item.status==0?`1欧气=${item.goData.getOdds}%中奖率`:`${item.take_num}/${item.total_num} 已结束`}}
					</view>
					<view class="progressContent uni-flex" v-if='item.status==0'>
						<view class="progress">
							<view class="maskPro publicText"
								:style="{width:(100-getPlan(item.take_num,item.total_num))+'%'}">
							</view>
						</view>
						<view class="contrast publicText">{{item.take_num}}/{{item.total_num}}</view>
					</view>
					<view class="actionContent uni-flex" :class="{between:item.status===1,flexEnd:item.status===0}">
						<view class="stopTemp-code" v-if="item.status===1">
							<view style="font-size: 22rpx;">开奖码</view>
							<view class="stopCode">{{item.stopData.openCode}}</view>
						</view>
						<view class="actionButton whiteBtn" @click="handleGetOq(item,true)">我的欧气码</view>
						<view class="actionButton blackBtn" @click="handleJoin(item,index)" v-if="item.status===0">1欧气参与
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="noneBlock"></view>
		<view class="bottomBlock">
			<view class="bootomBlock-content">
				<view class="myEg">
					<text style="margin-right: 12rpx;">我的欧气</text>
					<text
						style="color: #E23369;font-weight: bolder;font-size: 42rpx;font-family: Alibaba PuHuiTi;">{{luckyGas}}</text>
				</view>
				<view class="getEq" @click="getOq">获取欧气</view>
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
					<template v-if='taskTipsList[item.id]'>
						<image class="taskIcon" :src="`../../../static/act/loot/${taskTipsList[item.id].pic}`" mode="">
						</image>
						<view class="taskTips">
							<view class="taskTips-top uni-flex">
								<view class="loop" v-if="item.id==5">循环任务</view>
								{{item.taskName}}
							</view>
							<view class="taskTips-bottom">欧气+{{item.taskReward}}</view>
						</view>
						<view class="taskButton" :class='{noneTaskButton:item.isUse===1}'
							@click="handleTask(item,index)">
							{{item.isUse===1?'明日再来':taskTipsList[item.id].tips}}
						</view>
					</template>
				</view>
			</view>
		</view>
		<!-- 欧气值计数器弹窗 -->
		<view class="luckyGasModal" :class="{showLuck:luckyGasModalShow}">
			<image src="../../../static/act/loot/close.png" class="close" mode="" @click="luckyGasModalShow=false">
			</image>
			<view class="title">获取欧气码</view>
			<view class="counterModal uni-flex">
				<view @click="luckAction('reduce')" class="clickable">
					<image class="reduce" src="../../../static/act/loot/-.png"></image>
				</view>
				<image class="line" src="../../../static/act/loot/line.png"></image>
				<view class="center">
					<view class="number uni-flex">
						<input type="number" @input="luckGayInput" v-model="consumeLuckGas">
					</view>
					<view class="text oneLineOver">消耗{{consumeLuckGas}}欧气</view>
				</view>
				<image class="line" src="../../../static/act/loot/line.png"></image>
				<view class="clickable" @click="luckAction('add')">
					<image class="add" src="../../../static/act/loot/+.png"></image>
				</view>
			</view>
			<view class="text" style="text-align: center;margin: 20rpx auto;">参与次数越多，夺宝概率越大</view>
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
		<!-- 规则弹窗-->
		<view class="ruleModal" v-show="ruleShow">
			<image src="../../../static/act/loot/close.png" class="close" mode="" @click="ruleShow=false">
			</image>
			<view class="title">活动规则</view>
			<text>
				1、活动期间2022.4.24-2022.5.24，玩家消耗欧气可获取欧气码参与夺宝，欧气进度满后将随机生成一组开奖码，与开奖码匹配的用户获得奖品
				2、每个夺宝奖品参与次数不限，参与欧气越多中奖概率越高
				3、玩家完成任务可获得欧气，任务每日更新，可点击“获取欧气“查看
				4、活动期间，奖品不定期更新
				5、优惠券类奖品自动发放，实物类奖品请中奖用户联系客服发货
			</text>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-show="showDrawer || luckyGasModalShow || oqModalShow||ruleShow" @click="closeAll">
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
	import {
		dateFormatMSHMS,
		formatNumber,
		calculate
	} from '@/tools/util'

	@Component({})
	export default class ClassName extends BaseComponent {
		formatNumber: any = formatNumber;
		defaultAvatar = app.defaultAvatar;
		showDrawer: boolean = false; //任务弹窗
		operationShow: boolean = false;
		rollTimer: number = 0;
		rollX: any = 0;
		rollAnimation: boolean = true;
		rollWidth: number = 0;
		phoneWidth: number = 0;
		rollParams: any = {
			pageIndex: 1,
			pageSize: 20
		}
		ruleShow: boolean = false;
		rollTotalPage: number = 0;
		rollRequestTime: number = 0;
		dateFormatMSHMS: any = dateFormatMSHMS;
		calculate: any = calculate;
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
				url: "/pages/goods/goods_find_list?classType=100"
			},
			4: {
				pic: "group.png",
				tips: "去完成",
				url: "/pages/goods/goods_find_list?classType=100"
			},
			5: {
				pic: "order.png",
				tips: "去完成",
				url: "/pages/goods/goods_find_list?classType=100"
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
		joinConfirmTime: number = 0;
		queryParams: any = {
			pageIndex: 1,
			pageSize: 10,
			tp: 1 //1 进行中，2 已开奖，3 我的参与
		};
		codeList: any = [];
		codeTotalPage: number = 0;

		codeParams: any = {
			pageIndex: 1,
			pageSize: 50
		}
		isJoinSuccess: boolean = false;
		onLoad() {
			this.firstGetData()
		}
		onShow() {
			this.getTaskList();
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1;
				this.reqNewData();
			}
		}
		onPullDownRefresh() {
			this.firstGetData()
		}
		destroyed() {
			clearInterval(this.rollTimer)
		}
		firstGetData() {
			this.queryParams.index = 1
			this.reqNewData();
			this.getPersonJoin();
			this.getTaskList();

		}
		getPlan(now: number, all: number) {
			let width = Math.floor(Number(now) / Number(all) * 100);
			return width;
		}
		getRollParams() {
			return new Promise((resolve: any, reject: any) => {
				const query: any = uni.createSelectorQuery().in(this);
				let selectCoun = 0
				query.select('#rollContent').boundingClientRect((data: any) => {
					this.phoneWidth = data.width
					selectCoun += 1
				}).exec();
				query.select('#rollHidden').boundingClientRect((data: any) => {
					this.rollWidth = data.width
					selectCoun += 1
				}).exec();
				resolve()
			})
		}
		startRollInterval() {
			if (this.rollWidth < this.phoneWidth) return
			this.rollTimer && clearInterval(this.rollTimer)
			const errorValue: number = 1 //误差值
			this.rollAnimation = true
			this.rollTimer = setInterval(() => {
				this.rollX = calculate.sub(this.rollX, 14.30)
				if ((this.rollWidth + this.rollX - errorValue) <= this.phoneWidth) { //即将轮播完
					if (this.rollTotalPage == this.rollParams.pageIndex) {
						clearInterval(this.rollTimer)
						setTimeout(() => {
							this.rollAnimation = false
							this.rollX = 0 //数据已查完 
							this.startRollInterval()
						}, 1000)
					}
					if (this.rollTotalPage > this.rollParams.pageIndex) {
						this.rollParams.pageIndex += 1
						this.getPersonJoin()

					}
					// 
				}
			}, 505)
		}
		handleJoin(item: any, index: number) {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			if (this.luckyGas < 1) {
				this.showDrawer = true;
				uni.showToast({
					title: "欧气值不足,前去完成任务赚取欧气",
					icon: "none"
				});

				return;
			}
			this.selectItem = item;
			this.consumeLuckGas = 1
			this.luckyGasModalShow = true
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
		getOq() {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			this.showDrawer = true
		}
		//微信分享
		shareWx(item: any) {
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
				// href: 'http://192.168.8.26:8081/#/pages/loot/loot',
				href: 'https://www.ka-world.com/share/h5/#/pages/loot/loot',
				// miniProgram: {
				// 	id: "gh_5cf45dd26926",
				// 	type: 0,
				// 	path: "/pages/index/index",
				// 	webUrl: "https://www.ka-world.com/"
				// },
				success: (res: any) => {
					// this.getTaskList();

				},
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
				this.completeTask(item)
			}, 2000)
		}
		//计数器加减操作
		luckAction(type: string) {
			if (
				(+this.consumeLuckGas >= this.luckyGas && type === "add") ||
				(+this.consumeLuckGas === 1 && type === "reduce")
			)
				return;
			if (+this.consumeLuckGas >= (this.selectItem.total_num - this.selectItem.take_num) && type === "add") return
			let copyNum = +this.consumeLuckGas;
			copyNum = type == "add" ? copyNum + 1 : copyNum - 1;
			this.consumeLuckGas = copyNum;
		}
		//
		luckGayInput(event: any) {
			const residueNum = this.selectItem.total_num - this.selectItem.take_num
			if (Number(event.detail.value) > residueNum) {
				setTimeout(() => {
					this.consumeLuckGas = residueNum;
				}, 100);
				return
			}
			if (Number(event.detail.value) > this.luckyGas) {
				setTimeout(() => {
					this.consumeLuckGas = this.luckyGas;
				}, 100);
			}

		}
		//欧气码触底事件
		scrolltolower() {
			if (this.codeParams.pageIndex < this.codeTotalPage) {
				this.codeParams.pageIndex += 1

				this.handleGetOq(this.selectItem, false)
			}
		}
		handleGetOq(item: any, isRefsh: any = false) {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			if (item.luckyGasCodeNum == 0) {
				uni.showToast({
					title: '你还没参与该活动',
					icon: 'none'
				})
				return
			}
			if (isRefsh) this.codeParams.pageIndex = 1
			this.selectItem = item;
			app.http.Get('activity/snatchTreasure/myLuckyGasCode/' + item.id, this.codeParams, (res: any) => {
				this.codeTotalPage = res.totalPage || 0
				const arr = res.list || [];
				if (this.codeParams.pageIndex === 1) this.codeList = [];
				this.codeList = [...this.codeList, ...arr];
				if (isRefsh) this.oqModalShow = true
			})

		}
		//参与夺宝
		joinConfirm() {
			if (+new Date() - this.joinConfirmTime <= 1000 * 1) return
			if (!this.consumeLuckGas) {
				uni.showToast({
					title: '请输入有效的欧气值',
					icon: 'none'
				})
				return
			}
			if (+this.consumeLuckGas > this.luckyGas) {
				uni.showToast({
					title: '您的欧气值不足',
					icon: 'none'
				})
				return
			}
			this.joinConfirmTime = +new Date()
			this.isJoinSuccess = false
			uni.showLoading({
				title: ''
			})
			app.http.Post('activity/snatchTreasure/active/' + this.selectItem.id, {
				luckyGasNum: +this.consumeLuckGas
			}, (res: any) => {
				this.isJoinSuccess = true
				uni.hideLoading()
				this.getTaskList()
				uni.showToast({
					title: '参与成功'
				})
				this.luckyGasModalShow = false
				this.queryParams.pageIndex = 1
				this.reqNewData()
			})
			setTimeout(() => {
				if (!this.isJoinSuccess) {
					this.queryParams.pageIndex = 1
					this.reqNewData()
					this.luckyGasModalShow = false
				}
			}, 3000)

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
			// if (+new Date() - this.rollRequestTime <= 1000 * 2) return
			// this.rollRequestTime = +new Date()
			app.http.Get("activity/snatchTreasure/active/list", this.rollParams, (res: any) => {
				this.rollTotalPage = res.totalPage || 0
				const arr = res.list || [];
				if (this.rollParams.pageIndex === 1) {
					this.personJoinList = arr;
					this.$nextTick(() => {
						setTimeout(() => {
							this.getRollParams().then(res => {
								this.startRollInterval()
							})
						}, 100)
					})
				}
				if (this.rollParams.pageIndex !== 1) {
					this.personJoinList.push(...arr)
					this.$nextTick(() => {
						this.getRollParams()
					})
				}
			});
		}
		//完成任务
		completeTask(item: any) {
			app.http.Post("activity/snatchTreasure/luckyGas/get/" + item.id, {}, (res: any) => {
				//更新最新欧气值
				this.getTaskList()
				this.closeAll()
			});
		}
		closeAll() {
			this.luckyGasModalShow = false
			this.showDrawer = false
			this.oqModalShow = false
			this.ruleShow = false
		}
		//tag切换
		tagChange(item: any, index: number) {
			if (this.tag.index == index) return
			this.tag.index = index;
			this.queryParams.pageIndex = 1;
			this.queryParams.tp = item.value;
			this.reqNewData();
		}
		toMyPrize() {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/act/loot/loot_myPrize'
			});
		}
		pageJump(url: string = "") {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
		//获取夺宝列表
		reqNewData() {
			if (app.token.accessToken == "" && this.queryParams.tp == 3) {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
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


	.clickable {
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.topBanner {
		width: 750rpx;
		height: 525rpx;
		background-size: 100% 100%;
		// background-image: url("../../../static/act/loot/banner.png");
		position: relative;

		.bannerImg {
			width: 750rpx;
			height: 525rpx;
			position: absolute;
			top: 0;
			left: 0;
		}

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
			font-family: PingFangSC-Regular;
			font-weight: 400;
			text-align: right;
			line-height: 25rpx;
			color: #FFFFFF;
			white-space: nowrap;

			text {
				padding-right: 30rpx;
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
					display: block;
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
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #FFFFFF;
						max-width: 250rpx;
						margin-right: 12rpx;
					}
				}

				.getAewRollItem {
					background-image: url('../../../static/act/loot/pinkBlock.png');
				}
			}

			.rollAnimation {
				transition: transform 0.5s linear;
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
			font-family: PingFangSC-Regular;
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
			height: 238rpx;
			background-size: 100% 100%;
			background-image: url("../../../static/act/loot/block7.png");
			margin-bottom: 18rpx;
			padding: 0rpx 12rpx;
			display: flex;
			align-items: center;
			position: relative;

			.bigPrize {
				background-size: 100% 100%;
				background-image: url("../../../static/act/loot/bigPirze_back.png");
				width: 143rpx;
				height: 34rpx;
				font-size: 23rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #FFFFFF;
				// line-height: 34rpx;
				z-index: 1;
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
				align-items: center;

				image {
					width: 25rpx;
					height: 21rpx;
					display: block;
					margin-left: 7rpx;
					// position: absolute;
					// left: 7rpx;
					// top: 6rpx;
				}

				text {
					margin-left: 7rpx;
					display: block;
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
					font-family: PingFangSC-Regular;
					font-weight: 500;
					color: #333333;
					margin-bottom: 10rpx;
					margin-top: 8rpx;
				}

				.publicText {
					font-size: 23rpx;
					font-family: FZLanTingHeiS-R-GB;
					font-weight: 400;
					color: #88878c;
				}

				.probability {
					margin-bottom: 13rpx;
					align-items: center;
					justify-content: space-between;

					.getUserInfo {
						display: flex;
						align-items: center;

						image {
							width: 40rpx;
							height: 40rpx;
							display: block;
							margin-right: 10rpx;
							border-radius: 50%;
						}
					}
				}

				.progressContent {
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;

					.progress {
						width: 330rpx;
						height: 9rpx;
						background-size: 100% 100%;
						background-image: url("../../../static/act/loot/progress.png");
						position: relative;
						display: flex;
						justify-content: flex-end;

						.maskPro {
							height: inherit;
							background-color: #F6F7FB;
						}
					}
				}

				.actionContent {
					// justify-content: flex-end;
					align-items: center;
					position: relative;
					bottom: 0rpx;

					.stopTemp-code {
						display: flex;
						align-items: center;
						letter-spacing: 2rpx;

						.stopCode {
							color: #89f756;
							background-color: black;
							text-align: center;
							border-radius: 4rpx;
							padding: 0 10rpx;
							margin-left: 6rpx;
						}
					}

					.actionButton {
						background-size: 100% 100%;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 55rpx;
						height: 55rpx;
						width: 170rpx;
						font-size: 27rpx;
					}

					.whiteBtn {
						background-image: url("../../../static/act/loot/newWhite.png");
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
		top: 403rpx;
		width: 523rpx;
		left: 0;
		right: 0;
		margin: auto;
		height: 449rpx;
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
			height: 142rpx;
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

				.number input {
					font-size: 38rpx;
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
			height: 60rpx;
			font-size: 29rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			line-height: 25rpx;
			width: 300rpx;
			background-size: 100% 100%;
			background-image: url("../../../static/act/loot/blackBtn.png");
			margin: 0 auto;
			color: #89f756;
			// margin-top: 30rpx;
			letter-spacing: 2rpx;
			line-height: 60rpx;
		}
	}

	.showLuck {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.oqModal {
		width: 565rpx;
		height: 417rpx;
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
		font-family: PingFangSC-Regular;

		.title {
			font-size: 33rpx;
			font-family: PingFangSC-Medium;
			font-weight: bold;
			color: #333333;
			text-align: center;
			margin-top: 32rpx;
		}

		.oqCodeScroll {
			width: 90%;
			margin: 0 auto;
			height: 260rpx;
			margin-top: 35rpx;

			.codeContent {
				display: flex;
				flex-wrap: wrap;

				.codeItem {
					text-align: center;
					width: 20%;
					font-size: 28rpx;

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

	.ruleModal {
		width: 500rpx;
		height: 600rpx;
		background-color: #fff;
		position: fixed;
		top: 400rpx;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 201;
		padding: 0 40rpx;
		overflow-y: auto;

		.title {
			font-size: 33rpx;

			font-weight: bold;
			color: #333333;
			text-align: center;
			margin-top: 32rpx;
			margin-bottom: 24rpx;
		}

		text {
			line-height: 40rpx;
		}
	}

	.drawerCard {
		width: 750rpx;
		height: calc(750rpx + constant(safe-area-inset-bottom));
		height: calc(750rpx + env(safe-area-inset-bottom));
		background-color: #fff;
		position: fixed;
		transition: all 0.3s;
		z-index: 1000;
		bottom: -1500rpx;
		opacity: 0;
		// bottom: -500rpx;
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);

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
			font-family: PingFangSC-Regular;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			.taskItem {
				display: flex;
				align-items: center;
				margin-bottom: 44rpx;

				.taskIcon {
					width: 70rpx;
					height: 70rpx;
					margin-right: 16rpx;
				}

				.taskTips {
					flex: 1;
					justify-content: space-between;
					flex-direction: column;
					display: flex;

					&-top {
						font-size: 29rpx;
						font-weight: 400;
						color: #333333;
						align-items: center;
						margin-bottom: 7rpx;

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
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #89f756;
					text-align: center;
					background-size: 100% 100%;
					background-image: url("../../../static/act/loot/blackBtn.png");
					width: 137rpx;
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
		height: 120rpx;
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
			height: 120rpx;
			justify-content: space-between;
			align-items: center;
			display: flex;

			.myEg {
				font-size: 29rpx;
				font-family: PingFangSC-Regular;
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
				font-family: PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 77rpx;
				height: 77rpx;
				width: 275rpx;
				background-image: url("../../../static/act/loot/bigBlock.png");
				color: #89f756;
				font-size: 33rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
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

	.between {
		justify-content: space-between;
	}

	.flexEnd {
		justify-content: flex-end;
	}
</style>
