export const CardForumTagMap = {
    FOLLOW: {
        name: "关注",
        tag: "follow",
        url: 'cardCircle/list/me/follow',
        badge: {
            show: true,
            isDot: true,
            bgColor: "rgba(255, 0, 61,0)"
        }
    },
    ALL: {
        name: "推荐",
        tag: "all",
        roll: true
    },
    SHOW: {
        name: "SHOW卡",
        tag: "show"
    },
    //  VIDEO:{
    //     name: '视频',
    //     tag: 'video'
    // }, 
    COLUMN: {
        name: "专题",
        tag: "sc",
    },
    // SWAP:{
    //     name: '交流',
    //     tag: 'swap'
    // }, 
    ALBUM: {
        name: "卡册",
        tag: "album",
        roll: true
    },
    BASKET: {
        name: "篮球",
        tag: "basket",
        roll: true
    },
    FOOT: {
        name: "足球",
        tag: "foot"
    },
    ANIME_TV: {
        name: "动漫影视",
        tag: "animeTv"
    },
    REST: {
        name: "其他",
        tag: "rest"
    }
}
export const CardForumTabbar = [
    {
        text: '首页',
        pagePath: "/pages/index/index",
        iconPath: "/static/index/tabbar/1_.png"
    },
    {
        text: '图鉴',
        pagePath: "/pages/illustration/index",
        iconPath: "/static/index/tabbar/2_.png"
    },
    {
        text: '卡圈',
        pagePath: "/pages/cardForum/home",
        iconPath: "/static/index/tabbar/3.png"
    },
    {
        text: '消息',
        pagePath: "/pages/index/message",
        iconPath: "/static/index/tabbar/4_.png"
    },
    {
        text: '我的',
        pagePath: "/pages/index/userinfo_v3",
        iconPath: "/static/index/tabbar/5_.png"
    }
]
export const ActionsList = [
    {
        name: "动态",
        url: "/pages/cardForum/release",
        fontWeight: 600
    }, {
        name: "卡册",
        subname: "适用于凑套，需图片与卡种对应上传。",
        url: "/pages/illustration/seriesSelect?&album=true",
        fontWeight: 600
    }
]
//文章类型
export const ArticleTpMap = {
    CardForum: 1,
    Video: 2,
    Album: 3,
    HitCard: 4,
    Column: 5
}
//bit类型
export const BitMap = {
    IS_PERSON: 1,
    IS_FOLLOW: 2,
    IS_LIKE: 4,
    IS_COLLECT: 8
}