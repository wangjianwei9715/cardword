<template>
	<view class="content">
		<u-popup :show="popupShow" @close="show=false" :round="5" :safeAreaInsetBottom="true">
			<view class="popup-box">
				<u-list height="1000rpx" >
					<u-list-item class="popup-listitem" v-for="(item, index) in seriesList" :key="index" >
						<view class="name">{{seriesName[index]}}</view>
						<view class="list">
							<view class="series-box" v-for="(seriesItem,seriesIndex) in item" :key="seriesIndex" @click="onClickSeries(seriesItem)">
								<muqian-lazyLoad class="seriesImg" :src="decodeURIComponent(seriesItem.icon)" mode="aspectFit"></muqian-lazyLoad>
								<view class="desc u-line-1">{{seriesItem.name}}</view>
							</view>
						</view>
					</u-list-item>
				</u-list>
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
	import { Component,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	class Params {
		fetchFrom=1;
		fetchSize=100;
		tp=0;
	}
	const seriesName = {
		1:"篮球",
		2:"足球"
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("popupShow",{type:Boolean})
		show!:Boolean

		seriesName=seriesName;
		seriesList:any = {
			1:[],
			2:[],
		};
		listParams = new Params();
		mounted(){
			this.getList();
		}
		destroyed(){
		}
		getList(){
			app.http.Get( 
				'dataApi/advertising/iconSeries/list', 
				this.listParams,
				({list}:any)=>{
					if(list){
						list.forEach((item:any) => {
							this.seriesList[item.sport_type].push(item)
						});
					};
				}
			)
		}
		onClickSeries(item:any){
			this.$emit('seriesChange',item.id);
			this.show=false;
		}
	}
</script>

<style lang="scss" scoped>
	.popup-box{
		width: 100%;
		height:1000rpx;
		.popup-listitem{
			width: 750rpx;
			margin:0 auto;
			color:#fff;
			box-sizing: border-box;
			padding:0 20rpx;
			.name{
				width: 100%;
				height:80rpx;
				text-align: center;
				line-height: 80rpx;
				color:#333;
				font-size: 32rpx;
				
				font-weight: 600;
			}
			.list{
				width: 100%;
				box-sizing: border-box;
			}
			.series-box{
				width: 164rpx;
				height:200rpx;
				margin-right: 18rpx;
				display: inline-flex;
				box-sizing: border-box;
				flex-wrap: wrap;
				justify-content: center;
			}
			.series-box:nth-child(4n){
				margin-right: 0;
			}
			.seriesImg{
				width: 130rpx;
				height:130rpx;
			}
			.desc{
				width: 100%;
				height:50rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				
				font-weight: 400;
				color: #333333;
				line-height: 50rpx;
				text-align: center;
			}
		}
	}

</style>