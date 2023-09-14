<template>
	<view class="winning" v-show="show">
		<view class="winning-showdow" ></view>
		<view class="winning-popup">
			<view class="winning-img"  :class="{'img-show':showImg}">
				<muqian-lazyLoad @click="onClickGoGoods" class="img" :style="goodData.style || ''" :src="decodeURIComponent(goodData.pic_url)" />
				<!-- 得物活动特殊处理 -->
				<view class="dewuButton" v-if="goodData.act&&goodData.act==='dewu'" @click="onClickGoGoods">
					88卡币立即兑换
				</view>
			</view>
			<view class="close-box">
				<image @click="onClickClose" class="close-img" src="@/static/index/close.png"/>
			</view>
			<view class="pop-box" @click="no_pop = !no_pop" v-if="!goodData.hideThreeDay">
				<view class="icon-pop" :class="{ 'icon-pop-choice': no_pop }" ></view>三天内不再接收此类弹窗
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("show",{
			type:Boolean
		}) showSync!: Boolean;
		@Prop({default:''})
		goodData!:any;
		showImg = false;
		no_pop = false;
		@Watch('show')
		onGoodsDataChanged(val: any, oldVal: any) {
			if(val){
				setTimeout(()=>{
					this.showImg = true;
				},100)
			}
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		close(){
			this.showSync = false;
			uni.showTabBar()
		}
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
		}
		onClickClose(){
			this.close()
			if(!this.goodData.isAct) this.openscreenReport()
		}
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
</script>

<style lang="scss">
	.winning{
		width: 100%;
		box-sizing: border-box;
		&-showdow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index:999;
			background: rgba(0, 0, 0, 0.5);
		}
		&-popup{
			width: 100%;
			height:1000rpx;
			position: fixed;
			top:50%;
			margin-top: -500rpx;
			z-index: 99999999;
			.winning-img{
				// width: 548rpx;
				// height:748rpx;
				transition: all 0.5s;
				margin:0 auto;
				transform: scale(0);
				.img{
					width: 548rpx;
					height:748rpx;
					margin: 0 auto;
				}
			}
			.img-show{
				transform: scale(1);
			}
			.close-box{
				width: 100%;
				height:55rpx;
				margin-top: 48rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.close-img{
				width: 55rpx;
				height:55rpx
			}
		}
		.pop-box{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 140rpx;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.icon-pop{
			width:40rpx;
			height: 40rpx;
			background: url(@/static/userinfo/weixuan@2x.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 16rpx;
		}
		.icon-pop-choice{
			width: 40rpx;
			height: 40rpx;
			background: url(@/static/userinfo/pay_gou.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 16rpx;
		}
	}
	@font-face {
    font-family: "FZLanTingHeiS-H-GB";
    src: url("@/common/Tao/FZLanTingHeiSH.ttf");
}
.dewuButton{
	width:400rpx;height:113rpx;margin: 0 auto;display: block;margin-top: -50rpx;
	background-size: 100% 100%;
	background-image: url("@/static/act/dewu/adButton.png" );
	font-size: 38rpx;
    font-family: FZLanTingHeiS-H-GB;
    font-weight: 400;
    color: #2C2C2C;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
