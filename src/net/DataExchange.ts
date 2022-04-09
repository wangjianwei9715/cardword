// 首页列表类型 1:推荐 2:篮球 3:足球 4:其他
export var indexGoodsType:{[x:number]:any} = {
    1:'main',
    2:'basketball',
    3:'football',
    4:'othersport'
}

// 商品列表类型
export var goodsListType:{[x:string]:any} = {
    'guess':'活动专区',
    'cheap':'新手专区',
    'select':'自选球队',
    'progress':'即将拼成'
}

// 中文数字
export var chineseNumber = {
    1:'一',
    2:'二',
    3:'三',
    4:'四',
    5:'五',
    6:'六',
    7:'七',
    8:'八',
    9:'九',
    10:'十'
}

// 订单状态 //1 等待支付 2 进行中 3 等待发货 4 等待收货 5 收货成功  10 未中卡
export var orderState = {
    '1':'等待支付',
    '2':'进行中',
    '3':'等待发货',
    '4':'等待收货',
    '5':'收货成功',
    '10':'未中卡',
    '-1':'超时未支付'
}

// 订单状态说明 //1 等待支付 2 进行中 3 等待发货 4 等待收货 5 收货成功  10 未中卡
export function orderStateDesc(data:any) {
    switch(data.state){
        case 1:
            return 'xx:xx后订单关闭';
        case 2:
            return '拼团正在进行中';
        case 3:
            return '恭喜您，购得'+data.hitNum+'张卡片，等待商家发货';
        case 4:
            return '恭喜您，购得'+data.hitNum+'张卡片，商家已发货，请注意物流信息';
        case 5:
            return '恭喜您，获得'+data.hitNum+'张卡片，感谢您的信任与支持';
        case 10:
            return '很遗憾，您未中卡，感谢您的信任与支持';
        case -1:
            return '订单已关闭'
    }
}

// 订单商品状态  //0预售 1出售中, 2拼团成功, 3即奖直播 4直播中  5待上传 6待发货 7发货完成 -100 系统下架 -1未发布 -2拼团失败
export function orderGoodsStateStr(data:any) {
    switch(data.good.state){
        case 0:
            return '预售中';
        case 1:
            return '拼团中'+(data.good.lockNum+data.good.currentNum)+'/'+data.good.totalNum;
        case 2:
            return '拼团成功';
        case 3:
            return '即将直播';
        case 4:
            return '直播中';
        case 5:
            return '待上传拆卡报告';
        case -100:
            return '系统下架';
        case -1:
            return '未发布';
        case -2:
            return '拼团失败';
        default:
            return '拼团成功'
    }
}

// 订单设置底部按钮 //1 等待支付 2 进行中 3 等待发货 4 等待收货 5 收货成功  10 未中卡
export function orderSetOperate(data:any):{[x:string]:any} {
    switch(data.state){
        case 1:
            return [{cmd: "cancel", name: "取消支付"},{cmd: "toPay", name: "立即支付"}];
        case 2:
            if(data.good.state==1){
                return [{cmd: "giving", name: "赠送卡密"},{cmd: "drawCard", name: "卡密特效"},{cmd: "viewGood", name: "再来一单"}];
            }else{
                return [{cmd: "resultCard", name: "拆卡报告"},{cmd: "drawCard", name: "卡密特效"}];
            }
        case 4: case 5:
            return [{cmd: "resultCard", name: "拆卡报告"},{cmd: "drawCard", name: "卡密特效"},{cmd: "wuliu", name: "查看物流"}];
        case -1:
            return [{cmd: "viewGood", name: "查看详情"}];
        default:
            return [{cmd: "resultCard", name: "拆卡报告"},{cmd: "drawCard", name: "卡密特效"}];
    }
}
