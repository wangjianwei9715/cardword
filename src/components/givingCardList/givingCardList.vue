<template name="goodslist">
  <view class="giving-list">
	  <view class="giving-index" v-for="(item,index) in codeList" :key="index">
		  <view class="giving-index-header">
			  <view class="giving-index-type">{{type==1?'赠送成功':'接收成功'}}</view>
			  <view class="giving-index-time">{{dateFormatMSHMS(item.transferAt)}}</view>
		  </view>
		  <view class="giving-index-code">{{item.name}}</view>
		  <view class="giving-index-bottom">
			  <view class="giving-index-bottom-left">{{type==1?'收方ID：':'赠方ID：'}}{{item.userId}}</view>
			  <button class="giving-index-bottom-btn">原始订单</button>
		  </view>
	  </view>
  </view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import { dateFormatMSHMS } from "@/tools/util";
@Component({})
export default class ClassName extends BaseComponent {
  @Prop({
    default: [],
  })
  codeList: any;
  @Prop({
    default: 1,
  })
  type: number|undefined;
  dateFormatMSHMS = dateFormatMSHMS;
  
  created() {
    //在实例创建完成后被立即调用
  }
  mounted() {
    
  }
  
  
}
</script>

<style lang="scss">
	.giving-list{
		width: 100%;
		box-sizing: border-box;
	}
	.giving-index{
		width: 100%;
		box-sizing: border-box;
		padding:25rpx 18rpx;
		background:#fff;
		border-radius: 5rpx;
		margin-bottom: 14rpx;
	}
	.giving-index-header{
		width: 100%;
		height:30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		.giving-index-type{
			height:30rpx;
			line-height: 30rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
		}
		.giving-index-time{
			height:30rpx;
			line-height: 30rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #88878C;
		}
	}
	.giving-index-code{
		width: 100%;
		box-sizing: border-box;
		background: #F6F7FB;
		border-radius: 5rpx;
		padding: 25rpx 28rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
		margin-bottom: 20rpx;
	}
	.giving-index-bottom{
		width: 100%;
		box-sizing: border-box;
		height:55rpx;
		display: flex;
		justify-content: space-between;
	}
	.giving-index-bottom-left{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #88878C;
	}
	.giving-index-bottom-btn{
		width: 183rpx;
		height: 55rpx;
		background: #F5162B;
		border-radius: 28rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 55rpx;
		text-align: center;
		margin:0;
	}
</style>
