<template>
    <view class='content'>
        <navigationBar title="店铺简介" rightText='完成' @onClickRightText="onClickRightText" />

        <view class="inputContainer flexCenter">
            <u--textarea v-model='brief_intr' style="height: 90%;" confirmType='done' @confirm="onClickRightText"
                :maxlength='60' placeholder="请输入店铺简介" count></u--textarea>
        </view>
        <!-- <image class="merchantBanner" :src="parsePic(decodeURIComponent(merchantInfo.back_img))" mode="aspectFill" />
        <view class="infoContainer">
            <view class="infoItem uni-flex">
                <view class="infoItem-name">店铺名</view>
                <view class="infoItem-label">{{merchantInfo.name}}</view>
            </view>
            <view class="infoItem uni-flex">
                <view class="infoItem-name">所在地</view>
                <view class="infoItem-label">{{merchantInfo.region}}</view>
                <view class="infoItem-rightIcon"></view>
            </view>
            <view class="infoItem uni-flex">
                <view class="infoItem-name">
                    <text>简</text>
                    <text>介</text>
                </view>
                <view class="infoItem-label">{{merchantInfo.brief_intr}}</view>
                <view class="infoItem-rightIcon"></view>
            </view>
        </view> -->
    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic;
        merchantInfo: any = {};
        brief_intr: string = ''
        onLoad(query: any) {
            this.brief_intr = query.brief_intr
            // this.getMerchantMsg();
        }
        onClickRightText() {
            if (!this.brief_intr) {
                uni.showToast({
                    title: '内容不能为空',
                    icon: 'none'
                })
                return
            }
            let pages = getCurrentPages();
            let prePage = pages[pages.length - (2)];
            //@ts-ignore
            this.saveFunction(prePage.$vm.merchantInfo)
        }
        saveFunction(merchantInfo: any) {
            const { region, brief_intr, back_img } = merchantInfo
            app.http.Post(`me/shop/info/edit`, {
                region,
                brief_intr: this.brief_intr,
                back_img
            }, (res: any) => {
                uni.navigateBack({ delta: 1 })
            })
        }
        getMerchantMsg() {
            app.http.Get("me/shop/home", {}, (res: any) => {
                this.merchantInfo = res.data;
            });
        }
    }
</script>

<style lang="scss">
    page {
        background: #f7f6fb;
    }

    .inputContainer {
        width: 678rpx;
        height: 385rpx;
        background: #FFFFFF;
        border-radius: 5rpx;
        margin-top: 28rpx;
        position: relative;
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: 400;
    }

    .inputContainer ::v-deep .u-border {
        border: 0;
    }
</style>