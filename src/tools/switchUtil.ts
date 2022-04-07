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
            return '随机卡盒'
        case 5:
            return '随机卡包'    
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
