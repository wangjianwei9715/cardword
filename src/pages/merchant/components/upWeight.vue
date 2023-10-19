<template>
	<view class="good-act-content" >
		<bottomDrawer :showDrawer="show" title="提升权重" @closeDrawer="showSync=false;isPullDown(true)" :needSafeArea="true" padding="0rpx 0rpx">
			<view class="drawer-header" @click="showHelp=true">
				<view class="drawer-header-name">{{short_description}}</view>
				<image style="width:27rpx;height:26rpx" src="@/static/goods/v2/icon_help.png" ></image>
			</view>
			<view class="drawer-center-list">
				<view class="drawer-center-item" v-for="(item,index) in equitycard" :key="index">
					<view class="drawer-item-box">
						<view class="drawer-item-surplus">剩{{item.remaining_quantity}}次</view>
						<view>
							<view class="drawer-item-num">+{{item.weight}}</view>
							<view class="drawer-item-time">{{item.hour_str}}</view>
						</view>
						<view class="drawer-item-inuse" v-if="item.using_count>0">({{item.using_count}})生效中  {{formatterCountDown(item.distance_end_time-countDown)}}</view>
					</view>
					<view class="drawer-item-operate">
						<view class="operate-btn" @click="onClickReduceNum(item)"><image class="icon-reduce" src="@/static/merchant/icon_reduce.png" /></view>
						<input type="number" class="drawer-item-input" disabled v-model.number="item.num" @blur="onChangeNumber"/>
						<view class="operate-btn" @click="onClickAddNum(item)"><image  class="icon-add" src="@/static/merchant/icon_add.png" /></view>
					</view>
				</view>
			</view>
			<view class="drawer-bottom" v-if="hasUsableCard">
				<view class="drawer-bottom-rank">已选<text class="choice-num">{{totalNum}}</text>张 预计排名提升<text class="rnak-red">{{rankUp.old_rank}}名→{{rankUp.new_rank}}名</text></view>
				<view class="drawer-bottom-btn" @click="onClickConfirmUse">确认使用</view>
			</view>
			<view class="drawer-bottom" v-else>
				<view class="drawer-bottom-rank">暂无权重卡可用</view>
				<view class="drawer-bottom-btn" @click="redirectToMall">去积分中心兑换</view>
			</view>
		</bottomDrawer>

		<bottomDrawer :showDrawer="showHelp" title="规则说明" shadowBg="rgba(0,0,0,0)" @closeDrawer="showHelp=false" :needSafeArea="true">
			<view>
				<view class="drawer-helpmsg">
					<view class="drawer-help-cd">1、使用规则：使用权重卡可在一定时间内根据面额增加商品的权重值，从而提升商品排序，单个商品可叠加使用。若商品在使用期间内拼成或失效，剩余时间将被作废。</view>
				</view>
				<view class="drawer-helpmsg">
					<view class="drawer-help-cd">2、您每月可获得{{getWeightLength}}张权重卡，当月1日5:00自动发放，内容如下：</view>
				</view>
				<view class="drawer-helpmsg" v-for="(item,index) in monthly_cards" :key="index">
					<view class="drawer-help-cd">{{item.weight}}权重（{{item.hour}}小时）*{{item.amount}}</view>
				</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,PropSync,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { formatterCountDown } from "@/tools/util"
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("show",{
			type:Boolean
		}) showSync!: Boolean;
		@Prop({default:[]})
		equitycard!:[]
		@Prop({default:''})
		goodCode!:[]
		@Prop({default:''})
		short_description!:''
		@Prop({default:''})
		monthly_cards!:[]

		isPullDown = app.platform.isPullDown;
		formatterCountDown = formatterCountDown;
		cDInterval: any;
		countDown:number = 0;
		totalNum = 0;
		rankUp = {
			new_rank:0,
			old_rank:0
		};
		showHelp=false;
		@Watch('show')
		onChangeShow(val:boolean){
			if(val){
				this.countDown = 0;
				this.cDInterval = setInterval(() => {
					this.countDown++;
				}, 1000);
			}else{
				clearInterval(this.cDInterval)
				this.initChoiceCard()
			}
		}
		created() {
		}
		destroyed(){
			clearInterval(this.cDInterval)
		}
		public get hasUsableCard() : boolean {
			return this.equitycard.length>0&&this.equitycard.some((item:any)=>item.remaining_quantity>0)
		}
		redirectToMall(){
			uni.redirectTo({url:"/pages/merchant/mall/index"});
		}
		initChoiceCard(){
			this.totalNum = 0;
			this.rankUp = {
				new_rank:0,
				old_rank:0
			}
		}
		onClickReduceNum(item:any){
			if(item.num<=0) return;
			item.num--;
			this.onChangeNumber()
		}
		onClickAddNum(item:any){
			if(item.num>=item.remaining_quantity) return;
			item.num++;
			this.onChangeNumber()
		}
		onChangeNumber(){
			const params = this.getChoiceParams;
			if(!params) return;
			app.http.Post('me/shop/equitycard/estimate',params,(res:any)=>{
				this.rankUp = res.data
			})
		}
		onClickConfirmUse(){
			uni.showModal({
				title: '提示',
				content: '是否确认使用权重卡',
				success:  (res)=> {
					if (res.confirm) {
						const params = this.getChoiceParams;
						if(!params) return;
						app.http.Post('me/shop/equitycard/use',params,(res:any)=>{
							this.showSync=false;
							uni.showToast({title:'使用成功',icon:"none"})
							this.$emit('equitycardUse')
						})	
					}
				}
			});
		}
		public get getWeightLength() :number {
			const length = this.monthly_cards.reduce((sum:number,e:any) => sum + e.amount,0 )
			return length;
		}
		public get getChoiceParams() : any {
			const findList = this.equitycard.filter((x:any)=>x.num>0) || [];
			if(findList.length==0){
				this.initChoiceCard();
				return false;
			};
			this.totalNum = findList.reduce((sum:number, e:any) => sum + e.num, 0)

			return {
				goods_code:this.goodCode,
				card_list:findList.map((x:any)=>{
					return {weight:x.weight,hour:x.hour,count:x.num}
				})
			} 
		}
	}
