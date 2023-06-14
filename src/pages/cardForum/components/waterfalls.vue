<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:25:59
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-14 17:33:19
 * @FilePath: \card-world\src\pages\cardForum\components\waterfalls.vue
 * @Description: nvue瀑布流,仅限于nvue使用
-->
<template>
    <view class="uv-waterfall">
        <!-- #ifdef APP-NVUE -->
        <view class="waterfall-warapper">
            <waterfall :column-count="columnCount" :show-scrollbar="false" column-width="auto" :column-gap="columnGap"
                :left-gap="leftGap" :right-gap="rightGap" :always-scrollable-vertical="true" @loadmore="scrolltolower" style="height:600px">
                <refresh>
                    <text>Refreshing...</text>
                </refresh>
                <slot></slot>
            </waterfall>
        </view>
        <!-- #endif -->
    </view>
</template>
<script>
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
        }
    },
    data() {
        return {
        }
    },
    methods: {
        scrolltolower() {
            this.$emit("loadmore")
        }
    }

}
</script>
<style lang="scss"></style>