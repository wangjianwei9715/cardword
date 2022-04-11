<template>
	<view>
		<view class="xskcodeinput">
			<view class="box" @click="focus=true" v-for="(item,index) in length" :key="index">
				<text v-if="password.length>index">{{showVal?password[index]:'*'}}</text>
				<text class="line" v-if="password.length==index&&focus" style="font-weight: normal;">|</text>
			</view>
			
			<input class="input" type="number" :focus="focus" v-model="password" maxlength="9" @focus="focus=true" @blur="focus=false" @input="userinput"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:9})
		length:any;
		@Prop({default:true})
		showVal!:boolean;

		focus = false
		password = ''
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			// this.getWidth()
		}
		destroyed(){
			
		}
		userinput(e:any){
			this.$emit('update:value',this.password);
			if(e.detail.value.length==this.length){
				this.focus = false
				this.$emit('confirm',this.password)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xskcodeinput{
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		.box{
			width: 56rpx;
			height:82rpx;
			background:#fff;
			font-size: 48rpx;
			font-family: FZLanTingHei-EB-GBK;
			font-weight: 400;
			color: #333333;
			border-radius: 10rpx;
			margin-right: 20rpx;
			text-align: center;
			line-height: 82rpx;
			border:1px solid #767676;
			&:last-child{
				margin-right: 0;
			}
			.line{
				opacity: 0;
				animation-name: donghua;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
				animation-duration: .5s;
				animation-direction: alternate;
			}
			@keyframes donghua{
				0%{
					opacity: 1;
				}
				100%{
					opacity: 0;
				}
			}
		}
		
		.input{
			position: absolute;
			top: 0;
			left: -1000%;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
</style>
