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
