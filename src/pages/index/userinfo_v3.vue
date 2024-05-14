<template>
    <view class="content">
        <transitionNav   :showBack="false" @navigateTo="navigateTo(`/pages/userinfo/setting`)" title=""
            :needRightTools="['设置']" :needIconShadow="false" :toolsMapCustomNew="toolsMapCustomNew"></transitionNav>
        <view class="userInfoWrap" id="userInfoWrap">
            <view class="fakeTop" :style="{ height: navHeight + 'px' }"></view>
            <view class="userInfo"
                @click="navigateTo(`/pages/cardForum/personHomePage?isMine=1&userId=${infoData.userId}`)">
                <image class="userInfo_avatar" mode="aspectFill"
                    :src="infoData.avatar ? $parsePic(infoData.avatar) : defaultAvatar">
                </image>
                <view class="userInfo_msg">
                    <view class="userInfo_name">
                        <text class="userInfo_name_text">{{ infoData.name }}</text>
                        <image :style="infoData.level == 10 ? { height: `29rpx`, width: `58rpx` } : {}"
                            @click.stop="navigateTo(`/pages/userinfo/level/index`)" class="level"
                            :src="`/static/userinfo/v3/level/${infoData.level || 1}.png`"></image>
                        <!-- <view class="userInfo_name_title" @click.stop="navigateTo(`/pages/userinfo/level`)">{{
                            infoData.title || "大藏家" }}</view> -->
                    </view>
                    <view class="userInfo_ip">
                        <text class="userInfo_ip_text">IP属地：{{ infoData.location || '未知' }}</text>
                        <text class="userInfo_ip_text" style="margin-left: 10rpx;">| 卡迷号：{{ infoData.userId }}</text>
                    </view>
                </view>
            </view>
            <view class="descWrap">
                <text class="desc_text u-line-2">{{ infoData.sign || "暂无简介" }}</text>
            </view>
            <view class="userDataWrap">
                <view class="userData_data">
                    <view class="userData_item"
                        @click="navigateTo(`/pages/cardForum/personHomePage?isMine=1&userId=${infoData.userId}`)">
                        <text class="userData_num">{{ formatNumber(infoData.dtNum || 0, 1) }}</text>
                        <text class="userData_name">动态</text>
                    </view>
                    <view class="userData_item">
                        <text class="userData_num">{{ formatNumber(infoData.fans || 0, 1) }}</text>
                        <text class="userData_name">粉丝</text>
                    </view>
                    <view class="userData_item" @click="navigateTo(`/pages/userinfo/user_follow`)">
                        <text class="userData_num">{{ formatNumber(infoData.follows || 0, 1) }}</text>
                        <text class="userData_name">关注</text>
                    </view>
                    <view class="userData_item"
                        @click="navigateTo(`/pages/cardForum/personHomePage?isMine=1&userId=${infoData.userId}&tabIndex=${2}`)">
                        <text class="userData_num">{{ formatNumber((infoData.like || 0) + (infoData.favorite || 0), 1)
                        }}</text>
                        <text class="userData_name">点赞/收藏</text>
                    </view>
                </view>
                <!-- <view class="flex1"></view>
                <text class="userData_follow">关注</text> -->
            </view>
        </view>
        <view class="publicContainer uni-flex jb fp">
            <view class="menuItem" v-for="(item, key) in walletTab" :key="`wallet_${key}`" @click="onClickFourTool(item)">
                <image class="icon" :src="item.pic" :style="item.style"></image>
                <view class="label">{{ item.name }}</view>
                <view class="num" v-if="key != 'kami'">{{ item.num }}</view>
                <view class="num" v-else>前往</view>
                <view class="rightIcon"></view>
            </view>
        </view>
        <view class="publicContainer orderContainer">
            <view class="order_topWrap alc" @click="onClickOrderList(0)">
                <view class="wrapTitle flex1">我的订单</view>
                <view class="title_tip" style="color: #C0C0C0;">全部</view>
                <view class="rightIcon"></view>
            </view>
            <view class="order_menuWrap uni-flex">
                <view class="order_item" v-for="(item, index) in orderTab" :key="`order_${index}`" @click="onClickOrderList(item.id)">
                    <image class="order_item_img" :src="item.pic"></image>
                    <view class="order_item_label">{{ item.name }}</view>
                    <!-- <u-badge :type="type" max="99" :value="value"></u-badge> -->
                    <view v-if="item.num > 0 && item.name != '已完成'" class="icon-yuan"
                        :class="item.num >= 10 ? 'icon-yuans' : ''">
                        {{ item.num > 99 ? '99+' : item.num }}</view>
                </view>
            </view>
        </view>
        <view class="publicContainer moreToolsContainer">
            <view class="wrapTitle flex1" style="margin-bottom: 36rpx;">更多功能</view>
            <view class="moreToolsWrap uni-flex fp">
                <view class="toolsItem" v-for="(item, index) in toolsTab.slice(0, 5)" :key="`tools1_${index}`" @click="onClickMoreTools(item)">
                    <view class="imageWrap">
                        <image class="toolsItem_icon" :src="item.icon" :style="item.style"></image>
                    </view>
                    <view class="toolsItem_label" :class="{ cLabel: index != 0 && index != 4 }">{{ item.name }}</view>
                </view>
            </view>
            <view class="moreToolsWrap uni-flex fp">
                <view class="toolsItem" v-for="(item, index) in toolsTab.slice(5, 10)" :key="`tools2_${index}`" @click="onClickMoreTools(item)">
                    <view class="imageWrap">
                        <image class="toolsItem_icon" :src="item.icon" :style="item.style"></image>
                    </view>
                    <view class="toolsItem_label" :style="{ opacity: item.style.opacity }"
                        :class="{ cLabel: index != 0 && index != 4 }">{{ item.name }}</view>
                </view>
            </view>
        </view>
        <view class="publicContainer bottomToolsContainer">
            <!-- <view class="setting" v-if='infoData.merchantActor'
                @click="onClickNavigateto({ url: `/pages/merchant/core?alias=${infoData.merchantActor}&isMerchant=1` })">
                <view class="name">
                    <image class="setting-icon" src="../../static/userinfo/v2/liveCamera.png" />

                </view>

            </view> -->
            <view class="toolsItem" v-if='infoData.merchantActor'
                @click="onClickNavigateto({ url: `/pages/merchant/core?alias=${infoData.merchantActor}&isMerchant=1` })">
                <view class="imgWrap">
                    <image src="../../static/userinfo/v2/liveCamera.png"></image>
                </view>
                <view class="toolsItem_label">商家主页</view>
                <view class="rightIcon"></view>
            </view>
            <view class="toolsItem" v-for="(item, index) in settingTab" :key="`setting_${index}`" @click="onClickNavigateto(item)">
                <view class="imgWrap">
                    <image :src="item.pic" :style="{ width: `${item.width}rpx`, height: `${item.height}rpx` }"></image>
                </view>
                <view class="toolsItem_label">{{ item.name }}</view>
                <view class="rightIcon"></view>
            </view>
            <view class="toolsItem" v-if='infoData.merchantActor'
                @click="onClickNavigateto({ url: `/pages/merchant/guide` })">
                <view class="imgWrap">
                    <image src="../../static/userinfo/v2/guide.png"></image>
                </view>
                <view class="toolsItem_label">商家指南</view>
                <view class="rightIcon"></view>
            </view>
            <navigator v-if="invoice.open" url="/pages/userinfo/invoice/index" hover-class="none">
                <view class="toolsItem">
                    <view class="imgWrap">
                        <image src="../../static/userinfo/v2/icon_b_invoice.png"></image>
                    </view>
                    <view class="toolsItem_label">开票入口</view>
                    <view class="rightIcon"></view>
                </view>
            </navigator>
        </view>
        <paymentSuccess :showPaySuccess.sync="showPaySuccess" :showJoin="true" />
        <medalPopup :show.sync="medalPopupData.show" :newMedalList="medalPopupData.list"/>
    </view>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseNode from '../../base/BaseNode.vue';
