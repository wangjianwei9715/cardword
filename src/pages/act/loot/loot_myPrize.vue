<template>
	<view>
		<empty v-if='prizeList&&!prizeList.length'></empty>
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
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		queryParams: any = {
			pageIndex: 1,
			pageSize: 20,
		};
		prizeList: any= [];
		totalPage: number = 0;
		onLoad() {
			this.reqNewData()
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1
				this.reqNewData()
			}
		}
		onPullDownRefresh(){
			this.queryParams.pageIndex=1
			this.reqNewData()
		}
		//我的奖品
		reqNewData() {
			app.http.Get('snatchTreasure/myPrize', this.queryParams, (res: any) => {
				this.totalPage = res.totalPage || 0
				const arr = res.list || []
				if (this.queryParams.pageIndex === 1) this.prizeList = [];
				this.prizeList = [...this.prizeList, ...arr];
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 500)
			})
			// uni.stopPull
		}
	}
</script>

<style lang="scss" scoped>
</style>
