<template>
	<view class="content">
		<transitionNav ref='transitionNav' :transition="true" :needIconShadow="false" title="">
			<template v-slot:slotRight>
				<view class="playVideo" v-if="homeData.roomId" @click="onClickPlayVideo"></view>
				<!-- <view v-if="reportState==2" class="detailButton flexCenter" @click="showReason">驳回原因</view> -->
			</template>
		</transitionNav>
		<view class="topContainer" id="topContainer">
			<view class="merchantWrap">
				<muqian-lazyLoad :borderRadius="'50%'" :src="$parsePic(homeData.merchantLogo)" class="merchantImg"
					alt="" />
				<view class="merchantInfo">
					<view class="name">{{ homeData.merchantName }}</view>
					<view class="time">2024-05-01</view>
				</view>
				<view class="ratingWrap" @click="onClickGoodsRating">
					<view></view>
					<view class="ratingNum" v-if="homeData.ratingOpen || homeData.ratingScore > 0">{{
			homeData.ratingScore
		}}
					</view>
					<view class="ratingPeopleNum">
						<view class="txt">{{ homeData.ratingOpen ?
			`${homeData.ratingNum == 0 ? '暂无评分' : `${homeData.ratingNum}人已评分`}` : "暂未开启评分" }}</view>
						<image class="dotImg" src="@/static/goods/v2/sjxDot.png"></image>
					</view>
				</view>
			</view>
			<view class="reportSearchContainer">
				<view class="tapsWrap uni-flex">
					<view class="leftTaps" :class="{ leftTaps_select: tabTp === 1 }">
					</view>
					<view class="rightTaps" :class="{ rightTaps_select: tabTp === 2 }">
					</view>
					<view class="fakerTabs uni-flex">
						<view class="txt" @click="onClickTab(1, false)" :class="{ txt_select: tabTp === 1 }">拆卡报告</view>
						<view class="txt" @click="onClickTab(2, false)" :class="{ txt_select: tabTp === 2 }">拼团结果</view>
					</view>
				</view>
				<view class="fakerPlaceholder"></view>
				<view class="serachWrap">
					<view class="search">
						<view class="icon"></view>
						<input type="text" v-model="searchQ" class="input" @confirm="onConfirmQ" placeholder="请输入关键字搜索">
					</view>
				</view>
			</view>
		</view>
		<view class="a" :style="{ height: topPx + 'px' }"></view>
		<view class="listContainer">
			<template v-if="tabTp === 1">
				<template v-if="myHitList && myHitList.length">
					<view class="columnTxt">我的中卡</view>
					<view class="hitContainer">
						<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
							<view class="myHitCard" v-for="(item, index) in myHitList" :key="'myHitCard' + index">
								<view class="myHitCard_top">
									<muqian-lazyLoad class="img" :src="$parsePic(item.pics[0])"></muqian-lazyLoad>
									<view class="rarityWrap" v-if="item.rarity">
										<view class="rarityItem" v-for="s in item.rarity.split('')"></view>
									</view>
									<view class="picNum flexCenter" v-if="item.pics.length > 1">{{ item.pics.length }}
									</view>
								</view>
								<view class="cardNameWrap">
									<view class="noName u-line-2">
										<view class="cfgLoc" v-if="item.cfgLoc"></view>{{ item.no }}
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</template>
				<view class="columnTxt">其他中卡</view>
				<view class="resultCard" v-for="(item, index) in resultList" :key="index">
					<view class="resultCard_left">
						<view class="cardNameWrap">
							<view class="noName u-line-2">
								<view class="cfgLoc" v-if="item.cfgLoc"></view>{{ item.no }}
							</view>
						</view>
						<view class="userWrap">
							<muqian-lazyLoad class="avatar" :src="$parsePic(item.avatar)"
								borderRadius="50%"></muqian-lazyLoad>
							<view class="userName">{{ item.userName }}{{ item.isMy ? '(我)' : '' }}</view>
							<view class="flex1"></view>
							<view class="time">{{ $u.timeFormat(item.time, "yyyy-mm-dd") }}</view>
						</view>
					</view>
					<view class="resultCard_right">
						<view class="num flexCenter" v-if="item.pics.length > 1">{{ item.pics.length }}</view>
						<muqian-lazyLoad class="img" :src="$parsePic(item.pics[0])"></muqian-lazyLoad>
					</view>
				</view>
			</template>
			<template v-if="tabTp === 2">
				<view class="mergeWrap" @click="onClickTab(2, true)">
					<view class="txt">以{{ isMerge ? "用户" : "卡密" }}为单位</view>
					<view class="change"></view>
				</view>
				<view class="cardNoCard" v-for="(item, index) in  teamDataList " :key="index">
					<view class="userWrap">
						<muqian-lazyLoad class="avatar" :src="$parsePic(item.avatar)"
							borderRadius="50%"></muqian-lazyLoad>
						<view class="userName">{{ item.userName }}{{ item.isMy ? '(我)' : '' }}</view>
						<view class="flex1"></view>
						<view class="time">{{ $u.timeFormat(item.time || item.buyTime, "yyyy-mm-dd") }}</view>
					</view>
					<template v-if="isMerge">
						<view class="noName" v-for="noItem in item.noList">{{ noItem.no }}</view>
						<view class="loadMore" @click="mergeUserMoreNoList(item, index)"
							v-if="item.noList.length < item.total">点击展开{{ item.userName }}更多卡密</view>
					</template>
					<template v-else>
						<view class="noName">{{ item.no }}</view>
					</template>
				</view>
			</template>
			<view class="bottomSafeArea"></view>
		</view>
		<u-popup :show="ratingShow" mode="bottom" mask :safeAreaInsetBottom="true" @close="ratingShow = false"
			border-radius="3rpx" bgColor="rgba(255,255,255,1)">
			<view class="ratingContainer">
				<view class="title">我的评分</view>
				<view class="starContainer">
					<view class="star" :class="{ star_select: index <= userRatingScore }" v-for="index in 5"
						@click="onClickRatingStar(index)">
						<view class="txt" :class="{ txt_select: index <= userRatingScore }">{{ RatingMap[index]
							}}
						</view>
					</view>
				</view>
				<view class="btnContainer" v-if="!userBeforeHasScore">
					<view class="btn btn_w" @click="ratingShow = false">取消</view>
					<view class="btn btn_r" @click="onClickSubmitRating">确定</view>
				</view>
				<!-- <view class="topWrap">
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
                </view> -->
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../base/BaseNode.vue';
import { getGoodsImg, parsePic } from "../../tools/util";
import { anonymousInfo } from "./manager/detailsManager"
const Tab = {
	0: '拼团结果',
	1: '拆卡报告'
}
const RatingMap: any = {
	1: "平平淡淡",
	2: "一般",
	3: "还行",
	4: "起飞",
	5: "欧气爆棚"
}
const ListParams = {
	pageIndex: 1,
	pageSize: 10,
}
class CardParams {
	fromId = 0;
	fetchSize = 10;
	remainNum = -1;
}
@Component({})
export default class ClassName extends BaseNode {
	navigateBack = app.navigateTo.navigateBack;
	parsePic = parsePic;
	getGoodsImg = getGoodsImg;
	goPersonHome = app.navigateTo.goPersonHome;
	RatingMap = RatingMap
	defaultAvatar = app.defaultAvatar;
	tabList = Tab;
	chooseId = 0;
	goodCode = '';
	teamDataList: any = [];
	listParams = { ...ListParams };
	searchQ = '';
	noMore = false;
	hasRandom = false;
	showRulePopup = false;
	randomList: any = [];
	cardNoParams = new CardParams();
	homeData: any = {}
	topPx: number = uni.upx2px(660)
	queryParams: any = {
		pageIndex: 1,
		pageSize: 10,
		q: ""
	}
	q: string = ""
	tabTp: number = 2
	// list:any=[]
	resultList: any = []//拆开报告
	cardNoList: any = []//拼团结果
	isMerge: boolean = false
	mergeParams: any = {
		fetchFrom: 1,
		fetchSize: 10,
	}
	ratingShow: boolean = false
	userRatingScore: number = 0;
	userBeforeHasScore: boolean = false
	isFetchEnd: boolean = true
	myHitList: any = null
	onLoad(query: any) {
		if (query.chooseIds) {
			this.chooseId = +query.chooseIds;
			this.goodCode = query.code
			if (query.random == 'true') {
				app.http.Get('dataApi/good/' + this.goodCode + '/select/hasRandom', {}, (res: any) => {
					this.hasRandom = res.has;
				})
			}
			this.reqHomeData()
			this.getList()

		}
	}
	//   加载更多数据
	onReachBottom() {
		if (this.isFetchEnd) return
		if (this.tabTp == 2) {
			if (this.isMerge) {
				this.mergeParams.fetchFrom += this.mergeParams.fetchSize
			}
			this.getCardNo()
		} else if (this.tabTp == 1) {
			this.queryParams.pageIndex += 1
			this.getResult()
		}
	}
	getList() {
		// if (this.noMore) return;
		if (this.chooseId != 0) {
			this.tabTp = 1
			this.reqMyHit()
			this.getResult()

		} else {
			this.tabTp = 2
			this.getCardNo()
		}
	}
	onClickPlayVideo() {
		app.platform.goZgLive({ playCode: this.homeData.playCode, state: 3, goodCode: this.goodCode,alias:this.homeData.merchantAlias,roomID:this.homeData.roomId })
	}
	getCardNo() {
		if (this.isMerge) {
			app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/result/merge`, { ...this.mergeParams, q: this.searchQ }, (res: any) => {
				const list = (res.list || []).map((item: any) => {
					if (item.anonymous) {
						item.userName = anonymousInfo.userName
						item.avatar = anonymousInfo.avatar
					}
					return item
				})
				this.teamDataList.push(...list)
				this.isFetchEnd = res.isFetchEnd
			})
		} else {
			const { cardNoParams } = this;
			app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/result`, { ...cardNoParams, q: this.searchQ }, (res: any) => {
				if (res.list) {
					const list = res.list.map(({ anonymous, dicKey, ...rest }: any) => {
						const userData = anonymous ? anonymousInfo : res.dic[dicKey];
						return { ...rest, anonymous, ...userData }
					})
					this.teamDataList = this.teamDataList.concat(list)
				}
				this.isFetchEnd = res.isFetchEnd
				cardNoParams.fromId = this.teamDataList[this.teamDataList.length - 1].id;
				cardNoParams.remainNum = res.remainNum || -1
			})
		}
	}
	onConfirmQ() {
		if (this.tabTp == 1) {
			this.queryParams.pageIndex = 1
			this.getResult()
		} else {
			if (this.isMerge) this.isMerge = false
			this.teamDataList = []
			this.mergeParams.fetchFrom = 1
			this.cardNoParams.fromId = 0
			this.getCardNo()
		}
	}
	onClickTab(tp: number, isOnclickMerge: boolean) {
		if (this.tabTp === tp && !isOnclickMerge) return
		if (isOnclickMerge) this.isMerge = !this.isMerge
		this.tabTp = tp
		if (tp == 2 && !this.isMerge) {
			this.teamDataList = []
			this.cardNoParams.fromId = 0
			this.getCardNo()
		} else if (tp == 2 && this.isMerge) {
			this.teamDataList = []
			this.mergeParams.fetchFrom = 1
			this.getCardNo()
		} else if (tp == 1) {
			this.queryParams.pageIndex = 1
			if (this.myHitList === null) {
				this.reqMyHit()
			}
			this.getResult()

		}
	}
	getResult() {
		app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/cardNoResult`, { ...this.queryParams, q: this.searchQ }, (res: any) => {
			const list = (res.list || []).map((item: any) => {
				item.pics = item.pic.split(",")
				const userData = item.anonymous ? anonymousInfo : {}
				return { ...item, ...userData }
			})
			this.queryParams.pageIndex == 1 ? this.resultList = list : this.resultList.push(...list)
		})
	}
	mergeUserMoreNoList(item: any, index) {
		app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/result/merge/noMore`, { fromId: item.noList[item.noList.length - 1].id, fetchSize: 50 }, (res: any) => {
			const list = res.list || []
			item.noList.push(...list)
		})
	}
	resetList() {
		this.listParams = { ...ListParams };
		this.cardNoParams = new CardParams();
		this.noMore = false;
		this.teamDataList = [];
	}
	reqSearchList() {
		this.resetList();
		this.getList()
	}
	onClickGoodsRating() {
		if (!this.homeData.ratingOpen) return
		this.userRatingScore = this.homeData.userRatingScore
		this.ratingShow = true
	}
	onClickRatingStar(score: number) {
		if (this.userBeforeHasScore) return
		this.userRatingScore = score
	}
	onClickSubmitRating() {
		app.http.Post(`good/${this.goodCode}/result/rating`, { score: this.userRatingScore }, (res: any) => {
			this.ratingShow = false
			uni.showToast({
				title: "评分成功"
			})
			this.reqHomeData()
		})
	}
	// onClickTab(index: number) {
	// 	this.chooseId = index;
	// 	this.reqSearchList()
	// }
	onClickRandomMx() {
		if (this.randomList == '') {
			app.http.Get('dataApi/good/' + this.goodCode + '/select/randomNo', {}, (res: any) => {
				this.randomList = res.list;
				this.showRulePopup = true;
			})
		} else {
			this.showRulePopup = true;
		}
	}
	onClickPreviewCard(pic: any) {
		const urls = pic.split(',').map((x: any) => parsePic(x))
		uni.previewImage({ urls });
	}
	replacePic(str: string) {
		return str.indexOf('#thumb') == -1 ? str : str.replace('#thumb', '.thumb')
	}
	reqHomeData() {
		app.http.Get(`dataApi/good/${this.goodCode}/result/home`, {}, (res: any) => {
			this.homeData = res.data
			this.userBeforeHasScore = this.homeData.userRatingScore != 0
		})
	}
	reqMyHit() {
		app.http.Get(`dataApi/good/${this.goodCode}/my/cardNoResult`, {}, (res: any) => {
			this.myHitList = res.list || []
			console.log(this.myHitList);

		})
	}
}
</script>

