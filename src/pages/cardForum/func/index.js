export function releaseByTopic(id) {
    uni.navigateTo({
        url: `/pages/cardForum/release?topicId=${id}`
    })
}
export function formatNumber(number, keepNum = 0, type = "cn") {//
    let result = '' + number;
    if (number >= 100000000) {
        result = (number / 100000000).toFixed(keepNum) + '亿'
    } else if (number >= 10000) {
        result = (number / 10000).toFixed(keepNum) + (type == "cn" ? '万' : 'w')
    }
    return result;
}

export const mockList = [{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'http://cdn.ka-world.com/admin/2023.06.25/template/0/1687677627931owaw5lh2t8.jpg' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'http://cdn.ka-world.com/admin/2023.06.26/goods/pintuan0/16877444345160g177cxxvv.jpeg' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'http://cdn.ka-world.com/admin/2023.06.26/goods/CL5842680/0/1687741972912rcg5fj6jr.jpg' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/2023.06.02/narticle/0/1685695514132vkqnegiq08.png' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/2023.02.22/narticle/0/1677040405260bb682jm0np.jpg' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/2022.10.26/narticle/0/1666765013856gr7mut3izc.jpg' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/images/seller/pintuan/1641519378736jhpa2j19gh.png' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/images/seller/pintuan/16415196284582jjy5sfnnk.png' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/images/seller/pintuan/1640856712466ieazib579.jpg' },
{ title: "这是表踢踢踢踢踢", desc: "描述描述还是输", cover: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/2023.02.22/narticle/16770400681038j7gxlupox.jpg' },]