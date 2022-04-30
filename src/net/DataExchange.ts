// 首页tab列表
export var indexTabList = {
    tabTop:[
        {img:'../../static/index/v2/top_icon0.gif',text:'全部拼团',url:'/pages/goods/goods_find_list?classType=100'},
        {img:'../../static/index/v2/top_icon1.png',text:'发售日历',url:'/pages/act/calendar/list'},
        {img:'../../static/index/v2/top_icon2.png',text:'资讯公告',url:'/pages/information/list'},
        {img:'../../static/index/v2/top_icon3.png',text:'商家列表',url:'/pages/userinfo/merchant_list'}
    ],
    tabBottom:[
        {img:'../../static/index/v2/top_icon4.png',text:'活动专区',url:'/pages/goods/goods_assign_list?type=activity'},
        {img:'../../static/index/v2/top_icon5.png',text:'新手专区',url:'/pages/goods/goods_assign_list?type=cheap'},
        {img:'../../static/index/v2/top_icon6.png',text:'自选玩法',url:'/pages/goods/goods_assign_list?type=select'},
        {img:'../../static/index/v2/top_icon7.png',text:'即将拼成',url:'/pages/goods/goods_assign_list?type=progress'}
    ]
}
// 首页hot列表
export var indexHotList = {
    cardBean:{
        title:'卡币商城',
        tips:'卡币兑换好礼',
        list:[
            {pic:'../../static/index/v2/cardbean_pic.png'},
            {pic:'../../static/index/v2/cardbean_hb.png'}
        ]
    },
    hot:{
        title:'热门系列',
        tips:'新系列上市',
        list:[]
    },
    broadCast:{
        title:'拆卡围观',
        tips:'正在拆卡',
        list:[]
    }
}
// 首页goodTab
export var indexGoodTab = [
    {id:1,name:'推荐'},
    {id:2,name:'篮球'},
    {id:3,name:'足球'},
    {id:4,name:'其他'}
]
// 首页列表类型 1:推荐 2:篮球 3:足球 4:其他
export var indexGoodsType: { [x: number]: any } = {
    1: 'main',
    2: 'basketball',
    3: 'football',
    4: 'othersport'
}

// 商品列表类型
export var goodsListType: { [x: string]: any } = {
    'activity': '活动专区',
    'cheap': '新手专区',
    'select': '自选玩法',
    'progress': '即将拼成',
	'yifen':'一分上组'
}
// 状态
export var stateArray = [
    {
        name: "在售",
        value: 1
    },
    {
        name: "即将发售",
        value: 0
    },
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
        name: "随即卡包",
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


