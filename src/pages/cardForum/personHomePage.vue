<template>
    <view class="content">
        <transitionNav :needIconShadow="false" ref="transitionNav" :title="userInfo.userName" style="z-index: 999;" @navBackGroundShowChange="navBackGroundShowChange">
            <template slot="slotRight">
                <view :style="{color:topHasBack?'#333':'#fff'}" @click="app.navigateTo.goMedalIndex(userId)">{{isMine?"去勋章墙":"TA的勋章墙"}}</view>
            </template>
        </transitionNav>
        <view class="userInfoWrap" @click="menuShow = isMine">
            <image :src="$parsePic(userInfo.back_pic)" class="userBack" v-if="userInfo.back_pic"
                mode="aspectFill"></image>
            <image v-else src="@/static/userinfo/v3/banner.png" class="userBack" mode="aspectFill"></image>
            <view class="back_shadow"></view>
            <view class="userinfo-box">
                <view class="userinfo-header">
                    <view class="avatar_name">
                        <image class="userInfo_avatar" mode="aspectFill"
                            :src="userInfo.avatar ? $parsePic(userInfo.avatar) : defaultAvatar">
                        </image>
                        <view class="userInfo_name">
                            <text class="userInfo_name_text">{{ userInfo.userName }}</text>
                            <image :style="userInfo.level == 10 ? { height: `29rpx`, width: `58rpx` } : {}"
                                @click.stop="isMine?pageJump(`/pages/userinfo/level/index`):()=>{}" class="level"
                                :src="`/static/userinfo/v3/level/${userInfo.level || 1}.png`"></image>
                        </view>
                    </view>
                    <view class="userData_follow" @click.stop="onClickUserFollow"
                    :class="{ userData_follow_dis: userInfo.isFollow }" v-if="!isMine">{{
                        userInfo.isFollow ? '已关注' : '关注' }}</view>
                    <view class="userData_follow_dis" v-else
                    @click.stop="pageJump('/pages/userinfo/user_info_v3')">修改资料</view>
                </view>
                <view class="userInfo_ip">
                    <view class="userInfo_ip_text">IP属地：{{ userInfo.location || '未知' }}</view>
                    <view class="userInfo_ip_text">卡迷号：{{ userInfo.userId }}</view>
                </view>
                <view class="desc_text u-line-2">{{ userInfo.sign || "暂无简介" }}</view>
                <view class="userData_data">
                    <view class="userData_item" @click.stop="onClickFollow">
                        <text class="userData_num">{{ userInfo.follow || 0 }}</text>
                        <text class="userData_name">关注</text>
                    </view>
                    <view class="userData_item" @click.stop="">
                        <text class="userData_num">{{ userInfo.fans || 0 }}</text>
                        <text class="userData_name">粉丝</text>
                    </view>
                    <view class="userData_item" @click.stop="">
                        <text class="userData_num">{{ userInfo.like || 0 }}</text>
                        <text class="userData_name">点赞/收藏</text>
                    </view>
                </view>
            </view>
        </view>
        <u-sticky :customNavHeight="navHeight">
            <div style="background-color: #fff;" id="tabs" class="tabsWrap" ref="tabsWrap">
                <u-tabs class="tabs" :list="tabs.list" :current="tabs.index" :lineColor="`url(${lineBg}) 100% 100%`" lineHeight="5rpx"  @click="tabClick" 	:itemStyle="{ width: (app.platform.systemInfo.screenWidth / 6) + 'px', height: '78rpx', padding: 0, marginTop: '6rpx' }"
                    :activeStyle="{ color: '#333333', fontSize: '32rpx', fontWeight: 'bold', fontFamily: 'PingFang SC' }"
                    :inactiveStyle="{ color: '#959695', fontSize: '26rpx', fontFamily: 'PingFang SC' }"
				></u-tabs>
            </div>
        </u-sticky>
        <waterfalls v-if="current" style="width: 750rpx;margin-top: 10rpx;" :viewUserId="userId" ref="waterfall"
            :showBottom="current.name != '中卡'" :detailBack="true" :isMine="isMine" :showUser="showUser"
            :value="tabs.list[tabs.index].list" :refresh="false" :showEmpty="!isMine" :isFetchEnd="current.isFetchEnd">
            <template slot="list1" v-if="current.name == '动态' && draftListByDynamic.length">
                <view class="draftWrap" @click="pageJump('/pages/cardForum/draftList?draftType=dynamic')">
                    <image class="draftWrapImage" v-if="draftListByDynamic[0].data.cover"
                        :src="decodeURIComponent(draftListByDynamic[0].data.cover)" mode="aspectFill">
                    </image>
                    <view class="shadow">
                        <image class="caogaoIcon" src="@/static/cardForum/caogao_white.png"></image>
                        <text class="caogaoTitle">草稿箱</text>
                        <text class="caogaoText">有{{
                            draftListByDynamic.length + (cloudDraftNumByDynamic > 0 ? cloudDraftNumByDynamic - 1 : 0)
                        }}篇动态待发布</text>
                    </view>
                </view>
            </template>
            <template slot="list1" v-else-if="current.name == '卡册' && draftListByCardBook.length">
                <view class="draftWrap" @click="pageJump('/pages/cardForum/draftList?draftType=cardBook')">
                    <image class="draftWrapImage" v-if="draftListByCardBook[0].data.cover"
                        :src="decodeURIComponent(draftListByCardBook[0].data.cover)" mode="aspectFill">
                    </image>
                    <div class="shadow">
                        <image class="caogaoIcon" src="@/static/cardForum/caogao_white.png"></image>
                        <text class="caogaoTitle">草稿箱</text>
                        <text class="caogaoText">有{{
                            draftListByCardBook.length + (cloudDraftNumByCardBook > 0 ? cloudDraftNumByCardBook - 1 : 0)
                        }}篇卡册待发布</text>
                    </div>
                </view>
            </template>
        </waterfalls>
        <forumEmpty style="margin-top: 20rpx;" type="forum" v-if="showEmpty" @onClickButton="app.navigateTo.switchTab(2)"
            :showButton="isMine" :tips="isMine ? `您还没有创建${current.name}哦～` : `TA还没有创建${current.name}}哦～`">
        </forumEmpty>
        <u-action-sheet :safeAreaInsetBottom="true" @select="onSelect" cancelText="取消" @close="menuShow = false"
            :actions="menuList" :show="menuShow"></u-action-sheet>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import waterfalls from "./components/waterfalls.vue"