import { formatNumber } from "@/tools/util"
import { app } from "@/app";
import medalPopup from "./component/index/medalPopup.vue"
let toolsMap = {
    "设置": {
        action: "",
        emitAction: "navigateTo",
        icon: "/static/userinfo/v2/icon_setting.png",
        icon_black: "/static/userinfo/v2/icon_setting.png",
        style: {
            width: "42rpx",
            height: "42rpx",
        }

    }
}
@Component({
    components:{medalPopup}
})
export default class ClassName extends BaseNode {
    formatNumber = formatNumber
    toolsMapCustomNew = toolsMap
    infoData: { [x: string]: any } = [];
    defaultAvatar = app.defaultAvatar;
    broadcastActor = app.broadcastActor;
    headerTab: { [x: string]: any } = {
        follows: { id: 1, name: '关注', num: 0, url: '/pages/userinfo/user_follow' },
        favorite: { id: 2, name: '收藏', num: 0, url: '/pages/userinfo/user_collect' },
        // cabinetCard:{id:3,name:'寄存柜',num:0,url:'/pages/userinfo/locker/fancy'}
    };
    walletTab: { [x: string]: any } = {
        point: { id: 1, name: '卡币', num: 0, pic: '../../static/userinfo/v3/kb.png', url: '/pages/mall/mallIndex', style: { width: "32rpx", height: "32rpx" } },
        coupon: { id: 2, name: '优惠券', num: 0, pic: '../../static/userinfo/v3/coupon.png', url: '/pages/userinfo/coupon/coupon', style: { width: "32rpx", height: "26rpx" } },
        hitNo: { id: 3, name: '我的卡片', num: 0, pic: '../../static/userinfo/v3/hitNo.png', url: '/pages/userinfo/winningCard/index', style: { width: "28rpx", height: "30rpx" } },
        kami: { id: 4, name: '收赠卡密', num: 0, pic: '../../static/userinfo/v3/give.png', url: '/pages/userinfo/giving/index', style: { width: "30rpx", height: "30rpx" } }
    }
    orderTab: { [x: string]: any } = {
        toPay: { id: 1, name: '待支付', num: 0, pic: "../../static/userinfo/v3/wait_pay.png" },
        go: { id: 2, name: '已付款', num: 0, pic: "../../static/userinfo/v3/finish_pay.png" },
        toDeliver: { id: 3, name: '待发货', num: 0, pic: "../../static/userinfo/v3/wait_delivery.png" },
        toTake: { id: 4, name: '待收货', num: 0, pic: "../../static/userinfo/v3/wait_receipt.png" },
        finish: { id: 5, name: '已完成', num: 0, pic: "../../static/userinfo/v3/finish.png" }
    };
    serviceTab: { [x: string]: any } = {
        coupon: { id: 1, name: '优惠券', url: '/pages/userinfo/coupon/coupon' },
        giving: { id: 2, name: '收赠卡密', url: '/pages/userinfo/giving/index', num: 0 },
        decompose: { id: 3, name: '卡片分解', url: '', tips: '暂未开放' },
        kefu: { id: 4, name: '联系客服' },
        address: { id: 5, name: '地址管理', url: '/pages/userinfo/setting_addresses' }
    };
    settingTab = [
        { id: 1, name: '加入群聊', url: '', pic: '../../static/userinfo/v3/talk.png', width: 36, height: 33 },
        { id: 2, name: '商家入驻', url: '/pages/userinfo/merchant_join', pic: '../../static/userinfo/v3/ruzhu.png', width: 32, height: 29 },
        { id: 3, name: '关于我们', url: '/pages/userinfo/about_us', pic: '../../static/userinfo/v3/about.png', width: 38, height: 33 },
        { id: 4, name: '用户协议', url: '/pages/userinfo/user_agreement', pic: '../../static/userinfo/v3/agreement.png', width: 28, height: 36 },
    ]
    toolsTab = [
        {
            name: '地址管理',
            url: "/pages/userinfo/setting_addresses",
            icon: "../../static/userinfo/v3/address.png",
            style: { width: '47rpx', height: '46rpx' }
        },

        {
            name: '客服',
            icon: "../../static/userinfo/v3/kefu.png",
            style: { width: '48rpx', height: '49rpx' }
        },
        {
            name: '收藏商品',
            url: "/pages/userinfo/user_collect",
            icon: "../../static/goods/v2/icon_collect.png",
            style: { width: '43rpx', height: '44rpx' }
        },
        {
            name: '卡册',
            icon: "../../static/userinfo/v3/kace.png",
            style: { width: '50rpx', height: '54rpx' }
        },
        {
            name: '查卡价',
            url: "/pages/act/service/ref",
            icon: "../../static/userinfo/v3/price.png",
            style: { width: '42rpx', height: '44rpx' }
        },
        {
            name: '发售日历',
            url: "/pages/act/calendar/list",
            icon: "../../static/userinfo/v3/rl.png",
            style: { width: '43rpx', height: '47rpx' }
        },
        {
            name: '领券中心',
            url: "/pages/userinfo/coupon/coupon_get",
            icon: "../../static/userinfo/v3/getCoupon.png",
            style: { width: '47rpx', height: '40rpx' }
        },
        {
            name: '占位占位',
            url: "",
            icon: "../../static/goods/v2/icon_collect.png",
            style: { width: '43rpx', height: '44rpx', opacity: 0 }
        },
        {
            name: '占位占位',
            url: "",
            icon: "../../static/goods/v2/icon_collect.png",
            style: { width: '43rpx', height: '44rpx', opacity: 0 }
        },
        {
            name: '占位占位',
            url: "",
            icon: "../../static/goods/v2/icon_collect.png",
            style: { width: '43rpx', height: '44rpx', opacity: 0 }
        }
        // ,
        // {
        //     name: '资讯公告',
        //     url: "/pages/information/list",
        //     icon: "../../static/userinfo/v3/address.png",
        //     style: { width: '47rpx', height: '46rpx' }
        // }
    ]
    showPaySuccess = false;
    invoice = {
        open: false,
        request: false
    }
    navHeight: number = app.statusBarHeight + uni.upx2px(88)
    userInfo: any = {}
    medalPopupData:any={
        show:false,
        list:[]
    }
    onLoad(query: any) {
        this.onEventUI('updateToken', () => {
            this.initPageData();
        })
    }
    onShow() {
        uni.showTabBar({ animation: false })
        this.initPageData();
        this.broadcastActor = app.broadcastActor
    }
    onHide() {
    }
    getNavHeight(height: any) {
        // this.navHeight = height
        // setTimeout(() => {
        //     this.$nextTick(async () => {
        //         this.topHeight = await this.getDomHeight("#topContainer")
        //         this.tabsHeight = await this.getDomHeight("#tabs")
        //         this.userInfoWrapHeight = await this.getDomHeight("#userInfoWrap")
        //         // #ifdef APP_PLUS
        //         this.scrollViewHeight = app.platform.systemInfo.screenHeight - this.navHeight - this.tabsHeight
        //         // #endif
        //         // this.getUserInfo()
        //         this.initTab()
        //     })
        // }, 100)


    }
    initPageData(cb?: Function) {
        if (app.token.accessToken == '') {
            app.login.arouseLogin("/pages/index/userinfo_v3")
            return;
        }
        app.http.Get('me/home', {}, (res: any) => {
            const data = res.data;
            if (this.infoData.avatar != data.avatar || this.infoData.name != data.name) app.user.needRefresh = true
            this.infoData = data;
            app.familial = data.familial;
            this.$set(this.infoData, 'avatar', decodeURIComponent(res.data.avatar));
            this.$set(this.serviceTab.giving, 'num', res.data.unReadGoodNo);
            for (const key in data) {
                if (this.walletTab.hasOwnProperty(key)) {
                    this.walletTab[key].num = data[key];
                }
                if (this.orderTab.hasOwnProperty(key)) {
                    this.orderTab[key].num = key == 'toPay' ? data[key].num : data[key];
                }
                if (this.headerTab.hasOwnProperty(key)) {
                    this.headerTab[key].num = data[key];
                }
            }
            if (!data.toPay) {
                this.orderTab['toPay'].num = 0
            }
            if (!this.invoice.request) {
                app.http.Post('me/invoice/ask/open', {}, (res: any) => {
                    this.invoice.request = true;
                    this.invoice.open = res.open
                })
            }
            // 勋章
            if(data.newMedalList){
                this.medalPopupData = {
                    show:true,
                    list:data.newMedalList
                };	
            }
            
            if (cb) cb()
        });
    }
    onClickNavigateto(item: any) {
        if (item.name == '加入群聊') {
            this.showPaySuccess = true
        } else {
            this.navigateTo(item.url)
        }
    }
    onClickMoreTools(item: any) {
        if (item.name == '客服') {
            app.platform.heliService({ agentExten: '' })
            return
        }
        if (item.name == "卡册") {
            uni.setStorageSync('showKace', true);
            app.navigateTo.switchTab(2)
            return;
        }
        if (item.url) {
            this.navigateTo(item.url)
            return
        }
    }
    navigateTo(url: string) {
        uni.navigateTo({ url: url });
    }
    onClickOrderList(id: number) {
        this.navigateTo(`/pages/userinfo/order_list?type=${id}`)
    }
    onClickFourTool(item: any) {
        if (item.url) {
            this.navigateTo(item.url)
            return
        }
    }
    onClickOrderListMp(item: any) {
        this.navigateTo(`/pages/userinfo/order_list?type=${this.orderTab[item].id}`)
    }
    onClickServiceTab(item: any) {
        if (item.name == '联系客服') {
            let params = { agentExten: '' }
            app.platform.heliService(params)
        }
        if (item.url != '') {
            this.navigateTo(item.url)
        } else {
            uni.showToast({
                title: item.tips,
                icon: 'none'
            })
        }
    }

}
</script>

