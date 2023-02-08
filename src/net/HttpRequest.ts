import { app } from '@/app';
import axios, { AxiosInstance } from 'axios';
import { data } from 'browserslist';
import { Md5 } from 'ts-md5';
import {
	objKeySort,
	getUrlDataFN
} from "../tools/util";
import { headersData, opSignData, opSignOtherData } from "@/net/DataHttp"
const debounceData = ['dataApi/point/exchange/goodlist', 'dataApi/selectRank/award/list']
const reLoginAction = () => {
	uni.showModal({
		title: "信息无效",
		content: "登录信息无效,请重新登录",
		showCancel: false,
		success: (event: any) => {
			if (event.confirm) uni.$emit("reLogin", `return=true`)
		}
	})
}
const refreshToken = () => {
	uni.$emit('refreshToken')
}
const certify = () => {
	uni.showModal({
		title: '提示',
		content: '请先进行身份认证',
		showCancel: false,
		success: (event) => {
			if (event.confirm) {
				uni.navigateTo({
					url: '/pages/userinfo/setting_certify'
				})
			}
		}
	});
}
const errorCodeMap: any = {
	1001: {
		checkMsg: "商品不存在",
		reject: false,//拦截器拦截后是否进入到下级响应promise的catch
		execute: () => {
			uni.$emit("noGoodsDetail")
		}
	},
	1100: {
		reject: true,
		execute: reLoginAction,
	},
	1102: {
		reject: true,
		execute: refreshToken,
	},
	1103: {
		reject: true,
		execute: reLoginAction,
	},
	1104: {
		reject: true,
		execute: reLoginAction,
	},
	1108: {
		reject: true,
		execute: certify
	},

}
export default class HttpRequest {
	private static instance: HttpRequest;
	private axiosInstance: AxiosInstance;
	debounceUrl = '';
	headersData = headersData;
	opSignData = opSignData;
	opSignOtherData = opSignOtherData
	static getIns(): HttpRequest {
		if (!HttpRequest.instance) {
			HttpRequest.instance = new HttpRequest();
		}
		return HttpRequest.instance;
	}


