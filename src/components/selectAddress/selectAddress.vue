<template>
    <view class="header" @click="onClickAddress">
        <view class="header-left">
        <view class="icon-address"></view>
        <view v-if="data&&data.name" class="header-address">
            <view class="address-desc" >{{ data.name }}{{ data.phone }}</view >
            <view class="address-name" >{{ readOnly?data.address:data.district+data.detail }}</view >
        </view>
        <view v-else class="header-address">
            <view class="address-tips">请选择收货地址</view>
        </view>
        </view>
        <button v-if="!readOnly" class="header-right">&#xe470;</button>
        <image class="header-order-line" src="@/static/goods/v2/buy.png" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Prop,PropSync } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("data",{
        type:Object
    }) addressData!: Object;
    @Prop({default:false})
    readOnly?:boolean
    mounted() {//挂载到实例上去之后调用
        if(!this.readOnly){
            this.initEven()
        }
    }
    initEven(){
        app.http.Get("me/delivery", {}, (res: any) => {
            if (res.list) {
                this.addressData = res.list.find((x:any)=>x.default) || res.list[0];
            }
        });
        this.onEventUI("addressSelect", (data) => {
            this.addressData = data.data;
        });
    }
    onClickAddress() {
        if(this.readOnly) return;
        uni.navigateTo({
            url: "/pages/userinfo/setting_addresses?type=order",
        });
    }
}
</script>

<style lang="scss">
.content{
    width: 100%;
}
.header {
    width: 100%;
    min-height: 180rpx;
    background: #fff;
    box-sizing: border-box;
    padding: 30rpx 25rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border-radius: 3rpx;
}
.header-left {
    width: 630rpx;
    min-height: 100rpx;
    box-sizing: border-box;
    display: flex;
}
.header-right {
    width: 72rpx;
    height: 72rpx;
    background-color: rgba(0, 0, 0, 0);
    font-family: uniicons;
    font-size: 48rpx;
    font-weight: normal;
    font-style: normal;
    line-height: 72rpx;
    color: #c4c3c8;
    margin: 0;
}
.header-order-line{
    width: 100%;
    height:7rpx;
    position: absolute;
    bottom:0;
    left:0;
}
.icon-address {
    width: 31rpx;
    height: 42rpx;
    background: url(../../static/goods/icon_address.png) no-repeat center;
    background-size: 100% 100%;
    margin-right: 24rpx;
}
.header-address {
    width: 570rpx;
    min-height: 100rpx;
    display: flex;
    flex-wrap: wrap;
    word-break:break-all
}
.address-desc {
    width: 100%;
    font-size: 29rpx;
    
    font-weight: 600;
    color: #333333;
}
.address-name {
    width: 100%;
    font-size: 25rpx;
    
    font-weight: 400;
    color: #959695;
    line-height: 36rpx;
}
.address-tips {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 28rpx;
    
    font-weight: bold;
    color: #3b3b3b;
}
</style>