<style lang="scss">
page {
    background: $content-bg
}

.cLabel {
    width: 110rpx;
    text-align: center;
}

.userInfoWrap {
    width: 750rpx;
    // height: 583rpx;
    // position: relative;
    flex-direction: column;
    align-items: center;
    display: flex;
    // height: 541rpx;
    background-size: 100% 100%;
    background-image: url("@/static/userinfo/v3/banner.png");
    // background-color: #333333;
    padding-bottom: 41rpx;
    margin-bottom: 20rpx;
}

.fixImg {
    position: fixed;
    width: 750rpx;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
}

.userInfo {
    z-index: 1;
    width: 750rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 35rpx;
    display: flex;
    flex-direction: row;
    margin-top: 24rpx;
    // flex: 1;
    // background-color: red;
}

.userInfo_avatar {
    width: 108rpx;
    height: 108rpx;
    border-radius: 50%;
    margin-right: 25rpx;
}

.stickyHeader {
    position: sticky;
    // top: 0;
    // background-color: #fff;
}

.userInfo_msg {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    display: flex;
    height: 108rpx;
}

.userInfo_name {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 6rpx;
    // margin-top: 16rpx;
    // margin-bottom: 4rpx;
}

.userInfo_name_text {
    font-size: 31rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
}

.level {
    width: 50.37rpx;
    height: 23rpx;
    margin-left: 12rpx;
}

