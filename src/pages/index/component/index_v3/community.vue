<template>
	<div class="community" v-if="show">
		<div class="community-showdow" ></div>
		<div class="community-popup">
			<image class="popup-icon1" v-if="!showJoin" src="@/static/userinfo/pay_gou.png"></image>
			<text class="popup-text1">{{showJoin?'加入群聊':'支付成功'}}</text>
			<image class="popup-icon2" src="@/static/userinfo/pay_title.png"></image>
			<div class="popup-icon3">
				<image style="width: 372rpx; height:373rpx;" :src="`../../static/index/v3/qun${random}.jpg`"/>
			</div>
			<text class="popup-text2">截图微信扫码加入社群</text>
			<text class="popup-text3">不定期送福利</text>
			<image class="popup-close" @click="onClose()" src="@/static/goods/close.png"></image>
		</div>
	</div>
</template>

<script >
	export default {
		props: {
			show:{
				type:Boolean,
				default:false
			},
			showJoin:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				random:''
			}
		},
		mounted(){
			this.random = Math.random()>0.5?'1':'2'
		},
		methods: {
			onClose(){
				this.$emit('update:show', false)
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
	.community{
		width: 100%;
	}
	.community-showdow{
		width:750rpx;
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index:999;
		background: rgba(0, 0, 0, 0.5);
	}
	.community-popup{
		width:606rpx;
		height:820rpx;
		position: fixed;
		background:#fff;
		border-radius: 40rpx;
		z-index: 1000;
		left:72rpx;
		top:300rpx;
		padding-top: 57rpx;
		@include flexCenter;
	}
	.popup-text1{
		width: 606rpx;
		text-align: center;
		font-size: 32rpx;
		@include flexCenter;
		font-weight: bold;
		color: #34363A;
		margin-bottom: 47rpx;
	}
	.popup-text2{
		width: 606rpx;
		@include flexCenter;
		text-align: center;
		font-size: 24rpx;
		font-weight: bold;
		color: #34363A;
		margin-bottom: 18rpx;
	}
	.popup-text3{
		width: 606rpx;
		@include flexCenter;
		text-align: center;
		font-size: 24rpx;
		font-weight: bold;
		color: #FB4E3E;
	}
	.popup-icon1{
		width: 48rpx;
		height:48rpx;
		margin-bottom: 14rpx;
	}
	.popup-icon2{
		width: 283rpx;
		height:52rpx;
		margin-bottom: 22rpx;
	}
	.popup-icon3{
		width: 372rpx;
		height:373rpx;
		margin-bottom: 31rpx;
	}
	.popup-close{
		width: 63rpx;
		height:63rpx;
		position: absolute;
		bottom:-86rpx;
		left:271.5rpx
	}

</style>
