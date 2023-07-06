<template>
    <view class="content">
        <transitionNav :needIconShadow="false" :needRightTools="['分享']" ref="transitionNav" :title="userInfo.userName"
            :report="!isMine" @report="pageJump(`/pages/cardForum/report?byInformer=${userInfo.userId}&source=4`)">
        </transitionNav>
        <view class="userInfoWrap" id="userInfoWrap">
            <view class="fakeTop" :style="{ height: navHeight + 'px' }"></view>
            <view class="userInfo">
                <image class="userInfo_avatar" mode="aspectFill"
                    :src="userInfo.avatar ? $parsePic(decodeURIComponent(userInfo.avatar)) : defaultAvatar">
                </image>
                <view class="userInfo_msg">
                    <view class="userInfo_name">
                        <text class="userInfo_name_text">{{ userInfo.userName }}</text>
                        <text class="userInfo_name_title" v-if="userInfo.title">{{ userInfo.title }}</text>
                    </view>
                    <view class="userInfo_ip">
                        <text class="userInfo_ip_text">IP属地：{{ userInfo.location || '未知' }}</text>
                    </view>
                </view>
            </view>
            <view class="descWrap" v-if="userInfo.sign">
                <text class="desc_text">{{ userInfo.sign }}</text>
            </view>
            <view class="userDataWrap">
                <view class="userData_data">
                    <view class="userData_item">
                        <text class="userData_num">{{ userInfo.fans || 0 }}</text>
                        <text class="userData_name">粉丝</text>
                    </view>
                    <view class="userData_item">
                        <text class="userData_num">{{ userInfo.follow || 0 }}</text>
                        <text class="userData_name">关注</text>
                    </view>
                    <view class="userData_item">
                        <text class="userData_num">{{ userInfo.like || 0 }}</text>
                        <text class="userData_name">点赞/收藏</text>
                    </view>
                </view>
                <view class="flex1"></view>
                <!-- @click="onClickFollow" -->
                <text class="userData_follow" :class="{ userData_follow_dis: userInfo.isFollow }" v-if="!isMine">{{
                    userInfo.isFollow ? '已关注' :
                    '关注' }}</text>
                <text class="userData_edit" v-else @click="pageJump('/pages/userinfo/user_info_v3')">编辑资料</text>
            </view>
        </view>
        <div style="background-color: #fff;" id="tabs" class="tabsWrap" ref="tabsWrap">
            <u-tabs customType="cardForum" style="width:750rpx"
                :activeStyle="{ color: '#333333', fontSize: '33rpx', fontWeight: 'bold', fontFamily: 'PingFang SC' }"
                :inactiveStyle="{ color: '#959695', fontSize: '27rpx', fontFamily: 'PingFang SC' }" class="tabs"
                :current="tabs.index" @click="tabClick" :list="tabs.list" ref="tabs"></u-tabs>
        </div>
        <waterfalls style="width: 750rpx;" :viewUserId="userId" ref="waterfall" :showBottom="current.name != '中卡'"
            :detailBack="true" :isMine="isMine" :showUser="false" :value="tabs.list[tabs.index].list" :refresh="false"
            :showEmpty="!isMine">
            <template v-slot:list1>
                <view class="draftWrap" v-if="current.name == '动态' && draftListByDynamic.length"
                    @click="pageJump('/pages/cardForum/draftList')">
                    <image class="draftWrapImage" v-if="draftListByDynamic[0].data.cover"
                        :src="decodeURIComponent(draftListByDynamic[0].data.cover)" mode="aspectFill">
                    </image>
                    <view class="shadow">
                        <image class="caogaoIcon" src="@/static/cardForum/caogao_white.png"></image>
                        <text class="caogaoTitle">草稿箱</text>
                        <text class="caogaoText">有{{ draftListByDynamic.length }}篇动态待发布</text>
                    </view>
                </view>
            </template>
        </waterfalls>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import waterfalls from "./components/waterfalls.vue"
import { getDraftList, followActionByUser } from "./func"
const navHeight = app.statusBarHeight + uni.upx2px(88)
const mineTabs: any = [
    {
        name: '动态',
        url: "cardCircle/list/me/dongtai"
    },
    {
        name: '卡册',
        url: "cardCircle/list/me/kace"
    },
    {
        name: '收藏',
        url: "cardCircle/list/me/collect"
    },
    {
        name: '赞过',
        url: "cardCircle/list/me/like"
    },
    {
        name: '足迹',
        url: "cardCircle/list/me/track"
    }
]
const otherTabs: any = [
    {
        name: '动态',
        url: "cardCircle/list/user/dongtai/"
    },
    {
        name: '卡册',
        url: "cardCircle/list/user/kace/"
    },
    {
        name: '中卡',
        url: "cardCircle/user/hit/card/list/"
    },
]
const defaultTagObj = {
    isFetchEnd: false,
    firstReqEnd: false,
    queryParams: {
        fetchFrom: 1,
        fetchSize: 15,
        // pageSize: 10,//中卡才有效
        scrollId: "",//中卡才有效
        q: ""
    },
    list: []
}
@Component({
    components: {
        waterfalls
    }
})
export default class ClassName extends BaseNode {
    isMine: boolean = false
    userInfo: any = {}
    navHeight = navHeight
    defaultAvatar = app.defaultAvatar
    tabs: any = {
        index: 0,
        list: []
    }
    draftListByDynamic: any = []
    draftListByCardBook: any = []
    userId: number = 0
    onLoad(query: any) {
        if (query.tabIndex) this.tabs.index = +query.tabIndex
        this.userId = +query.userId
        this.isMine = query.isMine == "1" //后续解除注释
        this.getUserInfo()
        this.initTab()
    }
    onShow() {
        if (this.isMine) {
            this.draftListByDynamic = getDraftList("dynamic", this.userId)
            console.log("this.draftListByDynamicthis.draftListByDynamicthis.draftListByDynamic", this.draftListByDynamic);
            this.draftListByCardBook = getDraftList("cardBook", this.userId)
        }
        // this.listSetSpecialEffects(this.tabs.index)
        // this.$refs.goTopRef()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onReachBottom() {
        if (this.current.isFetchEnd) return
        this.current.queryParams.fetchFrom += this.current.queryParams.fetchSize
        this.reqData(false)
    }
    public get current() {
        return this.tabs.list[this.tabs.index]
    }

