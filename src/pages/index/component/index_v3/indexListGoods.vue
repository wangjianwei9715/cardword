<template>
	<div>
		<div v-if="data.special_type" class="goods-container">
			
		</div>
		<!-- 普通商品 -->
		<div v-else class="goods-container">
			<div class="goods-content" @click="goGoodsDetails()">
				<image class="goods-pic" :src="getGoodsImg(decodeURIComponent(data.pic))"/>
				<div class="goods-header u-line-2">
					<div class="cardicon">
						<image class="icon-image" :src="`/static/goods/icon_b${goodsData.iconSrc}.png`"></image>
						<text class="icon-text">{{goodsData.typeName}}</text>
					</div>
					<!-- #ifdef APP-NVUE -->
					<rich-text class="richtext" :nodes="nodes"></rich-text>
					<!-- #endif -->
					<!-- #ifndef APP-NVUE -->
					<text class="title-text u-line-2" style="text-indent: 100rpx;">{{data.title}}</text>
					<!-- #endif -->
				</div>
				<div class="goods-priceMsg">
					<div class="goods-priceMsg-left">
						<text class="price-icon">￥</text>
						<text class="price-text">{{ filterPrice(data.price).integer }}</text>
						<text class="decimal"
							v-if="filterPrice(data.price).decimal">{{ filterPrice(data.price).decimal }}</text>
						<text class="lowest">{{hasLowestPrice(data)?'起':''}}</text>
					</div>
					<text v-if="[0,-1].includes(data.state)" class="goods-priceMsg-right">
						{{$u.timeFormat(data.startAt,"mm-dd hh:MM")}}开售
					</text>
					<text v-else :id="data.goodCode" class="goods-priceMsg-right">
						{{listPlan(data,'str')}}
					</text>
				</div>
				<div class="goods-progress" :class="{'goods-progress-select':ifSelectType(data)}">
					<div class="progressMask" :style="progressStyle"></div>
				</div>
			</div>
			<div class="goods-bottom" @click="onClickSellerShop(data)">
				<image class="merchant-logo" mode="aspectFill" :src="decodeURIComponent(data.merchantLogo)"/>
				<image v-if="data.merchantLevel&&merchantLevelItem['icon']" class="avatar-level" :src="`/static/goods/v2/good_small_${merchantLevelItem['icon']}.png`" />
				<text class="bussName">{{data.merchantName}}</text>
			</div>
		</div>
	</div>
	
</template>

