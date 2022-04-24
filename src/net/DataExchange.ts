// 微信小程序首页商品
export var goodsMiniList = [
    {
        currentNum:0,
        discount: "",
        goodCode: "GT4228482",
        lockNum: 0,
        overAt: 0,
        pic: "../../static/index/mp_mini_good.jpg",
        price: 99999,
        startAt: 0,
        title: "20-21 篮球 Panini National Treasures  Hobby  原箱",
        totalNum: 1

    }
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


