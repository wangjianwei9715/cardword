<template>
    <view class='content'>
        <navigationbar :showBack="true" title="店铺精彩时刻" :rightText="isMerchant ? (onEdit ? '取消' : '管理') : ''"
            @onClickRightText="onClickRightText"></navigationbar>
        <view class="niceTime">
            <view class="niceTimeItem" v-for="(item, index) in niceTimeList" :key="index">
                <view class="niceTimeItem-top">
                    <muqian-lazyLoad class="niceTimeItem-img" borderRadius="5rpx 5rpx 0rpx 0rpx"
                        :src="parsePic(decodeURIComponent(filterImg(item.pic)[0]))" mode="aspectFill"
                        @click='previewImage(item)' />
                    <view class="niceTimeItem-dot flexCenter">{{ imageNums(item.pic) }}</view>
                    <view class="scoreContainer uni-flex">
                    </view>
                    <template v-if="!onEdit && item.isTop">
                        <view class="isTop flexCenter" v-if="!onEdit && item.isTop">置顶</view>
                        <view class="cancleTop flexCenter" v-if="!onEdit && item.isTop&&isMerchant" @click.stop="onClickSetTop(item)">
                            取消置顶</view>
                    </template>
                    <view class="selectContainer" v-if="onEdit" @click="onClickSelect(item.id)"
                        :class="{ selectContainer_select: hasSelect(item.id) }">
                        <view class="circle"></view>
                    </view>

                </view>
                <view class="niceTime-name">
                    {{ item.name }}
                </view>
                <view class="niceTime-bottom uni-flex">
                    <image class="niceTime-avatar"
                        :src="item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar" mode="aspectFill" />
                    <view class="niceTime-userName onLine">{{ item.userName }}</view>
                    <view class="niceTime-time">{{ dateFormatMS(item.createTime) }}</view>
                </view>
            </view>
        </view>
        <view class="deleteButton flexCenter" v-if="onEdit" @click="onClickDel">删除({{ selectIds.length }})</view>
        <empty v-if="!niceTimeList.length" />
        <view class="swpierContainer" v-if="showSwiper" @click="showSwiper = !showSwiper">
            <swiper :style="{ width: `750rpx`, height: '100%' }">
                <swiper-item class="swiperItem flexCenter" v-for="(pic, index) in  filterImg(selectItem.pic) ">
                    <image class="swiperImg" mode="widthFix" :src="parsePic(decodeURIComponent(pic))">
                    </image>
                </swiper-item>
            </swiper>
            <template>
                <view class="setTopButton flexCenter"v-if="isMerchant" @click.stop="onClickSetTop(undefined)">{{ selectItem.isTop ? '取消' : ''
                }}置顶</view>
                <view class="swiperIsTop flexCenter" v-if="selectItem.isTop"
                    :style="{ top: (statusBarHeight + top) + 'px' }">置顶
                </view>
            </template>
        </view>
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
    queryParams: any = {
        pageIndex: 1,
        pageSize: 10
    }
    totalPage: number = 0
    niceTimeList: any = []
    onEdit: boolean = false
    selectIds: Array<number> = []
    showSwiper: boolean = false
    statusBarHeight: number = app.statusBarHeight;
    top: number = uni.upx2px(88)
    isMerchant: boolean = false
    selectItem: any = {}
    onLoad(query: any) {
        if (query.alias) this.alias = query.alias
        if (query.isMerchant) this.isMerchant = true
        this.queryParams.pageIndex=1
        this.reqNewData()
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    filterImg(pic: string) {
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
    onClickRightText() {
        if (!this.isMerchant) return
        this.onEdit = !this.onEdit
        this.selectIds = []
    }
    hasSelect(id: number) {
        return this.selectIds.includes(id)
    }
    onClickSelect(id: number) {
        if (this.hasSelect(id)) {
            const findIndex: number = this.selectIds.findIndex((selectId: number) => {
                return selectId === id
            })
            this.selectIds.splice(findIndex, 1)
        } else {
            this.selectIds.push(id)
        }

    }
    onClickDel() {
        uni.showModal({
            title: "提示",
            content: `是否删除所选的${this.selectIds.length}项?`,
            success: (res: any) => {
                if (res.confirm) {
                    app.http.Post('me/shop/rarity/card/delete', { ids: this.selectIds }, () => {
                        uni.showToast({
                            title: '删除成功'
                        })
                        this.onEdit = false
                        setTimeout(() => {
                            this.queryParams.pageIndex = 1
                            this.reqNewData()
                            uni.$emit("niceTimeChange")
                        }, 200)
                    })
                }
            }
        })
    }
    previewImage(item: any) {
        this.selectItem = item
        this.showSwiper = true
        // const urls = list.map((item: any) => this.parsePic(key ? item[key] : item));
        // uni.previewImage({
        //     urls,
        //     current: index
        // });
    }
    onClickSetTop(item: any) {
        if (!item || !item.id) {
            item = this.selectItem
        }
        app.http.Post("me/shop/rarity/card/top/state/reverse/" + item.id, {}, () => {
            item.isTop = !item.isTop
            setTimeout(() => {
                this.queryParams.pageIndex = 1
                this.reqNewData()
                uni.$emit("niceTimeChange")
            }, 200)
        })
    }
    imageNums(picString: any) {
        if (!picString) return 0
        return picString.split(',').length
    }
    onPullDownRefresh() {
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/merchant/newII/rarity/card/` + this.alias, this.queryParams, (res: any) => {
            this.totalPage = res.totalPage
            const list = res.list || []
            this.queryParams.pageIndex == 1 ? this.niceTimeList = list : this.niceTimeList.push(...list)
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    background: #f5f7fb;
}

.swpierContainer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #333333;
    z-index: 99999;

    .swiperItem {
        width: 750rpx;
        height: 100%;
        position: relative;
    }

    .swiperImg {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        max-height: 100%;
        // max-width: 100%;
        width: 100%;
    }

    .setTopButton {
        width: 220rpx;
        height: 63rpx;
        font-size: 26rpx;
        
        font-weight: 400;
        color: #FFFFFF;
        border-radius: 30rpx;
        background-color: #666666;
        position: absolute;
        top: 80%;
        left: 0;
        right: 0;
        margin: auto;
    }

    .swiperIsTop {
        width: 70rpx;
        height: 38rpx;
        font-size: 24rpx;
        
        font-weight: 400;
        color: #FFFFFF;
        background-color: #fa1545;
        border-radius: 7rpx;
        position: absolute;
        right: 35rpx;
        // top:200rpx ;
    }
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
    // z-index: 7;
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

.selectContainer {
    width: 355rpx;
    height: 426rpx;
    position: absolute;
    background-color: rgba(0, 0, 0, .2);
    transition: background-color 0.2s;
    // z-index: 9;
    left: 0;
    top: 0;

    // background-color: red;
    .circle {
        width: 34rpx;
        height: 34rpx;
        position: absolute;
        left: 26rpx;
        top: 24rpx;
        background-size: 100% 100%;
        background-image: url("/static/merchant/circle.png");
    }
}

.selectContainer_select {
    background-color: rgba(0, 0, 0, .5);

    .circle {
        width: 34rpx;
        height: 34rpx;
        position: absolute;
        left: 26rpx;
        top: 24rpx;
        background-size: 100% 100%;
        background-image: url("/static/merchant/circle_select.png");
    }
}

.isTop {
    width: 70rpx;
    height: 38rpx;
    font-size: 24rpx;
    
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    left: 25rpx;
    top: 22rpx;
    background: #ff003d;
    border-radius: 7rpx;
}

.cancleTop {
    width: 120rpx;
    height: 38rpx;
    font-size: 24rpx;
    
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    background: rgba(0, 0, 0, .4);
    right: 25rpx;
    top: 22rpx;
    border-radius: 7rpx;
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

.deleteButton {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 107rpx;
    font-size: 33rpx;
    
    font-weight: bold;
    color: #FFFFFF;
    background-color: #ff003d;
    z-index: 30;
}
</style>