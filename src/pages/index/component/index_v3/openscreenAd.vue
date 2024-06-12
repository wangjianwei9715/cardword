<template>
	<div class="winning" v-if="show">
		<div class="winning-showdow" ></div>
		<div class="winning-popup">
			<div class="winning-img img-show">
				<image @click="onClickGoGoods" :style="goodData.style || ''" class="img" :src="decodeURIComponent(goodData.pic_url)"></image>
			</div>
			<div class="close-box">
				<image @click="onClickClose" class="close-img" src="@/static/index/close.png"/>
			</div>
			<div class="pop-box" @click="no_pop = !no_pop" v-if="!goodData.hideThreeDay">
				<image class="icon-pop" v-if="!no_pop" src="@/static/userinfo/weixuan@2x.png"></image>
				<image class="icon-pop" v-else src="@/static/userinfo/pay_gou.png"></image>
				<text class="pop-text">三天内不再接收此类弹窗</text>
			</div>
		</div>
	</div>
</template>

<script>
	const app = getApp().globalData.app;
	export default {
		props: {
			show:{
				type:Boolean,
				default:false
			},
			goodData:{
				type: Object,
				default: () => {}
			}
		},
		data(){
			return {
				no_pop:false
			}
		},
		methods: {
			close(){
				this.$emit('update:show', false)
				uni.showTabBar()
			},
			onClickGoGoods(){
				if(this.goodData.isAct){
					uni.navigateTo({
						url:this.goodData.url
					})
					this.close()
					return
				}
				this.openscreenReport(true,false)
				this.close()
				app.navigateTo.goGoodsDetails(this.goodData.good_code,`&AD_id=${this.goodData.ad_id}&referer=AD`)
			},
			onClickClose(){
				this.close()
				if(!this.goodData.isAct) this.openscreenReport()
			},
			openscreenReport(click=false,close=true){
				const params = {
					ad_id:this.goodData.ad_id,
					click,
					close,
					no_pop:this.no_pop
				}
				app.http.Post('openscreen/ad/report',params)
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
	.winning{
		width: 100%;
	}
	.winning-showdow{
		width: 750rpx;
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index:999;
		background: rgba(0, 0, 0, 0.5);
	}
	.winning-popup{
		width: 750rpx;
		height:1000rpx;
		position: fixed;
		top:200rpx;
		z-index: 99999999;
		@include flexCenter
	}
	.winning-img{
		// width: 548rpx;
		// height:748rpx;
	}
	.img{
		width: 548rpx;
		height:748rpx;
	}
	.img-show{
		transform: scale(1);
	}
	.close-box{
		width:750rpx;
		height:55rpx;
		margin-top: 48rpx;
		@include flexCenter
	}
	.close-img{
		width: 55rpx;
		height:55rpx
	}
	.pop-box{
		width: 750rpx;
		margin-top: 140rpx;
		font-size: 29rpx;
		font-weight: 400;
		color: #FFFFFF;
		@include flexCenter
	}
	.icon-pop{
		width:40rpx;
		height: 40rpx;
		margin-right: 16rpx;
	}
	.pop-text{
		font-size: 29rpx;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
