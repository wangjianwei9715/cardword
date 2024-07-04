<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2024-06-24 14:03:57
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2024-06-25 11:52:54
 * @FilePath: \card-world\src\pages\merchant\cardresult\upload.vue
 * @Description: ✌✌✌✌✌✌
 * 
 * Copyright (c) 2024 by ${lsj}, All Rights Reserved. 
-->
<template>
    <view class="content">
        <transitionNav ref='transitionNav' :transition="false" :needIconShadow="false" title="上传报告">
            <template v-slot:slotRight>
                <view v-if="reportState==2" class="detailButton flexCenter" @click="showReason">驳回原因</view>
            </template>
        </transitionNav>
        <view class="topSearchContainer">
            <view class="nav" :style="{ height: navHeight + 'px' }"></view>
            <view class="searchWrap">
                <view class="searchTypeName">搜球员</view>
                <image class="searchIcon" src="@/static/merchant/down.png"></image>
                <view class="gap"></view>
                <input class="searchInput" v-model="queryParams.q"></input>
            </view>
            <view class="topMenu">
                <view class="menuItem" :class="{ menuItem_select: queryParams.tp == 100 }" @click="onClickMenu(100)">
                    全部卡密{{ totalCard }}
                </view>
                <view class="menuItem" :class="{ menuItem_select: queryParams.tp == 1 }" @click="onClickMenu(1)">
                    中卡数量{{ hitAllNum }}
                </view>
            </view>
            <view class="orderMenu">
                <view class="orderItem" v-for="(item, index) in sortData" @click="onClickSort(item)">
                    <view class="name" :class="{ name_select: isSelect(item) }">{{ item.name }}</view>
                    <view class="picWrap" v-if="item.name != '默认'">
                        <template v-if="!isSelect(item)">
                            <image src="@/static/merchant/sort_u.png" class="orderPic"></image>
                            <image src="@/static/merchant/sort_d.png" class="orderPic"></image>
                        </template>
                        <template v-else>
                            <image v-if="queryParams.odType == 1" src="@/static/merchant/sort_u_.png" class="orderPic">
                            </image>
                            <image v-else src="@/static/merchant/sort_u.png" class="orderPic">
                            </image>
                            <image v-if="queryParams.odType == 2" src="@/static/merchant/sort_d_.png" class="orderPic">
                            </image>
                            <image v-else src="@/static/merchant/sort_d.png" class="orderPic">
                            </image>
                        </template>
                    </view>
                </view>
            </view>
        </view>
        <view class="nav" :style="{ height: navHeight + 'px' }"></view>
        <view class="fakerTop"></view>
        <view class="cardItem" v-for="(item, index) in list" :key="item.id">
            <view class="cardSetInfo" v-if="item.hit">
                <view class="setTxt" :style="{ color: (item.rarity || item.cfgLoc) ? '#FA1545' : '#333333' }">{{
            cardSetTxt(item) }}
                </view>
                <view class="hitNum">卡片数：{{ item.num }}</view>
            </view>
            <view class="cardName u-line-2">{{ item.name }}</view>
            <view class="picsWrap">
                <view class="picItem" v-for="(url, picIndex) in cardHitPics(item)">
                    <muqian-lazyLoad class="pic" borderRadius="3rpx" :src="$parsePic(url)"></muqian-lazyLoad>
                    <view class="picMask flexCenter" v-if="item.pics && item.pics.length > 4 && picIndex == (4 - 1)">
                        +{{ item.pics.length - 4 }}
                    </view>
                </view>
            </view>
            <view class="border"></view>
            <view class="userInfo">
                <muqian-lazyLoad borderRadius="50%" class="avatar" :src="$parsePic(item.avatar)"></muqian-lazyLoad>
                <view class="userName">{{ item.buyer }}</view>
                <view class="btn flexCenter" @click="onClickBtn(item)">{{ item.hit ? "修改" : "标记中卡" }}</view>
            </view>
        </view>
        <view class="fakerBottom">
            <view class="faker" style="height:148rpx"></view>
            <view class="bottomSafeArea"></view>
        </view>
        <view class="bottomAction">
            <view class="actionWrap uni-flex">
                <view class="num">已标记卡密：{{ markNum }}</view>
                <view class="btn" @click="onClickToReview">提交报告</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <u-popup :show="popShow" mode="bottom" mask :safeAreaInsetBottom="true" @close="popShow = false"
            border-radius="3rpx" bgColor="rgba(0,0,0,0)">
            <view class="popContainer">
                <view class="topWrap">
                    <view class="title">标记信息</view>
                    <view class="clear" @click="clearSelect">清空</view>
                </view>
                <view class="popItem">
                    <view class="dot">*</view>
                    中卡数量:
                </view>
                <view class="numWrap uni-flex">
                    <view class="jian" @click="clickHit(-1)"></view>
                    <view class="centerNum">
                        {{ formData.num }}
                    </view>
                    <view class="add" @click="clickHit(1)"></view>
                </view>
                <view class="popItem" style="margin-top: 32rpx;">
                    <view class="dot">*</view>
                    上传图片:
                </view>
                <view class="imageUploadWrap">
                    <scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
                        <view class="upload" v-for="(url, picIndex) in (formData.pics || [])">
                            <image style="width: 100%;height: 100%;" class="pic" :src="$parsePic(url)"></image>
                            <image src="@/static/cardForum/del.png" class="delPic"
                                @click.stop="onClickDelPic(picIndex)">
                            </image>
                        </view>
                        <view class="upload" @click="onClickAddUploadPics">
                            <image class="pic" style="width:50rpx;height:50rpx" src="@/static/cardForum/addImage.png">
                            </image>
                        </view>
                    </scroll-view>
                </view>
                <view class="popItem" style="margin-top: 32rpx;">
                    好卡等级:
                </view>
                <view class="clickWrap uni-flex">
                    <view class="clickBtn" @click="onClickRarity(rarity)"
                        :class="{ clickBtn_select: rarity === formData.rarity }" v-for="rarity in rarityList">{{ rarity
                        }}
                    </view>
                </view>
                <view class="popItem" style="margin-top: 32rpx;">
                    配置位:
                </view>
                <view class="clickWrap uni-flex">
                    <view class="clickBtn" @click="formData.cfgLoc = !formData.cfgLoc"
                        :class="{ clickBtn_select: formData.cfgLoc }">配置位
                    </view>
                </view>
                <view class="popBottomAction uni-flex">
                    <view class="cancelBtn" @click="popShow = false">取消</view>
                    <view class="confirmBtn" @click="onClickOneCardConfirm">确认</view>
                </view>
            </view>
        </u-popup>
        <u-popup :show="popShowRating" mode="bottom" mask :safeAreaInsetBottom="true" @close="popShowRating = false"
            border-radius="3rpx" bgColor="rgba(0,0,0,0)">
            <view class="ratingContainer">
                <view class="topWrap">
                    <view class="title">是否开启报告评分功能</view>
                </view>
                <view class="ratingWrap">
                    <view class="ratingItem" :class="{ ratingItem_select: rating === true }" @click="rating = true">开启评分
                    </view>
                    <view class="ratingItem" :class="{ ratingItem_select: rating === false }" @click="rating = false">
                        不开启评分
                    </view>
                </view>
                <view class="popBottomAction uni-flex" style="margin-bottom: 30rpx;">
                    <view class="cancelBtn" @click="popShowRating = false">取消</view>
                    <view class="confirmBtn" @click="submitReview">确认</view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import Upload from "@/tools/upload"
