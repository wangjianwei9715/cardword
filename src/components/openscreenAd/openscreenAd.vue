<template>
	<view class="winning" v-show="show">
		<view class="winning-showdow" ></view>
		<view class="winning-popup">
			<muqian-lazyLoad @click="onClickGoGoods" class="winning-img" :class="{'img-show':showImg}" :src="decodeURIComponent(goodData.pic_url)" />
			<view class="close-box">
				<image @click="onClickClose" class="close-img" src="@/static/index/close.png"/>
			</view>
			<view class="pop-box" @click="no_pop = !no_pop">
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

		goGoodsDetails = app.navigateTo.goGoodsDetails;
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
		onClickGoGoods(){
			this.openscreenReport(true,false)
			this.showSync = false;
			this.goGoodsDetails(this.goodData.good_code,`&AD_id=${this.goodData.ad_id}`)
		}
		onClickClose(){
			this.showSync = false;
			this.openscreenReport()
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
			background: rgba(0, 0, 0, 0.8);
		}
		&-popup{
			width: 100%;
			height:1000rpx;
			position: fixed;
			top:50%;
			margin-top: -500rpx;
			z-index: 99999999;
			.winning-img{
				width: 548rpx;
				height:748rpx;
				transition: all 0.5s;
				margin:0 auto;
				transform: scale(0);
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
			width: 28rpx;
			height: 28rpx;
			background: url(../../static/userinfo/weixuan@2x.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 24rpx;
		}
		.icon-pop-choice{
			width: 28rpx;
			height: 28rpx;
			background: url(../../static/userinfo/pay_gou.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 24rpx;
		}
	}
	
</style>
