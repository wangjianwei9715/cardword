import { app } from "@/app";
import permision from "@/js_sdk/wa-permission/permission"
export default class PlatformManager {
    private static instance: PlatformManager;
	systemInfo:UniApp.GetSystemInfoResult = uni.getSystemInfoSync();
	oaid='';
	imei='';
    deviceID = '';
	isIos = false;
	
    private constructor() {
		this.deviceID = this.systemInfo.deviceId;
        console.log('########Platform:',this.systemInfo);
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
	async getLocationPermission():Promise<boolean>{
		// #ifdef APP-PLUS
		if (permision.checkSystemEnableLocation()) {
			if (!this.isIos) {
				return await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')==1;
			}else{
				return permision.judgeIosPermission('location');
			}
		}else{
			return false;
		}
		// #endif

		// #ifndef APP-PLUS
		return false;//暂时不处理native以外的情况
		// #endif
	}
	async getCameraPermission():Promise<boolean>{
		// #ifdef APP-PLUS
		if (!this.isIos) {
			return await permision.requestAndroidPermission('android.permission.CAMERA')==1;
		}else{
			return permision.judgeIosPermission('camera');
		}
		// #endif

		// #ifndef APP-PLUS
		return false;//暂时不处理native以外的情况
		// #endif
	}
	async getPhotoPermission():Promise<boolean>{
		// #ifdef APP-PLUS
		if (!this.isIos) {
			return await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE')==1;
		}else{
			return permision.judgeIosPermission('photoLibrary');
		}
		// #endif

		// #ifndef APP-PLUS
		return false;//暂时不处理native以外的情况
		// #endif
	}
	gotoPermissionSetting(){
		// #ifdef APP-PLUS
		permision.gotoAppPermissionSetting();
		// #endif
	}
    
	static getIns(): PlatformManager {
		if(!PlatformManager.instance) {
			PlatformManager.instance = new PlatformManager();
		}
		return PlatformManager.instance;
    }
	wechatLogin(){
		uni.showLoading({
			title: '正在登录'
		});
		uni.login({
            provider: "weixin",
            success: (loginRes) => {
                console.log("weixin-res=", loginRes);
                // #ifdef MP
				app.http.Post("user/login/wechat/mini",{jsCode:loginRes.code,os:'mini',device:'iosmini'},(data:any)=>{
					uni.hideLoading()
					app.data = data.data;
					app.opKey = data.opKey
					uni.setStorageSync("app_opk", data.opKey);
					app.socketInfo = data.app;
					app.token = {accessToken:data.accessToken,refreshToken:data.refreshToken};
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
	getWechatUserInfo(callback?:Function){//此接口需要 open-type="getUserInfo"
        let myapp = getApp().globalData || {};
        //#ifdef MP
        // uni.showLoading({
        //     mask:true
        // });
        uni.getUserProfile({
            desc:'用于显示头像昵称',
            success: (infoRes) => {
                myapp.needAuth = false;
                if (callback) {
                    callback(infoRes);
                }
				console.log(infoRes.userInfo)
                let userinfo:any = infoRes.userInfo;
                app.http.Post("user/miniSetAttr", {avatar: encodeURIComponent(userinfo.avatarUrl),name: userinfo.nickName,sex:userinfo.gender},()=>{
					app.data.avatar = infoRes.userInfo.avatarUrl;
					app.data.name = infoRes.userInfo.nickName;
                    uni.$emit('updateToken')
				});
            },
            complete:()=>{
            }
        });
        // #endif
        
        //#ifdef H5
        //微信内部网页环境
        if (navigator.userAgent.match(/micromessenger/i)) {
            
        }
        // #endif
    }
	payment(data:any,callback?:Function){
        // #ifdef MP-WEIXIN
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: 'prepay_id='+data.prepayId,
			signType: data.signType,
			paySign: data.sign,
			success: (res:any)=> {
				console.log('success:' + JSON.stringify(res));
				if (callback) {
					callback(res);
				}
			},
			fail: (err:any)=> {
				console.log('fail:' + JSON.stringify(err));
			}
		});
        // #endif
		
        // #ifdef APP-PLUS
        
        // #endif

        
        

        //#ifdef H5
        //微信内部网页环境
        if (navigator.userAgent.match(/micromessenger/i)) {
            
        }
        // #endif
    }
	// 微信直播间
	goWeChatLive(id:any){

		// #ifdef APP-PLUS
		plus.share.getServices(res => {
			let sweixin = res.find(i => i.id === 'weixin')
			console.log('getServices==',res)
			if (sweixin) {
				sweixin.launchMiniProgram({
					id: 'gh_5cf45dd26926',
					path: '/pages/index/index?id='+id,
					type:0
				},(res:any)=>{
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
			url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+id
		})
		// #endif
		
	}
	phoneAspect():boolean{
		let aspect = this.systemInfo.windowHeight/this.systemInfo.windowWidth>1.8?true:false
		return aspect;
	}
	getDeviceId():string{
		let deviecs = ''

		return deviecs;
	}
	getDeviceIds():string{
		let deviceid=''
		
		return deviceid;
	}
	getWifiName():string{
		let name = ''
		
		return name;
	}
	getInviterid():number{
		let id = 0;
	
		return id;
	}
	getVersionName():string{
		let name = 'V1.0.0'
		
		return name;
	}
	getVersionCode():number{
		let id =0;
		
		return id;
	}
	setAppName(appName:string){
		
	}
	isAppInstalled(packageName:string):boolean{
		
		return false;
	}
	downloadAPP(url:string){
		
	}
	launchApp(packageName:string){
		
	}
	refresh(){
		
	}
	openBrowser(url:string){
		
	}
	openLink(url:string,isExternal:string){
		
	}
	AwallDownLoad(url:string){
		
	}
	saveImageByUrl(imageUrl:string,successCb?:Function,failCb?:Function){
		
	}

	initMoKu(userID:string){
		
	}
	shareUtils(type:string,title:string,content:string,img:string,url:string){
		
	}
	copyUrl(url:string):string{
		let data ="";
		
		return data;
	}
	getAppInfo(){
		let data: {[x: string]: any}={};
		
		return data;
	}

}
