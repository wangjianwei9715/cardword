<template>
	<view class="content" v-if="rubCardShow">
		<!-- 顶部导航 -->
		<view class="anchor-navigation">
			<view class="navigation-cut" @click="onClickCheckUlist()">
				<view class="cut-num">{{detailData.waitCuoka}}</view>
				<view class="cut-box">
					<view class="avatar-bg">
						<muqian-lazyLoad class="avatar" :src="userData.avatar==''?defaultAvatar:decodeURIComponent(userData.avatar)" borderRadius="50%"  />
					</view>
					<view class="cut-box-name u-line-1">{{userData.userName==''?'请选择':userData.userName}}</view>
					<view class="user-choice"></view>
				</view>
			</view>
			<view class="navigation-back" @click.prevent="onClickBack()">
				<text class="back-tips">THE CARDS WORLD</text>
				<text class="back-text">退出</text>
			</view>
		</view>
		<!-- ####### -->

		<!-- 代搓卡中心位置 -->
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
					:disabled=" index != stepIndex || index >= totalNum "
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
						<image class="movable-box-sp" :class="movableAni" :src="index < stepIndex + 6 && item.pic!=''?item.pic:defultPic" mode="aspectFill"/>
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
							:src="index < stepIndex + 6 && item.pic!=''?item.pic:defultPic"
						></image>
					</view>
				</movable-view>
			</movable-area>

			<view class="card-shadow" :class="stepIndex>0?'card-shadow-'+picData[stepIndex].color : ''"></view>
			<!-- 右侧卡密详情 -->
			<view class="CarMy-box">
				<view class="CarMy-center">
					<view class="CarMy-title">卡片编号<text v-show="totalNum>0">{{stepIndex}}/{{totalNum}}</text></view>
					<view class="CarMy-scroll">
						<view class="CarMy-team">{{stepIndex>0?picData[stepIndex].name:''}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- ############ -->

		<!-- 代搓卡用户 -->
		<view class="popup-shadow" v-show="showUlist">
			<view class="ulist-box">
				<view class="ulist-header">
					等待搓卡
					<view class="ulist-close" @click="showUlist = false"></view>
				</view>
				<scroll-view class="ulist-list" scroll-y="true" @scrolltolower="getUserlist()">
					<view class="ulist-index" v-for="(item,index) in userList" :key="index">
						<view class="ulist-num">{{index+1}}</view>
						<view class="ulist-info">
							<view class="ulist-info-left">
								<view class="ulist-info-top">
									<muqian-lazyLoad class="avatar" :src="item.avatar==''?defaultAvatar:decodeURIComponent(item.avatar)" borderRadius="50%" />
									<view class="ulist-name u-line-1">{{item.userName}}</view>
									<view class="ulist-num">待搓组数：{{item.cuokaNum}}</view>
								</view>
								<view class="ulist-time">发起时间：{{$u.timeFormat(item.createTime,'mm-dd hh:MM')}}</view>
							</view>
							<view class="ulist-btn-box">
								<view class="ulist-btn" @click="onClickStartRub(item)">开始</view>
								<view class="ulist-btn" @click="onClickCancelRub(item.orderCode)">释放</view>	
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- ######### -->
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { parsePic } from "@/tools/util";
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import muqianLazyLoad from "@/components/muqian-lazyLoad/muqian-lazyLoad.vue";
	const cardNoParams = {
		pageIndex:1,
		pageSize:30,
		noMoreData:false,
		orderCode:''
	}
	const userData = {
		orderCode: '', //
		userName: "", //用户昵称
		avatar: "", //用户头像
		cuokaNum: 1, //待搓组数
		payTime: '', 
	}
	const userParams = {
		pageIndex:1,
		pageSize:50,
		noMoreData:false
	}
	@Component({components: { muqianLazyLoad },})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		rubCardShow:any;
		@Prop()
		detailData:any;

		defaultAvatar = app.defaultAvatar;
		defultPic = '../../../static/goods/drawcard/default.png';
		showUlist = false;
		userList:any = [];
		userParams = {...userParams}
		userData = {...userData}
		totalNum = 0;
		stepIndex = 0;
		picData:any = [''];
		cardNoParams = {...cardNoParams}
		moveData:{[x:string]:number} = {
			x:0,
			y:0,
			x_init:0,
			y_init:0,
		}
		changeMove:any = {};
		movableAni:any = '';
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			uni.getSystemInfo({
				success: (res) => {
					// 根据 model 进行判断
					uni.getSystemInfo({
						success: (res:any) => {
							let x = (res.windowHeight/2) - uni.upx2px(180);
							let y = uni.upx2px(650);
							this.moveData = { x:x, y:y, x_init:x, y_init:y }
						}
					});
				},
			});
		}
		destroyed(){
			
		}
		picTouchStart() {
			// 拖拽开始 记录位置
			if (this.stepIndex  >= this.totalNum )  return;
			
			this.moveData.x = this.moveData.x_init+1;
			this.moveData.y = this.moveData.y_init
		}
		onChangeMovable(event: any) {
			// 获取拖拽坐标
			this.changeMove = event.detail;
		}
		picTouchEnd() {
			// 初始位置和移动后位置
			const iX = this.moveData.x_init;
			const iY = this.moveData.y_init;
			const mX = this.changeMove.x;
			const mY = this.changeMove.y;
			let move_x = Math.abs(mX - iX);
			let move_Y = Math.abs(mY - iY);
			
			if(move_x>uni.upx2px(180) || move_Y>uni.upx2px(253)){
				if(this.stepIndex<this.totalNum){
					this.stepIndex++;
					let color = this.picData[this.stepIndex+1].color;
					if(( color == 'gold' || color == 'SP')) uni.vibrateLong({});
				}else{
					app.http.Post(`my/cuoka/release/${this.cardNoParams.orderCode}`,{})
				}
			}
			this.moveData.x = this.moveData.x_init;
			this.moveData.y = this.moveData.y_init
		}
		getUserlist(cb?:Function){
			const params = this.userParams;
			if (params.noMoreData || this.detailData.waitCuoka <=0 )return;
			app.http.Get(`my/cuoka/user/list/${this.detailData.goodCode}`,params,(data:any)=>{
				if(params.pageIndex == 1) this.userList = [];
				this.userList = [...this.userList,...data.list];
				if(data.totalPage<=params.pageIndex) params.noMoreData = true;
				else params.pageIndex++;
				cb && cb()
			})
		}
		releaseCuoka(order:string,cb?:Function){
			app.http.Post(`my/cuoka/release/${order}`,{},(res:any)=>{
				this.$emit('releaseCuoka')
				cb && cb()
			})
		}
		reqNewData(cb?:Function) {
			// 获取更多搓卡
			uni.showLoading({
				title: '卡密加载中',
				mask:true
			});
			const params = this.cardNoParams
			if (params.noMoreData) return;
			app.http.Get(`my/cuoka/user/cardNo/${params.orderCode}`, params, (data: any) => {
				if(data.list){
					let listData = data.list
					for(let i in listData){
						listData[i].pic = parsePic(decodeURIComponent(listData[i].pic));
					}
					this.picData = this.picData.concat(listData);
				}
				if(data.totalPage<=params.pageIndex){
					this.movableAni = this.setSpAni(Number(data.sp));
					this.totalNum = data.total;
					params.noMoreData = true;
					uni.hideLoading();
					if(cb) cb()
				}else{
					params.pageIndex++;
					setTimeout(()=>{ this.reqNewData(cb) },10)
				}
			});
		}
		onClickBack(){
			this.userList = [];
			this.userParams = {...userParams}
			this.userData = {...userData}
			this.totalNum = 0;
			this.stepIndex = 0;
			this.picData = [''];
			this.cardNoParams = {...cardNoParams}
			this.$emit('rubCardClose')
		}
		onClickCheckUlist(){
			this.userParams = { ...userParams }
			this.getUserlist(()=>{ this.showUlist = true})
		}
		onClickStartRub(item:any){
			this.stepIndex = 0;
			this.cardNoParams = {...cardNoParams}
			this.cardNoParams.orderCode = item.orderCode
			
			this.picData = ['']
			// 获取完卡密后释放搓卡
			this.reqNewData(()=>{
				this.releaseCuoka(item.orderCode,()=>{
					this.userData = item;
					this.showUlist = false;
				})
			})
		}
		onClickCancelRub(order:string){
			uni.showModal({
				title: '提示',
				content: '是否取消代搓卡',
				success: (res)=> {
					if (res.confirm) {
						this.releaseCuoka(order,()=>{
							this.onClickCheckUlist()
						})
					}
				}
			});
		}
		getProgress():number{
			let item = this.detailData;
			return Math.floor(((item.lockNum+item.currentNum)/item.totalNum) * 100)
		}
		setSpAni(sp:number):string{
			switch(sp){
				case 1:
					return 'movable-box-xzj';
				case 2:
					return 'movable-box-noir';
				default:
					return '';
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		z-index: 99999;
	}
	.anchor-navigation{
		width: 100%;
		height:97rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0rpx 17rpx 0rpx 17rpx;
		position: relative;
		.navigation-cut{
			width: 287rpx;
			height:71rpx;
			background: url(@/static/anchor/cut_bg.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			margin-top: 30rpx;
			position: relative;
			.cut-num{
				width: 38rpx;
				height: 38rpx;
				background: #EC5E58;
				border-radius: 50%;
				text-align: center;
				line-height: 38rpx;
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				right:-12rpx;
				top:-14rpx
			}
			.cut-box{
				width: 100%;
				height:50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding:0 45rpx 0 23rpx;
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
				.cut-box-name{
					max-width: 150rpx;
					font-size: 33rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
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
			position: absolute;
			right:17rpx;
			top:50%;
			margin-top: -31.5rpx;
			padding-top: 10rpx;
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
							width: 40rpx;
							height:40rpx;
							position: absolute;
							right:-1rpx;
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
			width: 360rpx;
			height: 506rpx;
		}
		.movable-box {
			width: 360rpx;
			height: 506rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.movable-pic {
			width: 330rpx;
			height: 470rpx;
			will-change: transform;
		}
		.icon-rc {
			width: 55rpx;
			height: 56rpx;
			background: url(@/static/anchor/icon_rc.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: 34rpx;
			top: 34rpx;
		}
		.movable-gold {
			width: 400rpx;
			height: 550rpx;
			background: url(@/static/goods/drawcard/gold_bg.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: -25rpx;
			top: -25rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.dangban {
			background: url(@/static/goods/drawcard/card_dangban.png) no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-sp{
			border-width: 2rpx;
			width: 360rpx;
			height: 506rpx;
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
		.container{
			animation-name:container; 
			animation-duration:1s; /*动画时间*/
		}

		@keyframes container{
			0%,
			100%,
			20%,
			50%,
			80% {
				transition-timing-function: cubic-bezier(0.215,.61,.355,1); /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
				transform: translate3d(0,0,0); /*设置只在Z轴上移动*/
			}
			40%,
			43%{
				transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
				transform: translate3d(0,-30px,0);
			}
			70%{
				transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
				transform: translate3d(0,-15px,0);
			}
			90%{
				transform: translate3d(0,-3px,0);
			}
		}
		.movable-box-silver {
			background: url(@/static/goods/drawcard/card_silver.png) no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-red {
			background: url(@/static/goods/drawcard/card_red.png) no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-blue{
			background: url(@/static/goods/drawcard/card_blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.movable-box-gold {
			background: url(@/static/goods/drawcard/card_gold.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow{
			width: 499rpx;
			height: 111rpx;
			position: absolute;
			bottom:0;
			left:50%;
			margin-left: -249.5rpx;
			background: url(@/static/anchor/sd_mb.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-silver{
			background: url(@/static/anchor/sd_silver.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-red{
			background: url(@/static/anchor/sd_red.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-blue{
			background: url(@/static/anchor/sd_blue.png) no-repeat center;
			background-size: 100% 100%;
		}
		.card-shadow-gold{
			background: url(@/static/anchor/sd_gold.png) no-repeat center;
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
				height:350rpx;
				box-sizing: border-box;
				padding:50rpx 20rpx 0rpx 20rpx;
			}
			.CarMy-title{
				width: 100%;
				height:50rpx;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				text-align: center;
				margin-bottom: 10rpx;
			}
			.CarMy-title text{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
			.CarMy-scroll{
				width: 100%;
				height:240rpx;
				overflow-y: auto;
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

	// 代搓卡用户列表
	.popup-shadow{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.61);
		position: fixed;
		left:0;
		top:0;
		right:0;
		z-index: 9999999;
	}
	.ulist-box{
		width: 1109rpx;
		height:649rpx;
		background:url(@/static/anchor/popup_bg.png) no-repeat center / 100% 100%;
		position: fixed;
		left:50%;
		margin-left: -554.5rpx;
		top:50rpx;
		.ulist-header{
			width: 100%;
			height:130rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			.ulist-close{
				position: absolute;
				right:64rpx;
				top:59rpx;
				width: 37rpx;
				height:35rpx;
				background: url(@/static/anchor/close.png) no-repeat center / 100% 100%;
			}
		}
		.ulist-list{
			width: 100%;
			height:500rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.ulist-index{
				width: 1000rpx;
				height:218rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin:0 auto;
				margin-bottom: 20rpx;
				.ulist-num{
					width: 89rpx;
					height:218rpx;
					line-height: 218rpx;
					font-size: 95rpx;
					font-family: Impact;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
				}
				.ulist-info{
					width: 911rpx;
					height:218rpx;
					background: url(@/static/anchor/popup_box.png) no-repeat center / 100% 100%;
					box-sizing: border-box;
					padding:0rpx 70rpx;
					display: flex;
					justify-content: space-between;
				}
				.ulist-info-left{
					width: 500rpx;
					height:190rpx;
					box-sizing: border-box;
					padding: 40rpx 0rpx 40rpx 0rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.ulist-info-top{
						width: 100%;
						height:43rpx;
						display: flex;
						align-items: center;
						.avatar{
							width: 43rpx;
							height:43rpx;
							margin-right: 13rpx;
						}
						.ulist-name{
							width: 184rpx;
							height:43rpx;
							line-height: 43rpx;
							font-size: 27rpx;
							font-family: PingFang SC;
							font-weight: 600;
							color: #FFFFFF;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						.ulist-num{
							width: 245rpx;
							margin-left: 15rpx;
							height:43rpx;
							line-height: 43rpx;
							font-size: 27rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							box-sizing: border-box;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							text-align: left;
						}
					}
					.ulist-time{
						font-size: 21rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
				.ulist-btn-box{
					width: 203rpx;
					height:190rpx;
					box-sizing: border-box;
					padding-top: 27rpx;
					.ulist-btn{
						width: 203rpx;
						height:78rpx;
						background: url(@/static/anchor/popup_btn.png) no-repeat center / 100% 100%;
						font-size: 27rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
						text-shadow: 1px 2px 2px #313132;
						text-align: center;
						line-height: 68rpx;
						box-sizing: border-box;
						letter-spacing:2rpx
					}
				}
			}
		}
	}

</style>