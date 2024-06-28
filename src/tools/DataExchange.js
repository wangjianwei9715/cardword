export const gameplayType = {
    1:{ name:"卡种随机", color:"#FA1545", progressLeft:"#FFBAC9", progressRight:"#FA1545" },
    2:{ name:"球队随机", color:"#1FDFCB", progressLeft:"#92FBFA", progressRight:"#0ACDB8" },
    3:{ name:"球员随机", color:"#ECBE32", progressLeft:"#FFF772", progressRight:"#E8B929" },
    4:{ name:"卡盒随机", color:"#FA1545", progressLeft:"#FFBAC9", progressRight:"#FA1545" },
    5:{ name:"卡包随机", color:"#FA1545", progressLeft:"#FFBAC9", progressRight:"#FA1545" },
    10:{ name:"球队自选", color:"#2A93FF", progressLeft:"#9AF2FF", progressRight:"#1F85EE" },
    11:{ name:"选队随机", color:"#692EFF", progressLeft:"#DDBBFF", progressRight:"#5E23F3" },
    12:{ name:"卡种自选", color:"#FA1545", progressLeft:"#FFBAC9", progressRight:"#FA1545" }
}
export const homeListBg = {
    1:{ src:"/static/index/v3/bg/bg_1.png",height:"454rpx" },
    2:{ src:"/static/index/v3/bg/bg_2.png",height:"288rpx" },
    3:{ src:"/static/index/v3/bg/bg_3.png",height:"288rpx"},
}
// 首页tab列表
export const indexMenu = [
    {icon:'/static/index/tabs/1.png',needLogin:false,name:'卡片排行',url:'/pages/goods/goods_find_list?classType=100'},
    {icon:'/static/index/tabs/2.png',needLogin:true,name:'发售日历',url:"/pages/act/calendar/list",},
    {icon:'/static/index/tabs/3.png',needLogin:true,name:'领劵中心',url:'/pages/userinfo/coupon/coupon_get'},
    {icon:'/static/index/tabs/4.png',needLogin:false,name:'查卡价',url:'/pages/act/service/ref'},
    {icon:'/static/index/tabs/5.png',needLogin:true,name:'店铺列表',url:'/pages/userinfo/merchant_listV2'},
]
export const goodsTabs = [
    {name:'推荐',id:0,url:'main'},
    {name:'篮球',id:1,url:'basketball'},
    {name:'足球',id:2,url:'football'},
    {name:'宝可梦',id:9,url:'animeTv'},
    {name:'综合体育',id:20,url:'zhty'},
    {name:'其他',id:100,url:'other'},
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