/*
 * @FilePath: \jichao_app_2\src\pages\drawCard\utils\map.ts
 * @Author: wjw
 * @Date: 2023-04-13 14:39:11
 * @LastEditors: 
 * @LastEditTime: 2023-04-19 14:52:54
 * Copyright: 2023 .
 * @Descripttion: 
 */
const setpMap = {
    1:'team',
    2:'position',
    3:'rc'
}
const positionMap = {
    "控球后卫":"position_pg",
    "得分后卫":"position_sg",
    "小前锋":"position_sf",
    "大前锋":"position_pf",
    "中锋":"position_c",
    "前锋":"position_zq_w",
    "中场":"position_zq_m",
    "后卫":"position_zq_b",
    "门将":"position_zq_gk"
}
const teamMap = {
    "国王":"1",
    "凯尔特人":"2",
    "魔术":"3",
    "开拓者":"4",
    "独行侠":"5",
    "篮网":"6",
    "活塞":"7",
    "猛龙":"8",
    "掘金":"9",
    "太阳":"10",
    "雷霆":"11",
    "奇才":"12",
    "76人":"13",
    "骑士":"14",
    "勇士":"15",
    "快船":"16",
    "热火":"17",
    "湖人":"18",
    "雄鹿":"19",
    "灰熊":"20",
    "尼克斯":"21",
    "森林狼":"22",
    "黄蜂":"23",
    "鹈鹕":"24",
    "马刺":"25",
    "老鹰":"26",
    "火箭":"27",
    "爵士":"28",
    "步行者":"29",
    "公牛":"30"
}

export const map:any = {
    setpMap,
    positionMap,
    teamMap
}