.userInfo_name_title {
    // width: 114rpx;
    height: 33rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    font-size: 31rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    text-align: center;
    line-height: 33rpx;
    margin-left: 23rpx;
    padding: 0 26rpx;
}

.userInfo_ip_text {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #a5a5a5;
}

.descWrap {
    width: 750rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 35rpx;
    margin-top: 38rpx;
    // height: 70rpx;
}

.desc_text {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 34rpx;

}

.userDataWrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 750rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 35rpx;
    margin: 0 auto;
    margin-top: 60rpx;
    // justify-content: space-between;
}

.userData_item {
    // background-color: red;
    display: flex;
    flex-direction: column;
    // width: 25%;
}

.userData_num {
    font-size: 27rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
}

.userData_name {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #a5a5a5;
    text-align: center;
}

.userData_data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
}

.publicContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
    border-radius: 3rpx;
}

.jb {
    justify-content: space-between;
}

.fp {
    flex-wrap: wrap;
}

.alc {
    align-items: center;
}

.flex1 {
    flex: 1;
}

.menuItem {
    width: 350rpx;
    height: 92rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-bottom: 10rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 26rpx;

    .icon {
        // width: 39rpx;
        // height: 39rpx;
        // background: #FA1545;
        // border-radius: 50%;
        margin-right: 18rpx;
    }

    .label {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        flex: 1;
    }

    .num {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
    }


}

