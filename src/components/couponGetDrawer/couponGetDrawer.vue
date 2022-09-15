
<template>
    <view class="content">
        <bottomDrawer title="领取优惠券" :showDrawer.sync="showValue" drawerBg="#F5F7FB">
            <!-- <view class="coupon-list"> -->
                <scroll-view scroll-y="true" class="coupon-list" @scrolltolower="lower">
					<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
                        <view class="item-left">
                            <view class="left-price">￥<text>{{item.amount}}</text></view>
                            <view class="left-type">{{item.minUseAmount>0?`满${item.minUseAmount}可用`:'无门槛'}}</view>
                        </view>
                        <view class="item-right">
                            <view class="right-info">
                                <view class="right-title">{{item.name}}</view>
                                <view class="right-time">{{item.expire}}</view>
                                <!-- &&goodPage -->
                                <view :class="{'right-btn':true,'opacity':(item.state!=1&&goodPage) || item.state==3}" @click="onClickGetCoupon(item)">{{inspectState(item)}}</view>
                            </view>
                            <view class="right-b" @click="onClickCheckExplain(item.cateId)">
                                <view class="right-b-font">指定{{item.tp==1?'商品':'店铺'}}</view>
                            </view>
                        </view>
                    </view>
				</scroll-view>
            <!-- </view> -->
        </bottomDrawer>
    </view>
</template>

<script lang="ts">
    
    import { app } from "@/app";
    import { Component,Prop,PropSync } from "vue-property-decorator";
    import BaseComponent from "../../base/BaseComponent.vue";
    @Component({})
    export default class ClassName extends BaseComponent {
        @PropSync("showDrawer",{
			type:Boolean
		}) showValue!: Boolean;
        @Prop({default:[]}) 
        couponList:any;
        @Prop({default:false}) 
        goodPage!:Boolean;

        onClickGetCoupon(item:any){
            if(item.state==3) return
            // 可领取
            if(item.state==1){
                app.http.Post(`coupon/merchant/online/draw/${item.cateId}`,{},(res:any)=>{
					uni.showToast({ title:'领取成功', icon:'none' });
					item.state = 2;
				})
                return
            }

            // 不在商品详情页  店铺券商品券区分
            if(!this.goodPage){
                if(item.tp==1){
                    uni.navigateTo({
                        url: '/pages/goods/goods_details?id=' + decodeURIComponent(item.goodCode)
                    })
                }else{
                    this.showValue=false
                }
            }
        }
        inspectState(item:any){
            if(item.state==1) return '可领取';
            if(item.state==3) return '已使用';
            return this.goodPage ? '已领取' : '去使用'
        }
        lower(){
            this.$emit('lower')
        }
    }
</script>

<style lang="scss">
    .coupon-list{
        width: 100%;
        height:100%;
        box-sizing: border-box;
        padding:20rpx 0rpx;
        .opacity{
            opacity: 0.43;
        }
        .coupon-item{
            width: 708rpx;
            height:195rpx;
            background:url(@/static/userinfo/v2/coupon_g_bg.png) no-repeat center / 100% 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 13rpx;
            .item-left{
                width: 200rpx;
                height:190rpx;
                box-sizing: border-box;
                padding-top: 35rpx;
                .left-price{
                    font-size: 29rpx;
                    font-family: PingFang SC;
                    font-weight: 600;
                    color: #FFFFFF;
                    text-align: center;
                }
                .left-price text{
                    font-size: 54rpx;
                }
                .left-type{
                    margin-top: 5rpx;
                    text-align: center;
                    font-size: 23rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                }
            }
            .item-right{
                width: 532rpx;
                height:190rpx;
                .right-info{
                    width: 100%;
                    height:115rpx;
                    box-sizing: border-box;
                    padding-left: 35rpx;
                    position: relative;
                    padding-top: 20rpx;
                }
                .right-title{
                    font-size: 29rpx;
                    font-family: PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    margin-bottom: 2rpx;
                }
                .right-time{
                    font-size: 21rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #88878C;
                    margin-top: 2rpx;
                }
                .right-btn{
                    width: 127rpx;
                    height: 47rpx;
                    background: #fb1644;
                    border-radius: 3rpx;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 25rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    position: absolute;
                    right:31rpx;
                    top:27rpx
                }
                .right-b{
                    width: 100%;
                    height:70rpx;
                    box-sizing: border-box;
                    padding-left: 35rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: 40rpx;
                }
                .right-b-font{
                    font-size: 21rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #88878C;
                }
                .coupon-right-down{
					width: 13rpx;
					height:21rpx;
					background:url(@/static/goods/v2/icon_right.png) no-repeat center / 100% 100%;
                    transform: rotate(90deg);
				}
				.coupon-right-up{
					width: 13rpx;
					height:21rpx;
					background:url(@/static/goods/v2/icon_right.png) no-repeat center / 100% 100%;
					transform: rotate(270deg);
				}
            }
        }
    }
</style>