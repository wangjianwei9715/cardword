import { app } from "@/app";
import permision from "@/js_sdk/wa-permission/permission"
import HttpRequest from "@/net/HttpRequest";
import UpdateManager from "@/manager/UpdateManager";
export default class PlatformManager {
	private static instance: PlatformManager;
	systemInfo: UniApp.GetSystemInfoResult = uni.getSystemInfoSync();
	oaid = '';
	imei = '';
	deviceID = '';
	isIos = false;

	private constructor() {
		this.deviceID = this.systemInfo.deviceId;
		console.log('########Platform:', this.systemInfo);
		app.statusBarHeight = this.systemInfo.statusBarHeight;
		// #ifdef APP-PLUS
		this.isIos = (plus.os.name == "iOS");
		plus.device.getOAID({
			complete: (res: any) => {
				if (res.oaid) {
					this.oaid = res.oaid;
					this.deviceID = this.oaid;
				}
				if (plus.device.imei) {
					this.imei = plus.device.imei;
					if (this.deviceID == '') {
						this.deviceID = this.imei.split(',')[0];
					}
				}
				if (this.deviceID == '') {
					this.deviceID = this.systemInfo.uuid;
				}

			}
		});
		// #endif
	}
	async getLocationPermission(): Promise<boolean> {
		// #ifdef APP-PLUS
		if (permision.checkSystemEnableLocation()) {
			if (!this.isIos) {
				return await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION') == 1;
			} else {
				return permision.judgeIosPermission('location');
			}
		} else {
			return false;
		}
		// #endif

		// #ifndef APP-PLUS
		return false;//暂时不处理native以外的情况
		// #endif
	}
	async getCameraPermission(): Promise<boolean> {
		// #ifdef APP-PLUS
		if (!this.isIos) {
			return await permision.requestAndroidPermission('android.permission.CAMERA') == 1;
		} else {
			return permision.judgeIosPermission('camera');
		}
		// #endif

		// #ifndef APP-PLUS
		return false;//暂时不处理native以外的情况
		// #endif
	}
	async getPhotoPermission(): Promise<boolean> {
		// #ifdef APP-PLUS
		if (!this.isIos) {
			return await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE') == 1;
		} else {
			return permision.judgeIosPermission('photoLibrary');
		}
		// #endif

		// #ifndef APP-PLUS
		return false;//暂时不处理native以外的情况
		// #endif
	}
	gotoPermissionSetting() {
		// #ifdef APP-PLUS
		permision.gotoAppPermissionSetting();
		// #endif
	}

	static getIns(): PlatformManager {
		if (!PlatformManager.instance) {
			PlatformManager.instance = new PlatformManager();
		}
		return PlatformManager.instance;
	}
	wechatLogin() {
		uni.showLoading({
			title: '正在登录'
		});
		uni.login({
			provider: "weixin",
			success: (loginRes) => {
				console.log("weixin-res=", loginRes);
				// #ifdef MP
				app.http.Post("user/login/wechat/mini", { jsCode: loginRes.code, os: 'mini', device: 'iosmini' }, (data: any) => {
					uni.hideLoading()
					app.data = data.data;
					app.opKey = data.opKey
					uni.setStorageSync("app_opk", data.opKey);
					app.socketInfo = data.app;
					app.token = { accessToken: data.accessToken, refreshToken: data.refreshToken };
					uni.setStorageSync("token", JSON.stringify(app.token));
					uni.$emit('updateToken')
				})

				// #endif

				// #ifdef APP-PLUS
				// let auth:any = loginRes.authResult;
				// let params:any = { app_id: wxAppID,access_token:auth.access_token,openid:auth.openid,uuid:this.deviceID};
				// if (myapp.channel!='') {
				//     params.source = myapp.channel;
				// }
				// if (myapp.group!='') {
				//     params.group_name = myapp.group;
				// }
				// wechatAppLogin(params, (data: any) => {
				//     console.log("login-res=", data);
				//     myapp.token = data.token;
				//     uni.setStorage({ key: "token_key", data: data.token });
				//     uni.$emit('updateToken');
				// });
				// #endif
			},
			fail: (result: any) => {
				console.log("login-fail=", result);
			}
		});
	}
	getWechatUserInfo(callback?: Function) {//此接口需要 open-type="getUserInfo"
		let myapp = getApp().globalData || {};
		//#ifdef MP
		// uni.showLoading({
		//     mask:true
		// });
		uni.getUserProfile({
			desc: '用于显示头像昵称',
			success: (infoRes) => {
				myapp.needAuth = false;
				if (callback) {
					callback(infoRes);
				}
				console.log(infoRes.userInfo)
				let userinfo: any = infoRes.userInfo;
				app.http.Post("user/miniSetAttr", { avatar: encodeURIComponent(userinfo.avatarUrl), name: userinfo.nickName, sex: userinfo.gender }, () => {
					app.data.avatar = infoRes.userInfo.avatarUrl;
					app.data.name = infoRes.userInfo.nickName;
					uni.$emit('updateToken')
				});
			},
			complete: () => {
			}
		});
		// #endif

		//#ifdef H5
		//微信内部网页环境
		if (navigator.userAgent.match(/micromessenger/i)) {

		}
		// #endif
	}

