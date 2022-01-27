
//keepNum为保留小数位数，默认不保留小数
export function formatNumber(number: number, keepNum = 0) {//返回 xxx.xx亿
    let result = '' + number;
    if (number >= 100000000) {
        result = (number / 100000000).toFixed(keepNum) + '亿'
    } else if (number >= 10000) {
        result = (number / 10000).toFixed(keepNum) + '万'
    }
    return result;
}
export function formatGold(number: number, symbol = ',', interval = 3) {//返回 xxx,xxx,xxx
    let numberStr = '' + number;
    let result = '';
    let symbolIndex = 0;
    for (let index = numberStr.length-1; index >= 0; index--) {
        if (symbolIndex == interval) {
            result = symbol + result;
            symbolIndex = 0;
        }

        const num = numberStr[index];
        result = num + result;
        symbolIndex++;
    }
    return result;
}
// 时间戳
export function dateFormat(time:number|string){
    var date = new Date(Number(time)*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var sdate = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    // 拼接
    var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
    // var result =  month + "月" + sdate + "日 " + hour + ":" + minute //+ ":" + second
    // 返回
    return result;
}
// 时间戳 年月日时分
export function dateFormatYMSHM(time:number|string){
    var date = new Date(Number(time)*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var sdate = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    // 拼接
    var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute;
    // var result =  month + "月" + sdate + "日 " + hour + ":" + minute //+ ":" + second
    // 返回
    return result;
}
// 时间戳 月日时分秒
export function dateFormatMSHMS(time:number|string){
    var date = new Date(Number(time)*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var sdate = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    // 拼接
    var result =  month + "月" + sdate + "日 " + hour + ":" + minute ;
    // var result =  month + "月" + sdate + "日 " + hour + ":" + minute //+ ":" + second
    // 返回
    return result;
}
// 时间戳 年月日
export function dateFormatYMS(time:number|string){
    var date = new Date(Number(time)*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var sdate = ("0" + date.getDate()).slice(-2);
 
    // 拼接
    var result = year + "." + month + "." + sdate
   
    return result;
}
// 时间戳 月日
export function dateFormatMS(time:number|string){
    var date = new Date(Number(time)*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var sdate = ("0" + date.getDate()).slice(-2);
    // 拼接
    var result =  month + "-" + sdate
   
    return result;
}
// 时间换算
export function getCountDownTime(time:number){
    let day = String(Math.floor(time/3600/24));
    let hour=String(Math.floor((time-3600*24*Number(day))/3600));
    let minute=String(Math.floor((time-3600*24*Number(day)-3600*Number(hour))/60));
    let second=String(Math.floor((time-3600*24*Number(day)-3600*Number(hour))%60));
    if(Number(second)<10){second = '0'+second}
    return minute+':'+second

}
// 时间换算
export function getCountDownTimeHour(time:number){
    let day = String(Math.floor(time/3600/24));
    let hour=String(Math.floor((time-3600*24*Number(day))/3600));
    let minute=String(Math.floor((time-3600*24*Number(day)-3600*Number(hour))/60));
    let second=String(Math.floor((time-3600*24*Number(day)-3600*Number(hour))%60));
    if(Number(second)<10){second = '0'+second}
    return hour+':'+minute+':'+second

}
export function formatDateToMonth(time:number){
    let date = new Date(time);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return  month + "月" + day + "日"
}
export function formatDateToYear(time:number){
    let date = new Date(time);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return  year + "年" + month + "月" + day + "日"
}
export function formatDateToHour(time:number){
    let date = new Date(time);
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    return hour + ":" + minute;
}
export function formatFenToYuan(number: number) {//返回 xx.xx元
    let result = (number/100)+'元';
    return result;
}
export function formatJiaoToYuan(number: number) {//返回 xx.x元
    let result = (number/10)+'元';
    return result;
}

export function formatDay(value: any) {//返回 dd天hh:mm:ss
    let second = parseInt(value);// 秒
    let hoursTime = 0;
    let dayTime = 0;
    if (second > 3600) {
        hoursTime = Math.floor(second / 3600);
    }
    if (hoursTime > 24) {
        dayTime = Math.floor(hoursTime / 24);
        hoursTime = Math.floor(hoursTime % 24);
    }

    let result = formatMinute(value);
    result = (hoursTime >= 10 ? '' : '0') + hoursTime + ":" + result;
    if (dayTime > 0) {
        result = dayTime + '天' + result;
    }

    return result;
}
export function formatMinute(value: any) {//返回 mm:ss
    let secondTime = parseInt(value);// 秒
    let minuteTime = 0;// 分

    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = Math.floor(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = Math.floor(secondTime % 60);
    }
    if (minuteTime > 60) {
        minuteTime = Math.floor(minuteTime % 60);
    }

    let result = "";
    result = (secondTime >= 10 ? '' : '0') + secondTime;
    result = (minuteTime >= 10 ? '' : '0') + minuteTime + ":" + result;
    return result;
}

export function getStrByDay(num: number) {//返回 yyyy年mm月dd日
    let time = new Date(num);
    let month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1);
    let date = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
    let strTime = time.getFullYear() + '年' + month + '月' + date + '日';
    return strTime;
}
export function getStrDayNumber(num: number) {//返回 yyyy-mm-dd
    let time = new Date(num);
    let month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1);
    let date = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
    let strTime = ''+time.getFullYear() + '-' + month + '-' + date;
    return strTime;
}
export function getStrByMinutes(num: number) {//返回 hh:mm
    let time = new Date(num);
    let hours = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
    let minutes = (time.getMinutes() + 1) >= 10 ? (time.getMinutes() + 1) : '0' + (time.getMinutes() + 1);
    let strTime = hours + ':' + minutes;
    return strTime;
}
export function getGoodsImg(img:string){  //返回图片
	if(img.indexOf(',') == -1){
		 return img
	}else{
		let imgone = img.split(',')
        console.log(imgone[0])
		return imgone[0]
	}
}
export function strToUint8Array(string:string) {
    let pos = 0;
    const len = string.length;

    let at = 0;  // output position
    let tlen = Math.max(32, len + (len >> 1) + 7);  // 1.5x size
    let target = new Uint8Array((tlen >> 3) << 3);  // ... but at 8 byte offset

    while (pos < len) {
        let value = string.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff) {
            // high surrogate
            if (pos < len) {
                const extra = string.charCodeAt(pos);
                if ((extra & 0xfc00) === 0xdc00) {
                    ++pos;
                    value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                }
            }
            if (value >= 0xd800 && value <= 0xdbff) {
                continue;  // drop lone surrogate
            }
        }

        // expand the buffer if we couldn't write 4 bytes
        if (at + 4 > target.length) {
            tlen += 8;  // minimum extra
            tlen *= (1.0 + (pos / string.length) * 2);  // take 2x the remaining
            tlen = (tlen >> 3) << 3;  // 8 byte offset

            const update = new Uint8Array(tlen);
            update.set(target);
            target = update;
        }

        if ((value & 0xffffff80) === 0) {  // 1-byte
            target[at++] = value;  // ASCII
            continue;
        } else if ((value & 0xfffff800) === 0) {  // 2-byte
            target[at++] = ((value >> 6) & 0x1f) | 0xc0;
        } else if ((value & 0xffff0000) === 0) {  // 3-byte
            target[at++] = ((value >> 12) & 0x0f) | 0xe0;
            target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else if ((value & 0xffe00000) === 0) {  // 4-byte
            target[at++] = ((value >> 18) & 0x07) | 0xf0;
            target[at++] = ((value >> 12) & 0x3f) | 0x80;
            target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else {
            // FIXME: do we care
            continue;
        }

        target[at++] = (value & 0x3f) | 0x80;
    }

    return target.slice(0, at);
};
export function uint8ArrayToStr (arr:ArrayBuffer) {
    let unit8Arr = new Uint8Array(arr);
    let numArr = [];
    for (let index = 0; index < unit8Arr.length; index++) {
        const element = unit8Arr[index];
        numArr.push(element);
    }
    let encodedString = String.fromCharCode.apply(null, numArr);
    let decodedString = decodeURIComponent(escape((encodedString)));//没有这一步中文会乱码
    return decodedString;
};
export function swapArrayElement(arr:[{[x: string]: any}],index1:number,index2:number) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}
export function objKeySort(obj:any) {//排序的函数
    var newkey:any = Object.keys(obj).sort();
    var newObj:any = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}
