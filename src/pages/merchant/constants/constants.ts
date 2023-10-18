export const maxAdHour = 72; //最大广告有效时长
export const maxMonthWeight = 5000; //最大月可兑积分
export const stateMap = {
    "notStart":0,
    "waitUpload":1,
    "waitReview":2,
    "inEffect":3,
    "finished":4,
}
export const payTypeMap = {
    "points":1,
    "money":2
}
export const mallTp = {
    "reality":1,
    "virtual":2
}
const mallRouter = "/pages/merchant/mall";
const custonRightIcon = {
    "背包": {
        emitAction: "onClickBackPack",
        icon: "/static/mall/order.png",
        icon_black: "/static/mall/order_black.png",
        text:"背包",
        style: {
            width: "29rpx",
            height: "34rpx",
        }
    },
    "积分规则": {
        emitAction: "onClickRule",
        icon: "/static/mall/order.png",
        icon_black: "/static/mall/order_black.png",
        text:"规则",
        style: {
            width: "29rpx",
            height: "34rpx",
        }
    }
}
const exchange = {
    goodTpOption:[
        { label: "全部", value: 100 },
        { label: "实物", value: 1 },
        { label: "虚拟商品", value: 2 },
    ],
    stateOption:[
        { label: "全部", value: 100 },
        { label: "已发放", value: 4 },
        { label: "待发货", value: 1 },
        { label: "已发货", value: 2 },
        { label: "已收货", value: 3 },
        { label: "待支付", value: -1 },
        { label: "支付超时", value: -2 },
        { label: "取消支付", value: -3 },
    ],
    stateMap:{
        "1":"待发货",
        "2":"已发货",
        "3":"已收货",
        "4":"已发放",
        "-1":"等待支付",
        "-2":'支付超时',
        "-3":"取消支付"
    }
}
const useLog = {
    tpOption:[
        { label: "全部", value: 100 },
        { label: "广告卡", value: 1 },
        { label: "权重卡", value: 2 },
    ],
    stateOption:[
        { label: "全部", value: 100 },
        { label: "生效中", value: 3 },
        { label: "已完成", value: 4 }
    ]
}

const integralSourceMap = {
    1:"商品兑换消耗",
    2:"管理员操作",
    3:"拼团完成"
}
const orderStateMap = {
    1:"待发货",
    2:"已发货",
    3:"已收货",
    4:"已发放"
}
const payStatusMap = {
    "1":"已支付",
    "-1":"等待支付",
    "-2":"超时",
    "-3":"取消支付",
    "-4":"支付失败"
}
const logStateMap = {
    "1":"待上传封面图",
    "2":"待审核",
    "3":"生效中",
    "4":"已完成",
    "-1":"封面图上传超时",
    "-2":'驳回'
}
const cardImg = {
    1:"/static/mall/card_ad.jpg",
    2:"/static/mall/card_w.jpg",
    3:"/static/mall/card_ad.jpg"
}
export const mall = {
    mallRouter,
    custonRightIcon,
    exchange,
    orderStateMap,
    payStatusMap,
    integralSourceMap,
    useLog,
    logStateMap,
    cardImg
}
export const mallPayChannel: any = [
    {
        android: true,
        channel: "alipay",
        channelId: 1702,
        ios: true,
        name: "支付宝支付",
    },
    {
        android: true,
        channel: "alipay_h5",
        channelId: 1704,
        ios: true,
        name: "支付宝H5支付",
    },
];
export const rule = [
    {
        title:"商家积分",
        list:[
            {content:"积分获取:平台入驻商家可通过在售商品拼团获取，拼团成功后根据商品销售额的5%获得相应的积分"},
            {content:"积分使用: 商家积分可在权益中心兑换平台提供的权益等。积分可累计，不会按月清零"}
        ]
    },
    {
        title:"权益中心",
        list:[
            {content:"提供给商家兑换一些日常会使用到到的权益，包括权重卡、广告位申请，商家也可以在权益中心补充物料"},
        ]
    },
    {
        title:"权重卡、广告位",
        list:[
            {content:"商家可在每月等级权益的基础上使用商家积分进行兑换，每月等级所获得的权重卡、广告申请按月重置，商家在权益中心兑换的权重卡、广告位可永久保留，可前往在售管理使用"},
            {title:"广告位说明：",content:"商家可在在售管理页面中申请【主页推广】或者是在在售商品中点击【广告推广】，可以查看当前是否有可申请的广告位并进行对应操作，点击使用后需要在倒计时结束前上传广告图进行审核，审核未通过则需要重新申请广告位，广告位生效期间可续费，单个广告位累计时长上限为72小时"},
            {title:"权重卡说明：",content:"权重卡每月兑换上限为5000权重分（计算累计兑换的权重分，并非商家积分)"},
        ]
    },
    {
        time:"积分统计开始时间：2023/10/1 0:00"
    }
]
export const payExplain = [
    '1、请确认您购买的产品信息，并在正确填写您的收货地址信息后进行订单支付;',
    '2、订单提交前，若您有信息需要修改，请在订单确认页面直接修改，订单提交后，订单信息将无法修改',
    '3、提请注意:除卡具等周边产品外， 卡世界平台兑换类所售相关产品，因其产品属性及价值的特殊性，不适用“七天无理由退换“之规定，均不支持无理由退换货;',
    '4、提请注意:如果您是末满18周岁的未成年人，请在监护人的陪同、指导下购买本产品。已满18周岁的成年人，因任何原因不具备完全民事行为能力的，参照适用本协议之未成年人使用条款之相关约定购买本产品。我们可能会依照平台用户协议，在您支付之前要求您上传一些相关信息，我们会对您的信息保密，请您理解并支持',
    '5、上述信息确认后，您可以点击“继续支付”进入支付环节，订单支付完成后页面会显示您的订单号。提交订单表示您已经阅读并接受了商城的“使用条款”、“隐私政策”及“退換货政策”',
    '6、由于在线销售存在库存更新网络延时的情况，可能会导致您完成订单支付后订单商品已被兑换完提示缺货的情况。如遇该类情况，售后人员会及时通知您，为您进行退款。给您造成的不便，还请谅解',
    '7、兑换成功后，平台将在7个工作日内进行发货；收货地址为用户默认收货地址，兑换前请核实收货地址，若要修改收货地址请在兑换后24小时内联系客服进行修改。',
    '8、商户发货后，如用户未在以下时限内手动确认收货，系统会自动确认收货。①物流发货地址在中国大陆地区:14天;②物流发货地址非中国大陆地区:30天。'
]