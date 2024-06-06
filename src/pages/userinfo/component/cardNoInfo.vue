<template>
	<view class="cardno-info">
		<view class="cardno-box cname" :class="{'bingo-name':data.state==2 && !noInfo.desc}">{{noInfo.cName}}</view>
		<view class="cardno-box ename">{{noInfo.eName}}</view>
		<view v-if="noInfo.desc" class="cardno-box desc" :class="{'bingo-name':data.state==2}">{{noInfo.desc}}</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		data!:any;
		@Prop({default:0})
		type!:number;
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用

		}
		public get noInfo() : object {
			const { playerChinese, player, teamChinese, team, seq, cardSet, number, name } = this.data;
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
		
	}
</script>

<style lang="scss">
	@mixin fontSfTR {
		
	}
	.cardno-info{
		.cardno-box{
			@include fontSfTR;
			width: 100%;
			box-sizing: border-box;
			display: -webkit-box;
			align-items: center;
			font-size: 22rpx;
			font-weight: 400;
			color: #333333;
			line-height: 32rpx;
			background: #F6F7F8;
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
			font-size: 24rpx;
			
			font-weight: 500;
			color: #333333;
		}
		.ename{
			@include fontSfTR;
			font-size: 20rpx;
			font-weight: 400;
			color: #DDDDDD;
		}
		.desc{
			@include fontSfTR;
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
			margin-top: 6rpx;
		}
	}
	
</style>