const navHeight = app.statusBarHeight + uni.upx2px(88)
@Component({})
export default class ClassName extends BaseNode {
    navHeight = navHeight
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20,
        code: "",
        tp: 100,
        q: '',
        odTp: 100,
        odType: null,
    }
    list: any = []
    totalPage: number = 0
    totalCard: number = 0
    hitAllNum: number = 0
    markNum: number = 0
    reportState: number = 0
    popShow: boolean = false
    popShowRating: boolean = false
    formData: any = {}
    UploadClient: any = Upload.getInstance()
    rating: any = null
    sortData: any = [{
        name: '默认',
        value: 100,
        odType: 0
    }, {
        name: '球队',
        value: 1,
        odType: 1
    }, {
        name: '球员',
        value: 2,
        odType: 1
    }, {
        name: '限编',
        value: 3,
        odType: 1
    }, {
        name: '卡种',
        value: 4,
        odType: 1
    }, {
        name: '编号',
        value: 5,
        odType: 1
    }]
    rarityList: any = ["S", "SS", "SSS"]
    scrollLeft: number = 0
    onLoad(query: any) {
        this.queryParams.code = query.code
        this.reportState = +query.reportState
        this.reqNewData()
        this.reqHitNum()
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    isSelect(item: any): boolean {
        return item.value === this.queryParams.odTp
    }
    onClickMenu(tp: number) {
        if (this.queryParams.tp == tp) return
        this.queryParams.pageIndex = 1
        this.queryParams.tp = tp
        this.reqNewData()
    }
    cardSetTxt(item: any) {
        let array: any = []
        if (item.cfgLoc) array.push("配置位")
        if (item.rarity) array.push("已标记好卡")
        if (array.length === 0) {
            array.push("无标记内容")
        }
        return array.join(",")
    }
    cardHitPics(item: any) {
        if (!item.pics) {
            return []
        }
        if (item.pics.length > 4) {
            return item.pics.slice(0, 4)
        }
        return item.pics
    }
    onClickSort(item: any) {
        if (item.value == 100 && this.queryParams.odTp == 100) {
            return
        }
        if (item.value == 100 && this.queryParams.odTp != 100) {
            this.queryParams.pageIndex = 1
            this.queryParams.odTp = 100
            this.queryParams.odType = null
            this.reqNewData()
        }
        this.queryParams.pageIndex = 1
        if (this.queryParams.odTp != item.value) {
            this.queryParams.odTp = item.value
            this.queryParams.odType = 1
        } else {
            this.queryParams.odType = this.queryParams.odType == 1 ? 2 : 1
        }
        this.reqNewData()
    }
    onClickBtn(item: any) {
        this.formData = JSON.parse(JSON.stringify(item))
        if (!this.formData.pics) this.formData.pics = []
        this.popShow = true
    }
    clickHit(num: number) {
        if (this.formData.num + num <= 0) {
            this.formData.num = 0
            return
        }
        this.formData.num += num
    }
    onClickRarity(rarity: string) {
        this.formData.rarity = this.formData.rarity === rarity ? "" : rarity
    }
    async onClickAddUploadPics() {
        const uploadPics: any = await this.UploadClient.uploadImgs(9, "SplitCardReport/", ["camera", "album"])
        if (!uploadPics.length) {
            return
        }
        this.formData.pics.push(...uploadPics)
    }
    onClickDelPic(index: number) {
        this.formData.pics.splice(index, 1)
    }
    onClickOneCardConfirm() {
        if ((this.formData.num == 0 && this.formData.pics.length > 0) || (this.formData.num > 0 && this.formData.pics.length == 0)) {
            uni.showToast({
                title: "请核对中卡数量和中卡图片",
                icon: "none"
            })
            return
        }
        if (this.formData.num === 0 && this.formData.pics.length === 0) {
            this.clearSelect()
        } else {
            this.formData.hit = true
        }
        app.http.Post(`merchant/good/${this.queryParams.code}/doNoResult`, { ...this.formData, pics: this.formData.pics.join(",") }, (res: any) => {
            uni.showToast({
                title: "设置完成",
                icon: "success"
            })
            this.setListData()
            this.reqHitNum()
            this.popShow = false
        })
    }
    setListData() {
        const findIndex = this.list.findIndex((item: any) => {
            return item.id === this.formData.id
        })
        if (findIndex >= 0) {
            this.list[findIndex].hit = this.formData.hit
            this.list[findIndex].num = this.formData.num
            this.list[findIndex].rarity = this.formData.rarity
            this.list[findIndex].cfgLoc = this.formData.cfgLoc
            this.list[findIndex].pics = this.formData.pics
        }
    }
    clearSelect() {
        this.formData.num = 0
        this.formData.pics = []
        this.formData.rarity = ""
        this.formData.cfgLoc = false
        this.formData.hit = false
    }
    onClickToReview() {
        this.popShowRating = true

    }
    submitReview() {
        this.popShowRating = false
        uni.showModal({
            title: "提示",
            content: "确认提交审核",
            success: (res: any) => {
                if (res.confirm) {
                    app.http.Post(`merchant/good/${this.queryParams.code}/makeResult`, { rating: this.rating }, (res: any) => {
                        uni.showModal({
                            title: "提升",
                            content: "成功提交审核",
                            showCancel: false,
                            success: (res: any) => {
                                if (res.confirm) {
                                    app.platform.pageBack(1)
                                }
                            }
                        })
                    })
                }
            }
        })
    }
    showReason() {
        app.http.Get(`dataApi/merchant/good/${this.queryParams.code}/result/reason`, {}, (res: any) => {
            uni.showModal({
                title: "驳回原因",
                content: res.reason,
                showCancel: false
            })
        })
    }
    reqHitNum() {
        app.http.Get(`dataApi/merchant/good/${this.queryParams.code}/hitAllNum`, {}, (res: any) => {
            this.hitAllNum = res.hitNum
            this.markNum = res.markNum
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/merchant/good/${this.queryParams.code}/userNoList`, this.queryParams, (res: any) => {
            const list = res.list || []
            if (this.queryParams.pageIndex == 1) {
                this.totalPage = res.totalPage
            }
            this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
            if (this.queryParams.pageIndex == 1 && this.queryParams.tp == 100) this.totalCard = res.total
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f7f7f7;
}

.topSearchContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 750rpx;
    padding-top: 14rpx;
    position: fixed;
    top: 0;
    z-index: 2;

    .searchWrap {
        width: 710rpx;
        height: 72rpx;
        background: #F6F6F6;
        border-radius: 5rpx;
        display: flex;
        align-items: center;

        .searchTypeName {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #333333;
            // line-height: 34rpx;
            text-align: center;
            font-style: normal;
            margin-left: 20rpx;
        }

        .searchIcon {
            width: 16rpx;
            height: 12rpx;
            margin-left: 4rpx;
        }

        .gap {
            width: 2rpx;
            height: 36rpx;
            background-color: #DDDDDD;
            // border: 2rpx solid #DDDDDD;
            margin-left: 10rpx;
            margin-right: 16rpx;
        }

        .searchInput {
            flex: 1;
            margin-right: 20rpx;
            font-size: 24rpx;
            color: #333333;
        }
    }
}

.fakerTop {
    height: 260rpx;
}

.topMenu {
    display: flex;
    align-items: center;
    height: 90rpx;
    justify-content: space-between;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 100rpx;
    background-color: #ffffff;
    border-bottom: 2rpx solid #f7f7f7;

    .menuItem {
        width: 180rpx;
        text-align: center;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #bfbfbf;
        text-align: center;
        font-style: normal;
        position: relative;
        height: 90rpx;
        line-height: 90rpx;
        // margin-right: 100rpx;
    }

    .menuItem_select {
        color: #FA1545;
    }

    .menuItem_select::after {
        content: "";
        width: 180rpx;
        height: 2rpx;
        background: #FA1545;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}

.orderMenu {
    width: 750rpx;
    height: 88rpx;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .orderItem {
        display: flex;
        align-items: center;
        // height: 28rpx;

        .name {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #999999;
            line-height: 34rpx;
            text-align: left;
            font-style: normal;
        }

        .name_select {
            color: #FA1545;
        }
    }

    .picWrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        // height: 28rpx;
        margin-left: 4rpx;

        .orderPic {
            width: 16rpx;
            height: 8rpx;
            // margin-bottom: 6rpx;
            margin: 2rpx 0;
        }
    }
}

.cardItem {
    width: 710rpx;
    // height: 250rpx;
    background: #FFFFFF;
    border-radius: 8rpx;
    margin-top: 20rpx;
    box-sizing: border-box;
    padding: 20rpx 20rpx 24rpx 20rpx;

    .cardSetInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24rpx;

        .setTxt {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            text-align: left;
            font-style: normal;
        }

        .hitNum {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
            text-align: right;
            font-style: normal;
        }
    }

    .picsWrap {
        display: flex;
        margin-top: 20rpx;
        flex-wrap: nowrap;

        .picItem {
            width: 140rpx;
            height: 140rpx;
            position: relative;
            overflow: hidden;
            border-radius: 3rpx;
            margin-right: 38rpx;

            .pic {
                width: 100%;
                height: 100%;
            }
        }

        .picItem:last-child {
            margin-right: 0;
        }

        .picMask {
            width: 140rpx;
            height: 140rpx;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 3rpx;
            font-family: SFProText, SFProText;
            font-weight: 400;
            font-size: 28rpx;
            color: #FFFFFF;
            text-align: center;
            font-style: normal;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .cardName {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #333333;
        line-height: 34rpx;
        text-align: left;
        font-style: normal;
    }

    .border {
        width: 100%;
        height: 2rpx;
        background-color: #EEEEEE;
        margin-top: 20rpx;
        margin-bottom: 22rpx;
    }

    .userInfo {
        display: flex;
        align-items: center;

        .avatar {
            width: 40rpx;
            height: 40rpx;
            margin-right: 6rpx;
        }

        .userName {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: rgba(0, 0, 0, 0.9);
            text-align: left;
            font-style: normal;
            flex: 1;
        }

        .btn {
            width: 464rpx;
            height: 60rpx;
            border-radius: 5rpx;
            border: 2rpx solid #E0E0E0;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.9);
            text-align: right;
            font-style: normal;
        }
    }
}

.popContainer {
    width: 750rpx;
    height: 898rpx;
    background: #FFFFFF;
    border-radius: 10rpx 10rpx 0rpx 0rpx;
    box-sizing: border-box;
    padding: 0 32rpx;

    .topWrap {
        width: 100%;
        margin-top: 40rpx;
        // height: 44rpx;
        position: relative;

        .title {
            // width: 128rpx;
            height: 44rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 32rpx;
            color: rgba(0, 0, 0, 0.9);
            line-height: 44rpx;
            text-align: center;
            font-weight: bold;
        }

        .clear {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #0091FF;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            right: 8rpx;
        }
    }

    .popItem {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #000000;
        line-height: 40rpx;
        text-align: left;
        font-style: normal;
        display: flex;
        align-items: center;

        .dot {
            color: #FA1545;
        }
    }

    .numWrap {
        align-items: center;
        margin-top: 20rpx;

        .jian,
        .add {
            background-size: 100% 100%;
            width: 36rpx;
            height: 36rpx;
        }

        .jian {
            background-image: url(@/static/merchant/jian.png);
        }

        .add {
            background-image: url(@/static/merchant/add.png);
        }

        .centerNum {
            width: 84rpx;
            height: 36rpx;
            background-color: #EEEEEE;
            text-align: center;
            line-height: 36rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.9);
        }
    }



    .imageUploadWrap {
        display: flex;
        margin-top: 20rpx;
        width: 100%;

        .scroll {
            width: 100%;
            white-space: nowrap;
            display: flex;
            align-items: center;
        }

        .upload {
            width: 174rpx;
            height: 174rpx;
            background-color: #f3f3f3;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 3rpx;
            display: inline-block;
            position: relative;
            margin-right: 10rpx;

            .pic {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
            }

            .delPic {
                position: absolute;
                width: 40rpx;
                height: 40rpx;
                right: 6rpx;
                top: 6rpx;
            }
        }

        .upload:last-child {
            margin-right: 0rpx;
        }


    }

    .clickWrap {
        align-items: center;
        margin-top: 20rpx;

        .clickBtn {
            width: 162rpx;
            height: 58rpx;
            background: #F3F3F3;
            border-radius: 4rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.9);
            border-radius: 4rpx;
            margin-right: 24rpx;
            transition: background-color 0.2s;
        }

        .clickBtn_select {
            color: #ffffff;
            background-color: #FA1545;
        }
    }


}

.popBottomAction {
    justify-content: space-between;
    align-items: center;
    margin-top: 40rpx;
    // padding: 0 32rpx;
    // box-sizing: border-box;

    .cancelBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 196rpx;
        height: 84rpx;
        border-radius: 4rpx;
        border: 2rpx solid #E0E0E0;
        font-family: PingFangSC, PingFang SC;
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
    }

    .confirmBtn {

        display: flex;
        align-items: center;
        justify-content: center;
        width: 470rpx;
        height: 84rpx;
        background: #FA1545;
        border-radius: 4rpx;
        font-family: PingFangSC, PingFang SC;
        font-size: 32rpx;
        color: #FFFFFF;
        font-weight: bold;
    }
}

.bottomAction {
    background-color: #ffffff;
    width: 750rpx;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 32rpx;
    padding-top: 34rpx;

    .actionWrap {
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20rpx;

        .num {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
        }

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC, PingFang SC;
            font-weight: bold;
            font-size: 32rpx;
            color: #FFFFFF;
            width: 470rpx;
            height: 84rpx;
            background: #FA1545;
            border-radius: 4rpx;
        }
    }
}

.ratingContainer {
    width: 750rpx;
    // height: 520rpx;
    border-radius: 10rpx 10rpx 0rpx 0rpx;
    background-color: #ffffff;
    padding-bottom: 26rpx;
    box-sizing: border-box;
    padding: 0 28rpx;

    .topWrap {
        width: 100%;
        margin-top: 40rpx;
        // height: 44rpx;
        position: relative;

        .title {
            // width: 128rpx;
            height: 44rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 32rpx;
            color: rgba(0, 0, 0, 0.9);
            line-height: 44rpx;
            text-align: center;
            font-weight: bold;
        }
    }

    .ratingWrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // box-sizing: border-box;
        // padding: 0 28rpx;
        padding-top: 48rpx;

        .ratingItem {
            width: 338rpx;
            height: 64rpx;
            background-color: #F6F7F9;
            border-radius: 3rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #999999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }

        .ratingItem_select {
            background-color: rgba(250, 21, 69, 0.1);
            color: #FA1545;
        }
    }
}
</style>