<script>
	const app = getApp().globalData.app;
	import { MerchantLevel } from "@/tools/DataExchange.js"
	const gameplayType = {
		1:"随机卡种",
		2:"随机球队",
		3:"随机球员",
		4:"随机卡盒",
		5:"随机卡包",
		10:"自选球队",
		11:"选队随机",
		12:"自选卡种"
	}
	export default {
		props: {
			data:{
				type:Object,
				default: () => {}
			},
		},
		data(){
			return {
				gameplayType
			}
		},
		mounted(){
		},
		computed:{
			goodsData(){
				const { pintuan_type, saleMode, state } = this.data;
				const remainingRandom = saleMode==1&&state==1
				return {
					isRandom:[10,11].includes(pintuan_type),
					typeName: remainingRandom ? '剩余随机' : (gameplayType[pintuan_type] || ''),
					remainingRandom,
					iconSrc:([10,11].includes(pintuan_type) || remainingRandom) ? '1' : '2'
				}
			},
			nodes(){
				return [{
					name: 'div',
					children: [
						{ type: 'text', attrs: { class: 'hide-text' }, text: this.goodsData.typeName },
						{ type: 'text', attrs: { class: 'title-text' }, text: this.data.title }
					]
				}]
			},
			progressStyle(){
				return {
					width:Math.floor((100-this.listPlan(this.data,'num'))*3.17)+'rpx'
				}
			},
			merchantLevelItem() {
				return MerchantLevel[this.data.merchantLevel] ?? {level:'',name:'',icon:''}
			}
		},
		methods: {
			onClose(){
				this.$emit('update:show', false)
			},
			onClickSellerShop({merchantAlias}) {
				if(!merchantAlias) return
				uni.navigateTo({
					url:`/pages/merchant/core?alias=${merchantAlias}`
				})
			},
			goGoodsDetails(){
				app.navigateTo.goGoodsDetails(this.data.goodCode)
			},
			getGoodsImg(img) {
				if (img.indexOf(',') == -1) {
					return img
				} else {
					let imgone = img.split(',')
					return imgone[0]
				}
			},
			filterPrice(price) {
				let data = {
					integer: 0,
					decimal: 0,
				}
				if (!price) return data
				const priceArr = String(price).split('.')
				if (priceArr.length == 1) {
					data.integer = priceArr[0]
					return data
				}
				return {
					integer: priceArr[0],
					decimal: '.' + priceArr[1]
				}
			},
			// 商品是否包含最低价
			hasLowestPrice(item) {
				return item.isSelect || item.discount != '' || item.pintuan_type == 11
			},
			listPlan(item,type){
				const width = Math.round((Number(item.lockNum) + Number(item.currentNum)) / Number(item.totalNum) * 10000)/100;
				const saleRatio = item.saleRatio>0&&item.saleRatio<1?Math.round((item.saleRatio)*10000)/100:0;
				const str = saleRatio > width ? 
				`${saleRatio}%`:
				`余${item.totalNum-(item.currentNum+item.lockNum)}/${item.totalNum}`
				return type=='str' ? str : Math.max(width,saleRatio)
			},
			// 自选类型
			ifSelectType(item) {
				const allowedTypes = [10, 11, 12];
				return allowedTypes.includes(item.pintuan_type);
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
		// #ifndef APP-NVUE
		box-sizing: border-box;
		align-content: baseline;
		// #endif
	}
	.goods-container{
		width: 349rpx;
		height:484rpx;
		margin-bottom: 20rpx;
	}
	.goods-content{
		width: 349rpx;
		background: #FFFFFF;
		border-top-left-radius: 5rpx;
		border-top-right-radius: 5rpx;
		overflow: hidden;
		padding:0;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.goods-pic{
		width: 349rpx;
		height: 268rpx;
	}
	.goods-header{
		width: 349rpx;
		height: 75rpx;
		padding-left: 16rpx;
		padding-right: 16rpx;
		position: relative;
		margin-top: 15rpx;
	}
	.richtext{
		lines:2;
		text-overflow: ellipsis;
		word-wrap:anywhere;
	}
	.cardicon{
		width: 90rpx;
		height:30rpx;
		margin-right: 10rpx;
		position: absolute;
		@include flexCenter;
		left:16rpx;
		top:4rpx;
	}
	.icon-image{
		width: 90rpx;
		height:30rpx;
		position: absolute;
		left:0;
		top:0;
	}
	.icon-text{
		height:30rpx;
		font-size: 18rpx;
		font-weight: 400;
		color: #fff;
		@include flexCenter;
	}
	.hide-text{
		font-size: 23rpx;
		font-weight: 400;
		background:rgba(0,0,0,0);
		color:rgba(0,0,0,0)
	}
	.title-text{
		font-size: 25rpx;
		font-weight: 400;
		color: #333333;
	}
	.goods-priceMsg{
		flex:1;
		height: 40rpx;
		@include flexCenter;
		position: relative;
		margin-bottom: 15rpx;
		align-items: flex-end;
		padding-left: 16rpx;
		padding-right: 16rpx;
		justify-content: space-between;
	}
	.goods-priceMsg-left{
		height: 40rpx;
		margin-bottom: -4rpx;
		@include flexCenter;
		align-items: flex-end;
	}
	.price-icon{
		font-size: 18rpx;
		font-family: ArialBold ;
		font-weight: 600;
		color: #333333;
		margin-bottom: 4rpx;
	}
	.price-text {
		font-size: 31rpx;
		font-weight: 600;
		font-family: ArialBold ;
		line-height: 38rpx;
	}
	.decimal{
		font-size: 23rpx;
		font-family: ArialBold ;
	}
	.lowest {
		font-size: 21rpx;
		font-weight: 600;
		color: #C0C0C0;
		margin-left: 6rpx;
		font-family: ArialBold ;
	}
	.goods-priceMsg-right{
		align-items: flex-end;
		font-size: 23rpx;
		font-weight: 400;
		color: #C0C0C0;
		margin-bottom: -2rpx;
	}
	.goods-progress {
		background:#FA1545;
		width: 317rpx;
		height: 6rpx;
		@include flexCenter;
		justify-content: flex-end;
	}
	.progressMask {
		height: 6rpx;
		background-color: #f3f2f2;
	}
	.goods-progress-select {
		background:#7048DD;
	}
	.goods-bottom {
		width: 349rpx;
		@include flexCenter;
		position: relative;
		justify-content: flex-start;
		padding-left: 16rpx;
		padding-right: 16rpx;
		padding-bottom: 18rpx;
		padding-top: 18rpx;
		background:#fff;
		border-bottom-left-radius: 5rpx;
		border-bottom-right-radius: 5rpx;
	}
	.bussName {
		width: 246rpx;
		font-size: 21rpx;
		font-weight: 400;
		color: #707070;
	}
	.merchant-logo{
		width: 36rpx;
		height:36rpx;
		margin-right: 10rpx;
		border-radius: 50%;
	}
	.avatar-level{
		position: absolute;
		bottom:16rpx;
		left:36rpx;
		z-index: 1;
		width: 21rpx;
		height:17rpx;
	}
</style>
