<template>
	<view>

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
			this.reqNewData(true)
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
</style>
