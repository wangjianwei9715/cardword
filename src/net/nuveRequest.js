const request = (url, params = {}, method = 'GET') => {
	const isTest = true
	const requestUrl = isTest ? 'http://192.168.8.79:8701/api/v2/' : 'https://server.ssl1.ka-world.com/api/v2/'
	return new Promise((resolve, reject) => {
		const httpReg = /^http(s)?/
		const finUrl = httpReg.test(url) ? url : requestUrl + url
		console.log(finUrl);
		uni.request({
			url: finUrl,
			data: params,
			header: {
				token: uni.getStorageSync('token') && JSON.parse(uni.getStorageSync('token'))
					.accessToken
			},
			method: method.toUpperCase(),
			success: (res) => {
				if (res.data.code != 0) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
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
