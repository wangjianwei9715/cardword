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
			console.log(baseURL);
			// if (!app.localTest) 
		}
	}
	return new Promise((resolve, reject) => {
		const finUrl = isCustomUrl ? url : baseURL + url
		uni.request({
			url: finUrl,
			data: params,
			header: {
				token: app.token.accessToken
			},
			method: method.toUpperCase(),
			success: (res) => {
				if (res.data.code != 0) {
					const noneTips=['禁止登录']
					if(!noneTips.includes(res.data.msg)){
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
