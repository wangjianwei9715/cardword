// 首页tab列表
export var indexSwiperFront = [
    {icon:'../../static/index/v3/icon5.png',needLogin:false,name:'全部拼团',url:'/pages/goods/goods_find_list?classType=100'},
    {icon:'../../static/index/v3/icon2.png',needLogin:false,name:'动漫专区',url:"/pages/goods/goods_animeTv",},
    {icon:'../../static/index/v3/icon3.png',needLogin:false,name:'玩家卡册',url:'/pages/information/list'},
    {icon:'../../static/index/v3/icon4.png',needLogin:false,name:'查卡价',url:'/pages/act/service/ref'},
    {icon:'../../static/index/v3/icon1.png',needLogin:true,name:'卡币商城',url:'/pages/mall/mallIndex'},
]
// 首页tab列表
export var indexSwiperBack = [
    {icon:'../../static/index/v3/icon5.png',needLogin:true,name:'商家列表',url:'/pages/userinfo/merchant_listV2'},
    {icon:'../../static/index/v3/icon2.png',needLogin:true,name:'领券中心',url:"/pages/userinfo/coupon/coupon_get",},
    {icon:'../../static/index/v3/icon3.png',needLogin:true,name:'发售日历',url:'/pages/act/calendar/list'},
]
export const goodsTabs = [
    {name:'关注',id:1,url:'from_followed_merchant'},
    {name:'热门',id:2,url:'main'},
    {name:'篮球',id:3,url:'basketball'},
    {name:'足球',id:4,url:'football'},
    {name:'动漫影视',id:5,url:'animeTv'},
    {name:'综合体育',id:6,url:'zhty'},
    {name:'其他',id:7,url:'other'},
]
// 商品列表类型
export var goodsListType: { [x: string]: any } = {
    'activity': '活动专区',
    'cheap': '新手专区',
    'select': '自选玩法',
    'progress': '即将拼成',
	'yifen':'一分上组',
    'fresh':'最新上架'
}
/**
 * @goodDetailSpe   商品详情 规格类型
 * @spec            拼团规格
 * @pintuan_type    拼团形式
 * @random_type     随机方式
 * @spec_str        查看卡密
 *  @value ｛number｝ id   id标识
 *  @value ｛string｝ name 内容
 *  @value ｛string｝ desc 描述
 *  @value ｛string｝ icon 图标
 */
export var goodDetailSpe: {
    [x: string]: any
} = {
    spec:{id:3,name:'',desc:'规格'},
    num:{id:4,name:'',desc:'卡片数量'},
    pintuan_type:{id:1,name:'',desc:'玩法'},
    random_type:{id:2,name:'',desc:'随机形式'}
};
// 状态
export var stateArray = [
    {
        name: "在售",
        value: 1
    },
    // {
    //     name: "即将发售",
    //     value: 0
    // },
    {
        name: "已拼成",
        value: 2
    }
]
//玩法
export var palyArray = [
    {
        name: "随机卡种",
        value: 1
    },
    {
        name: "自选球队",
        value: 10
    },
    {
        name: "选队随机",
        value: 11
    },
    {
        name: "随机球员",
        value: 3
    },
    {
        name: "随机球队",
        value: 2
    },
    {
        name: "随机卡包",
        value: 5
    }
]
// 中文数字
export var chineseNumber = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十'
}

// 订单状态 //1 等待支付 2 进行中 3 等待发货 4 等待收货 5 收货成功  10 未中卡
export var orderState = {
    '1': '等待支付',
    '2': '进行中',
    '3': '等待发货',
    '4': '等待收货',
    '5': '收货成功',
    '10': '未中卡',
    '-1': '超时未支付'
}
export const mallStateMap: any = {
    "0": {
        tip: "已发放",
        introduction: '',
        userTip: '已完成'
    },
    "1": {
        tip: "等待平台发货",
        introduction: '平台将陆续发货，请耐心等待请留意物流信息',
        userTip: '待发货'
    },
    "2": {
        tip: "平台已发货",
        introduction: '平台已发货，请留意物流信息',
        userTip: '待收货'
    },
    "3": {
        tip: "用户确认收货",
        userTip: '已完成'
    },
    "-1": {
        tip: "等待支付完成"
    },
    "-2":{
        tip: "奖品发放失败",
        userTip: '奖品发放失败'
    }
}
export const mallStatusMap: any = {
    "0": "订单创建",
    "1": "等待支付",
    "2": "支付完成",
    "-1": "支付超时",
    "-2": "支付已取消",
    "-3":"已退款"
}
export const comment_reason_tp:any=[
    {
        label:"站外导流",
        value:1
    },
    {
        label:"违法违规",
        value:2
    },
    {
        label:"色情低俗",
        value:3
    },
    {
        label:"广告",
        value:4
    },
    {
        label:"不友善、引战",
        value:5
    },
    {
        label:"时政不实信息",
        value:6
    },
    {
        label:"涉未成年人",
        value:7
    },
    {
        label:"内容不相关",
        value:8
    },
    {
        label:"其他",
        value:100
    }
]

