<template>
	<view>
		<!-- 启动动画 -->
		<view v-if="startIng" class="drawcard-start">
			<view class="drawcard-start-box">
				<image class="drawcard-start-pic" src="https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/start.png"></image>
				<view class="drawcard-start-time">卡密即将开启（{{startTime}}%）</view>
			</view>
		</view>
		<!-- 拆卡内容 -->
		<view v-else class="content" :class="bgType==1?'black-bg':'white-bg'">
			<view class="drawcard-box-header">
				<view class="drawcard-box-header-left"><text>{{stepIndex}}</text>/{{picData.length-1}}</view>
				<button class="drawcard-box-header-right" v-if="(stepIndex == picData.length-1)&&noInterval" @click="onClickAgain">重新体验</button>
				<button class="drawcard-box-header-right" v-else-if="noInterval" @click="onClickShowPopup">自动解锁</button>
				<button class="drawcard-box-header-right" v-else @click="clearIntervalCard">暂停</button>
			</view>
			
			<!-- 卡片拖动控件 -->
			<movable-area class="movable-area">
				<movable-view  class="movable-content" :disabled="(index!=stepIndex)||((index+1)==picData.length)||!noInterval" :class="{'end-pic':index<stepIndex}" v-for="(item,index) in picData" :key="index" :animation="false"  @change="onChangeMovable" direction="all" :x="index==stepIndex?moveX:'645rpx'" :y="index==stepIndex?moveY:moveYe" :style="'z-index:'+(999-index)">
					<view v-if="index==0" class="movable-box dangban"  @touchstart.prevent="picTouchStart" @touchend.prevent="picTouchEnd"></view>
					<view v-else-if="item.level!=4"   class="movable-box" :class="'movable-box-'+item.level" @touchstart.prevent="picTouchStart" @touchend.prevent="picTouchEnd">
						<view class="icon-rc"></view>
						<image class="movable-pic" mode="aspectFill"  :lazy-load="true"  :src="index<stepIndex+5||complete?item.pic:''"></image>
						<view class="movable-box-name" :class="'movable-box-name-'+item.level">{{item.name}}</view>
					</view>
					<view class="movable-gold" v-else v-show="(index == stepIndex+1) || (index == stepIndex)">
						<view  class="movable-box movable-box-4" @touchstart.prevent="picTouchStart" @touchend.prevent="picTouchEnd">
							<view class="icon-rc"></view>
							<image class="movable-pic" mode="aspectFill"   :lazy-load="true"  :src="index<stepIndex+5||complete?item.pic:''"></image>
							<view class="movable-box-name" :class="'movable-box-name-'+item.level">{{item.name}}</view>
						</view>
					</view>
					
				</movable-view>
			</movable-area>

			<view v-if="stepIndex==0" class="tips-start" :style="'top:'+(980+statusBarHeight)+'rpx'"><view class="icon-help"></view>拖动卡片解锁卡密</view>

			<view class="drawcard-bottom">
				<view class="btn-pifu" @click="onClickChangePifu"></view>
				<view class="drawcard-bottom-tips">*图片信息可能存在误差，请以实际卡密为准</view>
				<button class="drawcard-bh-btn" @click="onClickDrawerShow">已解锁卡密</button>
			</view>
		</view>

		<!-- 自动遮罩 -->
		<view class="draw-shadow" v-show="shadowShow">
			<view class="draw-shadow-box">
				<view class="draw-shadow-close" @click="onClickShadowClose"></view>
				<button class="draw-shadow-btn" @click="onClickSetIntervalCard(200)">快 速</button>
				<button class="draw-shadow-btn" @click="onClickSetIntervalCard(1000)">慢 速</button>
			</view>
		</view>

		<bottomDrawer :showDrawer="showDrawer"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		statusBarHeight = app.statusBarHeight
		// 启动动画
		startIng = true;
		startTime = 0;
		startTimeFnc:any;
		// 遮罩
		shadowShow = false;
		// 背景 1黑2白
		bgType = 1
		// 完成体验
		complete = false
		picData:any = [
			'',
			{level:1,pic:'../../static/goods/drawcard/test.png',name:'拉梅洛·鲍尔'},
			{level:2,pic:'../../static/goods/drawcard/test.png',name:'拉梅洛·鲍尔'},
			{level:3,pic:'../../static/goods/drawcard/test.png',name:'拉梅洛·鲍尔'},
			{level:4,pic:'../../static/goods/drawcard/test.png',name:'拉梅洛·鲍尔'},
			{level:2,pic:'../../static/goods/drawcard/test.png',name:'拉梅洛·鲍尔'},
			{level:3,pic:'../../static/goods/drawcard/test.png',name:'拉梅洛·鲍尔'},
		]
		stepIndex = 0;
		moveY:any = '';
		moveX:any = '645rpx';
		
		moveYe:any = '';
		moveYs:any = '';
		// windowWidth 可使用窗口宽度
		// windowHeight 可使用窗口高度
		windowWidth = 0;
		windowHeight = 0;
		boxWidth = 0;
		boxHeight = 0;
		boxTop = 0;
		boxleft = 0;
		MovableDetail:any = {};
		setTimeFnc:any;
		noInterval = true;
		// 底部抽屉
		showDrawer = false
		onLoad(query:any) {
			this.startTimeFnc = setInterval(()=>{
				if(this.startTime<100){
					this.startTime++;
				}else{
					clearInterval(this.startTimeFnc)
					setTimeout(()=>{
						this.startIng = false;
					},1000)
				}
			},10)
			this.moveY = (280+app.statusBarHeight)+'rpx'
			this.moveYe = (280+app.statusBarHeight)+'rpx';
			this.moveYs = (285+app.statusBarHeight)+'rpx';
		}
		initEvent(){
			if(this.windowWidth!=0) return;
			
			// 获取设备宽高以及图片宽高距离
			uni.getSystemInfo({
				success: (res)=> { // res - 各种参数
					this.windowWidth = res.windowWidth;
					this.windowHeight = res.windowHeight;
					let obj = uni.createSelectorQuery().select('.movable-content')

					obj.boundingClientRect((data) =>{ // data - 各种参数
						this.boxWidth = data.width?data.width:0;
						this.boxHeight	 = data.height?data.height:0;
						this.boxTop = data.top?data.top:0
						this.boxleft = data.left?(data.left/145)*645:0;
						console.log(data)
					}).exec()
				}
			})
		}
		// 换肤
		onClickChangePifu(){
			this.bgType = this.bgType==1?2:1
		}
		onClickShowPopup(){
			this.shadowShow = true;
		}
		// 已解锁卡密
		onClickDrawerShow(){
			this.showDrawer = true;
		}
		onClickCloseDrawer(){

			// this.showDrawer = false;
		}
		// 遮罩
		onClickShadowClose(){
			this.shadowShow = false;
		}
		// 重新体验
		onClickAgain(){
			this.stepIndex = 0;
		}
		// 拖拽动画
		onChangeMovable(event:any){
			// 获取拖拽坐标
			if(this.boxleft == 0 && event.detail.source == ''){
				this.boxleft = event.detail.x
			}
			this.MovableDetail = event.detail;
		}
		picTouchStart(){
			// 拖拽开始 记录位置
			if((this.stepIndex+1) >= this.picData.length || !this.noInterval){
				return;
			}
			this.initEvent()
			this.moveY = this.moveYs;
			this.moveX = '650rpx';
		}
		picTouchEnd(){
			// 拖拽结束 计算位置
			let data = JSON.parse(JSON.stringify(this.MovableDetail));
			setTimeout(()=>{
				if(data.x < (this.boxleft-(this.boxWidth/2)) || data.x>(this.boxleft+(this.boxWidth/2)) || data.y<(this.boxTop-(this.boxHeight/2)) || data.y>(this.boxTop+(this.boxHeight/2))){
					this.stepIndex ++
				}
				this.moveY = this.moveYe;
				this.moveX = '645rpx';
				if(this.stepIndex == this.picData.length-1){
					this.complete = true;
				}
			},10)
		}
		// 倒计时自动拆卡
		onClickSetIntervalCard(time:number){
			this.onClickShadowClose();
			this.initEvent()
			this.noInterval = false;
			this.setTimeFnc = setInterval(()=>{
				this.stepIndex ++;
				if((this.stepIndex+1) >= this.picData.length){
					this.complete = true;
					this.clearIntervalCard()
					return;
				}
			},time)
		}
		clearIntervalCard(){
			this.noInterval = true
			clearInterval(this.setTimeFnc)
		}
	}
