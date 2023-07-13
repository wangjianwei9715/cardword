<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:25:59
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-13 12:01:23
 * @FilePath: \jichao_app_2\src\pages\cardForum\components\waterfalls.vue
 * @Description: 瀑布流
-->
<template>
    <!-- #ifndef APP-NVUE -->
    <view>
        <view class="uv-waterfall">
            <view class="uv-waterfall__gap_left" style="width:10rpx;opcity:0"></view>
            <view id="uv-waterfall-1" class="uv-waterfall__column">

                <!-- slot示例 -->
                <view>
                    <slot name="list1"></slot>
                    <view v-for="(item, index) in list1" :key="item.index" class="waterfall-item-grayWrap">
                        <view class="waterfall-item" @click="goToDetail(item)">
                            <!-- ?x-oss-process=image/resize,m_fixed,h_100,w_100 -->
                            <view class="waterfall-item__image">
                                <view v-if="item.type == 'cardBook' && item.cover == ''" class="cardBook-nullpic">
                                    <image class="wait-pic" src="@/static/illustration/icon_wait.png" />
                                </view>
                                <image v-else-if="item.mode"
                                    :style="{ height: item.height + 'px', width: item.width + 'px' }" :mode="item.mode"
                                    :src="imageUrl(item)" class="waterfall-item__image_img">
                                </image>
                                <image v-else class="defaultImg" @load="h5ImageLoad($event, item)"
                                    :src="thumbnail(item.cover, true)"
                                    style="width:360rpx;height:430rpx;background-color: #fff;opacity: 0;">
                                </image>
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
                            <view class="waterfall-item__bottom" @click.stop="goToUserProfile($event, item)"
                                v-if="showBottom">
                                <template v-if="showUser">
                                    <image class="waterfall-item__bottom__avatar" mode="aspectFill"
                                        :src="item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar">
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
                                <template v-if="!showUser && type != 'draftList'">
                                    <view class="likeWrap" style="margin-right: 44rpx;">
                                        <image src="@/static/cardForum/eye.png" style="width:31rpx;height:23rpx"
                                            class="likeImg"></image>
                                        <text class="likeNum">{{ item.clickNum }}</text>
                                    </view>
                                    <view class="likeWrap">
                                        <image
                                            :src="isLike(item) ? '/static/cardForum/like.png' : '/static/cardForum/unLike.png'"
                                            class="likeImg"></image>
                                        <text class="likeNum">{{ item.likeNum }}</text>
                                    </view>
                                    <template v-if="isMine && item.status && item.status == 2">
                                        <view style="flex:1"></view>
                                        <image src="@/static/cardForum/lock.png" style="width:23rpx;height:24rpx;">
                                        </image>
                                    </template>
                                </template>
                                <template v-if="type == 'draftList'">
                                    <view class="likeNum">{{ parseTime(item.create_at) }}</view>
                                    <view style="flex:1"></view>
                                    <view @click.stop="onClickDeleteDraft(item)">
                                        <u-icon size="36rpx" name="trash"></u-icon>
                                    </view>
                                </template>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="uv-waterfall__gap_center" style="width:10rpx;opcity:0"></view>
            <view id="uv-waterfall-2" class="uv-waterfall__column">
                <slot name="list2"></slot>
                <!-- slot示例 -->
                <view>
                    <view v-for="(item, index) in list2" :key="item.index" class="waterfall-item-grayWrap">
                        <view class="waterfall-item" @click="goToDetail(item)">
                            <view class="waterfall-item__image">
                                <view v-if="item.type == 'cardBook' && item.cover == ''" class="cardBook-nullpic">
                                    <image class="wait-pic" src="@/static/illustration/icon_wait.png" />
                                </view>
                                <image v-else-if="item.mode"
                                    :style="{ height: item.height + 'px', width: item.width + 'px' }" :mode="item.mode"
                                    :src="imageUrl(item)" class="waterfall-item__image_img">
                                </image>
                                <image v-else class="defaultImg" @load="h5ImageLoad($event, item)"
                                    :src="thumbnail(item.cover, true)"
                                    style="width:360rpx;height:430rpx;background-color: #fff;opacity: 0;">
                                </image>
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
                            <view class="waterfall-item__bottom" @click.stop="goToUserProfile($event, item)"
                                v-if="showBottom">
                                <template v-if="showUser">
                                    <image class="waterfall-item__bottom__avatar" mode="aspectFill"
                                        :src="item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar">
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
                                <template v-if="!showUser && type != 'draftList'">
                                    <view class="likeWrap" style="margin-right: 44rpx;">
                                        <image src="@/static/cardForum/eye.png" style="width:31rpx;height:23rpx"
                                            class="likeImg"></image>
                                        <text class="likeNum">{{ item.clickNum }}</text>
                                    </view>
                                    <view class="likeWrap">
                                        <image
                                            :src="isLike(item) ? '/static/cardForum/like.png' : '/static/cardForum/unLike.png'"
                                            class="likeImg"></image>
                                        <text class="likeNum">{{ item.likeNum }}</text>
                                    </view>
                                    <template v-if="isMine && item.status && item.status == 2">
                                        <view style="flex:1"></view>
                                        <image src="@/static/cardForum/lock.png" style="width:23rpx;height:24rpx;">
                                        </image>
                                    </template>
                                </template>
                                <template v-if="type == 'draftList'">
                                    <view class="likeNum">{{ parseTime(item.create_at) }}</view>
                                    <view style="flex:1"></view>
                                    <view @click.stop="onClickDeleteDraft(item)">
                                        <u-icon size="36rpx" name="trash"></u-icon>
                                    </view>
                                </template>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="uv-waterfall__gap_right" style="width:10rpx;opcity:0">
            </view>
        </view>
        <empty v-if="!list1.length && !list2.length && showEmpty"></empty>
        <template v-if="list1.length || list2.length">
            <u-loadmore :line="true" lineLength="20rpx" loadingIcon="semicircle" :status="isFetchEnd ? 'nomore' : 'loading'"
                nomore-text="没有更多了" fontSize="24rpx" />
            <div :style="{ height: safeBottomHeight + 'px' }"></div>
        </template>
    </view>

    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->

    <waterfall @scroll="scroll" fixFreezing="true" ref="water" bounce="true" :column-count="columnCount"
        :show-scrollbar="false" :column-width="WIDTH" :column-gap="GAP" :left-gap="GAP" :right-gap="GAP"
        @loadmore="scrolltolower" :always-scrollable-vertical="true" :height="height">
        <refresh v-if="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
            <u-loading-icon mode="semicircle"></u-loading-icon>
        </refresh>
        <header>
            <div v-for="(item, index) in copyValue" style="opacity:0;width:1px;height:1px;position:fixed;bottom:0;">
                <image :src="thumbnail(item.cover)" v-if="!item.mode"
                    style="opacity:0;width:1px;height:1px;position:fixed;bottom:0;" @load="imageLoad($event, item)"
                    @error="imageLoadError($event, item)">
                </image>
            </div>
        </header>
        <slot name="header"></slot>
        <header>
            <empty v-if="!copyValue.length && showEmpty"></empty>
        </header>
        <slot name="cell"></slot>
        <cell v-for="(item, index) in copyValue" class="waterfall-item-grayWrap" @click="goToDetail(item)"
            @appear="comAppear($event, item)">
            <div class="waterfall-item">
                <div class="waterfall-item__image">
                    <div v-if="!item.mode" class="defaultImg"
                        style="width:360rpx;height:430rpx;background-color: #fff;opacity: 0;">
                    </div>
                    <image v-if="item.mode == 'widthFix'" style="width: 360rpx;" :src="item.cover"
                        class="waterfall-item__image_img" mode="widthFix">
                    </image>
                    <image v-if="item.mode == 'aspectFit'" :style="{ height: `440rpx`, width: item.width + 'px' }"
                        :src="item.cover" class="waterfall-item__image_img" mode="aspectFit">
                    </image>
                    <view class="videoIconWrap" v-if="item.video_at">
                        <u-icon class="videoIcon" color="#ffffff" size="26rpx" name="play-right-fill"></u-icon>
                    </view>
                </div>
                <div class="waterfall-item__ft">
                    <div class="waterfall-item__ft__title">
                        <text class="waterfall-item__ft__title__value">{{ item.title }}</text>
                    </div>
                </div>
                <div class="waterfall-item__bottom" @click.stop="goToUserProfile($event, item)" v-if="showBottom">
                    <template v-if="showUser">
                        <image class="waterfall-item__bottom__avatar" mode="aspectFill"
                            :src="item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar">
                        </image>
                        <text class="waterfall-item__bottom__userName u-line-1">{{ item.userName || '小卡迷' }}</text>
                        <div class="likeWrap">
                            <image
                                :src="isLike(item) ? '../../static/cardForum/like.png' : '../../static/cardForum/unLike.png'"
                                class="likeImg"></image>
                            <text class="likeNum">{{ item.likeNum }}</text>
                        </div>
                    </template>
                    <template v-if="!showUser">
                        <view class="likeWrap" style="margin-right: 44rpx;">
                            <image src="@/static/cardForum/eye.png" style="width:31rpx;height:23rpx" class="likeImg">
                            </image>
                            <text class="likeNum">{{ item.clickNum }}</text>
                        </view>
                        <view class="likeWrap">
                            <image
                                :src="isLike(item) ? '../../static/cardForum/like.png' : '../../static/cardForum/unLike.png'"
                                class="likeImg"></image>
                            <text class="likeNum">{{ item.likeNum }}</text>
                        </view>
                        <template v-if="isMine && item.status && item.status == 2">
                            <view style="flex:1"></view>
                            <image src="@/static/cardForum/lock.png" style="width:23rpx;height:24rpx;">
                            </image>
                        </template>
                    </template>
                </div>
            </div>
        </cell>
        <header style="margin-top:50rpx" v-if="copyValue.length">
            <u-loadmore :line="true" loadingIcon="semicircle" lineLength="20rpx" :status="isFetchEnd ? 'nomore' : 'loading'"
                nomore-text="没有更多了" fontSize="24rpx" />
            <div :style="{ height: safeBottomHeight + 'px' }"></div>
        </header>
    </waterfall>
    <!-- #endif -->
