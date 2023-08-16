<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<picker class="header-center" @change="bindPickerChange" :value="swiperIndex" :range="yearData">
					<view class="header-center">{{yearData[swiperIndex]}}年<view class="icon-down"></view></view>
				</picker>
			</view>
			<view class="header-scroll-content">
				
				<scroll-view class="header-scroll" :scroll-left="scrollLeftPx" :scroll-x="true" @scroll="onChangeSrcoll">
					<view class="scroll-index" v-for="(items,index) in 12" :key="index" @click="onClickScrollIndex(items)">
						<view class="scroll-month" :class="monthIndex == items?'current-month':''"><text>{{items}}</text>月</view>
					</view>
				</scroll-view>
					
				
			</view>
			<view class="header-tab">
				<u-tabs class="goods-tabs" :list="orderTab" :current="orderTabCheck" lineHeight="0" @click="onClickListTabs" 
					:inactiveStyle="{fontSize:'27rpx',color:'#959695',padding:'0 6rpx'}"
					:activeStyle="{fontSize:'33rpx',color:'#333333',fontWeight:600,padding:'0 6rpx'}"
				></u-tabs>
			</view>
		</view>

		<view class="good-list">
			<statusbar/>
			<view v-show="calendaList!=''" class="goods-box">
				<view class="goods-index" v-for="(item,index) in calendaList" :key="index" >
					<view v-if="index==0 || (index>0 && getDateFormatS(item.public_day)!=getDateFormatS(calendaList[index-1].public_day))" class="goods-month">{{getDateFormatS(item.public_day)}}</view>
					<muqian-lazyLoad class="goods-pic" @click="onClickGoDetail(item,index)" :src="decodeURIComponent(item.pic_cover)" >
					</muqian-lazyLoad>
					<view class="goods-right">
						<view class="goods-right-desc" @click="onClickGoDetail(item,index)">
							<view class="goods-desc-title">{{item.title}}</view>
							<view class="goods-desc-title-little">
								<view class="gray-desc">{{item.title_little}}</view>
								<view v-if="item.sellNum>0" class="gray-desc desc-dian"><text>{{item.sellNum}}在售</text></view>
							</view>
						</view>
						<view class="goods-right-box">
							<view :class="item.isLikes?'goods-right-like-current':'goods-right-like'" @click="onClickLikeCalendar(index)"></view>
							<view class="goods-right-text">{{item.likes>0?item.likes:''}}</view>
						</view>
					</view>
				</view>
			</view>
			<empty v-show="calendaList==''&&!httpIng" />
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	//@ts-ignore
	import KwwConfusion from "@/net/kwwConfusion.js"
	@Component({})
	export default class ClassName extends BaseNode {
		kwwConfusion = new KwwConfusion()
		windowWidth = 0;
		monthScrollLeft = 0;
		scrollLeftPx = 0;
		orderTab = [
			{id:100,name:'全部'},
			{id:1,name:'篮球'},
			{id:2,name:'足球'},
			{id:3,name:'棒球'},
			{id:4,name:'橄榄球'},
			{id:0,name:'其它'}
		];
		orderTabCheck = 0;
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		calendaList:{[x:string]:any} = [];
		swiperIndex = 3;
		yearData = [
			2019,2020,2021,2022,2023
		]
		monthIndex = 1;
		scrollLeft = false;
		scrollRight = false;
		httpIng = true;
		detailIndex = -1;
		onLoad(query:any) {
			this.$nextTick(()=>{
				let date = new Date();
				this.yearData.map((x:number,index:number)=>{
					(x==date.getFullYear()) && (this.swiperIndex = index)
				})
				this.monthIndex = date.getMonth() +1;
				this.scrollLeftPx = date.getMonth() * 50;
				this.initEvent()
				this.againReqNewData()

				this.onEventUI('detailLike',(res)=>{
					if(this.detailIndex>=0){
						this.calendaList[this.detailIndex].isLikes = res;
						if(res){
							this.calendaList[this.detailIndex].likes++;
						}else{
							this.calendaList[this.detailIndex].likes--;
						}
					}
				})
			})
		}
		onShow(){
			
		}
		onReachBottom(){
			this.reqNewData()
		}
		initEvent() {
			if (this.windowWidth != 0) return;

			// 获取设备宽高以及图片宽高距离
			uni.getSystemInfo({
				success: (res) => {
					// res - 各种参数
					this.windowWidth = res.windowWidth;
				}
			});
		}
		reqNewData(cb?:Function) {
		  // 获取更多商品
			if (this.noMoreData) {
				return;
			}
			const tp = this.orderTab[this.orderTabCheck].id
			let startDate = this.yearData[this.swiperIndex] + '-' +(this.monthIndex<10?'0'+this.monthIndex:this.monthIndex);
			let params:{[x:string]:any} = {
				tp,
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
				date:startDate,
			}
			const hash = this.kwwConfusion.calendar({tp,startDate,currentPage:this.currentPage,pageSize:this.pageSize})
			this.httpIng = true
			app.http.Get("dataApi/function/calendar/list", {...params,...hash}, (data: any) => {
				if(this.currentPage == 1) this.calendaList = []
				if(data.list){
					this.calendaList = this.calendaList.concat(data.list);
				}
				if(!data.list || data.list.length<this.pageSize){
					this.noMoreData = true;
				}
				this.currentPage++;
				if(cb) cb()
				this.httpIng = false;
			});
		}
		againReqNewData(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData() 
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		// 点赞
		onClickLikeCalendar(index:number){
			app.http.Post('function/calendar/like/'+this.calendaList[index].id,{},(res:any)=>{
				this.calendaList[index].likes = res.data.likes;
				this.calendaList[index].isLikes = res.data.liked
			})
		}
		onChangeSrcoll(event:any){
			
			if(this.monthScrollLeft == 0){
				this.monthScrollLeft = event.detail.scrollWidth - this.windowWidth 
			}
			if(this.swiperIndex>0){
				if(event.detail.scrollLeft<=-50){
					this.scrollLeft = true;
				}
				if(this.scrollLeft && event.detail.scrollLeft>=0){
					this.scrollLeft = false;
					this.monthIndex = 12;
					this.swiperIndex -- ;
					this.scrollLeftPx = (this.monthScrollLeft+this.swiperIndex);
					this.againReqNewData()
				}
			}
			if(this.swiperIndex<this.yearData.length-1){
				
				if(event.detail.scrollLeft>=50+this.monthScrollLeft){
					this.scrollRight = true;
				}
				if(this.scrollRight && event.detail.scrollLeft<=this.monthScrollLeft){
					this.scrollRight = false;
					this.monthIndex = 1;
					this.swiperIndex ++ ;
					this.scrollLeftPx = (1+this.swiperIndex);
					this.againReqNewData()
				}
			}
			
		}
		bindPickerChange(val:any){
			this.swiperIndex = val.detail.value;
			this.againReqNewData()
		}
		onClickScrollIndex(index:number){
			this.monthIndex = index;
			this.againReqNewData()
		}
		onClickListTabs(item:any){
			if(item.index==this.orderTabCheck){
				return;
			}
			this.orderTabCheck = item.index;
			this.againReqNewData()
		}
		onClickGoDetail(item:any,index:number){
			this.detailIndex = index;
			uni.navigateTo({
				url:'/pages/act/calendar/goods_details?id='+item.id+'&like='+item.isLikes
			})
		}
		getDateFormatS(time:number|string){
			var date = new Date(Number(time)*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var sdate = ("0" + date.getDate()).slice(-2);
			return sdate;
		}
	}
</script>

<style lang="scss">
	page{
		background:#FFF;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
	}
	.header-top{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 32rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.header-center{
		font-size: 36rpx;
		font-weight: 500;
		color: #5D5D5D;
		display: flex;
		align-items: center;
		margin-left: 27rpx;
	}
	.icon-down{
		width: 17rpx;
		height:9rpx;
		background:url(../static/pingtai/picker_down.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 10rpx;
	}
	.header-back{
		width: 80rpx;
		height:88rpx;
		background:url(../../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:0;
		top:50%;
		margin-top: -44rpx;
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		// border-bottom: 1px solid #F1F1F4;
	}
	
	
	.header-scroll-content{
		width: 100%;
		height:70rpx;
		box-sizing: border-box;
		overflow: auto;
		display: flex;
	}
	.swiper-item{
		margin-right: 20rpx;
		overflow: auto !important;
	}
	.header-scroll{
		width: 100%;
		height:70rpx;
		display: flex;
		box-sizing: border-box;
		white-space: nowrap;
	}
	.scroll-index{
		width: 94rpx;
		height:70rpx;
		background:#FFF;
		margin-right:40rpx;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
	.scroll-month{
		width: 100%;
		height:55rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #AAA8B3;
		text-align: center;
		line-height: 55rpx;
	}
	.scroll-month text{
		font-size: 35rpx;
	}
	.current-month{
		background:url(../static/pingtai/month_bg.png) no-repeat center;
		background-size: 100% 100%;
		color:#FFFFFF;
	}
	.good-list{
		width: 100%;
		box-sizing: border-box;
		padding: 274rpx 20rpx 20rpx 0;
	}
	.goods-box{
		width: 100%;
		box-sizing: border-box;
		position:relative;
		padding-left: 96rpx;
		overflow: hidden;
	}
	.goods-box::after{
		content:'';
		width: 1rpx;
		height:100%;
		position: absolute;
		left:48rpx;
		top:84rpx;
		background:#DEDEDE
	}
	.goods-index{
		width: 100%;
		height:150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		margin-bottom: 50rpx;
		position:relative
	}
	.goods-index:last-child{
		margin:0;
	}
	.goods-month{
		background:#fff;
		width: 60rpx;
		height:56rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 35rpx;
		font-weight: 400;
		color: #41414D;
		position:absolute;
		left:-75rpx;
		top:50%;
		margin-top: -28rpx;
		z-index:3
	}
	.goods-pic{
		width: 180rpx;
		height:150rpx;
	}
	.goods-right{
		width: 420rpx;
		height:150rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding:5rpx 0;		
	}
	.goods-right-desc{
		width: 330rpx;
		height:126rpx;
		box-sizing: border-box;
		padding:8rpx 0;
	}
	.goods-desc-title{
		width: 100%;
		height:80rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #000;
		line-height: 40rpx;
		word-break:break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.goods-desc-title-little{
		height:44rpx;
		box-sizing: border-box;
		padding-top: 18rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		display: flex;
		align-items: center;
	}
	.gray-desc{
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		margin-right: 20rpx;
		position: relative;
	}
	.gray-desc text{
		color:#FB4E3E;
	}
	.desc-dian::after{
		content:'';
		width: 4rpx;
		height:4rpx;
		position:absolute;
		left:-12rpx;
		top:50%;
		margin-top: -2rpx;
		border-radius: 50%;
		background:#666666
	}
	.goods-right-box{
		width:80rpx;
		height:126rpx;
		box-sizing: border-box;
		padding:14rpx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: flex-start;
	}
	.goods-right-text{
		width: 100%;
		text-align: right;
		font-size: 22rpx;
		font-weight: 400;
		color: #666666;
		margin-top: -10rpx;
	}
	.goods-right-like{
		width: 33rpx;
		height:29rpx;
		background:url(../static/pingtai/like.png) no-repeat center;
		background-size: 100% 100%;
	}
	.goods-right-like-current{
		width: 33rpx;
		height:29rpx;
		background:url(../static/pingtai/like_.png) no-repeat center;
		background-size: 100% 100%;
	}
</style>
