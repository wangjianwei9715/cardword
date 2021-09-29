//订单详情状态
export function getOrderDetailState(state:number){
    switch(state){
        case 1:
            return '拼团中：商品拼团中xxx/xxx';
        case 2:
            return '待直播：等待商品直播';
        case 3:
            return '直播中：商品正在直播';
        case 4:
            return '订单已完成，未购得卡片'
    }
}
// 商品详情拼团形式
export function getGoodsPintuan(state:number){
    // 拼团形式 1 随机卡种 2 随机球队 3 随机球员 4 随机卡包 5 随机卡盒    
    switch(state){
        case 1:
            return '随机卡种';
        case 2:
            return '随机球队';
        case 3:
            return '随机球员';
        case 4:
            return '随机卡包'
        case 5:
            return '随机卡盒'    
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