</script>

<style lang="scss">
	// 启动动画
	.drawcard-start{
		width: 100%;
		height:100%;
		position: fixed;
		z-index: 9999;
		&-box{
			width: 287rpx;
			height:483rpx;
			position: fixed;
			top:50%;
			margin-top: -300rpx;
			left:50%;
			margin-left: -143.5rpx;
		}
		&-pic{
			width: 287rpx;
			height:403rpx;
		}
		&-time{
			width: 100%;
			margin-top: 30rpx;
			font-size: 24rpx;
			font-family: FZLanTingHeiS-R-GB;
			font-weight: 400;
			color: #A3A3A3;
			text-align: center;
		}
	}
	// 
	.content{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		bottom:0;
		display: block;
		z-index: 9;
		padding-top: 90rpx;
		box-sizing: border-box;
	}
	.black-bg{
		background:url(https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/black_bg.jpg) no-repeat center;
		background-size: 100% 100%;
	}
	.white-bg{
		background:url(https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/white_bg.jpg) no-repeat center;
		background-size: 100% 100%;
	}
	.drawcard-box-header{
		width: 460rpx;
		height:224rpx;
		margin:0 auto;
		box-sizing: border-box;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		position: relative;
		z-index: 1;
		.drawcard-box-header-left{
			font-size: 57rpx;
			font-family: DIN Condensed;
			font-weight: bold;
			color: #FFFFFF;
			word-spacing: 10rpx;
			margin-bottom: 10rpx;
		}
		.drawcard-box-header-left text{
			font-size: 117rpx;
			font-family: DIN Condensed;
			font-weight: bold;
			color: #FFFFFF;
		}
		.drawcard-box-header-right{
			width: 142rpx;
			height:44rpx;
			background:url(../../static/goods/drawcard/btn_red.png) no-repeat center;
			background-size: 100% 100%;
			text-align: center;
			line-height: 44rpx;
			font-size: 28rpx;
			font-family: FZLanTingHeiS-DB1-GBK;
			font-weight: 400;
			color: #F9F9F9;
			margin:0;
			margin-bottom: 50rpx;
		}
	}

	.movable-area{
		position: fixed;
		left:-500rpx;
		top:0;
		width: 1750rpx;
		height:100%;
		pointer-events: none;
		z-index:100
	}
	.movable-content{
		pointer-events: auto;
		width: 460rpx;
		height:647rpx;
	}
	.movable-box{
		width: 460rpx;
		height:647rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-rc{
		width: 70rpx;
		height:70rpx;
		background:url(../../static/goods/drawcard/icon_rc.png) no-repeat center;
		background-size: 100% 100%;
		position:absolute;
		left:37rpx;
		top:42rpx;
	}
	.movable-gold{
		width: 560rpx;
		height:747rpx;
		background:url(../../static/goods/drawcard/gold_bg.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:-50rpx;
		top:-50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.movable-box-1{
		background:url(../../static/goods/drawcard/card_silver.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-box-2{
		background:url(../../static/goods/drawcard/card_red.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-box-3{
		background:url(../../static/goods/drawcard/card_blue.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-box-4{
		background:url(../../static/goods/drawcard/card_gold.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-box-name{
		width: 370rpx;
		height:50rpx;
		text-align: 50rpx;
		font-size: 27rpx;
		font-family: FZLanTingHeiS-H-GB;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom:70rpx;
		left:50%;
		margin-left:-185rpx;
		line-height:50rpx
	}
	.movable-box-name-1{
		background:url(../../static/goods/drawcard/card_name_silver.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-box-name-2{
		background:url(../../static/goods/drawcard/card_name_red.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-box-name-3{
		background:url(../../static/goods/drawcard/card_name_blue.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-box-name-4{
		background:url(../../static/goods/drawcard/card_name_gold.png) no-repeat center;
		background-size: 100% 100%;
	}
	.movable-pic{
		width: 410rpx;
		height:600rpx;
		will-change: transform
	}
	.dangban{
		background:url('../../static/goods/drawcard/card_dangban.png') no-repeat center;
		background-size: 100% 100%;
	}
	.end-pic{
		position: fixed;
		left:-9999;
		top:-9999;
		display: none;
	}
	.tips-start{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top:1100rpx;
		left:0;
		font-size: 26rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: #FFFFFF;
	}
	.icon-help{
		width: 32rpx;
		height:32rpx;
		background:url(../../static/goods/drawcard/icon_help.png) no-repeat center;
		background-size:  100% 100%;
		margin-right: 16rpx;
	}
	.drawcard-bottom{
		width: 100%;
		height:140rpx;
		position: fixed;
		bottom:50rpx;
		left:0;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		box-sizing: border-box;
	}
	.drawcard-bottom-tips{
		height:30rpx;
		line-height: 30rpx;
		margin-bottom: 28rpx;
		text-align: center;
		font-size: 20rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: #FFFFFF;
	}
	.drawcard-bh-btn{
		width: 452rpx;
		height:72rpx;
		background:url(../../static/goods/drawcard/btn_white.png) no-repeat center;
		background-size: 100% 100%;
		font-size: 32rpx;
		font-family: FZLanTingHeiS-DB1-GBK;
		font-weight: 400;
		color: #D60312;
		text-align: center;
		line-height: 72rpx;
		margin:0;
		margin-left: 10rpx;
	}
	.btn-pifu{
		width: 48rpx;
		height:42rpx;
		background: url(https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/btn_pifu.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:50rpx;
		bottom:15rpx
	}

	// 遮罩
	.draw-shadow{
		width: 100%;
		height:100%;
		position:fixed;
		top:0;
		left:0;
		z-index: 9999;
		background:rgba(0,0,0,0.7);
	}
	.draw-shadow-box{
		width: 400rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: fixed;
		top:40%;
		left:50%;
		margin-left: -200rpx;
	}
	.draw-shadow-btn{
		width: 394rpx;
		height:69rpx;
		background:url(../../static/goods/drawcard/btn_zd.png) no-repeat center;
		background-size: 100% 100%;
		text-align: center;
		line-height: 75rpx;
		font-size: 37rpx;
		font-family: FZLanTingHeiS-H-GB;
		font-weight: 400;
		color: #2B2B2B;
		margin-bottom: 68rpx;
	}
	.draw-shadow-close{
		width: 29rpx;
		height:32rpx;
		background:url(../../static/goods/drawcard/close.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top:-100rpx;
		right:-30rpx;
	}
	// 换肤白色
	.white-bg .drawcard-box-header-left, .white-bg .tips-start, .white-bg .drawcard-box-header-left text, .white-bg .drawcard-bottom-tips {
		color:#333333
	}
	.white-bg .icon-help{
		background:url(../../static/goods/drawcard/icon_help_white.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 16rpx;
	}
	.white-bg .drawcard-bh-btn{
		background:url(../../static/goods/drawcard/btn_red_white.png) no-repeat center;
		background-size: 100% 100%;
		color:#F9F9F9
	}
</style>
