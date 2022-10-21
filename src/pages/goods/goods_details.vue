<template>
	<view class="content" v-show="goodsData!=''" :class="{'body-hidden':choiceTeamData.teamCheckShow||choiceTRData.show}">
		<!-- #ifndef MP -->
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack">
					<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
				</view>
				<view class="header-title">商品详情</view>
				<view class="header-icon">
					<view :class="['icon-collect',{'icon-favored':favorType}]" @click="onClickFavor"></view>
					<view class="icon-share" @click="onClickShare"></view>
				</view>
			</view>
		</view>

		<view style="padding-top:88rpx">
			<statusbar />
		</view>
		<!-- #endif -->
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
			<view class="detail-bg">
				<view class="header-content-end" v-if="goodsData.state>=2">
					<view class="header-price">¥<text>{{goodsData.price}}</text><text
							class="price-qi">{{getPriceStart()?'起':''}}</text></view>
				</view>
				<view class="header-content" :class="{'random-bg':getSelectType()}" v-else-if="goodsData.state==1||goodsData.state==0">
					<view class="header-price">¥<text>{{goodsData.price}}</text><text
							class="price-qi">{{getPriceStart()?'起':''}}</text></view>
					<view class="header-right">
						<view class="icon-end">{{goodsData.state==0?'距开售':'距结束'}}</view>
						<view class="countdown-content">
							<view v-if="countData.countDay>0" class="countdown-index countdown-day">{{countData.countDay}}<text>天</text></view>
							<view class="countdown-index">{{`${countData.countHour} : ${countData.countMinute} : ${countData.countSecond}`}}</view>
						</view>
					</view>
				</view>
				<view class="header">
					<view class="header-top">
						<goodCouponGet :goodCode="goodsData.goodCode" :goodPage="true" :list="getCouponList" />
						<view class="header-top-title">{{goodsData.title}}</view>
						<view class="header-top-plan">
							<view class="plan-top-line">
								<view class="header-top-plan-num-state" >
									{{goodsData.state>=2?'拼团已完成':'拼团进行中'}}
								</view>
								<view class="header-top-plan-num-str" v-if="planData.showMsg">
									<view class="header-shengyu">剩余</view><u-count-to :style="{'font-family':'ArialBold','letter-spacing':'-2rpx'}" :start-val="goodsData.totalNum" :end-val="goodSurplusNum" :duration="1500" :fontSize="15" :bold="true" color="#333"></u-count-to>/{{goodsData.totalNum}}{{goodsData.lockNum>0?'('+goodsData.lockNum+'未付款)':''}}
								</view>
								<view class="header-top-plan-num-state" v-else > {{planData.str}}{{goodsData.lockNum>0?'('+goodsData.lockNum+'未付款)':''}}</view>
							</view>
							<view class="goodslist-progress" :class="{'goodslist-progress-select':getSelectType()}">
								<view class="progress-mask" :style="{width:(100-planData.width)+'%'}"> </view>
							</view>
						</view>
					</view>

					<view class="header-bottom">
						<view class="header-bottom-index" v-for="item in goodsSpe" :key="item.id"
							@click="onClickCardPlay(item)">
							<view class="header-bottom-index-name">{{item.name}}</view>
							<view class="header-bottom-index-desc">{{item.desc}}</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 邀请新人步骤图 -->
			<inviteStep v-if="goodsData.specialType&&goodsData.specialType.indexOf('invite')!=-1" :goodsStep="true" />
			<!-- 邀请新人步骤图 -->

			<!-- 活动展示 -->
			<goodAct :goodsData="goodsData" :showChedui.sync="showCheduiDraw" :cheduiData="cheduiData" :userData="userData" />

			<!-- 卖家信息 -->
			<view class="detail-bg">
				<view class="goods-seller" v-if="goodsData.publisher">
					<view class="goods-seller-desc-js">商品由该商家在平台寄售</view>
					<view class="goods-seller-left" @click="onClickShops">
						<muqian-lazyLoad class="goods-seller-left-avatar"
							:src="goodsData.publisher.avatar!=''?decodeURIComponent(goodsData.publisher.avatar):defaultAvatar"
							mode="aspectFill" :borderRadius="'50%'"/>
						<view class="goods-seller-left-desc">
							<view class="goods-seller-left-desc-name">{{goodsData.publisher.name}}</view>
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
							<image class="record-item-avatar" :src="decodeURIComponent(item.avatar||defaultAvatar)" />
							<view class="record-item-name u-line-1">{{item.userName}}</view>
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
							规则<image class="goods-desc-title-help" src="../../static/goods/v2/icon_right_new.png" />
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
			<view class="detail-bottom-explain">商家所拆商品全部为原封，上架前会提交原箱/原盒视频，同时也会在直播之前展示原箱/原盒包装。卡片生产商在生产过程中，有机率出现装箱误差，商品详情描述仅供参考，最终拆卡结果以商品实物为准，希望各位用户悉知这种情况的发生。产品宣传图均为发行商官方制作，最终该系列卡片以箱内拆出的实物为准，请各位玩家在购买前知悉。</view>
			<view class="detail-title">常见问题</view>
			<view class="detail-bottom-explain" v-for="(item,index) in goodsDetailRules" :key="index">
				<view class="detail-bottom-explain-title">{{item.title}}</view>
				{{item.desc}}
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<guessYouLikeIt :goodsList="likeGoodList" />
		<!-- 直播可拖动控件 -->
		<movable-area class="movable-area" v-if="goodsData.broadcast">
			<movable-view class="movable-content" direction="all" x="530rpx" y="750rpx">
				<livewicket :liveImg="decodeURIComponent(goodsData.broadcast.pic)"
					:liveStatus="goodsData.broadcast.name" @live="onClickLive"></livewicket>
			</movable-view>
		</movable-area>

		<!-- 底部按钮 -->
		<view class="btn-content" v-if="goodsData.state==1||(goodsData.state==0&&getPriceStart())">
			<view class="btn-content-left">
				<view class="btn-content-left-index" v-for="item in tipBtn" :key="item.id" @click="onClickTipBtn(item)">
					<image :class="'icon-'+item.class" :src="item.url" mode="aspectFill" />
					<view class="btn-content-left-index-name">{{item.name}}</view>
				</view>
			</view>
			<view class="btn-cardlist" @click="onClickAllCard">
				<image class="cardlist-icon" src="@/static/goods/v2/icon_list_v3.png"></image>列表 
			</view>
			<view v-if="goodsData.specialType&&goodsData.specialType.indexOf('invite')!=-1" class="btn-confirm"
				@click="onClickCopyInviteKey">复制口令给新人</view>
			<view v-else class="btn-confirm" :style="{width:`${tipBtn.length==2?'310rpx':'395rpx'}`}" :class="{'random-confirm':getSelectType()}" @click="onClickBuy()">
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

		<cardplay :operationShow="operaData.operaShow" :operaType="operaData.operaType" @operacancel="operaData.operaShow=false" />

		<share :operationShow="shareObj.shareShow" :shareData="shareObj.shareData" @operacancel="shareObj.shareShow=false" />

		<!-- 自选球队 -->
		<checkTeamPay :teamCheckShow="choiceTeamData.teamCheckShow" :choiceTeamData="choiceTeamData"
			@teamPaycancel="onClickTeamCheckCancel" @teamCheck="onClickTeamCheck" @branchCheck="onClickBranchCheck"
			@cartDel="onClickDeleteCart" @joinCart="joinCart" @baodui="onClickBaodui" @settlement="onClickSettlement"
			@buyRandomGood="onClickBuyRandomGood" @randomCountOver="onChangeRandomGood" />

		<!-- 自选球队随机 -->
		<checkTeamRandom :teamRandomShow="choiceTRData.show" :teamRandomData="choiceTRData.data"
			:teamrandomGood="choiceTRData.rData" :teamrandomRemainder="choiceTRData.remainder" :type="goodsData.pintuan_type"
			@teamRandomCancel="onClickteamRandomCancel" @cardCode="onClickAllCard" @buy="onClickTeamRandomBuy"
			@goodBuy="onClickRandomBuy" @randomCountOver="getGoodSelectTeamRandom" />

		<!-- 邀请新人活动弹窗 -->
		<invitePopup :showInvitePopup="showInvitePopup" :inviteResult="668"
			@cancelInvitePopup="onClickInvitePopupCancel" @popupBtn="onClickInviteCopy" />

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer.sync="showDrawer" :title="'拼团规则'">
			<view class="drawer-box" v-for="(item,index) in goodsDetailHelp" :key="index">
				<view class="drawer-help" v-html="item.content"></view>
			</view>
		</bottomDrawer>

		<!-- 免单 -->
		<view class="guess-num-box" v-if="goodsData.freeNoNum>0">
			<view class="guess-num-center">
				<image class="guess-mini" src="../../pages/act/static/guess/guess_mini.png"></image>
				可免单{{goodsData.freeNoNum}}组
			</view>
		</view>

		
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {
		getGoodsPintuanDetail,
		getGoodsRandom,
	} from '@/tools/switchUtil';
	import { goodsDetailRules, goodsDetailHelp } from "@/net/DataRules";
	import { goodDetailSpe } from "@/net/DataExchange"
	import { Md5 } from "ts-md5";
	import { parsePic } from "@/tools/util";
	import detailsManager from "./manager/detailsManager"
	const Manager =  detailsManager.getIns();
	const shareData = { shareUrl: '', title: '', summary: '', thumb: '' }
	@Component({})
	export default class ClassName extends BaseNode {
		parsePic = parsePic;
		defaultAvatar = app.defaultAvatar;
		goodsDetailRules = goodsDetailRules
		goodsDetailHelp = goodsDetailHelp;
		goodsSpe = goodDetailSpe;
		shareObj = {
			shareShow:false,
			shareData:{...shareData}
		};
		buyRecordList:any = [];
		goodsDesc:any = [];
		favorType = Manager.favorType;
		operaData = {...Manager.operaData};
		countData = {...Manager.countData};
		swiperData = {...Manager.swiperData};
		picData = {...Manager.picData}
		tipBtn = {...Manager.tipBtn};
		goodCode = '';
		goodsData: any = [];
		choiceTeamData = {...Manager.choiceTeamData};
		choiceTRData = {...Manager.choiceTRData};
		// 支付方式
		payChannel: any = [];
		showInvitePopup = false;
		// 底部抽屉
		showDrawer = false;
		source="";
		// 猜你喜欢
		likeGoodList:any = [];
		planData = {...Manager.planData}
		relativeOnce = false;
		// 可领取优惠券列表
		getCouponList:any = [];
		userData = app.data;
		cheduiData = {};
		showCheduiDraw = false;
		cheduiDataAva:any = '';
		// 商家好卡
		cardList = [];
		seriesCardEnd = true;
		onLoad(query: any) {
			// #ifndef MP
			const goodCode = query.goodCode ||query.id
			this.goodCode = goodCode;
			this.source=query.source
			this.getGoodData(goodCode,()=>{
				// 购买记录
				if (this.goodsData.state == 1) {
					app.http.Get(`dataApi/good/${goodCode}/buyRecord`, {}, (res: any) => {
						if (res.list) this.buyRecordList = res.list.filter((x:any,index:number)=>{
							return index<5
						})
					})
				}
				// 查询可领取优惠券
				setTimeout(()=>{
					this.queryCoupon()
				},200)
				// 猜你喜欢
				let ts = Math.floor(new Date().getTime()/1000);
				let relativeParams = {
					ts:ts,
					s:Md5.hashStr(`kww_goodrelative_sign_${goodCode}_${ts}_2022`)
				}
				setTimeout(()=>{
					this.getRelative(goodCode,relativeParams)
					// 商品精彩时刻
					this.reqSeriesCards()
				},500)
			});
			// #endif
		}
		onShow() {
			// #ifndef MP
			if (this.goodsData != '') {
				this.getGoodData(this.goodCode);
			}
			// #endif
			uni.getNetworkType({
				success: (res) => {
					if (res.networkType == 'none') {
						uni.showModal({
							title: '提示',
							content: '当前无网络服务，请开启网络',
							success: function(res) {}
						});
					}
				}
			});
		}
		onHide() {
			uni.offNetworkStatusChange((res) => {});
		}
		//   下拉刷新
		onPullDownRefresh() {
			this.getGoodData(this.goodCode,() => {
				uni.stopPullDownRefresh();
			})
		}
		// 数据详情赋值
		getGoodData(goodCode: any,cb?:Function) {
			const { countData } = this;
			clearInterval(countData.countInterval);
			let ts = Math.floor(new Date().getTime()/1000);
			let params = {
				ts:ts,
				s:Md5.hashStr(`kww_good_sign_${goodCode}_${ts}_2022`)
			}
			app.http.Get(`dataApi/good/${goodCode}/detail`, params, (data: any) => {
				if (!data.good) {
					uni.showToast({ title: '无此商品', icon: 'none' })
					uni.switchTab({ url: '/pages/index/index' })
					return;
				}
				this.favorType = data.favorite>0;
				this.goodsData = data.good;
				this.getPlan(this.goodsData);
				this.payChannel = data.payChannel || [];
				if (data.joined) {
					this.tipBtn = [
						{ id: 1, name: '客服', url: '../../static/goods/v2/icon_kefu.png', class: 'kf' }, 
						{ id: 2, name: '卡密', url: '../../static/goods/v2/icon_order.png', class: 'order' }
					]
				}
				// 倒计时
				countData.countDown = data.good.state == 0? ( data.good.leftsec - (data.good.overAt - data.good.startAt)): data.good.leftsec;
				this.getGoodsImage();
				this.getCountDown();
				this.getGoodsSpe();
				this.getGoodsDesc()
				if((data.good.bit & 128) == 128){
					app.http.Get(`good/${goodCode}/chedui`,{},(res:any)=>{
						this.cheduiData = res
					})
				}
				cb && cb()
			})
		}
		queryCoupon(){
			const data = this.goodsData;
			// 商品非在售 或 禁用优惠券
			if((data.state!=1&&data.state!=0) || (data.bit & 1) == 1) return;
			app.http.Get(`dataApi/coupon/merchant/online/good/${data.goodCode}/brief`,{},(res:any)=>{
				this.getCouponList = res.list||[]
			})
		}
		getRelative(id:any,params:any){
			app.http.Get(`dataApi/good/${id}/relative`,params,(res:any)=>{
				if(res.state==0 && !this.relativeOnce){
					this.relativeOnce = true
					setTimeout(()=>{
						this.getRelative(id,params)
					},500)
					return;
				}
				this.likeGoodList = res.state == 1 && res.goodList ? res.goodList : []
			})
		}
		getProgress() {
			app.http.Get(`dataApi/good/${this.goodCode}/progress`, {}, (res: any) => {
				this.goodsData.currentNum = res.data.currentNum;
				this.goodsData.totalNum = res.data.totalNum;
				this.goodsData.lockNum = res.data.lockNum;
			})
		}
		reqSeriesCards() {
			app.http.Get(`dataApi/cardCheck/good/rarityCard/list/${this.goodCode}`, {}, (res: any) => {
				this.cardList = res.list || []
				this.seriesCardEnd = !( res.list && res.list.length>0)
			})
		}
		/**
		 * 设置商品图片
		 */
		getGoodsImage() {
			const { picData } = this;
			const goodsPic = this.goodsData.pic
			let pic:any = decodeURIComponent(goodsPic.carousel);
			let carousel: any = [];
			if (pic.indexOf(',') == -1) {
				carousel.push(parsePic(pic))
			} else {
				carousel = pic.split(',')
				carousel = carousel.map((x:any)=>{
					return parsePic(x)
				})
			}
			this.swiperData.carouselLength = carousel.length;
			let yuanfeng = goodsPic.yuanfeng ? decodeURIComponent(goodsPic.yuanfeng).split(',') : [];
			yuanfeng = yuanfeng.map((x:any)=>{
				return parsePic(x)
			})
			picData.detailImg = [...yuanfeng];
			picData.carousel = [...carousel, ...yuanfeng];
		}
		/**
		 * 倒计时时间计算
		 */
		getTime() {
			const { countData } = this;
			let day = String(Math.floor(countData.countDown / 3600 / 24));
			let day_num = countData.countDown - 3600 * 24 * Number(day)
			let hour = Math.floor((day_num) / 3600) < 10 ? '0' + Math.floor((day_num) / 3600) : Math.floor((day_num) /
				3600);
			let minute = Math.floor((day_num - 3600 * Number(hour)) / 60) < 10 ? '0' + Math.floor((day_num - 3600 *
				Number(hour)) / 60) : Math.floor((day_num - 3600 * Number(hour)) / 60);
			let second = Math.floor((day_num - 3600 * Number(hour)) % 60) < 10 ? '0' + Math.floor((day_num - 3600 *
				Number(hour)) % 60) : Math.floor((day_num - 3600 * Number(hour)) % 60);
			if (Number(day) > 0) {
				countData.countDay = day;
			}
			countData.countHour = hour;
			countData.countMinute = minute;
			countData.countSecond = second
		}
		/**
		 * 倒计时定时器
		 */
		getCountDown() {
			const { countData } = this;
			this.getTime()
			countData.countInterval = this.scheduler(() => {
				if (this.countData.countDown > 0) {
					this.countData.countDown--;
					this.getTime()
				} else {
					if(this.goodsData.state == 0){
						this.getGoodData(this.goodCode);
					}
					if (this.goodsData.state == 1) {
						this.goodsData.state = -99
					}
					clearInterval(countData.countInterval)
				}
			}, 1);
		}
		/**
		 * 商品规格、配置、形式
		 */
		getGoodsSpe() {
			let data = this.goodsData;
			const spec = data.spec.name;
			const num = data.spec.num+'张'
			if (this.goodsData.isSelect) {
				this.goodsSpe = {
					spec: { id: 3, name: spec, desc: '拼团规格' },
					num:{id:4,name:num,desc:'卡片数量'},
					pintuan_type: { id: 1, name: '自选球队', desc: '拼团形式'}
				};
			} else {
				this.goodsSpe.spec.name = spec;
				this.goodsSpe.num.name = num;
				this.goodsSpe.pintuan_type.name = getGoodsPintuanDetail(data.pintuan_type);
				this.goodsSpe.random_type.name = getGoodsRandom(data.random_type);
			}
		}
		/**
		 * 商品拼团详情说明
		 */
		getGoodsDesc(){
			const { goodsData } = this; 
			let desc = decodeURIComponent(goodsData.desc);
			const newDesc = desc.indexOf('\n') > -1 ? desc.split('\n') : desc.split('\r');
			const newData = newDesc.map((x:any)=>{
				let data = x.indexOf('：')!=-1?x.split('：'):x.split(':');
				return {name:data[0],desc:data[1]}
			})
			const IandT = [
				{name:'拼团编号',desc:`${goodsData.goodCode}`},
				{name:'开售时间',desc:uni.$u.timeFormat(goodsData.startAt,'yyyy-mm-dd hh:MM:ss')},
			]
			this.goodsDesc = [...IandT,...newData].splice(0,6)
		}	
		onClickTipBtn(item: any) {
			if (item.id == 1) {
				app.platform.hasLoginToken(()=>{
					let params = {
						agentExten:this.goodsData.kefu||'',
						businessParam:'goodCode:'+this.goodCode
					}
					app.platform.heliService(params)
				})
			}
			if (item.id == 2) {
				uni.navigateTo({ url: '/pages/userinfo/order_myCard?code=&goodCode=' + this.goodCode })
			}
		}
		onClickBack() {
			uni.navigateBack({ delta: 1 });
		}
		onClickShops() {
			app.platform.hasLoginToken(()=>{
				const publisher = this.goodsData.publisher
				this.goMerchantPage(publisher.alias)
			})
		}
		onClickAllCard(data ? : any) {
			const gooData = this.goodsData
			let url = `/pages/goods/all_good_card?code=${gooData.goodCode}&type=${gooData.pintuan_type}`;
			uni.navigateTo({ url: data ? `${url}&teamId=${data.id}` : url })
		}
		onClickNiceTime(){
			app.platform.hasLoginToken(()=>{
				uni.navigateTo({ url: `/pages/merchant/niceTime?alias=${this.goodsData.publisher.alias}` })
			})
		}
		// 分享
		onClickShare() {
			const { shareObj } = this;
			const { goodsData } = this;
			if (!shareObj.shareShow) {
				if (shareObj.shareData.shareUrl == '') {
					shareObj.shareData = {
						shareUrl: `share/h5/#/pages/goods/goods_details?id=${goodsData.goodCode}`,
						title: goodsData.title,
						summary: goodsData.title,
						thumb: goodsData.pic.thumb||this.picData.carousel[0]
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
		isPullDown(isPull:boolean) {
			//#ifdef APP-PLUS
			//获取当前 Webview 窗口对象
			const pages = getCurrentPages();  
			const page = pages[pages.length - 1];  
			//@ts-ignore
			const currentWebview = page.$getAppWebview();
			//根据状态值来切换禁用/开启下拉刷新
			currentWebview.setStyle({  
				pullToRefresh: {  
					support: isPull,  
					style: 'circle'
				}  
			});  
			//#endif
		}
		onClickBuy() {
			app.platform.hasLoginToken(()=>{
				const { goodsData } = this
				if(this.getPriceStart()) {
					this.isPullDown(false)
				}
				// 自选球队
				if (goodsData.isSelect) {
					this.getGoodSelect(() => {
						this.getGoodSelectBranch();
						this.getGoodSelectCart()
						this.choiceTeamData.teamCheckShow = true;
					})
					return;
				}
				// 自选随机球队
				if (goodsData.pintuan_type == 11 || goodsData.pintuan_type == 12) {
					this.getGoodSelectTeamRandom(() => {
						this.choiceTRData.show = true;
					})
					return;
				}
				if (this.goodSurplusNum <= 0) {
					uni.showToast({ title: '该商品已售罄', icon: 'none' })
					return;
				}
				uni.navigateTo({
					url: `confirmorder?data=${encodeURIComponent(JSON.stringify(goodsData))}&payChannel=${encodeURIComponent(JSON.stringify(this.payChannel))}`
				})
			})
		}
		onClickResult(chooseID: number) {
			let random = this.goodsData.pintuan_type == 10 ? true : false
			uni.navigateTo({
				url: `goods_result_list?chooseIds=${chooseID}&code=${this.goodCode}&random=${random}`
			})
		}
		onClickLive() {
			if(this.source=='livePage') {
				uni.navigateBack({ delta:1 })
				return
			}
			if (this.goodsData.broadcast.third&&this.goodsData.broadcast.third == 1001) {
				const { publisher } = this.goodsData
				app.platform.goZgLive({
					roomID:this.goodsData.broadcast.roomId,
					merchantId:publisher.id,
					state:this.goodsData.broadcast.state,
					playCode:this.goodsData.broadcast.playCode,
					isAnchor:false,
					goodCode: this.goodsData.goodCode,
					alias:publisher.alias
				})
				return
			}
			app.platform.goWeChatLive({
				playCode: this.goodsData.broadcast.playCode,
				goodCode: this.goodsData.goodCode
			})
		}
		onClickCardPlay(item: any) {
			const { operaData } = this;
			if (item.id <= 2) {
				operaData.operaShow = true;
				operaData.operaType = item.id
			}
		}
		// 随机倒计时结束
		onChangeRandomGood() {
			this.getGoodSelect()
		}
		getPriceStart() {
			const { goodsData } = this
			return goodsData.isSelect || goodsData.pintuan_type == 11 || goodsData.pintuan_type == 12
		}
		getSelectType() {
			switch (this.goodsData.pintuan_type) {
				case 10:
				case 11:
				case 12:
					return true;
				default:
					return false
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
			const { choiceTeamData } = this;
			if (choiceTeamData.branchData[choiceTeamData.branchCheckIndex].soldOut) {
				uni.showToast({
					title: '该商品已售罄',
					icon: 'none'
				})
				return;
			}
			if (choiceTeamData.branchData[choiceTeamData.branchCheckIndex].lock) {
				uni.showToast({
					title: '该商品暂时不能支付',
					icon: 'none'
				})
				return;
			}
			app.http.Post(`good/select/cart/${this.goodCode}/add`, {
				id: [choiceTeamData.branchData[choiceTeamData.branchCheckIndex].id]
			}, (res: any) => {
				this.getGoodSelectCart()
			})
		}
		onClickSettlement() {
			const { choiceTeamData } = this;
			if (choiceTeamData.cartData.available == 0) return;
			uni.navigateTo({
				url: `confirmorder?data=${encodeURIComponent(JSON.stringify(this.goodsData))}&cart=${encodeURIComponent(JSON.stringify(choiceTeamData.cartData))}&payChannel=${encodeURIComponent(
						JSON.stringify(this.payChannel))}`
			})
			this.onClickTeamCheckCancel()
		}
		// 包队
		onClickBaodui() {
			const { choiceTeamData } = this;
			let price = this.getBranchPrice(choiceTeamData.branchData)
			const teamCheckData = choiceTeamData.teamData[choiceTeamData.teamCheckIndex]
			uni.navigateTo({
				url: `confirmorder?data=${encodeURIComponent(JSON.stringify(this.goodsData))}&baodui=${teamCheckData.id}&price=${price}&baoduiName=${teamCheckData.name}&payChannel=${encodeURIComponent(JSON.stringify(this
						.payChannel))}`
			})
			this.onClickTeamCheckCancel()
		}
		getBranchPrice(list: any) {
			let price = 0;
			for (let i in list) {
				price += list[i].price
			}
			return price;
		}
		// 购买剩余随机
		onClickBuyRandomGood() {
			uni.navigateTo({
				url: `confirmorder?data=${encodeURIComponent(JSON.stringify(this.goodsData))}&payChannel=${encodeURIComponent(JSON.stringify(this.payChannel))}&payRandomPrice=${this.choiceTeamData.randomMode.good.price}`
			})
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
		onClickTeamRandomBuy(data: any) {
			const params = `&payRandomTeam=${encodeURIComponent(JSON.stringify(data))}`
			this.toConfirmorder(params)
		}
		onClickRandomBuy(id: number) {
			const params = `&selectRanId=${id}`
			this.toConfirmorder(params)
		}
		toConfirmorder(params:string){
			if((this.goodsData.state==0)){
				uni.showToast({ title:'暂未开售', icon:'none' })
				return;
			}
			uni.navigateTo({
				url: `confirmorder?data=${encodeURIComponent(JSON.stringify(this.goodsData))}&payChannel=${encodeURIComponent(JSON.stringify(this.payChannel))}${params}`
			})
			this.onClickteamRandomCancel()
		}
		onClickteamRandomCancel() {
			this.isPullDown(true)
			this.choiceTRData.show = false;
		}
		// 复制邀请口令
		onClickCopyInviteKey() {
			app.http.Post('activity/invite/getKey', {
				code: this.goodCode
			}, (res: any) => {
				uni.setClipboardData({
					data: res.content,
					showToast: false,
					success: () => {
						this.showInvitePopup = true;
					}
				});
			})
		}
		// 复制弹窗关闭
		onClickInvitePopupCancel() {
			this.showInvitePopup = false;
		}
		// 
		onClickInviteCopy(type: any) {
			plus.runtime.openURL("weixin://");
			this.onClickInvitePopupCancel();
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
		getCountStr(str: any, index: number) {
			let Str = String(str)
			return Str.substr(index, 1)
		}
		/**
		 * 设置进度
		 */
		getPlan(item:any){
			const width = Math.round((Number(item.lockNum) + Number(item.currentNum)) / Number(item.totalNum) * 10000)/100;
			const saleRatio = item.saleRatio>0&&item.saleRatio<1?Math.round((item.saleRatio)*10000)/100:0;
			const str = `${saleRatio}%`;
			this.planData = {
				width:Math.max(width,saleRatio),
				str,
				showMsg:width>=saleRatio
			}
		}
		// 商品剩余数量
		public get goodSurplusNum() : number {
			const { goodsData } = this;
			return goodsData.totalNum - (goodsData.currentNum + goodsData.lockNum)
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

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		border-bottom: 1px solid #F4F3F2;

		.tab-header {
			width: 100%;
			height: 88rpx;
			display: flex;
			box-sizing: border-box;
			padding: 0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}

		.icon-back {
			width: 80rpx;
			height: 88rpx;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.header-title {
			height: 88rpx;
			line-height: 88rpx;
			font-size: $font-34;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}

		.header-icon {
			height: 88rpx;
			display: flex;
			align-items: center;
			position: absolute;
			right: 40rpx;
			top: 0;
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
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #F4F4F4;
	}

	.swiper-btn {
		height: 42rpx;
		font-size: 21rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #F4F4F4;
		margin-left: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper-btn-current {
		font-size: 23rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
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
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #14151A;
		margin-bottom: 20rpx;
		padding-top: 27rpx;
	}

	.header-price {
		font-size: 38rpx;
		font-family: Impact;
		font-weight: 600;
		color: #FFFFFF;
		box-sizing: border-box;
		padding-top: 10rpx;
	}
	.header-price text {
		font-size: 50rpx;
		font-family: Impact;
		font-weight: 400;
		color: #FFFFFF;
		margin-left: 10rpx;
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

	.header-price .price-qi {
		font-size: 20rpx;
		color: #ffffff;
		font-weight: 200;
	}

	.price-black .price-qi {
		font-size: 20rpx;
		color: #ACAEB7;
		font-weight: 200;
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
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #14151B;
	}

	.icon-end {
		width: 100%;
		text-align: right;
		font-size: 21rpx;
		font-family: PingFangSC-Regular;
		font-weight: 500;
		color: #FFFFFF;
		margin-bottom: 10rpx;
		margin-top: 5rpx;
	}

	.countdown-content {
		width: 100%;
		height: 27rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.countdown-index {
		height: 36rpx;
		text-align: center;
		line-height: 36rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		font-weight: 600;
		color: #FFFFFF;
		border-radius: 3rpx;
		margin-right: 4rpx;
	}
	.countdown-day {
		margin-right: 10rpx !important;
	}
	.countdown-day text{
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		color: #FFFFFF;
		font-weight: 400;
	}
	.countdown-icon {
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 400;
		color: $color-F;
		margin: 0 1rpx;
	}
	.header {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx ;
		padding-bottom: 13rpx;
	}
	.header-top-id {
		width: 100%;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
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
			font-size: 29rpx;
			font-family: PingFangSC-Medium ;
			font-weight: 400;
			color: #333333;
			line-height: 48rpx;
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
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
		}
		&-plan {
			width: 100%;
			margin-top: 16rpx;
			margin-bottom: 23rpx;
			.plan-top-line{
				width:100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
				align-items: flex-end;
				.plan-top-rank{
					height:30rpx;
					line-height: 30rpx;
					display: flex;
					align-items: center;
					font-size: 23rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
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
				font-family: PingFangSC-Regular;
				font-weight: 400;
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
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #C0C0C0;
				text-align: right;
				margin-bottom: 0rpx;
				display: flex;
				align-items: baseline;
			}
			.header-top-plan-num-str{
				height:30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #C0C0C0;
				display: flex;
				align-items: baseline;
			}
			.header-shengyu{
				height:30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #C0C0C0;
				display: flex;
				align-items: baseline;
				margin-right: 6rpx;
			}
			.header-top-plan-box{
				display: inline-block;
				height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 600;
				color: #959695;
				line-height: 30rpx;
				text-align: right;
			}
			.header-top-plan-numbottom {
				height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #C0C0C0;
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
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
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

	.header-bottom {
		width: 100%;
		height: 88rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-index {
			height: 88rpx;
			box-sizing: border-box;
			text-align: center;
			&-name {
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Medium;
				font-weight: 400;
				color: #333333;
				margin-bottom: 3rpx;
			}
			&-desc {
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #C0C0C0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.goods-seller {
		width: 100%;
		box-sizing: border-box;
		border-radius: 5rpx;
		padding:34rpx 30rpx;
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
				width: 420rpx;
				height: 91rpx;
				box-sizing: border-box;
				padding: 5rpx 0 4rpx 35rpx;
				display: flex;
				flex-wrap: wrap;
				&-name {
					width: 100%;
					font-size: 30rpx;
					font-family: PingFangSC-Medium;
					font-weight: 400;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				&-tips {
					width: 100%;
					font-size: 24rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #C0C0C0;
				}
			}
		}
		.goods-seller-desc-js {
			height: 28rpx;
			background: #FBF2F3;
			font-size: 23rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
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
		padding: 28rpx 30rpx 30rpx 30rpx;

		&-title {
			width: 100%;
			margin-bottom: 18rpx;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			.goods-desc-title-left {
				font-size: 31rpx;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: #333333;
			}

			.goods-desc-title-right {
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #c0c0c0;
				display: flex;
				align-items: center;
			}

			.goods-desc-title-help {
				width: 11rpx;
				height:17rpx;
				margin-left: 21rpx;
			}
		}

		&-explain {
			width: 100%;
			box-sizing: border-box;
			font-size: 27rpx;
			// font-family: PingFangSC-Regular, PingFang SC;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
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
				font-family: PingFangSC-Regular, PingFang SC;
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
		background: $color-F;
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
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #949494
				}
			}

			.icon-kf {
				width: 38rpx;
				height: 36rpx;
				margin-bottom: 3rpx;
			}

			.icon-order {
				width: 37rpx;
				height: 36rpx;
				margin-bottom: 3rpx;
			}
		}
		.btn-cardlist{
			width: 150rpx;
			height: 82rpx;
			border: 1rpx solid #949494;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			font-size: 29rpx;
			font-family: PingFangSC-Semibold;
			font-weight:400;
			color: #333333;
			justify-content: center;
			box-sizing: border-box;
			margin-right: 12rpx;
		}
		.cardlist-icon{
			width: 32rpx;
			height:34rpx;
			margin-right: 13rpx;
		}
		.btn-confirm {
			width: 395rpx;
			background: $btn-red;
			text-align: center;
			font-family: PingFangSC-Semibold;
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
			font-family: PingFangSC-Medium, PingFang SC;
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
			font-family: PingFangSC-Medium, PingFang SC;
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
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 43rpx;
		margin-bottom: 30rpx;
	}

	.detail-bottom-box {
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding: 30rpx 25rpx 0 25rpx;
	}

	.detail-title {
		width: 100%;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		font-size: 31rpx;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.detail-title text {
		font-family: PingFangSC-Regular;
		font-size: 23rpx;
		font-weight: 500;
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
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: 500;
		color: #818080;
		line-height: 40rpx;
		margin-bottom: 30rpx;
	}

	.detail-bottom-explain-title {
		font-family: PingFangSC-Medium;
		font-size: 27rpx;
		font-weight: 500;
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
				font-family: PingFangSC-Regular;
				font-weight: 400;
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
		font-family: PingFangSC-Regular;
		font-weight: 400;
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
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #FFFFFF;
	}
	.record-item-avatar{
		width: 30rpx;
		height:30rpx;
		margin-right: 18rpx;
		border-radius: 50%;
	}
	.record-item-name{
		width: 85rpx;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-right: 20rpx;
	}
	.record-item-title{
		width: 252rpx;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-right: 55rpx;
	}
	.record-item-num{
		width: 80rpx;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.record-item-time{
		width: 150rpx;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C0C0;
		text-align: right;
	}
	.flex-between{
		display: flex;
		justify-content: space-between;
	}
	.goods-desc-explain-box{
		width: 650rpx;
		display: flex;
		justify-content: space-between;
		margin:0 auto;
		.explain-name{
			width: 160rpx;
			height:80rpx;
			background:#F3F4F7;
			font-size: 24rpx;
			font-family:PingFangSC-Light;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom:4rpx;
		}
		.explain-desc{
			width: 487rpx;
			height:80rpx;
			background:#F3F4F7;
			font-size: 24rpx;
			font-family:PingFangSC-Light;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding:0 38rpx;
			margin-bottom:4rpx;
			line-height:30rpx
		}
	}
</style>
