import { app } from "../app";
import { ServerBase } from "./ServerBase";
export class SocketServer extends ServerBase {
    private socket: UniApp.SocketTask|null = null;
    private isopen = false;
    successCb: Function|undefined = undefined;
    errorCb: Function|undefined = undefined;

    close() {
        this.isopen = false;
        if (this.socket) {
			this.socket.close({})
			this.socket = null;
            // let sock = this.socket;
            // this.socket = null;
            // sock.close({});
        }
    }
    /**
     * 连接服务器
     */
    connect(listener?: Function,errorCb?:Function): void {
        let url = this.serverInfo.ip;
        
        console.log('url=====',url);
        if (!url) {
            return;
        }
        this.socket = this.createSocket({url:url});

        this.successCb = listener;
        this.errorCb = errorCb;
        console.log('this.socket=====',this.socket);
    }
    createSocket (data:UniApp.ConnectSocketOption) {
        let SocketTask = uni.connectSocket({
            url: data.url,
            success: (result)=> {
                console.log("connect socket success.",result);
            },
            fail: (result)=> {
                console.log("connect socket fail.",result);
            },
        });
        console.log(SocketTask);
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

	onError(evt:any) {
        console.log('socket--error ,evt =' + JSON.stringify(evt));
		this.close();
        if(this.errorCb) {
			this.errorCb(evt);
		}
	}

	onMessage(evt:any) {
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
    send(bytes:ArrayBufferLike, listenerCb?: Function, errorCb?: Function) {
        if (!this.socket) {
            // this.connect();
            // setTimeout(()=> {
            //     this.send(bytes,listenerCb,errorCb);
            // }, 1000);
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
