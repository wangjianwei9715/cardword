import HttpRequest from "../net/HttpRequest";
import BaseNode from '../base/BaseNode.vue';
import { app } from "@/app";
export default class UpdateManager {
  private static instance: UpdateManager;
  apkNeedUpdate = false;
  apkData = {};
  private constructor() {
    // #ifdef APP-PLUS  
    this.initAppUpdate();
    // #endif
  }

  static getInstance(): UpdateManager {
    if (!UpdateManager.instance) {
      UpdateManager.instance = new UpdateManager();
    }
    return UpdateManager.instance;
  }

  initMpUpdate() {
    let updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log('hasUpdate', res.hasUpdate);
    });

    updateManager.onUpdateReady((res) => {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，需要重启重启应用以完成更新',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(function (res) {
      // 新的版本下载失败
      uni.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前app，重新下载打开哟~',
        showCancel: false
      })
    });
  }

  initAppUpdate(){
    plus.runtime.getProperty(plus.runtime.appid||'', (widgetInfo) => {
      let myapp = getApp().globalData || {};
      myapp.version = widgetInfo.version
      app.version = myapp.version
      app.updateDebug = uni.getStorageSync("updateDebug");
      console.log('widgetInfo===',widgetInfo);
      HttpRequest.getIns().Get("app/update", {
        debug:app.updateDebug,
        name: widgetInfo.name,
        version: widgetInfo.version,
        os:uni.getSystemInfoSync().platform
      }, (res: any) => {
        let data = res.data
        console.log('AppUpdate-data===',data);
        if (data.download && data.pkg_url) {
          //强制更新代码，需要ui界面禁止用户触摸等操作
          this.apkNeedUpdate = true;
          this.apkData = data;
          uni.$emit('apkNeedUpdate');
        }else if (data.update && data.wgt_url&&data.wgt_url!='') {
          console.log('############downloadFile###########',data.wgt_url);
          uni.showModal({
            title: '版本更新',
            content: '检测到新版本，是否立刻更新。',
            showCancel: false,
            success: (result) => {
              if (result.confirm) {
                uni.$emit('wgtNeedUpdate');
                let wgtDownload = uni.downloadFile({
                  url: data.wgt_url,
                  success: (downloadResult) => {
                    if (downloadResult.statusCode === 200) {
                      let path: any = downloadResult.tempFilePath;
                      plus.runtime.install(path, {
                        force: false
                      }, () => {
                        console.log('install success...');
                        uni.showModal({
                          title: '更新完毕',
                          content: '立刻重启应用完成更新。',
                          showCancel: false,
                          success: (result) => {
                            if (result.confirm) {
                              setTimeout(()=>{
                                plus.runtime.restart();
                              },300)
                            }
                          }
                        });
                      }, (result) => {
                        console.error('install fail...', result);
                      });
                    }
                  },
                  fail: (result) => {
                    console.error('install fail...', result);
                  }
                });
                let download = 0;
                wgtDownload.onProgressUpdate((res) => {
                  if(res.progress>download){
                    download = res.progress
                    if(res.progress<100){
                      uni.$emit('wgtUpdateNum',res.progress);
                    }
                  }
                });
              }
            }
          });
          
        }
      });
    });
  }
}