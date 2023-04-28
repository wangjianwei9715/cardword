<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-04-25 10:07:50
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-28 16:06:28
 * @FilePath: \card-world\src\pages\act\dewu\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-04-25 10:07:50
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-26 09:46:36
 * @FilePath: \card-world\src\pages\act\dewu\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav ref='transitionNav' @onClickRule="onClickRule" :shareData="shareData" :toolsMapCustomNew="navRule"
            :needIconShadow="false" :needRightTools="['规则', '分享']" title="得物卡牌评级 限量兑换">
        </transitionNav>
        <view class="topBanner">
            <view class="tipOne">
                <view>得物卡牌评级</view>
                <view>限量兑换</view>
            </view>
            <view class="tipTwo">
                <view>原价：33元/张</view>
                <view style="display: flex;align-items: center;">现价：<image src="@/static/act/dewu/point.png"
                        style="width: 179rpx;height: 48rpx;position: relative;bottom: 4rpx;"></image>
                </view>
            </view>
        </view>
        <view class="dewuCoupon" v-for="(item, index) in list" :key="index"
            :style="{ marginTop: index == 0 ? `-272rpx` : 0 }">
            <view class="title"></view>
            <view class="rightTips" v-if="item.buy_num == 0">每位用户限兑{{ item.limit_num }}次</view>
            <view class="rightTips" v-if="item.buy_num >= item.limit_num">恭喜您，已兑换</view>
            <view class="couponWrap" :class="{ couponWrap3: index == 1 }">
                <view class="coupon" :class="{ coupon3: index == 1 }">
                    <view class="couponFontContainer">
                        <view class="left">
                            <view class="name">免费卡牌评级券</view>
                            <view class="time">2023.5.7前可用</view>
                        </view>
                        <view class="right" style="position: relative;bottom: 2rpx;">
                            <view class="free">免费</view>
                            <view class="wmk">限35pt</view>
                            <view class="wmk">及以下</view>
                            <!-- <view class="wmk">及以下可用</view> -->
                            
                        </view>
                    </view>
                </view>
                <view class="rightInfo" v-if="index == 0">
                    <view class="font" style="margin-top: 23rpx;margin-bottom: 25rpx;">{{ item.name }}</view>
                    <view class="font">
                        剩余：<text class="big">{{ item.leftNum }}份</text>
                    </view>
                </view>
                <view v-else class="rightInfo">
                    <view class="font" style="margin-top:10rpx;margin-bottom: 10rpx;">{{ item.name }}</view>
                    <view class="font">{{ item.nameTwo }}</view>
                    <view class="font">
                        剩余：<text class="big">{{ item.leftNum }}份</text>
                    </view>
                </view>

            </view>
            <template v-if="isOnTime(item)">
                <!-- 可兑换 -->
                <view class="couponButton flexCenter" v-if="item.buy_num < item.limit_num && item.leftNum > 0"
                    @click="onClickExchange(item)">{{ item.price }}卡币立即兑换</view>
                <!-- 已兑换 -->
                <view class="couponButton red flexCenter" @click="onClickGoApp(item)"
                    v-else-if="item.buy_num > 0 && item.buy_num >= item.limit_num">
                    去得物APP领取并使用
                </view>
                <!-- 剩余数量为0 (灰色不可点击)-->
                <view class="couponButton dis flexCenter" v-else-if="item.leftNum <= 0" @click="noneLeftNum">{{ item.price
                }}卡币立即兑换
                </view>
            </template>
            <template v-else>
                <!-- 倒计时 -->
                <view class="couponButton dis flexCenter" v-if="item.start_at > nowTimeStamp">{{ countDown(item.start_at)
                }}后开抢
                </view>
                <!-- 未兑换且已结束 -->
                <view class="couponButton dis flexCenter" v-if="nowTimeStamp > Over_time && item.buy_num == 0">兑换截止</view>
                <!-- 已兑换且已结束 -->
                <view class="couponButton red flexCenter" @click="onClickGoApp(item)"
                    v-if="nowTimeStamp > Over_time && item.buy_num > 0">去得物APP领取并使用
                </view>
            </template>
        </view>
        <view class="processCard">
            <view class="title"></view>
            <view class="rightTips" @click="onClickRule">了解更多</view>
            <view class="processContainer">
                <view class="img img1">
                    兑换成功
                </view>
                <view class="img img2">
                    专属入口跳转至得物
                </view>
                <view class="img img3">
                    领取并使用
                </view>
                <view class="circleContainer" style="left: 148rpx;">
                    <view class="circle"></view>
                    <view class="circleS"></view>
                </view>
                <view class="circleContainer" style="right:188rpx">
                    <view class="circle"></view>
                    <view class="circleS"></view>
                </view>
                <view class="shine"></view>
            </view>
            <view class="tipBlock flexCenter">若同时下单5张卡牌评级，额外附赠1张得物免费卡牌评级券！</view>
            <view class="tips">（下单后，7个工作日内发放至用户得物账号）</view>
        </view>
        <view class="blockTitle blockTitle1"></view>
        <view class="desc">得物评级的过程是将卡牌进行边（边长），角（四角），面（表面），形（居中度），体（体积）、颜（颜色）作为评分依据，多个方面进行检查，然后根据卡牌的整体状况，给予一个评级等级。</view>
        <view class="pj">
            <view class="jumpButton" @click="goToDewuPj"></view>
        </view>
        <view class="desc">此外，得物评级实行全程监控，实验室高精设备辅助评分，并且提供上门取货，物流比送到国外安全得多、快得多；每张卡牌都由2位评级师交叉评分</view>
        <image src="@/static/act/dewu/dewulc.png" style="width: 665rpx;height: 557rpx;margin-top: 30rpx;"></image>
        <view class="blockTitle blockTitle3"></view>
        <view class="desc">1.每张得物35pt免费卡牌评级券可免费评级一张卡片，<text
                style="color:#00feff;font-weight: bold;">仅限35pt及以下卡片可用,</text>有效期至2023.05.07，过期作废。</view>
        <view class="desc">2.用户在卡世界app兑换成功后，通过活动页面专属入口跳转到得物app领取评级券</view>
        <view class="desc">3.获得评级券的用户可登录得物app，通过 探索-鉴别服务-评级卡服务或直接在购买页搜索【卡牌评级】 按照操作流程进行评级。</view>
        <view class="imgContainer">
            <image mode="aspectFill" @click="prvImgRule(index)" v-for="(item, index) in picsRule" :key="index" :src="item">
            </image>
        </view>
        <view class="blockTitle blockTitle2"></view>
        <view class="cardList">
            <image v-for="(item, index) in pics" :src="item" @click="prvImg(index)" />
        </view>
        <view class="bottomSafeArea"></view>
        <u-overlay :zIndex="888" :show="exchangeBoxShow || successBoxShow"></u-overlay>
        <view class="modal exchangeModal" :class="{ modal_show: exchangeBoxShow }"
            :style="{ top: statusBarHeight + 380 + 'rpx' }">
            <view class="coupon" :class="{ coupon3: selectItem.nameTwo }"></view>
            <!-- <view class="title">确认兑换</view> -->
            <view class="text">是否消耗{{ selectItem.price }}卡币兑换</view>
            <view class="text">{{ "得物" + selectItem.name || "" }}</view>
            <view class="text" v-if="selectItem.nameTwo">{{ selectItem.nameTwo || "" }}</view>
            <view style="flex:1"></view>
            <view class="exchangeModalButton green" @click="submitExchange"></view>
            <view class="close" @click="exchangeBoxShow = false"></view>
        </view>
        <view class="modal successModal" :class="{ modal_show: successBoxShow }"
            :style="{ top: statusBarHeight + 340 + 'rpx' }">
            <view class="coupon" :class="{ coupon3: selectItem.nameTwo }"></view>
            <view class="title">恭喜您，兑换成功</view>
            <view class="text">（同时在得物app下单5张卡牌评级，额外附赠1张评级包邮券！）</view>
            <!-- <view style="flex:1"></view> -->
            <view class="exchangeModalButtonRed" @click="onClickGoApp(selectItem)">去得物APP领取并使用</view>
            <view class="wait" @click="successBoxShow = false">等等再说</view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic, secondsFormat } from "@/tools/util";
