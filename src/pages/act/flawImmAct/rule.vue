<!--
 * @FilePath: \jichao_app_2\src\pages\act\flawImmAct\rule.vue
 * @Author: wjw
 * @Date: 2024-01-04 17:25:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-08 13:51:43
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
    <view class="content">
        <view class="title">活动说明：</view>
        <view class="desc">
            活动期间（2024.10.10~2024.11.10），获得指定球员卡密可解锁对应LOGOMAN活动卡片。共50名球员可解锁（50张卡片），每张卡片需解锁5个部位，解锁完成后可领取优惠券奖励（有效期30天），每张卡片集齐均可领取一次。</view>
        <view class="title">解锁卡片规则：</view>
        <view class="desc">获得指定球员卡密即可获得该球员卡片的解锁值，<text>获得时为待计入状态，拼团成功后累计至活动，若拼团失败则不增加</text>。</view>
        <view class="desc">每张卡片分别需要解锁背板/线条/签名/人物/LOGOMAN共5个部位，解锁值分别为5/20/45/100/230。</view>
        <view class="desc">解锁值增加规则如下：</view>
		<view class="desc">随机卡种、选队随机玩法获得解锁值x1倍</view>
		<view class="desc">随机球员玩法获得卡密解锁值x2倍</view>
		<view class="desc">随机球队玩法获得卡密解锁值x3倍</view>
		<view class="desc"><text>22-23手提、IMM系列解锁值额外x2倍</text></view>
		<view class="desc">例:张三在22-23手提系列随机球队玩法中随到詹姆斯卡密，获得9点詹姆斯LOGO卡片解锁值；李四在23-24hoops系列随机卡种玩法中随到詹姆斯卡密，获得1点詹姆斯LOGO卡片解锁值。</view>
		<view class="title">卡片清单与集齐奖励：</view>
		<table class="rules-table">
			<thead>
				<tr class="item-content">
					<td width="40%" class="table-title">球员名</td>
					<td width="60%">集齐奖励</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in awardTable" :key="index" >
					<td class="table-title">{{item.name}}</td>
					<td>{{item.award}}</td>
				</tr>
			</tbody>
		</table>
    </view>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
	awardTable = [
		{name:"勒布朗·詹姆斯",award:"100元平台无门槛券"}
	]
    onLoad(query: any) {
    }

}
</script>

<style lang="scss">
page {
    color: #333;
}

.content {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    display: block;
}

.title {
    font-weight: bold;
    font-size: 34rpx;
    margin-top: 30rpx;
    margin-bottom: 14rpx;
}

.desc {
    font-size: 26rpx;
    line-height: 46rpx;
	margin-bottom: 10rpx;
	text{
		color:#FA1545
	}
}
.rules-table{
	width: 100%;
	border-collapse: collapse;
}
.rules-table tr td{
	height:50rpx;
	line-height: 40rpx;
	font-size: 26rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333;
	text-align: center;
	padding:10rpx ;
	border:1rpx solid #e8e8e8
}
.item-content td{
	height:50rpx !important;
}
.table-title {
	background: #F0F0F2;
}
</style>
