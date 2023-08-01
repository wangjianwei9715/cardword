<template>
	<view>
		<view class="goods-info">
			<muqian-lazyLoad class="carousel" :src="getGoodsImg(decodeURIComponent(goodsData.pic.carousel))"/>
			<view class="right">
				<text class="title">{{ goodsData.title }}</text>
				<view class="pay-box" v-if="normalRandomGoods">
					<view class="pay-goods">¥<text>{{ goodsData.price }}</text></view>
					<view class="pay-goods-right" v-if="baoduiId == 0">
						<view class="pay-goods-right-header"> {{  goodsData.buyLimit && goodsData.buyLimit.maxNumPerOrder > 0 ? "限购" + goodsData.buyLimit.maxNumPerOrder + "份" : "" }} </view>
						<view class="pay-goods-add">
							<view class="num-box" @click="onClickCutDown()">  <view class="img-jian" ></view> </view>
							<input class="money-add" @input="onInputMoney" v-model.number="payGoodsNum" type="number" />
							<view class="num-box" @click="onClickAdd()"> <view class="img-add" ></view> </view>
						</view>
					</view>
				</view>
				<view class="pay-box" v-else>
					<view class="pay-goods" v-if="payRandomTeamData==''">¥<text>{{ cartData.amount }}</text></view>
					<view class="pay-goods select-team-title" v-else>{{getGoodsPintuan(goodsData.pintuan_type)}}</view>
					<view class="pay-goods-right" v-if="payRandomTeamData == ''">
						<view class="pay-goods-right-header"> </view>
						<view class="pay-goods-add">
							<view class="pay-goods-availa" >共{{ cartData.available }}件</view >
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="huo-dong-bg" :scroll-x="true" v-show="goodsData.discount && cartData.length == 0" >
			<view
				class="item-youhui-bg"
				v-for="(item, index) in goodsData.discount"
				:key="index"
				:class="{'current-discount':(payNum>=item.minNum)&&(goodsData.discount[index+1]?(payNum>=goodsData.discount[index+1].minNum?false:true):true)}"
			>
				{{ item.content }}
			</view>
		</scroll-view>

		<!-- 选队随机 自选卡种 -->
		<view class="randomh-box" v-show="payRandomTeamData!=''" >
			<view class="randomh-index" v-for="(item,index) in payRandomTeamData" :key="index">
			<view class="randomh-index-left">
				<view class="randomh-name">{{item.name}}</view>
				<view class="randomh-price">￥{{item.price}}</view>
			</view>
			<view class="randomh-index-right">
				<view class="randohm-max" @click="onClickRandomMax(item)">MAX</view>
				<view class="randomh-num-box">
				<view class="randomh-num-btn" @click="onClickRandomNum(item,'reduce')">
					<image class="icon-randomReduce" src="@/static/pay/v2/icon_reduce_.png" />
				</view>
				<input type="number" class="randomh-num" v-model.number="item.num" @input="onInputMoneyRandom($event,item)" />
				<view class="randomh-num-btn" @click="onClickRandomNum(item,'add')">
					<image class="icon-randomAdd" src="@/static/pay/v2/icon_add_.png" />
				</view>
				</view>
			</view>
			</view>
		</view>
		<!-- 自选球队编号 -->
		<view class="yunfei-info check-team top-order" v-if="cartData != ''">
			<view class="item-title">已选编号</view>
			<view v-for="(item, index) in cartData.list" :key="item.id">
			<view class="yunfei-item" v-show="!item.soldOut && !item.lock">
				<text class="item-teamname">{{ index + 1 }}.{{ item.name }}</text>
				<text class="item-teamname">¥{{ item.price }}</text>
			</view>
			</view>
		</view>
		<!-- 包队编号 -->
		<view class="yunfei-info check-team top-order" v-if="baoduiName != ''">
			<view class="item-title">已选编号</view>
			<view>
			<view class="yunfei-item">
				<text class="item-teamname">1.{{ baoduiName }} 全队</text>
				<text class="item-teamname">¥{{ onePrice }}</text>
			</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop ,PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { getGoodsImg } from "@/tools/util";
	import { getGoodsPintuan } from "@/tools/switchUtil";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		goodsData!:any
		@PropSync('randomTeam',{type:[Object,String]})
		payRandomTeamData!:any;
		@Prop({default:{}})
		cartData!:any;
		@Prop({default:0})
		baoduiId!:number
		@Prop({default:""})
		baoduiName!:String
		@Prop({default:0})
		onePrice!:number
		@Prop({default:true})
		normalRandomGoods!:boolean
		@PropSync('payNum',{default:Number})
		payGoodsNum!:number
		@Prop({default:1})
		maxNum!:number
		getGoodsImg = getGoodsImg;
		getGoodsPintuan = getGoodsPintuan;
		getOnePrice(){
			this.$emit('getOnePrice')
		}
		onClickCutDown() {
			this.payGoodsNum>1 && this.payGoodsNum--;
			this.getOnePrice();
		}
		onClickAdd() {
			this.payGoodsNum<this.maxNum && this.payGoodsNum++;
			this.getOnePrice();
		}
		onInputMoney(event: any) {
			if (event.detail.value <=0 || Number(event.detail.value) > this.maxNum) {
				setTimeout(() => {
					this.payGoodsNum = event.detail.value <=0 ? 1 :this.maxNum;
					this.getOnePrice();
				}, 100);
			}else{
				this.getOnePrice();
			}
		}
		onClickRandomMax(item:any){
			item.num = item.maxNum;
			this.getOnePrice();
		}
		onClickRandomNum(item:any,type:string){
			if( type == 'add' ){
				item.num = item.num >= item.maxNum ? item.maxNum : +item.num+1
			}else{
				item.num = item.num > 1 ? item.num-1 : 1
			}
			this.getOnePrice();
		}
		onInputMoneyRandom(event:any,item:any){
			if (event.detail.value <=0 || Number(event.detail.value) > item.maxNum) {
				setTimeout(() => {
					item.num = event.detail.value <=0 ? 1 :item.maxNum;
					this.getOnePrice();
				}, 100);
			}else{
				this.getOnePrice();
			}
		}
	}
