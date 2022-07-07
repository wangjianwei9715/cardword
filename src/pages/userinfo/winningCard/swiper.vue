<template>
	<view class="list-content">
		<specialBanner :banner-list="bannerList" :merchant="merchant" :index="index" :total="total" :swiper-config="swiperConfig" @swiperRefresh="swiperRefresh" />
        
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
    import { parsePic } from "@/tools/util"
	@Component({})
	export default class ClassName extends BaseNode {
        parsePic = parsePic;
		bannerList:any = [];
        merchant:any = [];
		swiperConfig = {
            indicatorDots: true,
            indicatorColor: '#C9C9C9',
            indicatorActiveColor: '#666666',
            autoplay: false,
            interval: 3000,
            duration: 300,
            circular: false,
            previousMargin: '58rpx',
            nextMargin: '58rpx'
        }
        index = 0;
        total = 0;
		onLoad(query:any) {
            if(query.index){
                this.index = query.index;
                this.total = query.total;
                this.getWinningCard()
            }
		}
        swiperRefresh(item:any){
            this.index = item.index;
            uni.showLoading({
                title: '加载中'
            });
            this.getWinningCard()
        }
        getWinningCard(){
            app.http.Get('me/hitNo/show',{index:this.index},(res:any)=>{
                console.log('res==',res)
                uni.hideLoading();
                this.bannerList = [];
                this.bannerList = res.data;
                this.bannerList.pic = this.bannerList.pic.map((x:any)=>{
                    return this.parsePic(x)
                })
                this.merchant = res.merchant
                console.log(this.merchant)
                this.merchant.logo = this.parsePic(this.merchant.logo)
            })
        }
		
	}
</script>

<style lang="scss">
	.list-content{
        width: 100%;
        height:100%;
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        background:url(../../../static/userinfo/winningCard/bg.jpg) no-repeat center;
        background-size: 100% 100%;
    }

</style>
