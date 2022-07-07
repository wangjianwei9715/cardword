export class Message {
	static HeartBeat = '0x000001';
	// static Login = '0x000100';
	static LoginBroadCastRoom1001 = '0x000100'; //发送邓丽
	static RequestLike = '0x000200' //发送点赞
	static PageLocation = '0x000101';
	static LogoutBroadCastRoom1001 = '0x00010F' //离开房间
	static RequestSendChatMessage = '0x000208' // 发送聊天
	static RequestSendGift = "0x000203" // 送礼
	static RequestSendHongbao = "0x000204" // 送红包
	static RequestGrabHongbao = "0x000207" // 抢红包
	static RequestSendMerchantCoupon = "0x00020A" // 发送商家优惠券
	static RequestGetMerchantCoupon = "0x00020D" // 领取商家优惠券
	static RequestApplyLianmai = "0x0002A2"//申请连麦
	static RequestSwitchLianmaiAllow = "0x0002A0"//主播切换是否允许申请连麦
	static ActorRequestLianmaiData = "0x0002A5"//主播获取连麦列表
	static ActorAgreeLianmaiApply = "0x0002A6"//主播同意连麦
	static ActorTerminateLianmai = "0x0002A7"//主播结束连麦
	static SelfTerminateLianmai = "0x0002A8"//连麦者结束连麦
	static GmChatBid = "0x0002F1"//禁言
	static GmKickOutRoom = "0x0002F2"//踢出房间

	static cmd: {
		[x: string]: any
	} = {
			'0x000100': 'BackLoginBroadCastRoom1001', //登录回调
			// "0x000210":"BackLoginBroadCastRoom1001",
			'0x000101': 'UserAttr',
			'0x000102': 'Message',
			'0x000200': 'BackLike', //点赞发送回调
			"0x000201": "BroadCastLike", //广播点赞
			"0x000202": "BroadCastBilibili_Send", //广播礼物
			"0x000208": "BackSendChatMessage", //发送聊天返回 失败的时候才返回
			"0x000209": 'BroadCastChatMessage', //广播聊天
			"0x000203": "BackSendGift", //赠送礼物回调
			"0x000204": "BackSendHongbao", //发送红包回调
			"0x000205": "BroadCastHongbao", // 广播红包
			"0x000206": "BroadCastHongbaoUpdated",//广播红包状态改变
			"0x000207": "BackGrabHongbao",//抢红包回调
			"0x00020A": "BackSendMerchantCoupon",//发送优惠券回调
			"0x00020B": "BroadCastMerchantCoupon",//广播优惠券
			"0x00020D": "BackGetMerchantCoupon",//抢券回调
			"0x000103": "SendMyPoint",//卡币数量变化
			//--连麦
			"0x0002A0":"BroadCastLianmaiAllowed",// 广播是否可申请连麦
			"0x0002A1":"SendLianmaiApply",// 发送给主播有人申请连麦
			"0x0002A2":"BackApplyLianmai",//申请连麦回调
			"0x0002A3":"BroadCastLianmaiOn", //广播有人连麦了
			"0x0002A4":"BroadCastLianmaiOff",//广播连麦结束
			"0x0002A5":"BackActorLianmaiData", //返回主播连麦数据
			"0x0002A6":"BackActorAgreeLianmaiApply",//主播同意连麦的回调
			"0x0002A7":"BackTerminateLianmai" ,//主播结束连麦的回调
			"0x0002F1":"BackGmChatBid",//禁言的回调
			"0x0002F2":"BackGmKickOutRoom",//踢出房间的回调
			"0x00010F":"KickOut"
			// '0x000201': 'BucketInfo',
			// '0x000202': 'PushChatMessage', //推送聊天消息
			// '0x000203': 'BackSendMessage', //发送失败才发
			// '0x000300': 'PushGoodBidList', //推送商品竞价信息
		}

	static attrNameMapValue = {
		'name': 'strVal',
		'avatar': 'strVal',
		'bitVal': 'numberVal',
		'stone': 'numberVal',
		'money': 'numberVal',
		'tili': 'numberVal',
		'exp': 'numberVal',
		'lvl': 'numberVal',
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
		'year': 0,
		'brand': 1,
		'series': 2,
		'kind': 3,
		'appearance': 4
	}
	// 筛选分类
	static drawerTypeStr = {
		'basketball': 0,
		'football': 1,
		'TCG': 2,
		'tv': 3,
		'orther': 4
	}
	static drawerType = [
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
	static negotiationsState = {
		//0 创建 1 买家已报价 2 卖家已报价 3 卖家拒绝 4 买家撤回 5 卖家已同意 >=10 已关闭
		'create': 0,
		'buyerBid': 1,
		'sellerBid': 2,
		'sellerRefuse': 3,
		'buyerRecall': 4,
		'selletAgree': 5,
		'close': 10
	}
}
