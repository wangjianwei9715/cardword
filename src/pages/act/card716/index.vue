<template>
	<view class="content">
		<navigationShare navigatetoTitle="卡展狂欢" :shareData="shareData"/>
		<view style="padding-top:88rpx">
			<statusbar/>
		</view>
		<view class="top">
			<view class="live-state">
				<image class="live-gif" v-if="homeData.broadcastState==1" src="@/static/act/card716/live.gif" />
				{{liveState(homeData.broadcastState)}}
			</view>
			<navigator class="live-btn"  url="/pages/act/card716/live" hover-class="none"></navigator>
		</view>
		<!-- 抽奖内容 -->
		<view class="draw-box">
			<view class="draw-box-header">
				<view class="draw-header-title">玩福利产品赢抽奖</view>
				<view class="draw-header-right">
					<view class="header-right-text" @click.prevent="onClickGoRecord">抽奖记录</view>丨<view class="header-right-text" style="color:#F4E765;font-weight:bold" @click.prevent="showDrawer=true">获取次数</view>
				</view>
			</view>
			<view class="draw-center">
				<slotMachine ref="HMslotMachine" />
				<view class="draw-num">还剩{{homeData.lotteryNum}}次</view>
				<view class="draw-start" @click="drawStart"></view>
			</view>

			<scrollBox :scrollList="scrollList" :indexBg="'rgba(255,255,255,0.48)'">
				<template #scroll="{item}">
					<muqian-lazyLoad class="scroll-avatar" :src="item.avatar==''?defaultAvatar:decodeURIComponent(item.avatar)" borderRadius="50%" />
					{{item.userName}} 抽中了{{item.prizeName}}
				</template>
			</scrollBox>
		</view>
		<!-- 商品列表 -->
		<view class="list-box">
			<view class="list-tabbox">
				<view :class="{'list-tab':true,'list-tab-current':goodParams.tp == item.tp}" v-for="(item,index) in tabData" :key="index" @click="onClickListTab(item)">{{item.name}}</view>
			</view>

			<view class="good-list">
				<view class="good-box" v-for="(item,index) in goodsList" :key="index" @click="onClickJumpDetails(item.goodCode)">
					<view class="good-box-index" v-if="index % 2 === 0">
						<view class="pic-box" >
							<muqian-lazyLoad class="good-pic" :src="decodeURIComponent(item.pic)" />
							<view class="pic-bg"></view>
						</view>
						<view class="good-info">
							<view class="good-title">{{item.title}}</view>
							<view class="good-merchant">
								<muqian-lazyLoad class="merchant-avart" :src="decodeURIComponent(item.logo)" borderRadius="50%"/>
								{{item.merchant}}
							</view>
							<view class="good-desc">
								<view class="good-price">￥<text>{{item.price}}</text></view>
								<view class="good-progress" v-if="item.status == 1">
									<view class="progressMask" :style="{width:(100-getPlan(item.lockNum,item.currentNum,item.totalNum))+'%'}"></view>
									<view class="progressText">{{item.totalNum-(item.currentNum+item.lockNum)}}/{{item.totalNum}}</view>
								</view>
								<view class="good-other" v-else>
									{{item.status == 0 ?dateFormatMSHMS(item.startAt)+'开售' : '已售罄'}}
								</view>
							</view>
						</view>
					</view>
					
					<view class="good-box-index" v-if="index % 2 !== 0" :style="{'margin-left':'48rpx'}">
						<view class="good-info good-info-right" >
							<view class="good-title">{{item.title}}</view>
							<view class="good-merchant">
								<muqian-lazyLoad class="merchant-avart" :src="decodeURIComponent(item.logo)" borderRadius="50%"/>
								{{item.merchant}}
							</view>
							<view class="good-desc">
								<view class="good-progress" v-if="item.status == 1">
									<view class="progressMask" :style="{width:(100-getPlan(item.lockNum,item.currentNum,item.totalNum))+'%'}"></view>
									<view class="progressText">{{item.totalNum-(item.currentNum+item.lockNum)}}/{{item.totalNum}}</view>
								</view>
								<view class="good-other" v-else>
									{{item.status == 0 ?dateFormatMSHMS(item.startAt)+'开售' : '已售罄'}}
								</view>
								<view class="good-price">￥<text>{{item.price}}</text></view>
							</view>
						</view>
						<view class="pic-box" >
							<muqian-lazyLoad class="good-pic" :src="decodeURIComponent(item.pic)" />
							<view class="pic-bg"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 邀请函浮窗 -->
		<navigator class="popup-tips" v-if="isDuringDate('2022-07-12', '2022-07-18')" url="/pages/act/card716/invite" hover-class="none"></navigator>
		<view class="invite-shadow" v-show="inviteShow"></view>
		<view :class="{'invite-popup':true,'invite-popup-show':inviteShow}">
			<view class="popup-index">
				<view class="invite-title">亲爱的{{app.data.name}}：</view>
				<view class="invite-text">卡世界诚邀您参加2022北京首届国际收藏卡博览会！</view>
				<view class="invite-zs">时间：7.16-7.17</view>
				<view class="invite-zs">地址：北京报国寺</view>
			</view>
			<navigator class="invite-btn" url="/pages/act/card716/invite"  @click="inviteShow=false" hover-class="none"></navigator>
			<view class="invite-close"  @click="inviteShow=false"></view>
		</view>

		<!-- 抽奖弹窗 -->
		<actPopup :showPopup="showPopupToast" :popupType="'toast'" @popupClose="showPopupToast = false" @popupConfirm="homeData.isLottery=true,drawStart()"></actPopup>
		<actPopup :showPopup="showPopup" :awardData="awardData" @popupClose="showPopup = false,initEven()"></actPopup>
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'活动规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-title">抽奖次数</view>
			<view class="drawer-box" v-for="(item,index) in card716Rule" :key="index"> {{item}} </view>
			<view class="drawer-box drawer-box-red">今日累计{{homeData.daySum}}元（累计金额每日0点清空）</view>
			<view class="drawer-title">奖品列表</view>
			<view class="drawer-box" v-for="item in card716Pz" :key="item"> {{item}} </view>
			<view class="drawer-title" style="margin-top:55rpx">奖励发放</view>
			<view class="drawer-box">优惠券类奖品在获取后3小时内自动发放，实物类奖品将根据您的默认地址发放，如有疑问请联系客服。</view>
			<view class="drawer-title" style="margin-top:55rpx">提示</view>
			<view class="drawer-box">专人拆卡产品若于卡展结束后拼成，将交由其他工作人员代拆</view>
    	</bottomDrawer>
	</view>
