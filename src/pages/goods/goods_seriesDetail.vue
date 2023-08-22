<template>
    <view class="content">
        <transitionNav ref='transitionNav' @navBackGroundShowChange="navBackGroundShowChange" :needIconShadow="false" :title="seriesDetail.name">
            <template slot="slotRight">
                <view class="series-icon" :class="topHasBack?'series-icon1':'series-icon2'" @click="seriesShow=!seriesShow"></view>
            </template>
        </transitionNav>
        <view class="detailCard" :style="{height:(380+(36*2))+'rpx'}">
            <image class="backImg" mode="aspectFill" :src="$parsePic(decodeURIComponent(seriesDetail.back_img))" />
            <view class="merchantMask"></view>
            <view class="seriesInfo uni-flex" :style="{marginTop:(130+(36*2))+'rpx'}">
                <image class="seriesInfo-avatar" mode="aspectFill"
                    :src="$parsePic(decodeURIComponent(seriesDetail.icon))" />
                <view class="seriesInfo-name">{{seriesDetail.name || "获取中"}}</view>
            </view>
            <view class="seriesInfo-introduction">
                <view class="introduction">
                    {{seriesDetail.describe || ""}}
                </view>
            </view>
        </view>
        <seriesCard :list="cardList" @goMore="goMore" :isFetchEnd="seriesCardEnd" v-if="cardList&&cardList.length" />
        <!--  -->
        <scroll-view scroll-x="true" class="tagContainer" v-if="choices&&choices.length>2">
            <view class="uni-flex" style="height:100%;align-items: center;">
                <view class="tag" v-for="(item,index) in choices" :key="index"
                    :class="{selectTag:queryParams.choice==item || (queryParams.choice=='all'&&item=='全部')}"
                    @click="onClickTag(item)">{{item}}</view>
            </view>
        </scroll-view>
        <goodslist :class="{noOther:!cardList.length&&!cardList.length,hasOther:cardList.length || choices.length>2}"
            :goodsList="goodsList" @send="onClickJumpDetails" />
        <empty v-if="goodsList && !goodsList.length"></empty>

        <seriesPopup :popupShow.sync="seriesShow" @seriesChange="initEvent"/>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../base/BaseNode.vue';
import seriesPopup from './component/seriesPopup.vue'
@Component({
    components:{
        seriesPopup
    }
})
export default class ClassName extends BaseNode {
    seriesId: any = ''
    statusBarHeight=app.statusBarHeight;
    seriesDetail: any = {}
    choices: any = ['全部']
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
        choice: "all"
    }
    isFetchEnd: boolean = true
    seriesCardEnd: boolean = true
    cardList: any = []
    goodsList: any = [];
    topHasBack = false;
    seriesShow = false;
    onLoad(query: any) {
        this.initEvent(query.seriesId)
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
    navBackGroundShowChange(event: any) {
        this.topHasBack = event
    }
    initEvent(seriesId:number){
        if(this.seriesId == seriesId) return;

        this.seriesId = seriesId
        this.reqSeriesCards()
        this.reqSeriesDetail()
        this.reqSeriesGoods()
    }
    refresh() {
        this.queryParams.fetchFrom = 1
        this.queryParams.fetchSize = 20
        this.reqSeriesGoods()
    }
    goMore() {
        uni.navigateTo({
            url: `/pages/goods/goods_seriesCardList?seriesId=${this.seriesId}`
        })
    }
    // 跳转商品详情
    onClickJumpDetails(goodCode: any) {
        app.navigateTo.goGoodsDetails(goodCode)
    }
    onClickTag(item: any) {
        this.queryParams.choice = item == '全部' ? 'all' : item
        this.refresh()
    }
    reqSeriesCards() {
        app.http.Get(`dataApi/advertising/iconSeries/rarity/card/list/${this.seriesId}/brief`, { fetchFrom: 1, fetchSize: 10 }, (res: any) => {
            this.cardList = res.list || []
            this.seriesCardEnd = res.isFetchEnd
        })
    }
    reqSeriesGoods(cb?: any) {
        app.http.Get(`dataApi/advertising/iconSeries/good/list/${this.seriesId}`, this.queryParams, (res: any) => {
            const dataList = res.list || []
            this.queryParams.fetchFrom == 1 ? this.goodsList=dataList : this.goodsList.push(...dataList)
            this.isFetchEnd = res.isFetchEnd
            cb && cb()
        })
    }
    reqSeriesDetail() {
        app.http.Get('dataApi/advertising/iconSeries/detail/' + this.seriesId, {}, (res: any) => {
            this.seriesDetail = res.data
            this.choices = ['全部', ...res.data.choices]
        })
    }
    onClickSeriesSelect(){
        uni.navigateTo({
            url:'seriesSelect?back=true'
        })
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
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
        margin-right: 61rpx;
    }

    .selectTag {
        font-size: 31rpx;
        font-family: PingFang SC;
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
        font-family: PingFang SC;
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
        font-family: PingFang SC;
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