</script>

<style lang="scss">
.goods-info {
	width: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	box-sizing: border-box;
	padding:31rpx 20rpx 31rpx 20rpx;
	.carousel{
		width: 178rpx;
		height:137rpx;
	}
	.right{
		width: 480rpx;
		margin-left: 24rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		.title{
			font-size: 28rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			word-break:break-all
		}
		.pay-box{
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			bottom: 0rpx;
			left: 0;
		}
		.pay-goods-info {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			bottom: 0rpx;
			left: 0;
		}
		.pay-goods {
			margin-left: 8rpx;
			margin-top: 58rpx;
			font-size: 25rpx;
			font-family: PingFangSC-Regular;
			font-weight: 500;
			color: #333333;
			line-height: 28rpx;
		}
		.pay-goods text{
			font-size: 32rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 400;
			color: #333333;
		}
		.select-team-title{
			width: 123rpx;
			height: 36rpx;
			background: #754CE2;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #F6F7FB;
			margin-left: 0;
		}
		.pay-goods-right {
			width: 200rpx;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
		}
		.pay-goods-right-header {
			width: 100%;
			height: 50rpx;
			box-sizing: border-box;
			line-height: 50rpx;
			font-size: 21rpx;
			color: #FF2727;
			text-align: center;
			padding-right: 12rpx;
			padding-left: 12rpx;
			padding-top: 10rpx;
		}
		.pay-goods-add {
			margin-right: 12rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.num-box{
			width: 36rpx;
			height:36rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.pay-goods-max{
			width: 78rpx;
			height: 38rpx;
			border: 1rpx solid #CCCCCC;
			border-radius: 3rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			margin-right:26rpx;
		}
		.img-add {
			width: 28rpx;
			height: 28rpx;
			background: url(@/static/pay/v2/icon_add.png) no-repeat center;
			background-size: cover;
		}
		.img-jian {
			width: 28rpx;
			height: 5rpx;
			background: url(@/static/pay/v2/icon_red.png) no-repeat center;
			background-size: 100% 100%;
		}
		.money-add {
			height: 36rpx;
			text-align: center;
			font-size: 25rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			line-height: 36rpx;
			background:#F6F7FB;
			margin:0 21rpx;
			width: 75rpx;
		}

	}
}
.huo-dong-bg {
	width: 684rpx;
	height: 108rpx;
	background: #ffffff;
	display: flex;
	white-space: nowrap;
	align-items: center;
	margin:0 auto;
	border-top: 2rpx solid #F5F5F5;
	box-sizing: border-box;
	padding-top: 32rpx;
}
.item-youhui-bg {
	text-align: center;
	line-height: 43rpx;
	margin-right: 16rpx;
	height: 43rpx;
	background: #F1F1F1;
	font-size: 23rpx;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: #88878C;
	padding: 0 22rpx;
	width: fit-content;
	display: inline-flex;
	margin-right: 28rpx;
	display: inline-block;
}
.current-discount{
	font-size: 23rpx;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: #FFFFFF;
	background:#FF0003;
}
// 自选卡种 选队随机
.randomh-box{
	width: 100%;
	padding:26rpx 20rpx;
	box-sizing: border-box;
	background:#fff;
	border-bottom-left-radius: 5rpx;
	border-bottom-right-radius: 5rpx;
	position: relative;
}
.randomh-box::after{
	content: '';
	width: 682rpx;
	height:1px;
	position:absolute;
	top:0;
	left:50%;
	margin-left: -341rpx;
	background:#F5F5F5;
	z-index: 2;
	}
.randomh-index{
	width: 100%;
	height:40rpx;
	margin-bottom: 34rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.randomh-index:last-child{
	margin-bottom: 0;
}
.randomh-index-left{
	width: 410rpx;
	height:40rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	.randomh-name{
		max-width: 204rpx;
		height:40rpx;
		background:#F6F7FB;
		text-align: center;
			line-height: 40rpx;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		box-sizing: border-box;
		padding:0 12rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.randomh-price{
		width: 154rpx;
		height:40rpx;
		line-height: 40rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
}
.randomh-index-right{
	width: 268rpx;
	height:40rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	.randohm-max{
		width: 78rpx;
		height: 38rpx;
		border: 1px solid #CCCCCC;
		border-radius: 3rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #88878C;
	}
	.randomh-num-box{
	width: 177rpx;
	height:40rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	.randomh-num-btn{
		width: 43rpx;
		height: 39rpx;
		background: #F6F7FB;
		border-radius: 1rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.icon-randomReduce{
			width: 15rpx;
			height:3rpx;
		}
		.icon-randomAdd{
			width: 15rpx;
			height:15rpx;
		}
	}
	.randomh-num{
		width: 83rpx;
		height: 39rpx;
		background: #F6F7FB;
		border-radius: 1rpx;
		text-align: center;
		line-height: 39rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	}
}
.yunfei-info {
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding:10rpx 20rpx
}
.yunfei-item {
	width: 100%;
	height:60rpx;
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
