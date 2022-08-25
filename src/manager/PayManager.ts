import { app } from "@/app";
import permision from "@/js_sdk/wa-permission/permission"
import { CBC } from "crypto-ts/src/mode/CBC";
export default class PayManager {
    private static instance: PayManager;
	payQmfAndroid:any;
    private constructor() {
		
		// #ifdef APP-PLUS

		// #endif
    }

	paymentAlipayQmfSdk(payRequest:string,cb?:Function){
		this.payQmfAndroid = uni.requireNativePlugin("payQmfAndroid");
		this.payQmfAndroid.payAliPayMiniPro(payRequest,(res:any)=>{});
		if(cb) cb()
	}
	paymentWxQmfSdk(payRequest:string,cb?:Function){
		this.payQmfAndroid = uni.requireNativePlugin("payQmfAndroid");
		this.payQmfAndroid.payWx(payRequest,(res:any)=>{});
	}
	paymentAlipay(type:any,orderInfo:string,goodOrder?:string,cb?:Function){
		console.log('orderInfo========',orderInfo,'&type==',type)
		let alipay_H5 = false 

		if(alipay_H5){
			uni.redirectTo({
				url:'/pages/webView/index?url='+encodeURIComponent(orderInfo)+'&orderCode='+goodOrder
			})
		}else{
			console.log(type,'type')
			//加了个type=='h5'
			if(type=='ysepay'||type=='qmf' ||type == "qmf_divide"||type=='h5'){
				// 渠道H5支付
				plus.runtime.openURL(orderInfo)
				if(cb) cb()
			}else{
				uni.requestPayment({
					provider:'alipay',   //alipay
					orderInfo: orderInfo, //支付宝订单数据
					success: (res:any)=> {
						uni.$emit('paySuccess')
						console.log('success:' + JSON.stringify(res));
						
					},
					fail: function (err:any) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
				if(cb) cb()
			}
		}
		// return;
		// orderInfo.indexOf('https://')!=-1
		
	}
	paymentWxpay(type:any,orderInfo:any,cb?:Function){
		console.log('orderInfo========',orderInfo)
		// 银盛pay
		if(type=='ysepay'){
			plus.share.getServices(res => {
				let sweixin = res.find(i => i.id === 'weixin')
				console.log('getServices==',encodeURIComponent(JSON.stringify(orderInfo)))
				if (sweixin) {
					sweixin.launchMiniProgram({
						id: 'gh_5cf45dd26926',
						path: '/pages/index/index?paydata=' + encodeURIComponent(JSON.stringify(orderInfo)),
						type: 0}
					)
				} else {
					// 没有获取到微信分享服务
				}
			}, err => {
				// 获取分享服务列表失败
			});
		}else{
			let order = {
				appid: "wx51f32c948fbbe03e",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
				noncestr: orderInfo.nonceStr, // 随机字符串
				package: "Sign=WXPay",        // 固定值
				partnerid: '1615470291',      // 微信支付商户号
				prepayid: orderInfo.prepayId, // 统一下单订单号 
				timestamp: orderInfo.timeStamp,        // 时间戳（单位：秒）
				sign: orderInfo.sign// 签名，这里用的 MD5 签名
			}
			//@ts-ignore
			uni.requestPayment({
				provider: 'wxpay',
				//@ts-ignore
				orderInfo: order,
				success: (res:any)=> {
					uni.$emit('paySuccess')
					console.log('success:' + JSON.stringify(res));
					if (cb) {
						cb(res);
					}
				},
				fail: (err:any)=> {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		}
		
	
	}
	static getIns(): PayManager {
		if(!PayManager.instance) {
			PayManager.instance = new PayManager();
		}
		return PayManager.instance;
    }


}
