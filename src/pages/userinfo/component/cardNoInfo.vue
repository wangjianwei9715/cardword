<template>
	<view class="cardno-info">
		<view class="cardno-container">
			<view class="cardno-box cname" :class="{'bingo-name':data.state==2 && !noInfo.desc}">{{noInfo.cName}}</view>
			<view class="cardno-box ename">{{noInfo.eName}}</view>
			<view v-if="noInfo.desc" class="cardno-box desc" :class="{'bingo-name':data.state==2}">{{noInfo.desc}}</view>
		</view>
		<view v-if="picLength.length" class="index-right">
			<swiper class="swiper" :indicator-dots="false" autoplay="true" circular="true">
				<swiper-item class="swiper-item" v-for="(item,index) in picLength" :key="index">
					<view class="icon-tips" :style="{background:tipsData[item.tips].background}">{{tipsData[item.tips].text}}</view>
					<muqian-lazyLoad class="card-pic" :src="decodeURIComponent(item.pic)" mode="aspectFit"  preview/>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { _Maps } from "@/tools/map"
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		data!:any;
		@Prop({default:0})
		type!:number;

		tipsData = _Maps._GoodsTips;
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用

		}
		public get noInfo() : object {
			const { playerChinese, player, teamChinese, team, seq, cardSet, number, name, zuheche } = this.data;
			if(uni.$u.test.object(zuheche) && zuheche.tp==1){
				return {
					cName:`${teamChinese}`,
					eName:`${team}`,
					desc:`${zuheche.name} 组合车车位`
				}
			}
			switch(this.type){
				case 1: case 11: //随机卡种、选队随机
					return {
						cName:`${playerChinese} | ${teamChinese}`,
						eName:`${player} | ${team}`,
						desc:`${seq==0?'无限':seq}编, ${cardSet}, No.${number}`
					}
				case 2: //随机球队
					return {
						cName:teamChinese,
						eName:team
					}
				case 3: //随机球员
					return {
						cName:playerChinese,
						eName:player
					}
				case 10: //自选买队
					const data = name.split(" ")
					return {
						cName:data[0],
						eName:"",
						desc:data[1]
					}
				default:
					return {
						cName:name,
					};
			}
		}
		
		public get picLength() : any[] {
			const { state, zuheche, award } = this.data;
			let list = [];
			if(state==2){
				list.push({
					tips:1,
					pic:this.data.pic
				})
			};
			if(uni.$u.test.object(zuheche)){
				list.push({
					tips:zuheche.tp==1?2:3,
					pic:zuheche.logo
				})
			}
			if(uni.$u.test.object(award)){
				list.push({
					tips:4,
					pic:award.logo
				})
			}
			return list;
		}
		
	}
</script>

<style lang="scss">
	@mixin fontSfTR {
		
	}
	.cardno-info{
		width:100%;
		height:100%;
		position: relative;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		.cardno-container{
			flex: 1;
			padding:20rpx 0;
		}
		.cardno-box{
			@include fontSfTR;
			width: 100%;
			box-sizing: border-box;
			display: -webkit-box;
			align-items: center;
			font-size: 22rpx;
			color: #333333;
			line-height: 32rpx;
			position: relative;
			z-index: 1;
		}
		.bingo-name{
			display: inline;
		}
		.bingo-name::after{
			content: "";
			width: 100%;
			height:12rpx;
			background: rgba(250,21,69,0.2);
			position: absolute;
			bottom:0;
			left:0;
		}
		.cname{
			font-size: 22rpx;
			color: #333333;
		}
		.ename{
			@include fontSfTR;
			font-size: 20rpx;
			color: #A2A8B4;
			font-weight: 300
		}
		.desc{
			@include fontSfTR;
			font-size: 22rpx;
			color: #878B95;
			margin-top: 6rpx;
		}
	}
	.index-right{
		width: 136rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#fff;
		background:#EDEDF0;
		position: relative;
		.swiper{
			width: 136rpx;
			height:100%;
		}
		.swiper-item{
			width: 136rpx;
			height:100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.icon-tips{
			height:24rpx;
			position: absolute;
			left:0;
			top:0;
			text-align: center;
			line-height: 24rpx;
			font-size: 20rpx;
			color: #FFFFFF;
			box-sizing: border-box;
			padding:0 2rpx;
			z-index: 2;
		}
		.card-pic{
			width: 136rpx;
			height:100rpx;
		}
	}
</style>
