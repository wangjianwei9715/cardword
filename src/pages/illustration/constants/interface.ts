export interface SeriesDetail {
    "code":Number,
    "followed": Boolean, //当前用户是否已关注此系列
    "main": { //data
        "name": string, //sport_type
        "year": string, //year
        "logo": string, //logo
        "backPic": string, //backPic
        "numLoaded": Number, 
        "numAll": Number, 
    },
    "search": { //data
        "cardSets": string, //显示后台翻译过的卡种，展示72小时内点击量最高的20条内容（含详细筛选），未翻译的卡种不显示
        "players": string, //该系列下筛选点击次数最多的前20个球员，展示72小时内点击量最高的20条内容
        "seqs": string //该系列下筛选点击次数最多的前20条限编，展示72小时内点击量最高的20条内容
    }
}