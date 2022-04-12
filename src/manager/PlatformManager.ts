import { app } from "@/app";
import permision from "@/js_sdk/wa-permission/permission"
import HttpRequest from "@/net/HttpRequest";
import {Md5} from 'ts-md5/dist/md5';
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
	goWeChatLive(item: any) {
		let ts = Math.floor(new Date().getTime()/1000);
		let params = {
			ts:ts,
			playCode:item.playCode,
			sign:Md5.hashStr(ts+'_'+item.goodCode+'_'+item.playCode+'_videoPlayKsj')
		}
		app.http.Post('good/videoPlay/'+item.goodCode,params,(data:any)=>{
			// 直播 回放
			if(data.media_url!=''){
				uni.navigateTo({
					url:'/pages/live/playback?data='+JSON.stringify(data)
				})
				return 
			}else if(data.wxRoomId>0){
				this.launchMiniProgramLive(data.wxRoomId)
			}
			
		})
	}
	launchMiniProgramLive(id:any){
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
		// wx.navigateTo({
		// 	url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + id
		// })
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

						if (bussinessApiDomain.charAt(bussinessApiDomain.length - 1) == "/") {
							bussinessApiDomain = bussinessApiDomain.slice(0,bussinessApiDomain.length - 1);
						}
						if (dataApiDomain.charAt(dataApiDomain.length - 1) == "/") {
							dataApiDomain = dataApiDomain.slice(0, dataApiDomain.length - 1);
						}
						app.bussinessApiDomain = bussinessApiDomain + "/api/v2/";
						app.dataApiDomain = res.app.dataApiDomain?dataApiDomain + "/api/v2/":bussinessApiDomain + "/api/v2/"

						if (cb) cb()
						uni.setStorageSync("launchConfig", res);
						uni.setStorageSync('launchUrl', url)
						// 延时调用避免一开始接收不到
						setTimeout(()=>{
							uni.$emit('appluanchOver')
						},100)
						// #ifdef APP-PLUS
						app.update_url = url + "/api/";
						if (uni.getSystemInfoSync().platform === "android") {
							app.update = UpdateManager.getInstance();
						}
						let iosVersion = Number(res.app.version.substr(0,1));
						console.log('iosVersion',res.app.version)
						if (uni.getSystemInfoSync().platform == 'ios' && iosVersion%2 ==0) {
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
						bussinessApiDomain = bussinessApiDomain.slice(0,bussinessApiDomain.length - 1);
					}
					if (dataApiDomain.charAt(dataApiDomain.length - 1) == "/") {
						dataApiDomain = dataApiDomain.slice(0, dataApiDomain.length - 1);
					}
					app.bussinessApiDomain = bussinessApiDomain + "/api/v2/";
					app.dataApiDomain = launchConfig.app.dataApiDomain?dataApiDomain + "/api/v2/":bussinessApiDomain + "/api/v2/"
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
				app.coupon = data.data.coupon;
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
	
	// 获取粘贴板内容
	getInvitationClipboard(){
		if (plus.os.name == 'iOS') {  
			var UIPasteboard = plus.ios.importClass("UIPasteboard");  
			var generalPasteboard = UIPasteboard.generalPasteboard();  
			var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");  
			// value就是粘贴板的值  
			if(value!=undefined){
				this.matchInviteRequestKey(value)
			}
			
			
		} else if (plus.os.name == 'Android') {  
			uni.getClipboardData({
				success: (res)=> {
					if(res.data){
						this.matchInviteRequestKey(res.data)
					}
				}
			});
			
		}
	}
	// 判断粘贴板是否有邀请码
	matchInviteRequestKey(code:string){
		let inviteCode = /[N][O]\d{9}[S]/g;
		let key:any = ''
		if(inviteCode.test(code)){
			key = code.match(inviteCode);
			console.log('邀请码code=========',key[0])
			app.requestKey = key[0];
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			this.checkShareNo(app.requestKey)
		}
	}
	checkShareNo(code:string){
		let ts = Math.floor(new Date().getTime()/1000);
		let params = {
			ts:ts,
			code:code,
			sign:Md5.hashStr('viewShareNo_'+code+'_'+ts)
		}
		app.http.Post('function/userNo/transfer/shareNo/view',params,(res:any)=>{
			if(res.good){ 
				uni.navigateTo({
					url:'/pages/userinfo/giving/code_details?data='+decodeURIComponent(JSON.stringify(res))
				})
			}
		})
		uni.setClipboardData({
			data: '',
			showToast:false,
			success: ()=> {
			}
		});
	}
	// 提交邀请口令
	inviteRequestKey(key:string,cb?:Function){
		app.http.Post('activity/invite/requestKey',{key:key},(res:any)=>{
			if(cb) cb(res)
			console.log('invite/requestKey========',res)
		})
		app.requestKey = '';
		uni.setClipboardData({
			data: '',
			showToast:false,
			success: ()=> {
			}
		});
	}
	// 节流
	throttle(fn:any,delay:any){
		let valid = true
		return function() {
			if(!valid){
				return false 
			}
			valid = false
			setTimeout(() => {
				fn()
				valid = true;
			}, delay)
		}
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