</template>
<script>
const CardBookJumpUrl = {
    1: '/pages/illustration/album/selectCard',
    2: '/pages/illustration/album/picUpload'
}
const MAX_HEIGHT = uni.upx2px(440)
const WIDTH = uni.upx2px(360)
const MIN_HEIGHT = uni.upx2px(246)
const GAP = uni.upx2px(10)
const app = getApp().globalData.app
let exposureList = []
let alreadyList = []
let bufferImgList = []
const LIEK = 4
import mixin from './function/mixin.js'
import { delDraftDetail } from "../func/index.js"
import empty from "@/components/empty/empty.vue"
import { getDraftDetail } from "../func"
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
// #endif
export default {
    name: 'waterfalls',
    mixins: [mixin],
    components: {
        empty
    },
    props: {
        // 瀑布流数据
        // #ifdef VUE2
        value: {
            type: Array,
            default: () => []
        },
        // #endif
        // #ifdef VUE3
        modelValue: {
            type: Array,
            default: () => []
        },
        // #endif
        // 数据的id值，根据id值对数据执行删除操作
        // 如数据为：{id: 1, name: 'uv-ui'}，那么该值设置为id
        idKey: {
            type: String,
            default: 'code'
        },
        // 每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好，单位ms
        addTime: {
            type: Number,
            default: 200
        },
        columnCount: {
            type: [Number, String],
            default: 2
        },
        columnGap: {
            type: [Number, String],
            default: 5
        },
        leftGap: {
            type: [Number, String],
            default: 5
        },
        rightGap: {
            type: [Number, String],
            default: 5
        },
        showScrollbar: {
            type: [Boolean],
            default: false
        },
        columnWidth: {
            type: [Number, String],
            default: 'auto'
        },
        width: {
            type: [Number, String],
            default: ''
        },
        height: {
            type: [Number, String],
            default: ''
        },
        refresh: {
            type: [Boolean],
            default: true
        },
        refreshColor: {
            type: String,
            default: ""
        },
        fixFreezing: {
            type: [Boolean, String],
            default: "false"
        },
        //是否展示底部用户信息
        showUser: {
            type: Boolean,
            default: true
        },
        //是否是我的
        isMine: {
            type: Boolean,
            default: false
        },
        //点进详情页，点击用户头像是否返回上一级页面
        detailBack: {
            type: Boolean,
            default: false
        },
        needExposure: {
            type: Boolean,
            default: false
        },
        showBottom: {
            type: Boolean,
            default: true
        },
        isFetchEnd: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: ""
        },
        viewUserId: {
            type: Number,
            default: 0
        },
        showEmpty: {
            type: Boolean,
            default: true
        }

    },
    data() {
        return {
            list1: [],
            list2: [],
            GAP,
            // 临时列表
            tempList: [],
            parsePic: getApp().globalData.parsePic,
            refreshing: false,
            defaultAvatar: getApp().globalData.app.defaultAvatar,
            pushTimer: 0,
            safeBottomHeight: 0,

        }
    },

    computed: {
        // 破坏value变量引用，否则数据会保持不变
        copyValue() {
            // #ifdef VUE2
            let newArr = this.$uv.deepClone(this.value)
            // #ifdef APP-NVUE
            newArr = newArr.map(item => {
                const findItem = bufferImgList.find(buffer => {
                    return buffer.cover === item.cover
                })
                // console.log("找到的item", findItem);
                if (findItem) {
                    item.mode = findItem.mode
                    item.width = findItem.width
                }
                return item
            })
            // #endif
            return newArr
            // #endif
            // #ifdef VUE3
            return this.$uv.deepClone(this.modelValue)
            // #endif
        },
        columnNum() {
            return this.columnCount <= 0 ? 0 : this.columnCount >= 5 ? 5 : this.columnCount;
        },
        gapLeftStyle() {
            const style = {}
            style.width = this.$uv.addUnit(this.leftGap)
            return style;
        },
        gapRightStyle() {
            const style = {}
            style.width = this.$uv.addUnit(this.rightGap)
            return style;
        },
        gapCenterStyle() {
            const style = {}
            style.width = this.$uv.addUnit(this.columnGap)
            return style;
        },
        nvueWaterfallStyle() {
            const style = {};
            if (this.width != 0) style.width = this.$uv.addUnit(this.width)
            if (this.height != 0) style.height = this.$uv.addUnit(this.height)
            // 如果没有定义列表高度，则默认使用屏幕高度
            if (!style.width) style.width = this.$uv.addUnit(this.$uv.sys().windowWidth, 'px')
            if (!style.height) style.height = this.$uv.addUnit(this.$uv.sys().windowHeight, 'px')
            return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle))
        }
    },
    watch: {
        copyValue(nVal, oVal) {
            // console.log("this.$refs.waterfall.clear();", nVal);
            // #ifndef APP-NVUE
            if (nVal.length != 0) {
                // 取出数组发生变化的部分
                let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0
                // 拼接原有数据
                this.tempList = this.tempList.concat(this.$uv.deepClone(nVal.slice(startIndex)))
                this.splitData()
            }
            // #endif

        }
    },
    mounted() {
        // #ifndef APP-NVUE
        this.tempList = this.$uv.deepClone(this.copyValue)
        this.splitData()
        // #endif
        // #ifdef APP-NVUE
        this.safeBottomHeight = plus.navigator.getSafeAreaInsets().deviceBottom
        // #endif
        uni.$on("delCardForum", this.onDelCardForum)
        uni.$on("setCardForumPrivate", this.setCardForumPrivate)
        uni.$on("cardForumLike", this.onCardForumLike)
        uni.$on("editCardForum", this.onEditCardForum)

    },
    beforeDestroy() {
        uni.$off("delCardForum", this.onDelCardForum)
        uni.$off("setCardForumPrivate", this.setCardForumPrivate)
        uni.$off("cardForumLike", this.onCardForumLike)
        uni.$off("editCardForum", this.onEditCardForum)
    },
    methods: {
        onrefresh() {
            this.$emit("refresh")
            this.refreshing = true
        },
        comAppear(event, item) {
            if (!this.needExposure) return
            if (this.needExposure && item.uploadExposure) {
                exposureList.push(item.code)
                uni.$u.debounce(() => {
                    this.exposureAction && this.exposureAction()
                }, 1000)
            }
        },
        isLike(item) {
            return (item.bit & LIEK) === LIEK
        },
        onClickDeleteDraft(item) {
            uni.showModal({
                title: "提示",
                content: "是否删除此草稿?",
                success: (res) => {
                    if (res.confirm) {
                        if (item.code) {
                            app.http.Post(`cardCircle/delete/${item.code}`, {}, () => {
                                uni.$emit("refreshDraft", item.code)
                            })
                            return
                        }
                        delDraftDetail(item.draftId)
                        // #ifdef APP-PLUS
                        if (item.video_at > 0 && item.url.length) {
                            uni.removeSavedFile({
                                filePath: decodeURIComponent(item.url[0])
                            })
                        }
                        // #endif
                        // this.delData(item.)
                        uni.$emit("refreshDraft")
                    }
                }
            })
        },
        exposureAction() {
            const newArray = [...new Set(exposureList)].filter((code) => {
                return !alreadyList.includes(code)
            });
            // , deviceId: app.platform.systemInfo.deviceId 
            if (!newArray || !newArray.length) return
            app.http.Post(`cardCircle/upload/show/dt`, { codes: newArray }, () => {
                alreadyList.push(...newArray)
            })
        },
        goToUserProfile(event, item) {
            if (this.type == "draftList" || !this.showUser) return
            // #ifdef APP-NVUE
            event.stopPropagation();
            // #endif
            uni.navigateTo({
                url: `/pages/cardForum/personHomePage?userId=${item.userId}&isMine=${item.isMe ? 1 : 0}`
            })
        },
        goToDetail(item) {
            if (item.type == "中卡") {
                uni.previewImage({
                    current: 0,
                    urls: item.pic.split(',').filter(Boolean).map(path => {
                        return this.parsePic(decodeURIComponent(path))
                    })
                })
                return
            }
            if (this.type == "draftList") {
                if (item.type == "cardBook") {
                    const data = getDraftDetail(item.draftId, app.data.userId);
                    if (data.step) {
                        uni.navigateTo({
                            url: `${CardBookJumpUrl[data.step]}?draftList=${encodeURIComponent(JSON.stringify(data.list))}&draftId=${item.draftId}`
                        })
                        return;
                    }
                }
                if (item.code) {
                    uni.navigateTo({
                        url: "/pages/cardForum/release?code=" + item.code
                    })
                    return
                }
                uni.navigateTo({
                    url: "/pages/cardForum/release?draftId=" + item.draftId
                })
                return
            }
            if (item.video_at > 0) {
                uni.navigateTo({
                    url: `/pages/cardForum/video/index?code=${item.code}&back=${this.detailBack}&private=${item.status && item.status == 2 ? 1 : 0}${this.isMine ? "&fromMine=1" : ""}`
                })
                return
            }
            if (item.typeName == '卡册' && item.status == 0) {
                uni.navigateTo({
                    url: `/pages/cardForum/release?code=${item.code}`
                })
                return;
            }
            uni.navigateTo({
                url: `/pages/cardForum/detail?` +
                    `code=${item.code}` +
                    `&back=${this.detailBack}` +
                    `&private=${item.status && item.status == 2 ? 1 : 0}` +
                    `${this.viewUserId ? `&fromUserId=${this.viewUserId}` : ''}`
            })
        },
        parseTime(time) {
            return uni.$u.timeFormat(time, "mm-dd")
        },
        hideRefresh() {
            this.refreshing = false
            // console.log("停止下啦啦啦啦");
        },
        onpullingdown() {
            console.log("onpullingdown");
        },
        swiperChange(listId, height) {
            // #ifdef APP-NVUE
            this.$refs.water.setSpecialEffects({
                id: listId,
                headerHeight: height.toFixed(2)
            });
            // console.log(this.$refs.water.setSpecialEffects);
            // #endif
            console.log("设置swiperChange", listId, height);
        },
        goTop() {
            // #ifdef APP-NVUE
            // console.log(this.$refs.goTop);
            dom.scrollToElement(this.$refs.goTop, {
                animated: false//无动画
            })
            // #endif
            // console.log("goTopgoTop");
        },
        scroll(event) {
            this.$emit("scroll", event)
        },
        scrolltolower() {
            this.$emit("loadmore")
        },
        delData(code) {
            const index = this.tempList.findIndex(item => {
                return item.code == code
            })
            if (index >= 0) {
                this.tempList.splice(index, 1)
            }
        },

        h5ImageLoad(event, item) {

            // event.detail.width = event.detail.width * 100
            // event.detail.height = event.detail.height * 100
            // console.log(event);
            if (event.detail.width < WIDTH) {
                event.detail.height = (WIDTH / event.detail.width) * event.detail.height
                event.detail.width = WIDTH
            }
            // console.log(event);
            const widthFixHeight = (WIDTH / event.detail.width) * event.detail.height
            if (widthFixHeight > MAX_HEIGHT) {
                item.mode = "aspectFit"
                item.width = (event.detail.width / event.detail.height) * MAX_HEIGHT
                item.height = MAX_HEIGHT
            } else {
                item.mode = "widthFix"
                item.height = widthFixHeight
            }
            bufferImgList.push({
                code: item.code,
                cover: item.cover,
                mode: item.mode,
                width: item.width,
                height: item.height
            })
            // console.log(item);
            this.pushTimer && clearTimeout(this.pushTimer)
            this.pushTimer = setTimeout(() => {
                this.$forceUpdate()
            }, 200)
        },
        imageLoad(event, item) {
            // #ifdef APP-NVUE
            if (item.mode || item.width) return
            // #endif
            const widthFixHeight = (WIDTH / event.detail.width) * event.detail.height
            // console.log(widthFixHeight,MAX_HEIGHT);
            if (widthFixHeight > MAX_HEIGHT) {
                item.mode = "aspectFit"
                item.width = (event.detail.width / event.detail.height) * MAX_HEIGHT
            } else {
                item.mode = "widthFix"
            }
            // #ifndef APP-NVUE

            // #endif
            this.pushTimer && clearTimeout(this.pushTimer)
            this.pushTimer = setTimeout(() => {
                this.$forceUpdate()
            }, 100)
            // #ifdef APP-NVUE
            // this.tempList.push(item)
            bufferImgList.push({
                code: item.code,
                cover: item.cover,
                mode: item.mode,
                width: item.width
            })
            // #endif
        },
        imageUrl(item) {
            const deCover = this.parsePic(decodeURIComponent(item.cover))
            const isVideoSnapshot = deCover.indexOf("x-oss-process=video/snapshot") >= 0
            if (isVideoSnapshot) return deCover
            return deCover + `?x-oss-process=image/resize,m_fixed,h_${parseInt(item.height * 2)},w_${parseInt(item.width * 2)}`
        },
        thumbnail(cover, needParse) {
            if (!cover) return cover
            let deCover = needParse ? this.parsePic(decodeURIComponent(cover)) : cover
            const isVideoSnapshot = deCover.indexOf("x-oss-process=video/snapshot") >= 0
            if (isVideoSnapshot) return deCover
            return deCover + "?x-oss-process=image/resize,p_1"
        },
        imageLoadError(event, item) {
            // #ifndef APP-NVUE
            this.pushTimer && clearTimeout(this.pushTimer)
            this.pushTimer = setTimeout(() => {
                this.$forceUpdate()
            }, 200)
            // #endif
            // #ifdef APP-NVUE
            this.tempList.push(item)
            // #endif
        },
        // 拆分数据
        async splitData() {
            let rectArr = [];
            let emitList = {};
            if (!this.tempList.length) return
            for (let i = 1; i <= this.columnNum; i++) {
                const rect = await this.$uvGetRect(`#uv-waterfall-${i}`);
                rectArr.push({ ...rect, name: i });
            }
            let item = this.tempList[0]
            // 因为经过上面两个await节点查询和定时器，数组有可能会变成空[]，导致item的值为undefined
            // 解决多次快速滚动会导致数据乱的问题
            if (!item) return
            const minCol = this.getMin(rectArr);
            // 列宽可能使用的到
            item.width = minCol.width;
            const findItem = bufferImgList.find((buffer) => {
                buffer.cover == item.cover
            })
            if (findItem) {
                item.mode = findItem.mode
                item.width = findItem.width
            }
            // console.log(item);
            this[`list${minCol.name}`].push(item);
            emitList.name = `list${minCol.name}`;
            emitList.value = item;
            this.$emit('changeList', emitList);
            // 移除临时数组中已处理的数据
            this.tempList.splice(0, 1)
            // 如果还有数据则继续执行
            if (this.tempList.length) {
                let _timeout = this.addTime;
                // 部分平台在延时较短的情况会出现BUG
                // #ifdef MP-BAIDU
                _timeout = _timeout < 200 ? 200 : _timeout;
                // #endif
                await this.$uv.sleep(100);
                this.splitData()
            } else {
                this.$emit('finish')
            }
        },
        getMin(arr) {
            const min = Math.min.apply(Math, arr.map(item => {
                return item.height;
            }))
            const newArr = arr.filter(item => item.height == min);
            return newArr[0];
        },
        // 清空数据列表
        async clear() {
            console.log("清空数据咯");
            // #ifdef VUE2
            this.$emit('input', [])
            // #endif
            // #ifdef VUE3
            this.$emit('update:modelValue', [])
            // #endif
            this.tempList = []
            this.list1 = []
            this.list2 = []
            await this.$uv.sleep(300);
            this.$emit('clear');
        },
        // 清除指定的某一条数据，根据id来实现
        remove(id) {
            let index = -1
            // 删除组件数据
            for (let i = 1; i <= this.columnCount; i++) {
                index = this[`list${i}`].findIndex(item => item[this.idKey] == id)
                if (index != -1) {
                    this[`list${i}`].splice(index, 1)
                }
            }
            // 同时删除父组件对应的数据
            // #ifdef VUE2
            index = this.value.findIndex(item => item[this.idKey] == id)
            if (index != -1) this.$emit('input', this.value.splice(index, 1))
            // #endif
            // #ifdef VUE3
            index = this.modelValue.findIndex(item => item[this.idKey] == id)
            if (index != -1) this.$emit('update:modelValue', this.modelValue.splice(index, 1))
            // #endif
            this.$emit('remove', id);
        },
        findIndex(code) {
            // #ifndef APP-NVUE
            const findIndex1 = this.list1.findIndex((item) => {
                return item.code == code
            })
            const findIndex2 = this.list2.findIndex((item) => {
                return item.code == code
            })
            if (findIndex1 >= 0) {
                return { index: findIndex1, list: "list1" }
            }
            if (findIndex2 >= 0) {
                return { index: findIndex2, list: "list2" }
            }
            if (findIndex1 < 0 && findIndex2 < 0) {
                return { index: -1, list: null }
            }
            // #endif
            // #ifdef APP-NVUE
            const index = this.value.findIndex((item) => {
                return item.code == code
            })
            return { index: index, list: null }
            // #endif
        },
        ////$on-------------------------
        onDelCardForum(code) {
            const { index, list } = this.findIndex(code)
            // #ifndef APP-NVUE
            // if (index >= 0) {
            //     this[list].splice(index, 1)
            // }
            this.remove(code)
            // #endif
            // #ifdef APP-NVUE
            if (index >= 0) {
                this.value.splice(index, 1)
            }
            // #endif
        },
        onCardForumLike(res) {
            const { index, list } = this.findIndex(res.code)
            // #ifndef APP-NVUE
            if (index >= 0) {
                this[list][index].bit = res.bit
                this[list][index].likeNum = res.likeNum
            }
            // #endif
            // #ifdef APP-NVUE
            if (index >= 0) {
                this.value[index].bit = res.bit
                this.value[index].likeNum = res.likeNum
            }
            // #endif
        },
        setCardForumPrivate(res) {
            const { index, list } = this.findIndex(res.code)
            // #ifndef APP-NVUE
            if (index >= 0) {
                this[list][index].status = res.private ? 2 : 1
            }
            // #endif
            // #ifdef APP-NVUE
            if (index >= 0) {
                this.value[index].status = res.private ? 2 : 1
            }
            // #endif
        },
        onEditCardForum(res) {
            console.log(res);
            const { index, list } = this.findIndex(res.code)
            // #ifndef APP-NVUE
            if (index >= 0) {
                this[list][index].title = res.formData.title
                this[list][index].cover = res.formData.cover
            }
            // #endif
            // #ifdef APP-NVUE
            if (index >= 0) {
                this.value[index].title = res.formData.title
                this.value[index].cover = res.formData.cover
            }
            // #endif
        }
    }

}
</script>
<style lang="scss" scoped>
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
    // margin-bottom: 10rpx;
    border-radius: 5rpx;
    overflow: hidden;
}

.waterfall-item__image {
    width: 360rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    border-radius: 5rpx;
    overflow: hidden;
    position: relative;
    // #ifndef APP-NVUE
    // min-height: 300rpx;
    // #endif
}

.waterfall-item__image_img {
    width: 360rpx;
    // #ifndef APP-NVUE
    width: 100%;
    max-height: 439rpx;
    // #endif
    border-radius: 5rpx;
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
    padding-bottom: 29rpx;
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
</style>