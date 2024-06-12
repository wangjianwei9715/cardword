<!--
 * @FilePath: \jichao_app_2\src\pages\index\component\index_v3\medalPopup.vue
 * @Author: wjw
 * @Date: 2024-05-13 16:14:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-11 11:58:17
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<div class="medalPopup" v-if="show">
		<div class="medalPopup-showdow" ></div>
		<div class="medalPopup-box">
			<div class="medalPopup-index show">
				<image class="medalPopup-bg" src="@/static/medal/popup_bg.png"></image>
				<image @click="onClickClose" class="close" src="@/static/index/close.png"/>
				<image class="icon-medal" :src="medalPopupData.pic"/>
				<div class="name-line">
					<text class="medal-name">{{medalPopupData.name}}</text>
				</div>
				<text class="medal-title">{{medalPopupData.title}}</text>
			</div>
			<div class="medal-btn" @click="onClickGoDetail">
				<image class="btn-image" src="@/static/medal/popup_btn.png"/>
				<text class="btn-text">{{medalPopupData.btnMsg}}</text>
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
			data:{
				type: Object,
				default: () => {}
			},
			newMedalList:{
				type:Array,
				default: () => []
			}
		},
		computed:{
			medalPopupData() {
				const newMedalLength = this.newMedalList.length;
				const noReward = newMedalLength>0;
				const medal = noReward ? this.newMedalList[0] : this.data;
				return {
					title:noReward?`恭喜您获得了${newMedalLength}枚勋章`:"恭喜，获得勋章点亮奖励！",
					name:`${medal.name} ${newMedalLength>1?`等${newMedalLength}枚`:""}`,
					pic:medal.pic,
					btnMsg:noReward?"去看看":"前往领取优惠券"
				}
			}
		},
		methods: {
			close(){
				this.$emit('update:show', false)
				uni.showTabBar()
			},
			onClickClose(){
				this.close()
			},
			onClickGoDetail(){
				this.onClickClose()
				app.navigateTo.goMedalIndex(0,this.data.id||0)
			}
		}
	}
	
</script>

<style scoped lang="scss">
	@font-face {
		font-family: "YouSheBiaoTiHei";
		src: url("~@/common/Tao/YouShe.ttf");
	}
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
	.medalPopup{
		width: 100%;
	}
	.medalPopup-showdow{
		width: 750rpx;
		position: fixed;
		top:0;
		left:0;
		bottom:0;
		right:0;
		z-index:999;
		background: rgba(0, 0, 0, 0.5);
	}
	.medalPopup-box{
		width: 750rpx;
		height:1000rpx;
		position: fixed;
		top:300rpx;
		z-index: 99999999;
		@include flexCenter
	}
	.medalPopup-index{
		width: 750rpx;
		height:657rpx;
		position: relative;
		padding-top: 254rpx;
		@include flexCenter
	}
	.medalPopup-bg{
		width: 750rpx;
		height:657rpx;
		position: absolute;
		top:0;
		left:0;
	}
	.show{
		transform: scale(1);
	}
	.close{
		width: 55rpx;
		height:55rpx;
		position: absolute;
		top:72rpx;
		right:174rpx;
	}
	.icon-medal{
		width: 227rpx;
		height:227rpx;
		border-radius: 50%;
		background:red;
		margin-bottom: 30rpx;
	}
	.name-line{
		width: 750rpx;
		height:93rpx;
		@include flexCenter
	}
	.medal-name{
		color:#fff;
		font-size: 22rpx;
	}
	.medal-title{
		width: 750rpx;
		font-size: 40rpx;
		text-align: center;
		font-family: YouSheBiaoTiHei;
		color:#fff;
	}
	.medal-btn{
		width: 296rpx;
		height:77rpx;
		line-height: 77rpx;
		position: relative;
		margin-top: 40rpx;
		@include flexCenter
	}
	.btn-image{
		width: 296rpx;
		height:77rpx;
		position: absolute;
		left:0;
		top:0;
	}
	.btn-text{
		font-size: 34rpx;
		font-family: YouSheBiaoTiHei;
		color:#fff;
	}
</style>
