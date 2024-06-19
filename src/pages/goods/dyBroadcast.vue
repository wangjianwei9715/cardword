<template>
    <view class="content">
        <transitionNav ref='transitionNav'> </transitionNav>
        <view class="detailCard" :style="{height:(380+(36*2))+'rpx'}">
            <image class="backImg" mode="aspectFill" :src="$parsePic(seriesDetail.back_img)" />
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({
    components:{
    }
})
export default class ClassName extends BaseNode {
    seriesDetail: any = {}
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
    }
    isFetchEnd: boolean = true
    seriesCardEnd: boolean = true
    onLoad(query: any) {
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqSeriesGoods(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqSeriesGoods()
    }
    // 跳转商品详情
    onClickJumpDetails(goodCode: any) {
        app.navigateTo.goGoodsDetails(goodCode)
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.hasOther {
    position: relative;
    bottom: 26rpx;
    margin-top: 14rpx;
}

.noOther {
    margin-top: 14rpx;
}

.detailCard {
    width: 750rpx;
    height: 380rpx;
    position: relative;
}

.backImg {
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    position: absolute;
}

.tagContainer {
    width: 710rpx;
    height: 75rpx;
    background: #FFFFFF;
    border-radius: 5rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    margin: 0 auto;
    margin-top: 14rpx;
    // margin: 14rpx auto;
    position: relative;
    white-space: nowrap;
    bottom: 26rpx;

    .tag {
        font-size: 28rpx;
        
        font-weight: 400;
        color: #959695;
        margin-right: 61rpx;
    }

    .selectTag {
        font-size: 31rpx;
        
        font-weight: bold;
        color: #333333;
    }
}



.seriesInfo {
    margin-top: 144rpx;
    padding: 0 35rpx;
    align-items: center;
    position: relative;

    .seriesInfo-avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 3rpx;
        margin-right: 28rpx;
        background-color: #fff;
    }

    .seriesInfo-name {
        font-size: 33rpx;
        
        font-weight: bold;
        color: #FFFFFF;
    }
}

.merchantMask {
    width: 100%;
    height: inherit;
    position: absolute;
    background-color: rgba(0, 0, 0, .33);
    top: 0;
    left: 0;
}

.seriesInfo-introduction {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 74rpx;

    padding: 0 36rpx;
    margin-top: 44rpx;
    position: relative;
    line-height: 32rpx;

    .introduction {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 25rpx;
        
        font-weight: 400;
        color: #E6E6E6;
        position: relative;bottom: 2rpx;
    }
}
.series-icon{
    width: 198rpx;
    height:48rpx;
    margin-right: -10rpx;
}
.series-icon1{
    background:url(@/static/goods/series_icon.png) no-repeat center / 100% 100%;
}
.series-icon2{
    background:url(@/static/goods/series_icon2.png) no-repeat center / 100% 100%;
}
</style>