import { getDraftList, followActionByUser } from "./func"
import Upload from "@/tools/upload"
import forumEmpty from "./components/empty.vue"
const navHeight = app.statusBarHeight + uni.upx2px(88)
const lineBg = "/static/medal/tab_line.png";
const mineTabs: any = [
    {
        name: '动态',
        url: "cardCircle/list/me/dongtai"
    },
    {
        name: '卡册',
        url: "cardCircle/list/me/album"
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
        waterfalls,
        forumEmpty
    }
})
export default class ClassName extends BaseNode {
    app = app
    lineBg = lineBg;
    menuShow: boolean = false
    menuList: any = [{ name: '从相册中选择', id: 1 }]
    isMine: boolean = false
    userInfo: any = {}
    navHeight = navHeight
    defaultAvatar = app.defaultAvatar
    tabs: any = {
        index: 0,
        list: []
    }
    shareData: any = {}
    draftListByDynamic: any = []
    draftListByCardBook: any = []
    cloudDraft: any = []
    cloudDraftNumByDynamic: number = 0
    cloudDraftNumByCardBook: number = 0
    userId: number = 0
    topHasBack=false
    onLoad(query: any) {
        if (query.tabIndex) this.tabs.index = +query.tabIndex
        this.userId = +query.userId
        this.isMine = query.isMine == "1" //后续解除注释
        if(query.isMine===undefined){
            app.user.getAppDataUserId().then((res:any)=>{
				this.isMine = this.userId == res;
			});
        }
        if (this.isMine) {
            this.draftListByDynamic = getDraftList("dynamic", this.isMine ? app.data.userId : this.userId)
            this.draftListByCardBook = getDraftList("cardBook", this.isMine ? app.data.userId : this.userId)
            uni.$on("refreshDraft", this.refreshDraft)
            uni.$on("finishSign", this.finishSign)
        }
        this.getUserInfo()
    }
    beforeDestroy() {
        if (this.isMine) {
            uni.$off("refreshDraft", this.refreshDraft)
            uni.$off("finishSign", this.finishSign)
        }
    }
    // onShow() {

