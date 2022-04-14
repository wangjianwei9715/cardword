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
		rewardList: any = [];
		queryParams: any = {
			tp: 1
		}
		onLoad() {
			this.reqNewData()
		}
		//奖励列表
		reqNewData(isRefreshAward: boolean = true) {
			app.http.Get(
				"activity/goodNoShowGoldValue/prize/list",
				this.queryParams,
				(res: any) => {
					this.rewardList = res.list || []
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style>
</style>
