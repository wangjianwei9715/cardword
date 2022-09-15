<template>
    <view class='content'>
        <view class="pageTopContainer">
            <view class="status"
                :style="{paddingTop:app.statusBarHeight+'px',backgroundColor:`rgba(255,255,255,${scrollTopPercent})`}">
            </view>
            <view class="pageTop" ref="pageTop" id="pageTop"
                :style="{backgroundColor:`rgba(255,255,255,${scrollTopPercent})`}">
                <u-icon name="arrow-left" :color="scrollTopPercent>0.6?'#202124':'#fff'" size="20" @click="goBack">
                </u-icon>
                <view class="pageTitle" :style="{opacity:scrollTopPercent}">商家信息</view>
                <u-icon name="camera" :color="scrollTopPercent>0.6?'#202124':'#fff'" size="26"
                    @click="menuShow=true"></u-icon>
            </view>
        </view>
        <image class="merchantBanner" @click="menuShow=true" :src="parsePic(decodeURIComponent(merchantInfo.back_img))"
            mode="aspectFill" />
        <view class="infoContainer">
            <view class="infoItem uni-flex">
                <view class="infoItem-name">店铺名</view>
                <view class="infoItem-label">{{merchantInfo.name}}</view>
            </view>
            <pick-regions style="width:100;" @getRegion="handleGetRegion" fields='city'>
                <view class="infoItem uni-flex">
                    <view class="infoItem-name">所在地</view>
                    <view class="infoItem-label">{{merchantInfo.region}}</view>
                    <view class="infoItem-rightIcon"></view>
                </view>
            </pick-regions>
            <view class="infoItem uni-flex"
                @click="pageJump(`/pages/merchant/introduce?brief_intr=${merchantInfo.brief_intr}`)">
                <view class="infoItem-name">
                    <text>简</text>
                    <text>介</text>
                </view>
                <view class="infoItem-label">{{merchantInfo.brief_intr}}</view>
                <view class="infoItem-rightIcon"></view>
            </view>
        </view>
        <u-action-sheet :safeAreaInsetBottom="true" @select="onSelect" cancelText="取消" @close="menuShow=false"
            :actions="menuList" :show="menuShow"></u-action-sheet>
    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    import pickRegions from '@/components/pick-regions/pick-regions.vue'
    import ossUtils from "../../tools/ossUtils";
    @Component({})
    export default class ClassName extends BaseNode {
        app: any = app
        parsePic: any = parsePic;
        merchantInfo: any = {};
        menuShow: boolean = false
        menuList: any = [{ name: '从相册中选择', id: 1 }]
        ossutils = ossUtils.getInstance();
        saveBack: string = "";
        scrollTop: number = 0
        MAX_HEIGHT: number = 0;
        private get scrollTopPercent() {
            return this.scrollTop / (this.MAX_HEIGHT * 2)
        }
        onLoad() {
            this.$nextTick(() => {
                const query: any = uni.createSelectorQuery().in(this)
                query
                    .select('#pageTop')
                    .boundingClientRect((data: any) => {
                        this.MAX_HEIGHT = data.height
                    })
                    .exec();
            })
        }
        onPageScroll(data: any) {
            this.scrollTop = data.scrollTop
        }
        onShow() {
            this.getMerchantMsg();
        }
        goBack() {
            uni.navigateBack({ delta: 1 })
        }

        async onClickChangeAvatar() {
            let imageSrc = await this.ossutils.getImage();
            // console.log(imageSrc);
            await this.onClickAddImg(imageSrc)
        }
        async onClickAddImg(src: any) {
            let filePath = 'images/' + this.ossutils.getFileName(src); // 自定义上传后的文件名称
            let sign: any = await this.ossutils.getSTS(); // 获取签名等信息
            uni.showLoading({
                title: '上传图片中...'
            });
            uni.uploadFile({
                url: sign.host,
                filePath: src,
                fileType: 'image',
                name: 'file',
                formData: {
                    key: filePath,
                    policy: sign.policy,
                    OSSAccessKeyId: sign.accessId,
                    success_action_status: '200',
                    //让服务端返回200,不然，默认会返回204
                    signature: sign.signature,
                    'x-oss-security-token': sign.security_token
                },
                success: (res: any) => {
                    uni.hideLoading();
                    if (res.statusCode == 200) {
                        let avatar = sign.host + '/' + filePath
                        // this.merchantInfo.back_img = avatar
                        this.saveBack = encodeURIComponent(avatar)
                        this.saveFunction(true)
                    }
                },
                fail: (err) => {
                    uni.hideLoading();
                    uni.showModal({
                        content: err.errMsg,
                        showCancel: false
                    });
                }
            });
        }
        onSelect(event: any) {
            // console.log(event);
            if (event.id == 1) this.onClickChangeAvatar()
        }
        handleGetRegion(region: any) {
            const regionAddress = region.map((item: any) => item.name).join('\r')
            if (!regionAddress) return
            this.merchantInfo.region = regionAddress
            this.saveFunction()
        }
        saveFunction(changeBack?: boolean) {
            const { region, brief_intr, back_img } = this.merchantInfo
            app.http.Post(`me/shop/info/edit`, {
                region,
                brief_intr,
                back_img: changeBack ? this.saveBack : back_img
            }, (res: any) => {

                if (changeBack) {
                    this.merchantInfo.back_img = this.saveBack
                    this.saveBack = ""
                }
                uni.showToast({
                    title: '修改成功'
                })
            })
        }
        pageJump(url: string, type?: any) {
            const jumpType = type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
        getMerchantMsg() {
            app.http.Get("me/shop/home", {}, (res: any) => {
                this.merchantInfo = res.data;
                uni.$emit("refreshMerchantInfo", this.merchantInfo)
            });
        }
    }
</script>

<style lang="scss">
    page {
        background: #ffffff;
    }

    .pageTopContainer {
        position: fixed;
        top: 0;
        z-index: 200;

        .pageTop {
            background-color: rgba(255, 255, 255, 0);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            padding: 0 36rpx;
            justify-content: space-between;
            width: 750rpx;
            height: 88rpx;
            /* transition: all 0.2s linear; */
        }

        .btn-back {

            background: rgba(0, 0, 0, 0);
            font-family: uniicons;
            font-size: 46rpx;
            font-weight: normal;
            font-style: normal;
            color: #3C3C3C;
        }

        .pageTitle {
            font-size: 32rpx;
            color: #3C3C3C;
            position: absolute;
            font-family: HYQiHei;
            font-weight: bold;
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            pointer-events: none;
        }

        .rightIcon {
            width: 40rpx;
            height: 40rpx;
            opacity: 0;
        }
    }

    .merchantBanner {
        width: 750rpx;
        height: 353rpx;
    }

    .infoContainer {
        width: 750rpx;
        box-sizing: border-box;
        padding: 46rpx 28rpx 0 37rpx;
    }

    .infoItem {
        align-items: center;
        margin-bottom: 52rpx;
    }

    .infoItem-name {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7c7c7c;
        margin-right: 52rpx;
        position: relative;
        display: flex;
        justify-content: space-between;
        min-width: 88rpx;
    }

    .infoItem-name::after {
        content: ' ';
        display: block;
        width: 1rpx;
        height: 24rpx;
        background: #9C9C9C;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: -27rpx;
    }

    .infoItem-label {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }

    .infoItem-rightIcon {
        width: 13rpx;
        height: 21rpx;
        background-size: 100% 100%;
        background-image: url(../../static/merchant/rightIcon.png);
    }
</style>