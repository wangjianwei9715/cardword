import HttpRequest from "../net/HttpRequest";
import * as Base64 from '../lib/base64';
var Crypto = require("crypto-js");
const uploadFileSize = 1024 * 1024 * 100; // 上传文件的大小限制100m
export default class ossUtils {
    osstoken:{[x: string]: any} = {};
    private static instance: ossUtils;

    private constructor() {
    }
    
	static getInstance(): ossUtils {
		if(!ossUtils.instance) {
			ossUtils.instance = new ossUtils();
		}
		return ossUtils.instance;
    }

    _getPolicy() {
        let policyText = {
            "expiration": new Date(this.osstoken.expire_at*1000).toJSON(), //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            "conditions": [
                ["content-length-range", 0, uploadFileSize] // 设置上传文件的大小限制
            ]
        };
        return Base64.encode(JSON.stringify(policyText))
    }
    _getSignature(message:string) {
        console.log(Crypto)
        let bytes = Crypto.HmacSHA1(message, this.osstoken.access_key_secret);
        return Crypto.enc.Base64.stringify(bytes);
    }
    _getSuffix(filename: string) {
        let pos = filename.lastIndexOf('.')
        let suffix = ''
        if (pos != -1) {
            suffix = filename.substring(pos);
        }
        return suffix;
    }
    getFileName(filename: any) {
        console.log('filename:', filename)
        return new Date().getTime() + Math.random().toString(36).substring(3, 20) + this._getSuffix(filename.name)
    }
    getImage(sourceType='album'):Promise<string> {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count: 1, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: [sourceType],
                success: (res) => {
                    resolve(res.tempFilePaths[0])
                },
                fail:(res:any)=>{
                    uni.showToast({
                        title:'请确认已打开相册权限',
                        icon:'none'
                    })
                }
            })
        });
    }
    getImages(count?:number):Promise<string | string[]> {
        return new Promise((resolve) => {
            uni.chooseImage({
                count:count ?? 9,
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'],
                success: (res) => {
                    resolve(res.tempFilePaths)
                },
                fail:(res:any)=>{
                    uni.showToast({
                        title:'请确认已打开相册权限',
                        icon:'none'
                    })
                }
            })
        });
    }
    getVideo(sourceType=['album']):Promise<string | string[]>{
        return new Promise((resolve,reject)=>{
            uni.chooseVideo({
                sourceType,
                compressed:true,
                success:(res:any)=>{
                    resolve(res.tempFilePath)
                },
                fail:(err)=>{
                    reject(err)
                }
            })
        })
    }
    getToken(type=''){
        if (!this.osstoken.expire_at || (new Date().getTime() / 1000) >= this.osstoken.expire_at) {
            return new Promise((resolve, reject) => {
                // const ossUrlPath = type=='social' ? 'social/' : '';
                HttpRequest.getIns().Get('dataApi/oss/token',{},async (res:any) =>{
                    this.osstoken = res.data;
                    resolve(res.data);
                })
            })
        }else{
            return this.osstoken;
        }
    }
    // 获取STS签名
    async getSTS(type='') {
        let token:any = await this.getToken(type);
        // 读取接口
        return new Promise((resolve, reject) => {
            let policy = this._getPolicy();
            let res = {
                accessId: token.access_key_id,
                host: token.host,  // 自己去申请
                policy:policy,
                signature: this._getSignature(policy),
                security_token:token.security_token
            };
            resolve(res)
        })

    }
    // private async getImagePath(){
    //     let imageSrc = await this.getImage(); // 选择图片
    //     let sign = await this.getSTS(); // 获取签名等信息
    //     let fileName = this.getFileName(imageSrc); // 自定义上传后的文件名称
    //     uni.showLoading({
    //         title: '上传图片中...'
    //     });
    //     return new Promise((resolve, reject) => {
    //         uni.uploadFile({
    //             url: 'https://oss-cn-hangzhou.aliyuncs.com',
    //             filePath: imageSrc,
    //             fileType: 'image',
    //             name: 'file',
    //             formData: {
    //                 name: imageSrc,
    //                 key: fileName,
    //                 policy: sign.policy,
    //                 OSSAccessKeyId: sign.access_key_id,
    //                 success_action_status: '200',
    //                 //让服务端返回200,不然，默认会返回204
    //                 signature: sign.signature,
    //             },
    //             success: (res:any) => {
    //                 uni.hideLoading();
    //                 console.log('uploadImage success, res is:', res)
    //                 if (res.statusCode == 200) {
    //                     resolve(res);
    //                 }
    //             },
    //             fail: (err) => {
    //                 uni.hideLoading();
    //                 console.log('uploadImage fail', err);
    //                 uni.showModal({
    //                     content: err.errMsg,
    //                     showCancel: false
    //                 });
    //                 reject(err);
    //             }
    //         });
    //     })
    // }
    // async uploadImg(){
    //     let result = await this.getImagePath();
    //     return result;
        
    // }
};