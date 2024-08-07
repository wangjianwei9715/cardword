
<template>
	<view class="detail-container" :class="{'body-hidden':choiceTeamData.teamCheckShow||choiceTRData.show}">
		<transitionNav ref='transitionNav' title=" " :navBgImage="picData.carousel[swiperCurrent]" :needIconShadow="false">
			<template v-slot:custom>
                <view class="custom-nav-center">
                    <input class="nav-input" :adjust-position="false" type="text" v-model="navSearchText" confirm-type="search" @confirm="onClickSearch()" />
                </view>
            </template>
			<template slot="slotRight">
				<view class="custom-nav-right">
					<view class="icon-weixin" @click="onClickKefu()"></view>
					<view class="icon-ttf" @click="onClickShare()">&#xe537;</view>
				</view>
            </template>
        </transitionNav>
		<statusbar/>
		<!-- 商品图片 -->
		<detailCarousel :carousel="picData.carousel" :current.sync="swiperCurrent" :yfLength="(goodsData.pic&&goodsData.pic.yuanfeng)?goodsData.pic.yuanfeng.length:0"/>
		<view class="detail-index-bg">
			<!-- 详情头部信息 -->
			<view class="detail-header">
				<view class="detail-header-bg"></view>
				<view class="header-base">
					<view class="base-left">
						<view class="header-price">
							¥<text>{{goodsData.price}}</text>
						</view>
						<baseCard :getPriceStart="getPriceStart"/>
					</view>
					<view v-if="[0,1].includes(goodsData.state)" class="time-container">
						<u-count-down :time="countDown*1000" format="DD:HH:mm:ss" autoStart @change="onChangeCountDown" @finish="onFinishCountDown">
							<view class="countdown-box">
								<view v-for="(item,index) in countDownList" :key="index" :class="[`countdown-${item.type=='str'?'doc':'custom'}`]">
									{{item.type=='str'?item.name:countDownStr(item.name)}}
								</view>
							</view>
						</u-count-down>
					</view>
					<view v-else class="time-container">拼团已完成</view>
				</view>
				<goodCouponGet :goodCode="goodsData.goodCode" :goodPage="true" :list="getCouponList" />
				<scroll-view class="header-discount" :scroll-x="true" v-if="goodsData.discount">
					<view class="discount-item" v-for="(item,index) in goodsData.discount" :key="`discount_${index}`">
						<view class="discount-text">满{{item.minNum}}组丨每组{{item.price}}元</view>
					</view>
				</scroll-view>
				<view class="goods-title u-line-2">{{goodsData.title}}</view>
			</view>
			<!-- 进度条 -->
			<view class="goods-progress" :style="progressStyle">
				<view class="progress-mask" :style="{width:(100-planData.width)+'%'}"> </view>
			</view>
			<!-- 规格 玩法 进度 -->
			<specPlay :data="specPlayData"/>
			<!-- 车队 -->
			<motorcade :goodsData="goodsData" :showChedui.sync="showCheduiDraw" :cheduiData="cheduiData" :userData="userData"/>
			<!-- 卡密奖励 -->
			<noAward ref="rNoAward" :price="goodsData.price" :state="goodsData.state" @buy="onClickBuy"/>
			<!-- 活动展示 -->
			<goodAct :goodsData="goodsData" />
			<!-- 购买记录 -->
			<buyRecord :list="buyRecordList"/>
			<!-- 预售商品 -->
			<detailBook v-if="goodsData.book" :book="goodsData.book"/>
			<!-- 卖家信息 -->
			<detailMerchant v-if="goodsData.publisher" :publisher="goodsData.publisher" @publisherFollowed="goodsData.publisher.followed=$event"/>
			<!-- 商品详情 -->
			<detailDesc v-if="!detilIsEmpty" :goodsData="goodsData"/>
			<!-- 购买须知 -->
			<detailExplain/>
		</view>
		<!-- 猜你喜欢 -->
		<guessYouLikeIt v-if="goodCode" :goodCode="goodCode" />
		<!-- 直播可拖动控件 -->
		<movable-area class="movable-area" v-if="goodsData.broadcast">
			<movable-view class="movable-content" direction="all" x="530rpx" y="750rpx">
				<livewicket :liveImg="decodeURIComponent(goodsData.broadcast.pic)"
					:liveStatus="goodsData.broadcast.name" @live="onClickLive"></livewicket>
			</movable-view>
		</movable-area>

		<!-- 底部按钮 -->
		<view class="bottom-container" v-if="goodsData.state>=1||(goodsData.state==0&&getPriceStart)">
			<view class="bottom-container-left">
				<view v-if="myJoined" class="bottom-container-left-index" @click="onClickMyCard()">
					<image class="bottom-icon" src="@/static/goods/v3/icon_card_my.png" mode="aspectFill" />
					<view class="bottom-container-left-index-name">我的卡密</view>
				</view>
				<view class="bottom-container-left-index" @click="onClickAllCard()">
					<view v-if="goodsData.zuheche==1" class="icon-zuheche">增加车位</view>
					<image class="bottom-icon" src="@/static/goods/v3/icon_card.png" mode="aspectFill" />
					<view class="bottom-container-left-index-name">卡密列表</view>
				</view>
			</view>
			<view class="btn-confirm" @click="onClickBuy()" v-if="goodsData.state<=1">
				{{isRandomType?'选择编号':'立即购买'}}
			</view>
			<view v-else class="btn-container">
				<view class="btn-small btn-pt" @click="onClickResult(0)">拼团结果</view>
				<view class="btn-small" @click="onClickResult(1)">拆卡报告</view>
			</view>
		</view>
		<share :operationShow="shareObj.shareShow" :shareData="shareObj.shareData" :favorType.sync="favorType" :goodCode="goodCode" @operacancel="shareObj.shareShow=false" />

		<!-- 自选球队 -->
		<checkTeamPay :teamCheckShow="choiceTeamData.teamCheckShow" :choiceTeamData="choiceTeamData"
			@teamPaycancel="onClickTeamCheckCancel" @teamCheck="onClickTeamCheck" @branchCheck="onClickBranchCheck"
			@cartDel="onClickDeleteCart" @joinCart="joinCart" @baodui="onClickBaodui" @settlement="onClickSettlement"
			@buyRandomGood="onClickBuyRandomGood" @randomCountOver="getGoodSelect" />

		<!-- 自选球队随机 -->
		<checkTeamRandom :teamRandomShow="choiceTRData.show" :teamRandomData="choiceTRData.data"
			:teamrandomGood="choiceTRData.rData" :teamrandomRemainder="choiceTRData.remainder" :type="goodsData.pintuan_type"
			@teamRandomCancel="onClickteamRandomCancel" @cardCode="onClickAllCard" @buy="onClickTeamBuy"
			@randomBuy="onClickTeamRandomBuy" @randomCountOver="getGoodSelectTeamRandom" />

		<!-- 免单 -->
		<view class="guess-num-box" v-if="goodsData.freeNoNum>0">
			<view class="guess-num-center">
				<image class="guess-mini" src="../../pages/act/static/guess/guess_mini.png"></image>
				可免单{{goodsData.freeNoNum}}组
			</view>
		</view>
		
		<customerService :show.sync="customerServiceShow" :kefu="goodsData.kefu" :goodCode="goodCode" :kefuWechat="goodsData.publisher&&goodsData.publisher.kefu_wechat"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { gameplayType, countDownList } from "@/tools/DataExchange"
	import { parsePic } from "@/tools/util";
	import { Goods, Share } from "./utils/class";
	import detailCarousel from "./component/detailCarousel.vue"
	import detailsManager from "./manager/detailsManager"
	import noAward from "./component/noAward.vue"
	import customerService from "./component/customerService.vue"
	import motorcade from "./component/motorcade.vue"
	import baseCard from "./component/baseCard.vue"
	import specPlay from "./component/specPlay.vue"
	import buyRecord from "./component/buyRecord.vue"
	import detailMerchant from "./component/detailMerchant.vue"
	import detailBook from "./component/detailBook.vue"
	import detailDesc from "./component/detailDesc.vue"
	import detailExplain from "./component/detailExplain.vue"
	const Manager =  detailsManager.getIns();
	@Component({
		components:{ 
			detailCarousel, noAward, customerService, motorcade, baseCard, specPlay, buyRecord, detailMerchant, detailBook, detailDesc, detailExplain
		}
	})
	export default class ClassName extends BaseNode {
		parsePic = parsePic;
		countDownList = countDownList;
		navigateBack = app.navigateTo.navigateBack;
		isPullDown = app.platform.isPullDown;
		defaultAvatar = app.defaultAvatar;
		goodsManaager:any = app.goods;
		shareObj = {
			shareShow:false,
			shareData:new Share()
		};
		buyRecordList:any = [];
		favorType = false;
		picData:any = Goods.Pic();
		goodCode = '';
		goodsData: any = [];
		choiceTeamData:any = Goods.ChoiceTeam();
		choiceTRData:any = Goods.ChoiceTR();
		payChannel: any = [];// 支付方式
		source="";
		planData = Goods.Plan()
		getCouponList:any = [];// 可领取优惠券列表
		userData = app.data;
		cheduiData = {};
		showCheduiDraw = false;
		cheduiDataAva:any = '';
		AD_id=null;
		referer="";//来源
		customerServiceShow=false;
		countDown = 0;
		countDownData:any={};
		myJoined=false;
		swiperCurrent=0;
		navSearchText="";
		onLoad(query: any) {
			// #ifndef MP
			const goodCode = query.goodCode ||query.id
			this.goodCode = goodCode;
			this.source=query.source
			this.AD_id = query.AD_id || null;
			this.referer = query.referer;
			this.getGoodData(()=>{
				this.getOrtherData()
			});
			// #endif
		}
		onShow() {
			if (!this.detilIsEmpty) {
				this.getGoodData();
				// this.onClickteamRandomCancel()
			}
		}
		onPageScroll(data: any) {
			//@ts-ignore
			this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
		}
		//   下拉刷新
		onPullDownRefresh() {
			this.getGoodData(() => {
				this.getOrtherData()
				uni.stopPullDownRefresh();
			})
		}
		// 进度条颜色
		public get progressStyle() :any {
			const { progressLeft, progressRight } = gameplayType[this.goodsData.pintuan_type] || {}
			return {
				'background': `linear-gradient(to right,${progressLeft},${progressRight})`
			}
		}
		public get detilIsEmpty () : boolean {
			return uni.$u.test.isEmpty(this.goodsData)
		}
		// 自选随机类型
		public get isRandomType() : boolean{
			return [10,11,12].includes(this.goodsData.pintuan_type)
		}
		public get getPriceStart() : boolean {
			const { goodsData } = this
			return goodsData.isSelect || goodsData.pintuan_type == 11 || goodsData.pintuan_type == 12
		}
		// 商品剩余数量
		public get goodSurplusNum() : number {
			const { goodsData } = this;
			return goodsData.totalNum - (goodsData.currentNum + goodsData.lockNum)
		}
		// 已售数量
		public get goodSaled() : number {
			const { currentNum, lockNum } = this.goodsData;
			return (currentNum + lockNum)
		}
		// 拼团类型信息
		public get goodsInfo() : any {
			if(this.detilIsEmpty) return {};
			const { spec, pintuan_type } = this.goodsData
			return {
				num:spec.name || "",
				pt_type:this.goodsManaager.gameplayType[pintuan_type] || ""
			}
		}
		public get specPlayData() : any {
			if(this.detilIsEmpty) return {};
			const { spec, pintuan_type, totalNum } = this.goodsData
			return {
				spec:`${spec.name}·${spec.num>0?spec.num+'张':'暂无'}` || "",
				pintuan_type:this.goodsManaager.gameplayType[pintuan_type] || "",
				progress:`余${this.goodSurplusNum}/${totalNum}`
			} 
		}
		onChangeCountDown(e:any){
			this.countDownData = e
		}
		countDownStr(name){
			const time = this.countDownData[name]
			return time>=10?time:'0'+time
		}
		// 数据详情赋值
		getGoodData(cb?:Function) {
			const goodCode = this.goodCode;
			app.http.GetWithCrypto(`dataApi/good/${goodCode}/1/detail`, {referer:this.detilIsEmpty?this.referer:"PageRefresh"}, (data: any) => {
				this.favorType = data.favorite>0;
				this.goodsData = data.good;
				this.payChannel = data.payChannel || [];
				this.planData = Manager.detailsPlan(this.goodsData);
				this.myJoined = data.joined;
				const { bit, state, leftsec, overAt, startAt } = data.good;
				if((bit & 128) == 128){
					app.http.Get(`dataApi/good/${goodCode}/chedui`,{},(res:any)=>{
						this.cheduiData = res
					})
				}
				// 倒计时
				this.countDown = state == 0 ? (leftsec-(overAt-startAt)) : leftsec;
				this.getGoodsImage();
				cb && cb()
			})
		}
		async getOrtherData(){
			// 拼团商品卡密奖励轮播图
			this.$refs.rNoAward.getLamp(this.goodCode)
			// 购买记录
			if (this.goodsData.state == 1) {
				Manager.getBuyRecord(this.goodCode,(list:any)=>{
					this.buyRecordList = list;
				})
			};
			// 查询可领取优惠券
			setTimeout(()=>{
				Manager.queryCoupon(this.goodsData,(list:any)=>{
					this.getCouponList = list
				})
			},200)
		}
		/**
		 * 设置商品图片
		 */
		getGoodsImage() {
			const { picData, goodsData } = this;
			const goodsPic = goodsData.pic;
			const carousel = picFormat(goodsPic.carousel);
			picData.carousel = [...carousel,...picFormat(goodsPic.yuanfeng)];
			if(goodsPic.thumb){
				goodsPic.thumb = picFormat(goodsPic.thumb);
			}
			function picFormat(pic:any[]){
				return pic ? pic.map(x => parsePic(x)) : [];
			}
		}
		/**
		 * 倒计时结束
		 */
		onFinishCountDown(){
			const { state } = this.goodsData
			if(state == 0){
				this.getGoodData();
			} else {
				this.goodsData.state = -99
			}
		}
		onClickMyCard(){
			const { pintuan_type, state, pic } = this.goodsData;
			uni.navigateTo({ 
				url:`/pages/userinfo/order_myCard?goodCode=${this.goodCode}&pintuanType=${pintuan_type}&type=0&goodJump=true&state=${state}&pic=${encodeURIComponent(pic.carousel[0])}` 
			})
		}
		onClickAllCard(data ? : any) {
			const { goodCode, pintuan_type, zuheche=0} = this.goodsData;
			const url = `/pages/goods/all_good_card?code=${goodCode}&type=${pintuan_type}${data?`&teamId=${data.id}`:''}&zuhecheTp=${zuheche}`;
			uni.navigateTo({ url })
		}
		// 客服
		onClickKefu(){
			app.platform.UIClickFeedBack(); 
			this.customerServiceShow=true
		}
		// 分享
		onClickShare() {
			app.platform.UIClickFeedBack(); 
			const { shareObj } = this;
			const { goodCode, title, pic} = this.goodsData;
			if (!shareObj.shareShow) {
				if (shareObj.shareData.shareUrl == '') {
					shareObj.shareData = {
						shareUrl: `share/h5/#/pages/goods/goods_details?id=${goodCode}`,
						title,
						summary: title,
						thumb: (pic.thumb&&pic.thumb[0])||this.picData.carousel[0]+`?x-oss-process=image/resize,h_100,w_100`
					}
				}
				shareObj.shareShow = true
			}
		}
		onClickBuy() { 
			app.platform.hasLoginToken(() => {
				const { goodsData, getPriceStart, goodSurplusNum } = this; 
				if (getPriceStart) { this.isPullDown(false) } 
				if (goodsData.isSelect) { 
					// 处理购买自选球队 
					this.handleSelectTeam() 
				} else if ([11, 12].includes(goodsData.pintuan_type)) { 
					// 处理购买自选随机球队 
					this.handleSelectTeamRandom() 
				} else if (goodSurplusNum <= 0) { 
					// 售罄
					uni.showToast({ title: '该商品已售罄', icon: 'none' }) 
					return 
				} else { 
					// 普通类型购买
					this.navigateToConfirmOrder() 
				} 
			}) 
		}
		// 处理购买自选球队 
		handleSelectTeam() { 
			this.getGoodSelect(() => { 
				this.getGoodSelectBranch(); 
				this.getGoodSelectCart();
				this.choiceTeamData.teamCheckShow = true;
			}) 
		}
		// 处理购买自选随机球队 
		handleSelectTeamRandom() { 
			this.getGoodSelectTeamRandom(() => { this.choiceTRData.show = true }) 
		}
		onClickResult(chooseID: number) {
			let random = this.goodsData.pintuan_type == 10 ? true : false
			uni.navigateTo({
				url: `goods_result_list_new?chooseIds=${chooseID}&code=${this.goodCode}&random=${random}`
			})
		}
		onClickLive() { 
			if (this.source=='livePage') { 
				uni.navigateBack({ delta: 1 }); 
				return 
			}
			const { broadcast, publisher } = this.goodsData; 
			if (broadcast.third && broadcast.third === 1001) { 
				app.platform.goZgLive({ 
					roomID: broadcast.roomId, 
					merchantId: publisher.id, 
					state: broadcast.state, 
					playCode: broadcast.playCode, 
					isAnchor: false, 
					goodCode: this.goodsData.goodCode, 
					alias: publisher.alias 
				}) 
			} else { 
				app.platform.goWeChatLive({ 
					playCode: broadcast.playCode, 
					goodCode: this.goodsData.goodCode 
				}) 
			} 
		}
		// 自选球队 我要选队
		getGoodSelect(cb ? : Function) {
			const { choiceTeamData } = this;
			app.http.Get(`dataApi/good/${this.goodCode}/select`, {}, (res: any) => {
				choiceTeamData.teamData = res.team;

				if (this.goodsData.state == 0) {
					choiceTeamData.teamLeftSec = res.good.preSaleLeftSec
				}
				if (res.good.randomMode) {
					choiceTeamData.randomMode = res.good.randomMode
					if (choiceTeamData.randomMode.state == 2) {
						choiceTeamData.teamCheckIndex = 999
					}
				}
				if (res.good.baoduiMode) {
					choiceTeamData.baoduiState = res.good.baoduiMode.state;
					choiceTeamData.baoduiLeftSec = res.good.baoduiMode.totalSecond;
					if (choiceTeamData.baoduiState == 1) {
						choiceTeamData.teamLeftSec = res.good.baoduiMode.leftSec;
					}

				}
				if (cb) cb()
			})
		}
		// 自选球队 获取球队分支
		getGoodSelectBranch() {
			// 随机选队
			const { choiceTeamData } = this;
			if (choiceTeamData.teamCheckIndex == 999) {
				app.http.Get(`dataApi/good/${this.goodCode}/select/randomNo`, {}, (res: any) => {
					choiceTeamData.randomNum = 0;
					for (let i in res.list) {
						if (!res.list[i].isExtend) {
							choiceTeamData.randomNum++
						}
					}
					choiceTeamData.branchCheckIndex = -1
					this.choiceTeamData.branchData = res.list;
				})
				return;
			}
			let id = choiceTeamData.teamData[choiceTeamData.teamCheckIndex].id;
			choiceTeamData.branchCheckIndex = 0
			app.http.Get(`dataApi/good/${this.goodCode}/select/branch`, {
				teamId: id
			}, (res: any) => {
				this.choiceTeamData.branchData = res.list;
			})
		}
		getGoodSelectCart() {
			app.http.Get(`dataApi/good/${this.goodCode}/select/cart`, {}, (res: any) => {
				this.choiceTeamData.cartData = res.data;
			})
		}
		// 自选球队 遮罩点击
		onClickTeamCheckCancel() {
			this.isPullDown(true)
			this.choiceTeamData.teamCheckShow = false
		}
		// 自选球队 选择球队
		onClickTeamCheck(index: any) {
			if (this.choiceTeamData.teamCheckIndex == index) return;

			this.choiceTeamData.teamCheckIndex = index;
			this.getGoodSelectBranch()
		}
		// 自选球队 选择分支
		onClickBranchCheck(index: any) {
			const { choiceTeamData } = this;
			if (choiceTeamData.branchCheckIndex == index) return;
			choiceTeamData.branchCheckIndex = index;
		}
		onClickDeleteCart(index: any) {
			if (index != 0 && index == '[]') {
				app.http.Post(`good/select/cart/${this.goodCode}/delete`, {
					id: []
				}, (res: any) => {
					this.getGoodSelectCart()
				})
				return;
			}
			let id = this.choiceTeamData.cartData.list[index].id
			app.http.Post(`good/select/cart/${this.goodCode}/delete`, {
				id: [id]
			}, (res: any) => {
				this.getGoodSelectCart()
			})
		}
		// 加入购物车
		joinCart() {
			const item = this.choiceTeamData.branchData[this.choiceTeamData.branchCheckIndex];
			if (item.soldOut || item.lock) {
				uni.showToast({ title: item.soldOut?'该商品已售罄':'该商品暂时不能支付', icon: 'none' })
				return;
			}
			app.http.Post(`good/select/cart/${this.goodCode}/add`, {
				id: [item.id]
			}, (res: any) => {
				this.getGoodSelectCart()
			})
		}
		onClickSettlement() {
			const { cartData } = this.choiceTeamData;
			if (cartData.available == 0) return;
			const params = `&cart=${encodeURIComponent(JSON.stringify(cartData))}`;
			this.navigateToConfirmOrder(params)
			this.onClickTeamCheckCancel()
		}
		// 包队
		onClickBaodui() {
			const { branchData, teamData, teamCheckIndex} = this.choiceTeamData;
			let price = this.getBranchPrice(branchData)
			const teamCheckData = teamData[teamCheckIndex];
			const params = `&baodui=${teamCheckData.id}&price=${price}&baoduiName=${teamCheckData.name}`;
			this.navigateToConfirmOrder(params)
			this.onClickTeamCheckCancel()
		}
		getBranchPrice(list: any) {
			return list.reduce((total:number, item:any) => total + item.price, 0);
		}
		// 购买剩余随机
		onClickBuyRandomGood() {
			const params = `&payRandomPrice=${this.choiceTeamData.randomMode.good.price}`;
			this.navigateToConfirmOrder(params)
		}
		// 自选球队随机 我要选队 我要选卡种
		getGoodSelectTeamRandom(cb ? : Function) {
			const { choiceTRData } = this;
			app.http.Get(`dataApi/good/${this.goodCode}/optionPanel`, {}, (res: any) => {
				choiceTRData.data = res.team;
				choiceTRData.rData = (res.good && res.good.randomMode) || [];
				choiceTRData.remainder = (res.good && res.good.remainder) || []
				if (cb) cb()
			})
		}

		// 选队随机支付
		onClickTeamBuy(data: any) {
			const params = `&payRandomTeam=${encodeURIComponent(JSON.stringify(data))}`
			this.toConfirmorder(params)
		}
		// 选队随机 剩余随机支付
		onClickTeamRandomBuy(data:any) {
			const params = `&selectRanId=${data.id}&randomPrice=${data.price}`
			this.toConfirmorder(params)
		}
		toConfirmorder(params:string){
			if((this.goodsData.state==0)){
				uni.showToast({ title:'暂未开售', icon:'none' })
				return;
			}
			this.navigateToConfirmOrder(params);
			this.choiceTRData.show = false;
		}
		navigateToConfirmOrder(params=''){
			const AD_id = this.AD_id?`&AD_id=${this.AD_id}`:''
			uni.navigateTo({
				url: `pay/payGoods?data=${encodeURIComponent(JSON.stringify(this.goodsData))}&payChannel=${encodeURIComponent(JSON.stringify(this.payChannel))}${params}${AD_id}`
			})
		}
		onClickteamRandomCancel() {
			this.isPullDown(true)
			this.choiceTRData.show = false;
		}
		onClickSearch(){
			if(this.navSearchText){
				uni.navigateTo({
					url: `/pages/goods/goods_find_list?q=${encodeURIComponent(this.navSearchText)}`
				})
			}
		}
	}