<style lang="scss">
$font-22: 22rpx;
$font-24: 24rpx;
$font-32: 32rpx;

page {
	background-color: #f5f5f7;
}

.playVideo {
	width: 40rpx;
	height: 40rpx;
	background-size: 100% 100%;
	background-image: url("@/static/goods/v2/playVideo.png");
}

.topContainer {
	width: 750rpx;
	height: 660rpx;
	background-image: url("@/static/goods/v2/reportBanner.png");
	background-size: 100% 100%;
	position: fixed;
	top: 0;
	z-index: 6;
}

.merchantWrap {
	width: 576rpx;
	height: 136rpx;
	// background-color: rgba(255, 255, 255, .4);
	margin: 0 auto;
	margin-top: 316rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 50rpx;

	.merchantImg {
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}

	.merchantInfo {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 80rpx;
		margin-left: 10rpx;
		flex: 1;

		.name {
			font-weight: bold;
			font-size: 28rpx;
			color: #FFFFFF;
		}

		.time {
			font-weight: 400;
			font-size: 20rpx;
			color: #999999;
		}
	}

	.ratingWrap {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 80rpx;
		position: relative;

		.ratingPeopleNum {

			display: flex;
			align-items: center;

			.txt {
				font-weight: 400;
				font-size: 20rpx;
				color: #FFFFFF;
				letter-spacing: 1rpx;
			}

			.dotImg {
				width: 16rpx;
				height: 16rpx;
			}
		}



		.ratingNum {
			font-family: Impact;
			font-size: 72rpx;
			color: #FA1545;
			position: absolute;
			right: 0;
			bottom: 10rpx;
		}
	}
}

