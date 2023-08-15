<template>
    <view class="guide-box">
        <view class="guide-top">
            <view class="navBar">
                <view :style="{ height: app.statusBarHeight + 'px' }"></view>
                <view class="nav">
                    <view class="navSearchWrap"></view>
                    <view v-if="guideShowStep(1)" class="camera guide-show">
                        <image src="@/static/cardForum/camera.png" class="camera_img"></image>
                        <text class="camera_txt">发布</text>
                        <view class="box step1">
                            <image class="line step1-line" src="@/static/guide/line.png"/>
                            <view class="content step1-content">
                                <image class="icon" src="@/static/guide/icon.png"/>
                                <text class="title">
                                    点击此按钮发布动态或卡册，与卡迷们分享收藏~
                                </text>
                                <text class="msg">动态：分享您的卡片与收藏</text>
                                <text class="msg margin20">卡册：适用与凑套，需图片与卡种对应上传</text>
                            </view>
                            <view class="btn" @click="guideStep=2">
                                <image class="btn-img" src="@/static/guide/btn.png"></image>
                                <text class="next">下一步</text>
                                <text class="num">（1/3）</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view v-if="guideShowStep(2)" style="width: 750rpx;" class="tabs guide-show">
                <u-tabs style="width: 750rpx;" customType="showKa" :duration="300" lineWidth="49rpx" lineHeight="6rpx"
                    :itemStyle="{ marginTop: '-10rpx', height: '74rpx' }"
                    :activeStyle="{ color: '#333333', fontSize: '27rpx', transform: 'scale(1.22)', fontWeight: 'bold', fontFamily: 'PingFang SC' }"
                    :inactiveStyle="{ color: '#959695', fontSize: '27rpx', transform: 'scale(1)', fontFamily: 'PingFang SC' }"
                    class="tabs guide-show" id="tabs" :current="tabs.index" :list="tabs.list">
                    <template v-slot:showKa>
                        <image class="showKaImage" src="@/static/cardForum/showKa.png"></image>
                    </template>
                </u-tabs>
                <view class="box step2">
                    <image class="line step2-line" src="@/static/guide/line.png"/>
                    <view class="content step2-content">
                        <image class="icon" src="@/static/guide/icon.png"/>
                        <text class="title title-center">选择您感兴趣的类型浏览</text>
                    </view>
                    <view class="btn step2-btn" @click="guideStep=3">
                        <image class="btn-img" src="@/static/guide/btn.png"></image>
                        <text class="next">下一步</text>
                        <text class="num">（2/3）</text>
                    </view>
                </view>
            </view>
            <view v-if="guideStep==3" class="list-box">
                <view v-for="(item,index) in [firstData]" :key="index" class="waterfall-item-grayWrap">
                    <view class="waterfall-item">
                        <view class="waterfall-item__image">
                            <!-- #ifndef APP-NVUE -->
                            <image 
                                :style="{ height: item.height + 'px', width: item.width + 'px', borderRadius: item.mode == 'widthFix' ? `5rpx 5rpx 0rpx 0rpx` : `0rpx` }"
                                :mode="item.mode" :src="imageUrl(item)" class="waterfall-item__image_img">
                            </image>
                            <!-- #endif -->
                            <!-- #ifdef APP-NVUE -->
                            <image v-if="item.mode == 'widthFix'"
                                style="width: 360rpx;border-top-left-radius:5rpx;border-top-right-radius:5rpx" :src="item.cover"
                                class="waterfall-item__image_img" mode="widthFix">
                            </image>
                            <image v-if="item.mode == 'aspectFit'" :style="{ height: `440rpx`, width: item.width + 'px' }"
                                :src="item.cover" class="waterfall-item__image_img" mode="aspectFit">
                            </image>
                            <!-- #endif -->
                            <view class="videoIconWrap" v-if="item.video_at">
                                <u-icon class="videoIcon" color="#ffffff" size="26rpx" name="play-right-fill"></u-icon>
                            </view>
                        </view>
                        <view class="waterfall-item__ft">
                            <view class="waterfall-item__ft__title">
                                <text class="waterfall-item__ft__title__value u-line-2">{{ item.title || '发布一个新卡册'
                                }}</text>
                            </view>
                        </view>
                        <view class="waterfall-item__bottom">
                            <template>
                                <image class="waterfall-item__bottom__avatar" mode="aspectFill"
                                    :src="item.author ? item.author.avatar :(item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar)">
                                </image>
                                <text class="waterfall-item__bottom__userName u-line-1">{{ item.userName ||
                                    (item.author && item.author.name) || '小卡迷'
                                }}</text>
                                <view class="likeWrap">
                                    <image
                                        :src="isLike(item) ? '/static/cardForum/like.png' : '/static/cardForum/unLike.png'"
                                        class="likeImg"></image>
                                    <text class="likeNum">{{ item.likeNum }}</text>
                                </view>
                            </template>
                        </view>
                    </view>
                </view>
                <view class="box step2">
                    <image class="line step3-line" src="@/static/guide/line.png"/>
                    <view class="content step3-content">
                        <image class="icon_r" src="@/static/guide/icon_r.png"/>
                        <text class="title">点击查看其他用户的动态详情，觉得不错就点个赞吧~</text>
                    </view>
                    <view class="btn step3-btn" @click="onClickOver">
                        <image class="btn-img" src="@/static/guide/btn.png"></image>
                        <text class="next">知道了</text>
                        <text class="num">（3/3）</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
