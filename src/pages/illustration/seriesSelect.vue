<template>
	<view class="content">
		<view class="side-content">
			<view class="side-left">
				<view class="side-tab" :class="{'current':current==index}" v-for="(item,index) in sideTab" :key="index" @click="onClickTab(index)">{{item.name}}({{item.num}})</view>
			</view>
			<view class="side-right">
				<view class="right-box">
					<scroll-view :scroll-y="true" class="scroll-Y" :scroll-with-animation="true" >
						<view class="scroll-view-item" v-for="(item,index) in seriesList" :key="index">
							<view class="scroll-header">{{item.title}}</view>
							<view class="series-list">
								<view class="series-index" v-for="(litem,lindex) in item.list" :key="lindex" @click="onClickSeries(litem)">
									<view class="series-pic">
										<muqian-lazyLoad class="pic" borderRadius="3rpx" :src="decodeURIComponent(litem.logo||defaultSeriesLogo)" />
									</view>
									<view class="series-name">{{litem.name}}</view>
									<view class="series-percent">完整度{{litem.percent}}%</view>
								</view>
							</view>
							<view v-if="!item.isFetchEnd" class="scroll-more" @click="getSeriesMore(index)">
								更多<image class="arrow-bottom" src="@/static/illustration/arrow_bottom.png"/>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { illustration } from './constants/constants'
	@Component({})
	export default class ClassName extends BaseNode {
		defaultSeriesLogo = illustration.defaultSeriesLogo;
		sideTab = [];
		seriesList:any = [];
		current = 0;
		back = false;
		album = false;
		onLoad(query: any) {
			if(query.back) this.back = true;
			if(query.album) this.album = true;
			this.getYearList(()=>{
				this.getYearSportsSeries()
			})
		}
		public get currentItem() : any {
			return this.sideTab[this.current]
		}
		getYearList(cb?:Function){
			app.http.Get('dataApi/cardIllustration/list/year',{},({list}:any)=>{
				this.sideTab = list || [];
				cb?.()
			})
		}
		getYearSportsSeries(){
			app.http.Get('dataApi/cardIllustration/list/sports/series',{year:this.currentItem.name,fetchSize:9},({list}:any)=>{
				this.seriesList = list || []
			})
		}
		getSeriesMore(index:any){
			if(this.seriesList[index].isFetchEnd) return;
			uni.showLoading({ title: '加载中' });
			const params = {
				year:this.currentItem.name,
				sport:this.seriesList[index].sport,
				fetchFrom:this.seriesList[index].list.length+1,
				fetchSize:9
			}
			app.http.Get('dataApi/cardIllustration/list/series',params,(res:any)=>{
				this.seriesList[index].list = [...this.seriesList[index].list,...res.list];
				this.seriesList[index].isFetchEnd = res.isFetchEnd;
				setTimeout(() => {
					uni.hideLoading();
				}, 100);
			})
		}
		onClickTab(index:number){
			if(this.current===index)return;
			this.current = index;
			this.getYearSportsSeries()
		}
		onClickSeries(item:any){
			if(this.back){
				uni.$emit(`${this.album?"albumSelect":"seriesSelect"}`,{code:item.code,name:`${item.year} ${item.name}`});
				app.navigateTo.navigateBack()
			}else{
				uni.redirectTo({
					url: `seriesDetail?seriesCode=${item.code}`
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
        background:#F6F7F8;
    }
	.side-content{
		width: 100%;
		height:100%;
		position: absolute;
		left:0;
		top:0;
		box-sizing: border-box;
		overflow: hidden;
	}
	.side-left{
		width: 200rpx;
		height:100%;
		position: absolute;
		left:0;
		top:0;
		box-sizing: border-box;
		padding:20rpx 0;
		overflow: auto;
	}
	.side-right{
		width: 550rpx;
		height:100%;
		position: absolute;
		right:0;
		top:0;
		box-sizing: border-box;
		padding:20rpx 0;
	}
	.right-box{
		width: 100%;
		height:100%;
		background:#fff;
		border-radius: 3px 3px 0px 3px;
	}
	.side-tab{
		width: 100%;
		height:150rpx;
		text-align: center;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 150rpx;
	}
	.current{
		font-size: 29rpx;
		font-weight: 600;
		background: #fff;
		border-radius: 3px 0px 0px 3px;
	}
	.scroll-Y{
		width: 100%;
		height:100%;
	}
	.scroll-view-item{
		width: 100%;
		box-sizing: border-box;
		padding: 0 24rpx;
		padding-bottom: 30rpx;
		.scroll-header{
			width: 100%;
			height:80rpx;
			line-height: 85rpx;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			box-sizing: border-box;
			padding-left: 13rpx;
		}
		.series-list{
			width: 100%;
			display: flex;
			box-sizing: border-box;
			flex-wrap: wrap;
		}
		.series-index{
			width: 145rpx;
			height:200rpx;
			margin-right: 34rpx;
			margin-bottom: 36rpx;
		}
		.series-index:nth-child(3n){
			margin-right: 0;
		}
		.series-pic{
			width: 126rpx;
			height:126rpx;
			margin:0 auto;
			border-radius: 3rpx;
			background:$pic-bg;
			.pic{
				width: 126rpx;
				height:126rpx;
			}
		}
		.series-name{
			width: 100%;
			height:30rpx;
			margin-top: 9rpx;
			margin-bottom: 10rpx;
			line-height: 30rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			text-align: center;
		}
		.series-percent{
			width: 100%;
			text-align: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
		}
	}
	.scroll-more{
		width: 100%;
		height:30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #8D8D8D;
		margin-bottom: 30rpx;
	}
	.arrow-bottom{
		width: 21rpx;
		height:15rpx;
		margin-left: 7rpx;
	}
	
</style>
