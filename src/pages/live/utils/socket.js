const app = getApp().globalData.app
import { registerList } from './staticData'
import { $toast,$confirm } from './tools'
import * as proto from "../../../net/proto";
import { PackageBase } from "@/net/PackageBase";
import { Message } from "@/net/NetDefine";
export default class LiveSocket {
    ws = ''
    page = null
    inReconnection = false
    reconnectionTimer = null
    alreadyOnceSocket = false//是否已经连接过socket了
    heartBeatTimer = null
    loginData = {}
    constructor(data, page) {
        this.ws = data.ws
        this.loginData = data
        this.page = page
    }
    connectSever() {
        return new Promise((resolve, reject) => {
            app.sever && app.sever.close();
            app.sever.setServerInfo({
                ip: this.ws
            });
            app.sever.connect(
                () => {
                    app.sever.registerHandlers(this.page, registerList, true);
                    this.startHeartBeatTimer()
                    this.alreadyOnceSocket = true
                    this.login()
                    uni.hideLoading()
                    if (!this.alreadyOnceSocket) uni.$on("socketClose", this.socketClose);
                    resolve()
                },
                () => {
                    this.alreadyOnceSocket = true
                    $toast.info('连接失败')
                    reject()
                }
            );
        })
    };
    login() {
        this.send("LoginBroadCastRoom1001", {
            roomId: +this.loginData.roomId,
            uid: this.loginData.uid,
            token: this.loginData.token
        }).then(res => {
            this.reconnectionTimer && clearInterval(this.reconnectionTimer);
        })
    }
    logOut() {
        this.send("LogoutBroadCastRoom1001", {
            roomId: +this.loginData.roomId
        }).then(res => {
            getApp().globalData.destroyServe();
            console.log("socket离开房间");
        });
    }
    startHeartBeatTimer() {
        this.sendHeartBeat()
        this.heartBeatTimer && clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = setInterval(() => {
            this.sendHeartBeat()
        }, 6 * 1000);
    };
    sendHeartBeat() {
        this.send("HeartBeat", {
            time: new Date().getTime()
        })
    };
    send(packName, valueObject = null) {
        console.log(packName);
        return new Promise((resolve, reject) => {
            if (app.sever && app.sever.isNetOK()) {
                let msg = new proto.message[packName]();
                if (valueObject && Object.keys(valueObject).length) {
                    Object.keys(valueObject).forEach((key, index) => {
                        msg[key] = valueObject[key];
                    });
                }
                let buffer = proto.message[packName].encode(msg).finish();
                let pack = new PackageBase(Message[packName]);
                pack.d(buffer).to(app.sever);
                resolve({
                    pack,
                    buffer
                });
            } else {
                uni.showToast({
                    title: "连接状态异常",
                    icon: "none"
                });
                this.socketClose()
            }
        });
    };

    reconnectionSocket() {
        if (this.inReconnection) return;
        app.sever && app.sever.close();
        uni.showLoading({
            title: "连接中"
        });
        this.inReconnection = true
        console.log('开始重连');
        this.reconnectionTimer && clearInterval(this.reconnectionTimer);
        this.reconnectionTimer = setInterval(() => {
            console.log("断线重连中", new Date());
            this.connectSever();
        }, 3000);
    };
    destroy() {
        uni.$off("socketClose", this.socketClose)
    };
    socketClose() {
        console.log("socket断开了");
        //监听到断线
        this.reconnectionSocket();
    };
}