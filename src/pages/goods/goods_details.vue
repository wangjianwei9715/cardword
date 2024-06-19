<!--
 * @FilePath: \jichao_app_2\src\pages\goods\goods_details.vue
 * @Author: wjw
 * @Date: 2023-12-14 14:35:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-28 11:43:29
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content" v-show="goodsData!=''" :class="{'body-hidden':choiceTeamData.teamCheckShow||choiceTRData.show}">
		<navigationbar title="商品详情" borderBottom="0px" :custom="true">
			<template slot="right">
				<view :class="['icon-collect',{'icon-favored':favorType}]" @click="onClickFavor"></view>
				<view class="icon-share" @click="onClickShare"></view>
			</template>
		</navigationbar>
		<!-- 商品图片价格 -->
		<view class="pic-content">
			<swiper class="swiper" :current="swiperData.swiperCurrent" autoplay="true" circular="true"
				indicator-active-color="#ffffff" @change="onChangeSwiperCurrent">
				<swiper-item v-for="(item,index) in picData.carousel" :key="index" @click="onClickPreviewImage(index)">
					<view class="goods-img-content">
						<image class="goods-img" :src="item" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
			<view class="swiper-popup">
				<view class="swiper-dots">{{swiperData.swiperCurrent+1}}/{{picData.carousel.length}}</view>
				<view class="swiper-btn" v-show="goodsData.pic&&goodsData.pic.yuanfeng"
					:class="{'swiper-btn-current':swiperData.swiperTabCurrent==index}" v-for="(item,index) in swiperData.swiperTab"
					:key="index" @click="onClickSwiperTab(index)">{{item}}</view>
			</view>
		</view>
		<view class="detail-index-bg">
			<view class="detail-header" :class="{'detail-header-random':isRandomType}">
				<view class="detail-header-left">
					<!-- 基础卡片 -->
					<baseCard/>
					<view class="header-left-price">
						<view class="header-price">
							¥<text>{{goodsData.price}}</text>
							<text class="price-qi">{{getPriceStart?'起':''}}</text>
						</view>
						<view class="header-saled">已售{{goodSaled}}</view>
					</view>
				</view>
				<view class="detail-header-right" v-if="[0,1].includes(goodsData.state)">
					<u-count-down :time="countDown*1000" format="DD:HH:mm:ss" autoStart @change="onChangeCountDown" @finish="onFinishCountDown">
						<view class="countdown-box">
							<view class="countdown-custom">
								{{ countDownData.days>=10?countDownData.days:'0'+countDownData.days }}
							</view>
							<text class="countdown-days">天</text>
							<view class="countdown-custom">
								{{ countDownData.hours>=10?countDownData.hours:'0'+countDownData.hours }}
							</view>
							<text class="countdown-doc">:</text>
							<view class="countdown-custom">
								{{ countDownData.minutes>=10?countDownData.minutes:'0'+countDownData.minutes }}
							</view>
							<text class="countdown-doc">:</text>
							<view class="countdown-custom">
								{{ countDownData.seconds>=10?countDownData.seconds:'0'+countDownData.seconds }}
							</view>
						</view>
					</u-count-down>
				</view>
				<view class="detail-header-right pintuan-over" v-else>拼团已完成</view>
			</view>
			<view class="detail-bg detail-bg-header">
				<view class="header">
					<view class="header-top">
						<goodCouponGet :goodCode="goodsData.goodCode" :goodPage="true" :list="getCouponList" />
						<view class="header-top-title">{{goodsData.title}}</view>
						<view class="header-top-plan">
							<view class="plan-top-line">
								<view class="header-top-plan-num-state" v-if="!firstShow">
									{{goodsInfo.num}} | {{goodsInfo.pt_type}}
								</view>
								<view class="header-top-plan-num-str" v-if="planData.showMsg">
									<view class="header-shengyu">剩余</view><u-count-to :style="{'font-family':'ArialBold','letter-spacing':'-2rpx'}" :start-val="goodsData.totalNum" :end-val="goodSurplusNum" :duration="1000" :fontSize="14" :bold="true" color="#333"></u-count-to>/{{goodsData.totalNum}}{{goodsData.lockNum>0?'('+goodsData.lockNum+'未付款)':''}}
								</view>
								<view class="header-top-plan-num-state" v-else > {{planData.str}}{{goodsData.lockNum>0?'('+goodsData.lockNum+'未付款)':''}}</view>
							</view>
							<view class="goodslist-progress" :class="{'goodslist-progress-select':isRandomType}">
								<view class="progress-mask" :style="{width:(100-planData.width)+'%'}"> </view>
							</view>
						</view>
						<scroll-view class="header-discount" :scroll-x="true" v-if="goodsData.discount">
							<view class="discount-item" v-for="(item,index) in goodsData.discount" :key="`discount_${index}`">
								<view class="discount-text">满{{item.minNum}}组</view>
								<view class="discount-text discount-price">每组{{item.price}}元</view>
							</view>
						</scroll-view>
						<motorcade :goodsData="goodsData" :showChedui.sync="showCheduiDraw" :cheduiData="cheduiData" :userData="userData"/>
					</view>
				</view>
			</view>
			<!-- 卡密奖励 -->
			<noAward ref="rNoAward" :price="goodsData.price" :state="goodsData.state" @buy="onClickBuy"/>
			<!-- 活动展示 -->
			<goodAct :goodsData="goodsData" />
			
			<!-- 预售商品 -->
			<view class="detail-bg" v-if="goodsData.book">
				<view class="book-box">
					<view class="book-tips">预售</view>
					{{`该产品正式发售时间为${$u.timeFormat(goodsData.book.saleAt,'yyyy年mm月dd日')}，最晚拆卡时间为${$u.timeFormat(goodsData.book.latestLiveAt,'yyyy年mm月dd日')}。超过最晚拆卡时间且距拼成时间＞${goodsData.book.hour1}小时未拆卡补偿订单实付金额${goodsData.book.compensate1}%无门槛优惠券；＞${goodsData.book.hour2}小时未拆卡则拼团失败全额退款。`}}
				</view>
			</view>
			<!-- 卖家信息 -->
			<view class="detail-bg">
				<view class="goods-seller" v-if="goodsData.publisher">
					<view class="goods-seller-desc-js">商品由该商家在平台寄售</view>
					<view class="goods-seller-left" @click="onClickShops">
						<muqian-lazyLoad class="goods-seller-left-avatar"
							:src="goodsData.publisher.avatar!=''?decodeURIComponent(goodsData.publisher.avatar):defaultAvatar"
							mode="aspectFill" :borderRadius="'50%'"/>
						<view class="goods-seller-left-desc">
							<view class="goods-seller-left-desc-name">
								{{goodsData.publisher.name}}
								<merchantLevel :level="goodsData.publisher.level"/>
							</view>
							<view class="goods-seller-left-desc-tips">粉丝{{goodsData.publisher.fans}} |
								在售{{goodsData.publisher.sale}}</view>
						</view>
						<view class="goods-seller-right"></view>
					</view>
				</view>
				<seriesCard style="width:100%" :list="cardList" @goMore="onClickNiceTime" :isFetchEnd="seriesCardEnd"/>
			</view>

			<!-- 购买记录 -->
			<view class="detail-bg" v-if="buyRecordList!=''">
				<view class="goods-desc" style="padding-bottom:8rpx">
					<view class="goods-desc-title" style="margin-bottom:28rpx">
						<view class="goods-desc-title-left">购买记录</view>
					</view>
					<view class="goods-desc-explain">
						<view class='goods-desc-explain-text flex-between' style="margin-bottom:20rpx" v-for="(item,index) in buyRecordList" :key="index">
							<image class="record-item-avatar" @click="goPersonHome(item.userId,item.anonymous)" :src="decodeURIComponent(item.avatar||defaultAvatar)" />
							<view class="record-item-name-box">
								<view class="record-item-name u-line-1" @click="goPersonHome(item.userId,item.anonymous)">{{item.userName}}</view>
								<medalIcon v-if="!item.anonymous && item.medal" :src="item.medal.pic" :userId="item.userId"/>
							</view>
							<view class="record-item-title u-line-1">{{goodsData.title}}</view>
							<view class="record-item-num u-line-1">x{{item.num}}</view>
							<view class="record-item-time u-line-1">{{$u.timeFrom(item.time)}}</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 商品详情 -->
			<view class="detail-bg">
				<view class="goods-desc">
					<view class="goods-desc-title">
						<view class="goods-desc-title-left">拼团详情</view>
						<view class="goods-desc-title-right" @click.stop="showDrawer = true">
							规则<image class="goods-desc-title-help" src="@/static/goods/detail/help.png" />
						</view>
					</view>
					<view class="goods-desc-explain">
						<view class="special-explain">{{goodsData.extraDesc}}</view>
						<view class='goods-desc-explain-box' v-for="item in goodsDesc" :key="item.id">
							<view class="explain-name">{{item.name}}</view>
							<view class="explain-desc">{{item.desc}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detail-bottom-box">
			<view v-show="goodsData.pic&&goodsData.pic.yuanfeng">
				<view class="detail-title">原封图实拍<text>（以下照片为商家拍摄）</text></view>
				<view class="detail-bottom-picbox">
					<image @click="onClickPreviewDetailImage(index)" class="detail-bottom-image" mode="aspectFill"
						v-for="(item,index) in picData.detailImg" :key="index" :src="item" />
				</view>
			</view>
			<view class="detail-title">购买须知</view>
			<view class="detail-bottom-explain">商家所拆商品全部为原封，上架前会提交原箱/原盒视频，同时也会在直播之前展示原箱/原盒包装。卡片生产商在生产过程中，有机率出现装箱误差，商品详情描述仅供参考，最终拆卡结果以商品实物为准，如若对商品规格和卡片张数有疑义，请在购买前联系客服或商家，也可进入首页发售日志查看对应的商品规格和卡片张数，未咨询后购买即认为已了解商品的规格及卡片张数，希望各位用户悉知这种情况的发生。产品宣传图均为发行商官方制作，最终该系列卡片以箱内拆出的实物为准，请各位玩家在购买前知悉。</view>
			<view class="detail-title">常见问题</view>
			<view class="detail-bottom-explain" v-for="(item,index) in goodsDetailRules" :key="index">
				<view class="detail-bottom-explain-title">{{item.title}}</view>
				{{item.desc}}
			</view>
			<view class="detail-title">中卡概率</view>
			<view class="detail-bottom-explain margin-bootom0">f=每份卡密的中卡概率</view>
            <view class="detail-bottom-explain margin-bootom0">P=【拼团份数】</view>
            <view class="detail-bottom-explain margin-bootom0">Q=【拼团配置】中的卡片总张数</view>
            <view class="detail-bottom-explain">f=1-[(P-1)/P]^Q</view>
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
		<view class="btn-content" v-if="goodsData.state==1||(goodsData.state==0&&getPriceStart)">
			<view class="btn-content-left">
				<view class="btn-content-left-index" v-for="item in tipBtn" :key="item.id" @click="onClickTipBtn(item)">
					<image :class="'icon-'+item.class" :src="item.url" mode="aspectFill" />
					<view class="btn-content-left-index-name">{{item.name}}</view>
				</view>
			</view>
			<view class="btn-cardlist" @click="onClickAllCard">
				<image class="cardlist-icon" src="@/static/goods/detail/cardlist_.png"></image>列表 
			</view>
			<view class="btn-confirm" :style="{width:`${tipBtn.length==2?'332rpx':'395rpx'}`}" :class="{'random-confirm':isRandomType}" @click="onClickBuy()">
				{{goodsData.isSelect?'选择编号':'立即购买'}}
			</view>
		</view>
		<view class="btn-contented joined" v-else-if="goodsData.state>=2">
			<view class="btn-content-left">
				<view class="btn-content-left-index" @click="onClickAllCard">
					<image class="icon-order" :src="'../../static/goods/v2/icon_list_v3.png'" mode="aspectFill" />
					<view class="btn-content-left-index-name">卡片列表</view>
				</view>
			</view>
			<view class="btn-pt" @click="onClickResult(0)">拼团结果</view>
			<view class="btn-ck" @click="onClickResult(1)">拆卡报告</view>
		</view>

		<cardplay :operationShow="gamePlayData.operaShow" :operaType="gamePlayData.operaType" @operacancel="gamePlayData.operaShow=false" />

		<share :operationShow="shareObj.shareShow" :shareData="shareObj.shareData" @operacancel="shareObj.shareShow=false" />

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

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer.sync="showDrawer" :title="'拼团规则'">
			<view class="drawer-box" v-for="(item,index) in goodsDetailHelp" :key="index">
				<view class="drawer-help">{{item.content}}</view>
			</view>
		</bottomDrawer>

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
	import { goodsDetailRules, goodsDetailHelp } from "@/tools/DataRules";
	import { parsePic } from "@/tools/util";
	import { Goods, Share } from "./utils/class";
	import detailsManager from "./manager/detailsManager"
	import noAward from "./component/noAward.vue"
	import customerService from "./component/customerService.vue"
	import motorcade from "./component/motorcade.vue"
	import baseCard from "./component/baseCard.vue"
	const Manager =  detailsManager.getIns();
	@Component({
		components:{
			noAward,
			customerService,
			motorcade,
			baseCard
		}
	})
	export default class ClassName extends BaseNode {
		parsePic = parsePic;
		navigateBack = app.navigateTo.navigateBack;
		isPullDown = app.platform.isPullDown;
		goPersonHome = app.navigateTo.goPersonHome;
		defaultAvatar = app.defaultAvatar;
		goodsManaager:any = app.goods;
		goodsDetailRules = goodsDetailRules
		goodsDetailHelp = goodsDetailHelp;
		shareObj = {
			shareShow:false,
			shareData:new Share()
		};
		buyRecordList:any = [];
		goodsDesc:any = [];
		favorType = false;
		gamePlayData:any = Goods.GamePlay();
		swiperData:any = Goods.Swiper();
		picData:any = Goods.Pic();
		tipBtn = [Manager.tipBtn[0]];
		goodCode = '';
		goodsData: any = [];
		choiceTeamData:any = Goods.ChoiceTeam();
		choiceTRData:any = Goods.ChoiceTR();
		payChannel: any = [];// 支付方式
		showDrawer = false;// 底部抽屉
		source="";
		planData = Goods.Plan()
		getCouponList:any = [];// 可领取优惠券列表
		userData = app.data;
		cheduiData = {};
		showCheduiDraw = false;
		cheduiDataAva:any = '';
		cardList = [];// 商家好卡
		seriesCardEnd = true;
		AD_id=null;
		referer="";//来源
		customerServiceShow=false;
		countDown = 0;
		countDownData:any={};
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
			if (!this.firstShow) {
				this.getGoodData();
				// this.onClickteamRandomCancel()
			}
		}
		//   下拉刷新
		onPullDownRefresh() {
			this.getGoodData(() => {
				this.getOrtherData()
				uni.stopPullDownRefresh();
			})
		}
		public get firstShow () : boolean {
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
			const { spec, pintuan_type } = this.goodsData
			return {
				num:spec.name || "",
				pt_type:this.goodsManaager.gameplayType[pintuan_type] || ""
			}
		}
		onChangeCountDown(e:any){
			this.countDownData = e
		}
		// 数据详情赋值
		getGoodData(cb?:Function) {
			const goodCode = this.goodCode;
			app.http.GetWithCrypto(`dataApi/good/${goodCode}/1/detail`, {referer:this.firstShow?this.referer:"PageRefresh"}, (data: any) => {
				this.favorType = data.favorite>0;
				this.goodsData = data.good;
				this.payChannel = data.payChannel || [];
				this.planData = Manager.detailsPlan(this.goodsData);
				this.goodsDesc = Manager.setGoodsDesc(this.goodsData)
				data.joined && (this.tipBtn = Manager.tipBtn)
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
			// 商品精彩时刻
			setTimeout(()=>{
				Manager.reqSeriesCards(this.goodCode,(list:any)=>{
					this.cardList = list
					this.seriesCardEnd = !( list && list.length>0)
				})
			},500)
		}
		/**
		 * 设置商品图片
		 */
		getGoodsImage() {
			const { picData, goodsData, swiperData } = this;
			const goodsPic = goodsData.pic;
			const carousel = picFormat(goodsPic.carousel);
			swiperData.carouselLength = carousel.length;
			picData.detailImg = [...picFormat(goodsPic.yuanfeng)];
			picData.carousel = [...carousel,...picData.detailImg];
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
		onClickTipBtn(item: any) {
			if (item.id == 1) {
				if(this.goodsData.publisher.kefu_wechat){
					this.customerServiceShow=true;
				}else{
					app.platform.hasLoginToken(()=>{
						const params = {
							agentExten:this.goodsData.kefu||'',
							businessParam:'goodCode:'+this.goodCode
						}
						app.platform.heliService(params)
					})
				}
			}
			if (item.id == 2) {
				uni.navigateTo({ url:`/pages/userinfo/order_myCard?goodCode=${this.goodCode}&pintuanType=${this.goodsData.pintuan_type}&type=0&goodJump=true&state=${this.goodsData.state}&pic=${encodeURIComponent(this.goodsData.pic.carousel[0])}` })
			}
		}
		onClickShops() {
			app.platform.hasLoginToken(()=>{
				const publisher = this.goodsData.publisher
				this.goMerchantPage(publisher.alias)
			})
		}
		onClickAllCard(data ? : any) {
			const { goodCode, pintuan_type} = this.goodsData;
			const url = `/pages/goods/all_good_card?code=${goodCode}&type=${pintuan_type}${data?`&teamId=${data.id}`:''}`;
			uni.navigateTo({ url })
		}
		onClickNiceTime(){
			app.platform.hasLoginToken(()=>{
				uni.navigateTo({ url: `/pages/merchant/niceTime?alias=${this.goodsData.publisher.alias}` })
			})
		}
		// 分享
		onClickShare() {
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
		onClickFavor() {
			let url = !this.favorType ? "good/favor/" : "good/unfavor/"
			app.http.Post(url + this.goodCode, {}, (data: any) => {
				this.favorType = !this.favorType
			})
		}
		// 观看大图
		onClickPreviewImage(index: number) {
			uni.previewImage({
				urls: this.picData.carousel,
				current: index,
				indicator: "number"
			});
		}
		onClickPreviewDetailImage(index: number) {
			uni.previewImage({
				urls: this.picData.detailImg,
				current: index,
				indicator: "number"
			});
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
				url: `goods_result_list?chooseIds=${chooseID}&code=${this.goodCode}&random=${random}`
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
		onClickCardPlay(item: any) {
			if (item.id <= 2) {
				this.gamePlayData = {
					operaShow:true,
					operaType:item.id
				}
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
		onChangeSwiperCurrent(event: any) {
			const { swiperData } = this
			swiperData.swiperCurrent = event.detail.current;
			swiperData.swiperTabCurrent = event.detail.current < swiperData.carouselLength ? 0 : 1
		}
		onClickSwiperTab(index: number) {
			const { swiperData } = this
			if (index != swiperData.swiperTabCurrent) {
				swiperData.swiperTabCurrent = index;
				swiperData.swiperCurrent = index == 0 ? 0 : swiperData.carouselLength;
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

	.content {
		width: 750rpx;
		box-sizing: border-box;

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
	.pic-content {
		width: 750rpx;
		height: 578rpx;
		box-sizing: border-box;
		position: relative;
	}

	.swiper-popup {
		height: 50rpx;
		display: inline-flex;
		align-items: center;
		position: absolute;
		right: 14rpx;
		bottom: 44rpx;
		border-radius: 40rpx;
		background: rgba(49,49,49,0.3);
		box-sizing: border-box;
		padding: 0 18rpx
	}

	.swiper-dots {
		height: 42rpx;
		line-height: 42rpx;
		font-size: 20rpx;
		
		
		color: #F4F4F4;
	}

	.swiper-btn {
		height: 42rpx;
		font-size: 21rpx;
		
		
		color: #F4F4F4;
		margin-left: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper-btn-current {
		font-size: 23rpx;
		
		
		color: #333333;
	}

	.swiper {
		width: 750rpx;
		height: 578rpx;
		background: #F5F5F9;
	}

	.goods-img-content {
		width: 750rpx;
		height: 578rpx;
		background: #F5F5F9;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.goods-img {
		width: 750rpx;
		height: 578rpx;
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
		width: 710rpx;
		border-radius: 3rpx;
		background: #fff;
		margin-bottom: 14rpx;
		border-radius: 5rpx;
	}
	.detail-bg-header{
		border-radius: 0rpx 0rpx 5rpx 5rpx;
	}
	.header-content {
		width: 710rpx;
		height: 100rpx;
		background: url(../../static/goods/v2/price_bg.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-left: 29rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: -23rpx;
	}

	.random-bg {
		background: url(../../static/goods/v2/price_bg_.png) no-repeat center;
		background-size: 100% 100%;
	}

	.header-desc-title {
		width: 100%;
		font-size: $font-28;
		
		font-weight: 600;
		color: #14151A;
		margin-bottom: 20rpx;
		padding-top: 27rpx;
	}

	

	.header-content-end {
		background: #fff;
		box-sizing: border-box;
		padding-left: 36rpx;
		margin-top: -23rpx;
		border-top-left-radius: 5rpx;
		border-top-right-radius: 5rpx;
		height: 82rpx;
		display: flex;
		align-items: center;
	}

	.header-content-end .header-price,
	.header-content-end {
		padding-top: 19rpx;
	}

	.header-content-end .header-price,
	.header-content-end .header-price text {
		color: #333333
	}

	

	.header-right {
		// width: 240rpx;
		height: 107rpx;
		box-sizing: border-box;
		padding: 15rpx 30rpx 12rpx 0;
	}

	.header-right-end {
		width: 240rpx;
		height: 107rpx;
		box-sizing: border-box;
		padding: 15rpx 20rpx 12rpx 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		
		
		color: #14151B;
	}

	.icon-end {
		width: 100%;
		text-align: right;
		font-size: 21rpx;
		
		font-weight: 600;
		color: #FFFFFF;
		margin-bottom: 10rpx;
		margin-top: 5rpx;
	}
	.header {
		width: 100%;
		box-sizing: border-box;
		padding: 0 24rpx 30rpx 24rpx;
	}
	.header-top-id {
		width: 100%;
		font-size: 24rpx;
		
		
		color: #ACAEB7;
		margin-bottom: 40rpx;
		margin-top: 10rpx;
	}

	.header-top {
		width: 100%;
		box-sizing: border-box;
		padding-top: 27rpx;

		&-title {
			width: 100%;
			font-size: 30rpx;
			
			font-weight: 600;
			color: #333333;
			line-height: 44rpx;
			word-break:break-all;
		}
		&-right {
			width: 50rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;

			&-desc {
				font-size: $font-20;
				
				
				color: #000000;
			}
		}
		&-plan {
			width: 100%;
			margin-top: 16rpx;
			.plan-top-line{
				width:100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 14rpx;
				align-items: flex-end;
				.plan-top-rank{
					height:30rpx;
					line-height: 30rpx;
					display: flex;
					align-items: center;
					font-size: 23rpx;
					
					
					color: #C0C0C0;
				}
			}
			.goodslist-progress {
				background: linear-gradient(90deg, #FFB6C5 0%, #FA1545 100%);
				width: 100%;
				height: 8rpx;
				position: relative;
				display: flex;
				justify-content: flex-end;

				.progress-mask {
					height: inherit;
					background-color: #F6F7FB;
					width: 0%;
				}
			}

			.goodslist-progress-select {
				background: linear-gradient(90deg, #CFC1F3 0%, #7048DD 100%);
			}

			.header-top-plan-num {
				height: 30rpx;
				font-size: 24rpx;
				
				
				color: #C0C0C0;
				line-height: 30rpx;
				text-align: right;
				margin-bottom: 6rpx;
				display: flex;
				align-items: center;
			}
			.header-top-plan-num-state{
				height: 30rpx;
				font-size: 24rpx;
				
				
				color: #999999;
				text-align: right;
				margin-bottom: 0rpx;
				display: flex;
				align-items: baseline;
			}
			.header-top-plan-num-str{
				height:30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				
				
				color: #999999;
				display: flex;
				align-items: baseline;
			}
			.header-shengyu{
				height:30rpx;
				line-height: 30rpx;
				font-size: 22rpx;
				
				
				color: #999999;
				display: flex;
				align-items: baseline;
				margin-right: 6rpx;
			}
			.header-top-plan-box{
				display: inline-block;
				height: 30rpx;
				font-size: 22rpx;
				
				font-weight: 600;
				color: #959695;
				line-height: 30rpx;
				text-align: right;
			}
			.header-top-plan-numbottom {
				height: 30rpx;
				font-size: 22rpx;
				
				
				color: #999999;
				text-align: right;
			}
		}

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
	.goods-seller {
		width: 100%;
		box-sizing: border-box;
		border-radius: 5rpx;
		padding:34rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		&-left {
			width: 100%;
			height: 91rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			position: relative;
			&-avatar {
				width: 91rpx;
				height: 91rpx;
				border-radius: 3rpx;
			}

			&-desc {
				width: 520rpx;
				height: 91rpx;
				box-sizing: border-box;
				padding: 0 0 4rpx 35rpx;
				display: flex;
				flex-wrap: wrap;
				&-name {
					width: 100%;
					font-size: 30rpx;
					
					
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					align-items: center;
				}
				
				&-tips {
					width: 100%;
					font-size: 24rpx;
					
					
					color: #C0C0C0;
				}
			}
		}
		.goods-seller-desc-js {
			height: 28rpx;
			background: #FBF2F3;
			font-size: 23rpx;
			
			
			color: #F63D47;
			line-height: 28rpx;
			display: inline-flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 16rpx;
			position: absolute;
			right: 0;
			top: 0;
		}
		&-right {
			width: 11rpx;
			height:17rpx;
			background:url(@/static/goods/v2/icon_right_new.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			right:0;
			top:50%;
			margin-top:-8.5rpx
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

	.btn-content {
		width: 100%;
		height: calc(120rpx);
		height: calc(120rpx + constant(safe-area-inset-bottom));
		height: calc(120rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
		left: 0;
		background: rgba(255,255,255,0.99);
		z-index: 8;
		box-sizing: border-box;
		padding: 19rpx 50rpx 0 0;
		border-top: 1px solid #F5F5F8;
		display: flex;
		justify-content: center;

		&-left {
			max-width: 240rpx;
			height: 82rpx;
			box-sizing: border-box;
			padding: 0 25rpx 0 25rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-index {
				width: 100rpx;
				height: 82rpx;
				box-sizing: border-box;
				text-align: center;
				padding-top: 4rpx;

				&-name {
					margin-top: -4rpx;
					font-size: 23rpx;
					
					
					color: #949494
				}
			}

			.icon-kf {
				width: 40rpx;
				height: 34rpx;
				margin-bottom: 8rpx;
			}

			.icon-order {
				width: 40rpx;
				height: 42rpx;
			}
		}
		.btn-cardlist{
			width: 152rpx;
			height: 82rpx;
			border: 1rpx solid #DDDDDD;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			
			font-weight:400;
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
			width: 395rpx;
			background: $btn-red;
			text-align: center;
			
			color: #FFFFFF;
			height: $btn-height;
			line-height: $btn-height;
			font-size: $btn-fontSize;
			border-radius: $btn-radius;
			font-weight: 600;
		}

		.random-confirm {
			background: #7048DD;
		}

	}

	.btn-contented {
		width: 100%;
		height:120rpx;
		height: calc(120rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
		left: 0;
		background: $color-F;
		z-index: 8;
		box-sizing: border-box;
		padding: 19rpx 50rpx 0 0;
		border-top: 1px solid #F5F5F8;
		display: flex;
		justify-content: space-between;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.btn-pt {
			width: 352rpx;
			box-sizing: border-box;
			border: 2rpx solid #DADADA;
			text-align: center;
			
			color: #333333;
			height: $btn-height;
			line-height: $btn-height;
			font-size: $btn-fontSize;
			border-radius: $btn-radius;
			font-weight: $btn-weight;
		}

		.btn-ck {
			width: 352rpx;
			box-sizing: border-box;
			background: $btn-red;
			border: 2rpx solid $btn-red;
			text-align: center;
			
			color: $color-F;
			height: $btn-height;
			line-height: $btn-height;
			font-size: $btn-fontSize;
			border-radius: $btn-radius;
			font-weight: $btn-weight;
		}
	}

	.joined .btn-pt {
		margin-right: 10rpx !important;
	}

	.joined .btn-ck {
		margin-left: 10rpx !important;
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
		font-weight: 600;
		color: #818080;
		line-height: 40rpx;
		margin-bottom: 30rpx;
	}

	.detail-bottom-explain-title {
		
		font-size: 27rpx;
		font-weight: 600;
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

	.drawer-box {
		width: 100%;
		box-sizing: border-box;
	}

	.drawer-help {
		width: 100%;
		font-size: 25rpx;
		
		
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
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
	.goods-desc-explain-box{
		width: 662rpx;
		display: flex;
		justify-content: space-between;
		margin:0 auto;
		.explain-name{
			width: 170rpx;
			min-height:80rpx;
			background:#F3F4F7;
			font-size: 24rpx;
			
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom:4rpx;
		}
		.explain-desc{
			width: 487rpx;
			min-height:80rpx;
			background:#F3F4F7;
			font-size: 24rpx;
			
			color: #333333;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding:5rpx 38rpx;
			margin-bottom:4rpx;
			line-height:35rpx;
		}
	}
	.book-box{
		width: 100%;
		box-sizing: border-box;
		padding: 28rpx 30rpx 30rpx 30rpx;
		
		font-size: 21rpx;
		
		color: #949494;
		line-height: 36rpx;
		.book-tips{
			width: 60rpx;
			height: 30rpx;
			background: #5BC64E;
			border-radius: 3rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 23rpx;
			
			font-weight: 600;
			color: #FFFFFF;
			margin-right: 10rpx;
		}
	}
	@mixin font($size) {
		font-size: $size;
		
		
		color: #FFFFFF;
	}
	.detail-header{
		width: 750rpx;
		height:124rpx;
		background: url(@/static/goods/detail/header.png) no-repeat center /100% 100%;
		margin-top: -10rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding:0 36rpx 0 48rpx;
		align-items: center;
	}
	.detail-header-random{
		background: url(@/static/goods/detail/header_r.png) no-repeat center /100% 100% !important;
	}
	.detail-header-left{
		height: 92rpx;
		.header-left-price{
			display: flex;
			align-items: center;
			.header-price {
				@include font(32rpx);
				font-family: Impact;
				font-weight: 600;
				box-sizing: border-box;
			}
			.header-price text {
				@include font(44rpx);
				font-family: Impact;
				margin-left: 10rpx;
			}
			.header-price .price-qi {
				@include font(20rpx);
			}
			.header-saled{
				@include font(20rpx);
				margin-left: 10rpx;
				margin-bottom: -15rpx;
				line-height: 28rpx;
			}
		}
	}
	.detail-header-right{
		height: 92rpx;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding-bottom: 10rpx;
	}
	.pintuan-over{
		@include font(26rpx);
		font-weight: 600;
	}
	.countdown-box{
		display: flex;
		align-items: center;
		.countdown-custom{
			width: 38rpx;
			height:38rpx;
			background: rgba(255,255,255,0.2);
			border-radius: 3rpx;
			@include font(26rpx);
			font-weight: 600;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			margin:0 6rpx;
		}
		.countdown-doc{
			height:38rpx;
			@include font(28rpx);
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
		.countdown-days{
			height:38rpx;
			@include font(22rpx);
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
	}
	.header-discount{
		width: 100%;
		margin-top: 26rpx;
		overflow: auto;
		display: flex;
		align-items: center;
		white-space: nowrap;
		.discount-item{
			width: 204.7rpx;
			height:46rpx;
			background: url(@/static/goods/detail/discount.png) no-repeat center /100% 100%;
			display: inline-flex;
			box-sizing: border-box;
			margin-right:16rpx;
			overflow:hidden;
			.discount-text{
				width: 88.7rpx;
				height:46rpx;
				@include font(22rpx);
				color: #FA1545;
				text-align: center;
				line-height: 46rpx;
				overflow:hidden;
			}
			.discount-price{
				width: 116rpx;
				overflow:hidden;
			}
		}
	}
	.margin-bootom0{
		margin-bottom: 0;
	}
</style>
