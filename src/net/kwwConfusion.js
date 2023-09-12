
import { app } from '@/app';
import { Md5 } from 'ts-md5';
const kName = "kww";
const kYear = "2022"
const keywords = ['res_ksj', 'resources.ka-world.com','resources.social.ka-world.com'];
const httpPattern = /http:\/\/(.*?)\//;
export default class KwwConfusion{
    getTime(){
        return Math.floor(new Date().getTime()/1000);
    }
    guessYouLike(goodCode){
        const ts = this.getTime()
        return {
            ts,
            s:Md5.hashStr(`${kName}_goodrelative_sign_${goodCode}_${ts}_${kYear}`)
        }
    }
    calendar({tp,startDate,currentPage,pageSize}){
        const ts = this.getTime()
        return {
            ts,
            s:Md5.hashStr(`${kName}_calendar_${tp}_${startDate}_${currentPage}_${pageSize}_${ts}_${kYear}`)
        }
    }
    lenovo(searchTetxt){
        const ts = this.getTime()
        return {
            ts,
            sn:Md5.hashStr(`slenovo_${ts}_good_${searchTetxt}`)
        }
    }
    goodsSwiper(urlNamr,fetchFrom,fetchSize){
        const ts = this.getTime()
        return {
            ts,
            s:Md5.hashStr(`${kName}_goodlist_sign_${urlNamr}_${fetchFrom}_${fetchSize}_${ts}_${kYear}`)
        }
    }
    toPayForGoodOrder(userId,orderCode){
        const ts = this.getTime()
        return {
            ts,
            sn:Md5.hashStr(`ToPayForGoodOrder_${ts}_${userId}_${orderCode}`)
        }
    }
    findList(scrollIdSt,scrollId){
        return Md5.hashStr(`${scrollIdSt}${scrollId}scrollSearchGood`)
    }
    goodCard(scrollIdSt,scrollId){
        return Md5.hashStr(`${scrollIdSt}${scrollId}scrollSearchGood`)
    }
    confirmOrder(ts,snName,userId,goodCode){
        return Md5.hashStr(`${snName}_${ts}_${userId}_${goodCode}`)
    }
    illList(scrollId,st,ts){
        return Md5.hashStr(`${scrollId?st:ts}_${scrollId?`${scrollId}_`:''}scrollSearchTujian`)
    }
    kwwParsePic(src){
        if(keywords.every(x=> !src.includes(x))) return src;
        const httpUrl = src.includes('res_ksj') ? 'res.ka-world.com': httpPattern.exec(src)?.[1]
        const tsString = (Math.round(+new Date() / 1000)).toString(16).toUpperCase();
        const noneOrigin = src.replace(/^http:\/\/[^/]+/, "");
        const md5Key = Md5.hashStr(app.picEncryptionKey + noneOrigin + tsString);
        
        return `http://${httpUrl}/${md5Key}/${tsString}${noneOrigin}`
    }
}