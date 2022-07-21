<template>
	<view class="content">
		<!-- 顶部导航 -->
		<view class="anchor-navigation">
			<view class="navigation-cut">
				<view class="cut-box">
					<view class="avatar-bg">
						<muqian-lazyLoad class="avatar" :src="userData.avatar==''?defaultAvatar:decodeURIComponent(userData.avatar)" borderRadius="50%"  />
					</view>
					{{userData.userName==''?'请选择':userData.userName}}
					<view class="user-choice"></view>
				</view>
			</view>
			<view class="navigation-back" @click="onClickBack()">
				<text class="back-tips">THE CARDS WORLD</text>
				<text class="back-text">退出</text>
			</view>
		</view>

		<view class="anchor-center">
			<!-- 左侧进度条 -->
			<view class="progress-box">
				<view class="progress-center">
					<muqian-lazyLoad class="detail-pic" :src="decodeURIComponent(detailData.pic)" />
					<view class="goods-pro">
						<view class="progress" :style="{'width':getProgress()+'%'}"></view>
						<view class="progress-q" :style="{'left':getProgress()+'%'}">
							<view class="progress-text">{{getProgress()}}<text>%</text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 卡片拖动控件 -->
			<movable-area class="movable-area">
				<movable-view
					class="movable-content"
					:disabled=" index != stepIndex || index == totalNum "
					:class="{ 'end-pic': index < stepIndex}"
					v-for="(item, index) in picData"
					:key="index"
					:animation="false"
					@change="onChangeMovable"
					direction="all"
					:x="index == stepIndex ? moveData.x : moveData.x_init"
					:y="index == stepIndex ? moveData.y : moveData.y_init"
					:style="'z-index:' + (999 - index)"
					v-show="stepIndex<=index"
				>
					<view v-if="index == 0" class="movable-box dangban" @touchstart.prevent="picTouchStart" @touchend.prevent="picTouchEnd"  ></view>
					<view v-else-if="item.color=='SP' && index < stepIndex + 6" class="movable-box" @touchstart.prevent="picTouchStart" @touchend.prevent="picTouchEnd">
						<image class="movable-box-sp" :class="movableAni" @load="onLoadMovablePic(index)" :src="index < stepIndex + 6 ||  (item.pic!=''?item.pic:defultPic) " mode="aspectFill"/>
					</view>
					<view
						v-else-if="index < stepIndex + 6"
						class="movable-box"
						:class="[(index == stepIndex + 1)&&item.color=='gold'?'container':'',item.color==''?'movable-box-silver':'movable-box-' + item.color]"
						@touchstart.prevent="picTouchStart"
						@touchend.prevent="picTouchEnd"
					>
						<view v-if="item.color == 'gold'" class="movable-gold" v-show="index == stepIndex + 1 || index == stepIndex" >
						</view>
						<view v-if="item.rc" class="icon-rc"></view>
						<image
							class="movable-pic"
							mode="aspectFill"
							:lazy-load="true"
							:src="item.pic!=''?item.pic:defultPic"
						></image>
					</view>
				</movable-view>
			</movable-area>

			<view class="card-shadow" :class="stepIndex>0?'card-shadow-'+picData[stepIndex].color : ''"></view>
			<!-- 右侧卡密详情 -->
			<view class="CarMy-box">
				<view class="CarMy-center">
					<view class="CarMy-title">卡片编号</view>
					<view class="CarMy-team" style="margin-bottom:10rpx">{{stepIndex>0?cardList[stepIndex-1].team:''}}</view>
					<view class="CarMy-team">{{stepIndex>0?cardList[stepIndex-1].player:''}}</view>
					<view class="CarMy-team">{{stepIndex>0?cardList[stepIndex-1].name:''}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { parsePic } from "@/tools/util";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		defaultAvatar = app.defaultAvatar;
		detailData:any = {};
		userData:{[x:string]:any} = {
			orderCode: '', //
            userName: "", //用户昵称
            avatar: "", //用户头像
            cuokaNum: 1, //待搓组数
            payTime: '', 
		}
		defultPic = '../../static/goods/drawcard/default.png';
		picData:any = [ ''];
		cardList:{[x:string]:any} = [];
		cardNoParams:{[x:string]:any} = {
			pageIndex:1,
			pageSize:30,
			noMoreData:false,
			orderCode:''
		}
		totalNum = 0;
		stepIndex = 0;
		moveData:{[x:string]:number} = {
			x:0,
			y:0,
			x_init:0,
			y_init:0,
		}
		changeMove:any = {};
		movableAni:any = '';
		onLoad(query:any) {
			this.detailData = JSON.parse(query.data)
			if(query.picType == 1){
				this.defultPic = '../../static/goods/drawcard/default_.png';
			}
			uni.getSystemInfo({
				success: (res) => {
					// 根据 model 进行判断
					uni.getSystemInfo({
						success: (res:any) => {
							let x = (res.windowWidth/2) - uni.upx2px(175);
							let y = uni.upx2px(650);
							this.moveData = {
								x:x,
								y:y,
								x_init:x,
								y_init:y
							}
						}
					});
				},
			});
		}
		initEven(){
			let params = {
				pageIndex:1,
				pageSize:10
			}
			app.http.Get('my/cuoka/home',params,(res:any)=>{
				console.log(res)
			})
		}
		onUnload() {
			plus.screen.lockOrientation('portrait-primary')
		}
		picTouchStart() {
			// 拖拽开始 记录位置
			if (this.stepIndex  >= this.totalNum ) {
				return;
			}
			this.moveData.x = this.moveData.x_init+1;
			this.moveData.y = this.moveData.y_init
		}
		picTouchEnd() {
			// 初始位置和移动后位置
			const iX = this.moveData.x_init;
			const iY = this.moveData.y_init;
			const mX = this.changeMove.x;
			const mY = this.changeMove.y;
			let move_x = Math.abs(mX - iX);
			let move_Y = Math.abs(mY - iY);
			
			if(move_x>uni.upx2px(175) || move_Y>uni.upx2px(250)){
				if(this.stepIndex<this.totalNum){
					this.stepIndex++;
					let color = this.picData[this.stepIndex+1].color;
					if(( color == 'gold' || color == 'SP')){
						uni.vibrateLong({
							success: function() {
							console.log('success');
							}
						});
					}
				}
			}
			this.moveData.x = this.moveData.x_init;
			this.moveData.y = this.moveData.y_init
		}
		onChangeMovable(event: any) {
			// 获取拖拽坐标
			this.changeMove = event.detail;
		}
		reqNewData(cb?:Function) {
			// 获取更多搓卡
			let params = this.cardNoParams
			if (params.noMoreData) {
				return;
			}
			app.http.Get('my/cuoka/user/cardNo/'+params.orderCode, params, (data: any) => {
				if(data.list){
					let listData = data.list
					for(let i in listData){
						listData[i].pic = parsePic(decodeURIComponent(listData[i].pic));
					}
					this.picData = this.picData.concat(listData);
				}
				if(data.totalPage<=params.pageIndex){
					this.movableAni = this.setSpAni(Number(data.sp))
					params.noMoreData = true;
					if(cb) cb()
				}else{
					params.pageIndex++;
					setTimeout(()=>{
						this.reqNewData(cb)
					},10)
				}
			});
		}
		setSpAni(sp:number){
			switch(sp){
			case 1:
				return 'movable-box-xzj'
			case 2:
				return 'movable-box-noir'
			}
		}
		getProgress():number{
			let item = this.detailData;
			return Math.floor(((item.lockNum+item.currentNum)/item.totalNum) * 100)
		}
		onClickBack(){
			uni.navigateBack({
				delta:1
			})
		}
	}