.reportSearchContainer {
	position: absolute;
	bottom: 0rpx;

	.fakerPlaceholder {
		width: 750rpx;
		height: 119rpx;
	}

	.tapsWrap {
		position: relative;
		width: 750rpx;

		.leftTaps {
			background-size: 100% 100%;
			background-image: url("@/static/goods/v2/noneSelectTaps_left.png");
			position: absolute;
			left: 0;
			z-index: 2;
			pointer-events: none;
			width: 406rpx;
			height: 116rpx;
			border-radius: 10rpx;

			.txt {
				margin-left: 124rpx;
			}
		}

		.leftTaps_select {
			background-size: 100% 100%;
			background-image: url("@/static/goods/v2/leftReport.png");
			width: 750rpx;
			height: 119rpx;
		}

		.rightTaps {
			background-size: 100% 100%;
			background-image: url("@/static/goods/v2/noneSelectTaps.png");
			width: 406rpx;
			height: 116rpx;
			position: absolute;
			right: 0;
			z-index: 1;
			pointer-events: none;

			.txt {
				margin-right: 124rpx;
			}
		}

		.rightTaps_select {
			background-size: 100% 100%;
			background-image: url("@/static/goods/v2/rightReport.png");
			z-index: 3;
			width: 750rpx;
			height: 119rpx;

			.txt {
				color: #ADADB0;
			}
		}

		.fakerTabs {
			width: 750rpx;
			position: absolute;
			top: 0;
			display: flex;
			z-index: 3;

			margin-top: 28rpx;

			// box-sizing: border-box;
			.txt {
				width: 50%;
				text-align: center;
				font-weight: bold;
				font-size: 32rpx;
				color: #ADADB0;
				// margin-top: 26rpx;
			}

			.txt_select {
				font-weight: bold;
				font-size: 32rpx;
				color: #333333;
			}
		}
	}

	.serachWrap {
		width: 750rpx;
		height: 72rpx;
		background-image: linear-gradient(0deg, #f5f5f7, #f9f9fa);

		.search {
			width: 710rpx;
			height: 72rpx;
			background: rgba(0, 0, 0, 0.04);
			border-radius: 5rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			padding: 0 22rpx;
			margin: 0 auto;

			.icon {
				width: 32rpx;
				height: 34rpx;
				background-size: 100% 100%;
				background-image: url("@/static/goods/v2/searchNew.png");
				margin-right: 14rpx;
			}

			.input {
				font-weight: 400;
				font-size: 28rpx;
				flex: 1;
			}
		}
	}
}

.cfgLoc {
	width: 86rpx;
	height: 24rpx;
	background-size: 100% 100%;
	background-image: url("@/static/goods/v2/locCfg.png");
	display: inline-block;
	margin-right: 8rpx;
}

.listContainer {
	width: 750rpx;
	box-sizing: border-box;
	padding: 0 20rpx;
	margin-top: 24rpx;

	.hitContainer {
		width: 100%;
		display: flex;
		margin-bottom: 36rpx;

		.scroll {
			width: 100%;
			white-space: nowrap;
			display: flex;
			align-items: center;
		}
	}

	.myHitCard {
		display: inline-block;
		background-color: #ffffff;
		width: 346rpx;
		height: 428rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		overflow: hidden;
		margin-right: 18rpx;

		.myHitCard_top {
			position: relative;
			width: 346rpx;
			height: 320rpx;
			flex: 1;

			.img {
				width: 346rpx;
				height: 320rpx;
			}

			.picNum {
				width: 32rpx;
				height: 32rpx;
				background: rgba(0, 0, 0, 0.4);
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				position: absolute;
				right: 0;
				top: 0;
			}

			.rarityWrap {
				position: absolute;
				display: flex;
				align-items: center;
				top: 8rpx;
				left: 8rpx;

				.rarityItem {
					background-size: 100% 100%;
					background-image: url("@/static/goods/v2/s.png");
					width: 18rpx;
					height: 18rpx;
					margin-right: 8rpx;
				}
			}
		}

		.cardNameWrap {
			width: 100%;
			box-sizing: border-box;
			padding: 0 16rpx;
			margin-top: 16rpx;
			height: 100%;
			white-space: wrap;

			// display: flex;
			// background-color:#000000;
			.noName {
				font-weight: 400;
				font-size: 24rpx;
				color: #333333;
				line-height: 34rpx;
			}


		}
	}

	.myHitCard:last-child {
		margin-right: 0rpx;
	}

	.columnTxt {
		font-weight: bold;
		font-size: 28rpx;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.userWrap {
		display: flex;
		align-items: center;

		.avatar {
			width: 36rpx;
			height: 36rpx;
			margin-right: 8rpx;
		}

		.flex1 {
			flex: 1;
		}

		.userName {
			font-weight: 400;
			font-size: 20rpx;
			color: #666666;
		}

		.time {
			font-weight: 400;
			font-size: 20rpx;
			color: rgba(51, 51, 51, 0.3);
		}
	}

	.resultCard {
		width: 710rpx;
		height: 192rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		box-sizing: border-box;
		// padding: 0rpx 0 20rpx 0rpx;
		padding-left: 20rpx;
		margin-bottom: 20rpx;
		display: flex;

		.resultCard_left {
			flex: 1;
			box-sizing: border-box;
			padding: 20rpx 0rpx;
			padding-right: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.cardNameWrap {

				// display: flex;
				.noName {
					font-weight: 400;
					font-size: 24rpx;
					color: #333333;
					line-height: 34rpx;
				}


			}


		}

		.resultCard_right {
			width: 154rpx;
			height: 192rpx;
			position: relative;

			.num {
				width: 28rpx;
				height: 28rpx;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 0rpx 3rpx 0rpx 3rpx;
				font-weight: 400;
				font-size: 20rpx;
				color: #FFFFFF;
				position: absolute;
				top: 0;
				right: 0;
				z-index: 3;
			}

			.img {
				width: 154rpx;
				height: 192rpx;
			}
		}
	}

	.mergeWrap {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-bottom: 20rpx;

		.change {
			background-size: 100% 100%;
			background-image: url("@/static/goods/v2/change.png");
			width: 28rpx;
			height: 20rpx;
			margin-left: 4rpx;
		}

		.txt {
			font-weight: 400;
			font-size: 24rpx;
			color: #333333;
		}
	}

	.cardNoCard {
		width: 710rpx;
		// height: 200rpx;
		box-sizing: border-box;
		padding: 24rpx 20rpx;
		margin-bottom: 20rpx;
		background-color: #ffffff;

		.noName {
			font-weight: 400;
			font-size: 24rpx;
			color: #333333;
			line-height: 34rpx;
			margin-top: 12rpx;
			border-bottom: 2rpx solid rgba(0, 0, 0, .1);
			padding-bottom: 20rpx;
		}

		.noName:last-child {
			border: 0;
			padding-bottom: 0;
		}

		.loadMore {
			text-align: center;
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #000000;
		}
	}
}

.ratingContainer {
	width: 750rpx;
	background-color: #ffffff;

	.title {
		text-align: center;
		font-weight: bold;
		font-size: 32rpx;
		color: #333333;
		margin: 40rpx 0 60rpx 0;
	}

	.starContainer {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 100rpx;
		justify-content: space-between;
		width: 750rpx;
		margin-bottom: 136rpx;

		.star {
			background-size: 100% 100%;
			width: 56rpx;
			height: 56rpx;
			position: relative;
			background-image: url("@/static/goods/v2/rating.png");
		}

		.star_select {
			background-image: url("@/static/goods/v2/rating_select.png");
		}

		.txt {
			font-weight: 400;
			font-size: 20rpx;
			color: #333333;
			position: absolute;
			left: 50%;
			bottom: 0%;
			transform: translate(-50%, 0%);
			bottom: -34rpx;
			white-space: nowrap;
		}

		.txt_select {
			font-weight: 400;
			font-size: 20rpx;
			color: #FA1545;
		}
	}

	.btnContainer {
		width: 750rpx;
		box-sizing: border-box;
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		// margin-top: 68rpx;
		padding-bottom: 26rpx;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 84rpx;
			border-radius: 5rpx;
		}

		.btn_w {
			background-color: #ffffff;
			border: 2rpx solid #E0E0E0;
			font-weight: bold;
			font-size: 32rpx;
			color: #333333;
			width: 196rpx;
		}

		.btn_r {
			background-color: #FA1545;
			border: 2rpx solid #FA1545;
			font-weight: bold;
			font-size: 32rpx;
			color: #ffffff;
			width: 470rpx;
		}
	}
}
</style>
