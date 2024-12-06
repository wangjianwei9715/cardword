import ossUtils from '@/tools/ossUtils'
export default class Upload {
    instance: any = Upload;
    ossutils: any = ossUtils.getInstance();
    osstoken: any = {}
    private static instance: Upload;
    static getInstance(): Upload {
        if (!Upload.instance) {
            Upload.instance = new Upload()
        }
        return Upload.instance
    }
    uploadFile(file: any, sign: any, fileDir = "", type = "images") {
        return new Promise((resolve, reject) => {
            const fileList = file.tempFilePaths;
            let arr: any = []
            for (let i = 0; i < fileList.length; i++) {
                const fileName = type + "/app/" + fileDir + this.ossutils.getFileName(file.tempFiles[i]); // 自定义上传后的文件名称
                const formData:any={
                    name: fileList[i],
                    key: fileName,
                    policy: sign.policy,
                    OSSAccessKeyId: sign.accessId,
                    success_action_status: '200',
                    //让服务端返回200,不然，默认会返回204
                    signature: sign.signature,
                    "x-oss-security-token": sign.security_token
                }
                //设置一下最大字节数（video）
                if(type=='video'){
                    formData["content-length-range"]=`["content-length-range", 1, ${300*1024*1024}]`
                }
                const uploadTask = uni.uploadFile({
                    url: sign.host,
                    filePath: fileList[i],
                    timeout: 5 * 60 * 60 * 1000,
                    name: 'file',
                    formData,
                    success: (res) => {
                        uni.hideLoading();
                        if (res.statusCode == 200) {
                            let imgSrc = sign.host + "/" + fileName;
                            arr.push(encodeURIComponent(imgSrc))
                            if (arr.length == fileList.length) resolve(arr);
                        } else {
                            reject("上传失败");
                        }
                    },
                    fail: (err) => {
                        uni.hideLoading();
                        uni.showModal({
                            content: err.errMsg,
                            showCancel: false
                        });
                        reject(err);
                    }
                });
                if (type == "video") {
                    uploadTask.onProgressUpdate((call: any) => {
                        uni.$u.throttle(() => {
                            uni.$emit("videoProgress", call)
                        }, 1000)

                    })
                }
            }
        })
    }
    getImages(count = 1, fileDir: string, sourceType = ['album']) {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: sourceType,
                count,
                success: (res) => {
                    resolve(res)
                },
                fail: (err) => {
                    if (err.errMsg.includes("cancel") || err.errMsg.includes("用户取消")) {
                        reject('取消上传')
                    }
                    if (err.errMsg.includes("No Permission")) {
                        reject("没有权限,请开启相应app权限")
                    }
                    reject(err.errMsg)
                }
            })
        });
    }
    getName(filePath: string | any) {
        return filePath.substring(filePath.lastIndexOf('/') + 1);
    }
    async upLoadImagePath(...params: any) {
        try {
            //@ts-ignore
            const fileRes: any = await this.getImages(...params); // 选择图片
            const sign = await this.ossutils.getSTS(params[3] || ''); // 获取签名等信息
            uni.showLoading({
                title: '上传图片中...'
            });
            // #ifdef APP-PLUS
            fileRes.tempFilePaths.forEach((path: any, index: number) => {
                fileRes.tempFiles[index].name = this.getName(path)
            });
            // #endif
            const imgUrls = await this.uploadFile(fileRes, sign, params[1])
            return imgUrls
        } catch (err) {
            //@ts-ignore
            if ((err.message || err) == '取消上传') return
            uni.showToast({
                //@ts-ignore
                title: err.message || err,
                icon: 'none'
            })
        }
    }
    async upLoadVideoPath(fileDir = "") {
        try {
            let res: any = await uni.chooseVideo({
                sourceType: ["album"],
            })
            res = res.filter(Boolean)
            if (res[0].errMsg == "chooseVideo:fail cancel") throw new Error("取消")
            const sign = await this.ossutils.getSTS('social'); // 获取签名等信息
            uni.showLoading({
                title: '上传中...'
            });
            let path: any
            // #ifdef APP-PLUS
            path = await this.uploadFile({
                tempFilePaths: [res[0].tempFilePath],
                tempFiles: [{ name: this.getName(res[0].tempFilePath) }]
            }, sign, fileDir, "video")
            // #endif
            // #ifdef H5
            path = await this.uploadFile({
                ...res[0],
                tempFilePaths: [res[0].tempFilePath],
                tempFiles: [res[0].tempFile]
            }, sign, fileDir, "video")
            // #endif
            uni.hideLoading()
            return {
                path: path[0],
                size: res[0].size,
                duration: res[0].duration
            }
        } catch (err) {
            uni.hideLoading()
            //@ts-ignore
            throw new Error(err.message)
        }
    }
    async uploadTempFile(path: string, fileDir: string, type = "images", fileName?: string) {
        // fileName h5下使用
        try {
            console.log("需要上传的path", path);
            const sign = await this.ossutils.getSTS('social'); // 获取签名等信息
            const res: any = await this.uploadFile({
                tempFilePaths: [path],
                tempFiles: [{ name: fileName }]
            }, sign, fileDir, type)
            return res[0]
        } catch (err) {
            //@ts-ignore
            throw new Error(err.message || err)
        }
    }
    async uploadTemporaryFile(filePath: string, oldFile: string) {
        try {
            const sign = await this.ossutils.getSTS('social'); // 获取签名等信息
            uni.showLoading({ title: '上传图片中...' });
            const fileArr = oldFile.split('/');
            const fileRes = {
                tempFilePaths: [filePath],
                tempFiles: [{ name: `temporary${fileArr[fileArr.length - 1]}` }]
            }
            const imgUrls = await this.uploadFile(fileRes, sign, 'social/TemporaryFile')
            return imgUrls
        } catch (err) {
            //@ts-ignore
            throw new Error(err.message)
        }
    }
    async getVideoTempFile() {
        let res: any = await uni.chooseVideo({
            sourceType: ["album"],
        })
        res = res.filter(Boolean)
        return res[0]
    }
    async uploadImgs(count: number, fileDir: string, sourceType = ['album']) {
        const result = await this.upLoadImagePath(count, fileDir, sourceType);
        return result;
    }
    async uploadSocialImgs(count: number, fileDir: string, sourceType = ['album']) {
        const result = await this.upLoadImagePath(count, 'social/' + fileDir, sourceType, 'social');
        return result;
    }
    async uploadVideo(fileDir = "") {
        const result = await this.upLoadVideoPath(fileDir);
        return result;
    }
}