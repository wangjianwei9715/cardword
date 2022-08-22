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
					url:`/pages/live/zgPlayBack?data=${JSON.stringify(data)}&alias=${item.alias||item.merchantAlias}&roomID=${item.roomID}`,
				})
				return 
			}else if(data.wxRoomId>0){
				jump()
			}
			
		})
		function jump():void{
			uni.navigateTo({
				url:`/pages/live/proLive?roomID=${item.roomID}&merchantId=${item.merchantId}&isAnchor=${item.isAnchor}&alias=${item.alias||item.merchantAlias}&type=${item.type}`
			})
		}
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
					type: 2//0-正式版； 1-测试版； 2-体验版。 默认值为0。
				})
			} else {
				// 没有获取到微信分享服务
			}
		}, err => {
			// 获取分享服务列表失败
		});
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
			// console.log("post  /api/app/launch=", res);
			app.service_url = url;
			// bussinessApiDomain     主接口域名
			// dataApiDomain          数据接口域名 如果为空 使用bussinessApiDomain
			let bussinessApiDomain = this.lastCharacter(res.app.bussinessApiDomain);
			let dataApiDomain = this.lastCharacter(res.app.dataApiDomain);
			let funcApiDomain= this.lastCharacter(res.app.funcApiDomain) || ''
		
			app.bussinessApiDomain = bussinessApiDomain + "/api/v2/";
			app.dataApiDomain = res.app.dataApiDomain?dataApiDomain + "/api/v2/":bussinessApiDomain + "/api/v2/"
			app.funcApiDomain = res.app.funcApiDomain?funcApiDomain + "/api/v2/":bussinessApiDomain + "/api/v2/"
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
				time:Math.round(new Date().getTime()/1000)
			});
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
		app.service_url = data.service_url;
		app.bussinessApiDomain = data.bussinessApiDomain;
		app.dataApiDomain = data.dataApiDomain;
		app.funcApiDomain=data.funcApiDomain || ''
		app.update_url = data.update_url;
		// #ifdef APP-PLUS
		app.update = !app.iosPlatform ? UpdateManager.getInstance() : {};
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
		if(regular.test(code)){
			key = code.match(regular);
			this.setClipboardEmpty();
			cb && cb(key[0])
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
	removeDuplicate = <T,_>(arr: T[]): T[] => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
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