    initTab() {
        if (this.isMine) {
            let mineTabsDeep = uni.$u.deepClone(mineTabs);
            mineTabsDeep.forEach((item: any, index: number) => {
                this.$set(this.tabs.list, index, { ...uni.$u.deepClone(defaultTagObj), ...item })
            })
        } else {
            let tabsDeep = uni.$u.deepClone(otherTabs);
            tabsDeep.forEach((item: any, index: number) => {
                if (index <= 1 || (index == 2 && this.userInfo.pub_card)) {
                    this.$set(this.tabs.list, index, { ...uni.$u.deepClone(defaultTagObj), ...item })
                }
            })
        }
        this.reqData(false)
    }
    @Watch('tabs.index')
    onIndexChanged(val: number) {
        //@ts-ignore

        if (this.tabs.list[val]?.list && (this.tabs.list[val].list.length == 0)) {
            this.reqData(true)
        } else {
            const deepList = uni.$u.deepClone(this.tabs.list[val].list)
            this.tabs.list[val].list = []
            this.$nextTick(() => {
                this.tabs.list[val].list = deepList
            })
        }
    }
    pageJump(url: any) {
        uni.navigateTo({
            url: url
        })
    }
    tabClick(event: any) {
        if (event.index == this.tabs.index) return
        //@ts-ignore
        this.$refs.waterfall.clear();
        this.tabs.index = event.index
    }
    reqData(isRefresh = false, cb?: any) {
        app.http.Get(`dataApi/${this.current.url}${this.isMine ? "" : this.userId}`, this.current.queryParams, (res: any) => {
            const list = (res.list || []).map((item: any) => {
                if (this.current.name == '中卡') {
                    return {
                        cover: item.pic.split(",")[0],
                        title: item.name,
                        type: "中卡",
                        pic: item.pic
                    }
                }
                return item
            })
            this.current.firstReqEnd = true
            this.current.isFetchEnd = res.isFetchEnd
            if (res.scrollId) this.current.queryParams.scrollId = res.scrollId
            if (isRefresh) {
                //@ts-ignore
                this.$refs.waterfall.clear();
                this.current.list = []
            }
            this.current.list.push(...list)
            this.current.firstReqEnd = true
            cb && cb()
        }, (err: any) => {
            this.current.firstReqEnd = true
        })
    }
    getUserInfo() {
        const url = this.isMine ? `cardCircle/me/home` : `cardCircle/user/home`
        app.http.Get(`dataApi/${url}`, { userId: this.userId }, (res: any) => {
            this.userInfo = res.data
            // this.setDomHeight()

        }, () => {
            // this.setDomHeight()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.userInfoWrap {
    width: 750rpx;
    // height: 583rpx;
    // position: relative;
    flex-direction: column;
    align-items: center;
    display: flex;
    background-color: #333333;
    padding-bottom: 71rpx;
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
    flex: 1;
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
}

.userInfo_name {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.userInfo_name_text {
    font-size: 31rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
}

.userInfo_name_title {
    width: 114rpx;
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
}

.userInfo_ip_text {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
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
    width: 750rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 35rpx;
    margin-top: 60rpx;
    // justify-content: space-between;
}

.userData_item {
    // background-color: red;
    display: flex;
    flex-direction: column;
}

.userData_num {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
}

.userData_name {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
}

.userData_data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 400rpx;
}

.tabsWrap {
    width: 750rpx;
    height: 103rpx;
    justify-content: center;
    align-items: center;
}

.tabs {
    width: 500rpx;
    flex-direction: row;
    justify-content: center;
}

.flex1 {
    flex: 1;
}

.userData_follow {
    width: 140rpx;
    height: 62rpx;
    background: #FA1545;
    border-radius: 3rpx;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 62rpx;
}

.userData_follow_dis {
    background-color: #c9d0d7;
}

.userData_edit {
    width: 176rpx;
    height: 62rpx;
    background-color: rgba(0, 0, 0, 0.38);
    border: 1rpx solid #E6E6E6;
    border-radius: 3rpx;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 62rpx;
    color: #FFFFFF;
}

.draftWrap {
    width: 360rpx;
    height: 287rpx;
    position: relative;
    border-radius: 3rpx;
    margin-bottom: 10rpx;
    display: flex;
    
}

.draftWrapImage {
    position: absolute;
    width: 360rpx;
    height: 277rpx;
    left: 0;
    top: 0;
    border-radius: 3rpx;
}

.shadow {
    position: absolute;
    width: 360rpx;
    height: 277rpx;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    align-items: center;
    display: flex;
    flex-direction: column;
}

.caogaoIcon {
    margin-top: 74rpx;
    width: 61rpx;
    height: 55rpx;
}

.caogaoTitle {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ECEFF6;
    margin-top: 17rpx;
    margin-bottom: 10rpx;
}

.caogaoText {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ECEFF6;
}
</style>
