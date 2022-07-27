<template>
	<view class="content" v-show="goodsData!=''">
		<!-- #ifndef MP -->
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
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
			<swiper class="swiper" :current="swiperCurrent" autoplay="true" circular="true"
				indicator-active-color="#ffffff" @change="onChangeSwiperCurrent">
				<swiper-item v-for="(item,index) in goodsImg" :key="index" @click="onClickPreviewImage(index)">
					<view class="goods-img-content">
						<image class="goods-img" :src="item" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
			<view class="swiper-popup">
				<view class="swiper-dots">{{swiperCurrent+1}}/{{goodsImg.length}}</view>
				<view class="swiper-btn" v-show="goodsData.pic&&goodsData.pic.yuanfeng"
					:class="{'swiper-btn-current':swiperTabCurrent==index}" v-for="(item,index) in swiperTab"
					:key="index" @click="onClickSwiperTab(index)">{{item}}</view>
			</view>
		</view>
		<view class="detail-index-bg">
			<view class="detail-bg">
				<view class="header-content-end" v-if="goodsState>=2">
					<view class="header-price">¥<text>{{goodsData.price}}</text><text
							class="price-qi">{{getPriceStart()?'起':''}}</text></view>
				</view>
				<view class="header-content" :class="{'random-bg':getSelectType()}" v-else-if="goodsState==1||goodsState==0">
					<view class="header-price">¥<text>{{goodsData.price}}</text><text
							class="price-qi">{{getPriceStart()?'起':''}}</text></view>
					<view class="header-right">
						<view class="icon-end">{{goodsState==0?'距开售':'距结束'}}</view>
						<view class="countdown-content">
							<view v-if="countDay>0" class="countdown-index">{{countDay}}</view>
							<view v-if="countDay>0" class="countdown-index countdown-day">天</view>
							<view class="countdown-index">{{getCountStr(countHour,0)}}</view>
							<view class="countdown-index">{{getCountStr(countHour,1)}}</view>
							<view class="countdown-icon">:</view>
							<view class="countdown-index">{{getCountStr(countMinute,0)}}</view>
							<view class="countdown-index">{{getCountStr(countMinute,1)}}</view>
							<view class="countdown-icon">:</view>
							<view class="countdown-index">{{getCountStr(countSecond,0)}}</view>
							<view class="countdown-index">{{getCountStr(countSecond,1)}}</view>
						</view>
					</view>
				</view>
				<view class="header">
					<view class="header-top">
						<view class="header-top-title">
							{{goodsData.title}}
						</view>

						<view class="header-top-plan">
							<view class="goodslist-progress" :class="{'goodslist-progress-select':getSelectType()}">
								<view class="progress-mask"
									:style="{width:(100-getPlan(goodsData.lockNum,goodsData.currentNum,goodsData.totalNum))+'%'}">
								</view>
							</view>
							<view class="header-top-plan-num" v-if="goodsState>=2">已完成</view>
							<view class="header-top-plan-num" v-else>
								余{{goodsData.totalNum-(goodsData.currentNum+goodsData.lockNum)}}/共{{goodsData.totalNum}}
								<view class="header-top-plan-numbottom">
									{{goodsData.lockNum>0?'('+goodsData.lockNum+'未付款)':''}}
								</view>
							</view>
						</view>
					</view>

					<view class="header-bottom">
						<view class="header-bottom-index" v-for="item in goodsSpe" :key="item.id"
							@click="onClickCardPlay(item)">
							<image class="header-bottom-index-pic" :src="item.icon" />
							<view class="header-bottom-index-name">{{item.name}}</view>
							<view class="header-bottom-index-desc">{{item.desc}}</view>
						</view>
					</view>
					<!-- <view class="header-top-id">商品ID：{{goodsId}}</view> -->
				</view>
			</view>

			<!-- 邀请新人步骤图 -->
			<inviteStep v-if="goodsData.specialType&&goodsData.specialType.indexOf('invite')!=-1" :goodsStep="true" />
			<!-- 邀请新人步骤图 -->

			<!-- 活动展示 -->
			<goodAct :goodsData="goodsData" />

			<view class="detail-bg" v-if="goodsData.extraDesc">
				<view class="special-explain">{{goodsData.extraDesc}}</view>
			</view>

			<!-- 卖家信息 -->
			<view class="detail-bg">
				<view class="goods-seller" v-if="goodsData.publisher">
					<view class="goods-seller-left">
						<muqian-lazyLoad class="goods-seller-left-avatar"
							:src="goodsData.publisher.avatar!=''?decodeURIComponent(goodsData.publisher.avatar):defaultAvatar"
							mode="aspectFill" :borderRadius="'50%'"/>
						<view class="goods-seller-left-desc">
							<view class="goods-seller-left-desc-name">{{goodsData.publisher.name}}</view>
							<view class="goods-seller-left-desc-tips">粉丝{{goodsData.publisher.fans}} |
								在售{{goodsData.publisher.sale}}</view>
							<view class="goods-seller-left-desc-js">商品由该商家在平台寄售</view>
						</view>
					</view>
					<view class="goods-seller-right" @click="onClickShops">进店</view>
				</view>
			</view>

			<!-- 商品详情 -->
			<view class="detail-bg">
				<view class="goods-desc">
					<view class="goods-desc-title">
						<view class="goods-desc-title-left">拼团详情</view>
						<view class="goods-desc-title-right" @click.stop="showDrawer = true">
							拼团规则
							<image class="goods-desc-title-help" src="../../static/goods/v2/icon_help.png" />
						</view>
					</view>
					<view class="goods-desc-explain">
						<view class='goods-desc-explain-text' v-for="item in goodsDesc" :key="item.id">
							<view class="explain-desc">{{item}}</view>
						</view>
					</view>

					<view class="goods-step-box">
						<view class="goods-step-index" :class="{'goods-step-index-tips':index<3}"
							v-for="(item,index) in stepData" :key="index">
							<image class="goods-step-pic" :src="item.pic" />
							<view class="goods-step-name">{{item.name}}</view>
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
						v-for="(item,index) in detailImg" :key="index" :src="item" />
				</view>
			</view>
			<view class="detail-title">购买须知</view>
			<view class="detail-bottom-explain">{{buyExplain}}</view>
			<view class="detail-title">常见问题</view>
			<view class="detail-bottom-explain" v-for="(item,index) in goodsDetailRules" :key="index">
				<view class="detail-bottom-explain-title">{{item.title}}</view>
				{{item.desc}}
			</view>
		</view>

		<!-- 直播可拖动控件 -->
		<movable-area class="movable-area" v-if="goodsData.broadcast">
			<movable-view class="movable-content" direction="all" x="530rpx" y="750rpx">
				<livewicket :liveImg="decodeURIComponent(goodsData.broadcast.pic)"
					:liveStatus="goodsData.broadcast.name" @live="onClickLive"></livewicket>
			</movable-view>
		</movable-area>

		<!-- 底部吐司 -->
		<tips :tipsData="buyRecordList" v-if="buyRecordList!=''"></tips>
		<!-- 底部按钮 -->
		<view class="btn-content" v-if="goodsState==1||(goodsState==0&&goodsData.isSelect)">
			<view class="btn-content-left">
				<view class="btn-content-left-index" v-for="item in tipBtn" :key="item.id" @click="onClickTipBtn(item)">
					<image :class="'icon-'+item.class" :src="item.url" mode="aspectFill" />
					<view class="btn-content-left-index-name">{{item.name}}</view>
				</view>
			</view>
			<view v-if="goodsData.specialType&&goodsData.specialType.indexOf('invite')!=-1" class="btn-confirm"
				@click="onClickCopyInviteKey">复制口令给新人</view>
			<view v-else class="btn-confirm" :class="{'random-confirm':getSelectType()}" @click="onClickBuy()">
				{{goodsData.isSelect?'选择编号':'立即购买'}}
			</view>
		</view>
		<view class="btn-contented" :class="{'joined':joined}" v-else-if="goodsState>=2">
			<view class="btn-content-left" v-if="joined">
				<view class="btn-content-left-index" @click="onClickTipBtn({id:2})">
					<image class="icon-order" :src="'../../static/goods/v2/icon_order.png'" mode="aspectFill" />
					<view class="btn-content-left-index-name">我的卡密</view>
				</view>
			</view>
			<view class="btn-pt" @click="onClickResult(0)">拼团结果</view>
			<view class="btn-ck" @click="onClickResult(1)">拆卡报告</view>
		</view>

		<cardplay :operationShow="operationCardShow" :operaType="operaType" @operacancel="onClickCardCancel" />

		<share :operationShow="operationShow" :shareData="shareData" @operacancel="onClickShareCancel" />

		<!-- 自选球队 -->
		<checkTeamPay :teamCheckShow="teamCheckShow" :teamLeftSec="teamLeftSec" :teamCheckIndex="teamCheckIndex"
			:branchCheckIndex="branchCheckIndex" :teamData="teamData" :branchData="branchData" :cartData="cartData"
			:randomMode="randomMode" :randomNum="randomNum" :baoduiLeftSec="baoduiLeftSec" :baoduiState="baoduiState"
			@teamPaycancel="onClickTeamCheckCancel" @teamCheck="onClickTeamCheck" @branchCheck="onClickBranchCheck"
			@cartDel="onClickDeleteCart" @joinCart="joinCart" @baodui="onClickBaodui" @settlement="onClickSettlement"
			@buyRandomGood="onClickBuyRandomGood" @randomCountOver="onChangeRandomGood" />

		<!-- 自选球队随机 -->
		<checkTeamRandom :teamRandomShow="teamRandomShow" :teamRandomData="teamRandomData"
			:teamrandomGood="teamrandomGood" :teamrandomRemainder="teamrandomRemainder" :type="goodsData.pintuan_type"
			@teamRandomCancel="onClickteamRandomCancel" @cardCode="onClickAllCard" @buy="onClickTeamRandomBuy"
			@goodBuy="onClickRandomBuy" @randomCountOver="getGoodSelectTeamRandom" />

		<!-- 邀请新人活动弹窗 -->
		<invitePopup :showInvitePopup="showInvitePopup" :inviteResult="668"
			@cancelInvitePopup="onClickInvitePopupCancel" @popupBtn="onClickInviteCopy" />

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'拼团规则'" @closeDrawer="onClickCloseDrawer">
			<view class="drawer-box" v-for="(item,index) in goodsDetailHelp" :key="index">
				<view class="drawer-help" v-html="item.content"></view>
			</view>
		</bottomDrawer>

		<!-- 免单 -->
		<view class="guess-num-box" v-if="freeNoNum>0">
			<view class="guess-num-center">
				<image class="guess-mini" src="../../pages/act/static/guess/guess_mini.png"></image>
				可免单{{freeNoNum}}组
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {
		getGoodsPintuanDetail,
		getGoodsRandom,
		getGoodsPintuanSpe,
		getGoodsRandomSpe
	} from '@/tools/switchUtil';
	import {
		dateFormat
	} from '@/tools/util';
	import {
		goodsDetailRules,
		goodsDetailHelp
	} from "@/net/DataRules";
	import {
		goodDetailSpe,
		goodDetailStep
	} from "@/net/DataExchange"
	import { Md5 } from "ts-md5";
	import { parsePic } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		parsePic = parsePic;
		goodsDetailRules = goodsDetailRules
		goodsDetailHelp = goodsDetailHelp;
		goodsSpe: {
			[x: string]: any
		} = goodDetailSpe;
		stepData = goodDetailStep;
		goodsState = 0;
		defaultAvatar = app.defaultAvatar
		goodsId = '';
		goodsImg: any = [];
		carouselLength = 0;
		swiperCurrent = 0;
		swiperTab = ['商品', '原封图'];
		swiperTabCurrent = 0;
		detailImg: any = [];
		goodsData: any = [];
		countDay: any = '';
		countHour: any = '';
		countMinute: any = '';
		countSecond: any = '';
		count_down: any;
		countDown = 0;
		favorType = false;
		operaType = 0;
		goodsDesc: {
			[x: string]: any
		} = [];
		tipBtn: {
			[x: string]: any
		} = [{
			id: 1,
			name: '客服',
			url: '../../static/goods/v2/icon_kefu.png',
			class: 'kf'
		}];
		// 分享 
		operationShow = false;
		shareData: any = {
			shareUrl: '',
			title: '',
			summary: '',
			thumb: ''
		}
		operationCardShow = false;
		tipsData: {
			[x: string]: any
		} = [];
		buyRecordList: any = [];
		onNetWorkFunc: any;
		// 自选球队相关
		// 球队选择
		// 分支选择
		// 购物车数据
		teamCheckShow: boolean = false;
		teamLeftSec = 0;
		teamData: any = [];
		teamCheckIndex: number = 0;
		branchData: any = [];
		branchCheckIndex: number = 0;
		baoduiLeftSec = 0;
		baoduiState = -1;
		cartData: any = [];
		// 自选球队随机模式数据
		randomMode: any = ''

		// 自选球队随机相关
		teamRandomShow = false;
		teamRandomData: any = [];
		teamrandomGood: any = [];
		teamrandomRemainder: any = [];
		// 支付方式
		payChannel: any = [];
		// 邀请新人弹窗
		showInvitePopup = false;
		// 是否禁用优惠券
		disableCoupon = false;
		buyExplain =
			'商家所拆商品全部为原封，上架前会提交原箱/原盒视频，同时也会在直播之前展示原箱/原盒包装。卡片生产商在生产过程中，有机率出现装箱误差，商品详情描述仅供参考，最终拆卡结果以商品实物为准，希望各位用户悉知这种情况的发生。产品宣传图均为发行商官方制作，最终该系列卡片以箱内拆出的实物为准，请各位玩家在购买前知悉。';
		randomNum = 0;
		// 底部抽屉
		showDrawer = false;
		freeNoNum = 0;
		joined = false;
		onLoad(query: any) {
			// #ifndef MP
			this.goodsId = query.id;
			this.getGoodData(this.goodsId);
			// #endif
		}
		onShow() {
			// #ifndef MP
			if (this.goodsData != '') {
				this.getGoodData(this.goodsId);
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
			this.getGoodData(this.goodsId,() => {
				uni.stopPullDownRefresh();
			})
		}
		// 数据详情赋值
		getGoodData(id: any,cb?:Function) {
			clearInterval(this.count_down);
			let ts = Math.floor(new Date().getTime()/1000);
			let params = {
				ts:ts,
				s:Md5.hashStr('kww_good_sign_'+id+'_'+ts+'_2022')
			}
			app.http.Get('dataApi/good/' + id + '/detail', params, (data: any) => {
				if (data.good == null || data.good == undefined) {
					uni.showToast({
						title: '无此商品',
						icon: 'none'
					})
					uni.switchTab({
						url: '/pages/index/index'
					})
					return;
				}
				// 是否收藏
				this.favorType = data.favorite <= 0 ? false : true;
				// 数据详情
				this.goodsData = data.good;
				// 支付方式
				this.payChannel = data.payChannel || [];
				this.joined = data.joined
				if (data.joined) {
					this.tipBtn = [{
						id: 1,
						name: '客服',
						url: '../../static/goods/v2/icon_kefu.png',
						class: 'kf'
					}, {
						id: 2,
						name: '我的卡密',
						url: '../../static/goods/v2/icon_order.png',
						class: 'order'
					}]
				}
				// 状态
				this.goodsState = data.good.state;
				// 倒计时
				this.countDown = data.good.state == 0? ( data.good.leftsec - (data.good.overAt - data.good.startAt)): data.good.leftsec;
				// 免单
				this.freeNoNum = data.freeNoNum
				// 获取商品图片
				this.getGoodsImage();
				this.getDetailImage(decodeURIComponent(this.goodsData.pic.yuanfeng))
				// 倒计时
				this.getCountDown();
				// 商品规格、配置、形式、
				this.getGoodsSpe();
				let desc = decodeURIComponent(data.good.desc);
				let newData = desc.indexOf('\n') > -1 ? desc.split('\n') : desc.split('\r');
				this.goodsDesc = ['拼团 I D ：' + id, '开售时间：' + dateFormat(data.good.startAt), ...newData];
				if (this.goodsState == 1) {
					app.http.Get('dataApi/good/' + id + '/buyRecord', {}, (res: any) => {
						if (res.list) this.buyRecordList = res.list
					})
				}

				cb && cb()
			})
		}
		getProgress() {
			app.http.Get('dataApi/good/' + this.goodsId + '/progress', {}, (res: any) => {
				this.goodsData.currentNum = res.data.currentNum;
				this.goodsData.totalNum = res.data.totalNum;
				this.goodsData.lockNum = res.data.lockNum;
			})
		}
		// 商品图片
		getGoodsImage() {
			let pic:any = decodeURIComponent(this.goodsData.pic.carousel);
			let carousel: any = [];
			if (pic.indexOf(',') == -1) {
				carousel.push(parsePic(pic))
			} else {
				carousel = pic.split(',')
				carousel = carousel.map((x:any)=>{
					return parsePic(x)
				})
			}
			this.carouselLength = carousel.length;
			let yuanfeng = this.goodsData.pic.yuanfeng ? decodeURIComponent(this.goodsData.pic.yuanfeng).split(',') : [];
			yuanfeng = yuanfeng.map((x:any)=>{
				return parsePic(x)
			})
			this.goodsImg = [...carousel, ...yuanfeng];
		}
		// 详情图片
		getDetailImage(img: any) {
			if (img.indexOf(',') == -1) {
				this.detailImg.push(parsePic(img))
			} else {
				this.detailImg = img.split(',')
				this.detailImg = this.detailImg.map((x:any)=>{
					return parsePic(x)
				})
			}
		}

		// 倒计时时间计算
		getTime() {
			let day = String(Math.floor(this.countDown / 3600 / 24));
			let day_num = this.countDown - 3600 * 24 * Number(day)
			let hour = Math.floor((day_num) / 3600) < 10 ? '0' + Math.floor((day_num) / 3600) : Math.floor((day_num) /
				3600);
			let minute = Math.floor((day_num - 3600 * Number(hour)) / 60) < 10 ? '0' + Math.floor((day_num - 3600 *
				Number(hour)) / 60) : Math.floor((day_num - 3600 * Number(hour)) / 60);
			let second = Math.floor((day_num - 3600 * Number(hour)) % 60) < 10 ? '0' + Math.floor((day_num - 3600 *
				Number(hour)) % 60) : Math.floor((day_num - 3600 * Number(hour)) % 60);
			if (Number(day) > 0) {
				this.countDay = day;
			}
			this.countHour = hour;
			this.countMinute = minute;
			this.countSecond = second
		}
		// 倒计时定时器
		getCountDown() {
			this.getTime()
			this.count_down = this.scheduler(() => {
				if (this.countDown > 0) {
					this.countDown--;
					this.getTime()
				} else {
					if(this.goodsState == 0){
						this.getGoodData(this.goodsId);
					}
					if (this.goodsState == 1) {
						this.goodsState = -99
					}
					clearInterval(this.count_down)
				}
			}, 1);
		}
		// 拼团形式规格
		getGoodsSpe() {
			let data = this.goodsData;
			if (this.goodsData.isSelect) {
				this.goodsSpe = {
					spec: {
						id: 3,
						name: '',
						desc: '拼团规格'
					},
					pintuan_type: {
						id: 1,
						name: '自选球队',
						desc: '拼团形式',
						icon: '../../static/goods/v2/spe_zx.png'
					},
					spec_str: {
						id: 4,
						name: '查看',
						desc: '卡密列表',
						icon: '../../static/goods/v2/spe_ck.png'
					}
				};
			} else {
				this.goodsSpe.pintuan_type.name = getGoodsPintuanDetail(data.pintuan_type);
				this.goodsSpe.pintuan_type.icon = getGoodsPintuanSpe(data.pintuan_type);
				this.goodsSpe.random_type.name = getGoodsRandom(data.random_type);
				this.goodsSpe.random_type.icon = getGoodsRandomSpe(data.random_type);
			}
			this.getSpeNamePic(data.spec.name);
		}
		getSpeNamePic(name: string) {
			this.goodsSpe.spec.name = name;
			if (name.indexOf('箱') != -1) {
				this.goodsSpe.spec.icon = '../../static/goods/v2/spe_xiang.png'
			} else if (name.indexOf('1盒') != -1) {
				this.goodsSpe.spec.icon = '../../static/goods/v2/spe_he.png'
			} else {
				this.goodsSpe.spec.icon = '../../static/goods/v2/spe_duohe.png'
			}
		}
		onClickTipBtn(item: any) {
			if (item.id == 1) {
				if (app.token.accessToken == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				if (this.goodsData.kefu > 0) {
					uni.navigateTo({
						url: '/pages/userinfo/talk?targetUserId=' + this.goodsData.kefu + '&goodCode=' + this
							.goodsId
					})
					// 第三方客服
					// let params = {
					// 	agentExten:8005,
					// 	businessParam:'goodCode:'+this.goodsId
					// }
					// app.platform.heliService(params)
				} else {
					uni.showToast({
						title: '当前商品暂无客服',
						icon: 'none'
					})
				}

			}

			if (item.id == 2) {
				uni.navigateTo({
					url: '/pages/userinfo/order_myCard?code=&goodCode=' + this.goodsId
				})

			}
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		onClickShops() {
			// #ifndef MP
			if (app.token.accessToken == '') {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return;
			}
			// #endif

			uni.navigateTo({
				url: '/pages/userinfo/merchant_shopsV2?id=' + this.goodsData.publisher.id+'&alias='+this.goodsData.publisher.alias
			})
		}
		onClickAllCard(data ? : any) {
			let url = '/pages/goods/all_good_card?code=' + this.goodsData.goodCode + '&type=' + this.goodsData
				.pintuan_type;
			if (data) {
				url += '&teamId=' + data.id
			}
			uni.navigateTo({
				url: url
			})
		}
		// 分享
		onClickShare() {
			if (!this.operationShow) {
				if (this.shareData.shareUrl == '') {
					console.log(this.goodsData.pic.thumb)
					this.shareData = {
						shareUrl: "https://www.ka-world.com/share/h5/#/pages/goods/goods_details?id=" + this.goodsId,
						title: this.goodsData.title,
						summary: this.goodsData.title,
						thumb: this.goodsData.pic.thumb
					}
				}
				this.operationShow = true
			}
		}
		onClickFavor() {
			let url = !this.favorType ? "good/favor/" : "good/unfavor/"
			app.http.Post(url + this.goodsId, {}, (data: any) => {
				this.favorType = !this.favorType
			})
		}
		// 观看大图
		onClickPreviewImage(index: number) {
			uni.previewImage({
				urls: this.goodsImg,
				current: index,
				indicator: "number"
			});
		}
		onClickPreviewDetailImage(index: number) {
			uni.previewImage({
				urls: this.detailImg,
				current: index,
				indicator: "number"
			});
		}
		onClickBuy() {
			if (app.token.accessToken == '') {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return;
			}

			// 自选球队
			if (this.goodsData.isSelect) {
				this.getGoodSelect(() => {
					this.getGoodSelectBranch();
					this.getGoodSelectCart()
					this.teamCheckShow = true;
				})
				return;
			}
			// 自选随机球队
			if (this.goodsData.pintuan_type == 11 || this.goodsData.pintuan_type == 12) {
				this.getGoodSelectTeamRandom(() => {
					this.teamRandomShow = true;
				})
				return;
			}

			if (this.goodsData.totalNum - (this.goodsData.currentNum + this.goodsData.lockNum) <= 0) {
				uni.showToast({
					title: '该商品已售罄',
					icon: 'none'
				})
				return;
			}
			uni.navigateTo({
				url: 'confirmorder?data=' + encodeURIComponent(JSON.stringify(this.goodsData)) +
					'&payChannel=' + encodeURIComponent(JSON.stringify(this.payChannel))
			})
		}

		onClickResult(chooseID: number) {
			let random = this.goodsData.pintuan_type == 10 ? true : false
			uni.navigateTo({
				url: 'goods_result_list?chooseIds=' + chooseID + '&code=' + this.goodsId + '&random=' + random
			})
		}
		onClickLive() {

			if (this.goodsData.broadcast.third&&this.goodsData.broadcast.third == 1001) {
				const {
					publisher
				} = this.goodsData
				app.platform.goZgLive({
					roomID:this.goodsData.broadcast.roomId,
					merchantId:publisher.id,
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
			if (item.id <= 2) {
				this.operationCardShow = true;
				this.operaType = item.id
			}
			if (item.id == 4) {
				this.onClickAllCard()
			}
		}
		onClickCardCancel() {
			this.operationCardShow = false
		}
		onClickShareCancel() {
			this.operationShow = false
		}
		// 随机倒计时结束
		onChangeRandomGood() {
			this.getGoodSelect()
		}
		getPriceStart() {
			return this.goodsData.isSelect || this.goodsData.pintuan_type == 11 || this.goodsData.pintuan_type == 12
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
			app.http.Get('dataApi/good/' + this.goodsId + '/select', {}, (res: any) => {
				this.teamData = res.team;

				if (this.goodsData.state == 0) {
					this.teamLeftSec = res.good.preSaleLeftSec
				}
				if (res.good.randomMode) {
					this.randomMode = res.good.randomMode
					if (this.randomMode.state == 2) {
						this.teamCheckIndex = 999
					}
				}
				if (res.good.baoduiMode) {
					this.baoduiState = res.good.baoduiMode.state;
					this.baoduiLeftSec = res.good.baoduiMode.totalSecond;
					if (this.baoduiState == 1) {
						this.teamLeftSec = res.good.baoduiMode.leftSec;
					}

				}
				if (cb) cb()
			})
		}
		// 自选球队 获取球队分支
		getGoodSelectBranch() {
			// 随机选队
			if (this.teamCheckIndex == 999) {
				app.http.Get('dataApi/good/' + this.goodsId + '/select/randomNo', {}, (res: any) => {
					this.randomNum = 0;
					for (let i in res.list) {
						if (!res.list[i].isExtend) {
							this.randomNum++
						}
					}
					this.branchCheckIndex = -1
					this.branchData = res.list;
				})
				return;
			}
			let id = this.teamData[this.teamCheckIndex].id;
			this.branchCheckIndex = 0
			app.http.Get('dataApi/good/' + this.goodsId + '/select/branch', {
				teamId: id
			}, (res: any) => {
				this.branchData = res.list;
			})
		}
		getGoodSelectCart() {
			app.http.Get('dataApi/good/' + this.goodsId + '/select/cart', {}, (res: any) => {
				this.cartData = res.data;
			})
		}
		// 自选球队 遮罩点击
		onClickTeamCheckCancel() {
			this.teamCheckShow = false
		}
		// 自选球队 选择球队
		onClickTeamCheck(index: any) {
			if (this.teamCheckIndex == index) return;

			this.teamCheckIndex = index;
			this.getGoodSelectBranch()
		}
		// 自选球队 选择分支
		onClickBranchCheck(index: any) {
			if (this.branchCheckIndex == index) return;
			this.branchCheckIndex = index;
		}
		onClickDeleteCart(index: any) {
			if (index != 0 && index == '[]') {
				app.http.Post('good/select/cart/' + this.goodsId + '/delete', {
					id: []
				}, (res: any) => {
					this.getGoodSelectCart()
				})
				return;
			}
			let id = this.cartData.list[index].id
			app.http.Post('good/select/cart/' + this.goodsId + '/delete', {
				id: [id]
			}, (res: any) => {
				this.getGoodSelectCart()
			})
		}
		// 加入购物车
		joinCart() {
			if (this.branchData[this.branchCheckIndex].soldOut) {
				uni.showToast({
					title: '该商品已售罄',
					icon: 'none'
				})
				return;
			}
			if (this.branchData[this.branchCheckIndex].lock) {
				uni.showToast({
					title: '该商品暂时不能支付',
					icon: 'none'
				})
				return;
			}
			app.http.Post('good/select/cart/' + this.goodsId + '/add', {
				id: [this.branchData[this.branchCheckIndex].id]
			}, (res: any) => {
				this.getGoodSelectCart()
			})
		}
		onClickSettlement() {
			if (this.cartData.available == 0) return;
			uni.navigateTo({
				url: 'confirmorder?data=' + encodeURIComponent(JSON.stringify(this.goodsData)) + '&cart=' +
					encodeURIComponent(JSON.stringify(this.cartData)) + '&payChannel=' + encodeURIComponent(
						JSON.stringify(this.payChannel))
			})
			this.onClickTeamCheckCancel()
		}
		// 包队
		onClickBaodui() {
			let price = this.getBranchPrice(this.branchData)
			uni.navigateTo({
				url: 'confirmorder?data=' + encodeURIComponent(JSON.stringify(this.goodsData)) + '&baodui=' +
					this.teamData[this.teamCheckIndex].id + '&price=' + price + '&baoduiName=' + this.teamData[
						this.teamCheckIndex].name + '&payChannel=' + encodeURIComponent(JSON.stringify(this
						.payChannel))
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
				url: 'confirmorder?data=' + encodeURIComponent(JSON.stringify(this.goodsData)) +
					'&payChannel=' + encodeURIComponent(JSON.stringify(this.payChannel)) + '&payRandomPrice=' +
					this.randomMode.good.price
			})
		}
		// 自选球队随机 我要选队 我要选卡种
		getGoodSelectTeamRandom(cb ? : Function) {
			app.http.Get('dataApi/good/' + this.goodsId + '/optionPanel', {}, (res: any) => {
				this.teamRandomData = res.team;
				this.teamrandomGood = (res.good && res.good.randomMode) || [];
				this.teamrandomRemainder = (res.good && res.good.remainder) || []
				if (cb) cb()
			})
		}

		// 选队随机支付
		onClickTeamRandomBuy(data: any) {
			uni.navigateTo({
				url: 'confirmorder?data=' + encodeURIComponent(JSON.stringify(this.goodsData)) +
					'&payChannel=' + encodeURIComponent(JSON.stringify(this.payChannel)) + '&payRandomTeam=' +
					encodeURIComponent(JSON.stringify(data))
			})
			this.onClickteamRandomCancel()
		}
		onClickRandomBuy(id: number) {
			uni.navigateTo({
				url: 'confirmorder?data=' + encodeURIComponent(JSON.stringify(this.goodsData)) +
					'&payChannel=' + encodeURIComponent(JSON.stringify(this.payChannel)) + '&selectRanId=' + id
			})
			this.onClickteamRandomCancel()
		}
		onClickteamRandomCancel() {
			this.teamRandomShow = false;
		}
		// 复制邀请口令
		onClickCopyInviteKey() {
			app.http.Post('activity/invite/getKey', {
				code: this.goodsId
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
			this.swiperCurrent = event.detail.current;
			this.swiperTabCurrent = event.detail.current < this.carouselLength ? 0 : 1
		}
		onClickSwiperTab(index: number) {
			if (index != this.swiperTabCurrent) {
				this.swiperTabCurrent = index;
				this.swiperCurrent = index == 0 ? 0 : this.carouselLength;
			}
		}
		getCountStr(str: any, index: number) {
			let Str = String(str)
			return Str.substr(index, 1)
		}
		getPlan(lock: number, now: number, all: number) {
			let width = Math.floor((Number(lock) + Number(now)) / Number(all) * 100);
			return width
		}
		onClickCloseDrawer() {
			this.showDrawer = false;
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
			background: url(../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 0;
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
		height: 630rpx;
		box-sizing: border-box;
		position: relative;
	}

	.swiper-popup {
		height: 50rpx;
		display: inline-flex;
		align-items: center;
		position: absolute;
		right: 14rpx;
		bottom: 54rpx;
		border-radius: 40rpx;
		background: #B0B0B0;
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
		height: 630rpx;
		background: #F5F5F9;
	}

	.goods-img-content {
		width: 750rpx;
		height: 630rpx;
		background: #F5F5F9;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.goods-img {
		width: 750rpx;
		height: 630rpx;
	}

	.detail-index-bg {
		width: 100%;
		background: $content-bg;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		position: relative;
	}

	.detail-bg {
		width: 724rpx;
		border-radius: 5rpx;
		background: #fff;
		margin-bottom: 13rpx;
	}

	.header-content {
		width: 724rpx;
		height: 100rpx;
		background: url(../../static/goods/v2/price_bg.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-left: 36rpx;
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
		font-size: 33rpx;
		font-family: PingFangSC-Regular;
		font-weight: 500;
		color: #FFFFFF;
		box-sizing: border-box;
		padding-top: 10rpx;
	}

	.header-price text {
		font-size: 54rpx;
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
		margin-bottom: 15rpx;
	}

	.countdown-content {
		width: 100%;
		height: 27rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.countdown-index {
		width: 30rpx;
		height: 36rpx;
		text-align: center;
		line-height: 36rpx;
		font-size: 23rpx;
		font-family: eryaxindahei;
		font-weight: 400;
		color: #FFFFFF;
		background: #000;
		border-radius: 3rpx;
		margin-right: 4rpx;
	}

	.countdown-day {
		margin-right: 10rpx !important;
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
		padding: 0 20rpx;
		padding-bottom: 10rpx;
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
		padding-top: 30rpx;

		&-title {
			width: 100%;
			font-size: 33rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			line-height: 48rpx;
			font-weight: normal !important;
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
			height: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			margin-bottom: 20rpx;

			.goodslist-progress {
				background-image: url('../../static/goods/v2/progeessBg.png');
				background-size: 100% 100%;
				width: 480rpx;
				height: 12rpx;
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
				background-image: url('../../static/goods/v2/progessBgg_select.png');
				background-size: 100% 100%;
			}

			.header-top-plan-num {
				width: 190rpx;
				height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #88878C;
				line-height: 30rpx;
				text-align: right;
			}

			.header-top-plan-numbottom {
				width: 100%;
				height: 30rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #88878C;
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
		height: 158rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-index {
			height: 140rpx;
			box-sizing: border-box;
			text-align: center;

			&-pic {
				width: 43rpx;
				height: 43rpx;
				margin-bottom: 10rpx;
			}

			&-name {
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
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
		height: 160rpx;
		box-sizing: border-box;
		border-radius: 5rpx;
		padding: 0 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		&-left {
			width: 580rpx;
			height: 110rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;

			&-avatar {
				width: 104rpx;
				height: 104rpx;
				border-radius: 50%;
				background: #F5F5F9
			}

			&-desc {
				width: 460rpx;
				height: 110rpx;
				box-sizing: border-box;
				padding: 20rpx 0 4rpx 30rpx;
				display: flex;
				flex-wrap: wrap;

				&-name {
					width: 100%;
					font-size: 33rpx;
					font-family: PingFangSC-Regular;
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
					color: #88878C;
				}

				&-js {
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


			}
		}

		&-right {
			height: 46rpx;
			background: #fff;
			border: 1rpx solid #DADADA;
			border-radius: 5rpx;
			text-align: center;
			line-height: 46rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #88878c;
			margin-top: 20rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
		}
	}

	.goods-desc {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 32rpx 30rpx 32rpx;

		&-title {
			width: 100%;
			margin-bottom: 20rpx;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			.goods-desc-title-left {
				font-size: 31rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 600;
				color: #14151A;
			}

			.goods-desc-title-right {
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #949398;
				display: flex;
				align-items: center;
			}

			.goods-desc-title-help {
				width: 23rpx;
				height: 22rpx;
				margin-left: 18rpx;
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
		padding: 19rpx 16rpx 0 0;
		border-top: 1px solid #F5F5F8;
		display: flex;
		justify-content: center;

		&-left {
			max-width: 240rpx;
			height: 82rpx;
			box-sizing: border-box;
			padding: 0 20rpx 0 20rpx;
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
					font-size: 22rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #666666;
				}
			}

			.icon-kf {
				width: 37rpx;
				height: 38rpx;
				margin-bottom: 3rpx;
			}

			.icon-order {
				width: 37rpx;
				height: 41rpx;
				margin-bottom: 0;
			}
		}

		.btn-confirm {
			width: inherit;
			background: $btn-red;
			text-align: center;
			font-family: PingFangSC-Regular;
			color: #FFFFFF;
			height: $btn-height;
			line-height: $btn-height;
			font-size: $btn-fontSize;
			border-radius: $btn-radius;
			font-weight: $btn-weight;
		}

		.random-confirm {
			background: #7C4BEA;
		}

	}

	.btn-contented {
		width: 100%;
		height: calc(100rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
		left: 0;
		background: $color-F;
		z-index: 8;
		box-sizing: border-box;
		padding: 0 16rpx;
		border-top: 1px solid #F5F5F8;
		display: flex;
		align-items: center;
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
		box-sizing: border-box;
		padding: 22rpx;
		font-size: 23rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #88878C;
		line-height: 32rpx;
	}

	.detail-bottom-box {
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding: 30rpx 25rpx calc(150rpx) 25rpx;
		padding: 30rpx 25rpx calc(150rpx + constant(safe-area-inset-bottom)) 25rpx;
		padding: 30rpx 25rpx calc(150rpx + env(safe-area-inset-bottom)) 25rpx;

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
		font-size: 27rpx;
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
</style>
