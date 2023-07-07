<template>
    <view class="content">
        <transitionNav title=" " ref="transitionNav"></transitionNav>
        <div id="topContainer" style="flex-direction: column;align-items: center;display: flex;">
            <div style="flex-direction: column;align-items: center;display: flex;background-color: #fff">
                <div :style="{ height: navHeight + 'px' }"></div>
                <view class="topicsItem">
                    <image class="topicsItem_img" :src="decodeURIComponent(data.pic)">
                    </image>
                    <view class="rightInfo">
                        <view style="display: flex;flex-direction: row;">
                            <text class="topicsItem_title u-line-1" style="flex: 1;">#{{ data.name || "获取中" }}</text>
                            <text class="followButton" :class="{ followButton_dis: data.isFollow }"
                                @click="followTopicAction">{{ data.isFollow ? '已关注' : '关注' }}</text>
                        </view>
                        <view class="desc u-line-2">{{ data.intro }}</view>
                        <view class="flex1"></view>
                        <view class="bottomInfo">
                            <text class="num">{{ data.totalUseNum }}篇动态</text>
                        </view>
                    </view>
                </view>
                <view class="line"></view>
                <div style="background-color: #fff;height:100rpx" id="tabs">
                    <u-tabs customType="cardForum" @click="tabClick" :duration="300" :current="tabs.index"
                        :list="tabs.list"></u-tabs>
                </div>
                <div class="acWrap" id="acWrap" v-if="data.banner" @click="goToAct">
                    <image class="acImage" mode="aspectFill" :src="$parsePic(decodeURIComponent(data.banner))"></image>
                    <text class="iNeedPush" @click.stop="release">我要发布</text>
                </div>
            </div>

        </div>
        <waterfalls style="width: 750rpx;margin-top: 10rpx;" ref="waterfall" :showBottom="true" :detailBack="false"
            :isMine="false" :showUser="false" :value="tabs.list[tabs.index].list" :refresh="false" :showEmpty="true">
        </waterfalls>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { followTopic, releaseByTopic } from "../func"
import waterfalls from "../components/waterfalls.vue"
const navHeight = app.statusBarHeight + uni.upx2px(88)
const mineTabs = [
    {
        name: '热门',
        url: "cardCircle/list/me/dongtai",
        od: "hot"
    },
    {
        name: '最新',
        url: "cardCircle/list/me/kace",
        od: "fresh"
    }
]
const defaultTagObj = {
    isFetchEnd: false,
    firstReqEnd: false,
    queryParams: {
        fetchFrom: 1,
        fetchSize: 15,
        topicId: 0,
        scrollId: 0,
        st: 0,
        sn: ""
    },
    list: []
}
@Component({
    components: {
        waterfalls
    }
})
export default class ClassName extends BaseNode {
    navHeight = navHeight
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
    }
    list: any = []
    isFetchEnd: boolean = true
    id: number = 0
    data: any = {}
    tabs: any = {
        index: 0,
        list: []
    }
    public get current() {
        return this.tabs.list[this.tabs.index]
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
    onLoad(query: any) {
        this.id = +query.id
        this.reqNewData()
        this.initTab()
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    initTab() {
        let mineTabsDeep = uni.$u.deepClone(mineTabs);
        mineTabsDeep.forEach((item: any, index: number) => {
            this.$set(this.tabs.list, index, { ...uni.$u.deepClone(defaultTagObj), ...item })
        })
        console.log(this.tabs);
        // this.reqData(true)
    }
    goToAct() {
        uni.navigateTo({
            url: "/pages/cardForum/topics/act?id=" + this.id
        })
    }
    release(event: any) {
        // #ifdef APP-NVUE
        event.stopPropagation();
        // #endif
        releaseByTopic(this.id)
    }
    tabClick(event: any) {
        // console.log(event);
        if (event.index == this.tabs.index) return
        this.tabs.index = event.index
    }
    followTopicAction(event: any) {
        followTopic(this.id).then(() => {
            this.data.isFollow = !this.data.isFollow
        })
    }
    reqNewData(cb?: any) {
        app.http.Get("dataApi/cardCircle/topic/detail/" + this.id, {}, (res: any) => {
            this.data = res.data
        })
    }
    reqData(isRefresh = false, cb?: any) {
        this.current.queryParams.od = this.current.od
        app.http.Get(`dataApi/cardCircle/search/dt`, this.current.queryParams, (res: any) => {
            const list = res.list || []
            this.current.firstReqEnd = true
            this.current.isFetchEnd = res.isFetchEnd
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

}
</script>

<style lang="scss">
.flex1 {
    flex: 1;
}

.userInfoWrap {
    width: 750rpx;
    height: 400rpx;
    // position: relative;
    flex-direction: column;
    align-items: center;
    display: flex;
    background-color: red;
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
    width: 600rpx;
    display: flex;
    flex-direction: row;
    // background-color: red;
}

.userInfo_avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
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

.line {
    width: 683rpx;
    height: 1rpx;
    background: #E6E6E6;
    margin-top: 26rpx;
}

.topicsItem {
    width: 750rpx;
    height: 161rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    flex-direction: row;
    padding: 0 35rpx;
    margin-top: 26rpx;
}

.topicsItem_img {
    width: 161rpx;
    height: 161rpx;
    // background-color: red;
    border-radius: 3rpx;
    margin-right: 46rpx;
}

.rightInfo {
    height: 161rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    // background-color: red;


}

.topicsItem_title {
    font-size: 33rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin-right: 14rpx;
}

.followButton {
    width: 122rpx;
    height: 51rpx;
    background: #FA1545;
    border-radius: 3rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 51rpx;
    color: #FFFFFF;
    border: 1rpx solid #FA1545;
}

.followButton_dis {
    background-color: #ffffff;
    border: 1rpx solid #C0C0C0;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #C0C0C0;
}

.desc {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #959695;
    margin-top: 10rpx;
}

.num {
    color: #aaaaaa;
}





.act {
    width: 71rpx;
    height: 32rpx;
    background: #FA1545;
    border-radius: 3rpx;
    text-align: center;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32rpx;
}

.bottomInfo {
    // width: 100%;
    // width: 500rpx;
    // background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
}

.num {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #C0C0C0;
}

.push {
    // width: 40rpx;
    // height: 20rpx;
    width: 109rpx;
    height: 51rpx;
    background: #FA1545;
    border-radius: 3rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 51rpx;
}

.acWrap {
    width: 730rpx;
    height: 200rpx;
    background: #415459;
    border-radius: 5rpx;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    position: relative;
}

.acImage {
    position: absolute;
    left: 0;
    top: 0;
    width: 730rpx;
    height: 200rpx;
}

.iNeedPush {
    width: 168rpx;
    height: 57rpx;
    background: #FA1545;
    border-radius: 3rpx;
    position: absolute;
    top: 75rpx;
    right: 48rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 57rpx;
    color: #FFFFFF;
}
</style>
