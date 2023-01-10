<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-01-10 16:49:02
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-01-10 18:14:01
 * @FilePath: \card-world\src\components\previewImage\previewImage.vue
 * @Description: kww图片预览组件,可以展示图片名称,传参参考uni.previewImage
 * @注意:current不传默认0,无法传递字符串,urls可传单图片字符串
 * @Use：
    this.$refs.previewImage.show({
        urls:"https://ka-world.oss-cn-shanghai.aliyuncs.com/appAct/select/rank_8.png"
    })
    this.$refs.previewImage.show({
        current:0,
        urls:[{src:"https://ka-world.oss-cn-shanghai.aliyuncs.com/appAct/select/rank_8.png",title:"科比元年国宝金标9.5签字"}]
    })
-->
<template>
    <view class="previewImageContainer">
        <u-overlay class="overlay" :duration="200" :opacity="0.8" :show="showSwiper" @click="onClickAll">
            <swiper class="preSwiper" :duration="200" :circular="loop" :current="current">
                <swiper-item class="preSwiper_item" v-for="(item, index) in urls" :key="index">
                    <view class="img">
                        <image mode="widthFix" @longtap.stop="longTapImg(item)" :src="item.src" />
                        <view class="imageName">{{ item.title }}</view>
                    </view>
                </swiper-item>
            </swiper>
        </u-overlay>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseComponent from '@/base/BaseComponent.vue';
//继承UniApp.PreviewImageOptions 
interface KwwPreviewImageOptions extends UniApp.PreviewImageOptions {
    current?: number,//不传默认0
    urls: any
}
@Component({})
export default class ClassName extends BaseComponent {
    showSwiper: boolean = false;
    urls: any = []
    current: number = 0
    isLongTap: boolean = false
    loop: boolean = false;
    mounted(): void {
    }
    longTapImg(item: any) {
        //#ifdef APP-PLUS
        this.isLongTap = true
        app.platform.UIClickFeedBack()
        plus.nativeUI.actionSheet(
            {
                cancel: "取消",
                buttons: [
                    {
                        title: "保存到相册"
                    }
                ]
            },
            (e) => {
                if (e.index == 1) this.saveImage(item.src)
                this.isLongTap = false
            }
        );
        //#endif
    }
    saveImage(src: string) {
        uni.getImageInfo({
            src: src,
            success: (temporary: any) => {
                uni.saveImageToPhotosAlbum({
                    filePath: temporary.path,
                    success: (res: any) => {
                        uni.showToast({
                            title: "成功保存到相册",
                            icon: 'none'
                        })
                    }
                })
            }
        })
    }
    onClickAll() {
        if (!this.isLongTap) this.showSwiper = false
    }
    show(options: KwwPreviewImageOptions) {
        if (!options.urls || !options.urls.length) {
            options.fail && options.fail('无图片')
            return
        }
        let deepUrls: any = []
        if (options.urls && typeof options.urls === 'string') {
            deepUrls = [{ src: options.urls }]
        }
        if (options.urls && options.urls instanceof Array) {
            deepUrls = options.urls.map((item: any) => {
                return {
                    src: item.src ?? "",
                    title: item.title ?? ""
                }
            })
        }
        this.loop = options.loop ?? false
        this.current = options.current ?? 0
        this.urls = deepUrls
        this.showSwiper = true

    }
}
</script>

<style lang="scss">
.previewImageContainer {
    z-index: 999999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;

    .overlay {
        pointer-events: auto;
    }

    .preSwiper {
        width: 750rpx;
        height: 100%;
        position: relative;
    }

    .preSwiper_item {
        width: inherit;
        height: inherit;
        position: inherit;
    }

    .img {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: inherit;

        image {
            width: 100%;
            max-height: 100%;
            max-width: 100%;
            overflow-clip-margin: content-box;
            overflow: clip;
        }

        .imageName {
            text-align: center;
            font-size: 40rpx;
            font-weight: 600;
            font-family: PingFang SC;
            color: #fff;
            margin-top: 6rpx;
        }
    }
}
</style>
