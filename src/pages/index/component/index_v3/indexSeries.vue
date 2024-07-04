<!--
 * @FilePath: \jichao_app_2\src\pages\index\component\index_v3\indexSeries.vue
 * @Author: wjw
 * @Date: 2024-06-25 14:28:26
 * @LastEditors: 
 * @LastEditTime: 2024-06-28 11:04:11
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<div v-if="list.length">
		<u-scroll-list class="scroll-box" :indicator="false" scroll-x="true">
			<div class="scroll-item" v-for="(item,index) in list" :key='index' @click="clickSeries(item)">
				<image class="series-logo" :src="decodeURIComponent(item.icon)" mode="aspectFit"/>
				<text class="series-name u-line-1" :class="{'current-series':seriesId==item.id}">{{item.name}}</text>
			</div>
		</u-scroll-list>
	</div>
</template>
<script >
	const app = getApp().globalData.app;
	export default {
		props: {
			seriesId:{
				type:Number|null,
				default:null
			}
		},
		data(){
			return {
				list:[]
			}
		},
		mounted(){
			app.http.Get(
				"dataApi/advertising/iconSeries/list", {
					fetchFrom: 1,
					fetchSize: 100,
					tp:1
				},
				(res) => {
					this.list = res.list || [];
				}
			);
		},
		methods: {
			clickSeries(item){
				this.$emit('update:seriesId',item.id==this.seriesId?null:item.id)
				this.$emit('onSeries')
			}
		}
	}
</script>

<style scoped lang="scss">
	@mixin flexCenter{
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
	}
	.scroll-box {
		width: 750rpx;
		padding:0 35rpx;
		height: 160rpx;
		white-space: nowrap;
		@include flexCenter;
		padding-top: 10rpx;
	}
	.scroll-item {
		width: 100rpx;
		height: 140rpx;
		@include flexCenter;
		display: inline-flex;
		margin-right: 60rpx;
		flex-wrap: wrap;
	}
	.series-logo {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 15rpx;
	}
	.series-name {
		width: 100rpx;
		font-size: 22rpx;
		color: #333333;
		text-align: center;
	}
	.current-series{
		color:#FA1545
	}
</style>