</template>

<script lang="ts">
	const tabData = [
		{tp:1,name:'福利产品'},
		{tp:2,name:'已售罄'}
	]
	import { app } from "@/app";
	import { card716Rule } from "@/net/DataRules";
	import { dateFormatMSHMS, isDuringDate } from "@/tools/util";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		isDuringDate = isDuringDate;
		dateFormatMSHMS = dateFormatMSHMS;
		tabData = tabData;
		app = app;
		defaultAvatar = app.defaultAvatar;
		card716Rule = card716Rule
		scrollList:{[x:string]:any} = []
		goodsList:any = [];
		showDrawer = false;
		prizeList = [];
		goodParams:any = {
			pageIndex:1,
			pageSize:10,
			tp:1,
			noMoreData:false
		};
		homeData:any = {
			broadcastState:0,
			lotteryNum:0,
			daySum:0,
			isDefaultAddress:false,
			isLottery:false
		};
		drawIng = false;
		showPopupToast = false;
		showPopup = false;
		awardData:any = {
			id:0,
			name:'',
			pic_url:''
		};
		inviteShow = false;
		shareData:any = {
			shareUrl:'https://www.ka-world.com/share/h5/index.html#/pages/act/card716',  
			title:'卡展狂欢',      
			summary:'卡展狂欢，海量福利产品！可抽取美娜签名照、pz原盒、优惠券等奖品！',    
			thumb:'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/wxShare/20220712155054.jpg'       
		};
		card716Pz = [
			'Pz hobby1盒',
			'美娜签名照1份',
			'油画 hobby1盒',
			'马赛克亚洲1盒',
			'888元无门槛券',
			'卡世界卡夹1盒',
			'35pt卡砖1~5个',
			'130pt卡砖1~5个',
			'88元无门槛券',
			'500-100优惠券',
			'100-20优惠券',
			'50-10优惠券',
			'30-5优惠券',
			'20-3优惠券'
		]
		onLoad(query:any) {
			this.reqNewData()
		}
		onShow(){
			this.initEven()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		initEven(){
			
			app.http.Get('activity/cardShow/home',{},(res:any)=>{
				let data = res.data
				for (const key in this.homeData) {
					if (Object.prototype.hasOwnProperty.call(data, key)) {
						this.homeData[key] = data[key];
					}
				}
				if(res.data.isInvite) this.inviteShow = true;
				// 设置奖品 初始化抽奖转盘 
				this.prizeList = data.prizeList;
				let initPz = data.prizeList.slice(0,3).map((x:{[x:string]:any})=>{return x.id});
				this.initLuckyDraw(initPz)
			})
			app.http.Get('activity/cardShow/home/prize/record',{pageIndex:1,pageSize:30},(res:any)=>{
				this.scrollList = res.list
			})
			
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			let params = this.goodParams;
			if (params.noMoreData) return ;
			
			app.http.Get('activity/cardShow/good/list',params,(data:any)=>{
				if(data.totalPage<=params.pageIndex) params.noMoreData = true;
				if(params.pageIndex==1) this.goodsList = [];
				if(data.list) this.goodsList = this.goodsList.concat(data.list);
				params.pageIndex++;
				cb && cb()
			})
		}
		onClickListTab(item:{[x:string]:any}){
			const params = this.goodParams;
			if(item.tp == params.tp) return;

			params.tp = item.tp;
			params.noMoreData = false;
			params.pageIndex = 1;
			this.reqNewData()
		}
		onClickGoRecord(){
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}

			uni.navigateTo({
				url: "/pages/act/card716/reward_record"
			});
		}
		// 跳转商品详情
		onClickJumpDetails(id: any) {
			uni.navigateTo({
				url: "/pages/goods/goods_details?id=" + id
			});
		}

		// 抽奖
		initLuckyDraw(result:number[]){
			//@ts-ignore
			this.$refs.HMslotMachine.init({
				prizeList:this.prizeList,
				defaultResults:result,
				duration:3000,
				direction:'down',
				delay:500
			})
		}
		drawStart(){
			this.showPopupToast = false;
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}

			let homeData = this.homeData;
			if(!homeData.isDefaultAddress){
				uni.showToast({
					title:'请先设置默认地址',
					icon:'none'
				})
				uni.navigateTo({
					url:'/pages/userinfo/setting_addresses'
				})
				return;
			}
			if(!homeData.isLottery){
				this.showPopupToast = true
				return;
			}
			if(homeData.lotteryNum <=0){
				uni.showToast({
					title:'抽奖次数不足',
					icon:'none'
				})
				return;
			}
			if(this.drawIng) return;
			
			this.drawIng = true;
			app.http.Post('activity/cardShow/go/lottery',{},(data:any)=>{
				homeData.lotteryNum>0 && homeData.lotteryNum -- ;
				this.awardData = data;
				// roll(options)开始摇奖
				// results 开奖结果，结构[value,value,value] value为奖品数据的id
				//@ts-ignore
				this.$refs.HMslotMachine.roll({
					results:[data.id,data.id,data.id],
					success:(e:any)=>{
						this.showPopup = true;
						console.log("success e: ",e);
						this.drawIng = false;
					}
				})
			})
			
		}

		getPlan(lock: number, now: number, all: number) {
			let width = Math.floor((Number(lock) + Number(now)) / Number(all) * 100);
			return width
		}
		liveState(state:number){
			switch(state){
				case 1:
					return '直播中';
				case 2:
					return '待直播';
				case 3 :
					return '直播回放'
			}
		}
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#CEE0F5;
	}
	.top{
		width: 100%;
		height:869rpx;
		background: url(@/static/act/card716/bg.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;	
		z-index: 1;
		.live-gif{
			width: 16rpx;
			height:19rpx;
			margin-right: 6rpx;
		}
		.live-state{
			height:30rpx;
			position: absolute;
			right:47rpx;
			top:362rpx;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #E3F0FF;
			display: flex;
			align-items: baseline;
		}
		.live-btn{
			width: 680rpx;
			height: 340rpx;
			position: absolute;
			right:33rpx;
			bottom:185rpx;
		}
	}
	.draw-box{
		width: 725rpx;
		height:437rpx;
		background: url(@/static/act/card716/drawBox.png) no-repeat center;
		background-size: 100% 100%;
		margin:0 auto;
		margin-top: -70rpx;
		position: relative;
		z-index: 2;
		overflow: hidden;
		.draw-box-header{
			width: 100%;
			height:90rpx;
			box-sizing: border-box;
			padding: 0 32rpx 0 27rpx ;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.draw-header-title{
			font-size: 42rpx;
			font-family: hei;
			font-weight: 400;
			color: #FFFFFF;
			text-shadow: 3rpx 3rpx 2rpx rgba(62,108,146,0.6300);
		}
		.draw-header-right{
			display: flex;
			align-items: center;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			.header-right-text{
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
	.draw-center{
		width: 100%;
		box-sizing: border-box;
		margin-top: 30rpx;
		padding:0 39rpx;
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 50rpx;
		.draw-num{
			width: 30rpx;
			height: 200rpx;
			position: absolute;
			right:107rpx;
			top:0rpx;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			text-align: center;
		}
		.draw-start{
			width: 100rpx;
			height:260rpx;
			position: absolute;
			right:0;
			top:-40rpx
		}
	}
	.drawer-title{
		width: 100%;
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #333333;
		margin-bottom: 15rpx;
	}
	.drawer-box{
		width: 100%;
		box-sizing: border-box;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
	}
	.drawer-box-red{
		color:#F83333;
		margin-bottom: 55rpx;
	}
	.scroll-avatar{
		width: 27rpx;
		height:27rpx;
		border-radius: 50%;
		margin-right: 7rpx;
	}
	.start{
		width: 70%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f29c11;
		border-radius: 40rpx;
		margin-top: 30rpx;
		box-shadow: 0 1px 2px rgba($color: #51279A, $alpha: 1);
		border-bottom: solid 3px #8d5805;
		box-sizing: border-box;
		text{
			font-size: 20px;
			font-weight: bold;
			color: #b51c06;
			text-shadow: 1px 1px 1px #f2e811;
		}
	}

	.list-box{
		width: 100%;
		box-sizing: border-box;
		margin: 15rpx auto;
		padding-bottom: calc(0rpx);
		padding-bottom: calc(0rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(0rpx + env(safe-area-inset-bottom));
		.list-tabbox{
			width: 100%;
			height:106rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.list-tab{
				width: 158rpx;
				height:106rpx;
				margin:0 40rpx;
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 125rpx;
				text-align: center;
			}
			.list-tab-current{
				background: url(@/static/act/card716/tab_bg.png) no-repeat center;
				background-size: 100% 100%;
				font-size: 31rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FDFDFD;
			}
		}
		.good-list{
			width: 716rpx;
			background: #FFFFFF;
			border-radius: 5rpx;
			margin:0 auto;
			margin-top: 15rpx;
			box-sizing: border-box;
			overflow: hidden;
			.good-box{
				width: 100%;
				height:290rpx;
				box-sizing: border-box;
				padding:40rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.good-box-index{
				width: 100%;
				height:210rpx;
				display: flex;
				align-items: center;
			}
			.pic-box{
				width: 322rpx;
				height:210rpx;
				position: relative;
				box-sizing: border-box;
				.good-pic{
					width: 212rpx;
					height: 163rpx;
					margin:0 auto;
					margin-left: 45rpx;
					position: relative;
					z-index: 2;
				}
				.pic-bg{
					width: 322rpx;
					height:66rpx;
					position: absolute;
					bottom:0;
					left:0;
					background: url(@/static/act/card716/good_bg.png);
					background-size: 100% 100%;
					z-index: 1;
				}
			}
			.good-info{
				width: 330rpx;
				height:210rpx;
				position: relative;
				margin-left: 8rpx;
				.good-title{
					height: 60rpx;
					font-size: 25rpx;
					font-family: PingFangSC-Regular;
					font-weight: 600;
					color: #333333;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					line-height: 32rpx;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
					align-items: flex-start;
					word-break:break-all
				}
				.good-merchant{
					width: 100%;
					height:40rpx;
					margin-top: 12rpx;
					display: flex;
					align-items: center;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					.merchant-avart{
						width: 40rpx;
						height:40rpx;
						margin-right: 13rpx;
					}
				}
				.good-desc{
					width: 100%;
					height:45rpx;
					position: absolute;
					left:0;
					bottom:25rpx;
					display: flex;
					align-items: baseline;
					justify-content: space-between;
					.good-price{
						font-size: 23rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #333333;
					}
					.good-price text{
						font-size: 42rpx;
					}
					.good-progress{
						width: 184rpx;
						height: 24rpx;
						background: #4A90D0;
						box-sizing: border-box;
						padding-left: 6rpx;
						display: flex;
						justify-content: flex-end;
						position: relative;
					}
					.progressMask {
						height: inherit;
						background-color: #C7E0FF;
						width: 0%;
					}
					.progressText{
						position: absolute;
						left:0;
						top:0;
						width: 100%;
						height:inherit;
						line-height: 24rpx;
						font-size: 23rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fff;
						box-sizing: border-box;
						padding-left: 10rpx;
					}
					.good-other{
						font-size: 23rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #6D6D6D;
					}
				}
			}
			.good-info-right{
				width: 310rpx;
				margin-right: 45rpx;
			}
		}
	}
	.popup-tips{
		width: 65rpx;
		height:82rpx;
		background:url(@/static/act/card716/popup_tips.png) no-repeat center;
		background-size: 100% 100%;
		position: fixed;
		right:20rpx;
		bottom:100rpx;
		z-index: 3;
	}
	.invite-shadow{
		width: 100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		background:rgba(0,0,0,0.61);
		z-index: 99;
	}
	.invite-popup{
		width: 541rpx;
		height:605rpx;
		background:url(@/static/act/card716/popup_bg.png) no-repeat center;
		background-size: 100% 100%;
		position: fixed;
		z-index: 100;
		left:50%;
		top:20%;
		margin-left: -270.5rpx;
		transition: all 0.3s;
		transform: scale(0);
		.popup-index{
			width: 360rpx;
			height:400rpx;
			margin:0 auto;
			box-sizing: border-box;
			padding-top: 80rpx;
		}
		.invite-title{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #771914;
			margin-bottom: 30rpx;
		}
		.invite-text{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #771914;
			line-height: 40rpx;
			text-indent: 47rpx;
			margin-bottom: 40rpx;
		}
		.invite-zs{
			width: 100%;
			text-align: right;
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #771914;
			line-height: 40rpx;
		}
		.invite-btn{
			width: 356rpx;
			height:71rpx;
			background:url(@/static/act/card716/popup_btn.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left:50%;
			bottom:-100rpx;
			margin-left: -178rpx;
		}
		.invite-close{
			width: 47rpx;
			height:47rpx;
			background:url(@/static/act/card716/close.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left:50%;
			bottom:-207rpx;
			margin-left: -23.5rpx;
		}
	}
	.invite-popup-show{
		transform: scale(1);
	}
</style>