    // }
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
    public get showEmpty() {
        if (!this.isMine) return false
        if (!this.current) return false
        if (this.current.name == "动态" || this.current.name == "卡册") {
            if (this.current.name == "动态") {
                return !this.current.list.length && !this.draftListByDynamic.length
            }
            if (this.current.name == "卡册") {
                return !this.current.list.length && !this.draftListByCardBook.length
            }
        }
        return false
    }
    public get showUser(){
        if (!this.current) return false
        if (this.current.name=="动态" || this.current.name=="卡册") return false
        return true
    }
    navBackGroundShowChange(event: any) {
        this.topHasBack = event
    }
    refreshDraft() {
        this.draftListByDynamic = getDraftList("dynamic", this.userId)
        this.draftListByCardBook = getDraftList("cardBook", this.userId)
        this.sortDraft(true)
    }
    finishSign(res: any) {
        this.userInfo.sign = res.sign
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
        this.$nextTick(() => {
            this.reqData(false)
        })
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
    onClickFollow() {
        if (!this.isMine) return
        this.pageJump(`/pages/userinfo/user_follow`)
    }
    tabClick(event: any) {
        if (event.index == this.tabs.index) return
        //@ts-ignore
        this.$refs.waterfall.clear();
        this.tabs.index = event.index
    }
    onClickUserFollow() {
        followActionByUser(this.userId, this.userInfo.isFollow).then(() => {
            this.userInfo.isFollow = !this.userInfo.isFollow;
            this.userInfo.fans += this.userInfo.isFollow ? 1 : -1;
        })
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
                return { ...item, typeName: this.current.name }
            })
            if (this.isMine && this.current.queryParams.fetchFrom == 1 && this.current.name == '动态') {
                this.sortDraftFunc(res, "draftListByDynamic")
            }
            if (this.isMine && this.current.queryParams.fetchFrom == 1 && this.current.name == '卡册') {
                this.sortDraftFunc(res, "draftListByCardBook")
            }
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
    async onSelect(event: any) {
        // console.log(event);
        if (event.id == 1) {
            const picArr: any = await Upload.getInstance().uploadSocialImgs(1, "userCover/", ["album"])
            if (picArr.length) {
                app.http.Post("cardCircle/edit/backPic", { back_pic: picArr[0] }, (res: any) => {
                    uni.showToast({
                        title: res.msg,
                        icon: 'none'
                    })
                })
            }
        }
    }
    sortDraft(get?: boolean) {
        app.http.Get(`dataApi/cardCircle/list/me/dongtai`, {}, (res: any) => {
            this.sortDraftFunc(res, "draftListByDynamic")
        })
    }
    sortDraftFunc(res: any, key: string) {
        if (res.draftBrier) {
            //@ts-ignore
            const findIndex = this[key].findIndex((item: any) => {
                return item.draftId == res.draftBrier.code
            })
            if (findIndex < 0) {
                if (key == 'draftListByDynamic') this.cloudDraftNumByDynamic = res.draftBrier.num
                if (key == "draftListByCardBook") this.cloudDraftNumByCardBook = res.draftBrier.num
                //@ts-ignore
                this[key] = [...this[key], {
                    stamp: res.draftBrier.created_at, data: {
                        cover: res.draftBrier.cover
                    }
                }].sort((x: any, y: any) => {
                    return y.stamp - x.stamp
                })
            }

        }
    }
    onDelCardForum() {
        this.current.queryParams.fetchFrom = 1
        this.reqData(true)
    }
    getUserInfo() {
        const url = this.isMine ? `cardCircle/me/home` : `cardCircle/user/home`
        app.http.Get(`dataApi/${url}`, this.isMine ? {} : { userId: this.userId }, (res: any) => {
            this.userInfo = res.data
            this.shareData = {
                shareUrl: `share/${app.localTest ? 'testH5' : 'h5'}/#/pages/cardForum/personHomePage?userId=${this.userId}`,
                title: `${res.data.userName} 在卡世界APP,快点开来看看吧！`,
                summary: res.data.sign || "",
                //@ts-ignore
                thumb: this.$parsePic(res.data.avatar) + `?x-oss-process=image/resize,h_100,w_100`
            }
            this.initTab()
        }, () => {
        })
    }

}
</script>