const app = getApp().globalData.app;
const LIEK = 4
export default {
    name: '',
    props: {
        tabs:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        firstData:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data() {
        return {
            app,
            guideStep:1,
            parsePic: getApp().globalData.parsePic,
            defaultAvatar: getApp().globalData.app.defaultAvatar,
        }
    },
    computed: {
        forumList(){
            return [this.tabs.list[1].list[0]]
        }
    },
    watch: {

    },
    mounted() {

    },
    methods: {
        guideShowStep(step){
			return step===this.guideStep;
		},
        isLike(item) {
            return (item.bit & LIEK) === LIEK
        },
        imageUrl(item) {
            const deCover = this.parsePic(decodeURIComponent(item.cover));
            const isVideoSnapshot = deCover.indexOf("x-oss-process=video/snapshot") >= 0
            if (isVideoSnapshot) return deCover
            return deCover
        },
        onClickOver(){
            this.$emit('over')
        }
    }
};
</script>
<style scoped lang="scss">
.guide-box{
    width:750rpx;
    position: fixed;
    top:0;
    left:0;
    bottom: 0;
    right:0;
    z-index: 998;
    background:rgba(0,0,0,0.5);
}
.guide-show{
    position: relative;
    z-index: 999;
    background-color:#fff;
}
.guide-top {
    position: fixed;
    top: 0;
    padding-bottom: 8rpx;
}
.navBar {
    width: 750rpx;
}
.nav {
    // box-sizing: border-box;
    // padding: 20rpx 35rpx;
    padding: 0rpx 33rpx 0 20rpx;
    height: 104rpx;
    // padding-top: 16rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    // height: 88rpx;
    justify-content: space-between;
}
.navSearchWrap {
    width: 614rpx;
    height: 73rpx;
}
.camera {
    width: 63rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 78rpx;
}
.camera_img {
    width: 53rpx;
    height: 40rpx;
    position: relative;
    top: 7rpx;
}

.camera_txt {
    font-size: 19rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    position: relative;
    // top: 4rpx;
}
.box{
    width: 710rpx;
    height:700rpx;
    position: absolute;
    z-index: 999;
}
.step1{
    bottom:-700rpx;
    right:0rpx;
}
.step2{
    bottom:-700rpx;
    left:0rpx;
}

.line{
    width: 40rpx;
    height:269rpx;
    position: absolute;
}
.step1-line{
    top:0rpx;
    right:12rpx;
}
.step2-line{
    top:0rpx;
    left:621rpx;
}
.step3-line{
    top:-60rpx;
    left:162rpx;
}
.content{
    width: 595rpx;
    padding:45rpx 15rpx 0 15rpx;
    border-radius: 3rpx;
    background:#fff;
    position: absolute;
}
.step1-content{
    top:276rpx;
    right:0rpx;
}
.step2-content{
    top:284rpx;
    left:120rpx;
}
.step3-content{
    top:224rpx;
    left:110rpx;
}
.icon{
    width: 255rpx;
    height:212rpx;
    position: absolute;
    left:0;
    top:-80rpx;
}
.icon_r{
    width: 255rpx;
    height:212rpx;
    position: absolute;
    right:0;
    top:-80rpx;
}
.title{
    width: 565rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #333333;
    margin-bottom: 12rpx;
}
.title-center{
    text-align: center;
}
.msg{
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
}
.btn{
    width: 167rpx;
    height:75rpx;
    position: absolute;
    top:542rpx;
    right:8rpx;
    transform: scale(1.05);
}
.btn-img{
    width: 167rpx;
    height:75rpx;
    position: absolute;
    left:0;
    top:0;
    transform: scale(1.05);
}
.step2-btn{
    top:489rpx;
    left:538rpx;
}
.step3-btn{
    top:423rpx;
    left:528rpx;
}
.next{
    width: 167rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFang;
    font-weight: bold;
    color: #FFFFFF;
    margin-top: 4rpx;
}
.num{
    width: 167rpx;
    text-align: center;
    font-size: 20rpx;
    font-family: PingFang;
    font-weight: bold;
    color: #FFFFFF;
}
.margin20{
    margin-bottom: 20rpx;
}
.showKaImage {
    width: 153rpx;
    height: 35rpx;
}
@mixin flex($direction: row) {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: $direction;
}

/* #ifndef APP-NVUE */
$uvui-nvue-style: true !default;

@if $uvui-nvue-style ==true {

    view,
    scroll-view,
    swiper-item {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        flex-grow: 0;
        flex-basis: auto;
        align-items: stretch;
        align-content: flex-start;
    }
}

/* #endif */


.refresh {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 750rpx;
    height: 80rpx;
    background-color: rgba(0, 0, 0, 0)
}

.uv-waterfall {
    @include flex(row);
    align-items: flex-start;

    &__column {
        @include flex(column);
        flex: 1;
        // #ifndef APP-NVUE
        height: auto;
        // #endif
    }
}

.waterfall-item {
    width: 360rpx;
    background-color: #ffffff;
    border-radius: 5rpx;
}

.waterfall-item__image {
    width: 360rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    position: relative;
    // #ifndef APP-NVUE
    border-radius: 5rpx 5rpx 0 0;
    overflow: hidden;
    // #endif
    // #ifdef APP-NVUE
    border-top-left-radius: 5rpx;
    border-top-right-radius: 5rpx;
    border-bottom-left-radius: 0rpx;
    border-bottom-right-radius: 0rpx;
    // #endif
}

.waterfall-item__image_img {
    width: 360rpx;
    // #ifndef APP-NVUE
    width: 100%;
    max-height: 439rpx;
    // #endif
    // border-radius: 5rpx;
    background-color: #ffffff;
}

.waterfall-item__ft__title {
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    width: 360rpx;
    padding: 0 21rpx 0 17rpx;
    margin-bottom: 32rpx;
    margin-top: 20rpx;
}

.waterfall-item__ft__title__value {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 33rpx;
    // #ifdef APP-NVUE
    lines: 2;
    text-overflow: ellipsis;
    // #endif
}

.waterfall-item__bottom {
    display: flex;
    flex-direction: row;

    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    width: 360rpx;
    padding: 0 12rpx 0 17rpx;
    padding-bottom: 20rpx;
    align-items: center;
}

.waterfall-item__bottom__avatar {
    width: 36rpx;
    height: 36rpx;
    // background: #FA1545;
    border-radius: 50%;
    margin-right: 15rpx;
}

.waterfall-item__bottom__userName {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #707070;
    flex: 1;
}

.likeWrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}

.likeImg {
    width: 28rpx;
    height: 24rpx;
}

.likeNum {
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8D8D8D;
    margin-left: 8rpx;
}

//兼容nvue下cell上下间距无法调整
.waterfall-item-grayWrap {
    padding-bottom: 10rpx;
    // background-color: #f6f7fb;
}

.videoIconWrap {
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    justify-content: center;
}

.videoIcon {
    position: relative;
    left: 2rpx;
}

.cardBook-nullpic {
    width: 360rpx;
    height: 430rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;


}

.wait-pic {
    width: 91rpx;
    height: 78rpx;
}
.list-box{
    width: 730rpx;
    margin-left:10rpx;
    margin-top: 82rpx;
    position: relative;
}
</style>