import { app } from "@/app";
import permision from "@/js_sdk/wa-permission/permission";
export default class PlatformManager {
    constructor() {
        this.systemInfo = uni.getSystemInfoSync();
        this.oaid = '';
        this.imei = '';
        this.deviceID = '';
        this.isIos = false;
        this.deviceID = this.systemInfo.deviceId;
        console.log('########Platform:', this.systemInfo);
        app.statusBarHeight = this.systemInfo.statusBarHeight;
        // #ifdef APP-PLUS
        this.isIos = (plus.os.name == "iOS");
        plus.device.getOAID({
            complete: (res) => {
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
    async getLocationPermission() {
        // #ifdef APP-PLUS
        if (permision.checkSystemEnableLocation()) {
            if (!this.isIos) {
                return await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION') == 1;
            }
            else {
                return permision.judgeIosPermission('location');
            }
        }
        else {
            return false;
        }
        // #endif
        // #ifndef APP-PLUS
        return false; //暂时不处理native以外的情况
        // #endif
    }
    async getCameraPermission() {
        // #ifdef APP-PLUS
        if (!this.isIos) {
            return await permision.requestAndroidPermission('android.permission.CAMERA') == 1;
        }
        else {
            return permision.judgeIosPermission('camera');
        }
        // #endif
        // #ifndef APP-PLUS
        return false; //暂时不处理native以外的情况
        // #endif
    }
    async getPhotoPermission() {
        // #ifdef APP-PLUS
        if (!this.isIos) {
            return await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE') == 1;
        }
        else {
            return permision.judgeIosPermission('photoLibrary');
        }
        // #endif
        // #ifndef APP-PLUS
        return false; //暂时不处理native以外的情况
        // #endif
    }
    gotoPermissionSetting() {
        // #ifdef APP-PLUS
        permision.gotoAppPermissionSetting();
        // #endif
    }
    static getIns() {
        if (!PlatformManager.instance) {
            PlatformManager.instance = new PlatformManager();
        }
        return PlatformManager.instance;
    }
    phoneAspect() {
        let aspect = this.systemInfo.windowHeight / this.systemInfo.windowWidth > 1.8 ? true : false;
        return aspect;
    }
    getDeviceId() {
        let deviecs = '';
        return deviecs;
    }
    getDeviceIds() {
        let deviceid = '';
        return deviceid;
    }
    getWifiName() {
        let name = '';
        return name;
    }
    getInviterid() {
        let id = 0;
        return id;
    }
    getVersionName() {
        let name = 'V1.0.0';
        return name;
    }
    getVersionCode() {
        let id = 0;
        return id;
    }
    setAppName(appName) {
    }
    isAppInstalled(packageName) {
        return false;
    }
    downloadAPP(url) {
    }
    launchApp(packageName) {
    }
    refresh() {
    }
    openBrowser(url) {
    }
    openLink(url, isExternal) {
    }
    AwallDownLoad(url) {
    }
    saveImageByUrl(imageUrl, successCb, failCb) {
    }
    initMoKu(userID) {
    }
    shareUtils(type, title, content, img, url) {
    }
    copyUrl(url) {
        let data = "";
        return data;
    }
    getAppInfo() {
        let data = {};
        return data;
    }
}
//# sourceMappingURL=PlatformManager.js.map