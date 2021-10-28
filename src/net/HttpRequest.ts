import { app } from '@/app';
import axios, { AxiosInstance } from 'axios';
import {Md5} from 'ts-md5/dist/md5';
import {
	objKeySort
} from "../tools/util";
export default class HttpRequest {
    private static instance: HttpRequest;
	private axiosInstance:AxiosInstance;
	static getIns(): HttpRequest {
		if(!HttpRequest.instance) {
			HttpRequest.instance = new HttpRequest();
		}
		return HttpRequest.instance;
    }
	
	
    private constructor() {
		let domain = ''
		// #ifndef H5
		domain = app.bussinessApiDomain
    	// #endif
		// #ifdef H5
		domain = app.domaintest
    	// #endif
		console.log('domain=========',domain)
		let systemInfo = app.platform.getAppInfo();

		
		this.axiosInstance = axios.create({
			baseURL: domain,
			timeout: 6000,
			headers: {
				appdevice: 'android',
				appversion:'20210406',
				versionname:systemInfo.versionname||'1.0.0',
				'device-density':systemInfo['device-density']||'1.5',
				model:systemInfo.model||'windows',
				'os-version':systemInfo.os_version||'10',
				plat:systemInfo.plat||'official'
			},
			adapter: (config: any) => {
				return new Promise((resolve, reject) => {
					let settle = require('axios/lib/core/settle');
					let buildURL = require('axios/lib/helpers/buildURL');
					uni.request({
						method: config.method.toUpperCase(),
						url: buildURL(config.baseURL+config.url, config.params, config.paramsSerializer),
						header: config.headers,
						data: config.data,
						dataType: config.dataType,
						responseType: config.responseType,
						sslVerify: config.sslVerify,
						complete: (response: any) => {
							response = {
								data: response.data,
								status: response.statusCode,
								errMsg: response.errMsg,
								header: response.header,
								config: config
							};
							settle(resolve, reject, response);
						}
					})
				})
			}
		});
		// 添加请求拦截器
		this.axiosInstance.interceptors.request.use((config)=> {
			// 在发送请求之前做些什么
			// console.log('config===',config);
			let url = config.url+'';
			if (url.indexOf("user/login/phone") == -1&&url.indexOf("user/code") == -1&&url.indexOf("user/forget") == -1) {//验证码、刷新、登录 首页接口不需要token &&config.url!='xingqiu/refresh_lists'&&config.url!='xingqiu/index_act'
				if (!config.headers['token']) {
					config.headers['token'] = app.token.accessToken;
				}
			}
			if (url.indexOf("me/certify") != -1) {
				config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			}
			// if(url.indexOf("opSign") != -1){
			// 	// 示例 [opSign=_searchSecret]
			// 	let start = url.indexOf('[');
			// 	let end = url.indexOf(']');
			// 	let newUrlData = url.split(url.slice(start,end+1));
			// 	let opsign =  url.substring(start+1,end).slice(7);
			// 	let newUrl  = '';
			// 	for(let i of newUrlData){
			// 		newUrl += i;
			// 	}
			// 	config.baseURL = newUrl;
			// 	this.getStr(config,opsign); 
			// }
			// 商品下单
			if(url.indexOf("good/topay/") != -1){
				this.getStr(config,'payGoodCode'); 
			}
			// 支付订单
			if (url.indexOf("order/topay/") != -1) {
				this.getStr(config,'payGoodOrder'); 
			}
			// 微信登录
			if (url.indexOf("user/login/wechat/app") != -1) {
				this.getStr(config,'wechat',true); 
			}
			// 列表 查价 搜索
			if (url.indexOf("search/good") != -1 || url.indexOf("search/query_price") != -1) {
				this.getStr(config,'searchSecret',true); 
			}
			
			// 短信验证码
			if(url.indexOf("user/code") != -1){
				let data = 'opk_smscode_'+config.data.phone+'_'+config.data.type;
				config.headers['opSign'] = Md5.hashStr(data)
			}
			// 确认收货
			if(url.indexOf("me/order/buyer/receive_good") != -1){
				let data = 'opk_'+app.opKey+'_receive_good_'+config.data.code
				config.headers['opSign'] = Md5.hashStr(data)
			}
			
			if (url.indexOf("user/bindPushIdentifier") != -1) {
				let info = plus.push.getClientInfo();
				console.log('info==',info);
				config.headers['opSign'] = Md5.hashStr('opk_'+app.opKey+'_'+info.clientid);
			}
			// 客服发送消息
			if(url.indexOf("sendMessage") != -1){
				let bucketId = config.data.bucketId;
				let imgurl = config.data.picUrl||'';
				let content = config.data.content||'';
				config.headers['opSign'] = Md5.hashStr('opk_'+app.opKey+'_'+bucketId+'_'+imgurl+'_'+content)
			}
			if(url.indexOf("app/update") != -1){
				config.baseURL = app.update_url
				console.log(config)
				
			}
			if(url.indexOf("dataApi/search") != -1 || url.indexOf("dataApi/home") != -1 || url.indexOf("dataApi/good") != -1 || url.indexOf("dataApi/config/wuliu") != -1|| url.indexOf("dataApi/oss/token") != -1|| url.indexOf("dataApi/config/category") != -1|| url.indexOf("dataApi/goodlist") != -1){
				config.url = url.substring(8);
				// #ifndef H5
				if(!app.localTest){
					config.baseURL = app.dataApiDomain;
				}
				// #endif
			}
			if(url.indexOf("app/launch") != -1){
				config.baseURL = ''
			}
			if (url.indexOf("advice/upload_advice") != -1) {
				config.headers['Content-Type'] = 'multipart/form-data';
			}
			return config;
		}, function (error) {
			// 对请求错误做些什么
			return Promise.reject(error);
		});
		// 添加响应拦截器
		this.axiosInstance.interceptors.response.use((response)=> {
			if (response.data) {
				if (response.data.code == 1101){
					uni.showModal({
						title: '信息过期',
						content: '登录状态已过期，点击 确定 自动刷新',
						showCancel: false,
						success: (event) => {
							uni.$emit('refreshToken');
						}
					});
				}else if (response.data.code == 1100) {
					// #ifndef MP
					uni.showModal({
						title: '信息无效',
						content: '登录信息无效，请重新登录',
						showCancel: false,
						success: (event) => {
							uni.$emit('reLogin');
						}
					});
					// #endif
				}else if (response.data.code == 1108) {
					uni.showModal({
						title: '提示',
						content: '请先进行身份认证',
						showCancel: false,
						success: (event) => {
							uni.navigateTo({
								url:'/pages/userinfo/setting_certify'
							})
						}
					});
				}
			}
			
			return response;
		},(error)=> {
			console.log('error====',error)
			if (error.response) {
				if (error.response.status == 429) {
					uni.showToast({ title: '请不要频繁操作', icon: 'none', duration: 2000 });
				}else if (error.response.status > 400 && error.response.status < 500) {
					uni.showToast({ title: error.response.status + '：' + error.response.statusText, icon: 'none', duration: 2000 });
				}else if(error.response.data.code==1001&&error.response.data.uri.indexOf('search/query_price') != -1){
					uni.showToast({
						title:'服务忙碌中，请稍后再试',
						icon:'none'
					})
					uni.$emit('refStop')
					uni.hideLoading();
				}
			} else {
				uni.showToast({ title: error.message, icon: 'none', duration: 2000 });
			}
			return Promise.reject(error);
		});
		
	}
	Login(){

	}
	Post(reqUrl: string, params: { [x: string]: any }, cb?: Function, errorCb?: Function) {
		let newParams = objKeySort(params)
		this.axiosInstance.post(reqUrl,newParams).then((response:any) => {
			console.log(response)
			if (response.data) {
				if (response.data.code==0) {
					if (cb) cb(response.data);
				}else if(response.data.code==1101||response.data.code==1102){
					uni.$emit('refreshToken');
				}else if(response.data.code==1100||response.data.code==1103||response.data.code==1104){
					uni.$emit('reLogin');
				}else{
					uni.showToast({
						title:response.data.code+':'+response.data.msg,
						icon:'none',
						duration:2000
					});
				}
			}else{
				uni.showToast({
					title:response.errMsg,
					icon:'none',
					duration:2000
				});
			}
			
		}).catch((error)=>{
			if (error.response && error.response.status > 500) {
				this.netError(() => {
					this.Post(reqUrl, params, cb, errorCb);
				});
			}
			
		});
	}
	Get(reqUrl: string, params: { [x: string]: any }, cb?: Function, errorCb?: Function) {
		let newParams = objKeySort(params)
		var p =[];
		for(let key in newParams){
			p.push(`${key}=${newParams[key]}`);
		}
		var strParams = p.join('&');

		this.axiosInstance.get(reqUrl+'?'+strParams).then((response) => {
			if (response.data&&response.data.code==0) {
				if (cb) cb(response.data);
			}else if(response.data.code==1101||response.data.code==1102){
				console.log('1101====')
				uni.$emit('refreshToken');
			}else{
				uni.showToast({
					title:response.data.msg,
					icon:'none',
					duration:2000
				});
			}
		}).catch((error)=>{
			if (error.response && error.response.status > 500) {
				this.netError(() => {
					this.Post(reqUrl, params, cb, errorCb);
				});
			}
			
		});
	}

	netError(retryCb?:Function) {
		uni.showModal({
			title: '访问失败',
			content: '当前网络状况不佳，请检查网络环境后重试',
			showCancel: false,
			success:()=>{
				if (retryCb) retryCb();
			}
		});
	}
	getStr(config:any,msg:any,type?:any){
		let str = ''
		if(config.data){
			for(let i in config.data){
				if(config.data[i]!=undefined){
					str+= i+'='+config.data[i]+'&'
				}
			}
			str = str.substring(0,str.lastIndexOf('&'));
		}else{
			str = config.url.split('?')[1];
		}
		
		if(type){
			config.headers['opSign'] = Md5.hashStr(str+'_'+msg)
			console.log('opSign==',str+'_'+msg)
			return ;
		}else{
			config.headers['opSign'] = Md5.hashStr(app.opKey+'_'+str+'_'+msg)
			console.log('opSign==',app.opKey+'_'+str+'_'+msg)
			return ;
		}
		
	}
}
