<template>
	<view class="list-content">
		<specialBanner :banner-list="bannerList" :swiper-config="swiperConfig" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		bannerList = [{
            pic: '../../../static/goods/drawcard/Carmelo-Anthony.png',
            title: '20-21 篮球 panini prizm prizm ...',
            desc: '圣安东尼奥马刺 特里克·威廉姆斯 49编 Apprentice Lnk #14 zdddi',
            time:1649839941
        }, {
            pic: '../../../static/userinfo/corporate.jpg',
            title: '20-21 篮球 panini prizm prizm ...',
            desc: '圣安东尼奥马刺 特里克·威廉姆斯 49编 Apprentice Lnk #14 zdddi',
            time:1649839941
        }, {
            pic: '../../../static/goods/drawcard/card_blue.png',
            title: '20-21 篮球 panini prizm prizm ...',
            desc: '圣安东尼奥马刺 特里克·威廉姆斯 49编 Apprentice Lnk #14 zdddi',
            time:1649839941
        }, {
            pic: '../../../static/goods/drawcard/card_red.png',
            title: '20-21 篮球 panini prizm prizm ...',
            desc: '圣安东尼奥马刺 特里克·威廉姆斯 49编 Apprentice Lnk #14 zdddi',
            time:1649839941
        }]
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
		onLoad(query:any) {

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
        background:url(../../../static/userinfo/winningCard/bg.png) no-repeat center;
        background-size: 100% 100%;
    }

</style>
