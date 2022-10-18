// 首页tab列表
export var indexTabList = [
    {icon:'../../static/index/v3/icon1.png',name:'卡币商城',url:'/pages/mall/index'},
    {icon:'../../static/index/v3/icon2.png',name:'领券中心',url:'/pages/userinfo/coupon/coupon_get'},
    {icon:'../../static/index/v3/icon3.png',name:'资讯公告',url:'/pages/information/list'},
    {icon:'../../static/index/v3/icon4.png',name:'商家列表',url:'/pages/userinfo/merchant_listV2'},
    {icon:'../../static/index/v3/icon5.png',name:'全部拼团',url:'/pages/goods/goods_find_list?classType=100'}
]

// 首页hot列表
export var indexHotList = {
    progress:{
        title:'拼团进度榜',
        tips:'快速开拆',
        pic:'http://cdn.ka-world.com/admin/2022.10.05/goods/pintuan0/1664909622406h0bq65q4rt.jpg',
        url:'/pages/goods/goods_progressRank',
        bg:{
            src:'../../static/index/v3/index_f.png',
            width:'155rpx',
            height:'46rpx'
        },
        icon:{
            src:'../../static/index/v3/index_icon_f.png',
            width:'161rpx',
            height:'103rpx',
            top:'47rpx',
            right:'13rpx'
        }
    },
    fresh:{
        title:'最新上架',
        tips:'新车和预售',
        pic:'http://cdn.ka-world.com/admin/2022.10.05/goods/pintuan0/1664909622406h0bq65q4rt.jpg',
        url:'/pages/goods/goods_assign_list?type=fresh',
        bg:{
            src:'../../static/index/v3/index_n.png',
            width:'145rpx',
            height:'45rpx'
        },
        icon:{
            src:'',
            width:'139rpx',
            height:'80rpx',
            top:'44rpx',
            right:'16rpx'
        }
    },
    hot:{
        title:'新手体验',
        tips:'球星卡入门',
        pic:'http://cdn.ka-world.com/admin/2022.10.05/goods/pintuan0/1664909622406h0bq65q4rt.jpg',
        url:'/pages/goods/goods_assign_list?type=cheap',
        bg:{
            src:'../../static/index/v3/index_t.png',
            width:'120rpx',
            height:'45rpx'
        },
        icon:{
            src:'../../static/index/v3/index_icon_t.png',
            width:'146rpx',
            height:'106rpx',
            top:'35rpx',
            right:'16rpx'
        }
    },
    broadCast:{
        title:'拆卡围观',
        tips:'入门体验',
        list:[],
        bg:{
            src:'../../static/index/v3/index_b.png',
            width:'199rpx',
            height:'45rpx'
        },
        icon:{
            top:'23rpx',
            right:'29rpx'
        }
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


