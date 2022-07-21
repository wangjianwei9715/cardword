// 首页直播状态
export function getBroadCastStr(state:number){
     //1 即将拆卡 2 正在拆卡 3 拆卡回放 0 等待拆卡
    switch(state){
        case 2:
            return '正在拆卡';
        case 3:
            return '拆卡回放';
        default:
            return '即将拆卡'; 
    }
}

// 商品详情拼团形式
export function getGoodsPintuanDetail(state:number){
    // 拼团形式 1 随机卡种 2 随机球队 3 随机球员 4 随机卡包 5 随机卡盒    
    switch(state){
        case 1:
            return '随机卡种';
        case 2:
            return '随机球队';
        case 3:
            return '随机球员';
        case 4:
            return '随机卡盒'
        case 5:
            return '随机卡包'
        case 10:
            return '自选球队'   
        case 11:
            return '选队随机'
        case 12:
            return '自选卡种随机' 
    }
}
// 商品列表拼团形式
export function getGoodsPintuan(state:number){
    // 拼团形式 1 随机卡种 2 随机球队 3 随机球员 4 随机卡包 5 随机卡盒  10 自选买队 11 选队随机  
    switch(state){
        case 1:
            return '随机卡种';
        case 2:
            return '随机球队';
        case 3:
            return '随机球员';
        case 4:
            return '随机卡盒';
        case 5:
            return '随机卡包';
        case 10:
            return '自选球队';
        case 11:
            return '选队随机';
        case 12:
            return '自选卡种';
        default:
            return '';
    }
}
export function getGoodsPintuanSpe(state:number){
    // 拼团形式 1 随机卡种 2 随机球队 3 随机球员 4 随机卡包 5 随机卡盒    
    switch(state){
        case 1:
            return '../../static/goods/v2/spe_kaz.png';
        case 2:
            return '../../static/goods/v2/spe_qd.png';
        case 3:
            return '../../static/goods/v2/spe_qy.png';
        case 4:
            return '随机卡盒';
        case 5:
            return '随机卡包';
        case 10:
            return '../../static/goods/v2/spe_zx.png'
        case 11:
            return '../../static/goods/v2/spe_randomqd.png'
        case 12:
            return '../../static/goods/v2/spe_xkz.png'
    }
}
// 商品详情随机形式
export function getGoodsRandom(state:number){
    // 随机方式 1 即买即随 2 拼满随机 
    switch(state){
        case 1:
            return '即买即随';
        case 2:
            return '拼满随机';
    }
}
// 商品详情随机形式
export function getGoodsRandomSpe(state:number){
    // 随机方式 1 即买即随 2 拼满随机 
    switch(state){
        case 1:
            return '../../static/goods/v2/spe_jm.png';
        case 2:
            return '../../static/goods/v2/spe_zm.png';
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
        case 1:
            return {
                default:{id:1,name:'默认',odType:0},
                player:{id:2,name:'球员',odType:0},
                team:{id:3,name:'球队',odType:0},
                number:{id:4,name:'限编',odType:0},
                cardset:{id:5,name:'卡种',odType:0}
            }
        case 2:
            return {
                default:{id:1,name:'默认',odType:0},
                team:{id:3,name:'球队',odType:0}
            }
        case 3:
            return {
                default:{id:1,name:'默认',odType:0},
                player:{id:2,name:'球员',odType:0}
            }
        default:
            return [];
    }
}

//玩法switch
export function orderPlayDesc(state:any){
	switch (state) {
		case 0:
			return '随机卡种';
		case 1:
			return '自选球队';
		case 2:
			return '随机球员';
		case 3:
			return '随机球队';
		case 4:
			return '随机卡包';
		default:
			return '拼团方式'
	}
}
export function orderGoodsTypeDesc(state:any){
	switch (state) {
		case 0:
			return '即将发售';
		case 1:
			return '在售';
		case 2:
			return '已拼成';
		case 3:
			return '待拆卡';
		case 4:
			return '拆卡中';
		default:
			return '分类'
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
export function getCardRandomTitle(state:number){
    switch(state){
        case 11:
            return '选择球队';
        case 12:
            return '选择卡种';
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