
import { app } from '@/app';
import { Md5 } from 'ts-md5';
const kName = "kww";
const kYear = "2022"
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
    goodsResultList(goodCode,fromId){
        const ts = this.getTime()
        return {
            ts,
            sn:Md5.hashStr(`cardNo_${goodCode}_${fromId}_${ts}`)
        }
    }
    goodsDetail(goodCode){
        const ts = this.getTime();
        console.log(`${kName}_good_${goodCode}_${ts}_2023`)
        return {
            ts,
            s:Md5.hashStr(`${kName}_good_${goodCode}_${ts}_2023`)
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
}