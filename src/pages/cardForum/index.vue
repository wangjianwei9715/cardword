<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 14:55:44
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-14 14:47:00
 * @FilePath: \card-world\src\pages\cardForum\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="content">
        <div class="navBar" ref="navBar">
            <div :style="{ paddingTop: app.statusBarHeight + 'px', }"></div>
            <div class="nav">
                <div class="navSearchWrap" @click="pageJump('/pages/cardForum/search')">
                    <input type="text" v-model="searchText" placeholder="搜你想搜..." disabled>
                    <div class="search flexCenter">搜索</div>
                </div>
                <div class="camera" @click="actionSheet = true">发布</div>
            </div>
        </div>
        <div style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px', }"></div>
        <div class="fakerTabs" :style="{ height: tabsHeight + 'px' }"></div>
        <div class="tabs" :style="{ top: navHeight + 'px' }">
            <u-tabs :list="list1" ref="tabs"></u-tabs>
        </div>

        <u-skeleton :loading="!firstReqEnd" :custom="true" style="width: 720rpx;margin-top: 30rpx;"
            :style="{ height: scrollViewHeight + 'px' }">
            <template v-slot:skeleton>
                <div class="skeletonWrap">
                    <div class="skeletonBlock" v-for="item in 12">
                        <div class="skeleton_img animate"></div>
                        <div class="skeleton_title animate"></div>
                        <div class="skeleton_userInfo uni-flex">
                            <div class="skeleton_avatar animate"></div>
                            <div class="skeleton_userName animate"></div>
                        </div>
                    </div>
                </div>
            </template>
            <scroll-view ref="scrollView" :style="{ height: scrollViewHeight + 'px' }" :refresher-triggered="refresherIndex"
                scroll-y class="scrollView" :refresher-threshold="45" refresher-background="#f2f2f2"
                :scroll-with-animation="true" :refresher-enabled="true" :enable-back-to-top="true"
                @touchend="touchmoveScroll" @scrolltolower="scrolltolower" @refresherrefresh="refresherrefresh">
                <waterfalls :value="list" />
                <u-loadmore icon loadingIcon="semicircle" :status="reqEnd ? 'nomore' : 'loading'" :line="reqEnd" />
            </scroll-view>

        </u-skeleton>
        <u-action-sheet :actions="actionsList" cancelText="取消" :show="actionSheet" @select="onSelectAction"
            @close="actionSheet = false"></u-action-sheet>
    </div>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import waterfalls from "./components/waterfalls.vue"