.rightIcon {
    width: 10rpx;
    height: 20rpx;
    margin-left: 12rpx;
    background-size: 100% 100%;
    background-image: url("@/static/userinfo/v3/righrIcon.png");
}

.orderContainer {
    height: 221rpx;
    padding: 0 29rpx;
    padding-top: 32rpx;
    background-color: #ffffff;
    border-radius: 3rpx;
    width: 710rpx;
    margin-top: 10rpx;

    // padding-bottom: 48rpx;
    .order_topWrap {
        display: flex;

        .title {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
        }

        .title_tip {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #E6E6E6;
        }
    }

    .order_menuWrap {
        // padding: 0 22rpx;
        justify-content: space-between;
        margin-top: 37rpx;

        .order_item {
            display: flex;
            align-items: center;
            flex-direction: column;
            position: relative;

            &_img {
                width: 43rpx;
                height: 38rpx;
            }

            &_label {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-top: 14rpx;
            }
        }
    }
}

.wrapTitle {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}

.moreToolsContainer {
    width: 710rpx;
    // height: 407rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 0 29rpx;
    padding-top: 32rpx;
    padding-bottom: 44rpx;
    margin-top: 20rpx;
    height: 437rpx;

    .moreToolsWrap {
        // padding: 0 18rpx;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;

        .toolsItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 70rpx;

            .imageWrap {
                width: 66rpx;
                height: 56rpx;
                display: flex;
                justify-content: center;
            }

            // margin-right: 20rpx;
            &_icon {
                // width: 66rpx;
                // height: 66rpx;
                // background: #FA1545;
                // border-radius: 50%;
            }

            &_label {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-top: 15rpx;
            }
        }
    }
}

