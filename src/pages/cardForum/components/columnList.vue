<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-09-07 09:51:48
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-09-13 14:14:57
 * @FilePath: \card-world\src\pages\cardForum\components\columnList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <!-- #ifndef APP-NVUE -->
    <div class="columnContainer">
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <cell>
            <!-- #endif -->
            <div class="columnWrap" v-for="(item, index) in value" :key="index" @click="onClickData(item)">
                <div class="columnWrap_message uni-flex fdr">
                    <div class="columnWrap_message_left uni-flex flex1">
                        <div>
                            <text class="columnWrap_message_left_title u-line-2">{{ item.title }}</text>
                        </div>
                        <div>
                            <text class="columnWrap_message_left_type">{{ item.scName }}</text>
                        </div>
                    </div>
                    <!-- #ifndef APP-NVUE -->
                    <image class="columnWrap_message_cover" mode="aspectFill"
                        :src="ossStitching(parsePic(decodeURIComponent(item.cover)), `x-oss-process=image/resize,m_lfit,w_200`)">
                    </image>
                    <!-- #endif -->
                    <!-- #ifdef APP-NVUE -->
                    <image class="columnWrap_message_cover" mode="aspectFill"
                        :src="ossStitching(item.cover, `x-oss-process=image/resize,m_lfit,w_200`)">
                    </image>
                    <!-- #endif -->
                </div>
                <div class="columnWrap_bottom uni-flex ac fdr">
                    <div class="columnWrap_bottom_left uni-flex ac flex1 fdr">
                        <div class="bottomItem uni-flex fdr ac" style="margin-right: 37rpx;">
                            <image class="infoImg" mode="widthFix" src="/static/cardForum/comm_gray.png"></image>
                            <text class="infoNum">{{ item.commentNum }}</text>
                        </div>
                        <div class="bottomItem uni-flex fdr ac" @click.stop="onClickLike($event, item)">
                            <image class="infoImg" mode="widthFix" src="/static/cardForum/dz_gray.png" v-if="!isLike(item)">
                            </image>
                            <image class="infoImg" mode="widthFix" src="/static/cardForum/comm_dz_s.png" v-else></image>
                            <text class="infoNum">{{ item.likeNum }}</text>
                        </div>
                    </div>
                    <text class="columnWrap_bottom_time">{{ timeFrom(item.pub_at) }}</text>
                </div>
                <div class="line" v-if="index != value.length - 1"></div>
            </div>
            <!-- #ifdef APP-NVUE -->
        </cell>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
    </div>
    <!-- #endif -->
</template> 
<script>
import { ossStitching } from "../func/index.js"
import { BitMap } from "../func/data.js"
const app = getApp().globalData.app
export default {
    name: '',
    components: {

    },
    mixins: [],
    props: {
        value: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            parsePic: getApp().globalData.parsePic,
            ossStitching
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        uni.$on("cardForumLike", this.onCardForumLike)
        uni.$on("cardForumCommChange", this.onCardForumCommChange)
    },
    beforeDestroy() {
        uni.$off("cardForumLike", this.onCardForumLike)
        uni.$off("cardForumCommChange", this.onCardForumCommChange)
    },
    methods: {
        timeFrom(time) {
            return uni.$u.timeFrom(time, 'yyyy-mm-dd')
        },
        onCardForumLike(res) {
            const findIndex = this.value.findIndex((item) => {
                return item.code === res.code
            })
            if (findIndex >= 0) {
                this.value[findIndex].bit = res.bit
                this.value[findIndex].likeNum = res.likeNum
            }
        },
        onCardForumCommChange(res) {
            const findIndex = this.value.findIndex((item) => {
                return item.code === res.code
            })
            if (findIndex >= 0) {
                this.value[findIndex].commentNum = res.num
            }
        },
        isLike(item) {
            return (item.bit & BitMap.IS_LIKE) === BitMap.IS_LIKE
        },
        onClickLike(event, item) {
            // #ifdef APP-NVUE
            event.stopPropagation();
            // #endif
            const isLike = ((item.bit & BitMap.IS_LIKE) === BitMap.IS_LIKE)
            app.http.Post(`cardCircle/${isLike ? 'un/' : ''}like/${item.code}`, {}, (res) => {
                if (isLike) item.likeNum -= 1
                if (!isLike) item.likeNum += 1
                item.bit ^= BitMap.IS_LIKE;
                uni.$emit("cardForumLike", { code: item.code, bit: item.bit, likeNum: item.likeNum })
            })
        },
        onClickData(item) {
            uni.navigateTo({
                url: `/pages/cardForum/detail?` +
                    `code=${item.code}`
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.flex1 {
    flex: 1;
}

.ac {
    align-items: center;
}

.fdr {
    flex-direction: row;
}

.columnContainer {
    //#ifndef APP-NVUE
    width: 100%;
    //#endif
    //#ifdef APP-NVUE
    width: 750rpx;
    padding: 0 34rpx;
    //#endif
}

.columnWrap {
    width: 750rpx;
    // margin-bottom: 20rpx;
    //#ifndef APP-NVUE
    box-sizing: border-box;
    //#endif
    background-color: #ffffff;
    padding-left: 34rpx;
    padding-right: 34rpx;
    // padding-top: 37rpx;
    padding-bottom: 37rpx;
    // padding-bottom: 47rpx;
}

.columnWrap_message {}

.columnWrap_message_left {
    flex-direction: column;
    justify-content: flex-start;
    // justify-content: space-between;
}

.columnWrap_message_left_title {
    font-size: 27rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 33rpx;
    margin-top: 14rpx;
    // #ifdef APP-NVUE
    lines: 2;
    text-overflow: ellipsis;
    // #endif
}

.columnWrap_message_left_type {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #AAAAAA;
    margin-top: 19rpx;
}

.columnWrap_message_cover {
    width: 215rpx;
    height: 143rpx;
    border-radius: 3rpx;
    margin-left: 55rpx;
}

.columnWrap_bottom {
    // width: 750rpx;
    margin-top: 20rpx;
    //#ifndef APP-NVUE
    box-sizing: border-box;
    //#endif
    // padding: 0 34rpx;
}

.columnWrap_bottom_left {
    // flex: 1;
    flex-direction: row;
}

.infoImg {
    width: 30rpx;
    margin-right: 14rpx;
}

.infoNum {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #AAAAAA;
}

.columnWrap_bottom_time {
    font-size: 26rpx;
    color: #333333;
    //#ifndef APP-NVUE
    display: block;
    //#endif 
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #AAAAAA;
}

.line {
    height: 1rpx;
    background: #E6E6E6;
    margin-top: 47rpx;
}
</style>