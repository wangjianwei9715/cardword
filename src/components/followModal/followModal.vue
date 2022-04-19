<template>
	<view class="tipsMask">
		<view class="tipsCard">
			<view class="cancelTips">
				确定取消关注？
			</view>
			<view class="buttonList">
				<view class="cancel button" @click.stop="$emit('cancel')">取消</view>
				<view class="confirm button" @click.stop="$emit('confirm')">确定</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
@Component({})
export default class ClassName extends BaseComponent {
  created() {
    //在实例创建完成后被立即调用
  }
  mounted() {
    //挂载到实例上去之后调用
  }
  destroyed() {}
}
</script>

<style lang="scss">
.tipsMask {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  .tipsCard {
    width: 516rpx;
    height: 317rpx;
    border-radius: 6rpx;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 30%;

    .cancelTips {
      font-size: 33rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #333333;
      text-align: center;
      letter-spacing: 3rpx;
      position: relative;
      top: 81rpx;
    }

    .buttonList {
      padding: 0 59rpx;
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 76rpx;

      .button {
        width: 168rpx;
        height: 67rpx;
        font-size: 25rpx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height: 67rpx;
        text-align: center;
        letter-spacing: 2rpx;
      }

      .cancel {
        border: 1rpx solid #C1C1C1;
        color: #333333;
      }

      .confirm {
        background-color: $btn-red;
        color: #fff;
      }
    }
  }
}
</style>