	private constructor() {
		var domain = ''
		domain = app.bussinessApiDomain
		let systemInfo = app.platform.getAppInfo();

		this.axiosInstance = axios.create({
			baseURL: domain,
			timeout: 6000,
			headers: {
				appdevice: 'android',
				appversion: '20210406',
				versionname: systemInfo.versionname || '1.0.0',
				'device-density': systemInfo['device-density'] || '1.5',
				model: systemInfo.model || 'windows',
				'os-version': systemInfo.os_version || '10',
				plat: systemInfo.plat || 'official'
			},
			adapter: (config: any) => {
				return new Promise((resolve, reject) => {
					let settle = require('axios/lib/core/settle');
					let buildURL = require('axios/lib/helpers/buildURL');
					uni.request({
						method: config.method.toUpperCase(),
						url: buildURL(config.baseURL + config.url, config.params, config.paramsSerializer),
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
		this.axiosInstance.interceptors.request.use((config) => {
			// 在发送请求之前做些什么
			if (app.opKey == '') {
				app.opKey = uni.getStorageSync('app_opk')
			}
			config.baseURL = app.bussinessApiDomain
			let url = config.url + '';
			const ksjUserId = uni.getStorageSync('ksjUserId');
			if (!uni.$u.test.isEmpty(ksjUserId)) {
				config.headers['ksjUserId'] = ksjUserId;
			}
			if (app.version != '' && app.version != '1.0.0') {
				config.headers['version'] = app.version;
			}
			if (url.indexOf("user/login/phone") == -1 && url.indexOf("user/code") == -1 && url.indexOf("user/forget") == -1) {//验证码、刷新、登录 首页接口不需要token &&config.url!='xingqiu/refresh_lists'&&config.url!='xingqiu/index_act'
				if (!config.headers['token'] && app.token.accessToken != '') {
					config.headers['token'] = app.token.accessToken;
				}
			}
			for (let i in this.headersData) {
				const data = this.headersData[i]
				if (url.indexOf(`${data.url}`) != -1) {
					config.headers[`${data.name}`] = `${data.msg}`;
				}
			}
			// config.data数据+sign统一处理opSign
			for (let i in this.opSignData) {
				const data = this.opSignData[i]
				if (url.indexOf(`${data.url}`) != -1) {
					this.setOpSign(config, data.sign, data.needOpKey)
				}
			}
			// 需要单独处理额外数据的opSign
			for (let i in this.opSignOtherData) {
				const data = this.opSignOtherData[i]
				if (url.indexOf(`${data.url}`) != -1) {
					let opSign;
					switch (data.name) {
						case '短信验证码':
							opSign = `opk_smscode_${config.data.phone}_${config.data.type}`;
							break;
						case '确认收货':
							opSign = `opk_${app.opKey}_receive_good_${config.data.code}`;
							break;
						case '绑定Push':
							//#ifdef APP-PLUS
							opSign = `opk_${app.opKey}_${plus.push.getClientInfo().clientid}`;
							break;
						//#endif
						case '客服发送消息':
							opSign = `opk_${app.opKey}_${config.data.bucketId}_${config.data.picUrl || ''}_${config.data.content || ''}`;
							break;
						default:
							opSign = ''
					};
					config.headers['opSign'] = Md5.hashStr(opSign)
				}
			}
			if (url.indexOf("app/update") != -1) {
				config.baseURL = app.update_url
			}
			if (url.indexOf("dataApi/") != -1) {
				config.url = url.substring(8);
				if (app.dataApiDomain == '' && !app.localTest) return;
				if (!app.localTest) config.baseURL = app.dataApiDomain;
			}
			if (url.indexOf('funcApi/') != -1) {
				config.url = url.substring(8);
				config.baseURL = app.funcApiDomain || domain
				if (!app.localTest) {
					config.baseURL = app.funcApiDomain;
				}
			}
			if (url.indexOf("app/launch") != -1 || url.indexOf("app/onlinecfg") != -1) {
				config.baseURL = ''
			}
			if (url.indexOf("/relative") != -1) {
				const data = getUrlDataFN(url)
				config.headers['ts'] = data.ts;
				config.headers['s'] = data.s;
			}
			// console.log('请求开始：config===',config);
			return config;
		}, function (error) {
			// 对请求错误做些什么
			uni.hideLoading()
			return Promise.reject(error);
		});
		// 添加响应拦截器
		this.axiosInstance.interceptors.response.use((response) => {
			this.debounceUrl = ''
			if (response.data) {
				const findError: any = errorCodeMap[response.data.code];
				if (!findError) return response
				if (findError.checkMsg && response.data.msg !== findError.checkMsg) return response;
				uni.$u.debounce(() => {
					response.config.url?.indexOf('brodcast/third/1001/achor/stopPush') != -1 ? reLoginAction() : findError.execute(response);
				}, 200);
				return findError.reject ? Promise.reject(response) : response;
			}
			return response;
		}, (error) => {
			this.debounceUrl = '';
			uni.hideLoading()
			console.log('error====', error)
			if (error.response) {
				if (error.response.status == 429) {
					uni.showToast({ title: '请不要频繁操作', icon: 'none', duration: 2000 });
				} else if (error.response.status > 400 && error.response.status < 500) {
					uni.showToast({ title: error.response.status + '：' + error.response.statusText, icon: 'none', duration: 2000 });
				}
			} else {
				// uni.showToast({ title: error.message, icon: 'none', duration: 2000 });
			}
			return Promise.reject(error);
		});

	}
	Login() {

	}
	Post(reqUrl: string, params: { [x: string]: any }, cb?: Function, errorCb?: Function) {
		let newParams = objKeySort(params)
		this.axiosInstance.post(reqUrl, newParams).then((response: any) => {
			if (response.data) {
				if (response.data.code == 0) {
					if (cb) cb(response.data);
				} else if (response.data.code == 1000) {
					if (errorCb) errorCb()
				} else if (response.data.code == 16) {
					uni.navigateTo({
						url: '/pages/userinfo/setting_addresses'
					})
					setTimeout(() => {
						uni.showToast({
							title: response.data.code + ':' + response.data.msg,
							icon: 'none',
							duration: 2000
						});
					}, 100)
				} else {
					uni.showToast({
						title: response.data.code + ':' + response.data.msg,
						icon: 'none',
						duration: 2000
					});
					errorCb && errorCb(response.data.msg)
				}
			} else {
				if (errorCb) errorCb()
				uni.showToast({
					title: '网络异常',
					icon: 'none',
					duration: 2000
				});
			}

		}).catch((error) => {
			if (errorCb) errorCb()
			if (error.response && error.response.status > 500) {
				this.netError(() => {
					this.Post(reqUrl, params, cb, errorCb);
				});
			}

		});
	}
	Get(reqUrl: string, params: { [x: string]: any }, cb?: Function, errorCb?: Function) {
		// 防止列表请求还未响应时重复请求 响应拦截器内删除
		if (this.debounceUrl == reqUrl && debounceData.indexOf(reqUrl) == -1) return;
		this.debounceUrl = reqUrl;
		let newParams = objKeySort(params)
		var p = [];
		for (let key in newParams) {
			p.push(`${key}=${newParams[key]}`);
		}
		var strParams = p.join('&');
		this.axiosInstance.get(reqUrl + '?' + strParams).then((response) => {
			if (response.data && response.data.code == 0) {
				if (cb) cb(response.data);
			} else {
				uni.showToast({
					title: response.data.msg,
					icon: 'none',
					duration: 2000
				});
			}
		}).catch((error: any) => {
			if (reqUrl == 'dataApi/home') {
				uni.showToast({
					title: '网络异常',
					icon: 'none'
				})
			}
			if (error.response && error.response.status > 500) {
				this.netError(() => {
					this.Get(reqUrl, params, cb, errorCb);
				});
			}

		});
	}

	netError(retryCb?: Function) {
		uni.showModal({
			title: '访问失败',
			content: '当前网络状况不佳，请检查网络环境后重试',
			showCancel: false,
			success: () => {
				// if (retryCb) retryCb();
			}
		});
	}
	setOpSign(config: any, msg: any, type?: any) {
		let str = ''
		if (config.data) {
			for (let i in config.data) {
				if (config.data[i] != undefined && typeof (config.data[i]) != 'object') {
					str += i + '=' + config.data[i] + '&'
				}
			}
			str = str.substring(0, str.lastIndexOf('&'));
			config.data.rawStr = app.opKey + '_' + str + '_' + msg
		} else {
			str = config.url.split('?')[1];
			config.url += '&rawStr=' + str + '_' + msg
		}
		if (type) {
			config.headers['opSign'] = Md5.hashStr(str + '_' + msg)
			return;
		} else {
			config.headers['opSign'] = Md5.hashStr(app.opKey + '_' + str + '_' + msg)
			return;
		}

	}
}
