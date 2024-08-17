<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
<script lang="ts">
	import Vue from "vue";
	import { app } from "./app";
	import ZegoExpressEngine from "@/components/zego-ZegoExpressUniApp-JS/lib/ZegoExpressEngine";
	import HttpRequest from "./net/HttpRequest";
	import {
		parsePic,
		liveCountDown,
		liveCountDownV2,
		getCountDownTime,
		calculate,
		formatNumber,
		getUrlData
	} from "./tools/util";
	import { SocketServer } from "@/net/SocketServer";
	import * as proto from "./net/proto";
	export default Vue.extend({
		mpType: "app",
		globalData: {
			// ...app
			app,
			parsePic,
			liveCountDown,
			liveCountDownV2,
			getCountDownTime,
			calculate,
			ZegoExpressEngine,
			formatNumber,
			destroyServe: () => {
				app.sever.isNetOK() && app.sever.close();
				app.sever = new SocketServer();
			},
		},
		onLaunch() {
			// #ifdef APP-PLUS
			setTimeout(() => {
				plus.navigator.closeSplashscreen();
			}, 2400);
			// #endif
			console.log("App Launch");
			//#ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary"); // 强制竖屏
			// plus.webview.prefetchURL(app.liveWebView); //预载直播控件webview
			// plus.screen.lockOrientation('landscape-primary');
			//#endif
			app.appBeta = uni.getStorageSync('appBeta');
			if(app.appBeta=='on') {
				app.localTest=true;
				app.bussinessApiDomain = app.appBetaDomain;
				app.funcApiDomain = app.appBetaDomain;
			};
			uni.getStorageSync("GUIDE_DATA") && (app.guide = uni.getStorageSync("GUIDE_DATA"));
			
			if (process.env.NODE_ENV === "development") {
				//   console.log("开发环境"); 
				// app.bussinessApiDomain = `http://192.168.7.8:8701${app.requestVersion}`;
				// app.dataApiDomain = `http://192.168.7.8:8701${app.requestVersion}`; 
				// app.launch_url = ['http://service.s777.ka-world.com']
				// app.funcApiDomain = "http://functest.ssl.ka-world.com/api/v2/";
				// 正式服测试环境 
				// app.bussinessApiDomain=`http://server.beta_bigstone.ka-world.com${app.requestVersion}`;
			}
			uni.setStorageSync("openAppTime", Math.round(+new Date() / 1000)); //存储打开app时间
			if(!uni.getStorageSync("webViewVersion") || uni.getStorageSync("webViewVersion")!=app.webViewVersion){
				//#ifdef APP-PLUS
				app.platform.clearCache()
				//#endif
				uni.setStorageSync("webViewVersion",app.webViewVersion)
			}else{
				uni.setStorageSync("webViewVersion",app.webViewVersion)
			}
			app.needPushIdentifier =
				uni.getStorageSync("needPushIdentifier") == 1 ? false : true;
			const loginToken = uni.getStorageSync("token");
			// #ifndef APP-PLUS
			app.platform.appLuanch(loginToken);
			// #endif
			if (loginToken) {
				app.token = JSON.parse(loginToken);
				app.user.getAppDataUserId().then((res:any)=>{
					app.data.userId = res;
				});
			}
			uni.$on("refreshToken", () => {
				if (app.refreshIng) return;
				app.refreshIng = true;

				try {
					uni.removeStorageSync("token");
				} catch (e) {
					console.log(e);
				}
				app.data = {};
				let tokens = {
					accessToken: app.token.accessToken,
					refreshToken: app.token.refreshToken,
				};
				HttpRequest.getIns().Post("user/token/refresh", tokens, (data: any) => {
					app.token.accessToken = data.data.accessToken;
					app.token.refreshToken = data.data.refreshToken;
					uni.setStorageSync("token", JSON.stringify(app.token));
					app.refreshIng = false;
					let params = {
						uuid: app.platform.deviceID,
						os: app.platform.systemInfo.platform,
						device: app.platform.systemInfo.brand + app.platform.systemInfo.model,
					};
					HttpRequest.getIns().Post("user/token/access", params, (data: any) => {
						app.data = data.data;
						app.socketInfo = data.app;
						uni.setStorageSync("socketInfo", data.app);
						app.coupon = data.data.coupon;
						uni.$emit("updateUserData");
						uni.$emit("loginSuccess");
					});
				});
			});
			uni.$on("reLogin", (query:string) => {
				try {
					uni.removeStorageSync("token");
				} catch (e) {
					console.log(e);
				}
				app.data = {};
				const params =getUrlData(query[0]=="?"?query:"?"+query)
				app.login.arouseLogin(params.redirect || "", Boolean(params.return || false))
			});
			// #ifdef APP-PLUS
			// #endif
			uni.$on("loginSuccess", () => {
				// #ifdef APP-PLUS
				if (app.needPushIdentifier) {
					let info = plus.push.getClientInfo();
					HttpRequest.getIns().Post(
						"user/bindPushIdentifier", {
							id: info.clientid,
						},
						() => {
							app.needPushIdentifier = false;
							uni.setStorageSync("needPushIdentifier", 1);
						}
					);
				}
				if (app.payload != "") {
					uni.navigateTo({
						url: app.payload,
					});
					app.payload = "";
				}
				// #endif
			});
			// #ifdef APP-PLUS
			uni.$on("socketClose", () => {
				if (app.socketInfo.tcp && app.socketInfo.tcp != "") {
					// 		connectSever();
				}
			});
			// #endif

			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid || "", (widgetInfo) => {
				app.version = widgetInfo.version || "1.0.0";
			});
			plus.device.getOAID({
				complete: (res: any) => {
					if (res.oaid) {
						app.platform.deviceID = res.oaid;
					}
					if (plus.device.imei && app.platform.deviceID == "") {
						app.platform.deviceID = plus.device.imei.split(",")[0];
					}
					if (app.platform.deviceID == "") {
						//@ts-ignore
						app.platform.deviceID = uni.getSystemInfoSync().uuid;
					}
					app.platform.appLuanch(loginToken);
				},
			});

			plus.push.addEventListener(
				"click",
				(msg: any) => {
					console.log("push-click", msg);
					if (msg.payload) {
						if (app.token.accessToken == "") {
							app.payload = msg.payload;
						} else {
							uni.navigateTo({
								url: msg.payload,
							});
						}
					}
				},
				false
			);
			//监听在线消息事件
			plus.push.addEventListener(
				"receive",
				(msg: any) => {
					console.log("push-click", msg);
					if (msg.payload) {
						if (app.token.accessToken == "") {
							app.payload = msg.payload;
						} else {
							uni.navigateTo({
								url: msg.payload,
							});
						}
					}
				},
				false
			);
			// #endif
			app.protobuf = proto;
			app.sever = new SocketServer();
			

			uni.onTabBarMidButtonTap(() => {
				// 监听tabbar中间发起按钮
				uni.navigateTo({
					url: "/pages/initiate/initiate",
				});
			});
		},
		onShow() {
			console.log("App Show");
			// 登录记录
			app.platform.loginRecord()
			// #ifdef APP-PLUS
			const nowTimeStamp = Math.round(+new Date() / 1000);
			const refreshThreshold = 2 * 60 * 60; //刷新App阈值
			if (
				uni.getStorageSync("openAppTime") &&
				nowTimeStamp - uni.getStorageSync("openAppTime") >= refreshThreshold
			) {
				plus.runtime.restart();
			}
			setTimeout(() => {
				let args = plus.runtime.arguments;
				if(!args) return
				if (args.indexOf("goodsdetails") != -1) {
					let index = args.indexOf("=") + 1;
					let goodCode = args.substring(index);
					plus.runtime.arguments = "";
					app.navigateTo.goGoodsDetails(goodCode,"&referer=ThirdParties")
					return
				}
				let params:any=getUrlData(args)
				if (Object.keys(params).length){
					//跳转
					if(params.routerUrl){
						let jumpType="navigateTo"
						const pages = getCurrentPages();
						params.routerUrl=decodeURIComponent(params.routerUrl)
						if(params.routerUrl.indexOf('/pages/live/zgPlayBack')!=-1){
							app.platform.comeFromOpenPlayBack(params.routerUrl)
							return
						}
						if(pages.length){
							const currentRoute:any=pages[pages.length-1].route
							if(params.routerUrl&&params.routerUrl.indexOf(currentRoute)!=-1) jumpType='redirectTo'
						}
						//@ts-ignore
						uni[jumpType]({
							url:params.routerUrl
						})
						plus.runtime.arguments = "";
						return
					}
				}
				plus.runtime.arguments = "";
			}, 500);

			
			app.platform.getInvitationClipboard((val: string) => {
				// 识别赠送卡密查询码
				app.platform.matchInviteRequestKey(val)
				// 识别优惠券
				const regular = [/[k][s][j]\w{13}/g,/\w{18}/g];
				app.platform.matchRequestKey(regular,val,(code:string)=>{
					uni.showModal({
						title:'提示',
						content:'检测到优惠券码，是否前往领取',
						confirmText:'前往领取',
						success:(res)=>{
							if(res.confirm){
								uni.setStorageSync('couponCode',code);
								uni.navigateTo({
									url: "/pages/userinfo/coupon/coupon_exchange",
								});
							}
						}
					})
				})
			})
			// #endif
		},
		onHide() {
			console.log("App Hide");
		},
	});
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/uni.css";

	/*每个页面公共css */
	// #ifndef MP
	@font-face {
		font-family: "DIN";
		src: url("~@/common/DIN/DINAlternateBold.ttf");
	}
	@font-face {
		font-family: "DINCondensed";
		src: url("~@/common/DIN/DINCondensedBold.ttf");
	}
	@font-face {
		font-family: "eryaxindahei";
		src: url("~@/common/Tao/CountDownNum.ttf");
	}

	@font-face {
		font-family: "Impact";
		src: url("~@/common/Tao/Impact.ttf");
	}

	@font-face {
		font-family: "hei";
		src: url("~@/common/Tao/hei.ttf");
	}
	@font-face {
		font-family: "YouSheBiaoTiHei";
		src: url("~@/common/Tao/YouShe.ttf");
	}
	@font-face {
		font-family: "ArialBold";
		src: url("~@/common/Tao/Futura.ttf");
	}
	@font-face {
		font-family: "HYLiLiangHeiJ";
		src: url("~@/common/Tao/HYLiLiangHeiJ.ttf");
	}
	// #endif
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		box-sizing: border-box;
	}
	.uni-page-head__title{
		font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, BlinkMacSystemFont, Helvetica Neue, Arial, PingFang SC, PingFang TC, PingFang HK, Microsoft Yahei, Microsoft JhengHei !important;
		font-weight: 600 !important;
	}
	[type="search"]::-webkit-search-decoration {
		display: none;
	}

	::-webkit-scrollbar {
		display: none;
	}

	image {
		will-change: transform;
	}

	uni-button {
		padding: 0;
	}

	button {
		padding: 0;
	}

	button::after {
		border: none;
	}

	button:active {
		transform: scale(0.96, 0.96) translateY(1rpx);
	}

	.input-placeholder {
		color: #babdc7;
	}

	.textarea-placeholder {
		color: #babdc7;
	}

	.button-shadow {
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.2);

		display: flex;
		align-items: center;
		justify-content: center;
		color: #000000;
		font-size: 24rpx;
		text-align: center;
	}

	.button-shadow:active {
		box-shadow: 0 0px;
		transform: translateY(1px);
	}
	.bottomSafeArea{
		opacity: 0;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.flexCenter{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottomSafeArea{
		opacity: 0;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	/* #endif */
</style>
