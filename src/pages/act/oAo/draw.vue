<template>
    <view class="content">
        <view class="videoContainer">
            <!-- <image class="backBg" src="../../../static/act/rankSelect/rankBanner.jpg" /> -->
            <view class="liveState">等待直播</view>
            <view class="videoPlay">

            </view>
            <view class="livePlayTips">平台暂未开启直播</view>
        </view>
        <view class="tipsContainer flexCenter">
            活动截止后入榜前500名用户抽取幸运奖励
        </view>
        <view class="myRank">
            <view class="myRank_avatarContainer">
                <muqian-lazyLoad class="myRank_avatar" borderRadius="50%"
                    :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar" />
                <view class="myRank_rank">
                    <view class="myRank_rank_linback flexCenter">{{ myRank.isPass ? myRank.rank : '未入榜' }}</view>
                </view>
            </view>
            <view class="myRank_point">
                <view class="now">{{ myRank.userName || '获取中' }}</view>
                <view class="point">累计获取积分:{{ myRank.get_score }}</view>
            </view>
            <muqian-lazyLoad class="myRank_Award" borderRadius="3rpx"
                :src="myRank.isPass ? '../../../static/act/rankSelect/canLucky.png' : '../../../static/act/rankSelect/noneLucky.png'" />
            <!-- <view class="myRank_name">
                {{myRank.userName || '获取中'}}
            </view>
            <view class="myRank_point">
                <view class="now">{{myRank.isPass?`当前排名：${myRank.rank}`:'未上榜'}}</view>
                <view class="point">已获得{{myRank.get_score}}活动积分</view>
            </view> -->
        </view>
        <view class="title">{{ isLottery ? '幸运名单' : '幸运奖池' }}</view>
        <view class="rewardContainer" v-if="!isLottery">
            <muqian-lazyLoad class="reward" @click="prviewImages(item.pic_url)"
                :style="{ marginRight: (index + 1) % 3 == 0 ? `0rpx` : `14rpx` }" borderRadius="3rpx"
                v-for="(item, index) in luckyAwards" :src="decodeURIComponent(item.pic_url)" />
            <!-- http://cdn.ka-world.com/admin/debug/2022.10.19/goods/pintuan0/1666158537827qw40aujsim.jpg
http://cdn.ka-world.com/admin/debug/2022.10.19/goods/pintuan0/1666158537827qw40aujsim.jpg -->
        </view>
        <view v-else class="luckyContainer" style="margin-bottom: 20rpx;">
            <view class="myRank" v-for="(item, index) in luckyList">
                <view class="myRank_avatarContainer">
                    <muqian-lazyLoad class="myRank_avatar" borderRadius="50%"
                        :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : defaultAvatar" />
                </view>
                <view class="myRank_point">
                    <view class="now" style="margin-bottom:0rpx;">{{ item.userName || '获取中' }}</view>
                    <!-- <view class="point">累计获取积分:{{item.get_score}}</view> -->
                </view>
                <muqian-lazyLoad @click="prviewImages(item.awardPic_url)" class="myRank_Award" borderRadius="3rpx"
                    :src="$parsePic(decodeURIComponent(item.awardPic_url))" />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
import { parsePic } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    defaultAvatar = app.defaultAvatar
    myRank: any = {}
    isLottery: boolean = false
    luckyList: any = []
    luckyAwards: any = [
        // { pic: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.10.25/seller/info/1/1666686598531v77703ivaa.png' }, { pic: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.10.25/seller/info/1/1666686598531v77703ivaa.png' }, { pic: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.10.25/seller/info/1/1666686588175ypd48tdht.jpg' }
    ]
    onLoad(query: any) {
        this.reqMyRank()
        this.reqLuckyList()
        this.reqRewardList()
    }
    onReachBottom() {

    }
    onPulldDownRefresh() {

    }
    // beforeDestroy(): void {
    //     uni.$emit('resetAn')
    // }
    prviewImages(picString: string) {
        if (!picString) return
        const picArr: any = picString.split(',').map(item => parsePic(decodeURIComponent(item)))
        uni.previewImage({
            current: 0,
            urls: picArr
        })
    }
    reqLuckyList() {
        app.http.Get(`dataApi/selectRank/lucky/user/list`, { fetchFrom: 1, fetchSize: 500, activityTp: 2 }, (res: any) => {
            this.luckyList = res.list || []
            if (this.luckyList.length) this.isLottery = true
        })
    }
    reqRewardList() {
        app.http.Get('dataApi/selectRank/award/list', { isLucky: 1, activityTp: 2 }, (res: any) => {
            this.luckyAwards = res.list || []

        })
    }
    //我的rank
    reqMyRank() {
        app.http.Get('dataApi/selectRank/my/data', { activityTp: 2 }, (res: any) => {
            this.myRank = res.data || {}
        })
    }

}
</script>

<style lang="scss">
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
}

.title {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    margin-top: 37rpx;
    margin-bottom: 20rpx;
}

.videoContainer {
    width: 750rpx;
    height: 388rpx;
    background: rgba(0, 0, 0, .61);
    position: relative;

    .backBg {
        width: inherit;
        height: inherit;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 0;
    }
}

.liveState {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    left: 21rpx;
    top: 34rpx;
    position: absolute;
}

.videoPlay {
    // position: absolute;
    width: 133rpx;
    height: 133rpx;
    background-size: 100% 100%;
    background-image: url('../../../static/act/rankSelect/play.png');

    margin: 0 auto;
    margin-top: 114rpx;
    position: relative;
    // left: 0;top: 0;bottom: 0;
}

.livePlayTips {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    margin-top: 48rpx;
    text-align: center;
    position: relative;
}

.tipsContainer {
    width: 750rpx;
    height: 75rpx;
    background-size: 100% 100%;
    background-image: url('../../../static/act/rankSelect/luckPic.png');
    font-size: 37rpx;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #FFFFFF;
}

.myRank {
    width: 710rpx;
    height: 152rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 14rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 31rpx;

    .myRank_avatarContainer {
        width: 89rpx;
        height: 89rpx;
        position: relative;
        margin-right: 30rpx;
    }

    .myRank_rank {
        width: 89rpx;
        height: 26rpx;
        background-color: #a8a174;
        border-radius: 3rpx;
        position: absolute;
        bottom: -10rpx;
        left: 0;
    }

    .myRank_rank_linback {
        width: inherit;
        height: inherit;
        border-radius: 3rpx;
        background: linear-gradient(106deg, rgba(172, 105, 40, 0.63), rgba(248, 238, 167, 0.63), rgba(138, 84, 7, 0.63));
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .myRank_avatar {
        width: inherit;
        height: inherit;
        // background: #3D1F19;
        border-radius: 50%;

    }

    .myRank_name {
        // flex: 1;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .myRank_Award {
        width: 128rpx;
        height: 128rpx;
        border-radius: 3rpx;
    }

    .myRank_point {
        display: flex;
        flex-direction: column;
        flex: 1;

        .now {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 600;
            // text-align: right;
            color: #333333;
            margin-bottom: 6rpx;
        }

        .point {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            // text-align: right;
        }
    }
}

.rewardContainer {
    width: 710rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 28rpx 30rpx 30rpx 30rpx;
    display: flex;
    flex-wrap: wrap;

    .reward {
        width: 207rpx;
        height: 207rpx;
        border-radius: 3rpx;
        margin-bottom: 14rpx;
    }
}
</style>