.bottomToolsContainer {
    width: 710rpx;
    // height: 363px;
    background: #FFFFFF;
    border-radius: 3rpx;
    padding: 0 32rpx;
    padding-top: 40rpx;
    margin-top: 19rpx;
    margin-bottom: 33rpx;

    .toolsItem {
        display: flex;
        align-items: center;
        margin-bottom: 50rpx;

        // justify-content: center;
        .imgWrap {
            width: 50rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20rpx;

            image {
                width: 36rpx;
                height: 36rpx;
            }
        }



        &_label {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            flex: 1;
        }
    }
}

.icon-right {
    width: 12rpx;
    height: 18rpx;
    background: url(../../static/userinfo/v2/icon_right_gray.png) no-repeat center;
    background-size: 100% 100%;
    margin-left: 14rpx;
}

.user-header {
    width: 750rpx;
    height: 396rpx;
    background: url(@/static/userinfo/bg.png) no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 112rpx;

    .header-top {
        width: 100%;
        height: 42rpx;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
        justify-content: space-between;
        margin-bottom: 47rpx;

        .header-top-left {
            height: 42rpx;
            display: flex;
            align-items: center;
            font-size: 33rpx;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #FFFFFF;
        }

        .header-icon-right {
            width: 17rpx;
            height: 27rpx;
            background: url(../../static/userinfo/v2/icon_right.png) no-repeat center;
            background-size: 100% 100%;
            margin-left: 20rpx;
        }

        .header-top-right {
            height: 42rpx;
            display: flex;
            align-items: center;

            .icon-setting {
                width: 42rpx;
                height: 42rpx;
                background: url(../../static/userinfo/v2/icon_setting.png) no-repeat center;
                background-size: 100% 100%;
                margin-right: 40rpx;
            }

            .icon-xiaoxi {
                width: 39rpx;
                height: 42rpx;
                background: url(../../static/userinfo/v2/icon_message.png) no-repeat center;
                background-size: 100% 100%;
                position: relative;

                .xiaoxi-num {
                    width: 32rpx;
                    height: 32rpx;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20rpx;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FB4E3E;
                    background: #FFFFFF;
                    position: absolute;
                    right: -10rpx;
                    top: -10rpx;
                }
            }
        }
    }

    .header-center {
        width: 100%;
        height: 145rpx;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 30rpx;

        .avatar-border {
            width: 146rpx;
            height: 146rpx;
            border: 2px solid #BBBBBB;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 50rpx;
        }

        .user-avatar {
            width: 125rpx;
            height: 125rpx;
            border-radius: 50%;
        }

        .header-tab-box {
            height: 80rpx;
            box-sizing: border-box;
            display: flex;
        }

        .header-tab-index {
            height: 80rpx;
            margin-right: 80rpx;
        }

        .header-tab-index-num {
            font-size: 33rpx;
            font-family: PingFangSC-Medium;
            font-weight: bold;
            color: #FFFFFF;
            margin-bottom: 10rpx;
            text-align: center;
        }

        .header-tab-index-name {
            font-size: 27rpx;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #FFD2D9;
        }
    }
}

