<template>
	<view class="payinfo-box">
		<view class="merchant-info">
			<muqian-lazyLoad class="merchant-avatar" :src="goodsData.publisher.avatar" borderRadius="50%"/>
			{{goodsData.publisher.name}}
		</view>
		<view class="goods-info">
			<view class="goods-pic-box">
				<muqian-lazyLoad class="goods-image blur-bg" :src="goodsPic" mode="heightFix"/>
				<muqian-lazyLoad class="goods-image" :src="goodsPic" mode="aspectFit"/>
			</view>
			
			<view class="right">
				<view class="title" :class="uLine">
					<view v-if="isPresell" class="icon-presell">预售</view>
					<view v-if="goodsData.buyLimit.maxNumPerOrder>0" class="icon-limit">限购{{goodsData.buyLimit.maxNumPerOrder}}份</view>
					{{ goodsData.title }}
				</view>
				<view class="info-desc">1.基础卡片随机款 2.系列玩法</view>
				<view class="pay-box" v-if="normalRandomGoods">
					<view class="pay-goods">¥<text>{{ goodsData.price }}</text></view>
					<view class="pay-goods-right" v-if="baoduiId == 0">
						<view class="pay-goods-right-header">{{ buyLimitMsg }}</view>
						<view class="pay-goods-add">
							<view class="num-box" @click="onClickCutDown()">  <view class="img-jian" ></view> </view>
							<input class="money-add" @blur="onBlurMoneyNum" v-model.number="payGoodsNum" type="number" />
							<view class="num-box" @click="onClickAdd()"> <view class="img-add" ></view> </view>
						</view>
					</view>
				</view>
				<view class="pay-box" v-else>
					<view class="pay-goods" v-if="!isRandomTeam">¥<text>{{ cartData.amount }}</text></view>
					<view class="pay-goods select-team-title" v-else>{{getGoodsPintuan(goodsData.pintuan_type)}}</view>
					<view class="pay-goods-right" v-if="!isRandomTeam">
						<view class="pay-goods-right-header"></view>
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
				@click="onClickDiscountItem(item)"
			>
				<view class="discount-num">满{{item.minNum}}组</view>
				<view class="discount-price">
					<text>¥{{item.price}}</text>
					<text>/份</text>
				</view>
			</view>
		</scroll-view>

		<!-- 选队随机 自选卡种 -->
		<view class="randomh-box" v-show="isRandomTeam" >
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
				<input type="number" class="randomh-num" v-model.number="item.num" @blur="onBlurMoneyRandom($event,item)" />
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
		@PropSync('randomTeam',{type:[Array,String]})
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

		public get buyLimitMsg() : string {
			const { maxNumPerOrder } = this.goodsData?.buyLimit;
			return maxNumPerOrder > 0 ? `限购${maxNumPerOrder}份` : ""
		}
		public get isRandomTeam() : boolean {
			return this.payRandomTeamData!='';
		}
		public get isPresell() : boolean {
			return !uni.$u.test.isEmpty(this.goodsData.book)
		}
		public get uLine() : string {
			const num = 2+(this.isPresell?1:0)+(this.goodsData.buyLimit.maxNumPerOrder>0?1:0)
			return `u-line-${num}`
		}
		public get goodsPic() : string {
			return getGoodsImg(decodeURIComponent(this.goodsData.pic.carousel))
		}
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
		onBlurMoneyNum(event: any){
			if (Number(event.detail.value) > this.maxNum) {
				this.payGoodsNum = this.maxNum;
			}
			if(Number(event.detail.value)<=0){
				this.payGoodsNum = 1;
			}
			this.getOnePrice();
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
		onBlurMoneyRandom(event:any,item:any){
			if (Number(event.detail.value) > item.maxNum) {
				item.num = item.maxNum;
			}
			if ( Number(event.detail.value) <=0) {
				item.num = 1;
			}
			this.getOnePrice();
		}
		onClickDiscountItem(item:any){
			this.payGoodsNum=item.minNum;
			this.getOnePrice()
		}
	}
</script>

