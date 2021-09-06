
export class Message {
    static HeartBeat = '0x000001';
    static Login = '0x000100';
    static PageLocation = '0x000101';

    static RequestChatOn = '0x000200'  //开启聊天监听
    static RequestChatOff = '0x000201'  //关闭聊天监听
    static SendChatMessage = '0x000202' //发送聊天
    static RequestBidOn = '0x000300'    //开启监听商品(goodCode)的竞价信息
    static RequestBidOff = '0x000301'   //关闭商品(goodCode)的竞价信息监听

    static cmd:{[x: string]: any} = {
        '0x000100': 'BackLogin',
        '0x000101': 'UserAttr',
        '0x000102': 'Message',

        '0x000201':'BucketInfo',
        '0x000202':'PushChatMessage',//推送聊天消息
        '0x000203':'BackSendMessage',//发送失败才发
        '0x000300':'PushGoodBidList',//推送商品竞价信息
    }

    static attrNameMapValue = {
        'name':'strVal',
        'avatar':'strVal',
        'bitVal':'numberVal',
        'stone':'numberVal',
        'money':'numberVal',
        'tili':'numberVal',
        'exp':'numberVal',
        'lvl':'numberVal',
    }
    // 筛选选项
    static chooseTree = [
        '年份',
        '发行商',
        '系列名',
        '卡片属性',
        '品相'
    ]
    // 筛选选项
    static chooseTreeStr = {
        'year':0,
        'brand':1,
        'series':2,
        'kind':3,
        'appearance':4
    }
    // 筛选分类
    static drawerTypeStr = {
        'basketball':0,
        'football':1,
        'TCG':2,
        'tv':3,
        'orther':4
    }
	static drawerType= [
	    '全部',
		'篮球',
		'足球',
		'TCG',
		'影视手绘',
		'其他卡类'
	]
    static goodState = {
        Started: 0,
        Finished: 1,
        Expired: 2
    }
	static negotiationsState ={
		//0 创建 1 买家已报价 2 卖家已报价 3 卖家拒绝 4 买家撤回 5 卖家已同意 >=10 已关闭
		'create':0,
		'buyerBid':1,
		'sellerBid':2,
		'sellerRefuse':3,
		'buyerRecall':4,
		'selletAgree':5,
		'close':10
	}
}