<template>
    <view class="content" v-if="list!=''">
        <view class="seriesCardContainer" :class="{seriesCardContainer_noMore:isFetchEnd}">
            <scroll-view scroll-x="true" class="cardContainer" :class="{flex1:isFetchEnd}">
                <view class="uni-flex">
                    <view class="cardBlock" v-for="(item,index) in list" :key="index"
                        :class="{hasLine:index!=list.length-1}">
                        <muqian-lazyLoad class="cardImg" borderRadius="3rpx" :src="filterPics(item)"
                            @click="prviewImages(item)" />
                        <!-- 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg' -->

                    </view>
                </view>
            </scroll-view>
            <view class="seriesMore" v-if="!isFetchEnd" @click="goMore">
                <view class="seriesMore-msg">更</view>
                <view class="seriesMore-msg">多</view>
                <image class="seriesMore-dot" mode="aspectFill" src="../../static/goods/v2/icon_right_new.png" />
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
    @Prop({
        default:true
    })
    isFetchEnd?:boolean
    created() {//在实例创建完成后被立即调用

    }
    mounted() {//挂载到实例上去之后调用

    }
    destroyed() {

    }
    goMore(){
        this.$emit('goMore')
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
.content{
    width: 100%;
}
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
        display: flex;
        width: 66rpx;
        flex-direction: column;
        align-items: center;
        .seriesMore-msg{
            font-size: 24rpx;
            
            
            color: #C0C0C0;
        }
        .seriesMore-dot {
            width: 11rpx;
			height:17rpx;
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
            background-color: #eeeeee;
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
.seriesCardContainer_noMore{
    padding: 29rpx 23rpx 28rpx 23rpx;
}
</style>