<style lang="scss">
.payinfo-box{
	background: #fff;
	border-radius: 5rpx;
	box-sizing: border-box;
	padding-bottom: 30rpx;
}
.goods-info {
	width: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	box-sizing: border-box;
	padding:24rpx 26rpx 0rpx 26rpx;
	.goods-pic-box{
		width: 178rpx;
		height:178rpx;
		border-radius: 5rpx;
		position: relative;
		overflow: hidden;
	}
	.goods-image{
		width: 178rpx;
		height:178rpx;
		border-radius: 4rprx;
		position: relative;
		z-index: 2;
	}
	.blur-bg{
		filter: blur(2px);
		position: absolute;
		top:0;
		left:0;
		z-index: 1 !important;
	}
	.right{
		width: 470rpx;
		margin-left: 24rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		.title{
			font-size: 26rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
		.info-desc{
			width: 100%;
			font-size: 24rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			color: #999999;
			margin-top: 8rpx;
		}
		.icon-presell{
			height:30rpx;
			background:#6DD400;
			border-radius: 4rpx;
			box-sizing: border-box;
			padding:0 8rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			font-family: PingFangSC;
			font-weight: 400;
			color: #FFFFFF;
			margin-right: 8rpx;
		}
		.icon-limit{
			height:30rpx;
			border:1rpx solid #FA1545;
			border-radius: 4rpx;
			box-sizing: border-box;
			padding:0 8rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			font-family: PingFangSC;
			font-weight: 400;
			color: #FA1545;
			margin-right: 8rpx;
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
			margin-right: 4rpx;
			margin-top: 58rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular;
			font-weight: 500;
			color: rgba(0,0,0,0.9);
			line-height: 28rpx;
		}
		.pay-goods text{
			font-size: 32rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			color: rgba(0,0,0,0.9);
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
			width: 43rpx;
			height:39rpx;
			background: #F6F7FB;
			border-radius: 1rpx;
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
			width: 15rpx;
			height: 15rpx;
			background: url(@/static/pay/v2/icon_add_.png) no-repeat center / 100% 100%;
		}
		.img-jian {
			width: 15rpx;
			height: 3rpx;
			background: url(@/static/pay/v2/icon_reduce_.png) no-repeat center / 100% 100%;
		}
		.money-add {
			height: 39rpx;
			text-align: center;
			font-size: 25rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			line-height: 36rpx;
			background:#F6F7FB;
			margin:0 10rpx;
			width: 75rpx;
		}

	}
}
.huo-dong-bg {
	width: 670rpx;
	height: 104rpx;
	background: #ffffff;
	display: flex;
	white-space: nowrap;
	align-items: center;
	margin:0 auto;
	box-sizing: border-box;
	margin-top: 20rpx;
}
.item-youhui-bg {
	width: 92rpx;
	height:104rpx;
	background: url(@/static/pay/v2/discount.png) no-repeat center / 100% 100%;
	display: inline-block;
}
.discount-num{
	width: 100%;
	height:40rpx;
	text-align: center;
	line-height: 40rpx;
	font-size: 20rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	color: #AAAAAA;
}
.discount-price{
	width: 100%;
	height:64rpx;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	box-sizing: border-box;
	padding:4rpx 0 10rpx 0;
}
.discount-price text{
	width: 100%;
	font-size: 20rpx;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	color: #AAAAAA;
	text-align: center;
}
.discount-price text:first-child{
	font-weight: bold;
}
.current-discount{
	background: url(@/static/pay/v2/discount_.png) no-repeat center / 100% 100%;
}
.current-discount .discount-num,.current-discount .discount-price text{
	color:#FA1545
}
// 自选卡种 选队随机
.randomh-box{
	width: 100%;
	padding:26rpx 26rpx 0rpx 26rpx;
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
	padding:10rpx 26rpx
}
.yunfei-item {
	width: 100%;
	height:68rpx;
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.merchant-info{
	width: 100%;
	box-sizing: border-box;
	padding:30rpx 26rpx 0 26rpx;
	display: flex;
	align-items: center;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(0,0,0,0.9);
	.merchant-avatar{
		width: 40rpx;
		height:40rpx;
		margin-right: 8rpx;
	}
}
</style>
