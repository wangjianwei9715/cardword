import { app } from '@/app';
import { Md5 } from 'ts-md5';
export default class HttpOpsign{
    debounceData = ['dataApi/point/exchange/goodlist', 'dataApi/selectRank/award/list','dataApi/cardCircle/list']
    headersData = [
        {url:'me/certify"',name:'Content-Type',msg:'application/x-www-form-urlencoded'}, 
        {url:'advice/upload_advice',name:'Content-Type',msg:'multipart/form-data'}
    ];
    opSignData = [
        {url:'search/ebay',sign:'searchSecret',needOpKey:false}, 
        // {url:'good/topay/',sign:'payGoodCode',needOpKey:true}, 
        // {url:'order/topay/',sign:'payGoodOrder',needOpKey:true},
        {url:'activity/invite/requestKey',sign:'inviteKey',needOpKey:true},
        {url:'activity/invite/getKey',sign:'inviteGetKey',needOpKey:true},
        {url:'user/login/wechat/app',sign:'wechat',needOpKey:false},
        {url:'user/login/apple',sign:'apple',needOpKey:false},
        {url:'search/good',sign:'searchSecret',needOpKey:false},
        {url:'cardCircle/search/dt',sign:'searchSecret',needOpKey:false},
        {url:'cardCircle/search/user',sign:'searchSecret',needOpKey:false}
    ]
    opSignOtherData = [
        {url:'user/code',name:'短信验证码'},
        {url:'me/order/buyer/receive_good',name:'确认收货'},
        {url:'user/bindPushIdentifier',name:'绑定Push'},
        {url:'sendMessage',name:'客服发送消息'},
    ]
    opSignMap = { 
        '短信验证码': (config) => Md5.hashStr(`opk_smscode_${config.data.phone}_${config.data.type}`),
        '确认收货': (config) => Md5.hashStr(`opk_${app.opKey}_receive_good_${config.data.code}`), 
        '绑定Push': (config) => Md5.hashStr(`opk_${app.opKey}_${plus.push.getClientInfo().clientid}`), 
        '客服发送消息': (config) => Md5.hashStr(`opk_${app.opKey}_${config.data.bucketId}_${config.data.picUrl || ''}_${config.data.content || ''} `)
    };
    getOpSign(config, sign, needOpKey) { 
        let params = {
            opSign:"",
            rawStr:"",
        }
		let str = ''; 
		if (config.data) {
			for (let i in config.data) {
				if (config.data[i] !== undefined && typeof(config.data[i]) !== 'object') { 
					str += `${i}=${config.data[i]}&`; 
				} 
			} 
			str = str.slice(0, -1); 
			params.rawStr = `${app.opKey}_${str}_${sign}`; 
		} else {
			str = config.url.split('?')[1]; 
		} 
		const opSign = needOpKey ? `${app.opKey}_${str}_${sign}` : `${decodeURIComponent(str)}_${sign}`; 
		params.opSign = Md5.hashStr(opSign); 
		return params; 
	}
}