<template>
    <view class="content">
        <view class="seriesCardContainer">
            <scroll-view scroll-x="true" class="cardContainer" :class="{flex1:list.length<=max}">
                <view class="uni-flex">
                    <view class="cardBlock" v-for="(item,index) in list.slice(0,max)" :key="index"
                        :class="{hasLine:index!=list.slice(0,max).length-1}">
                        <muqian-lazyLoad class="cardImg" borderRadius="3rpx" :src="filterPics(item)"
                            @click="prviewImages(item)" />
                        <!-- 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg' -->

                    </view>
                </view>
            </scroll-view>
            <view class="seriesMore" v-if="list.length>max">
                <view>更</view>
                <view>多</view>
                <image class="seriesMore-dot" mode="aspectFill" src="../../static/goods/v2/series_icon_right.png" />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import { parsePic } from '@/tools/util'
@Component({})
export default class ClassName extends BaseComponent {
    @Prop({ default: [] })
    list: any;
    @Prop({ default: 7 })
    max?: number
    created() {//在实例创建完成后被立即调用

    }
    mounted() {//挂载到实例上去之后调用

    }
    destroyed() {

    }
    prviewImages(picString: string) {
        if (!picString) return
        const picArr: any = picString.split(',').map(item => parsePic(decodeURIComponent(item)))
        uni.previewImage({
            current: 0,
            urls: picArr
        })
    }
    filterPics(picString: string) {
        if (!picString) return ""
        const picsArr: any = picString.split(',')
        if (!picsArr || !picsArr.length) return ""
        return parsePic(decodeURIComponent(picsArr[0]))
    }
}
</script>

<style lang="scss">
.seriesCardContainer {
    width: 710rpx;
    height: 172rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    display: flex;
    box-sizing: border-box;
    padding: 29rpx 0 28rpx 23rpx;
    align-items: center;
    position: relative;
    bottom: 26rpx;
    justify-content: space-between;

    .seriesMore {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C0C0C0;
        display: flex;
        width: 100rpx;
        flex-direction: column;
        align-items: center;

        .seriesMore-dot {
            width: 7rpx;
            height: 13rpx;
            margin-top: 8rpx;
        }
    }



    .cardContainer {
        display: flex;
        width: 620rpx;
        white-space: nowrap;

        .cardBlock {
            width: 89rpx;
            height: 115rpx;
            margin-right: 26rpx;
            position: relative;
        }

        .hasLine::after {
            content: " ";
            display: block;
            width: 1rpx;
            height: 92rpx;
            background-color: #E2E2E2;
            position: absolute;
            right: -14rpx;
            bottom: 0;
            margin: auto;
            top: 0;
        }

        .cardImg {
            width: inherit;
            height: inherit;

        }
    }

    .flex1 {
        flex: 1;
    }
}
</style>
