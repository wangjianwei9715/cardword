/*
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-10-13 10:13:22
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-05 17:26:04
 * @FilePath: \card-world\src\net\nuveRequest.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const app = getApp().globalData.app
const httpReg = /^http(s)?/
const request = (url, params = {}, method = 'GET') => {
	const isCustomUrl = httpReg.test(url) //是否传入完整的https/http链接
	let baseURL = app.bussinessApiDomain
	if (!isCustomUrl) {
		if (url.indexOf("dataApi/") != -1) {
			url = url.substring(8);
			if (!app.localTest) baseURL = app.dataApiDomain;
		}
		if (url.indexOf('funcApi/') != -1) {
			url = url.substring(8);
			baseURL = app.funcApiDomain || app.bussinessApiDomain;
		}
	}
	return new Promise((resolve, reject) => {
		const finUrl = isCustomUrl ? url : baseURL + url
		let header = {
			token: app.token.accessToken,
		}
		uni.request({
			url: finUrl,
			data: params,
			header,
			method: method.toUpperCase(),
			success: (res) => {
				if (res.data.code != 0) {
					const noneTips = ['禁止登录']
					
					// console.log(res);
					if ([1100,1101,1102,1103,1104].includes(res.data.code)) {
						uni.showModal({
							title: '信息无效',
							content: '登录信息无效，请重新登录',
							showCancel: false,
							success: (event) => {
								uni.$emit('reLogin',`return=true`);
							}
						});
						return
					}
					// if () {
					// 	uni.showModal({
					// 		title: '信息过期',
					// 		content: '登录状态已过期，点击 确定 自动刷新',
					// 		showCancel: false,
					// 		success: (event) => {
					// 			uni.$emit('refreshToken');
					// 		}
					// 	});
					// 	return
					// }
					if (!noneTips.includes(res.data.msg)) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
					reject(res.data.msg)
					return
				}
				resolve(res.data)
			},
			fail: (err) => {

				reject(err)
			}
		})
	})
}
export default request
