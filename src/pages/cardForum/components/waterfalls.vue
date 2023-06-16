<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:25:59
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-16 16:06:20
 * @FilePath: \card-world\src\pages\cardForum\components\waterfalls.vue
 * @Description: nvue瀑布流,仅限于nvue使用
-->
<template>
    <!-- #ifdef APP-NVUE -->
    <!-- fixFreezing -->
    <waterfall @scroll="scroll" ref="water" bounce="true" :column-count="columnCount" :fixFreezing="fixFreezing"
        :show-scrollbar="false" column-width="auto" :column-gap="columnGap" :left-gap="leftGap" :right-gap="rightGap"
        @loadmore="scrolltolower" :style="{ height: height, position: 'relative' }">
        <refresh v-if="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
            <!-- <text>Refreshing...</text> -->
            <loading-indicator></loading-indicator>
        </refresh>
        <header>
            <div ref="goTop"></div>
        </header>
        <slot></slot>
    </waterfall>
    <!-- #endif -->
</template>
<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
// #endif
export default {
    name: 'waterfalls',
    props: {
        columnCount: {
            type: [Number, String],
            default: 2
        },
        columnGap: {
            type: [Number, String],
            default: 20
        },
        leftGap: {
            type: [Number, String],
            default: 0
        },
        rightGap: {
            type: [Number, String],
            default: 0
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
        fixFreezing: {
            type: [Boolean, String],
            default: "false"
        }
    },
    data() {
        return {
            refreshing: false
        }
    },
    methods: {
        onrefresh() {
            // console.log("onrefresh");
            this.$emit("refresh")
            this.refreshing = true
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
                headerHeight: height
            });
            // #endif
            console.log("设置swiperChange", listId, height);
        },
        goTop() {
            // #ifdef APP-NVUE
            console.log(this.$refs.goTop);
            dom.scrollToElement(this.$refs.goTop, {
                animated: false//无动画
            })
            // #endif
            console.log("goTopgoTop");
        },
        scroll(event) {
            this.$emit("scroll", event)
        },
        scrolltolower() {
            this.$emit("loadmore")
        }
    }

}
</script>
<style>
.refresh {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 750rpx;
    height: 80rpx;
}
</style>