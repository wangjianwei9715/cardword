<template>
	<view class="guess-box">
		<view class="guess-free">
			<view class="guess-free-text">剩余免单组数</view>
			<view class="guess-free-text">{{freeNum}}</view>
		</view>

		<view class="guess-content">
			<view class="guess-content-header">
				<view class="guess-left">
					<image class="guess-icon" src="../../pages/act/static/guess/guess_icon.png"/>
				</view>
				<view class="guess-right" @click="onClickGuessRules">
					<view class="guess-right-text">猜球队</view>
					<view class="guess-right-text">赢免单</view>
					<button class="header-right">&#xe470;</button>
				</view>
			</view>
			<view class="guess-content-list">
				<scroll-view class="guess-scroll" :scroll-x="true" @scrolltolower="onScrolltolower">
					<view class="guess-scroll-index" :class="{'current-index':checkTeam == index}" v-for="(item,index) in teamList" :key="index" @click="onClickTeamCheck(index)">
						<muqian-lazyLoad  class="guess-scroll-img" :src="decodeURIComponent(item.logo)" />
						<view class="guess-scroll-name">{{item.name}}</view>
						<view v-if="item.name==lastGuess" class="guess-last-check">最近选择</view>
					</view>
				</scroll-view>
			</view>
		</view>


		<bottomDrawer :showDrawer="showDrawer" :title="'预测卡密规则'" @closeDrawer="onClickCloseDrawer">
			<view class="drawer-box">
				<view class="drawer-helpmsg">
					<view class="drawer-help-title">{{rulesData.title}}</view>
					<view class="drawer-help-content">{{rulesData.content}}</view>
				</view>
			</view>
    	</bottomDrawer>
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { guessRules } from "@/tools/DataRules";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:0})
		freeNum:number|undefined;
		@Prop({default:[]})
		teamList:object|undefined;
		@PropSync("checkTeam",{
			type:Number
		}) checkTeamNumber!: Number;
		@Prop({default:''})
		lastGuess:string|undefined;

		showDrawer = false;
		rulesData = guessRules
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			
		}
		onClickGuessRules(){
			this.showDrawer = true
		}
		onClickCloseDrawer(){
			this.showDrawer = false;
		}
		onClickTeamCheck(index:number){
			this.checkTeamNumber = index;
			// if(this.checkTeam==index) return;
			// this.checkTeam = index;
		}
		onScrolltolower(){
			this.$emit('onScrolltolower')
		}
	}
</script>

<style lang="scss">
	.guess-content{
		box-sizing: border-box;
		width: 100%;
		background:#fff;
		padding:0;
		border-top: 13rpx solid $content-bg;
	}
	.guess-content-header{
		width: 100%;
		margin-bottom: 16rpx;
		box-sizing: border-box;
		padding:0 22rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.guess-free{
		border-top: 13rpx solid $content-bg;
		width: 100%;
		height: 91rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 22rpx;
	}
	.guess-free-text{
		height:91rpx;
		line-height:91rpx;
		font-size: 29rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
	}
	.guess-content{
		width: 100%;
	}
	.guess-left{
		height:67rpx;
		display: flex;
		align-items: center;
	}
	.guess-icon{
		width: 130rpx;
		height:28rpx;
	}
	.guess-right{
		height:67rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		color: rgba(101, 98, 98, 0.84);
	}
	.guess-right-text{
		height:67rpx;
		line-height: 67rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		color: rgba(101, 98, 98, 0.84);
		margin-right: 10rpx;
	}
	.header-right {
		width: 30rpx;
		height: 30rpx;
		background-color: rgba(0, 0, 0, 0);
		font-family: uniicons;
		font-size: 36rpx;
		font-weight: normal;
		font-style: normal;
		line-height: 30rpx;
		color: rgba(181, 180, 180, 1);
		margin: 0;
	}
	.guess-content-list{
		width: 100%;
		height:174rpx;
		overflow: hidden;
		.guess-scroll{
			width: 100%;
			height:174rpx;
			display: flex;
			align-items: center;
			white-space: nowrap;
		}
		.guess-scroll-index{
			width: 101rpx;
			height:137rpx;
			margin-right: 30rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding-bottom: 10rpx;
			padding-top: 4rpx;
			flex-wrap: wrap;
			position: relative;
			.guess-scroll-img{
				width: 80rpx;
				height:80rpx;
			}
			.guess-scroll-name{
				width: 100%;
				height:30rpx;
				line-height: 30rpx;
				text-align: center;
				font-size: 20rpx;
				font-family: PingFangSC-Regular;
				font-weight: normal;
				color: #656262;
			}
		}
		.guess-scroll-index:first-child{
			margin-left: 30rpx;
		}
	}
	.current-index{
		width: 101rpx;
		height:137rpx;
		background:url(../../pages/act/static/guess/check_team.png) no-repeat center;
		background-size: 100% 100%;

	}
	.guess-last-check{
		width: 100%;
		position:absolute;
		height:35rpx;
		bottom:-35rpx;
		line-height: 35rpx;
		left:0;
		text-align: center;
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		color: #656262;
	}
	.drawer-shadow{
        position: fixed;
		top:0;
		left:0;
		height:100%;
		width: 100%;
		background:rgba(0,0,0,0.6);
        z-index:99998;
    }
    .drawer-content{
		position: fixed;
		bottom:0;
		left:0;
		height:840rpx;
		width: 100%;
		background:url(../../pages/act/static/guess/rules.png) no-repeat center;
		background-size: 100% 100%;
		z-index: 99999;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		// border-radius: 60rpx 60rpx 0px 0px;
		transform: translateY(100%);
	}
	.show-drawer{
		transform: translateY(0);
	}
	.close-pic{
		width: 32rpx;
		height:32rpx;
		position: absolute;
		top:35rpx;
		right:75rpx;
	}
	.drawer-helpmsg{
		width: 100%;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	.drawer-help-title{
		font-size: 27rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color:#333333;
		margin:15rpx 0rpx;
	}
	.drawer-help-content{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		white-space: pre-wrap;
		line-height: 35rpx;
		margin-bottom: 50rpx;
	}
</style>
