<template>
    <view class='content'>
        <view class="niceTime">
            <view class="niceTimeItem" v-for="(item,index) in seriesCardList" :key="index">
                <view class="niceTimeItem-top">
                    <muqian-lazyLoad class="niceTimeItem-img" borderRadius="5rpx 5rpx 0rpx 0rpx"
                        :src="parsePic(decodeURIComponent(filterImg(item.pic)[0]))" mode="aspectFill"
                        @click='previewImage(filterImg(item.pic),0,"")' />
                    <view class="niceTimeItem-dot flexCenter">{{imageNums(item.pic)}}</view>
                    <view class="scoreContainer uni-flex">
                    </view>
                </view>
                <view class="niceTime-name">
                    {{item.name}}
                </view>
                <view class="niceTime-bottom uni-flex">
                    <image class="niceTime-avatar"
                        :src="item.avatar?parsePic(decodeURIComponent(item.avatar)):defaultAvatar" mode="aspectFill" />
                    <view class="niceTime-userName onLine">{{item.userName}}</view>
                    <view class="niceTime-time">{{dateFormatMS(item.createTime)}}</view>
                </view>
            </view>
        </view>
        <empty v-if="seriesCardList&&!seriesCardList.length" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { parsePic, getStrDayNumber, dateFormatMS } from "@/tools/util";
@Component({})
export default class ClassName extends BaseNode {
    parsePic: any = parsePic;
    defaultAvatar: any = app.defaultAvatar
    getStrDayNumber: any = getStrDayNumber
    dateFormatMS: any = dateFormatMS
    alias: string = ""
    seriesId: any = null
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20
    }
    isFetchEnd: any = true
    seriesCardList: any = []
    onLoad(query: any) {
        // if (query.alias) this.alias = query.alias
        this.seriesId = +query.seriesId
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    filterImg(pic: string) {
        if(!pic) return
        let pics = pic.split(',')
        return pics
    }
    filterLevel(rarity: string) {
        const levelArr = rarity.split('')
        return levelArr.map((item: any) => {
            return {
                levelPic: `/static/merchant/${item}.png`,
                level: item
            }
        })
    }
    previewImage(list: any, index: number, key: string = "src") {
        const urls = list.map((item: any) => this.parsePic(key ? item[key] : item));
        uni.previewImage({
            urls,
            current: index
        });
    }
    imageNums(picString: any) {
        if (!picString) return 0
        return picString.split(',').length
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/advertising/iconSeries/rarity/card/list/${this.seriesId}`, this.queryParams, (res: any) => {
            this.isFetchEnd = res.isFetchEnd
            const dataList = res.list || []
            this.queryParams.fetchFrom == 1 ? this.seriesCardList=dataList : this.seriesCardList.push(...dataList)
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    background: #f5f7fb;
}

.niceTime {
    width: 750rpx;
    box-sizing: border-box;
    padding: 23rpx 14rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.niceTimeItem {

    width: 356rpx;
    // height: 426rpx;
    height: 588rpx;
    /* background-color: red; */
    background: #FFFFFF;
    border-radius: 5rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 12rpx;
    box-sizing: border-box;
    padding: 0 14rpx;
}

.niceTimeItem-top {
    /* width: 327rpx;
        height: 252rpx; */
    width: 355rpx;
    height: 426rpx;
    /* background: #333333; */
    border-radius: 3rpx;
    /* background: #333333; */
    position: relative;
    overflow: hidden;
    /* margin-top: 13rpx; */
}

.niceTimeItem-img {
    width: 355rpx;
    height: 426rpx;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5rpx;
    display: block;

}

.niceTimeItem-dot {
    width: 30rpx;
    height: 30rpx;
    background: #5D5D5D;
    border-radius: 3rpx;
    font-size: 23rpx;
    
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: .7;
}

.scoreContainer {
    position: absolute;
    align-items: center;
    left: 12rpx;
    top: 11rpx;

    image {
        width: 25rpx;
        height: 25rpx;
        margin-right: 5rpx;
    }

    .A {
        width: 29rpx;
        height: 24rpx;
    }
}

.niceTime-name {
    font-size: 25rpx;
    
    color: #333333;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 15rpx;
    width: 100%;
    height: 66rpx;
    line-height: 36rpx;
    margin-bottom: 30rpx;
}

.niceTime-bottom {
    width: 100%;
    align-items: center;
}

.niceTime-avatar {
    width: 27rpx;
    height: 27rpx;
    background: #88CCFA;
    border-radius: 50%;
    display: block;
    margin-right: 8rpx;
}

.niceTime-userName {
    font-size: 21rpx;
    
    font-weight: 400;
    color: #333333;
    flex: 1;
    /* max-width: 200rpx; */
    overflow: hidden;
    text-overflow: ellipsis;
    whitewhite-space: nowrap;
}

.niceTime-time {
    font-size: 21rpx;
    
    font-weight: 400;
    color: #999999;
}
</style>