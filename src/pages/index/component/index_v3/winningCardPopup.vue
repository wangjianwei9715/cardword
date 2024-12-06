<template>
	<div class="winning" v-if="show">
		<div class="winning-popup">
			<image class="winning-img" src="@/static/index/v2/drawCard.png" />
			<div class="winning-btn" @click="onClickJumpWinning">
				<image class="btn-iocn" src="@/static/index/v2/drawCard_btn.png" />
				<text class="btn-text">点击查看</text>
			</div>
			<image class="winning-close" @click="onClickCloseWinning" src="@/static/goods/drawcard/close.png"></image>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			show:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				showBtn:false,
			}
		},
		methods: {
			onClickJumpWinning(){
				this.onClickCloseWinning();
				uni.navigateTo({
					url:'/pages/userinfo/winningCard/index'
				})
			},
			onClickCloseWinning(){
				this.showImg = false;
				this.showBtn = false;
				this.$emit('update:show', false)
				uni.showTabBar()
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
		// #endif
	}
	.winning{
		width: 750rpx;
		position: fixed;
		top:0;
		left:0;
		bottom:0;
		right:0;
		z-index:999;
		background: rgba(0, 0, 0, 0.8);
	}
	.winning-popup{
		width: 750rpx;
		height:600rpx;
		position: fixed;
		left:0;
		top:300rpx;
		z-index: 99999999;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.winning-img{
		width: 750rpx;
		height:486rpx;
	}
	.winning-btn{
		width: 750rpx;
		height:64rpx;
		position: relative;
		@include flexCenter;
	}
	.btn-iocn{
		width: 249rpx;
		height:64rpx;
		position: absolute;
		left:250rpx;
		top:0;
	}
	.btn-text{
		@include flexCenter;
		font-size: 33rpx;
		
		color: #FEFEFE;
	}
	.winning-close{
		width: 29rpx;
		height:32rpx;
		margin-top: 50rpx;
	}
</style>
