export class Message {
}
Message.HeartBeat = '0x000001';
Message.Login = '0x000100';
Message.PageLocation = '0x000101';
Message.RequestChatOn = '0x000200'; //开启聊天监听
Message.RequestChatOff = '0x000201'; //关闭聊天监听
Message.SendChatMessage = '0x000202'; //发送聊天
Message.RequestBidOn = '0x000300'; //开启监听商品(goodCode)的竞价信息
Message.RequestBidOff = '0x000301'; //关闭商品(goodCode)的竞价信息监听
Message.cmd = {
    '0x000100': 'BackLogin',
    '0x000101': 'UserAttr',
    '0x000102': 'Message',
    '0x000201': 'BucketInfo',
    '0x000202': 'PushChatMessage',
    '0x000203': 'BackSendMessage',
    '0x000300': 'PushGoodBidList',
};
Message.attrNameMapValue = {
    'name': 'strVal',
    'avatar': 'strVal',
    'bitVal': 'numberVal',
    'stone': 'numberVal',
    'money': 'numberVal',
    'tili': 'numberVal',
    'exp': 'numberVal',
    'lvl': 'numberVal',
};
// 筛选选项
Message.chooseTree = [
    '年份',
    '发行商',
    '系列名',
    '卡片属性',
    '品相'
];
// 筛选选项
Message.chooseTreeStr = {
    'year': 0,
    'brand': 1,
    'series': 2,
    'kind': 3,
    'appearance': 4
};
// 筛选分类
Message.drawerTypeStr = {
    'basketball': 0,
    'football': 1,
    'TCG': 2,
    'tv': 3,
    'orther': 4
};
Message.drawerType = [
    '全部',
    '篮球',
    '足球',
    'TCG',
    '影视手绘',
    '其他卡类'
];
Message.goodState = {
    Started: 0,
    Finished: 1,
    Expired: 2
};
Message.negotiationsState = {
    //0 创建 1 买家已报价 2 卖家已报价 3 卖家拒绝 4 买家撤回 5 卖家已同意 >=10 已关闭
    'create': 0,
    'buyerBid': 1,
    'sellerBid': 2,
    'sellerRefuse': 3,
    'buyerRecall': 4,
    'selletAgree': 5,
    'close': 10
};
//# sourceMappingURL=NetDefine.js.map