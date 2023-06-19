<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:25:59
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-19 14:28:55
 * @FilePath: \card-world\src\pages\cardForum\components\waterfalls.vue
 * @Description: 瀑布流
-->
<template>
    <!-- #ifndef APP-NVUE -->
    <view class="uv-waterfall">
        <view class="uv-waterfall__gap_left" :style="[gapLeftStyle]"></view>
        <view id="uv-waterfall-1" class="uv-waterfall__column">
            <slot name="list1"></slot>
            <!-- slot示例 -->
            <view>
                <view v-for="(item, index) in list1" :key="item.id" class="waterfall-item" @click="goToDetail(item)">
                    <view class="waterfall-item__image">
                        <image :src="item.image" mode="widthFix" :style="{ width: '250rpx' }">
                        </image>
                    </view>
                    <view class="waterfall-item__ft">
                        <view class="waterfall-item__ft__title">
                            <text class="value">{{ item.title }}</text>
                        </view>
                        <view class="waterfall-item__ft__desc uv-line-2">
                            <text class="value">{{ item.desc }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="uv-waterfall__gap_center" :style="[gapCenterStyle]"></view>
        <view id="uv-waterfall-2" class="uv-waterfall__column">
            <slot name="list2"></slot>
            <!-- slot示例 -->
            <view>
                <view v-for="(item, index) in list2" :key="item.id" @click="goToDetail(item)" class="waterfall-item">
                    <view class="waterfall-item__image">
                        <image :src="item.image" mode="widthFix" :style="{ width: '250rpx' }">
                        </image>
                    </view>
                    <view class="waterfall-item__ft">
                        <view class="waterfall-item__ft__title">
                            <text class="value">{{ item.title }}</text>
                        </view>
                        <view class="waterfall-item__ft__desc uv-line-2">
                            <text class="value">{{ item.desc }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="uv-waterfall__gap_right" :style="[gapRightStyle]">
        </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <!-- fixFreezing -->
    <waterfall @scroll="scroll" ref="water" bounce="true" :column-count="columnCount" :fixFreezing="fixFreezing"
        :show-scrollbar="false" column-width="auto" :column-gap="columnGap" :left-gap="leftGap" :right-gap="rightGap"
        @loadmore="scrolltolower" :style="{ height: height, position: 'relative' }">
        <refresh v-if="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
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
import mixin from './function/mixin.js'
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
// #endif
export default {
    name: 'waterfalls',
    mixins: [mixin],
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
            default: 'id'
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
            list1: [],
            list2: [],
            // 临时列表
            tempList: [],
            refreshing: false
        }
    },
    computed: {
        // 破坏value变量引用，否则数据会保持不变
        copyValue() {
            // #ifdef VUE2
            return this.$uv.deepClone(this.value)
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
    },
    methods: {
        onrefresh() {
            this.$emit("refresh")
            this.refreshing = true
        },
        goToDetail(item) {
            uni.navigateTo({
                url: "/pages/cardForum/detail?code=" + item.code
            })
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
                await this.$uv.sleep(_timeout);
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
            // #ifdef VUE2
            this.$emit('input', [])
            // #endif
            // #ifdef VUE3
            this.$emit('update:modelValue', [])
            // #endif
            this.tempList = []
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
</style>