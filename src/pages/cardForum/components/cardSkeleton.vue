<template>
    <u-skeleton :loading="loading" :animation="true" :custom="true" style="width: 720rpx;margin-top: 30rpx;">
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
    </u-skeleton>
</template>
<script>
export default {
    name: '',
    components: {

    },
    mixins: [],
    props: {
        loading: {
            type: Boolean,
            default: true
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
<style lang='scss' scoped>
@mixin background {
    /* #ifdef APP-NVUE */
    background-color: #fff;
    /* #endif */
    /* #ifndef APP-NVUE */
    background: linear-gradient(90deg, #fff 25%, rgba(255, 255, 255, .3) 37%, #fff 50%);
    background-size: 400% 100%;
    /* #endif */
}

.skeletonWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 710rpx
}

.skeletonBlock {
    width: 350rpx;
    margin-bottom: 20rpx;

    // height: 400rpx;

}

.skeleton_img {
    width: 350rpx;
    height: 400rpx;
    @include background();
}

.skeleton_title {
    width: 350rpx;
    height: 30rpx;
    margin-top: 14rpx;
    @include background();
}

.skeleton_userInfo {

    align-items: center;
    flex-direction: row;
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

.animate {
    // #ifndef APP-NVUE
    animation: skeleton 1.8s ease infinite;
    // #endif
}

@keyframes skeleton {
    0% {
        background-position: 100% 50%
    }

    100% {
        background-position: 0 50%
    }
}
</style>