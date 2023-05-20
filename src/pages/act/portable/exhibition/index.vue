<template>
    <view class="content">
        <view class="pointBlock flexCenter">
            <image class="logo" src="@/static/act/portable/logo2.png"></image>
            <view class="title" style="font-size: 25rpx;margin: 0 4rpx;">X</view>
            <image class="logo" src="@/static/act/portable/logo1.png" style="margin-right: 14rpx;"></image>
            <view class="title">好卡征集!发布优质卡片内容赢取奖励</view>
        </view>
        <view class="introduction" :class="{ introduction_show: !hideDesc }">
            <view class="title">简介</view>
            <view class="desc" :class="{ desc_hide: hideDesc }">
                <view class="sj">
                    随着21-22Flawless系列的发售，不知不觉Flawless已经陪伴卡迷们走过了10个年头，21-22赛季也迎来了NBA的75周年，相信去年的Flawless勒布朗·詹姆斯的Triple
                    Logoman可以说也是吊足了卡迷们的胃口。</view>
                <view class="sj">
                    那么你是在什么时候入坑的球星卡呢，我们不妨回过头来想想，自己当初是如何喜欢上收集球星卡的呢，那时候的玩家们，恨不得攒一周的零花钱，去到卡店，买一包球星卡，拆开之前还要祈祷能够抽出自己喜欢的球星，到现在，我们在卡世界里参与拼团，隔着屏幕和不认识的卡迷们一起期待能拆出各自想要的卡;那么对你来说有没有一些卡，它可以是很稀有、价值很高，或者是一套你最喜欢球星的卡，又或者是一张很普通但对你来说很有意义的卡。
                </view>
                <view class="sj">
                    所以它来了，此次卡世界和魔球社联合企划的线上卡展活动，卡迷们可以分享自己给卡拍的好看的照片以及这张卡片的故事；无论你是卡圈大佬又或者是入坑不久的萌新，都可以在本次活动中发布你收藏的球星卡照片和故事，展示卡的同时和大家一起分享自己的心路历程。
                </view>
                <view class="sj">
                    本次活动不限制所有系列，卡迷们可以自行挑选喜欢的系列和照片。当然，Flawless（手提）系列的内容会有特殊标识，平台也将专门开设一个奖项针对于Flawless系列的内容进行评选。
                </view>
                <view class="sj">最后希望卡迷们踊跃投稿，玩得开心。</view>
                <view class="logos">
                    <image class="logo" src="@/static/act/portable/logo2_90x.png"></image>
                    <view class="title" style="font-size: 34rpx;margin: 0 14rpx;">X</view>
                    <image class="logo" src="@/static/act/portable/logo1_90x.png"></image>
                </view>
                <view class="center">本活动由卡世界官方与魔球社联合企划</view>
            </view>
            <view class="lookAll" @click="hideDesc = !hideDesc">{{ hideDesc ? "查看全部" : "收起" }}</view>
        </view>
        <view class="tagContainer">
            <view class="tag" :class="{ tag_select: index == tag.index }" @click="onclickTag(item, index)"
                v-for="(item, index) in tag.list">{{ item }}</view>
            <navigator url="/pages/act/portable/exhibition/my" hover-class="none">
                <view class="my">我的</view>
            </navigator>
        </view>
        <view class="contentContainer">
            <template v-if="tag.index == 0">
                <view class="messageWrap" v-for="(item, index) in list" @click="goToDetail(item.id)">
                    <view class="imgWrap flexCenter">
                        <muqian-lazyLoad class="img" :src="$parsePic(decodeURIComponent(item.url))" />
                    </view>
                    <view class="userWrap">
                        <view class="title u-line-2">{{ item.title || "此处为标题内容很长很长很长很长很长很长很长此处为标题内容很长很长很长很长很长很长很长." }}
                        </view>
                        <view class="userInfo uni-flex">
                            <muqian-lazyLoad borderRadius="50%" class="avatar"
                                :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : defaultAvatar" />
                            <view class="name">{{ item.userName || "小卡迷" }}</view>
                            <view class="rightMsg">
                                <view class="rightMsg_1">
                                    <view class="dz" :class="{ dzs: item.isLiked }"></view>
                                    <view class="num">{{ formatNumber(item.likeNum, 2, 'en') }}</view>
                                </view>
                                <view class="rightMsg_2">
                                    <view class="look"></view>
                                    <view class="num">{{ formatNumber(item.viewNum, 2, "en") }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="jbLefTop" v-if="item.cornerMarkTp == 1"></view>
                </view>
            </template>
            <template v-if="tag.index == 1">
                <view class="draw_tr" v-for="(item, index) in bestList" :key="index">
                    <view class="draw_infoContainer border">
                        <muqian-lazyLoad class="draw_img" borderRadius="3rpx" @click="previewImage(item)"
                            :src="$parsePic(decodeURIComponent(item.awardPic))" />
                        <view class="draw_infoRight">
                            <view class="draw_name">{{ item.awardName || "获取中" }}</view>
                            <view class="draw_condition">
                                <view>{{ item.declare || "" }}</view>
                            </view>
                        </view>
                    </view>
                    <view class="draw_onPrize">
                        <view class="prize_item gray" style="margin-right: 20rpx;">中奖用户 :</view>
                        <template v-if="item.userName">
                            <view class="prize_item" style="flex:1">
                                <muqian-lazyLoad borderRadius="50%" class="avatar"
                                    :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : defaultAvatar" />
                                <view class="name">{{ item.userName }}</view>
                            </view>
                            <view class="prize_item gray" style="text-decoration: underline;"
                                @click="goToDetail(item.worksId)">查看作品</view>
                        </template>
                        <template v-else>
                            <view class="prize_item gray">
                                <view class="name">待公布</view>
                            </view>

                        </template>
                    </view>
                </view>
            </template>
        </view>
        <view class="safe" style="height:130rpx ;opacity: 0;"></view>
        <view class="buttonFix flexCenter" :class="{ buttonFix_continue: !canPush }" @click="goRelease">
            <template v-if="canPush">
                <view class="fly"></view>
                <view class="title">立即发布</view>
            </template>
            <template v-else>
                <view class="close"></view>
                <view class="title">审核通道暂未开启</view>
            </template>

        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { formatNumber, getDateDiff } from "@/tools/util"
@Component({})
export default class ClassName extends BaseNode {
    defaultAvatar: any = app.defaultAvatar
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 10,
    }
    formatNumber = formatNumber
    isFetchEnd: boolean = true
    list: any = []
    tag: any = {
        index: 0,
        list: ['精选内容', '奖项公布']
    }
    totalPage: number = 0
    bestList: any = []
    canPush: boolean = true
    identityAuth: boolean = false
    hideDesc: boolean = true
    mounted() {
        this.reqNewData()
        uni.$on("identityAuthGet", this.identityAuthGet)
        uni.$on("likeChange", this.likeChange)
        uni.$on("delWorks", this.onDelWorkds)
    }
    beforeDestroy() {
        uni.$off("identityAuthGet", this.identityAuthGet)
        uni.$off("likeChange", this.likeChange)
        uni.$off("delWorks", this.onDelWorkds)
    }
    onReachBottomCom() {
        if (this.isFetchEnd || this.tag.index == 1) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPullDownRefreshCom() {
        if (this.tag.index == 1) {
            this.reqBestData(() => {
                uni.stopPullDownRefresh()
            })
            return
        }
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    identityAuthGet() {
        this.identityAuth = true
    }
    likeChange(data: any) {
        if (!data.id) return
        let findItem: any = this.list.find((item: any) => {
            return item.id == data.id
        })
        if (findItem && findItem.id) {
            findItem.isLiked = data.isLiked
            findItem.likeNum = data.likeNum
        }
    }
    onDelWorkds(id: number) {
        if (!id) return
        const findIndex: number = this.list.findIndex((item: any) => {
            return item.id == id
        })
        if (findIndex <= -1) return
        this.list.splice(findIndex, 1)
    }
    goToDetail(id: number) {
        uni.navigateTo({
            url: `/pages/act/portable/exhibition/detail?id=${id || 0}`
        })
    }
    goRelease() {
        if (!this.canPush) {
            app.platform.UINotificationFeedBack("error")
            return
        }
        if (this.identityAuth) {
            uni.navigateTo({
                url: "/pages/act/portable/exhibition/release"
            })
            return
        }
        if (!this.identityAuth) {
            app.http.Get("dataApi/selectRank/my/data", { activityTp: 5 }, (res: any) => {
                if (res.data.identityAuth) {
                    this.identityAuth = true
                    uni.navigateTo({
                        url: "/pages/act/portable/exhibition/release"
                    })
                    return
                } else {
                    uni.showModal({
                        title: "活动提示",
                        content: "参与该活动需要完成实名认证",
                        success: (res: any) => {
                            if (res.confirm) {
                                uni.navigateTo({
                                    url: "/pages/userinfo/security/user_identity"
                                })
                            }
                        }
                    })
                    return
                }

            })

            return
        }

    }
    onclickTag(item: any, index: number) {
        if (this.tag.index == index) {
            return
        }
        if (index == 0 && !this.list.length) this.reqNewData()
        if (index == 1 && !this.bestList.length) this.reqBestData()
        this.tag.index = index
    }
    //奖项公布列表
    reqBestData(cb?: any) {
        app.http.Get(`dataApi/portableCard/works/best`, {}, (res: any) => {
            this.bestList = res.list || []
            cb && cb()
        })
    }
    //精选内容
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/portableCard/works/winnow/list`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }


}
</script>

<style lang="scss">
page {
    background-color: #252525;
}

.pointBlock {
    width: 750rpx;
    height: 75rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/liveBack.png");

    .logo {
        width: 46rpx;
        height: 46rpx;
        border-radius: 50%;

    }

    .title {
        font-size: 33rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
    }
}

.introduction {
    box-sizing: border-box;
    padding: 28rpx 40rpx 30rpx 30rpx;
    // overflow-y: auto;
    width: 709rpx;
    // max-height: 275rpx;
    overflow: hidden;
    height: auto;
    background: #4A5B5D;
    border-radius: 5rpx;

    margin-top: 15rpx;


    .title {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: 10rpx;

    }

    .desc {

        // white-space: pre-wrap;
        view {
            font-size: 24rpx;
            line-height: 38rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;

        }

        .sj {
            text-indent: 1rem;
        }

        .logos {
            display: flex;
            align-items: center;
            margin: 20rpx auto;
            justify-content: center;

            .logo {
                height: 90rpx;
                width: 90rpx;
                border-radius: 50%;
            }

            .title {
                font-size: 30rpx;
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
    }

    .center {
        text-align: center;
    }

    .desc_hide {
        // height: 120rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 4;
        -webkit-line-clamp: 4;
        display: -webkit-box;
        box-orient: vertical;
        -webkit-box-orient: vertical;
    }

    .lookAll {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        text-decoration: underline;
        color: #FFFFFF;
        text-align: center;
        margin-top: 30rpx;
    }
}

.introduction_show {
    transition: max-height 0.3s;
    max-height: 1275rpx;
}

.tagContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 56rpx;
    position: relative;
    width: 750rpx;
    justify-content: center;
    .tag {
        width: 18%;
        text-align: center;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin: 0 59rpx;
    }

    .tag_select {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FA1545;
    }

    .my {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        text-decoration: underline;
        color: #B6B5B5;
        position: absolute;
        right: 50rpx;
        bottom: 6rpx;
    }
}

.contentContainer {
    box-sizing: border-box;
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 750rpx;

    .messageWrap {
        margin-bottom: 20rpx;
        width: 348rpx;
        height: 515rpx;
        border-radius: 5rpx;
        overflow: hidden;
        position: relative;

        .imgWrap {
            width: inherit;
            height: 348rpx;

            .img {
                height: 348rpx;
                width: inherit;
            }
        }

        .userWrap {
            width: inherit;
            height: 167rpx;
            background-color: #fff;
            box-sizing: border-box;
            padding: 0 16rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .title {
                color: #fff;
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #333333;
                margin-top: 16rpx;
                line-height: 38rpx;
            }

            .userInfo {
                align-items: center;
                margin-bottom: 8rpx;
                height: 70rpx;
            }

            .avatar {
                width: 37rpx;
                height: 37rpx;
                margin-right: 13rpx;
            }

            .name {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                flex: 1;
            }

            .rightMsg {
                display: flex;
                flex-direction: column;
                justify-content: center;

                &_1,
                &_2 {
                    display: flex;
                    align-items: center;
                }

                .dz {
                    width: 18rpx;
                    height: 18rpx;
                    background-size: 100% 100%;
                    background-image: url("@/static/act/portable/dz.png");
                }

                .dzs {
                    background-image: url("@/static/act/portable/dzs.png");
                }

                .look {
                    width: 18rpx;
                    height: 13rpx;
                    background-size: 100% 100%;
                    background-image: url("@/static/act/portable/look.png");
                }

                .num {
                    font-size: 20rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #AAAAAA;
                    margin-left: 11rpx;
                }
            }
        }

        .jbLefTop {
            background-size: 100% 100%;
            background-image: url("@/static/act/portable/jb.png");
            width: 126rpx;
            height: 36rpx;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .draw_tr {
        width: 710rpx;
        // height: 223rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 4rpx 13rpx 0rpx #44436A;
        border-radius: 3rpx;
        position: relative;
        box-sizing: border-box;
        padding: 20rpx 20rpx 0rpx 23rpx;
        margin-bottom: 15rpx;
        height: 234rpx;

        .draw_infoContainer {
            display: flex;

            margin-bottom: 16rpx;

            .draw_img {
                width: 124rpx;
                height: 124rpx;
                margin-right: 22rpx;
            }
        }

        .border {
            border-bottom: 1rpx solid #E6E6E6;
            padding-bottom: 20rpx;
        }

        .draw_infoRight {
            flex: 1;
            display: flex;
            flex-direction: column;
            // justify-content: space-between;
        }

        .draw_name {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20rpx;
        }

        .draw_condition {

            font-family: PingFang SC;
            font-weight: 400;
            color: #949494;
            display: flex;
            align-items: center;

            view {
                font-size: 21rpx;
            }

            // justify-content: space-between;
        }

        .draw_onPrize {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10rpx;

            .prize_item {
                // width: 25%;
                color: #333333;
                display: flex;
                align-items: center;
                margin-bottom: 6rpx;
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: 400;
                margin-bottom: 18rpx;

                .avatar {
                    width: 34rpx;
                    height: 34rpx;
                    margin-right: 20rpx;
                }

                .name {
                    font-size: 21rpx;
                }
            }

            .gray {
                color: #949494;
            }
        }
    }

}

.buttonFix {
    width: 750rpx;
    height: 120rpx;
    background: #FA1545;
    position: fixed;
    bottom: 0;

    .fly {
        width: 42rpx;
        height: 42rpx;
        margin-right: 18rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/fbFull.png");
    }

    .title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }

    .close {
        width: 42rpx;
        height: 42rpx;
        margin-right: 18rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/close.png");
    }
}

.buttonFix_continue {
    background: #A7A7A7;

    .fly {
        background-image: url("@/static/act/portable/fb.png");
    }
}
</style>
