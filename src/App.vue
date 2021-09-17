<script lang="ts">
import Vue from "vue";
import { app } from "./app";

import * as proto from "./net/proto";

import { SocketServer } from "@/net/SocketServer";
import { Message } from "@/net/NetDefine";
import { PackageBase } from "@/net/PackageBase";
import HttpRequest from "./net/HttpRequest";
import UpdateManager from "./manager/UpdateManager";
import { Md5 } from "ts-md5";
export default Vue.extend({
  mpType: "app",
  globalData: {},
  onLaunch() {
    console.log("App Launch");
    // #ifdef APP-PLUS
    app.version = plus.runtime.version || "1.0.0";

    if (!app.localTest) {
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
          let launchUrl = app.launch_url.sort(() => {
            return Math.random() - 0.5;
          });
          let launchSuccess = false;
          let params = {
            name: "com.chuanqiu.ttauction",
            version: app.version,
            uuid: app.platform.deviceID,
          };

          console.log("launchuuid", app.platform);
          for (let i in launchUrl) {
            if (!launchSuccess) {
              app.http.Post(
                launchUrl[i] + "/api/app/launch",
                params,
                (res: any) => {
                  launchSuccess = true;
                  console.log("launch=============", res);
                  app.bussinessApiDomain =
                    res.app.bussinessApiDomain + "api/v1/";
                  if (res.app.dataApiDomain) {
                    app.dataApiDomain = res.app.dataApiDomain + "api/v1/";
                  } else {
                    app.dataApiDomain = res.app.bussinessApiDomain + "api/v1/";
                  }

                  uni.setStorageSync("launchConfig", res);
                  app.update_url = launchUrl[i] + "/api/";
                }
              );
              break;
            } else {
              break;
            }
          }

          if (!launchSuccess) {
            let launchConfig = uni.getStorageSync("launchConfig");
            if (launchConfig.app) {
              app.bussinessApiDomain =
                launchConfig.app.bussinessApiDomain + "api/v1/";
              if (launchConfig.app.dataApiDomain) {
                app.dataApiDomain = launchConfig.app.dataApiDomain + "api/v1/";
              } else {
                app.dataApiDomain =
                  launchConfig.app.bussinessApiDomain + "api/v1/";
              }
            } else {
            }
          }
          console.log("bussinessApiDomain==========", app.bussinessApiDomain);
          console.log("dataApiDomain==========", app.dataApiDomain);
        },
      });
    }

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

    let needPushIdentifier = true;

    const loginToken = uni.getStorageSync("token");
    if (loginToken) {
      needPushIdentifier = false;
      app.token = JSON.parse(loginToken);
      let params = {
        uuid: app.platform.deviceID,
        os: app.platform.systemInfo.platform,
        device: app.platform.systemInfo.brand + app.platform.systemInfo.model,
      };
      HttpRequest.getIns().Post("user/token/access", params, (data: any) => {
        console.log("access=====", data);
        app.data = data.data;
        app.opKey = data.opKey;
        if (data.app) {
          app.socketInfo = data.app;
        }
        if (data.data.mustBindPhone) {
          uni.reLaunch({
            url: "/pages/login/bindphone",
          });
        }
        uni.$emit("loginSuccess");
      });
    }

    uni.$on("refreshToken", () => {
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
        console.log("data======", data);
        console.log("app.token=======", app.token);
        let params = {
          uuid: app.platform.deviceID,
          os: app.platform.systemInfo.platform,
          device: app.platform.systemInfo.brand + app.platform.systemInfo.model,
        };
        HttpRequest.getIns().Post("user/token/access", params, (data: any) => {
          console.log(data);
          app.data = data.data;
          app.socketInfo = data.app;
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
      uni.navigateTo({
        url: "/pages/login/login",
      });
    });
    console.log(proto);
    app.protobuf = proto;
    app.sever = new SocketServer();

    let sendWebsocketLogin = () => {
      let msg = new proto.message.Login();
      msg.BuildNo = app.version;
      msg.accountId = app.data.accountId;
      msg.token = app.socketInfo.tcpToken;
      let buffer = proto.message.Login.encode(msg).finish();
      let pack = new PackageBase(Message.Login);
      pack.d(buffer).to(app.sever);
    };
    let connectSever = () => {
      app.sever.close();
      app.sever.setServerInfo({ ip: app.socketInfo.tcp });
      app.sever.connect(
        () => {
          console.log("connect success");
          sendHeartBeat();
          sendWebsocketLogin();
        },
        () => {
          // uni.showModal({
          // 	title:'连接失败',
          // 	content:'服务器维护中，请稍后再试...',
          // 	showCancel:false,
          // 	success:()=>{
          // 		connectSever();
          // 	}
          // });
        }
      );
    };
    uni.$on("loginSuccess", () => {
      // #ifdef APP-PLUS
      if (needPushIdentifier) {
        let info = plus.push.getClientInfo();
        console.log("getClientInfo", info);
        HttpRequest.getIns().Post("user/bindPushIdentifier", {
          id: info.clientid,
        });
      }
      if (app.payload != "") {
        uni.navigateTo({
          url: app.payload,
        });
        app.payload = "";
      }
      // #endif

      if (app.socketInfo.tcp && app.socketInfo.tcp != "") {
        connectSever();
      }
    });
    uni.$on("socketClose", () => {
      if (app.socketInfo.tcp && app.socketInfo.tcp != "") {
        // uni.showModal({
        // 	title:'连接失败',
        // 	content:'服务器维护中，请稍后再试...',
        // 	showCancel:false,
        // 	success:()=>{
        // 		connectSever();
        // 	}
        // });
      }
    });

    uni.onTabBarMidButtonTap(() => {
      // 监听tabbar中间发起按钮
      uni.navigateTo({
        url: "/pages/initiate/initiate",
      });
    });

    let sendHeartBeat = () => {
      if (app.sever && app.sever.isNetOK()) {
        let msg = new proto.message.HeartBeat();
        msg.time = new Date().getTime();
        let buffer = proto.message.HeartBeat.encode(msg).finish();
        let pack = new PackageBase(Message.HeartBeat);
        pack.d(buffer).to(app.sever);
      }
    };
    // 热更新
    // app.update = UpdateManager.getInstance();
    //心跳包
    setInterval(() => {
      sendHeartBeat();
    }, 10000);
  },
  onShow() {
    console.log("App Show");
    // #ifndef H5
    uni.setKeepScreenOn({
      keepScreenOn: true,
    });
    // #endif
  },
  onHide() {
    console.log("App Hide");
  },
});
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import "./common/uni.css";
@font-face {
  font-family: 'DIN';
  src: url("./common/DIN/DINAlternateBold.ttf");
}
.din{
  font-family: 'DIN' !important;
}
/*每个页面公共css */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

::-webkit-scrollbar {
  display: none;
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
</style>
