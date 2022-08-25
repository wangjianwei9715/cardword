<template>
    <view class='content'>
        <navigationShare :navigatetoTitle="isGoods?'指定商品券':'店铺通用券'" rightText='新建' @onClickRightText="onClickRightText" />
        <view style="padding-top:88rpx">
            <statusbar />
        </view>
        <view class="goodsContainer"></view>
        <u-sticky :customNavHeight="88">
            <view class="tagContainr"></view>
        </u-sticky>
        <view class="couponContainer">

        </view>
        <merchantCoupon :showDrawer.sync="createCouponShow"/>
    </view>
</template>

<script lang="ts">
    interface Tag{
        index:number,
        list:Array<ListItem>
    }
    interface ListItem {
        label:string
    }
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic;
        isGoods:boolean=true
        tag:Tag={
            index:0,
            list:[{label:'全部'},{label:'线上优惠券'},{label:'兑换码'}]
        }
        
        createCouponShow:boolean=false;
        onClickRightText(){
            this.createCouponShow=true
        }
    }
</script>

<style lang="scss">
    .goodsContainer{
        width: 750rpx;
        background-color: blue;
        height: 200rpx;
    }
    .tagContainr{
        width: 750rpx;
        height: 100rpx;
        background-color: red;
    }
    .couponContainer{
        width: 750rpx;
        height: 10000rpx;
    }
</style>