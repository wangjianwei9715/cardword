import { AES,enc } from 'crypto-ts';
import { app } from '../app';
import {Message} from './NetDefine';
export abstract class ServerBase{
    _packFunc:{[x:string]:any}  = {};
    uuidMap:{[x:string]:any}  = {};

    private dec:any[] = [];
    private en:any[] = [];

    serverInfo:{[x:string]:any} = {};

    listenerCb:any;
    errorCb:any;
    constructor() {
        this.Start();
        return this;
    }
    setServerInfo(info:any){
        for (const key in info) {
            if (info.hasOwnProperty(key)) {
                this.serverInfo[key] = info[key];
            }
        }

    }

    abstract send(bytes:ArrayBufferLike, listenerCb?: Function, errorCb?: Function):void;

    recv(bytes:ArrayBufferLike): void {
        let pack = new Uint8Array(bytes);
        if (!this.Decode(pack)) {
            console.error("-----------Protocol Packet Parsing Error --------------");
            return;
        };

        let lenArr = pack.slice(0, 2);
        let len = this._getNum(lenArr);

        let cmdID = this._toHex(this._getNum(pack.slice(3, 6)));

        let recvMessageBytes = pack.slice(6, len + 6 - 4);
        //console.log(len,cmdID,recvMessageBytes);
		console.log(recvMessageBytes)
        let packageName = Message.cmd[cmdID];
        if (!packageName || packageName.length === 0) {
            if (cmdID != '0x00001') {//心跳包不解
                console.log('不存在的cmdID：' + cmdID);
            }
            return;
        }
		// console.log(app.protobuf.message)
		const CopyMessage:any=Message
		console.log(packageName)
		console.log(CopyMessage[packageName])
        let pb = app.protobuf.message[packageName];
        if (!pb) {
            console.error('不存在的包名：', packageName);
            return;
        }
        let message = pb.decode(recvMessageBytes);

        console.log('message===',message);
        // 1、响应使用管理器预先在网络模块注册过的处理器，处理回调。
        if (this._packFunc[packageName]) {
            this._packFunc[packageName](message);
            return;
        }

        // 2、 响应一次性注册的回调，一般在发包前注册回调，回调只响应一次，即失效。（错误处理不严谨，需要后期处理）
        if (this.listenerCb) {
            this.listenerCb(message);

            this.listenerCb = null;
            this.errorCb = null;
        }else{
            console.log(packageName + "-listenerCb: " , this.listenerCb);
        }

        
    }

        /**注册当前脚本上的所有监听事件(请在onEnable时调用)
     * 例：server.registerHandlers(this,['onEnterMatchRsp'])
     * @param that 脚本的this指针
     * @param listener 监听的函数数组,**注意！函数名必须和消息同名**
     */
    registerHandlers(that:any,listeners:Array<string>){
        if(this.uuidMap[that._uid]) {
            console.log('重复监听:'+that.name);
			return;
		}

        if(listeners && listeners.length > 0) {
			this.uuidMap[that._uid] = [];
			for(let index = 0 ;index<listeners.length;index++) {
                let packageName = listeners[index];
                this.uuidMap[that._uid].push(packageName);
                
                if (typeof (that[packageName]) == 'function') {
                    this._packFunc[packageName] = that[packageName].bind(that);
                } else {
                    console.error('缺少监听函数：', packageName)
                }
            }
		}
    }
    unregisterHandlers(that:any) {
		if(!this.uuidMap[that._uid]) {
			return;
		}
		let packageNames = this.uuidMap[that._uid];
		
        for (let index = 0; index < packageNames.length; index++) {
            let packageName = packageNames[index];
            if (this._packFunc[packageName]) {
                delete this._packFunc[packageName];
            }
        }
		
		delete this.uuidMap[that._uid];
	}

    _getNum(uint8Arr:any) {
        var res = [],
            u;
        for (var i = 0; i < uint8Arr.length; i++) {
            u = uint8Arr[i];
            res.push(('00' + Number(u).toString(16)).slice(-2));
        }
        return parseInt(res.join(''), 16);
    }
    _toHex(num:any) {
        return  '0x'+("0000"+(Number(num).toString(16))).slice(-6).toUpperCase();
    }

    public Start() {
        let bytes = AES.decrypt(app.MsgKeys.D, 'gngnxx123');
        let plaintext = bytes.toString(enc.Utf8);
        let str:string[] = plaintext.split(",");
        for (let i = 0; i < str.length; i++) {
            this.dec.push(Number(str[i]));
        }

        bytes = AES.decrypt(app.MsgKeys.E, 'gngnxx123');
        plaintext = bytes.toString(enc.Utf8);
        str = plaintext.split(",");
        for (let i = 0; i < str.length; i++) {
            this.en.push(Number(str[i]));
        }
    }

    public Encode(byteArray:any) {
        let size = byteArray.length;
        let cb = 0;
        for (let i = 3; i < size; i++) {
            let data = byteArray[i];
            data &= 0x00FF;
            cb += data;
            cb &= 0x00FF;
            byteArray[i] = this.en[data];
        }
        byteArray[2] = cb;
    }

    public Decode(byteArray:any): boolean {
        if (byteArray.length < 6) {
            return false;
        }
        let size = byteArray.length;
        let cb = 0;
        for (let i = 3; i < size; i++) {
            let data = byteArray[i];
            data = data & 0x00FF;
            byteArray[i] = this.dec[data];
            cb += byteArray[i];
            cb &= 0x00FF;
        }
        let code = byteArray[2];
        if (cb != code) {
            return false;
        }
        return true;
    }
}


