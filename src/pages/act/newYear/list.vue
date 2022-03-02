<template>
	<view class="content">
        <view class="header">
            <view class="header-tab">
                <tabc :tabc="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
            </view>
        </view>
        

        <view class="box-content">
            <table class="rules-table" v-if="tabCheck==1">
                <thead>
                    <tr>
                        <td width="20%">福盒序号</td>
                        <td width="80%">福盒内容</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in fuheData" :key="index">
                        <td>
                            <view class="thead">{{index+1}}</view>
                        </td>
                        <td>
                            <view class="td-index" v-for="(items,indexs) in item.item" :key="indexs">{{items}}</view>
                        </td>
                    </tr>
                </tbody>
            </table>
            <view  class="td-index" style="text-align:center;padding:10rpx 0;">更多内容参考实物</view>
            <view class="pic-list" v-if="tabCheck==2">
                <image class="reward-pic" v-for="(item,index) in rewardList" :key="index" :src="item" @click="onClickPreviewImage(index)" />
            </view>
        </view>
       
        
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		tabCheck = 1;
		tabData = [
			{id:1,name:'福盒清单'},
			{id:2,name:'Hit一览'}
		];
        fuheData:any = [
            // 第一档
            {item:['16-17革命科比卡签']},
            {item:['noir约基奇新秀99编rpa']},
            {item:['2018-19 immaculate时刻签字 字母哥 49编']},
            {item:['泰坦字母哥新秀签字']},
            {item:['2018-19 帕尼尼 instant哈登 1编1签字']},
            {item:['immaculate麦迪镜面签字49编']},
            {item:['court kings字母哥最美油画签字75编GBTC9']},
            {item:['金书亚历山大Rpa']},
            {item:['2019-20 hoops premium锡安威廉森 新秀ink签字 折射 ']},
            {item:['immaculate奥尼尔IMM镜面签字25编sp']},
            {item:['noir韦德聚光灯签字']},
            {item:['2016-17 国宝肖像签字 林书豪 5编卡签 5/5']},
            {item:['noir杜兰特走秀签字']},
            {item:['SELECT布克 新秀卡签']},
            {item:['手提雷吉米勒 5编绿色首编']},
            {item:['皇冠东契奇49编蓝色切割新秀特卡']},
            {item:['2014-15小书麦迪 30编 云端签字']},
            {item:['Bowmam詹姆斯新秀 BaseGBTC9']},
            {item:['Bowmam詹姆斯新秀 BaseGBTC9']},
            {item:['immaculate罗德曼镜面签字49编']},
            {item:['巅峰伦纳德全透明塑料签字卡签']},
            {item:['immaculate雷吉米勒25编镜面卡签']},
            {item:['2018-19 手提箱塞克斯顿 RPA 横版 25编']},
            {item:['Op球票詹姆斯 MVP 奖杯红碎冰折Bgs9.5']},
            {item:['Op球票詹姆斯 MVP 奖杯蓝碎冰折Bgs9.5']},
            {item:['immaculate安东尼/伯纳德金双卡签 49编']},
            {item:['immaculate巴克利']},
            {item:['impeccable奥尼尔湖人队标签字15编（无平行SP签）']},
            {item:['OP威少爆金一编特卡']},
            {item:['SELECT沃特斯1编黑折RPA（tag)']},
            {item:['国宝安东尼戴维斯49编湖人球衣实物卡签']},
            {item:['皇冠科比怀特kaboom']},
            {item:['手提波尔津吉斯 Rpa 25编卡签']},
            {item:['2018-19 球票optic克莱汤普森 金折 10编']},
            {item:['IMM比尔 非奇  奥拉朱旺 双人签字']},
            {item:['2019-20 马赛克 库里 教堂特卡 sp']},
            {item:['2020-21 小真金活塞 格兰特希尔 背号签字 33编']},
            {item:['2013-14 immaculatepp大窗签字 森林狼 勒夫 10编']},
            {item:['2018-19 immaculate灰熊队 小贾伦杰克逊 新秀大窗实物 字母R 7编']},
            {item:['OP亚历山大新秀折射卡签']},
            {item:['2019-20 金书 韦德 实物签字 49编']},
            {item:['NOIR罗宾逊 影子签']},
            {item:['Noir拉文走秀']},
            {item:['2015-16 手提箱魔兽霍华德 生涯签字 10编']},
            {item:['2017-18 手提箱 罗德曼 签字 15编']},
            {item:['金砖吉诺比利 实物签字 18编sp']},
            {item:['noir奥拉朱旺40编patch卡签']},
            {item:['2020-21 select 詹姆斯 二级金波纹折射']},
            {item:['2019-20 编年史 锡安威廉森 红折新秀特卡 149编 bgs9.5金标']},
            {item:['prizm杰伦布朗 RC prizm']},
            {item:['instant 哈登 1/1']},
            {item:['2017-18 多米诺公牛 拉文 patch签字 卡签 25编']},
            {item:['2019-20 noir 塞布尔 聚光灯签字 125编']},
            {item:['noir恩比德99编rpa']},
            {item:['noir欧文走秀签字99编']},
            {item:['noir皮尔斯聚光灯凯子选图99编']},
            {item:['2015-16 杜蕾斯 约基奇 新秀签字']},
            {item:['2019 prizm 锡安威廉森 prizm正base psa10分']},
            {item:['2019-20 马赛克 字母哥 MVP特卡 20编折射']},
            {item:['prizm东契奇 9.5 ']},
            {item:['one and one 76人新秀 马克西 新秀球衣签字99编']},
            {item:['OP哈雷尔1编星云折']},
            {item:['皇冠特雷杨新秀特卡箱货']},
            {item:['2019-20 球票韦德 卡签 ']},
            {item:['2007-08 ud fleer乔丹 公牛实物切割 game-used']},
            {item:['2013-14 泰坦 背号编特卡 折射 哈登 1/13编']},
            {item:['2020-21 革命supernova银河折射 东契奇 超级大比例']},
            {item:['2017 革命塔图姆 astro新秀折射卡 psa10分']},
            {item:['2019 prizm 新秀烟花特卡 银折 锡安威廉森 PSA10分']},
            {item:['20-21 IMM斯图尔特 大Patch']},
            {item:['NOir波什 聚光灯']},
            {item:['NOir安东尼戴维斯49noir签字']},
            {item:['NOir雷阿伦 99签字']},
            {item:['国宝唐斯 1617国宝签']},
            {item:['Noir库里特雷杨铁窗']},
            {item:['OP杰伦布朗 OP 银折签 ']},
            {item:['prizm米切尔新秀银折']},
            {item:['2019 certified锡安威廉森 新秀base红色折射 psa10分']},
            {item:['prizm东契奇 rc']},
            {item:['Noir科比加索尔三窗球衣']},
            {item:['op杰伦布朗 OP  签 ']},
            {item:['Noir球哥鲍尔']},
            // 第二档 100元无门槛券
            {item:['2017-18 国宝国旗签字 威金斯 49编','100元无门槛券']},
            {item:['2020-21 国宝 爱德华兹 国宝 新秀三窗球衣 99编','100元无门槛券']},
            {item:['immaculate奥拉朱旺49编镜面卡签','100元无门槛券']},
            {item:['immaculate斯托克顿25编镜面卡签','100元无门槛券']},
            {item:['noir利拉德走秀签字99编','100元无门槛券']},
            {item:['金书贾森 威廉姆斯 79编镜面卡签无平行','100元无门槛券']},
            {item:['2018-19 光谱 韦德 记录签字 06年总决赛MVP 70编','100元无门槛券']},
            {item:['2015-16 immaculate镜面双签 斯马特/小托马斯 49编','100元无门槛券']},
            {item:['2018-19 国宝 特雷杨 新秀三窗球衣 99编 11/99同背号','100元无门槛券']},
            {item:['2019-20 马赛克 特雷杨 教堂特卡 SP','100元无门槛券']},
            {item:['2018-19 immaculatePP大窗签字 凯尔特人 海伍德 10编金版','100元无门槛券']},
            {item:['2017 prizm 多诺万米切尔 prizm 正base psa10分','100元无门槛券']},
            {item:['NOir米切尔 新秀25 编 bASE','100元无门槛券']},
            {item:['NOir福克斯  99签','100元无门槛券']},
            {item:['prizm布克RC  prizm','100元无门槛券']},
            {item:['2020-21 prizm 爱德华兹 新秀红碎冰折','100元无门槛券']},
            {item:['2019-20 国宝 皮尔斯 实物签字 卡签 25编','100元无门槛券']},
            {item:['2019-20 杜蕾斯 optic詹姆斯 myhouse 银折 PSA10分','100元无门槛券']},
            
        ]
		rewardList:any = [
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/1..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/2..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/3..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/4..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/5..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/6..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/7..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/8..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/9..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/10..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/11..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/12..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/13..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/14..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/15..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/16..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/17..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/19..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/20..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/21..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/22..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/23..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/24..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/25..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/26..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/27..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/28..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/29..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/30..jpg',
            'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/31..jpg',

		];

		onLoad(query:any) {
			
		}
		onShow(){
			
		}
        onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
		}
        // 观看大图
		onClickPreviewImage(index:number){
			uni.previewImage({
				urls: this.rewardList,
				current:index,
				indicator: "number" 
			});
		}
		

	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background: #F6F7F8
	}
    .header{
        width: 100%;
        position: fixed;
        left:0;
        top:0;
        z-index: 99;
    }
	.content{
        width: 100%;
        box-sizing: border-box;
    }
    .header-tab{
		width: 100%;
        background:#fff;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
        padding:0 100rpx;
	}
    .box-content{
        width: 100%;
        position: relative;
        z-index:10;
        box-sizing: border-box;
        padding:0 25rpx;
        padding-top: 110rpx;
    }
    .list-title{
        width: 100%;
        font-size: 36rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #5D5D5D;
        margin-bottom: 30rpx;
    }
    .list-title text{
        font-size: 30rpx;
    }
    .pic-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .reward-pic{
        width: 158rpx;
        height:221rpx;
        margin-bottom: 20rpx;
        margin-right: 22rpx;
    }
    .reward-pic:nth-child(4n){
        margin-right: 0;
    }
    .list-desc{
        font-size: 28rpx;
        color:#5D5D5D;
        font-family: MicrosoftYaHei;
        margin-bottom: 6rpx;
    }
    .rules-table{
		width: 100%;
		border-collapse: collapse;
        margin-top: -30rpx;
	}
    .rules-table thead tr td{
        text-align: center;
    }
	.rules-table tr td{
		height:90rpx;
		line-height: 90rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		border-bottom:1px solid #D6D6D6;
        box-sizing: border-box;
        padding:10rpx 0;
	}
    .thead{
        width: 100%;
        text-align: center;
    }
    .td-index{
        font-size: 26rpx;
        margin-bottom:10rpx
    }
</style>
