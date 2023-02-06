// #ifndef APP-NVUE
import { Md5 } from 'ts-md5'
import { app } from '@/app'
// #endif
/**
 * 图片特殊处理
 * @param src String 图片路径 
 * @returns String 图片路径
 */
export function parsePic(src: string) {
	if (!src) return ''
	if (src.indexOf('res_ksj') == -1 && src.indexOf('resources.ka-world.com') == -1) return src
	const httpUrl = src.indexOf('resources.ka-world.com') != -1 ? 'resources.ka-world.com' : 'res.ka-world.com'
	const tsString = (Math.round(+new Date() / 1000)).toString(16).toUpperCase();
	const noneOrigin = src.replace(/^http:\/\/[^/]+/, "");
	const md5Key = Md5.hashStr(app.picEncryptionKey + noneOrigin + tsString)
	return `http://${httpUrl}/${md5Key}/${tsString}${noneOrigin}`
}
/**
 * 数字处理 大于万/亿 调整为字符串
 * @param number  Number 需要处理的数字	
 * @param keepNum Number 保留N位小数
 * @returns String
 */
export function formatNumber(number: number, keepNum = 0) {//
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
	for (let index = numberStr.length - 1; index >= 0; index--) {
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

export function getUrlDataFN(urlStr:string) {
	// 定义一个空对象以储存数据
	const urlObj:any = {}
	// 检查url中是否携带数据
	if (urlStr.indexOf('?') === -1) return null
	// 找到 '?' 对应的下标
	const index = urlStr.indexOf('?') // index = 31
	// 截取 '?' 后的内容
	const dataStr = urlStr.substr(index + 1) // dataStr = a=1&b=2&c=&d=xxx&e
	// 通过 '&' 将字符串分割成数组
	const dataArr = dataStr.split('&') // ['a=1', 'b=2', 'c=', 'd=xxx', 'e']
	// 遍历字符串分割后的数组
	dataArr.forEach(str => {
		// 判断数组内的字符串是否有 '='
		if (str.indexOf('=') === -1) {
		// 如没有 '=' , 则将此字符串作为对象内键值对的键, 键值对的值为 undefined
		urlObj[str] = undefined // { e: undefined }
		} else {
		// 如果有 '='
		// 通过 '=' 将此字符串截取成两段字符串（不推荐使用 split 分割, 因为数据中可能携带多个 '=' ）
		const innerArrIndex = str.indexOf('=')
		const key = str.substring(0, innerArrIndex)
		const value = str.substr(innerArrIndex + 1)
		// 以截取后的两段字符串作为对象的键值对
		urlObj[key] = value // {a: '1', b: '2', c: '', d: 'xxx'}
		}
	})
	// 返回对象
	return urlObj
}
export function isDuringDate(beginDateStr: string, endDateStr: string) {
	var curDate = new Date(),
		beginDate = new Date(beginDateStr),
		endDate = new Date(endDateStr);
	if (curDate >= beginDate && curDate <= endDate) {
		return true;
	}
	return false;
}
// 时间戳
export function dateFormat(time: number | string) {
	var date = new Date(Number(time) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
export function dateFormatYMSHM(time: number | string) {
	var date = new Date(Number(time) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
export function dateFormatMSHMS(time: number | string,type?:string) {
	var date = new Date(Number(time) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var sdate = ("0" + date.getDate()).slice(-2);
	var hour = ("0" + date.getHours()).slice(-2);
	var minute = ("0" + date.getMinutes()).slice(-2);
	var second = ("0" + date.getSeconds()).slice(-2);
	// 拼接
	var result = month + "月" + sdate + "日 " + hour + ":" + minute;
	if(type) result=month + type + sdate + " " + hour + ":" + minute;
	// var result =  month + "月" + sdate + "日 " + hour + ":" + minute //+ ":" + second
	// 返回
	return result;
}
// 时间戳 月日时分秒
export function dateFormatMSHMSBD(time: number | string) {
	var date = new Date(Number(time) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var sdate = ("0" + date.getDate()).slice(-2);
	var hour = ("0" + date.getHours()).slice(-2);
	var minute = ("0" + date.getMinutes()).slice(-2);
	var second = ("0" + date.getSeconds()).slice(-2);
	// 拼接
	var result = hour + ":" + minute;
	// var result =  month + "月" + sdate + "日 " + hour + ":" + minute //+ ":" + second
	// 返回
	return result;
}

// 时间戳 年月日
export function dateFormatYMS(time: number | string) {
	var date = new Date(Number(time) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var sdate = ("0" + date.getDate()).slice(-2);

	// 拼接
	var result = year + "." + month + "." + sdate

	return result;
}
// 时间戳 月日
export function dateFormatMS(time: number | string,type?:string) {
	var date = new Date(Number(time) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var sdate = ("0" + date.getDate()).slice(-2);
	// 拼接
	var result = month + "-" + sdate
	if(type) result = month + type + sdate
	return result;
}
// 时间换算
export function getCountDownTime(time: number) {
	let day = String(Math.floor(time / 3600 / 24));
	let hour = String(Math.floor((time - 3600 * 24 * Number(day)) / 3600));
	let minute = String(Math.floor((time - 3600 * 24 * Number(day) - 3600 * Number(hour)) / 60));
	let second = String(Math.floor((time - 3600 * 24 * Number(day) - 3600 * Number(hour)) % 60));
	if (Number(second) < 10) { second = '0' + second }
	return minute + ':' + second

}
// 时间换算
export function getCountDownTimeHour(time: number) {
	let day = String(Math.floor(time / 3600 / 24));
	let hour = String(Math.floor((time - 3600 * 24 * Number(day)) / 3600));
	let minute = String(Math.floor((time - 3600 * 24 * Number(day) - 3600 * Number(hour)) / 60));
	let second = String(Math.floor((time - 3600 * 24 * Number(day) - 3600 * Number(hour)) % 60));
	if (Number(second) < 10) { second = '0' + second }
	return hour + ':' + minute + ':' + second

}
export function formatDateToMonth(time: number) {
	let date = new Date(time);
	let month = ("0" + (date.getMonth() + 1)).slice(-2);
	let day = ("0" + date.getDate()).slice(-2);
	return month + "月" + day + "日"
}
export function formatDateToYear(time: number) {
	let date = new Date(time);
	let year = date.getFullYear();
	let month = ("0" + (date.getMonth() + 1)).slice(-2);
	let day = ("0" + date.getDate()).slice(-2);
	return year + "年" + month + "月" + day + "日"
}
export function formatDateToHour(time: number) {
	let date = new Date(time);
	let hour = ("0" + date.getHours()).slice(-2);
	let minute = ("0" + date.getMinutes()).slice(-2);
	return hour + ":" + minute;
}
export function formatFenToYuan(number: number) {//返回 xx.xx元
	let result = (number / 100) + '元';
	return result;
}
export function formatJiaoToYuan(number: number) {//返回 xx.x元
	let result = (number / 10) + '元';
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
	let hoursTime = 0;

	if (secondTime >= 3600) {
		hoursTime = Math.floor(secondTime / 3600);
	}
	if (secondTime >= 60) {//如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = Math.floor(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = Math.floor(secondTime % 60);
	}
	if (minuteTime >= 60) {
		minuteTime = Math.floor(minuteTime % 60);
	}

	let result = "";
	result = (secondTime >= 10 ? '' : '0') + secondTime;
	result = (minuteTime >= 10 ? '' : '0') + minuteTime + ":" + result;
	if(hoursTime>0){
		result = (hoursTime >= 10 ? '' : '0') + hoursTime + ":" + result;
	}
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
	let strTime = '' + time.getFullYear() + '-' + month + '-' + date;
	return strTime;
}
export function getStrByMinutes(num: number) {//返回 hh:mm
	let time = new Date(num);
	let hours = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
	let minutes = (time.getMinutes() + 1) >= 10 ? (time.getMinutes() + 1) : '0' + (time.getMinutes() + 1);
	let strTime = hours + ':' + minutes;
	return strTime;
}
export function secondsFormat(seconds:number){
	const day = Math.floor(seconds / 3600 / 24);
	const daySurplus = seconds - (3600 * 24 * day)
	const hour = Math.floor((daySurplus) / 3600);
	const minute = Math.floor((daySurplus - 3600 * hour) / 60);
	const second = Math.floor((daySurplus - 3600 * hour) % 60);
	return {
		day,
		hour:hour<10?`0${hour}`:hour,
		minute:minute<10?`0${minute}`:minute,
		second:second<10?`0${second}`:second
	}
}
export function getGoodsImg(img: string) {  //返回图片
	if (img.indexOf(',') == -1) {
		return img
	} else {
		let imgone = img.split(',')
		return imgone[0]
	}
}
export function strToUint8Array(string: string) {
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
export function uint8ArrayToStr(arr: ArrayBuffer) {
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
export function swapArrayElement(arr: [{ [x: string]: any }], index1: number, index2: number) {
	arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	return arr;
}
export function objKeySort(obj: any) {//排序的函数
	var newkey: any = Object.keys(obj).sort();
	var newObj: any = {};
	for (var i = 0; i < newkey.length; i++) {
		newObj[newkey[i]] = obj[newkey[i]];
	}
	return newObj;
}
const formatNumberZero = (val: any) => {
	return val < 10 ? "0" + val : val
}
//倒计时
export function formatterCountDown(countDown: number) {
	let day = String(Math.floor(countDown / 3600 / 24));
	let day_num = countDown - 3600 * 24 * Number(day);
	let hour =
		Math.floor(day_num / 3600) < 10 ?
		"0" + Math.floor(day_num / 3600) :
		Math.floor(day_num / 3600);
	let minute =
		Math.floor((day_num - 3600 * Number(hour)) / 60) < 10 ?
		"0" + Math.floor((day_num - 3600 * Number(hour)) / 60) :
		Math.floor((day_num - 3600 * Number(hour)) / 60);
	let second =
		Math.floor((day_num - 3600 * Number(hour)) % 60) < 10 ?
		"0" + Math.floor((day_num - 3600 * Number(hour)) % 60) :
		Math.floor((day_num - 3600 * Number(hour)) % 60);
	return (
		(Number(day) > 0 ? day + "天 " : "") + hour + ":" + minute + ":" + second
	);
}
//倒计时
export function countDown(startDate: number, endDate: number = 0, mmbol: boolean = true) {
	if (!endDate) endDate = Math.round((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -
		1) / 1000)
	let times: any = new Date(endDate * 1000).getTime() - new Date(startDate * 1000).getTime();
	let ss: any = Math.floor(times / 1000) //毫秒转换为秒
	let dd = Math.floor(ss / (3600 * 24)); //秒转化为天
	ss %= 3600 * 24; //整除了天之后还剩下多少秒
	let hh = Math.floor(ss / 3600); //秒转化为小时
	hh = formatNumberZero(hh);
	ss %= 3600; //整除了小时后，还剩下多少秒
	let mm = Math.floor(ss / 60); //秒转化为分钟
	mm = formatNumberZero(mm); //如果秒显示小于10，前面加上个零
	ss %= 60; //整除了分之后，还剩下多少秒
	ss = formatNumberZero(ss);
	if (ss < 0) {
		return `00:00:00`
	}
	if (mmbol) {
		return `${hh}:${mm}:${ss}`
	} else {
		return dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
	}
}
//倒计时
export function liveCountDown(startDate: number, endDate: number = 0, mmbol: boolean = true) {
	if (!endDate) endDate = Math.round((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -
		1) / 1000)
	let times: any = new Date(endDate * 1000).getTime() - new Date(startDate * 1000).getTime();
	let ss: any = Math.floor(times / 1000) //毫秒转换为秒
	let dd = Math.floor(ss / (3600 * 24)); //秒转化为天
	ss %= 3600 * 24; //整除了天之后还剩下多少秒
	let hh = Math.floor(ss / 3600); //秒转化为小时
	// hh = formatNumberZero(hh);
	ss %= 3600; //整除了小时后，还剩下多少秒
	let mm = Math.floor(ss / 60); //秒转化为分钟
	// mm = formatNumberZero(mm); //如果秒显示小于10，前面加上个零
	ss %= 60; //整除了分之后，还剩下多少秒
	// ss = formatNumberZero(ss);
	if (ss < 0) {
		return `00:00:00`
	}
	return `${mm}:${ss}`
}
//倒计时 
export function liveCountDownV2(startDate: number, endDate: number = 0, mmbol: boolean = true) {
	if (!endDate) endDate = Math.round((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -
		1) / 1000)
	let times: any = new Date(endDate * 1000).getTime() - new Date(startDate * 1000).getTime();
	let ss: any = Math.floor(times / 1000) //毫秒转换为秒
	let dd = Math.floor(ss / (3600 * 24)); //秒转化为天
	ss %= 3600 * 24; //整除了天之后还剩下多少秒
	let hh = Math.floor(ss / 3600); //秒转化为小时
	// hh = formatNumberZero(hh);
	ss %= 3600; //整除了小时后，还剩下多少秒
	let mm = Math.floor(ss / 60); //秒转化为分钟
	// mm = formatNumberZero(mm); //如果秒显示小于10，前面加上个零
	ss %= 60; //整除了分之后，还剩下多少秒
	// ss = formatNumberZero(ss);
	if (ss < 0) {
		return `00:00:00`
	}
	if (mmbol) {
		return `${hh}:${mm}:${ss}`
	} else {
		const day = dd ? `${dd}天` : ''
		const hour = hh ? `${hh}小时` : ''
		const minute = mm ? `${mm}分钟` : ''
		const second = ss ? `${ss}秒` : ''
		return day + hour + minute + (!day && !hour && !minute ? second : '')
	}
}
export const weekDay = function (time: number, type?: number) {
	const weekNum: number = new Date(time*1000).getDay();
	const week: any = {
		0: '星期天',
		1: '星期一',
		2: '星期二',
		3: '星期三',
		4: '星期四',
		5: '星期五',
		6: '星期六'
	}
	let weekDay = week[weekNum]
	if (!weekDay) return '日期错误'
	if (type == 1) {
		weekDay = weekDay.replace(/星期/g, '周')
		weekDay = weekDay.replace(/天/g, '日')
	}
	return weekDay;
}
// 正则每3位数字添加逗号
export function toThousands(num = 0) {
	return num.toString().replace(/\d+/, function (n) {
		return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	});
};
//加法函数 用来得到精确的加法结果   
const add = (a: any, b: any) => {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch (f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;

}
//乘法函数，用来得到精确的乘法结果   
const mul = (a: any, b: any) => {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch (f) { }
	try {
		c += e.split(".")[1].length;
	} catch (f) { }
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//减法函数，用来得到精确的减法结果   
const sub = (a: any, b: any) => {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch (f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;

}
//除法函数，用来得到精确的除法结果   
const div = (a: any, b: any) => {
	var c, d, e = 0,
		f = 0;
	try {
		e = a.toString().split(".")[1].length;
	} catch (g) { }
	try {
		f = b.toString().split(".")[1].length;
	} catch (g) { }
	return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math
		.pow(10,
			f - e));
}
export const calculate = {
	add, mul, div, sub
}
