<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-24 11:05:35
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-22 15:17:21
 * @FilePath: \card-world\src\components\transitionNav\transitionNav.vue
 * @Description: 渐变导航栏（兼容nvue, nvue中把组件放到结构最下面:越后层级越高）
-->
<template>
    <view id="pageTopContainer" class="pageTopContainer"
        :style="{ zIndex, backgroundColor: `rgba(${navColor},${scrollTopPercent})` }">
        <view class="status" :style="{ paddingTop: app.statusBarHeight + 'px', }">
        </view>
        <view id="pageTop" class="pageTop">
            <view class="pageTitle" :style="[opacityStyle]">
                <text class="titleText">{{ title }}</text>
            </view>
            <view class="leftBackContainer" :class="{ whiteBack: needIconShadow }" @click="app.platform.pageBack()">
                <template v-if="needIconShadow">
                    <image class="back" src="/static/index/v3/icon_back.png" />
                </template>
                <template v-else>
                    <image class="back" :src="`/static/index/v3/${navBackGroundShow ? 'icon_back' : 'back'}.png`" />
                    <!-- #ifndef APP-NVUE -->
                    <!-- 非nvue下利用css滤镜改变方向键颜色 -->
                    <!-- <image class="back" :class="{ filterBlack: navBackGroundShow }" src="/static/index/v3/back.png"
                        @click="app.platform.pageBack()" /> -->
                    <!--  #endif -->
                    <!-- #ifdef APP-NVUE -->
                    <!-- <image class="back" :src="`/static/index/v3/${navBackGroundShow ? 'icon_back' : 'back'}.png`"
                        @click="app.platform.pageBack()" /> -->
                    <!--  #endif -->
                </template>
            </view>
            <view class="slotContainer_left flex1" :style="[opacityStyleRevers]"
                :class="{ slotHidden: scrollTopPercent >= 1 }">
                <slot name="slotLeft" />
            </view>
            <view class="toolsContainer">
                <slot name="slotRight" />
                <view class="tools" @click="onClickTools(item)" :class="{ whiteBack: needIconShadow }"
                    v-for="(item, index) in toolsList" :key="index">
                    <template v-if="needIconShadow">
                        <image :style="[item.style]" class="centerImg" :src="item.icon_black" />
                    </template>
                    <template v-else>
                        <image :style="[item.style]" class="centerImg"
                            :src="navBackGroundShow ? item.icon_black : item.icon" />
                    </template>
                </view>
            </view>
        </view>
        <template v-if='needRightTools.includes("分享")'>
            <!-- #ifndef APP-NVUE -->
            <share :operationShow.sync="operationShow" :shareData="shareData">
            </share>
            <!--  #endif -->
            <!-- #ifdef APP-NVUE -->
            <nvueShare :visible.sync="operationShow" :shareData="shareData">
            </nvueShare>
            <!--  #endif -->
        </template>
    </view>
