<template>
	<view>
		<view class="staticContent">
			<view class="rollContent" id='rollContent'>
				<view class="rollItem" v-for="(item,index) in 20">
					<image src="../../../static/act/loot/banner.png" mode="aspectFill">
					</image>
					<text>{{index}}</text>
				</view>
				<view class="rollItem" v-for="(item,index) in 20">
					<image src="../../../static/act/loot/banner.png" mode="aspectFill">
					</image>
					<text>{{index}}</text>
				</view>
			</view>
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
		Vue,
		Watch
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		dateFormatMSHMS
	} from '@/tools/util.ts'
	@Component({})
	export default class ClassName extends BaseComponent {
		queryParams: any = {
			tp: 1 //1 今日榜单数据，2 总榜数据
		};
		tag: any = {
			index: 0,
			list: [{
				name: '今日榜单',
				value: 1
			}, {
				name: '积分总榜',
				value: 2
			}]
		}
		awardList: any = []; //奖品列表
		myData: any = {}; //个人rank数据
		rankList: any = [];
		onLoad() {
			this.$nextTick(() => {
				const query: any = uni.createSelectorQuery().in(this);
				query.select('#rollContent').boundingClientRect((data: any) => {
					console.log(data.width)
				}).exec();
			})
		}
		tagChange(item: any, index: number) {
			this.tag.index = index
			this.queryParams.tp = item.value
			this.reqNewData(false)
		}
		//获取rank榜以及个人rank数据
		reqNewData(isRefreshAward: boolean = true) {
			app.http.Get(
				"activity/goodNoShowGoldValue/home",
				this.queryParams,
				(res: any) => {
					this.rankList = res.rankingList || []
					if (isRefreshAward) this.awardList = res.awardList || []
					this.myData = res.myData || {}
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style lang="scss">
	.staticContent {
		width: 100%;
		// overflow: hidden;
		position: relative;
		height: 300rpx;
		// overflow-y: auto;

		@keyframes rowup {
			0% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}

			100% {
				-webkit-transform: translate3d(-4400rpx, 0, 0);
				transform: translate3d(-4400rpx, 0, 0);
			}
		}

		.rollContent {
			position: absolute;
			display: flex;
			-webkit-animation: 40s rowup linear infinite normal;
			animation: 40s rowup linear infinite normal;

			.rollItem {
				// display: flex;
				flex-wrap: nowrap;

				image {
					margin-right: 20rpx;
					display: block;
					width: 200rpx;
					height: 200rpx;
					margin-bottom: 10rpx;
				}

				color: #000000;
				text-align: center;
			}
		}


	}
</style>
