<template>
	<view class="box">
		<view class="circle" :style="[circle]">
			<view class="left" :style="[size]">
				<view class="left-circle"
					:style="[size,leftCircle,leftValue]">
				</view>
			</view>
			<view class="right" :style="[size]">
				<view class="right-circle" :style="[size,rightcircle,rightValue]"></view>
			</view>
			<view class="inner" :style="[inner]">
				<slot name="inner"></slot>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
    import { Component, Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
    @Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:10})
		value!:number
        @Prop({default:100})
		widths!:number
        @Prop({default:16})
		breadth!:number
        @Prop({default:"#10b060"})
		activeColor?:string
        @Prop({default:"#FAFBFF"})
		defaultColor?:string
		@Prop({default:"#be3a10"})
		bgColor?:string
		public get circle() {
            const { widths, defaultColor } = this
            return {
                width: `${widths}rpx`,
                height: `${widths}rpx`,
                background: defaultColor,
				'box-shadow': '0rpx 0rpx 4rpx 0rpx rgba(168,44,70,0.14), inset 0rpx 0rpx 4rpx 0rpx rgba(121,4,28,0.2)'
            }
        }
        public get size() {
            const { widths } = this
            return {
                width: `${widths /2}rpx`,
                height: `${widths}rpx`
            }
        }
        public get leftCircle() {
            const { widths, activeColor } = this
            return {
                borderTopLeftRadius: `${widths}rpx`,
                borderBottomLeftRadius: `${widths}rpx`,
                background: activeColor
            }
        }
        public get rightcircle() {
            const { widths, activeColor } = this
            return {
                borderTopRightRadius: `${widths}rpx`,
                borderBottomRightRadius: `${widths}rpx`,
                background: activeColor
            }
        }
        public get leftValue() {
            const { value } = this
            let str = value<=50?'rotate(180deg)':`rotate(${(((value-50)/50)*180)+180}deg)`
            return {
                transform: str
            }
        }
        public get rightValue() {
            const { value } = this
            let str = value>=50?'rotate(0deg)':`rotate(${((value/50)*180)-180}deg)`
            return {
                transform: str
            }
        }
        public get inner() {
            const { widths, breadth, bgColor } = this
            return {
                width: `${widths - breadth}rpx`,
                height: `${widths - breadth}rpx`,
				background: `${bgColor}`,
				'box-shadow': '0rpx 0rpx 4rpx 0rpx rgba(168,44,70,0.14), inset 0rpx 0rpx 4rpx 0rpx rgba(121,4,28,0.2)'
            }
        }
	}
</script>

<style>
	.box{
		width: 124rpx;
		height:124rpx;
	}
	.circle {
		border-radius: 50%;
		position: relative;
	}

	.left,
	.right {
		position: absolute;
		overflow: hidden;
	}

	.left-circle {
		transition: all .5s;
		transform-origin: right center;
		transform: rotate(180deg);
	}

	.right-circle {
		transition: all .5s;
		transform-origin: left center;
		transform: rotate(-180deg);
	}

	.right {
		right: 0;
	}

	.inner {
		position: absolute;
		z-index: 1;
		border-radius: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #A8A8A8;
	}
</style>
