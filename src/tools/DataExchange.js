// 首页tab列表
export const indexMenu = {
    front:[
        {icon:'/static/index/tabs/1.png',needLogin:false,name:'全部拼团',url:'/pages/goods/goods_find_list?classType=100'},
        {icon:'/static/index/tabs/2.png',needLogin:false,name:'动漫专区',url:"/pages/goods/goods_animeTv",},
        {icon:'/static/index/tabs/3.png',needLogin:false,name:'玩家卡册',url:'/pages/information/list'},
        {icon:'/static/index/tabs/4.png',needLogin:false,name:'查卡价',url:'/pages/act/service/ref'},
        {icon:'/static/index/tabs/5.png',needLogin:true,name:'卡币商城',url:'/pages/mall/mallIndex'},
    ],
    back:[
        {icon:'/static/index/tabs/6.png',needLogin:true,name:'商家列表',url:'/pages/userinfo/merchant_listV2'},
        {icon:'/static/index/tabs/7.png',needLogin:true,name:'领券中心',url:"/pages/userinfo/coupon/coupon_get",},
        {icon:'/static/index/tabs/8.png',needLogin:true,name:'发售日历',url:'/pages/act/calendar/list'},
    ]
};
export const goodsTabs = [
    {
        name:'关注',
        id:1,
        url:'from_followed_merchant',
        badge: {
            isDot: false
        }
    },
    {name:'热门',id:2,url:'main'},
    {name:'篮球',id:3,url:'basketball'},
    {name:'足球',id:4,url:'football'},
    {name:'动漫影视',id:5,url:'animeTv'},
    {name:'综合体育',id:6,url:'zhty'},
    {name:'其他',id:7,url:'other'},
]
// 商品列表类型
export const goodsTypeTitle = {
    'activity': '活动专区',
    'cheap': '新手专区',
    'select': '自选玩法',
    'progress': '即将拼成',
	'yifen':'一分上组',
    'fresh':'最新上架'
}
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
    // {
    //     name: "已拼成",
    //     value: 2
    // }
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
export const chineseNumber = {
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
export const mallStateMap = {
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
export const mallStatusMap = {
    "0": "订单创建",
    "1": "等待支付",
    "2": "支付完成",
    "-1": "支付超时",
    "-2": "支付已取消",
    "-3":"已退款"
}
export const comment_reason_tp=[
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
export const MerchantLevel = {
    0:{level:'L1',name:'',icon:''},
    1:{level:'V1',name:'星耀商家',icon:'v1'},
    2:{level:'V2',name:'星耀商家',icon:'v1'},
    3:{level:'V3',name:'星耀商家',icon:'v1'},
    4:{level:'V4',name:'荣耀商家',icon:'v2'},
    5:{level:'V5',name:'荣耀商家',icon:'v2'},
    6:{level:'V6',name:'荣耀商家',icon:'v2'},
    7:{level:'V7',name:'荣耀商家',icon:'v2'},
}
export const phoneTypeArray = [
    '+86',
    '+852',
    '+853',
    '+886'
]
export const PhoneCodeType={
    LOGIN:'login',
    FORGET:"forget",
    SET_PWD:"setPwd",
    BIND_PHONE:"bind",
    CHANGE_BIND_PHONE:"changeBindPhone"
}