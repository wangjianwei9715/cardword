<template>
	<div v-if="data.special_type" class="goods-container">
		<!-- 边播边拆 -->
		<div v-if="data.special_type=='dyBroadcast'" class="dyBroadcast" @click="onClickGoDyBroadcast">
			<image class="dy-bg" src="/static/index/v3/dy_bg.png"/>
			<div class="dy-container">
				<div class="dy-header">
					<image class="dy-icon" src="/static/index/v3/dy.png"/>
					<text class="dy-title">边播边拆</text>
				</div>
				<div class="dy-goods-box">
					<div class="dy-goods-index" v-for="(item,index) in data.list">
						<div class="dy-goods-left">
							<image class="dy-goods-pic" :src="getGoodsImg(decodeURIComponent(item.pic))" mode="aspectFill"/>
							<image class="dy-merchant-pic" :src="decodeURIComponent(item.merchantLogo)" mode="aspectFill"/>
						</div>
						<div class="dy-goods-right">
							<text class="dy-goods-title u-line-2">{{item.goodName}}</text>
							<div class="dy-goods-priceMsg-left">
								<text class="dy-price-icon">￥</text>
								<text class="dy-price-text">{{ filterPrice(item.price).integer }}</text>
								<text class="dy-decimal"
									v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 广告商品 -->
		<swiper v-else-if="data.special_type=='ad'" class="ad-box" :autoplay="data.list.length>1" :circular="true" :disable-touch="data.list.length<2">
			<swiper-item v-for="(item,index) in data.list" :key="index">
				<image class="goods-pic" :src="getGoodsImg(decodeURIComponent(item.pic))" mode="aspectFill"/>
				<image class="bg-top" src="/static/index/v3/ad_top.png"  @click="goGoodsDetails(item.goodCode)"/>
				<image class="bg-bottom" src="/static/index/v3/ad_bottom.png"/>
				<div class="ad-goods-box">
					<div class="ad-goods-header"  @click="goGoodsDetails(item.goodCode)">
						<div class="ad-goods-priceMsg-left">
							<text class="ad-price-icon">￥</text>
							<text class="ad-price-text">{{ filterPrice(item.price).integer }}</text>
							<text class="ad-decimal"
								v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
							<text class="ad-lowest">{{hasLowestPrice(item)?'起':''}}</text>
						</div>
						<text v-if="[0,-1].includes(item.state)" class="ad-goods-priceMsg-right">
							{{timeFormat(item.startAt)}}开售
						</text>
						<text v-else :id="item.goodCode" class="ad-goods-priceMsg-right">
							{{listPlan(item,'str')}}
						</text>
					</div>
					<div class="ad-goods-center">
						<text class="ad-goods-slogan u-line-1"  @click="goGoodsDetails(item.goodCode)">{{item.slogan}}</text>
						<text class="ad-goods-title u-line-1"  @click="goGoodsDetails(item.goodCode)">{{item.title}}</text>
						<text class="ad-goods-merchant u-line-1" @click="onClickSellerShop(item)">{{item.merchantName}}</text>
					</div>
					<div class="ad-goods-tips" v-if="data.list.length>1"> 
						<text class="ad-tips-text">广告 {{index+1}}/{{data.list.length}}</text>
					</div>
				</div>
			</swiper-item>
		</swiper>
	</div>
	<!-- 普通商品 -->
	<div v-else class="goods-container">
		<div class="goods-content">
			<image class="goods-pic" :src="getGoodsImg(decodeURIComponent(data.pic))" @click="goGoodsDetails()" mode="aspectFill"/>
			<div class="goods-index">
				<div class="goods-progress" :style="progressStyle">
					<div class="progressMask" :style="progressWidth"></div>
				</div>
				<div class="goods-header u-line-2" @click="goGoodsDetails()">
					<!-- #ifdef APP-NVUE -->
					<rich-text class="cardicon" :selectable="false" :nodes="nodesTypeName"></rich-text>
					<rich-text class="richtext" :selectable="false" :nodes="nodesTitle"></rich-text>
					<!-- #endif -->

					<!-- #ifndef APP-NVUE -->
					<div class="cardicon">
						<text class="icon-text" :style="{color:goodsTypeData.color}">{{goodsData.typeName.slice(0,2)}}</text>
						<text class="icon-text">{{goodsData.typeName.slice(2)}}</text>
					</div>
					<text class="title-text u-line-2" style="text-indent: 70rpx;">{{data.title}}</text>
					<!-- #endif -->
				</div>
				<div class="goods-priceMsg" @click="goGoodsDetails()">
					<div class="goods-priceMsg-left">
						<text class="price-icon">￥</text>
						<text class="price-text">{{ filterPrice(data.price).integer }}</text>
						<text class="decimal"
							v-if="filterPrice(data.price).decimal">{{ filterPrice(data.price).decimal }}</text>
						<text class="lowest">{{hasLowestPrice(data)?'起':''}}</text>
					</div>
					<text v-if="[0,-1].includes(data.state)" class="goods-priceMsg-right">
						{{timeFormat(data.startAt)}}开售
					</text>
					<text v-else :id="data.goodCode" class="goods-priceMsg-right">
						{{listPlan(data,'str')}}
					</text>
				</div>
				<div class="goods-merchant" @click="onClickSellerShop(data)">
					<image class="merchant-logo" mode="aspectFill" :src="decodeURIComponent(data.merchantLogo)"/>
					<image v-if="data.merchantLevel&&merchantLevelItem['icon']" class="avatar-level" :src="`/static/goods/v2/good_small_${merchantLevelItem['icon']}.png`" />
					<text class="bussName">{{data.merchantName}}</text>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	const app = getApp().globalData.app;
	import { gameplayType, MerchantLevel } from "@/tools/DataExchange.js"
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
			goodsTypeData(){
				const { pintuan_type } = this.data;
				return gameplayType[pintuan_type]
			},
			goodsData(){
				const { pintuan_type, saleMode, state } = this.data;
				const remainingRandom = saleMode==1&&state==1
				return {
					isRandom:[10,11].includes(pintuan_type),
					typeName: remainingRandom ? '剩余随机' : (this.goodsTypeData.name || ''),
					remainingRandom,
					iconSrc:([10,11].includes(pintuan_type) || remainingRandom) ? '1' : '2'
				}
			},
			nodesTypeName(){
				const typeName = this.goodsData.typeName;
				const name1 = typeName.slice(0,2);
				const name2 = typeName.slice(2);
				return [{
					name: 'div',
					children: [
						{ type: 'text', attrs: { class: 'icon-text',style:`color:${this.goodsTypeData.color}` }, text: name1 },
						{ type: 'text', attrs: { class: 'icon-text' }, text: name2 }
					]
				}]
			},
			nodesTitle(){
				return [{
					name: 'div',
					children: [
						{ type: 'text', attrs: { class: 'hide-text' }, text: this.goodsData.typeName },
						{ type: 'text', attrs: { class: 'title-text' }, text: this.data.title }
					]
				}]
			},
			progressWidth(){
				return {
					width:Math.floor((100-this.listPlan(this.data,'num'))*3.57)+'rpx'
				}
			},
			progressStyle(){
				const { progressLeft, progressRight } = this.goodsTypeData
				return {
					'background': `linear-gradient(to right,${progressLeft},${progressRight})`
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
				uni.navigateTo({ url:`/pages/merchant/core?alias=${merchantAlias}` })
			},
			onClickGoDyBroadcast(){
				uni.navigateTo({ url:'/pages/goods/dyBroadcast' })
			},
			goGoodsDetails(goodCode=""){
				app.navigateTo.goGoodsDetails(goodCode||this.data.goodCode)
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
			},
			timeFormat(time){
				return uni.$u.timeFormat(time,"mm-dd hh:MM")
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
	@mixin linePadding{
		width: 357rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.goods-container{
		width: 357rpx;
		height:473rpx;
		margin-top: 12rpx;
	}
	.goods-content{
		width: 357rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		overflow: hidden;
		padding:0;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.goods-pic{
		width: 357rpx;
		height: 277rpx;
		border-top-left-radius: 5rpx;
		border-top-right-radius: 5rpx;
	}

	.goods-index{
		width: 357rpx;
		height:196rpx;
		background: #FFFFFF;
		padding-top: 2rpx;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.goods-header{
		@include linePadding;
		height:75rpx;
		position: relative;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
		margin-top: 14rpx;
	}
	.richtext{
		width: 317rpx;
		height: 72rpx;
		line-height:34rpx;
		text-overflow: ellipsis;
		word-wrap:anywhere;
		font-weight: 300;
	}
	.cardicon{
		width:66rpx;
		height:21rpx;
		margin-right: 10rpx;
		position: absolute;
		border:1rpx solid #e8e8e8;
		border-radius: 5rpx;
		@include flexCenter;
		text-align: center;
		line-height: 19rpx;
		left:20rpx;
		top:8rpx;
		font-weight: 600;
	}
	.icon-text{
		height:30rpx;
		line-height:30rpx;
		font-size: 14rpx;
		color: #333;
		@include flexCenter;
	}
	.hide-text{
		font-size: 19rpx;
		background:rgba(0,0,0,0);
		color:rgba(0,0,0,0)
	}
	.title-text{
		font-size: 24rpx;
		font-weight: 300;
		color: #333333;
	}
	.goods-priceMsg{
		flex:1;
		height: 33rpx;
		@include flexCenter;
		position: relative;
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
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
	}
	.price-text {
		font-size: 28rpx;
		font-weight: 600;
		margin-left: -6rpx;
	}
	.decimal{
		font-size: 18rpx;
		margin-bottom: 4rpx;
	}
	.lowest {
		font-size: 18rpx;
		color: #C0C0C0;
		margin-left: 6rpx;
		margin-bottom: 4rpx;
	}
	.goods-priceMsg-right{
		align-items: flex-end;
		font-size: 22rpx;
		color: #C0C0C0;
		margin-bottom: -2rpx;
	}
	.goods-progress {
		background: linear-gradient(to right,#FFBAC9,#FA1545);
		width: 357rpx;
		height: 6rpx;
		@include flexCenter;
		justify-content: flex-end;
	}
	.progressMask {
		height: 6rpx;
		background-color: #fff;
	}
	.goods-merchant {
		@include linePadding;
		height:50rpx;
		@include flexCenter;
		position: relative;
		justify-content: flex-start;
		background:#fff;
		border-bottom-left-radius: 5rpx;
		border-bottom-right-radius: 5rpx;
		padding-top: 20rpx;
	}
	.bussName {
		width: 246rpx;
		font-size: 22rpx;
		color: #9FA4B0;
		lines:1;
		text-overflow: ellipsis;
	}
	.merchant-logo{
		width: 30rpx;
		height:30rpx;
		margin-right: 10rpx;
		border-radius: 50%;
	}
	.avatar-level{
		width: 21rpx !important;
		height:17rpx !important;
		position: absolute;
		bottom:0rpx;
		left:36rpx;
		z-index: 4;
	}
	// 边播边拆
	.dyBroadcast{
		width: 357rpx;
		height:473rpx;
		border-radius: 5rpx;
		position: relative;
	}
	.dy-bg{
		width: 357rpx;
		height:473rpx;
		border-radius: 5rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: 1;
	}
	.dy-container{
		width: 357rpx;
		height:473rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: 2;
		@include flexCenter;
		flex-wrap: wrap;
		padding-top:33rpx ;
	}
	.dy-header{
		width: 357rpx;
		height:34rpx;
		@include flexCenter;
	}
	.dy-icon{
		width: 31rpx;
		height:34rpx;
		margin-right: 7rpx;
	}
	.dy-title{
		font-weight: 600;
		font-size: 30rpx;
		color: #333333;
	}
	.dy-goods-box{
		width: 357rpx;
		height:406rpx;
		@include flexCenter;
		padding:0 24rpx;
		flex-wrap: wrap;
		flex-direction:column
	}
	.dy-goods-index{
		width: 309rpx;
		height:88rpx;
		@include flexCenter;
		justify-content: space-between;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.dy-goods-left{
		width: 114rpx;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		@include flexCenter;
		position: relative;
	}
	.dy-goods-pic{
		width: 114rpx;
		height: 88rpx;
		border-radius: 4rpx;
	}
	.dy-merchant-pic{
		width: 42rpx;
		height:42rpx;
		border-radius: 50%;
		position: absolute;
		left:1rpx;
		top:-18rpx;
	}
	.dy-goods-right{
		width: 164rpx;
		height:88rpx;
		@include flexCenter;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.dy-goods-title{
		width: 164rpx;
		height:50rpx;
		font-weight: 300;
		font-size: 20rpx;
		color: #333333;
		lines:2;
		text-overflow: ellipsis;
		line-height: 25rpx;
		word-wrap:anywhere;
	}
	.dy-goods-priceMsg-left{
		height: 40rpx;
		margin-bottom: -4rpx;
		@include flexCenter;
		align-items: flex-end;
	}
	.dy-price-icon{
		font-size: 22rpx;
		font-weight: 600;
		color: #333333;
	}
	.dy-price-text {
		font-size: 22rpx;
		font-weight: 600;
		margin-left: -6rpx;
	}
	.dy-decimal{
		font-size: 18rpx;
		margin-bottom: 2rpx;
	}
	.dy-lowest {
		font-size: 18rpx;
		color: #C0C0C0;
		margin-left: 6rpx;
		margin-bottom: 2rpx;
	}
	// 广告商品
	.ad-box{
		width: 357rpx;
		height:473rpx;
		position: relative;
		border-radius: 5rpx;
		overflow: hidden;
	}
	.bg-top{
		width: 357rpx;
		height:315rpx;
		position: absolute;
		top:0;
		left:0;
		z-index: 1;
	}
	.bg-bottom{
		width: 357rpx;
		height:215rpx;
		position: absolute;
		bottom:0;
		left:0;
		z-index: 2;
	}
	.ad-goods-box{
		width: 357rpx;
		height:215rpx;
		position: absolute;
		bottom:0;
		left:0;
		z-index: 3;
	}
	.ad-goods-tips{
		position: absolute;
		bottom:10rpx;
		right: 10rpx;
		height:30rpx;
		@include flexCenter;
		border:1rpx solid #9FA4B0;
		padding:0 6rpx;
		border-radius: 4rpx;
	}
	.ad-tips-text{
		font-size: 18rpx;
		color: #9FA4B0;
	}
	.ad-goods-header{
		width: 357rpx;
		height:60rpx;
		@include flexCenter;
		padding-left: 23rpx;
		padding-right: 14rpx;
		justify-content: space-between;
	}
	.ad-goods-priceMsg-left{
		height: 40rpx;
		@include flexCenter;
		align-items: flex-end;
	}
	.ad-price-icon{
		font-size: 28rpx;
		font-weight: 600;
		color: #535670;
	}
	.ad-price-text {
		font-size: 28rpx;
		font-weight: 600;
		color:#535670;
		margin-left: -6rpx;
	}
	.ad-decimal{
		font-size: 22rpx;
		font-weight: 600;
		margin-bottom: 2rpx;
		color: #535670;
	}
	.ad-lowest {
		font-size: 18rpx;
		color: #535670;
		margin-left: 4rpx;
		margin-bottom: 4rpx;
	}
	.ad-goods-priceMsg-right{
		align-items: flex-end;
		font-size: 20rpx;
		color: #898EB6;
		margin-bottom: -2rpx;
	}
	.ad-goods-center{
		width: 357rpx;
		height:158rpx;
		padding:0 18rpx;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.ad-goods-slogan{
		width: 321rpx;
		height:56rpx;
		font-size: 26rpx;
		color: #333333;
		font-weight: 600;
		line-height: 56rpx;
		lines:1;
		text-overflow: ellipsis;
	}
	.ad-goods-title{
		width: 321rpx;
		font-weight: 300;
		font-size: 20rpx;
		color: #B0B0B0;
		lines:1;
		text-overflow: ellipsis;
	}
	.ad-goods-merchant{
		width: 321rpx;
		font-size: 22rpx;
		color: #9FA4B0;
		lines:1;
		text-overflow: ellipsis;
		margin-top: 29rpx;
	}
</style>
