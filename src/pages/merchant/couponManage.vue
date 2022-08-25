<template>
    <view class='content'>
        <merchantCoupon :showDrawer.sync="createCouponShow"/>
        <view class="previewCoupon" @click="pageJump('/pages/merchant/couponDetail')">查看</view>
        <!-- <bottomDrawer title='店铺通用券' :height='571' heightType='rpx' :needSafeArea='true'
            :showDrawer.sync='createCouponShow'>

        </bottomDrawer> -->
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
        tag:Tag={
            index:0,
            list:[{label:'可创建'},{label:'拼成商品'}]
        }
        createCouponShow:boolean=true;
        pageJump(url:string,type?:any){
            const jumpType=type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
    }
</script>

<style lang="scss">
    
</style>