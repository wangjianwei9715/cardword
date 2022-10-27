export const nowTime = () => {
    return Math.round(new Date() / 1000)
}
export const goIndex=()=>{
    uni.switchTab({
        url:'/pages/index/index'
    })
}
export const $confirm = (content = "提示", title = "直播间提示", showCancel = true) => {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title,
            content,
            showCancel,
            success: ({ confirm, cancel }) => {
                if (confirm) {
                    resolve()
                    return
                }
                if (cancel) {
                    reject()
                }
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
export const $toast = {
    success: (message = "", mask = false) => {
        uni.showToast({
            title: message,
            icon: 'success',
            mask
        })
    },
    info: (message = "", mask = false) => {
        uni.showToast({
            title: message,
            icon: 'none',
            mask
        })
    },
}