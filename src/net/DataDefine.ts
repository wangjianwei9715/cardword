export namespace userinfo {
    export interface HomeData {
		"accountId":number,
        "userId": string,
        "name": string,
        "avatar": string,
        "sign":string,
        "money": number, //单位分
        "coupon": number, //优惠券
        "favorite": number, //收藏
        "history": number, //足迹
        "follows": number, //关注
        "fans": number, //粉丝
        "haoping":string,//"12%", //好评率
        "buyer": { //买家
            "toPay":number,//待支付 (自己去支付)
            "toDeliver":number,//待发货
            "toTake":number,//待收货
            "toAppraise":number,//待评价
            "bid":number,//我的竞拍
            "negotiate":number,//我的议价
            "level":0,//买家等级
            "title":"传奇",//买家称号
            "bought": 1, //已经购买成功的订单数量
        },
        "seller": { //卖家
            "toPay":number,//待支付 (买方要支付)
            "toDeliver":number,//待发货
            "toTake":number,//待收货
            "toAppraise":number,//待评价
            "toNegotiate":number,//待处理的议价数量
            "bid":number,//竞拍中的商品数量
            "negotiate":number,//议价中的商品数量
        },
		[propName: string]: any
	}
    export interface addressItem {
        "id":1,
        "default":true, //是否默认
        "name":"收货人名字",
        "phone": "手机号",
        "detail":"地址",
    }

    export interface deliveryData {
        "code": 0,
        "msg":"",
        "total":10,//总共有几条
        "list":addressItem[]
      }
}
export namespace msg{
    export interface bucketItem {
        "bucketId": 1,
        "goodCode": "113213213",//商品编号
        "target": {  //聊天对象
            "id": "188",
            "name": "刘德华",
            "avatar": "/pic/xxx.png | http(s)://xx.com/pic/xxx.png",  //带域名或者不带域名
        },
        "isMy": true,//是否我发送的
        "read": true, //别人发送的话自己是否已读
        "content": "聊天内容",
        [propName: string]: any
    }
    export interface bucketlist{
        "code": 0,
        "msg": "",
        "pageIndex": 1,
        "pageSize": 1,
        "total": 10,//总共有几条
        "totalPage": 10,//总共有几页(按pageSize)
        "list": bucketItem[]
    }
    export interface msgItem{
        "msgId":number,
        "isMy":boolean,//是否我发送的
        "read":boolean, //别人发送的话自己是否已读
        "sendTime": number, //发送此消息的时间戳
        picUrl?: (string|null),
        "content":string,
        [propName: string]: any
    }
    export interface bucketData {
        "code": 0,
        "msg": "",
        "bucketId": 1,
        "good": {
            "state": 0, //0出售中, 1已出售, 2已过期
            "code": "a083ab7d4edce184",
            "pic": "/pic/xxx.png | http(s)://xx.com/pic/xxx.png",  //带域名或者不带域名 多张用,隔开
            "title": "2021 PANINIZM 迈阿密 热火韦德base 2021 PANIZM 迈阿密 热火",
            "price": 550.00,
            "leftsec": "100", //倒计时秒数
        },
        "target": {
            "id": "188",
            "name": "刘德华",
            "avatar": "/pic/xxx.png | http(s)://xx.com/pic/xxx.png",  //带域名或者不带域名
        },
        msglist: msgItem[]
    }
    export interface msgDatas {
        "code": 0,
        "msg":"",
        "bucketId":1,
        "end":true,//是否已经取到最后一条
        msglist:msgItem[]
    }
}
export namespace index {
    interface recommendItem {
        "pic": "/pic/xxx.png | http(s)://xx.com/pic/xxx.png",  //带域名或者不带域名
        "title": "詹姆斯专场",
        "desc1": "", //描述文字
        "desc2": "", //描述文字
        "target": {  //目标地址 三选一
            "id": "a083ab7d4edce184", //  /api/v1/good/a083ab7d4edce184  获取商品详情（get)
            "page": "/pages/a/b", //跳转地址
            "url": "http://xx.com/a.html", //外部地址
        }
    }
    interface topAddItem {
        "pic": "/pic/xxx.png | http(s)://xx.com/pic/xxx.png",  //带域名或者不带域名
        "desc": "", //描述文字
        "target": {  //目标地址 三选一
            "id": "a083ab7d4edce184", //  /api/v1/good/a083ab7d4edce184  获取商品详情（get)
            "page": "/pages/a/b", //跳转地址
            "url": "http://xx.com/a.html", //外部地址
        }
    }
    interface goodItem {
        "tp": "100", // 100竞拍类 200 一口价（可议） 201 一口价（不可议）            
        "state": 0, //0出售中, 1已出售, 2已过期
        "pic": "/pic/xxx.png | http(s)://xx.com/pic/xxx.png",  //带域名或者不带域名 多张用,隔开
        "title": "2021 PANINIZM 迈阿密 热火韦德base 2021 PANIZM 迈阿密 热火",
        "price": "¥550.00",
        "leftsec": "100", //倒计时秒数
        "overAt": 1607033628, //结束时间戳
        "bid": "竞拍类=n个出价  一口价（可议）=n个议价 一口价（不可议）=n个收藏", //出价信息                
        "publisher": {  //发布者
            "name": "刘德华",
            "avatar": "/pic/xxx.png | http(s)://xx.com/pic/xxx.png",  //带域名或者不带域名
        },
        "target": {  //目标地址 三选一
            "id": "a083ab7d4edce184", //  /api/v1/good/a083ab7d4edce184  获取商品详情（get)
            "page": "/pages/a/b", //跳转地址
            "url": "http://xx.com/a.html", //外部地址
        }
    }
    export interface HomeData {
        "code": number,
        "msg": string,
        "timeStamp": 1607033628, //发送此数据的时间戳
        "topAdd": topAddItem[],
        "recommendList": recommendItem[],
        "goodList": goodItem[],
        [propName: string]: any
    }
}
export namespace wxShare {
    export interface shareData {
        "shareUrl":string,   //分享地址
        "title":string,      //分享标题
        "summary":string,    //分享内容
        "thumb":string       //分享缩略图
    }
}