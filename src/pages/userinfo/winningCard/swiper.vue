<template>
	<view class="list-content">
		<specialBanner :banner-list="bannerList" :index="index" :total="total" :swiper-config="swiperConfig" @swiperRefresh="swiperRefresh" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		bannerList = []
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
        swiperRefresh(index:number){
            this.index = index;
            this.getWinningCard()
        }
        getWinningCard(){
            app.http.Get('me/hitNo/show',{index:this.index},(res:any)=>{
                this.bannerList = res.data;
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
