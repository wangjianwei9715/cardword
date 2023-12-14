// 商品列表拼团形式
export function getGoodsPintuan(state:number,english=false){
    // 拼团形式 1 随机卡种 2 随机球队 3 随机球员 4 随机卡盒 5 随机卡包  10 自选买队 11 选队随机  
    switch(state){
        case 1:
            return `${english?'卡种玩法':'随机卡种'}`;
        case 2:
            return `${english?'球队玩法':'随机球队'}`;
        case 3:
            return `${english?'球员玩法':'随机球员'}`;
        case 4:
            return `${english?'卡盒玩法':'随机卡盒'}`;
        case 5:
            return `${english?'卡包玩法':'随机卡包'}`;
        case 10:
            return '自选球队';
        case 11:
            return `${english?'选队卡种':'选队随机'}`;
        case 12:
            return '自选卡种';
        default:
            return '';
    }
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
        case 6:
            return '拆卡结果审核中';
        case 7:
            return '待发货';
        case 8:
            return '发货完成';
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
                return [{cmd: "drawCard", name: "卡密特效"},{cmd: "resultCard", name: "拆卡报告"}];
            }
        case 4: case 5:
            return [{cmd: "drawCard", name: "卡密特效"},{cmd: "wuliu", name: "查看物流"},{cmd: "resultCard", name: "拆卡报告"}];
        case -1:
            return [{cmd: "viewGood", name: "查看详情"}];
        default:
            return [{cmd: "drawCard", name: "卡密特效"},{cmd: "resultCard", name: "拆卡报告"}];
    }
}

// 订单卡密类型排序 //拼团形式 1 随机卡种 2 随机球队 3 随机球员 4 随机卡盒 5 随机卡包 10 自选买队 11 选队随机
export function myCardGoodsType(state:any){
    switch(state){
        case 1: case 11:
            return {
                default:{id:1,name:'默认',odType:0},
                player:{id:2,name:'球员',odType:0},
                seq:{id:4,name:'限编',odType:0}
            }
        case 2:
            return {
                default:{id:1,name:'默认',odType:0}
            }
        case 3:
            return {
                default:{id:1,name:'默认',odType:0},
                player:{id:2,name:'球员',odType:0},
            }
        default:
            return [];
    }
}
// 自选随机说明
export function getCardRandomtips(state:number){
    // 随机方式 11 选队随机 12 选卡种随机 
    switch(state){
        case 11:
            return '选队随机：购买后将在所选球队的卡种中随机卡密';
        case 12:
            return '选卡种随机：购买后将在所选卡种中随机卡密';
    }
}
export function getCardRandomHelp(state:number){
    switch(state){
        case 11:
            return ['1.玩家可在选队页面选择心仪的球队进行购买，购买后将在所选球队的卡种中随机卡密','2.常规球队包含该球队最新队名下的全部单人卡种和同队的多人卡种；其他包含老球队下的卡种、不同队的多人卡种以及其他类型卡密','3.每个球队的份数与单价不一，请理性选择','4.剩余随机模式：剩余组数达到一定数量，且倒计时一定时间后开启剩余随机模式。进入此模式，玩家可选购剩余随机组，将在剩余的全部卡密中随机（单价=剩余卡密总价/剩余卡密总数），同时将关闭选队购买的选项','额外奖品：部分剩余随机模式中会投入额外奖品，每条卡密均有相同概率获得，获奖后将显示在对应卡密中，中奖者可联系客服领取奖品。'];
        case 12:
            return ['1、玩家可自由先择心仪的卡种类型进行购买，购买后将在所选卡种中随机卡密','2、每个卡种的份数与单价不一，请理性选择','3.剩余随机模式：剩余组数达到一定数量，且倒计时一定时间后开启剩余随机模式。进入此模式，玩家可选购剩余随机组，将在剩余的全部卡密中随机（单价=剩余卡密总价/剩余卡密总数），同时将关闭选队购买的选项','额外奖品：部分剩余随机模式中会投入额外奖品，每条卡密均有相同概率获得，获奖后将显示在对应卡密中，中奖者可联系客服领取奖品。'];
    }
}