<style lang="scss">
@mixin fontSfTR($fontSize) {
    color: #fff;
    font-size: $fontSize;
    text-align: center;
}
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
    // background-color: #333333;
    position: relative;
    // background-size: 100% 100%;
}

.userBack {
    width: 750rpx;
    height: 415rpx;
}

.back_shadow {
    width: 750rpx;
    position: absolute;
    height: 415rpx;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.39)
}
.userinfo-box{
    width: 100%;
    box-sizing: border-box;
    padding: 0 35rpx;
    background:#fff;
    .userinfo-header{
        width: 100%;
        height:100rpx;
        box-sizing: border-box;
        padding-top: 30rpx;
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .userInfo_avatar{
        width: 121rpx;
        height:121rpx;
        border-radius: 50%;
        position: absolute;
        top:-42rpx;
        left:0;
    }
    .userInfo_name{
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-left:145rpx;
        .userInfo_name_text{
            @include fontSfTR(30rpx);
            color:#333333;
        }
    }
    .level {
        width: 50.37rpx;
        height: 23rpx;
        margin-left: 12rpx;
    }
    .userData_follow{
        width: 133rpx;
        height: 49rpx;
        background: #FA1545;
        border-radius: 3rpx;
        @include fontSfTR(22rpx);
        line-height: 49rpx;
    }
    .userData_follow_dis{
        width: 133rpx;
        height: 49rpx;
        border-radius: 3rpx;
        background: none;
        border: 0.8px solid #E6E6E6;
        @include fontSfTR(22rpx);
        color:#606060;
        line-height: 49rpx;
    }

    .userInfo_ip{
        width: 100%;
        height:40rpx;
        .userInfo_ip_text{
            display: inline-flex;
            height:40rpx;
            line-height: 40rpx;
            @include fontSfTR(18rpx);
            color:#8D8D8D;
            text-align: center;
            box-sizing: border-box;
            padding:0 11rpx;
            margin-right: 26rpx;
            background: #F3F5F6;
            border-radius: 3rpx;
        }
    }
    .desc_text{
        width: 100%;
        @include fontSfTR(22rpx);
        color:#333;
        line-height: 32rpx;
        text-align: left;
        margin-top: 22rpx;
    }
    .userData_data{
        width: 100%;
        display: flex;
        margin-top: 20rpx;
        .userData_item{
            margin-right: 41rpx
        }
        .userData_num{
            @include fontSfTR(24rpx);
            color:#333333;
            font-weight: bold;
            margin-right: 10rpx;
        }
        .userData_name{
            @include fontSfTR(24rpx);
            color:#8D8D8D;
        }
    }
}
// .userInfoWrap_back {
//     background-size: 100% 100%;
//     background-image: url("@/static/userinfo/v3/banner.png");
// }

.fixImg {
    position: fixed;
    width: 750rpx;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
}

.tabsWrap {
    width: 750rpx;
    height: 93rpx;
    justify-content: center;
    align-items: center;
}

.tabs {
    // width: 500rpx;
    // flex-direction: row;
    // justify-content: center;
}

.flex1 {
    flex: 1;
}

.draftWrap {
    width: 360rpx;
    height: 287rpx;
    position: relative;
    border-radius: 5rpx;
    margin-bottom: 10rpx;
    display: flex;
    overflow: hidden;

}

.draftWrapImage {
    position: absolute;
    width: 360rpx;
    height: 277rpx;
    left: 0;
    top: 0;
    border-radius: 5rpx;
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
    border-radius: 5rpx;
    flex-direction: column;
}

.caogaoIcon {
    margin-top: 74rpx;
    width: 61rpx;
    height: 55rpx;
}

.caogaoTitle {
    font-size: 25rpx;
    
    font-weight: bold;
    color: #ECEFF6;
    margin-top: 17rpx;
    margin-bottom: 10rpx;
}

.caogaoText {
    font-size: 21rpx;
    
    
    color: #ECEFF6;
}
</style>