	// 微信直播间
	goWeChatLive(id: any) {

		// #ifdef APP-PLUS
		plus.share.getServices(res => {
			let sweixin = res.find(i => i.id === 'weixin')
			console.log('getServices==', res)
			if (sweixin) {
				sweixin.launchMiniProgram({
					id: 'gh_5cf45dd26926',
					path: '/pages/index/index?id=' + id,
					type: 0
				}, (res: any) => {
					console.log(res)
				})
			} else {
				// 没有获取到微信分享服务
			}
		}, err => {
			// 获取分享服务列表失败
		});

		// #endif
		// #ifdef MP-WEIXIN
		wx.navigateTo({
			url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + id
		})
		// #endif

	}
	requestSubscribeMessage(id: string, callback?: Function) {
		// 调起订阅消息
		//用户发生点击行为或者发起支付回调后，才可以调起订阅消息界面
		// #ifdef MP-WEIXIN

		//抽奖通知 fK8zwq6rK2AIai0uLT6aGTj_2M6rVYtBmbs6A5f61zU
		//瓜分红包 yta_BPwNmfgf4U_Mfr9YE6Ix9Ur44CTpl8uNHy9Qamk
		uni.requestSubscribeMessage({
			tmplIds: [id],
			success: (res: any) => {
				if (res[id] == "accept") {
					// 授权成功
					if (callback) {
						callback();
					}
				} else {
					uni.showToast({
						title: '不授权将无法收到开播提醒,请获取授权。',
						icon: 'none',
						duration: 2000
					});
				}
			},
			fail: (res) => {
				wx.getSetting({
					withSubscriptions: true,
					success: (res) => {
						console.log(res.authSetting)
						uni.showModal({
							title: '授权失败',
							content: '不授权将无法收到开播提醒,请点击确定去设置。',
							showCancel: false,
							success: (result) => {
								if (result.confirm) {
									wx.openSetting({
										withSubscriptions: true,
										success: (res) => {
											console.log('openSetting', res);
											// if (res.subscriptionsSetting.mainSwitch) {
											//     this.requestSubscribeMessage.call(this, callback);
											// }
										},
										fail: (res) => {
											console.log('openSetting', res);
										}
									});
								}
							}
						});
					}
				})
			}
		});
		// #endif
		// #ifndef MP-WEIXIN
		if (callback) {
			callback();
		}
		// #endif
	}
	appLuanch(loginToken: any, cb?: Function) {
		if (!app.localTest) {
			// launchUrl：             储存打乱顺序后的launch
			// configLaunchUrl：       access保存的launch数据
			let launchUrl: { [x: string]: any } = {};
			let launchSuccess = false;
			
			let configLaunchUrl = uni.getStorageSync("configLaunchUrl");
			app.service_url = uni.getStorageSync('launchUrl')
			if (configLaunchUrl) {
				launchUrl = configLaunchUrl.sort(() => {
					return Math.random() - 0.5;
				});
			} else {
				launchUrl = app.launch_url.sort(() => {
					return Math.random() - 0.5;
				});
			}
			let params = {
				name: "卡世界",
				version: app.version,
				uuid: app.platform.deviceID,
			};
			console.log("launcParams=", params);
			for (let i in launchUrl) {
				if (!launchSuccess) {
					let url = launchUrl[i];
					if (url.charAt(url.length - 1) == "/") {
						url = url.slice(0, url.length - 1);
					}
					if (app.service_url != '') {
						url = app.service_url
					}
					app.http.Post(url + "/api/app/launch", params, (res: any) => {
						console.log("post  /api/app/launch=", res);
						launchSuccess = true;
						app.service_url = url;
						// bussinessApiDomain     主接口域名
						// dataApiDomain          数据接口域名 如果为空 使用bussinessApiDomain
						let bussinessApiDomain = res.app.bussinessApiDomain;
						let dataApiDomain = res.app.dataApiDomain;
						if (
							bussinessApiDomain.charAt(bussinessApiDomain.length - 1) == "/"
						) {
							bussinessApiDomain = bussinessApiDomain.slice(
								0,
								bussinessApiDomain.length - 1
							);
						}
						if (dataApiDomain.charAt(dataApiDomain.length - 1) == "/") {
							dataApiDomain = dataApiDomain.slice(0, dataApiDomain.length - 1);
						}
						app.bussinessApiDomain = bussinessApiDomain + "/api/v1/";
						if (res.app.dataApiDomain) {
							app.dataApiDomain = dataApiDomain + "/api/v1/";
						} else {
							app.dataApiDomain = bussinessApiDomain + "/api/v1/";
						}

						if (cb) cb()
						uni.setStorageSync("launchConfig", res);
						uni.setStorageSync('launchUrl', url)
						// #ifdef APP-PLUS
						app.update_url = url + "/api/";
						if (uni.getSystemInfoSync().platform === "android") {
							app.update = UpdateManager.getInstance();
						}
						// app.update = UpdateManager.getInstance();
						let iosVersion = Number(res.app.version.substr(0,1));
						console.log('iosVersion',res.app.version)
						if (uni.getSystemInfoSync().platform == 'ios' && iosVersion%2 ==0) {
							uni.setTabBarItem({
								index: 1,
								text: '拆卡',
								pagePath: '/pages/index/live',
								iconPath: 'static/index/tabbar_live.png',
								selectedIconPath: 'static/index/tabbar_live_.png',
							})
							app.update = UpdateManager.getInstance();
							app.iosVersion = iosVersion
						}
						// #endif

						
					});
					break;
				} else {
					break;
				}
			}
			if (!launchSuccess) {
				let launchConfig = uni.getStorageSync("launchConfig");
				if (launchConfig.app) {
					launchSuccess = true;

					let bussinessApiDomain = launchConfig.app.bussinessApiDomain;
					let dataApiDomain = launchConfig.app.dataApiDomain;
					if (bussinessApiDomain.charAt(bussinessApiDomain.length - 1) == "/") {
						bussinessApiDomain = bussinessApiDomain.slice(
							0,
							bussinessApiDomain.length - 1
						);
					}
					if (dataApiDomain.charAt(dataApiDomain.length - 1) == "/") {
						dataApiDomain = dataApiDomain.slice(0, dataApiDomain.length - 1);
					}
					app.bussinessApiDomain = bussinessApiDomain + "/api/v1/";
					if (launchConfig.app.dataApiDomain) {
						app.dataApiDomain = dataApiDomain + "/api/v1/";
					} else {
						app.dataApiDomain = bussinessApiDomain + "/api/v1/";
					}
				}
			}





			console.log("bussinessApiDomain==========", app.bussinessApiDomain);
			console.log("dataApiDomain==========", app.dataApiDomain);
		}
		if (loginToken) {
			app.needPushIdentifier = false;
			let params = {
				uuid: app.platform.deviceID,
				os: app.platform.systemInfo.platform,
				device: app.platform.systemInfo.brand + app.platform.systemInfo.model,
			};
			HttpRequest.getIns().Post("user/token/access", params, (data: any) => {
				console.log("access=====", data);
				app.data = data.data;
				app.opKey = data.opKey;
				uni.setStorageSync("app_opk", data.opKey);
				if (data.app) {
					app.socketInfo = data.app;
				}
				if (data.app.launchDomain && data.app.launchDomain != "") {
					uni.setStorageSync("configLaunchUrl", data.app.launchDomain);
				}
				if (data.data.mustBindPhone) {
					uni.reLaunch({
						url: "/pages/login/bind_phone",
					});
				}
				uni.$emit("loginSuccess");
			});
		}
	}
	getOnlineCfg(): any {
		// #ifdef APP-PLUS
		if (app.platform.systemInfo.platform != 'ios') {
			uni.setTabBarItem({
				index: 1,
				text: '拆卡',
				pagePath: '/pages/index/live',
				iconPath: 'static/index/tabbar_live.png',
				selectedIconPath: 'static/index/tabbar_live_.png',
			})
			return
		}	
		
		
		// let onlineParams = {
		// 	name: "卡世界",
		// 	version: app.version,
		// 	uuid: app.platform.deviceID,
		// 	os: 'ios',
		// 	tag: 'apple'
		// }
		// app.http.Post(app.service_url + '/api/app/onlinecfg', onlineParams, (data: any) => {
		// 	console.log('app/onlinecfg==', data)
		// 	if (!data.data.review) {
		// 		console.log('apple review')
		// 		uni.setTabBarItem({
		// 			index: 1,
		// 			text: '直播',
		// 			pagePath: '/pages/index/live',
		// 			iconPath: 'static/index/tabbar_live.png',
		// 			selectedIconPath: 'static/index/tabbar_live_.png',
		// 		})
		// 	}else{
		// 		app.iosPlatform = true;
		// 	}
		// })
		// #endif
	}
	// 获取粘贴板内容
	getInvitationClipboard(){
		if (plus.os.name == 'iOS') {  
			var UIPasteboard = plus.ios.importClass("UIPasteboard");  
			var generalPasteboard = UIPasteboard.generalPasteboard();  
			var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");  
			// value就是粘贴板的值  
			this.matchInviteRequestKey(value)
			
		} else if (plus.os.name == 'Android') {  
			var Context = plus.android.importClass("android.content.Context");  
			var main = plus.android.runtimeMainActivity();  
			var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);  
			var value = plus.android.invoke(clip, "getText");  
			// value就是粘贴板的值  
			this.matchInviteRequestKey(value)
		}
	}
	// 判断粘贴板是否有邀请码
	matchInviteRequestKey(code:string){
		let inviteCode = /[0-9a-zA-Z]{9}/g;
		let key:any = ''
		if(inviteCode.test(code)){
			key = code.match(inviteCode);
			console.log('邀请码code=========',key[0])
			if(app.token.accessToken == ''){
				app.requestKey = key[0];
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			this.inviteRequestKey(key[0])
			
		}
	}
	// 提交邀请口令
	inviteRequestKey(key:string){
		app.http.Post('activity/invite/requestKey',{key:key},(res:any)=>{
			console.log('invite/requestKey========',res)
			app.requestKey = '';
		})
	}
	phoneAspect(): boolean {
		let aspect = this.systemInfo.windowHeight / this.systemInfo.windowWidth > 1.8 ? true : false
		return aspect;
	}
	getDeviceId(): string {
		let deviecs = ''

		return deviecs;
	}
	getDeviceIds(): string {
		let deviceid = ''

		return deviceid;
	}
	getWifiName(): string {
		let name = ''

		return name;
	}
	getInviterid(): number {
		let id = 0;

		return id;
	}
	getVersionName(): string {
		let name = 'V1.0.0'

		return name;
	}
	getVersionCode(): number {
		let id = 0;

		return id;
	}
	setAppName(appName: string) {

	}
	isAppInstalled(packageName: string): boolean {

		return false;
	}
	downloadAPP(url: string) {

	}
	launchApp(packageName: string) {

	}
	refresh() {

	}
	openBrowser(url: string) {

	}
	openLink(url: string, isExternal: string) {

	}
	AwallDownLoad(url: string) {

	}
	saveImageByUrl(imageUrl: string, successCb?: Function, failCb?: Function) {

	}

	initMoKu(userID: string) {

	}
	shareUtils(type: string, title: string, content: string, img: string, url: string) {

	}
	copyUrl(url: string): string {
		let data = "";

		return data;
	}
	getAppInfo() {
		let data: { [x: string]: any } = {};

		return data;
	}

}