</script>

<style lang="scss">
	.good-act-content{
		width: 710rpx;
		border-radius: 3rpx;
		background:#fff;
	}
	.detail-act-box{
		width: 100%;
		box-sizing: border-box;
		padding:10rpx 30rpx 0 30rpx;
		.act-box{
			width: 100%;
			min-height:76rpx;
			display: flex;
			.act-box-name{
				height:76rpx;
				width:82rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				display: flex;
				align-items: center;
			}
			.chedui-name{
				color:#FA1545
			}
			.act-box-desc{
				width: 550rpx;
				min-height:76rpx;
			}
			.flex-between{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.act-box-desc-item{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin:22rpx 0;
			}
		}
		.detail-act-index{
			width: 100%;
			height:40rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
		}
	}
	.detail-act-left{
		width: 600rpx;
		height:40rpx;
		display: flex;
		align-items: center;
	}
	.detail-act-name{
		width: 110rpx;
		height:40rpx;
		line-height: 40rpx;
		font-size: 27rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #C0C0C0;
	}
	.detail-act-desc{
		width: 550rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.discount-box{
		display: flex;
		align-items: center;
	}
	.detail-discount{
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding:0 13rpx;
		border:1px solid #F4919F;
		margin-right: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #EA4055;
	}
	.drawer-helpmsg{
		width: 100%;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	.drawer-help-title{
		font-size: 27rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color:#333333;
		margin:15rpx 0rpx;
	}
	.drawer-help-content{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		white-space: pre-wrap;
		line-height: 35rpx;
		margin-bottom: 50rpx;
	}
	.drawer-help-cd{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 46rpx;
		white-space: pre-wrap;
		margin-bottom: 15rpx;
	}
	.detail-act-right{
		width: 13rpx;
		height:21rpx;
		background:url(@/static/index/v2/icon_right.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 10rpx;
		margin-top: 27.5rpx;
	}
	.drawer-header{
		width: 100%;
		height:60rpx;
		background:#F5F5F5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 20rpx;
	}
	.drawer-header-name{
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #959695;
	}
	.drawer-chedui{
		margin-bottom: 40rpx;
	}
	.drawer-bottom{
		width: 100%;
		position: absolute;
		background:#fff;
		left:0;
		bottom:0;
		height: calc(200rpx);
		height: calc(200rpx + constant(safe-area-inset-bottom));
		height: calc(200rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		.drawer-bottom-rank{
			width: 100%;
			height:80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color:#959695;
		}
		.drawer-bottom-btn{
			width: 702rpx;
			height: 92rpx;
			background: #FA1545;
			border-radius: 5rpx;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
			line-height: 92rpx;
			margin:0 auto;
		}
	}
	.font-bold{
		font-weight: bold;
	}
	.choice-num{
		color:#333333;
		font-weight: 600;
	}
	.rnak-red{
		color:#FA1545;
		font-weight: 600;
	}
	.drawer-center-list{
		width: 100%;
		box-sizing: border-box;
		padding:32rpx 24rpx 0 24rpx;		
		padding-bottom: calc(280rpx);
		padding-bottom: calc(280rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(280rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-wrap: wrap;
	}
	.drawer-center-item{
		width: 216rpx;
		height:286rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		margin-right:30rpx;
		.drawer-item-box{
			width: 216rpx;
			height:216rpx;
			box-sizing: border-box;
			border: 1rpx solid #959695;
			border-radius: 3rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.drawer-item-num{
			width: 100%;
			text-align: center;
			font-size: 63rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.drawer-item-time{
			width: 100%;
			text-align: center;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #959695;
		}
		.drawer-item-surplus{
			width: 93rpx;
			height: 38rpx;
			background: #FA1545;
			border-radius: 3rpx;
			position: absolute;
			left:0;
			top:0;
			text-align: center;
			line-height: 38rpx;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.drawer-item-inuse{
			width: 100%;
			height: 38rpx;
			background: #FCECEE;
			border-radius: 0rpx 0rpx 3rpx 3rpx;
			position: absolute;
			bottom:0;
			left:0;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FA1545;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.drawer-center-item:nth-child(3n){
		margin-right: 0rpx;
	}
	.drawer-item-operate{
		width: 100%;
		height:70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.drawer-item-input{
		width: 76rpx;
		height: 40rpx;
		background: #F5F5F5;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #333333;
		text-align: center;
	}
	.operate-btn{
		width: 60rpx;
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-reduce{
		width: 21rpx;
		height:5rpx;
	}
	.icon-add{
		width: 21rpx;
		height:21rpx;
	}
</style>
