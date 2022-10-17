type CustomArray = (number|string)[]

import { app } from "@/app";
import permision from "@/js_sdk/wa-permission/permission"
import HttpRequest from "@/net/HttpRequest";
import {Md5} from 'ts-md5';
import UpdateManager from "@/manager/UpdateManager";
export default class PlatformManager {
	private static instance: PlatformManager;
	systemInfo: UniApp.GetSystemInfoResult = uni.getSystemInfoSync();
	oaid = '';
	imei = '';
	deviceID = '';
	isIos = false;
	urlIndex = 0;
	private constructor() {
		this.deviceID = this.systemInfo.deviceId;
		// console.log('########Platform:', this.systemInfo);
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
					//@ts-ignore
					this.deviceID = this.systemInfo.uuid;
				}

			}
		});
		// #endif
		
		// 修改安卓showModal确认在左侧的问题
		const __showModal = uni.showModal;
		uni.showModal = function(options:any) {
			// console.log('options-1', options);
			let opt:any = {}
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform == 'android' && typeof options.showCancel == 'undefined') {
				options.cancelText = '确认';
				options.confirmText = '取消';
				opt.success = function(e:any) {
				// console.log('__opt.success', e);
				e.confirm = !e.confirm;
				e.cancel = !e.cancel;
				options.success(e);
				};
			}
			// #endif
			__showModal({
				...options,
				...opt,
			})
		};
	}
	static getIns(): PlatformManager {
		if (!PlatformManager.instance) {
			PlatformManager.instance = new PlatformManager();
		}
		return PlatformManager.instance;
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
			if(data.type==3&&data.qiye_livingid){
				this.launchMiniQiYeProgramLive(data.qiye_livingid,item.goodCode)
				return
			}
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
	
	//平台直播间
	goZgLive(item:any){
		let ts = Math.floor(new Date().getTime()/1000);
		let params = {
			ts:ts,
			playCode:item.playCode,
			sign:Md5.hashStr(ts+'_'+item.goodCode+'_'+item.playCode+'_videoPlayKsj')
		}
		if(item.state!=3){
			jump()
			return
		} 
		if(!params.playCode){
			uni.showToast({
				title:'回放生成中',
				icon:'none'
			})
			return
		}
		app.http.Post('good/videoPlay/'+item.goodCode,params,(data:any)=>{
			// 直播 回放
			if(data.media_url!=''){
				uni.navigateTo({
					url:`/pages/live/zgPlayBack?data=${JSON.stringify({media_url:data.media_url})}&alias=${item.alias||item.merchantAlias}&roomID=${item.roomID}&playCode=${item.playCode}`,
				})
				return 
			}else if(data.media_url==''&&data.wxRoomId==0){
				uni.showToast({
					title:'直播回放生成中',
					icon:'none'
				})
			}else if(data.wxRoomId>0){
				jump()
			}
			
		})
		function jump():void{
			uni.navigateTo({
				url:`/pages/live/proLive?roomID=${item.roomID}&isAnchor=${item.isAnchor}&alias=${item.alias||item.merchantAlias}&type=${item.type}`
			})
		}
	}
	comeFromOpenPlayBack(url: any) {
		let urlStr = url.split('?')[1]
		// 创建空对象存储参数
		let obj:any = {};
		// 再通过 & 将每一个参数单独分割出来
		let paramsArr = urlStr.split('&')
		for (let i = 0, len = paramsArr.length; i < len; i++) {
			// 再通过 = 将每一个参数分割为 key:value 的形式
			let arr = paramsArr[i].split('=')
			obj[arr[0]] = arr[1];
		}
		console.log(obj);
		this.goZgLive({
			state: 3,
			playCode: obj.playCode,
			goodCode: obj.goodCode,
			roomID: obj.roomID,
			alias: obj.alias
		})
	}
	clearCache(){
		//@ts-ignore
		plus.cache.clear(() => {});
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
	launchMiniQiYeProgramLive(id: string, goodCode: string) {
		plus.share.getServices(res => {
			let sweixin = res.find(i => i.id === 'weixin')
			if (sweixin) {
				sweixin.launchMiniProgram({
					id: 'gh_1093b743ea0e',
					path: `/pages/live/index?id=${id}&goodCode=${goodCode}`,
					type: 0//0-正式版； 1-测试版； 2-体验版。 默认值为0。
				})
			} else {
				// 没有获取到微信分享服务
			}
		}, err => {
			// 获取分享服务列表失败
		});
	}
	//跳转商家中心
	goMerchantPage(alias:string,isMerchant?:boolean){
		if(!alias) return
		const TO_NEW_MERCHANT_PAGE=true//是否跳转新商家中心
		const path=TO_NEW_MERCHANT_PAGE?`/pages/merchant/core`:`/pages/userinfo/merchant_shopsV2`
		uni.navigateTo({
			url:`${path}?alias=${alias}${isMerchant?'&isMerchant=true':''}`
		})
	}
	async checkPageJump(url: string, jumpType?: string) {
		try {
			if (!jumpType) jumpType = "navigateTo"
			const pages = getCurrentPages();
			if (pages.length) {
				const currentRoute:any = pages[pages.length - 1].route
				if (url.indexOf(currentRoute) != -1) jumpType = 'redirectTo'
			}
			//@ts-ignore
			uni[jumpType]({
				url
			})
		} catch (err) {
			throw new Error(String(err))
		}
	}
	//ios跳转通知
	iosToPermissionPush(){
		uni.showModal({
			title: '通知权限开启提醒',
			content: '您还没有开启通知权限，无法接受到消息通知，是否前往开启推送?',
			// showCancel: false,
			confirmText: '立即前往',
			success: function(res) {
				if (res.confirm) {
					var app = plus.ios.invoke('UIApplication', 'sharedApplication');
					var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
					plus.ios.invoke(app, 'openURL:', setting);
					plus.ios.deleteObject(setting);
					plus.ios.deleteObject(app);
				}
			}
		});
	}
	//判断有没有通知权限
	judgeIosPermissionPush() {
		const isIos=plus.os.name == "iOS"
		if (isIos) { //ios
			var result = false;
			//@ts-ignore
			var UIApplication = plus.ios.import("UIApplication");
			var app = UIApplication.sharedApplication();
			var enabledTypes = 0;
			if (app.currentUserNotificationSettings) {
				var settings = app.currentUserNotificationSettings();
				enabledTypes = settings.plusGetAttribute("types");
				console.log("enabledTypes1:" + enabledTypes);
				if (enabledTypes == 0) {
					// gotoAppPermissionSetting()
					console.log("推送权限没有开启");
					this.iosToPermissionPush()
				} else {
					result = true;
					console.log("已经开启推送功能!")
				}
				plus.ios.deleteObject(settings);
			} else {
				enabledTypes = app.enabledRemoteNotificationTypes();
				if (enabledTypes == 0) {
					// gotoAppPermissionSetting()
					console.log("推送权限没有开启!");
					this.iosToPermissionPush()
				} else {
					result = true;
					console.log("已经开启推送功能!")
				}
				console.log("enabledTypes2:" + enabledTypes);
			}
			plus.ios.deleteObject(app);
			plus.ios.deleteObject(UIApplication);
			return result;
		} else { //android
			var result = false
			var main:any = plus.android.runtimeMainActivity();
			var pkName = main.getPackageName();
			var uid = main.getApplicationInfo().plusGetAttribute("uid");
			var NotificationManagerCompat = plus.android.importClass("androidx.core.app.NotificationManagerCompat")
			//("android.support.v4.app.NotificationManagerCompat");
			//@ts-ignore
			var areNotificationsEnabled = NotificationManagerCompat.from(main)
			// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
			if (!areNotificationsEnabled.areNotificationsEnabled()) {
				uni.showModal({
					title: '提示',
					content: '请先打开APP通知权限',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							var Intent:any = plus.android.importClass('android.content.Intent');
							var Build:any = plus.android.importClass("android.os.Build");
							//android 8.0引导  
							if (Build.VERSION.SDK_INT >= 26) {
								var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
								intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
							} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
								var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
								intent.putExtra("app_package", pkName);
								intent.putExtra("app_uid", uid);
							} else { //(<21)其他--跳转到该应用管理的详情页
								var Settings:any = plus.android.importClass("android.provider.Settings");
								var Uri:any = plus.android.importClass("android.net.Uri");
								var intent = new Intent();
								intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
								var uri = Uri.fromParts("package", main.getPackageName(), null);
								intent.setData(uri);
							}
							// 跳转到该应用的系统通知设置页  
							main.startActivity(intent);
							return result
						}
					}
				});
			} else {
				result = true
				return result
			}
		}
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
	//设置分享域名
	// setShareUrl() {
	// 	if(!app.goodShareOrigin) app.goodShareOrigin=app.H5Url
	// 	if(!app.activityShareOrigin) app.activityShareOrigin=app.H5Url
	// }
	appLuanch(loginToken: any, cb?: Function) {
		if(app.localTest) return;
		
		let launchData = uni.getStorageSync("launchData");
		if (launchData!='' && (Math.round(new Date().getTime()/1000)-launchData.time<3600)){
			this.setLaunchData(launchData,loginToken)
		} else {
			// launchUrl             储存打乱顺序后的launch
			// configLaunchUrl       access保存的launch数据
			app.service_url = uni.getStorageSync('launchUrl') || ''
			const configLaunchUrl = uni.getStorageSync("configLaunchUrl");
			const sortData = configLaunchUrl?configLaunchUrl:app.launch_url;
			const launchUrl = sortData.sort(() => { return Math.random() - 0.5; });
			
			let params = { name: "卡世界", version: app.version, uuid: app.platform.deviceID, };
			this.postLaunch(loginToken,launchUrl,params,()=>{ if(cb) cb() })
		}
		
	}
	postLaunch(loginToken:any,launchUrl:any,params:any,cb:Function){
		let url = app.service_url != ''? app.service_url : this.lastCharacter(launchUrl[this.urlIndex]);
		app.http.Post(url + "/api/app/launch", params, (res: any) => {
			console.log("post  /api/app/launch=", res);
			app.service_url = url;
			// bussinessApiDomain     主接口域名
			// dataApiDomain          数据接口域名 如果为空 使用bussinessApiDomain
			let bussinessApiDomain = this.lastCharacter(res.app.bussinessApiDomain);
			let dataApiDomain = this.lastCharacter(res.app.dataApiDomain);
			let funcApiDomain= this.lastCharacter(res.app.funcApiDomain)
			// let goodShareOrigin = this.lastCharacter(res.shareDomain?res.shareDomain.good:"")
			// let activityShareOrigin = this.lastCharacter(res.shareDomain?res.shareDomain.activity:"")

			app.bussinessApiDomain = bussinessApiDomain + "/api/v2.1/";
			app.dataApiDomain = res.app.dataApiDomain?dataApiDomain + "/api/v2.1/":bussinessApiDomain + "/api/v2.1/"
			app.funcApiDomain = res.app.funcApiDomain?funcApiDomain + "/api/v2.1/":bussinessApiDomain + "/api/v2.1/"
			// app.goodShareOrigin = goodShareOrigin
			// app.activityShareOrigin = activityShareOrigin
			if (cb) cb()
			uni.setStorageSync("launchConfig", res);
			uni.setStorageSync('launchUrl', url)
			// 延时调用避免一开始接收不到
			uni.setStorageSync('appluanchOver', 1)
			setTimeout(()=>{ uni.$emit('appluanchOver') },500)
			// #ifdef APP-PLUS
			app.update_url = url + "/api/";
			if (app.platform.systemInfo.platform == 'ios') {
				app.iosPlatform = app.platform.validateVersion(app.version,res.app.pingguo)
			}
			app.update = !app.iosPlatform ? UpdateManager.getInstance() : {};
			// #endif
			uni.setStorageSync("launchData", {
				service_url:app.service_url,
				bussinessApiDomain:app.bussinessApiDomain,
				dataApiDomain:app.dataApiDomain,
				update_url:app.update_url,
				funcApiDomain:app.funcApiDomain,
				// goodShareOrigin : app.goodShareOrigin,
				// activityShareOrigin : app.activityShareOrigin,
				time:Math.round(new Date().getTime()/1000)
			});
			// this.setShareUrl()
			if (loginToken) this.getAccess()
			
			// console.log("bussinessApiDomain==========", app.bussinessApiDomain);
			// console.log("dataApiDomain==========", app.dataApiDomain);
		},()=>{
			let launchData = uni.getStorageSync("launchData");
			if(launchData!=''){
				this.setLaunchData(launchData,loginToken)
			} else if (this.urlIndex<3){
				this.urlIndex += 1;
				app.service_url = '';
				this.postLaunch(loginToken,launchUrl,params,()=>{
					if(cb) cb()
				})
			}
		});
	}
	setLaunchData(data:any,loginToken:any){
		// || !data.goodShareOrigin || !data.activityShareOrigin
		if (!data.funcApiDomain) {
			uni.setStorageSync('launchData', "")
			this.appLuanch(uni.getStorageSync("token"))
			return
		}
		app.service_url = data.service_url;
		app.bussinessApiDomain = data.bussinessApiDomain;
		app.dataApiDomain = data.dataApiDomain;
		app.funcApiDomain=data.funcApiDomain
		app.update_url = data.update_url;
		// app.goodShareOrigin=data.goodShareOrigin;
		// app.activityShareOrigin=data.activityShareOrigin
		// #ifdef APP-PLUS
		app.update = !app.iosPlatform ? UpdateManager.getInstance() : {};
		// this.setShareUrl()
		// #endif
		uni.setStorageSync('appluanchOver', 1)
		setTimeout(()=>{
			uni.$emit('appluanchOver')
		},500)
		if (loginToken) this.getAccess()
	}
	getAccess(){
		let params = {
			uuid: app.platform.deviceID,
			os: app.platform.systemInfo.platform,
			device: app.platform.systemInfo.brand + app.platform.systemInfo.model,
		};
		HttpRequest.getIns().Post("user/token/access", params, (data: any) => {
			app.data = data.data;
			app.opKey = data.opKey;
			app.coupon = data.data.coupon;
			uni.setStorageSync("app_opk", data.opKey);
			if (data.app) app.socketInfo = data.app;
			if (data.app.launchDomain && data.app.launchDomain != "") {
				uni.setStorageSync("configLaunchUrl", data.app.launchDomain);
			}
			uni.$emit("loginSuccess");
		});
	}
	async hasLoginToken(cb?:Function){
		if(app.token.accessToken == ''){
			const redirect = await this.currentPage();
			uni.redirectTo({
				url:`/pages/login/login?redirect=/${redirect}`
			})
			return;
		}
		cb && cb()
	}
	currentPage(){
		return new Promise((resolve, reject) => {
			let curPage:any = getCurrentPages();
			let route = curPage[curPage.length - 1].route; //获取当前页面的路由
			let params = curPage[curPage.length - 1].options; //获取当前页面参数，如果有则返回参数的对象，没有参数返回空对象{}
			let query = '';
			let keys = Object.keys(params); //获取对象的key 返回对象key的数组
			if (keys.length > 0) {
				query = keys.reduce((pre, cur) => {
					return pre + cur + '=' + params[cur] + '&';
				}, '?').slice(0, -1);
			}
			resolve(route + query)
		});
	}
	pageBack(params?:number | UniApp.NavigateBackOptions) {
		let delta:any = 1
		const IS_NUMBER = typeof params === 'number'
		if (!IS_NUMBER && !params) delta = 1
		if (IS_NUMBER) delta = params
		let curPage: any = getCurrentPages();
		if (!curPage || curPage.length <= 1) {
			uni.switchTab({
				url: '/pages/index/index'
			})
			return
		}
		//@ts-ignore
		const data:any = IS_NUMBER ? { delta } : { ...params }
		uni.navigateBack(data)

	}
	lastCharacter(val:string,lastString:string="/"){
		let newVal = val.charAt(val.length - 1) == lastString ? val.slice(0, val.length - 1) : val;
		return newVal
	}
	// 获取粘贴板内容
	getInvitationClipboard(cb?:Function){
		// #ifdef APP-PLUS
		if (plus.os.name == 'iOS') {  
			var UIPasteboard = plus.ios.importClass("UIPasteboard");  
			var generalPasteboard = UIPasteboard.generalPasteboard();  
			var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");  
			// value就是粘贴板的值  
			if(value!=undefined){
				if(cb) cb(value)
			}
		} else if (plus.os.name == 'Android') {  
			uni.getClipboardData({
				success: (res)=> {
					if(res.data){
						if(cb) cb(res.data)
					}
				}
			});
		}
		// #endif
	}
	// 判断粘贴板是否有邀请码
	matchInviteRequestKey(code:string){
		let inviteCode = /[N][O]\d{9}[S]/g;
		let key:any = ''
		if(inviteCode.test(code)){
			key = code.match(inviteCode);
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
	matchRequestKey(regular:any,code:string,cb?:Function){
		let key:any = ''
		for(let i of regular){
			if(i.test(code)){
				key = code.match(i);
				this.setClipboardEmpty();
				cb && cb(key[0]);
				break;
			}
		}
		
	}
	setClipboardEmpty(){
		uni.setClipboardData({
			data: '',
			showToast:false,
			success: ()=> {
			}
		});
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
		})
		app.requestKey = '';
		uni.setClipboardData({
			data: '',
			showToast:false,
			success: ()=> {
			}
		});
	}
	// canvas图片生成
	canvasToTempFilePath(canvasName:string,func?:Function){
        // #ifndef MP-ALIPAY
        uni.canvasToTempFilePath({
            canvasId: canvasName,
            success: (res: any) => {
                uni.hideLoading();
                // 在H5平台下，tempFilePath 为 base64
                if (func) {
                    func(res);
                }
            },
            fail: () => {
                uni.hideLoading();
                uni.showToast({
                    title: "图片加载失败",
                    icon:'none',
                    duration: 2000,
                });
            },
        });
        // #endif
    }
	// 保存图片
	saveImageToPhotosAlbum(imgUrl:string,func?:Function){
        // #ifndef H5
        uni.saveImageToPhotosAlbum({
            filePath: imgUrl, //    图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
            success: () => {
                uni.showToast({
                    title: "保存成功",
                    duration: 2000,
                });
                if (func) {
                    func();
                }
            },
            fail: () => {
                uni.showToast({
                    title: "保存失败",
                    icon:'none',
                    duration: 2000,
                });
            },
        });
		// #endif
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
	validateVersion(a:string, b:string) {
		console.log('validateVersion=======',a,b)
		let cpResult:any;
		let i = 0;
		const arr1 = a.replace(/[^0-9.]/, '').split('.');
		const arr2 = b.replace(/[^0-9.]/, '').split('.');
		while (true) {
			const s1:any = arr1[i];
			const s2:any = arr2[i++];
			if (s1 === undefined || s2 === undefined) {
			cpResult = arr1.length - arr2.length;
			break;
			}
			if (s1 === s2) continue;
			cpResult = s1 - s2;
			break;
		}
		// eslint-disable-next-line
		console.log('cpResult===',cpResult)
		return cpResult > 0 ? true : false;
	}
	heliService(params:object){
		uni.navigateTo({
			url: '/pages/talk/index?url_params='+JSON.stringify(params)
		})
	}
	// 字符修剪
	trimString = (str: string, char: string): string => str.split(char).filter(Boolean).join();
	// 去重
	removeDuplicate(arr:any, uniId:string){
		const res = new Map();
		return arr.filter((item:any) => !res.has(item[uniId]) && res.set(item[uniId], 1));
	}
	// 重复数
	findRepeatNumber(nums:CustomArray){
		const unique = new Set();
		for(const num of nums){
			if(unique.has(num)){
				return num
			}
			unique.add(num)
		}
		return -1;
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
