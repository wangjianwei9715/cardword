//  #ifdef APP-PLUS
import {
	ServerBase
} from "./ServerBase.js";
export class SocketServer extends ServerBase {
	socket = null;
	isopen = false;
	successCb = () => {};
	errorCb = () => {};
	close() {
	    this.isopen = false;
	    if (this.socket) {
	        let sock = this.socket;
	        this.socket = null;
	        sock.close({});
	    }
	}
	/**
	 * 连接服务器
	 */
	connect(listener,errorCb){
	    let url = this.serverInfo.ip;
	    if (!url) {
	        return;
	    }
	    this.socket = this.createSocket({url:url});
	
	    this.successCb = listener;
	    this.errorCb = errorCb;
	}
	createSocket (data) {
	    let SocketTask = uni.connectSocket({
	        url: data.url,
	        success: (result)=> {
	            console.log("connect socket success.",result);
	        },
	        fail: (result)=> {
	            console.log("connect socket fail.",result);
	        },
	    });
	    // console.log(SocketTask);
	    if (SocketTask) {
	        SocketTask.onOpen((res)=> {
	            console.log('onOpen--',res)
	            this.isopen = true;
	            this.onOpen();
	        });
	        SocketTask.onClose((res)=> {
	            console.log('onClose--',res)
	            this.isopen = false;
	            this.onClose();
	        });
	        SocketTask.onError((res)=> {
	            console.log('onError--',res)
	            this.isopen = false;
	            this.onError(res);
	        });
	        SocketTask.onMessage((res)=> {
	            this.onMessage(res);
	        });
	    }
	    
	    return SocketTask;
	};
	
	onOpen() {
	    //console.log('socket--onOpen',this.successCb);
		if(this.successCb) {
			this.successCb();
		}
	}
	
	onError(evt) {
	    console.log('socket--error ,evt =' + JSON.stringify(evt));
		this.close();
	    if(this.errorCb) {
			this.errorCb(evt);
		}
	}
	
	onMessage(evt) {
		console.log(evt);
	    this.recv(evt.data);
	}
	onClose() {
	    console.log('socket--onclose ');
	    this.close();
	    uni.$emit('socketClose');
	}
	isNetOK(){
		if (!this.socket) {
			return false;
		}
	    if (!this.isopen) {
	        return false;
	    }
		return true;
	}
	/**
	 * 发送消息
	 */
	send(bytes, listenerCb, errorCb) {
	    if (!this.socket) {
	        this.connect();
	        setTimeout(()=> {
	            this.send(bytes,listenerCb,errorCb);
	        }, 1000);
	        return;
	    }
	    try {
	        this.listenerCb = listenerCb;
	        this.errorCb = errorCb;
	        this.socket.send({data:bytes});
	    } catch (e) {
	        console.log('socket send err ' + e.message);
	    }
	}
}
// #endif
