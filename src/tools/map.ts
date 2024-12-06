/*
 * @FilePath: \jichao_app_2\src\tools\map.ts
 * @Author: wjw
 * @Date: 2023-04-13 14:39:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-15 11:21:14
 * Copyright: 2023 .
 * @Descripttion: 
 */
const _RefererMaps:{[x:string]:string} = {
    "index/index":"Home",
    "goods_sale":"Merchant",
    "merchant":"MerchantList",
    "calendar":"Calendar",
    "cardForum":"CardForum",
    "video":"Video",
    "animeTv":"AnimeTv",
    "assign":"Cheap",
    "progressRank":"ProgressRank",
    "find":"Find",
    "series":"Series",
    "order":"Order",
    "collect":"Collect",
    "coupon":"Coupon",
}
const _GoodsTips = {
    1:{
        text:"中卡",
        background:'linear-gradient(90deg, #FA1545 0%, #FA1545 20%, rgba(0, 0, 0, 0) 100%)'
    },
    2:{
        text:"车位",
        background:'linear-gradient(90deg, #F7B500 0%, #F7B500 20%, rgba(0, 0, 0, 0) 100%)'
    },
    3:{
        text:"附赠车位",
        background:'linear-gradient(90deg, #FA6400 0%, #FA6400 20%, rgba(0, 0, 0, 0) 100%)'
    },
    4:{
        text:"奖品",
        background:'linear-gradient(90deg, #50E7E7 0%, #50E7E7 20%, rgba(0, 0, 0, 0) 100%)'
    },
}
export const _Maps:any = {
    _RefererMaps,
    _GoodsTips
}