.user-v2-box {
    width: 100%;
    box-sizing: border-box;
    padding: 13rpx;
    background: $content-bg;
}

.user-v2-langtab {
    width: 100%;
    height: 91rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-v2-langtab-index {
        width: 356rpx;
        height: 91rpx;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 26rpx;

        .langtab-left {
            height: 63rpx;
            display: flex;
            align-items: center;
            font-size: 29rpx;
            font-family: PingFangSC-Medium;
            font-weight: 600;
            color: #333333;

            .langtab-left-pic {
                width: 63rpx;
                height: 63rpx;
                margin-right: 22rpx;
            }
        }

        .langtab-right {
            height: 63rpx;
            display: flex;
            align-items: center;
            font-size: 25rpx;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #333333;

        }
    }
}

.user-order {
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 35rpx 22rpx;
    margin-top: 13rpx;

    .header {
        width: 100%;
        height: 40rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30rpx;

        .title {
            height: 40rpx;
            line-height: 40rpx;
            font-size: 31rpx;
            font-family: PingFangSC-Regular;
            font-weight: 600;
            color: #333333;
        }

        .right {
            height: 40rpx;
            display: flex;
            align-items: center;
            font-size: 25rpx;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #88878C;

        }
    }

    .tab-content {
        width: 100%;
        height: 84rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .tab {
            width: 100rpx;
            height: 84rpx;
            box-sizing: border-box;
            position: relative;

            .icon-content {
                width: 100rpx;
                height: 50rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 12rpx;
            }

            .name {
                width: 100rpx;
                height: 32rpx;
                text-align: center;
                font-size: 23rpx;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: #333333;
            }

            .tab-icon {
                width: 45rpx;
                height: 45rpx;
            }
        }
    }

    .order-tip {
        width: 100%;
        height: 60rpx;
        background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        margin-top: 10rpx;

        .right {
            width: 10rpx;
            height: 16rpx;
            background: url(../../static/userinfo/jinru@2x.png) no-repeat center;
            background-size: 100% 100%;
            margin-left: 12rpx;
            margin-top: 2px;
        }
    }
}

.orther-setting {
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 40rpx 20rpx 1rpx 20rpx;
    margin-top: 14rpx;

    .setting {
        width: 100%;
        height: 36rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 46rpx;

        .name {
            height: 36rpx;
            display: flex;
            align-items: center;
            font-size: 27rpx;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #5B5B5B;

            .setting-icon {
                width: 45rpx;
                height: 45rpx;
                margin-right: 15rpx;
            }
        }
    }
}

.update-info-button {
    width: 200rpx;
    height: 100rpx;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    font-size: 30rpx;
    background: rgba(0, 0, 0, 0);
    margin: 0;
    justify-content: center;
}

.icon-yuan {
    width: 30rpx;
    height: 30rpx;
    line-height: 30rpx;
    text-align: center;
    background: #FF504F;
    border-radius: 40rpx;
    position: absolute;
    right: -14rpx;
    top: -10rpx;
    font-size: 20rpx;
    color: #fff;
    z-index: 10;
    border: 1px solid #fff;
    font-weight: bold;
}

.icon-yuans {
    padding: 0 6rpx
}
</style>