</script>

<style lang="scss" scoped>
	.anchor-navigation{
		width: 100%;
		height:97rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0rpx 17rpx 0rpx 17rpx;
		.navigation-cut{
			width: 287rpx;
			height:71rpx;
			background: url(@/static/anchor/cut_bg.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			margin-top: 30rpx;
			.cut-box{
				width: 100%;
				height:50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding:0 45rpx 0 23rpx;
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				.avatar-bg{
					width: 46rpx;
					height:46rpx;
					background: url(@/static/anchor/logo_bg.png) no-repeat center;
					background-size: 100% 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.avatar{
						width: 42rpx;
						height:42rpx
					}
				}
				.user-choice{
					width: 37rpx;
					height:27rpx;
					background: url(@/static/anchor/icon_cut.png) no-repeat center;
					background-size: 100% 100%;
				}
			}
		}
		.navigation-back{
			width: 525rpx;
			height:63rpx;
			background: url(@/static/anchor/back_bg.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			.back-tips{
				font-size: 28rpx;
				font-family: Avenir;
				font-weight: normal;
				color: #FFFFFF;
				margin-right: 19rpx;
				margin-top: 5rpx;
			}
			.back-text{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-left: 19rpx;
			}
		}
	}
	.content{
		width: 100%;
		height:750rpx;
		background:url(@/static/anchor/bg.png) no-repeat center;
		background-size: 100% 750rpx;
		position: fixed;
		left:0;
		top:0;
		right:0;
		display: block;
	}
	
	.anchor-center{
		width: 100%;
		height:617rpx;
		background:url(@/static/anchor/c_bg.png) no-repeat center;
		background-size: 100% 617rpx;
		display: flex;
		position: relative;
		// 进度条
		.progress-box{
			width: 496rpx;
			height:498rpx;
			background:url(@/static/anchor/pro_bg.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left:0;
			bottom:0;
			.progress-center{
				width: 366rpx;
				height:400rpx;
				box-sizing: border-box;
				margin-left:78rpx;
				padding-top: 66rpx;
				.detail-pic{
					width: 289rpx;
					height:222rpx;
					margin:0 auto;
					margin-bottom: 30rpx;
				}
				// 进度
				.goods-pro{
					width: 293rpx;
					height:31rpx;
					// background:#F6F7FB;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					margin:0 auto;
					position: relative;
					.progress{
						width: 0%;
						height:inherit;
						transition: all 0.3s linear;
						background:url(@/static/anchor/pro_j.png) no-repeat center;
					}
					.progress-q{
						width: 75rpx;
						height:52rpx;
						background:url(@/static/anchor/pro_q.png) no-repeat center;
						background-size: 100% 100%;
						box-sizing: border-box;
						position: absolute;
						top:50%;
						margin-top: -32rpx;
						left:0;
						margin-left: -50rpx;
						transition: all 0.3s linear;
						.progress-text{
							width: 50rpx;
							height:50rpx;
							position: absolute;
							right:-5rpx;
							bottom:2rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 23rpx;
							font-family: PingFang SC;
							font-weight: 600;
							color: #FFFFFF;		
							box-sizing: border-box;				
						}
						.progress-text text{
							font-size: 15rpx;
						}
					}
				}
				// 
			}
		}

		// 卡片
		.movable-area {
			width: 100%;
			height: 1750rpx;
			position: fixed;
			left: 0;
			top: -500rpx;
			pointer-events: none;
			z-index: 100;
		}
		.movable-content {
			pointer-events: auto;
			width: 350rpx;
			height: 500rpx;
		}
		.movable-box {
			width: 350rpx;
			height: 500rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.movable-pic {
			width: 320rpx;
			height: 420rpx;
			will-change: transform;
		}
		.dangban {
			background: url("../../static/goods/drawcard/card_dangban.png") no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-sp{
			border-width: 2rpx;
			width: 350rpx;
			height: 500rpx;
			position: relative;
			z-index: 0;
			overflow: hidden;
			box-sizing: border-box;
			padding: 0;
			z-index: 0;
			border-radius: 5rpx;
		}
		.movable-box-xzj::after, .movable-box-xzj::before {
			box-sizing: border-box;
		}
		.movable-box-xzj::before {
			content: '';
			position: absolute;
			z-index: -2;
			left: -50%;
			top: -50%;
			width: 200%;
			height: 200%;
			background-color: #C2C7CD;
			background-repeat: no-repeat;
			background-position: 0 0;
			background-image: conic-gradient(transparent,  rgb(243, 10, 126), transparent 30%);
			animation: rotate 2.5s linear infinite;
		}
		.movable-box-xzj::after {
			content: '';
			position: absolute;
			z-index: -1;
			left: calc(var(2rpx) / 2);
			top: calc(var(2rpx) / 2);
			width: calc(100% - var(2rpx));
			height: calc(100% - var(2rpx));
			background: #000;
			border-radius: 5px;
			// animation: opacityChange 5s infinite linear;
		}
		@keyframes opacityChange {
			50% {
				opacity:.5;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes rotate {
			100% {
				transform: rotate(1turn);
			}
		}

		// noir动效
		.movable-box-noir::before {
			content:"";
			position: absolute;
			width:200rpx;
			height:100%;
			top:0;
			left:-100%;
			overflow: hidden;
			background: -moz-linear-gradient(left,
				rgba(255, 255, 255, 0)25%,
				rgba(255, 255, 255, .2)50%,
				rgba(255, 255, 255, 0)75%);
			background: -webkit-gradient(linear, left top, right top,
				color-stop(25%, rgba(255, 255, 255, 0)),
				color-stop(50%, rgba(255, 255, 255, .2)),
				color-stop(75%, rgba(255, 255, 255, 0)));
			background: -webkit-linear-gradient(left,
				rgba(255, 255, 255, 0)25%, 
				rgba(255, 255, 255, .2)50%, 
				rgba(255, 255, 255, 0)75%);
			background: -o-linear-gradient(left, 
				rgba(255, 255, 255, 0)25%, 
				rgba(255, 255, 255, .2)50%, 
				rgba(255, 255, 255, 0)75%);
			transform: skewX(-45deg);
			-webkit-transform: skewX(-45deg);
			-moz-transform: skewX(-45deg);
			animation:tolight 3s infinite  linear;
			-webkit-animation:tolight 3s infinite  linear;

		}
		/*光影划过动画*/
		@keyframes tolight
		{
			30% {
				left:-100%;
			}
			60% {
				left:200%;
			}
			100% {
				left:200%;
			}
		}
		@-webkit-keyframes tolight {
			30% {
			left:-100%;
			}
			60% {
				left:200%;
			}
			100% {
				left:200%;
			}
		}

		.movable-box-silver {
			background: url(../../static/goods/drawcard/card_silver.png) no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-red {
			background: url(../../static/goods/drawcard/card_red.png) no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-blue{
			background: url(../../static/goods/drawcard/card_blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-gold {
			background: url(../../static/goods/drawcard/card_gold.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow{
			width: 499rpx;
			height: 111rpx;
			position: absolute;
			bottom:0;
			left:50%;
			margin-left: -249.5rpx;
			background: url("../../static/anchor/sd_mb.png") no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-silver{
			background: url(../../static/anchor/sd_silver.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-red{
			background: url(../../static/anchor/sd_red.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-blue{
			background: url(../../static/anchor/sd_blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-gold{
			background: url(../../static/anchor/sd_gold.png) no-repeat center;
			background-size: 100% 100%;
		}
		// 卡密详情
		.CarMy-box{
			width: 495rpx;
			height:502rpx;
			background:url(@/static/anchor/km_bg.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			right:0;
			bottom:0;
			box-sizing: border-box;
			padding:10rpx 0rpx 0rpx 50rpx;
			.CarMy-center{
				width: 366rpx;
				height:400rpx;
				box-sizing: border-box;
				padding:50rpx 20rpx 0rpx 20rpx;
			}
			.CarMy-title{
				width: 100%;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				text-align: center;
				margin-bottom: 10rpx;
			}
			.CarMy-team{
				width: 100%;
				text-align: center;
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 42rpx;
			}
		}
	}
</style>
