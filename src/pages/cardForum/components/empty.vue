<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-08-09 10:49:12
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-08-10 14:09:12
 * @FilePath: \card-world\src\pages\cardForum\components\empty.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="emptyContainer">
        <view class="emptyImageContainer" :class="{emptyImageContainer2:type=='forum'}">
            <image class="emptyImage" v-if="type=='com'" src="/static/cardForum/commEmpty.png"></image>
            <image class="emptyImage emptyImage2" v-else src="/static/cardForum/forumEmpty.png"></image>
        </view>
        <text class="tips">{{tips}}</text>
        <text class="button" v-if="showButton" @click="$emit('onClickButton')">{{type=="com"?"抢个沙发":"去发布"}}</text>
    </view>
</template>
<script>
export default {
    name: '',
    components: {

    },
    mixins: [],
    props: {
        type:{
            type:String,
            default:"com"
        },
        tips:{
            type:String,
            default:"暂时没有评论哦～"
        },
        showButton:{
            tpye:Boolean,
            default:true
        }
    },
    data() {
        return {

        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>
<style scoped>
.emptyContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100rpx;
    padding-top: 50rpx;
}

.emptyImageContainer {
    width: 200rpx;
    position: relative;
    height: 256rpx;

}
.emptyImageContainer2{
    height: 312rpx;
}
.emptyImage {
    position: absolute;
    width: 353rpx;
    height: 256rpx;
    left: 0;
    top: 0;
}
.emptyImage2{
    width: 333rpx;
    height: 312rpx;
}
.tips {
    font-size: 24rpx;
    
    font-weight: 400;
    color: #C0C0C0;
    margin-top: 31rpx;
    letter-spacing: 2rpx;
}

.button {
    width: 163rpx;
    height: 61rpx;
    border: 1rpx solid #C0C0C0;
    border-radius: 3rpx;
    text-align: center;
    line-height: 61rpx;
    font-size: 25rpx;
    
    font-weight: 400;
    color: #FA1545;
    margin-top: 25rpx;
}
</style>