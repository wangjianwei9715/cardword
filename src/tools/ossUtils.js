import HttpRequest from "../net/HttpRequest";
import * as Base64 from '../lib/base64';
var Crypto = require("crypto-js");
const uploadFileSize = 1024 * 1024 * 100; // 上传文件的大小限制100m
export default class ossUtils {
    constructor() {
        this.osstoken = {};
    }
    static getInstance() {
        if (!ossUtils.instance) {
            ossUtils.instance = new ossUtils();
        }
        return ossUtils.instance;
    }
    _getPolicy() {
        let policyText = {
            "expiration": new Date(this.osstoken.expire_at * 1000).toJSON(),
            "conditions": [
                ["content-length-range", 0, uploadFileSize] // 设置上传文件的大小限制
            ]
        };
        return Base64.encode(JSON.stringify(policyText));
    }
    _getSignature(message) {
        console.log(Crypto);
        let bytes = Crypto.HmacSHA1(message, this.osstoken.access_key_secret);
        return Crypto.enc.Base64.stringify(bytes);
    }
    _getSuffix(filename) {
        let pos = filename.lastIndexOf('.');
        let suffix = '';
        if (pos != -1) {
            suffix = filename.substring(pos);
        }
        return suffix;
    }
    getFileName(filename) {
        console.log('filename:', filename);
        return new Date().getTime() + Math.random().toString(36).substring(3, 20) + this._getSuffix(filename);
    }
    getImage(sourceType = 'album') {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: [sourceType],
                success: (res) => {
                    resolve(res.tempFilePaths[0]);
                }
            });
        });
    }
    getImages() {
        return new Promise((resolve) => {
            uni.chooseImage({
                sizeType: ['original', 'compressed'],
                sourceType: ['album'],
                success: (res) => {
                    resolve(res.tempFilePaths);
                }
            });
        });
    }
    getToken() {
        if (!this.osstoken.expire_at || (new Date().getTime() / 1000) >= this.osstoken.expire_at) {
            return new Promise((resolve, reject) => {
                HttpRequest.getIns().Get('oss/token', {}, async (res) => {
                    this.osstoken = res.data;
                    resolve(res.data);
                });
            });
        }
        else {
            return this.osstoken;
        }
    }
    // 获取STS签名
    async getSTS() {
        let token = await this.getToken();
        // 读取接口
        return new Promise((resolve, reject) => {
            let policy = this._getPolicy();
            let res = {
                accessId: token.access_key_id,
                host: 'https://paimai-res.oss-cn-hangzhou.aliyuncs.com',
                policy: policy,
                signature: this._getSignature(policy),
                security_token: token.security_token
            };
            resolve(res);
        });
    }
}
;
//# sourceMappingURL=ossUtils.js.map