</template>
<script>
// #ifndef APP-NVUE
import share from '@/components/share/share.vue'
// #endif 
import nvueShare from "@/pages/live/components/nvueShare.nvue"
const app = getApp().globalData.app;
const parsePic = getApp().globalData.parsePic;
const deviceInfo = getApp().globalData.app.platform.systemInfo;
let toolsMap = {
    "客服": {
        action: "onClickKef",
        emitAction: "",
        icon: "/static/mall/kef.png",
        icon_black: "/static/goods/v2/icon_kefu.png",
        style: {
            width: "36rpx",
            height: "34rpx",
        }
    },
    "分享": {
        action: "onClickShare",
        emitAction: "",
        icon: "/static/index/v3/share.png",
        icon_black: "/static/goods/v2/icon_share.png",
        style: {
            width: "34rpx",
            height: "34rpx",
        }

    }
}
export default {
    name: '',
    components: {
        // #ifndef APP-NVUE
        share,
        // #endif 
        nvueShare
    },
    mixins: [],
    props: {
        //层级(非nvue模式有效,nvue下将组件放置页面dom最下面)
        zIndex: {
            type: Number,
            default: 200
        },
        //导航背景色
        navColor: {
            type: String,
            default: "255,255,255"
        },
        //导航标题
        title: {
            type: String,
            default: "标题"
        },
        //右侧功能模块
        needRightTools: {
            type: Array,
            default: () => {
                return []
            }
        },
        //若需要icon背景底色,则icon无需变色
        needIconShadow: {
            type: Boolean,
            default: true
        },
        //分享data
        shareData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        //是否更改电量一栏颜色
        changeStatusBarStyle: {
            type: Boolean,
            default: true
        },
        //颜色list（只支持light,dary）,下标0代表导航栏隐藏时的电量栏样式,下标1反之
        statusBarStyleArray: {
            type: Array,
            default: () => {
                return ['light', 'dark']
            }
        },
        toolsMapCustomNew: {
            type: Object,
            default: () => {
                return {}
            }
        }

    },
    data() {
        return {
            app,
            deviceInfo,
            MAX_HEIGHT: 0,
            scrollTop: 0,
            operationShow: false
        }
    },
    computed: {
        scrollTopPercent() {
            return this.scrollTop / (this.MAX_HEIGHT * 1.4)
        },
        opacityStyle() {
            return {
                opacity: this.scrollTopPercent
            }
        },
        opacityStyleRevers() {
            return {
                opacity: 1 - this.scrollTopPercent
            }
        },
        navBackGroundShow() {
            return (this.scrollTop / (this.MAX_HEIGHT * 1.4)) > 0.6
        },
        scrollTopOpacity() {
            return 1 - (this.scrollTop / (this.MAX_HEIGHT * 1.4))
        },
        toolsList() {
            const list = this.needRightTools.map(key => toolsMap[key])
            return list.filter(item => Boolean(item))
        }
    },
    watch: {
        navBackGroundShow: function (val, oldVal) {
            this.$emit('navBackGroundShowChange', val)
            if (val != oldVal && this.changeStatusBarStyle) {
                // #ifdef APP-PLUS
                plus.navigator.setStatusBarStyle(val ? this.statusBarStyleArray[1] : this.statusBarStyleArray[0]);
                // #endif
            }
        }
    },
    mounted() {
        this.init()
        if (Object.keys(this.toolsMapCustomNew).length) {
            toolsMap = Object.assign(toolsMap, this.toolsMapCustomNew)
        }
    },
    methods: {
        init() {
            // #ifdef APP-PLUS
            if (this.changeStatusBarStyle) {
                plus.navigator.setStatusBarStyle(this.statusBarStyleArray[0]);
            }

            // #endif
            this.$nextTick(() => {
                const query = uni.createSelectorQuery().in(this)
                query
                    .select('#pageTopContainer')
                    .boundingClientRect((data) => {
                        this.MAX_HEIGHT = data.height
                        this.$emit('getNavHeight', data.height)
                    })
                    .exec();
            })
        },
        setPageScroll(scroll) {
            this.scrollTop = scroll.scrollTop
        },
        onClickShare() {
            this.operationShow = true
        },
        onClickKef() {
            let params = {
                agentExten: ''
            }
            app.platform.heliService(params)
        },
        onClickTools(item) {
            if (!item.action && !item.emitAction) return
            if (item.emitAction) {
                this.$emit(item.emitAction)
                return
            }
            this[item.action] && this[item.action]()
        }
    }
};
</script>
<style>
.pageTopContainer {
    position: fixed;
    top: 0;


}

.toolsContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.pageTop {
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 36rpx;
    width: 750rpx;
    height: 88rpx;
    position: relative;
    /* transition: all 0.2s linear; */
}

/* #ifndef APP-NVUE */
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

/* #endif */
/* #ifdef APP-NVUE */
.pageTitle {
    position: absolute;
    left: 0;
    right: 0;
    width: 750rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.titleText {
    font-size: 32rpx;
    color: #3C3C3C;
    font-family: HYQiHei;
    font-weight: bold;
}

/* #endif */
.slotContainer_left {
    height: 88rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: scale(1);
}

.flex1 {
    flex: 1;
}

.leftBackContainer {
    width: 19rpx;
    height: 55rpx;
    border-radius: 50%;
    margin-right: 14rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slotHidden {
    /* #ifndef APP-NVUE */
    pointer-events: none;
    /* #endif */
    /* #ifdef APP-NVUE */
    transform: scale(0);
    /* #endif */
}

.tools {
    width: 55rpx;
    height: 55rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8rpx;
}

.whiteBack {
    width: 55rpx;
    height: 55rpx;
    background: rgba(255, 255, 255, 0.78);
}

.back {
    width: 19rpx;
    height: 35rpx;
}

/* #ifndef APP-NVUE */
.filterBlack {
    -webkit-filter: invert(1) hue-rotate(270deg);
    filter: invert(1) hue-rotate(270deg);
}

/* #endif */
</style>