let os_version: any = ""
//#ifdef APP-PLUS
if (plus.os.name == "iOS") {
    os_version = plus.os.version?.replaceAll("_", ".")
}
//#endif
const Over_time = 1683129599
const shareData = {
    shareUrl: `share/${app.bussinessApiDomain == "https://server.ssltest.ka-world.com/api/v2.1/" ? "testH5" : "h5"}/#/pages/act/dewu`,
    title: "得物卡牌评级 限量兑换",
    summary: "仅需18卡币，开启评级新体验",
    thumb: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.04.28/luckdraw/0/1682648659261en8jkrxelu.jpg"
}
const navRule = {
    "规则": {
        emitAction: "onClickRule",
        icon: "/static/act/dewu/rule.png",
        style: {
            width: "36rpx",
            height: "36rpx",
            marginRight: "20rpx"
        }
    }
}
const one = {
    name: "得物免费卡牌评级券x1",
    iosLink: `dewulink://m.dewu.com/note?routerUrl=https%3A%2F%2Fm.poizon.com%2Frouter%2Fweb%2FBrowserPage%3FloadUrl%3Dhttps%253A%252F%252Ffast.dewu.com%252Fnezha-plus%252Fdetail%252F63355374167c22c6ca0bb439%253FisAllowVideoAutoPlay%253D1%2526eTId%253D1682318723413-a766b70e-f788-83ee-4850-abbdd0dc4556%2526dFId%253D660e656b907b1b20306fd25c44db9ab0%2526browser_name%253Dsafari%2526m_brand%253Diphone%2526os_version%253D${os_version}%2526phone_os%253DiPhone%2526eFrom%253Dhttps%25253A%25252F%25252Fcdn-fast.dewu.com%25252Fnezha-plus%25252Fdetail%25252F63355374167c22c6ca0bb439`,
    androidLink: "dewulink://m.dewu.com/note?routerUrl=https%3A%2F%2Fm.poizon.com%2Frouter%2Fweb%2FBrowserPage%3FloadUrl%3Dhttps%253A%252F%252Fcdn-fast.dewu.com%252Fnezha-plus%252Fdetail%252F63355374167c22c6ca0bb439%253FisAllowVideoAutoPlay%253D1",
}
const two = {
    name: "得物免费卡牌评级券x2",
    nameTwo: "卡牌评级回寄包邮券x1",
    iosLink: `dewulink://m.dewu.com/note?routerUrl=https%3A%2F%2Fm.poizon.com%2Frouter%2Fweb%2FBrowserPage%3FloadUrl%3Dhttps%253A%252F%252Fcdn-fast.dewu.com%252Fnezha-plus%252Fdetail%252F61df95ff55692a2045b4a616%253FisAllowVideoAutoPlay%253D1`,
    androidLink: "dewulink://m.dewu.com/note?routerUrl=https%3A%2F%2Fm.poizon.com%2Frouter%2Fweb%2FBrowserPage%3FloadUrl%3Dhttps%253A%252F%252Fcdn-fast.dewu.com%252Fnezha-plus%252Fdetail%252F61df95ff55692a2045b4a616%253FisAllowVideoAutoPlay%253D1",

}
const pics = [
    "../../../static/act/dewu/card1.png",
    "../../../static/act/dewu/card2.png",
    "../../../static/act/dewu/card3.png",
    "../../../static/act/dewu/card4.png",
    "../../../static/act/dewu/card5.png",
    "../../../static/act/dewu/card6.png",
    "../../../static/act/dewu/card7.png",
    "../../../static/act/dewu/card8.png"
]
const picsRule = [
    "../../../static/act/dewu/rule1.png",
    "../../../static/act/dewu/rule2.png"
]
@Component({})
export default class ClassName extends BaseNode {
    statusBarHeight = app.statusBarHeight
    navRule = navRule
    one = one
    two = two
    pics = pics
    picsRule = picsRule
    list: any = []
    selectItem: any = {}
    exchangeBoxShow: boolean = false
    successBoxShow: boolean = false
    nowTimeStamp: any = Math.round(+new Date() / 1000);
    shareData = shareData
    timer: any = null
    Over_time = Over_time
    exchangeLock: boolean = false
    onLoad(query: any) {
        // app.platform.hasLoginToken(() => {

        // })
        this.timer = setInterval(() => {
            this.getNewTime();
        }, 1000);
        this.reqNewData()
    }
    onShow() {
        //#ifdef APP-PLUS
        plus.navigator.setStatusBarStyle("light")
        //#endif
    }
    beforeDestroy() {
        this.timer && clearInterval(this.timer)
    }
    onPageScroll(data: any) {
        //@ts-ignore
        // this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onPullDownRefresh() {
        this.reqNewData((() => {
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
        }))
    }
    public overlayShow(): boolean {
        return Boolean(this.exchangeBoxShow || this.successBoxShow)
    }
    getNewTime() {
        this.nowTimeStamp = Math.round(+new Date() / 1000);
    }
    countDown(time: number) {
        const { day, hour, minute, second } = secondsFormat(time - this.nowTimeStamp);
        let strList: any = []
        if (+day > 0) {
            strList.push(`${day}天`)
        }
        if (strList.length != 0 || +hour > 0) {
            strList.push(`${hour}时`)
        }
        if (+minute > 0 || strList.length != 0) {
            strList.push(`${minute}分`)
        }
        if (+second > 0 || strList.length != 0) {
            strList.push(`${second}秒`)
        }
        return strList.join("")
    }
    prvImg(index: number) {
        uni.previewImage({
            urls: this.pics,
            current: index
        })
    }
    prvImgRule(index: number) {
        uni.previewImage({
            urls: this.picsRule,
            current: index
        })
    }
    onClickExchange(item: any) {
        if(this.exchangeLock) return
        app.platform.hasLoginToken(() => {
            const checkMap: any = {
                "start_at": {
                    bol: item.start_at > Math.round(+new Date() / 1000),
                    tips: '未到开抢时间'
                },
                "leftNum": {
                    bol: item.leftNum <= 0,
                    tips: "可兑换数量不足"
                },
                "buy_num": {
                    bol: item.buy_num >= item.limit_num,
                    tips: "兑换已达上限"
                }
            }
            let hasError: boolean = false
            for (let key in checkMap) {
                if (checkMap[key].bol) {
                    uni.showToast({
                        icon: "none",
                        title: checkMap[key].tips
                    })
                    hasError = true
                    break;
                }
            }
            if (hasError) {
                return
            }
            this.selectItem = item
            this.exchangeBoxShow = true
        })

    }
    noneLeftNum() {
        uni.showToast({
            title: "可兑换数量不足",
            icon: "none"
        })
    }
    isOnTime(item: any) {
        return this.nowTimeStamp >= item.start_at && this.nowTimeStamp < Over_time
    }
    submitExchange() {
        if (this.exchangeLock) return
        this.exchangeLock = true
        uni.showLoading({
            title: "",
            mask: true
        })
        app.http.Post(`point/exchange/exchange/${this.selectItem.id}`, {}, (res: any) => {
            this.exchangeBoxShow = false;
            this.successBoxShow = true
            uni.hideLoading()
            app.platform.UINotificationFeedBack("success");
            this.exchangeLock = false
            setTimeout(() => {
                this.reqNewData();
            }, 300)
        }, (err: any) => {
            this.exchangeLock = false
            setTimeout(() => {
                this.reqNewData();
            }, 300)
        });
    }
    onClickGoApp(item: any) {
        this.selectItem = item
        this.goDewuApp()
    }
    onClickRule() {
        uni.navigateTo({
            url: "/pages/act/dewu/rule"
        })
    }
    goDewuApp() {
        const IOS = this.selectItem.iosLink
        const Android = this.selectItem.androidLink
        this.arouseDewuApp(IOS, Android)
    }
    goToDewuPj() {
        const IOS = "dewulink://m.dewu.com/note?routerUrl=https%3A%2F%2Fm.poizon.com%2Frouter%2Fweb%2FBrowserPage%3FloadUrl%3Dhttps%253A%252F%252Fcdn-fast.dewu.com%252Fnezha-plus%252Fdetail%252F63aa962cf3fa8ccdd0fe8042%253FisAllowVideoAutoPlay%253D1"
        const Android = "dewulink://m.dewu.com/note?routerUrl=https%3A%2F%2Fm.poizon.com%2Frouter%2Fweb%2FBrowserPage%3FloadUrl%3Dhttps%253A%252F%252Fcdn-fast.dewu.com%252Fnezha-plus%252Fdetail%252F63aa962cf3fa8ccdd0fe8042%253FisAllowVideoAutoPlay%253D1"
        this.arouseDewuApp(IOS, Android)
    }
    goAppStore() {
        const IOS_Down = "itms-appss://apps.apple.com/cn/app/id1012871328"
        const Android_Down = "market://details?id=com.shizhuang.duapp"
        plus.runtime.openURL(plus.os.name == "Android" ? Android_Down : IOS_Down)
    }
    arouseDewuApp(ios: string, android: string) {
        uni.showModal({
            title: "提示",
            content: "您将前往得物App",
            success: (res: any) => {
                if (res.confirm) {
                    if (plus.os.name == "Android") {
                        plus.runtime.openURL(android, (err) => {
                            this.goAppStore()
                        })
                    } else {
                        plus.runtime.launchApplication({ action: ios }, (err) => {
                            this.goAppStore()
                        })
                    }
                }
            }

        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/dewu/goodsList`, {}, (res: any) => {
            this.list = (res.list || []).slice(0, 2).map((item: any, index: number) => {
                let newItem = item
                Object.assign(newItem, index == 0 ? one : two)
                return Object.assign(newItem, index == 0 ? one : two)
            })
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
@font-face {
    font-family: "FZLanTingHeiS-R-GB";
    src: url("@/common/Tao/FZLanTingHeiSR.ttf");
}

@font-face {
    font-family: "FZLanTingHeiS-H-GB";
    src: url("@/common/Tao/FZLanTingHeiSH.ttf");
}

page {
    font-family: PingFang SC;
    background-color: #000;
    color: #fff;
}

.topBanner {
    width: 750rpx;
    height: 1013rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/dewu/topBanner.png");
    position: relative;
    box-sizing: border-box;
    padding-left: 50rpx;

    .tipOne {
        margin-top: 158rpx;
        width: 600rpx;
        height: 92rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/tipOne.png");

        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 32rpx 0 25rpx;
        align-items: center;
        margin-bottom: 7rpx;

        view {
            position: relative;
            top: 4rpx;
            font-size: 49rpx;
            font-family: FZLanTingHeiS-H-GB;
            font-weight: 400;
            color: #333333;
            font-style: italic;
        }
    }

    .tipTwo {
        width: 535rpx;
        height: 71rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/tipTwo.png");
        padding: 0 22rpx 0 25rpx;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;

        view {
            position: relative;
            top: 4rpx;
            font-size: 29rpx;
            font-family: FZLanTingHeiS-H-GB;
            font-weight: 400;
            color: #333333;
            font-style: italic;

        }
    }
}

.dewuCoupon {
    width: 650rpx;
    height: 433rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/dewu/card.png");
    box-sizing: border-box;
    position: relative;
    margin-bottom: 37rpx;

    .title {
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/hot.png");
        width: 193rpx;
        height: 57rpx;
        margin-top: 6rpx;
        margin-left: 18rpx;
    }

    .rightTips {
        font-size: 21rpx;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        font-style: italic;
        color: #414141;
        position: absolute;
        right: 32rpx;
        top: 36rpx;
    }

    .couponWrap {
        display: flex;
        // margin: 0 auto;
        margin-top: 58rpx;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 33rpx 0 44rpx;

        .coupon {
            width: 286rpx;
            height: 117rpx;
            background-size: 100% 100%;
            background-image: url("@/static/act/dewu/c1.png");
            position: relative;
        }

        .coupon3 {
            width: 300rpx;
            height: 132rpx;
            background-size: 100% 100%;
            background-image: url("@/static/act/dewu/c3.png");

        }

        .couponFontContainer {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 24rpx 18rpx 0 10rpx;
            display: flex;
            justify-content: space-between;

            .right {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .name {
                font-size: 21rpx;
                font-family: FZLanTingHeiS-H-GB;
                font-weight: 400;
                color: #2C2C2C;
            }

            .time {
                font-size: 17rpx;
                font-family: FZLanTingHeiS-R-GB;
                font-weight: 400;
                color: #2C2C2C;
                opacity: .43;
            }

            .free {
                font-size: 29rpx;
                font-family: FZLanTingHeiS-H-GB;
                font-weight: 400;
                color: #2C2C2C;
            }

            .wmk {
                font-size: 17rpx;
                font-family: FZLanTingHeiS-R-GB;
                font-weight: 400;
                color: #2C2C2C;
            }
        }

        .rightInfo {
            .font {
                font-size: 25rpx;
                font-family: FZLanTingHeiS-H-GB;
                font-weight: 400;
                color: #FFFFFF;
                text-align: right;
                // letter-spacing: 2rpx;

                .big {
                    letter-spacing: 2rpx;
                    font-size: 33rpx;
                }
            }
        }


    }

    .couponWrap3 {
        padding: 0 32rpx 0 34rpx;

        .couponFontContainer {
            padding: 40rpx 18rpx 0 24rpx;
        }
    }

    .couponButton {
        width: 612rpx;
        height: 126rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/blueButton.png");
        font-size: 38rpx;
        font-family: FZLanTingHeiS-H-GB;
        font-weight: 400;
        color: #2C2C2C;
        margin: 0 auto;
        margin-top: 10rpx;
    }

    .dis {
        background-image: url("@/static/act/dewu/disButton.png");
    }

    .red {
        color: #fff;
        background-image: url("@/static/act/dewu/redButton.png");
        // background-color: #ff404d;
    }
}

.blockTitle {
    background-size: 100% 100%;
}

.blockTitle1 {
    width: 304rpx;
    height: 50rpx;
    background-image: url("@/static/act/dewu/desc1.png");
    margin-top: 45rpx;
    margin-bottom: 21rpx;
}

.imgContainer {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 40rpx;
    width: 650rpx;
    image {
        display: block;
        width: 49%;
    }
}

.blockTitle2 {
    width: 265rpx;
    height: 79rpx;
    background-image: url("@/static/act/dewu/desc2.png");
    margin-top: 50rpx;
    margin-bottom: 36rpx;
}

.blockTitle3 {
    width: 417rpx;
    height: 52rpx;
    background-image: url("@/static/act/dewu/desc3.png");
    margin-top: 53rpx;
    margin-bottom: 36rpx;
}

.pj {
    width: 663rpx;
    height: 897rpx;
    margin-top: 44rpx;
    margin-bottom: 38rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/dewu/pj.png");
    position: relative;

    .jumpButton {
        width: 663rpx;
        height: 120rpx;
        // background-color: red;
        position: absolute;
        bottom: 80rpx;
    }
}

.cardList {
    width: 750rpx;
    box-sizing: border-box;
    // padding: 0 50rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    image {
        width: 372rpx;
        height: 560rpx;
        margin-bottom: 8rpx;
    }
}

.desc {
    font-size: 25rpx;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: 400;
    line-height: 39rpx;
    color: #FFFFFF;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 50rpx;
}

.processCard {
    width: 650rpx;
    height: 331rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/dewu/processCard.png");
    position: relative;

    .title {
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/lc.png");
        width: 151rpx;
        height: 73rpx;
        margin-top: 5rpx;
        margin-left: 21rpx;
    }

    .rightTips {
        font-size: 21rpx;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        font-style: italic;
        text-decoration: underline;
        color: #FFFFFF;
        position: absolute;
        right: 33rpx;
        top: 41rpx;
    }

    .processContainer {
        display: flex;
        height: 90rpx;
        align-items: center;
        padding: 0 15rpx 0 9rpx;
        justify-content: space-between;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        margin-top: 8rpx;

        .img {
            background-size: 100% 100%;
            height: inherit;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25rpx;
            font-family: FZLanTingHeiS-H-GB;
            font-weight: 400;
            color: #2C2C2C;
        }

        .img1 {
            width: 155rpx;
            background-image: url("@/static/act/dewu/l1.png");
        }

        .img2 {
            width: 286rpx;
            background-image: url("@/static/act/dewu/l2.png");
        }

        .img3 {
            width: 183rpx;
            background-image: url("@/static/act/dewu/l3.png");
        }

        .circleContainer {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 28rpx;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;

        }

        .circle {
            width: 5rpx;
            height: 5rpx;
            border: 2rpx solid #EEEEEE;
            border-radius: 50%;
        }

        .circleS {
            width: 5rpx;
            height: 5rpx;
            background: #FFFFFF;
            border: 2rpx solid #EEEEEE;
            border-radius: 50%;
        }

        .shine {
            width: 93rpx;
            height: 93rpx;
            background-image: url("@/static/act/dewu/shine.png");
            background-size: 100% 100%;
            position: absolute;
            top: -28rpx;
            right: -12rpx;
        }
    }

    .tipBlock {
        width: 597rpx;
        height: 55rpx;
        background: #00FEFF;
        border-radius: 5rpx;
        font-size: 21rpx;
        font-family: FZLanTingHeiS-H-GB;
        font-weight: 400;
        color: #2C2C2C;
        margin: 0 auto;
        margin-top: 11rpx;
    }

    .tips {
        font-size: 17rpx;
        font-family: FZLanTingHeiS-R-GB;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 10rpx;
        text-align: center;
    }
}

.modal {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    // top: 380rpx;
    z-index: 889;
    background-color: #fff;
    transition: all 0.3s;
    transform: scale(0);
    border-radius: 3rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
}

.modal_show {
    transform: scale(1)
}

.exchangeModal {
    width: 479rpx;
    // height: 450rpx;
    // padding: 30rpx 50rpx 50rpx 50rpx;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-weight: bold;
        font-size: 36rpx;
        // text-stroke: 2rpx #2173FF;
        // -webkit-text-stroke: 2rpx #2173FF;
    }

    .text {
        margin-bottom: 8rpx;
        font-size: 29rpx;
        font-family: FZLanTingHeiS-H-GB;
        font-weight: 400;
        color: #FFFFFF;
    }

    .coupon {
        width: 441rpx;
        height: 384rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/modalC1.png");
        margin-bottom: 24rpx;
    }

    .coupon3 {
        background-image: url("@/static/act/dewu/modalC3.png");
    }

}

.exchangeModalButton {
    // width: 100%;
    background-size: 100% 100%;
    background-image: url("@/static/act/dewu/submit.png");
    width: 480rpx;
    height: 114rpx;
    font-weight: bold;
    color: #fff;
    border-radius: 3rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2rpx;
    font-size: 30rpx;
    font-family: FZLanTingHeiS-H-GB;
}

.exchangeModalButtonRed {
    width: 480rpx;
    height: 114rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    background-image: url("@/static/act/dewu/redButton.png");
    color: #fff;
    font-size: 30rpx;
    letter-spacing: 2rpx;
    font-family: FZLanTingHeiS-H-GB;
}

.successModal {
    width: 540rpx;
    // height: 450rpx;
    padding: 30rpx 50rpx 50rpx 50rpx;
    background-color: rgba(0, 0, 0, 0);

    .title {
        font-weight: bold;
        // margin-top: 58rpx;
        // margin-bottom: 60rpx;
        font-size: 36rpx;
        font-family: FZLanTingHeiS-H-GB;
        font-weight: 400;
        letter-spacing: 2rpx;
        color: #FFFFFF;
    }

    .text {
        font-size: 24rpx;
        color: #fff;
        margin-top: 10rpx;
    }

    .wait {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        color: #fff;
        font-size: 32rpx;
        font-weight: bold;
        letter-spacing: 3rpx;
        bottom: -20rpx;
        text-align: center;
    }

    .coupon {
        width: 441rpx;
        height: 384rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/dewu/modalC1.png");
        margin-bottom: 24rpx;
    }

    .coupon3 {
        background-image: url("@/static/act/dewu/modalC3.png");
    }
}

.close {
    width: 64rpx;
    height: 64rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/dewu/close.png");
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: -80rpx;
}

.green {
    // background-color: #4dcdcc;
}</style>