import CardForum from "./interface/public";
// import nVideo from './components/video.nvue'
interface IndexAction extends CardForum.ActionItem {
    value?: number;
    action?: string;
    url?: string;
}
const actionsList: Array<IndexAction> = [
    {
        name: "动态",
        url: "/pages/cardForum/release"
    }, {
        name: "卡册",
        subname: "制作图片对应卡种的高质量卡册，适用于凑套等"
    }
]
const mockList: any = [{ image: 'https://i.ebayimg.com/thumbs/images/g/vp4AAOSwMg5b-2j5/s-l300.webp', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
{ image: 'https://i.ebayimg.com/thumbs/images/g/pwkAAOSwr7xkfSXB/s-l300.webp', title: '我是标题2', desc: '描述描述描述描述描述描述描述描述2' },
{ image: 'https://i.ebayimg.com/thumbs/images/g/NOEAAOSwgyZkfXox/s-l300.webp', title: '我是标题3', desc: '描述描述描述描述描述描述描述描述3' },
{ image: 'https://i.ebayimg.com/thumbs/images/g/mqkAAOSwXLNkgU7E/s-l300.webp', title: '我是标题4', desc: '描述描述描述描述描述描述描述描述4' },
{ image: 'https://i.ebayimg.com/thumbs/images/g/AvAAAOSwUvpj96Rw/s-l300.webp', title: '我是标题5', desc: '描述描述描述描述描述描述描述描述5' },
{ image: 'https://i.ebayimg.com/thumbs/images/g/8A0AAOSwyhVkeXb4/s-l300.webp', title: '我是标题6', desc: '描述描述描述描述描述描述描述描述6' },
{ image: 'https://i.ebayimg.com/thumbs/images/g/suUAAOSwZTNkWA8H/s-l300.webp', title: '我是标题7', desc: '描述描述描述描述描述描述描述描述7' }]
@Component({
    components: {
        waterfalls
    }
})
export default class ClassName extends BaseNode {
    app = app
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20
    }
    firstReqEnd: boolean = false
    reqEnd: boolean = false
    actionSheet: boolean = false
    refresherIndex: boolean = false
    actionsList: Array<IndexAction> = actionsList
    totalPage: number = 0
    scrollViewHeight: number = 0
    navHeight: number = 88
    tabsHeight: any = 20
    searchText: string = ""
    list1: any = [{
        name: '关注',

    }, {
        name: '推荐',
    }, {
        name: '电影'
    }, {
        name: '科技'
    }, {
        name: '音乐'
    }, {
        name: '美食'
    }, {
        name: '文化'
    }, {
        name: '财经'
    }, {
        name: '手工'
    }]
    list: any = []
    onLoad(query: any) {
        this.$nextTick(async () => {
            //@ts-ignore
            this.navHeight = await this.getDomHeight(".navBar")
            this.tabsHeight = await this.getDomHeight(".tabs")
            console.log(app.platform.systemInfo.safeArea);

            //@ts-ignore
            this.scrollViewHeight = app.platform.systemInfo.safeArea?.height - 56 - 4 - this.navHeight + this.tabsHeight - app.statusBarHeight
            this.reqNewData()
        })

    }
    onReachBottom() {

    }
    onPullDownRefresh() {
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    scrolltolower() {
        setTimeout(() => {
            this.list.push(...mockList)
        }, 300)
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    getDomHeight(dom: string) {
        return new Promise((re, rj) => {
            uni.createSelectorQuery()
                .select(dom)
                .boundingClientRect((rect) => {
                    if (rect) {
                        re && re(rect.height)
                    }
                })
                .exec();
        })
    }
    pageJump(url: string) {
        uni.navigateTo({
            url,
            events: {
                receive: (data: any) => {
                    if (this.searchText != data.searchTetxt) {
                        this.firstReqEnd = false
                        this.queryParams.pageIndex = 1
                        this.queryParams.q = data.searchText
                        this.reqNewData()
                        this.searchText = data.searchText
                    }
                }
            },
            success: (res: any) => {
                res.eventChannel.emit('defaultText', { searchText: this.searchText })
            }
        })
    }
    touchmoveScroll() {
        console.log(66666);

    }
    refresherrefresh() {
        uni.$u.throttle(() => {
            this.refresherIndex = true;
            setTimeout(() => {
                this.refresherIndex = false
            }, 500)
        }, 1000)
    }
    onSelectAction(item: IndexAction) {
        if (item.url) {
            uni.navigateTo({
                url: item.url
            })
        }
    }
    reqNewData(cb?: any) {
        this.list = mockList
        setTimeout(() => {
            this.firstReqEnd = true
        }, 200)
        return
        app.http.Get(`dataApi`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.totalPage = res.totalPage
            if (this.queryParams.pageIndex >= res.totalPage) this.reqEnd = true
            this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f2f2f2;
}

@mixin background {
    /* #ifdef APP-NVUE */
    background-color: #fff;
    /* #endif */
    /* #ifndef APP-NVUE */
    background: linear-gradient(90deg, #fff 25%, rgba(255, 255, 255, .3) 37%, #fff 50%);
    background-size: 400% 100%;
    /* #endif */
}

.content {
    width: 750rpx;
}

.tabs {
    position: fixed;
    width: 750rpx;
    background-color: #f2f2f2;
}

.waterfallContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .waterFall {
        width: 346rpx;
        background-color: rgba(255, 0, 0, .2);
        height: 900rpx;
    }
}

.skeletonWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    .skeletonBlock {
        width: 350rpx;
        margin-bottom: 20rpx;

        // height: 400rpx;
        .skeleton_img {
            width: inherit;
            height: 400rpx;
            @include background();
        }

        .skeleton_title {
            width: inherit;
            height: 30rpx;
            margin-top: 14rpx;
            @include background();
        }

        .skeleton_userInfo {
            align-items: center;
            margin-top: 14rpx;
        }

        .skeleton_avatar {
            width: 60rpx;
            height: 60rpx;
            border-radius: 50%;
            @include background();
        }

        .skeleton_userName {
            width: 140rpx;
            margin-left: 14rpx;
            height: 40rpx;
            @include background();
        }
    }
}

.animate {
    animation: skeleton 1.8s ease infinite
}

@keyframes skeleton {
    0% {
        background-position: 100% 50%
    }

    100% {
        background-position: 0 50%
    }
}

.navBar {
    width: 750rpx;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: #fff;

    .nav {
        box-sizing: border-box;
        padding: 20rpx 35rpx;
        display: flex;
        align-items: center;
        // height: 88rpx;
        justify-content: space-between;
    }

    .navSearchWrap {
        width: 570rpx;
        height: 60rpx;
        border: 2rpx solid #797979;
        border-radius: 6rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 10rpx;
        align-items: center;

        .search {
            font-weight: bold;
            height: 50rpx;
            background-color: #fb374e;
            color: #fff;
            width: 100rpx;
            border-radius: 6rpx;
        }
    }
}

.scrollView ::v-deep .uni-scroll-view-refresher {
    display: flex;
    align-items: center;
    justify-content: center;
}

// ::v-deep .uni-scroll-view-refresher::before
.scrollView {
    // background-color: red;

    /deep/.uni-scroll-view-refresher {
        background: $content-bg !important
    }

    /deep/.uni-scroll-view-refresh {
        align-items: flex-end !important;
    }

    /deep/.uni-scroll-view-refresh__spinner {
        width: 50rpx !important;
        height: 50rpx !important;
    }

    /deep/.uni-scroll-view-refresh__icon {
        display: none;
    }

    /deep/.uni-scroll-view-refresh-inner {

        background: rgba(0, 0, 0, 0);
        box-shadow: none
    }

    /deep/.uni-scroll-view-refresh__spinner>circle {
        width: 50rpx !important;
        height: 50rpx !important;
        stroke-width: 6 !important;
        color: #e2e2e2 !important;
    }

    /deep/.uni-scroll-view-refresher {
        transition: height 0.2s ease-out;
    }

    /deep/.u-tabs__wrapper__nav__line {
        border-radius: 0 !important;
        bottom: 18rpx !important
    }
}
</style>
