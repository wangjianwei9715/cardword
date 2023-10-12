/*
 * @FilePath: \jichao_app_2\src\manager\PayManager.ts
 * @Author: wjw
 * @Date: 2023-05-23 15:29:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-12 15:42:07
 * Copyright: 2023 .
 * @Descripttion: 
 */
import { app } from "@/app";
import permision from "@/js_sdk/wa-permission/permission"
import { CBC } from "crypto-ts/src/mode/CBC";
export default class PayManager {
    private static instance: PayManager;
	payQmfAndroid:any;
	riskContorl={};
    private constructor() {
		
		// #ifdef APP-PLUS

		// #endif
    }
	alipayRiskContorl(cb:Function){
		if(uni.$u.test.isEmpty(this.riskContorl)){
			const { systemInfo, deviceID } = app.platform;
			this.riskContorl={
				sysVersion:systemInfo.osVersion,
				platformType:systemInfo.model,
				mcCreatelmei:deviceID,
				mobileOperatingPlatform:systemInfo.platform,
				mcCreateTradePackage:systemInfo.appName
			}
		}
		uni.getNetworkType({
			success: (res) => {
				app.http.Post(
					"upload/alipay/riskContorl/data",
					{...this.riskContorl,netWork:res.networkType},
					// success
					()=>{
						cb()
					},
					// error
					()=>{
						uni.showToast({ title:"发生错误，请重试", icon:"none", duration: 2000 })
					}
				)
			}
		})
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
	paymentAlipay(h5CashierAddress:string,orderInfo:string,cb?:Function){
		if(h5CashierAddress){
			if(cb) cb()
			plus.runtime.openURL(h5CashierAddress)
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
	paymentWxpay(orderInfo:any,cb?:Function){
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
	static getIns(): PayManager {
		if(!PayManager.instance) {
			PayManager.instance = new PayManager();
		}
		return PayManager.instance;
    }


}
