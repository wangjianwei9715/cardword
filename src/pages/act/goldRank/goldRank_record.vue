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
		recordList: any = [];
		queryParams: any = {
			day: ''
		}
		onLoad() {
			this.reqNewData()
		}
		//往期记录
		reqNewData(isRefreshAward: boolean = true) {
			app.http.Get(
				"activity/goodNoShowGoldValue/old/ranklist",
				this.queryParams,
				(res: any) => {
					this.recordList = res.rankingList || []
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
