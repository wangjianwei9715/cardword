<template>
	<div v-if="list.length">
		<u-scroll-list class="scroll-box" :indicator="false" scroll-x="true">
			<div class="scroll-item" v-for="(item,index) in list" :key='index' @click="clickSerie(item)">
				<image class="series-logo" :src="decodeURIComponent(item.icon)" mode="aspectFit"/>
				<text class="series-name u-line-1">{{item.name}}</text>
			</div>
		</u-scroll-list>
	</div>
</template>

<script >
	const app = getApp().globalData.app;
	export default {
		data(){
			return {
				list:[]
			}
		},
		mounted(){
			app.http.Get('dataApi/advertising/iconSeries/brief',{},(res)=>{
				this.list = res.list
			})
		},
		methods: {
			clickSerie(item){
				
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
</style>
