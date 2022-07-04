<script lang="ts">
	import Vue from "vue";
	import {
		app
	} from "./app";

	import HttpRequest from "./net/HttpRequest";
	import UpdateManager from "./manager/UpdateManager";
	import {
		SocketServer
	} from "@/net/SocketServer";
	import {
		Md5
	} from "ts-md5";
	import * as proto from "./net/proto";
	export default Vue.extend({
		mpType: "app",
		globalData: {
			// ...app
			app
		},
		onLaunch() {
			console.log("App Launch");
			if (process.env.NODE_ENV === "development") {
				// console.log("开发环境");
				// app.localTest = true;
				// app.bussinessApiDomain = 'http://192.168.8.80:8701/api/v2/';
				// app.funcApiDomain='http://192.168.8.79:8741/api/v2/'
				// app.bussinessApiDomain="https://server.ssltest.ka-world.com/api/v2/"

				// 正式服测试环境
				// app.bussinessApiDomain='http://server.beta_bigstone.ka-world.com/api/v2/';

			}
			uni.setStorageSync('openAppTime', Math.round(+new Date() / 1000)) //存储打开app时间
			app.needPushIdentifier = uni.getStorageSync("needPushIdentifier") == 1 ? false : true;
			const loginToken = uni.getStorageSync("token");
			if (loginToken) {
				app.token = JSON.parse(loginToken);
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
						uni.setStorageSync('socketInfo', data.app)
						app.coupon = data.data.coupon;
						uni.$emit("updateUserData");
						uni.$emit("loginSuccess");
					});
				});
			});
			uni.$on("reLogin", () => {
				try {
					uni.removeStorageSync("token");
				} catch (e) {
					console.log(e);
				}
				app.data = {};
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: "/pages/login/login",
				});
				// #endif
			});
			// #ifdef APP-PLUS
			// #endif
			uni.$on("loginSuccess", () => {
				// #ifdef APP-PLUS
				if (app.needPushIdentifier) {
					let info = plus.push.getClientInfo();
					HttpRequest.getIns().Post("user/bindPushIdentifier", {
						id: info.clientid
					}, () => {
						app.needPushIdentifier = false;
						uni.setStorageSync("needPushIdentifier", 1);
					});
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
			plus.runtime.getProperty(plus.runtime.appid || '', (widgetInfo) => {
				app.version = widgetInfo.version || '1.0.0'
			})

			plus.device.getOAID({
				complete: (res: any) => {
					if (res.oaid) {
						app.platform.deviceID = res.oaid;
					}
					if (plus.device.imei && app.platform.deviceID == "") {
						app.platform.deviceID = plus.device.imei.split(",")[0];
					}
					if (app.platform.deviceID == "") {
						app.platform.deviceID = uni.getSystemInfoSync().uuid;
					}
					app.platform.appLuanch(loginToken)
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
			// #ifndef APP-PLUS
			app.platform.appLuanch(loginToken)
			// #endif

			uni.onTabBarMidButtonTap(() => {
				// 监听tabbar中间发起按钮
				uni.navigateTo({
					url: "/pages/initiate/initiate",
				});
			});

			//#ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); // 强制竖屏
			// plus.screen.lockOrientation('landscape-primary'); 
			//#endif
		},
		onShow() {
			console.log("App Show");
			// #ifdef APP-PLUS
			const nowTimeStamp = Math.round(+new Date() / 1000)
			const refreshThreshold = 2 * 60 * 60 //刷新App阈值
			if (uni.getStorageSync('openAppTime') && nowTimeStamp - uni.getStorageSync('openAppTime') >=
				refreshThreshold) {
				plus.runtime.restart()
			}
			setTimeout(() => {
				let args = plus.runtime.arguments;
				if (args) {
					if (args.indexOf("goodsdetails") != -1) {
						let index = args.indexOf("=") + 1;
						let id = args.substring(index);
						plus.runtime.arguments = null;
						uni.navigateTo({
							url: "/pages/goods/goods_details?id=" + id,
						});
					}
				}
			}, 500)
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

	// #endif
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	[type="search"]::-webkit-search-decoration {
		display: none;
	}

	::-webkit-scrollbar {
		display: none;
	}

	image {
		will-change: transform
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

	/* #endif */
</style>
