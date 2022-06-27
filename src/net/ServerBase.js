//  #ifdef APP-NVUE
import {
	AES,
	enc
} from 'crypto-ts';
import {Message} from './NetDefine';
const MsgKeys = {
	D: 'U2FsdGVkX19MzXd7LfEjdrJNV8jUOqLTJ9juF1FI6b+Rznyt97tyzmCf3DxUQ+Gk3evc2to8oPPKtrUKNXMuvrvQJgpNQuwE0dQNdwcPIMbeduIqD3DvwOF76tFsKyAHz5M38j0nwBFLz8ZZ0M5BWWAgWSVcNGU5jUiinEnGvPGcFhEVXrUDmc4q+NcEpqojCp8DGUyrt7E41uRHZWkdFn+eiuaOWedlqmxpumkJuKV0ww3Md5NQUIfArNxdU7KRiqR2T6A7hbXu6Yalan1/LNe9zBNZGvDJBrMIdv3nnJriSl1xIVQu9DVapoN4jE6dmMQU+gO7wcikyzpWVfIM6sDpGtP7zjhxvaF74s101UIFjA/eTy/90HZBkcJpmFIH/Sl0bT0eabmp0s/XJ5lpqFeJKIKE0aX734fiCZ3Ut32tmHvOBMyt4TG375PoZqcjKthfcZbZhQ5eAEpIB72ZkuktaHeldqdLfVkXwUNeqb/T/V9w+Kmvb/DtmOoOEB0B+7UauMFYnRU2jSuwte52NDiyfYqHmPjGOc06I8aw8zTRjsOHPIV77gL0g08zN+k9cPL/xhuFupl0twkCPZqqdV4uO9cpaJeoxJovHRHfnns7UjlLRsVo7q1swEhAehjujHmbcSGcYFt+jpdVYlrodwS9+A3cszfTxM9bbziKtN1kCLYHWceox/W6JKY+XDdtTq5Wj0XYyhnaaMGjje/2zNp4sfI57dX5tsbyIvjJMgoIHpWQ6DBkSjjY9eHsjB2UprZrvi5y9i7toFC6GndTv1TxyY8sKapt3Vxx7ZbiWkM0ZeD/UIAefoK1g2Hz0kl9YYCWUz76sBFwLwGEkP8SKtXvFJvDqc4DmOYpiAeiwg2YhnYcCV+lrhl0siH2Cx91g5n8KloJkAAOjnrf4WTeHWmpptJ3P1UC9+Fg0J21dFQ6zJi8nwNPTVd24xh6/hUkhln6FX2SfNgcfbeRN4FG55HBqrEUXW07x6vsHWYQggxAanJAR7Ue99axrc4KzFPg8/QKumz1/wyiAbjFAtK4/2G0Fq83sNPoBKp1qBWvQb8o1TwYOeJ8OJOXssGMS5PKH0+lKduPSnOxA73fGhzOxLXdLueaSfXunW+wIqKHABcOeaIbFGs/T2eOQcOrs3Jv2iDPADloCVkJEfS//eT7uf3UWO6cdDHbaYy84cw1it9U/x9/c7bmtPozkQd14mLDkB+zBGAHPbF5zyPPYKf1E/vLbszOyOZvCsSGCfKtWJo=',
	E: 'U2FsdGVkX19hIL7zRecbqYDnjvjfz2nayo6rDVDWbm095vlQcM046yYfBUfF9iaffqNT5595EEOFdBsrCcnXyMyQV7JnidSgmNNCsvD9Xp081pHV+Aq8JtbJv+fUXYpDqh6c/Jg/5ISTJ+6FUCba1bCJq0sHp72f+aZu2K9SAmw+wBtPjL65LAPaT1yeUy1Z4r2Q07xfzgP2CiB79WYjs2wrc78wIQwu6KpASv/VDGBt5DJSe74pkc3uKhK4fuGzDIUuEPlVP+0CUaNWaXpXbdKHt172XbjdKGDoaVTsiZfdGd0FfTHEW7v1mvN/9GA3O1kDZnQ3GesuJGZPNs7YMQlrqpOvBYL/yzUeeHftSASwC/uJNS+OhGfLYuplOoJhbZpS5R3ty6YBc2mxxrn5lDXx7kMQ1lOFsR5OdmC9vbyz5mLGCtD1t71LNLpjb31K68Fl5tp0QdtoDQIZxFV9P+BfPA2qNb/bFPkAe+EU/CQn9Rzt5LloLv6IhA+DY02M30k0nX2DWFA5Xv/HHcSSSZI5kQMnaCoPhwm1UlNm1tBVFDvP1o5xnx9jZ1azp+WCzXh+/7cp9PyKI1xiRIksr3MNtHKqPg9sFxAqSQTd54gZpgaGNQD98fQRuFJJtrb0hC9vKYSiGho5BxKPddWY3jCBZDoTBEKJN6VQrNWW3gMirSy5kkLA6NOuBzzkQs6O2sVGxtipduhTRRscJ0y5itMIk7U1zbIvJOuO7Y+6nN8kn/kj1ns8fG0uDV5N98ys7hyIDRoD1B1isGbfqpfLrhicib8PkidLNkqQ8aJH/oUeRD66pOMcPGC2xZj3US0u/V57kUR6u89g9BoAXeD094ttz9oRRl3WzsqeXoBL+qiNLruhHxMTawiTpnqT0bEUg7STk/nPsnrLTI3lnNrCI4BIxvyLNoVW68gFlpeT9hc+x/pMbvIbhrwgg+BkMlWUDAsl8p2h2pSv6Y5JDWyVk7AF9JGc6I5v51suJUanA6OoGBE9DvTA1vG9zNBtsUPxsv9YMUfh0BgrdF1JjdCRW5yoctbHwvEp1OKPeYjqcKCP+xQRwIFbn6mnOaAiwUlnfr+wGiZfjp3BznahTTZBUKnVD/QkH7nipODy6zn9WJT1amFQS7xguxiXyoLdrsYud64Ljfk5l0WjF6s8TgUC2oL8oSJzO2bO13TufgqjD2R7hMKdnco1J3V+89MbFVH8QXyvSh+YOUvf2ERIpWgHEHidQ/XCRDCBEQxm1IhnoJk='
};
import * as proto from './proto';
export class ServerBase {
	_packFunc={};
	uuidMap={};
	serverInfo = {};
	listenerCb;
	errorCb;
	dec = [];
	en = [];
	constructor() {
		this.Start();
		return this;
	}
	recv(bytes) {
		let pack = new Uint8Array(bytes);
		if (!this.Decode(pack)) {
			console.error("-----------Protocol Packet Parsing Error --------------");
			return;
		};

		let lenArr = pack.slice(0, 2);
		let len = this._getNum(lenArr);

		let cmdID = this._toHex(this._getNum(pack.slice(3, 6)));
		console.log(cmdID);
		let recvMessageBytes = pack.slice(6, len + 6 - 4);
		//console.log(len,cmdID,recvMessageBytes);

		let packageName = Message.cmd[cmdID];
		if (!packageName || packageName.length === 0) {
			if (cmdID != '0x00001') { //心跳包不解
				console.log('不存在的cmdID：'+ cmdID);
			}
			return;
		}
		let pb = proto.message[packageName];
		if (!pb) {
			console.error('不存在的包名：', packageName);
			return;
		}
		console.log(recvMessageBytes);
		let message = pb.decode(recvMessageBytes);
		
		console.log('message===', message);
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
		} else {
			console.log(packageName + "-listenerCb: ", this.listenerCb);
		}


	}
	_getNum(uint8Arr) {
	    var res = [],
	        u;
	    for (var i = 0; i < uint8Arr.length; i++) {
	        u = uint8Arr[i];
	        res.push(('00' + Number(u).toString(16)).slice(-2));
	    }
	    return parseInt(res.join(''), 16);
	}
	_toHex(num) {
	    return  '0x'+("0000"+(Number(num).toString(16))).slice(-6).toUpperCase();
	}
	Start() {
		let bytes = AES.decrypt(MsgKeys.D, 'gngnxx123');
		let plaintext = bytes.toString(enc.Utf8);
		let str = plaintext.split(",");
		for (let i = 0; i < str.length; i++) {
			this.dec.push(Number(str[i]));
		}

		bytes = AES.decrypt(MsgKeys.E, 'gngnxx123');
		plaintext = bytes.toString(enc.Utf8);
		str = plaintext.split(",");
		for (let i = 0; i < str.length; i++) {
			this.en.push(Number(str[i]));
		}
	}
	setServerInfo(info) {
		for (const key in info) {
			if (info.hasOwnProperty(key)) {
				this.serverInfo[key] = info[key];
			}
		}

	}
	/**注册当前脚本上的所有监听事件(请在onEnable时调用)
	 * 例：server.registerHandlers(this,['onEnterMatchRsp'])
	 * @param that 脚本的this指针
	 * @param listener 监听的函数数组,**注意！函数名必须和消息同名**
	 */
	registerHandlers(that, listeners) {
		if (this.uuidMap[that._uid]) {
			console.log('重复监听:' + that.name);
			return;
		}

		if (listeners && listeners.length > 0) {
			this.uuidMap[that._uid] = [];
			for (let index = 0; index < listeners.length; index++) {
				let packageName = listeners[index];
				this.uuidMap[that._uid].push(packageName);
				
				if (typeof(that[packageName]) == 'function') {
					this._packFunc[packageName] = that[packageName].bind(that);
				} else {
					console.error('缺少监听函数：', packageName)
				}
			}
		}
	}
	unregisterHandlers(that) {
		if (!this.uuidMap[that._uid]) {
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
	Encode(byteArray) {
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
	Decode(byteArray) {
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
// #endif
