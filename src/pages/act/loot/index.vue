<template>
	<!-- 夺宝主页 -->
	<view>
		<view class="tagContent">
			<view class="tagIcon" v-for="(item,index) in tag.list" :key='index'
				:class="{selectTagItem:index==tag.index}" @click="tagChange(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="rightFloatItem" @click="pageJump('/pages/act/loot/loot_myPrize')">我的奖品</view>
		<view class="bottomBlock">
			<view class="bootomBlock-content">
				<view class="myEg">
					<text>我的欧气</text><text>999</text>
				</view>
				<view class="getEq" @click="luckyGasModalShow=true">获取欧气</view>
			</view>
		</view>
		<!-- 任务弹窗 -->
		<view class="drawerCard" :class="showDrawer?'showAn':''">
			<image class="close" src="../../../static/pay/guanbi@2x.png" mode="widthFix" @click="showDrawer=false" />
			<view @click="goShare">去分享</view>
		</view>
		<!-- 欧气值计数器弹窗 -->
		<view class="luckyGasModal" :class="{showLuck:luckyGasModalShow}">
			<view class="reduce" @click="luckAction('reduce')">-</view>
			<view class="luckyGas" style="margin:0 10rpx">
				{{consumeLuckGas}}
			</view>
			<view class="add" @click="luckAction('add')">+</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-show="showDrawer || luckyGasModalShow" @click="luckyGasModalShow=false,showDrawer=false">
		</view>
		<!-- <share :operationShow='operationShow' :shareData='shareData'></share> -->
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
		tag: any = {
			index: 0,
			list: [{
				name: '进行中',
				value: 1
			}, {
				name: '已开奖',
				value: 2
			}, {
				name: '我参与的',
				value: 3
			}]
		}
		luckyGas: number = 10; //个人欧气值
		consumeLuckGas: number = 1; //消耗欧气值
		selectItem: any = {};
		personJoinList: any = []; //用户参与列表(气泡轮播)
		luckyGasModalShow: boolean = false;
		lootList: any = [];
		totalPage: number = 0;
		queryParams: any = {
			pageIndex: 1,
			pageSize: 20,
			tp: 1 //1 进行中，2 已开奖，3 我的参与
		}
		onLoad() {
			this.reqNewData()
			this.getPersonJoin()
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1
				this.reqNewData()
			}
		}
		//微信分享
		goShare() {
			uni.share({
				provider: 'weixin',
				type: 5,
				imageUrl: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/images/template/1638343271625m78pvyqzdn.png',
				title: '活动',
				scene: 'WXSceneSession',
				miniProgram: {
					id: 'gh_5cf45dd26926',
					type: 0,
					path: '/pages/index/index',
					webUrl: 'https://www.ka-world.com/'
				},
				success: (res: any) => {
					this.getTaskList()
				},
				fail: (err: any) => {
					console.log('失败原因=>', err)
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			})
		}
		//计数器加减操作
		luckAction(type: string) {
			if ((this.consumeLuckGas >= this.luckyGas && type === 'add') || (this.consumeLuckGas === 1 && type ===
					'reduce')) return
			let copyNum = this.consumeLuckGas
			copyNum = type == 'add' ? copyNum + 1 : copyNum - 1
			this.consumeLuckGas = copyNum
		}
		//获取任务列表以及个人欧气值
		getTaskList() {
			app.http.Get('activity/snatchTreasure/index', {}, (res: any) => {
				// this.luckyGas = res.luckyGasNum || 0
			})
		}
		//获取用户参与列表
		getPersonJoin() {

		}
		//完成任务
		completeTask(temp: any) {
			app.http.Post('activity/snatchTreasure/luckyGas/get', {}, (res: any) => {
				//更新最新欧气值
			})
		}
		//tag切换
		tagChange(item: any, index: number) {
			this.tag.index = index
			this.queryParams.pageIndex = 1
			this.queryParams.tp = item.value
			this.reqNewData()
		}
		pageJump(url: string = '') {
			if (!url) return
			uni.navigateTo({
				url
			})
		}
		//获取夺宝列表
		reqNewData() {
			app.http.Get('activity/snatchTreasure/list', this.queryParams, (res: any) => {
				this.totalPage = res.totalPage || 0
				const arr = res.list || []
				if (this.queryParams.pageIndex === 1) this.lootList = [];
				this.lootList = [...this.lootList, ...arr];
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 500)
			})
			// uni.stopPull
		}
	}
</script>

<style lang="scss" scoped>
	.tagContent {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;

		.tagItem {}

		.selectTagItem {}
	}

	.rightFloatItem {
		position: fixed;
		right: 0;
		top: 200rpx;
		z-index: 4;
	}

	.luckyGasModal {
		position: absolute;
		background-color: #fff;
		top: 500rpx;
		width: 650rpx;
		left: 0;
		right: 0;
		margin: auto;
		height: 300rpx;
		z-index: 999;
		transition: all 0.3s;
		opacity: 0;
		pointer-events: none;
		transform: scale(0);
	}

	.showLuck {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 200;
	}

	.drawerCard {
		width: 750rpx;
		height: 400rpx;
		background-color: #fff;
		position: absolute;
		transition: all 0.3s;
		z-index: 1000;
		// bottom: -500rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		visibility: hidden;

		.close {
			width: 30rpx;
			height: 30rpx;
		}
	}

	.showAn {
		bottom: 0;
		visibility: visible;
	}

	.bottomBlock {
		width: 750rpx;
		position: fixed;
		background-color: #fff;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		position: fixed;
		bottom: 0;
		// height: 200rpx;

		.bootomBlock-content {
			width: 88%;
			margin: 0 auto;
			height: 91rpx;
			justify-content: space-between;
			align-items: center;
			display: flex;
		}
	}
</style>
