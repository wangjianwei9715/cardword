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
                                    点击此按钮发布动态或卡册，与卡迷们分 享收藏~
                                </text>
                                <text class="msg">动态：分享您的卡片与收藏</text>
                                <text class="msg margin20">卡册：适用与凑套，需图片与卡种对应上传</text>
                            </view>
                            <view class="btn">
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
                <view class="box step1">
                    <image class="line step1-line" src="@/static/guide/line.png"/>
                    <view class="content step1-content">
                        <image class="icon" src="@/static/guide/icon.png"/>
                        <text class="title">
                            点击此按钮发布动态或卡册，与卡迷们分 享收藏~
                        </text>
                        <text class="msg">动态：分享您的卡片与收藏</text>
                        <text class="msg margin20">卡册：适用与凑套，需图片与卡种对应上传</text>
                    </view>
                    <view class="btn">
                        <image class="btn-img" src="@/static/guide/btn.png"></image>
                        <text class="next">下一步</text>
                        <text class="num">（1/3）</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
const app = getApp().globalData.app;
export default {
    name: '',
    props: {
        forumGuide:{
            tpye:Boolean,
            default:false
        },
        tabs:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data() {
        return {
            app,
            guideStep:2
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        guideShowStep(step){
			return this.forumGuide&&step===this.guideStep;
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
    letter-spacing:3rpx
}
.step1{
    bottom:-700rpx;
    right:0rpx;
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
.content{
    width: 595rpx;
    box-sizing: border-box;
    padding:45rpx 11rpx 0 11rpx;
    border-radius: 3rpx;
    background:#fff;
    position: absolute;
}
.step1-content{
    top:276rpx;
    right:0rpx;
}
.icon{
    width: 255rpx;
    height:212rpx;
    position: absolute;
    left:0;
    top:-80rpx;
}
.title{
    width: 595rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #333333;
    margin-bottom: 12rpx;
}
.step3-title{
    text-align: center;
}
.title text{
    font-size: 32rpx;
    font-family: PingFangSC-Medium;
    color:#FA1545
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
    right:0rpx;
}
.btn-img{
    width: 167rpx;
    height:75rpx;
    position: absolute;
    left:0;
    top:0
}
.step2-btn{
    top:-185rpx;
}
.step3-btn{
    top:479rpx;
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
</style>