</script>

<style lang="scss">
	$color-F:#ffffff;
	$font-20:20rpx;
	$font-22:22rpx;
	$font-24:24rpx;
	$font-28:28rpx;
	$font-34:34rpx;
	$font-40:40rpx;
	$font-60:60rpx;
	.detail-container {
		width: 750rpx;
		box-sizing: border-box;
		padding-top: 88rpx;
		// background:$content-bg
	}
	.icon-collect {
		width: 44rpx;
		height: 41rpx;
		background: url(../../static/goods/v2/icon_collect.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 40rpx;
	}
	.icon-favored {
		background: url(../../static/goods/v2/icon_collect_.png) no-repeat center;
		background-size: 100% 100%;
	}
	.icon-share {
		width: 38rpx;
		height: 37rpx;
		background: url(../../static/goods/v2/icon_share.png) no-repeat center;
		background-size: 100% 100%;
	}
	.detail-index-bg {
		width: 750rpx;
		background: $content-bg;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		position: relative;
	}
	.detail-bg {
		width: 718rpx;
		background: #fff;
		margin-bottom: 14rpx;
		border-radius: 4rpx;
	}
	.header-desc-title {
		width: 100%;
		font-size: $font-28;
		
		font-weight: 600;
		color: #14151A;
		margin-bottom: 20rpx;
		padding-top: 27rpx;
	}
	.header {
		width: 100%;
		box-sizing: border-box;
		padding: 0 24rpx 30rpx 24rpx;
	}
	.header-center {
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		position: relative;

		&-top {
			width: 100%;
			text-align: end;
			font-size: $font-20;
			
			font-weight: 600;
			color: #A9ABB4;
		}

		&-lock {
			color: #dad7d7
		}

		&-plan {
			width: 95%;
			height: 12rpx;
			margin: 0 auto;
			margin-top: 12rpx;
			z-index: 5;
		}

		&-actor {
			width: 140rpx;
			height: 40rpx;
			box-sizing: border-box;
			display: flex;
			position: absolute;
			bottom: 0rpx;
			left: 20rpx;
			z-index: 6;

			&-img {
				width: 40rpx;
				height: 40rpx;
				margin-left: -20rpx;
				border-radius: 50%;
			}
		}
	}
	

	.goods-desc {
		width: 100%;
		box-sizing: border-box;
		padding: 28rpx 24rpx 30rpx 24rpx;

		&-title {
			width: 100%;
			margin-bottom: 18rpx;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			.goods-desc-title-left {
				font-size: 31rpx;
				
				font-weight: 600;
				color: #333333;
			}

			.goods-desc-title-right {
				font-size: 24rpx;
				
				
				color: #c0c0c0;
				display: flex;
				align-items: center;
			}

			.goods-desc-title-help {
				width: 28rpx;
				height:28rpx;
				margin-left: 8rpx;
			}
		}

		&-explain {
			width: 100%;
			box-sizing: border-box;
			font-size: 27rpx;
			// 
			
			
			color: #818080;

			&-text {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: flex-start;
			}

			.explain-name {
				width: 168rpx;
			}

			.explain-icon {
				width: 20rpx;
			}

			.explain-desc {
				width: 100%;
				box-sizing: border-box;
				
				line-height: 45rpx;
				word-break: break-all;
				margin-bottom: 10rpx;
				white-space: break-spaces
			}
		}
	}

	.bottom-container {
		width: 100%;
		height: calc(110rpx);
		height: calc(110rpx + constant(safe-area-inset-bottom));
		height: calc(110rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
		left: 0;
		background: rgba(255,255,255,0.99);
		z-index: 8;
		box-sizing: border-box;
		padding: 17rpx 30rpx 0 30rpx;
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #F6F7FB;
		&-left {
			width: 280rpx;
			height: 72rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			padding-top: 4rpx;
			padding-left: 6rpx;
			&-index {
				height: 72rpx;
				box-sizing: border-box;
				text-align: center;
				margin-right: 40rpx;
				position: relative;
				&-name {
					font-size: 18rpx;
					color: #333333;
					text-align: center;
				}
				.icon-zuheche{
					width: 80rpx;
					height:24rpx;
					font-size: 18rpx;
					color: #FFFFFF;
					text-align: center;
					position: absolute;
					display: flex;
					align-items: center;
					justify-content: center;
					top:-10rpx;
					left:30rpx;
					z-index: 2;
					background:linear-gradient(90deg, #F7B500 0%, #F7B500 50%, rgba(247, 181, 0, 0) 100%)
				}
			}
			.bottom-icon{
				width: 36rpx;
				height:36rpx;
				margin:0 auto;
				margin-bottom: 6rpx;
			}
			
		}
		.btn-cardlist{
			width: 152rpx;
			height: 82rpx;
			border: 1rpx solid #DDDDDD;
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: #333333;
			justify-content: center;
			box-sizing: border-box;
			margin-right: 12rpx;
		}
		.cardlist-icon{
			width: 32rpx;
			height:34rpx;
			margin-right: 6rpx;
		}
		.btn-confirm {
			width: 280rpx;
			background: #FA1545;
			text-align: center;
			color: #FFFFFF;
			height: 70rpx;
			line-height:70rpx;
			font-weight: 600;
			font-size: 26rpx;
			color: #FFFFFF;
			border-radius: 4rpx;
		}

		.random-confirm {
			background: #7048DD;
		}
		.btn-container{
			width: 400rpx;
			height:70rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.btn-small{
				width: 192rpx;
				height:70rpx;
				background:#FA1545;
				border:1rpx solid #FA1545;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 600;
				font-size: 26rpx;
				color: #FFFFFF;
			}
			.btn-pt{
				background: #fff;
				color:#333333;
				border:1rpx solid #979797
			}
		}

	}
	.movable-area {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 3
	}

	.movable-content {
		pointer-events: auto;
		width: 200rpx;
		height: 150rpx;
	}

	.price-black {
		color: #14151B
	}

	.body-hidden {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: fixed;
	}

	// 特殊说明
	.special-explain {
		width: 100%;
		font-size: 27rpx;
		color: #333333;
		line-height: 43rpx;
		margin-bottom: 30rpx;
		white-space:pre-wrap
	}

	.detail-bottom-box {
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding: 30rpx 25rpx 0 25rpx;
	}

	.detail-title {
		width: 100%;
		
		font-weight: bold;
		font-size: 31rpx;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.detail-title text {
		
		font-size: 23rpx;
		font-weight: 600;
		color: #818080;
	}

	.detail-bottom-picbox {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 50rpx;
	}

	.detail-bottom-image {
		width: 345rpx;
		height: 345rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.detail-bottom-explain {
		font-size: 26rpx;
		color: #818080;
		line-height: 40rpx;
		margin-bottom: 30rpx;
	}

	.detail-bottom-explain-title {
		font-size: 27rpx;
		color: #333;
		line-height: 40rpx;
		margin-bottom: 10rpx;
	}

	.detail-bottom-image:nth-child(2n) {
		margin-right: 0;
	}


	.goods-step-box {
		width: 100%;
		height: 144rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 25rpx;
		background: #f6f6f6;

		.goods-step-index {
			height: 114rpx;
			width: 100rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			position: relative;

			.goods-step-pic {
				width: 80rpx;
				height: 80rpx;
			}

			.goods-step-name {
				width: 100%;
				text-align: center;
				font-size: 20rpx;
				
				
				color: #333333;
			}
		}

		.goods-step-index-tips::after {
			width: 42rpx;
			height: 13rpx;
			background: url(../../static/goods/v2/step_jd.png) no-repeat center;
			background-size: 100% 100%;
			content: '';
			position: absolute;
			right: -56rpx;
			top: 37rpx;
		}
	}

	// 免单
	.guess-num-box {
		width: 197rpx;
		height: 40rpx;
		background: url(../../pages/act/static/guess/guess_tips.png) no-repeat center;
		background-size: 100% 100%;
		position: fixed;
		bottom: calc(100rpx);
		bottom: calc(100rpx + constant(safe-area-inset-bottom));
		bottom: calc(100rpx + env(safe-area-inset-bottom));
		right: 13rpx;
		z-index: 99;
	}

	.guess-mini {
		width: 45rpx;
		height: 18rpx;
		margin-right: 10rpx;
	}

	.guess-num-center {
		width: 100%;
		height: 32rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 12rpx;
		font-size: 20rpx;
		
		
		color: #FFFFFF;
	}
	.record-item-avatar{
		width: 30rpx;
		height:30rpx;
		margin-right: 18rpx;
		border-radius: 50%;
	}
	.record-item-name-box{
		width: 120rpx;
		display: flex;
        align-items: center;
		margin-right: 10rpx;
	}
	.record-item-name{
		max-width: 80rpx;
		font-size: 21rpx;
		
		
		color: #333333;
	}
	.record-item-title{
		width: 252rpx;
		font-size: 21rpx;
		
		
		color: #333333;
		margin-right: 55rpx;
	}
	.record-item-num{
		width: 80rpx;
		font-size: 21rpx;
		
		
		color: #333333;
	}
	.record-item-time{
		width: 150rpx;
		font-size: 21rpx;
		
		
		color: #C0C0C0;
		text-align: right;
	}
	.flex-between{
		display: flex;
		justify-content: space-between;
	}
	
	
	@mixin font($size) {
		font-size: $size;
		
		
		color: #FFFFFF;
	}
	.detail-header{
		width: 718rpx;
		background: #fff;
		box-sizing: border-box;
		padding: 0 26rpx 26rpx 26rpx;
		margin-top: 12rpx;
		position:relative;
		border-radius: 4rpx 4rpx 0rpx 0rpx;
		.detail-header-bg{
			width: 346rpx;
			height:62rpx;
			background: url(@/static/goods/detail/header_bg.png) no-repeat center / 100% 100%;
			position: absolute;
			right:0;
			top:-7rpx;
		}
		.header-base{
			width: 100%;
			height:97rpx;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			.base-left{
				display: flex;
				height:70rpx;
				align-items: flex-end;
				margin-bottom: 10rpx;
			}
			.header-price {
				@include font(20rpx);
				font-weight: 600;
				box-sizing: border-box;
				color:#333333;

			}
			.header-price text {
				@include font(54rpx);
				font-family: Impact;
				margin-left: 10rpx;
				color:#333333;
				letter-spacing:3rpx;
			}
		}
		.time-container{
			height:36rpx;
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #6F7277;
			margin-bottom: 14rpx;
			.countdown-box{
				display: flex;
				align-items: center;
				.countdown-custom{
					width: 36rpx;
					height:36rpx;
					font-size: 24rpx;
					color:#333333;
					font-weight: 600;
					display: inline-flex;
					align-items: center;
					justify-content: center;
				}
				.countdown-doc{
					height:inherit;
					font-size: 20rpx;
					color: #AEAEB2;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					margin:0 4rpx;
				}
			}
		}
		.goods-title {
			width: 100%;
			font-weight: 400;
			font-size: 28rpx;
			color: #333333;
			line-height: 35rpx;
			word-break:break-all;
		}
	}
	// 进度条
	.goods-progress {
		background: linear-gradient(to right,#FFBAC9,#FA1545);
		width: 718rpx;
		height: 8rpx;
		display: flex;
		justify-content: flex-end;
	}
	.progress-mask {
		height: 8rpx;
		background-color: #F6F7F9;
	}
	// 优惠
	.header-discount{
		width: 100%;
		margin-bottom: 16rpx;
		overflow: auto;
		display: flex;
		align-items: center;
		white-space: nowrap;
		.discount-item{
			height:38rpx;
			border: 1px dashed #E5E5EA;
			display: inline-flex;
			box-sizing: border-box;
			padding:0 16rpx;
			margin-right:28rpx;
			overflow:hidden;
			.discount-text{
				height:36rpx;
				@include font(18rpx);
				color: #6F7277;
				line-height: 36rpx;
				overflow:hidden;
				font-weight: 400;
			}
		}
	}
	.detail-padding{
		box-sizing: border-box;
		padding:24rpx 20rpx 0 20rpx;
	}
	.custom-nav-center{
		width: 440rpx;
		height:60rpx;
		background:#F6F7FB;
		border-radius: 5rpx;

		.nav-input{
			width: 420rpx;
			height:60rpx;
			font-size: 26rpx;
			padding-left: 20rpx;
			color: #333;
		}	
	}
	.custom-nav-right{
		width: 180rpx;
		height:60rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.icon-weixin{
			width: 44rpx;
			height:35rpx;
			background: url(@/static/login/weixin.png) no-repeat center / 100% 100%;
			margin-right: 36rpx;
		}
		.icon-ttf{
			width: 50rpx;
			height: 50rpx;
			background-color: rgba(255, 255, 255,0);
			font-family: uniicons;
			font-size: 46rpx;
			font-weight: normal;
			font-style: normal;
			color: #000;
		}
	}
</style>
