<!--
 * @FilePath: \jichao_app_2\src\pages\merchant\dyBroadcast.vue
 * @Author: wjw
 * @Date: 2022-12-16 16:23:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-19 10:57:15
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
    <view v-if="hasBroadCast" class="dy-content" style="width: 100%;">
        <navigationbar title="边播边拆" :custom="true">
			<template slot="right">
				<view class="nav-right-btn" @click="onClickRecord()">历史记录</view>
			</template>
		</navigationbar>

        <view class="dy-container">
            <view class="dy-box">
                <view class="header">
                    <view class="header-title" @click="showExplain=true">直播时间<view class="icon-help"></view></view>
                    <view class="header-right" :style="stateData.stateStyle">{{stateData.stateName}}</view>
                </view>
                <view class="line" @click="onClickAt('start')">
                    <view class="line-title">开始时间</view>
                    <view class="line-right">{{broadCast.start_at||"00:00"}}<view class="icon-right"></view></view>
                    
                </view>
                <view class="line" @click="onClickAt('end')">
                    <view class="line-title">结束时间</view>
                    <view class="line-right">{{broadCast.end_at||"00:00"}}<view class="icon-right"></view></view>
                </view>
            </view>

            <u-datetime-picker :show.sync="startShow" v-model="startTime" mode="datetime" @confirm="onConFirmStart" @cancel="startShow=false"></u-datetime-picker>
            <u-datetime-picker :show="overShow" v-model="overTime" mode="datetime" @confirm="onConFirmOver" @cancel="overShow=false"></u-datetime-picker>

            <view class="dy-box">
                <view class="header">
                    <view class="header-title">直播链接</view>
                    <view class="header-right" :style="stateData.linkStyle" @click="onClickLink">{{stateData.linkName}}</view>
                </view>
                <view class="dy-input">
                    <u--input v-if="notPass" class="link-text" style="height:40rpx" border="surround" v-model="broadCast.link"></u--input>
                    <view v-else class="link-text">{{broadCast.link}}</view>
                </view>
            </view>

            <view class="dy-box" v-if="inLiveBroadcast">
                <view class="header" style="margin-bottom:24rpx">
                    <view class="header-title">当前在售</view>
                    <view class="header-right" :style="{color:'#E02020'}" @click="onClickDragable">{{dragable?"完成":"管理"}}</view>
                </view>
                <dragSorts ref="dragSorts" :list="list" :dragable="dragable" :rowHeight="210" :listHeight="listHeight" @confirm="onConfirmDrag">
                    <template v-slot:listIndex="slotProps">
                        <view class="good-container">
                            <muqian-lazyLoad v-if="slotProps.data.goodPic!=''" class="good-container-pic" :src="decodeURIComponent(slotProps.data.goodPic)" borderRadius="5rpx"></muqian-lazyLoad>
                            <view class="good-container-info">
                                <view class="good-container-title u-line-2">{{slotProps.data.title}}</view>
                                <view class="good-container-price">
                                    ￥
                                    <text class="text-price">{{ filterPrice(slotProps.data.price).integer }}</text>
                                    <text class="decimal" v-if="filterPrice(slotProps.data.price).decimal">{{ filterPrice(slotProps.data.price).decimal }}</text>
                                </view>
                            </view>
                        </view>
                    </template>
                </dragSorts>	
            </view>
            
            <view class="bottom-btn">
                <view class="dy-btn" :style="stateData.btnStyle" @click="onClickBtn()">{{stateData.btnName}}</view>
            </view>
        </view>

        <u-popup :show="showExplain" mode="center" :safeAreaInsetBottom="false" @close="showExplain=false">
            <view class="popup-content">
                <view class="popup-title">{{popupData.title}}</view>
                <view class="popup-text">{{popupData.text}}</view>
                <view class="btn-box">
                    <view class="btn" @click="showExplain=false">取消</view>
                    <view class="btn con-btn" @click="onClickPopupConfirm()">确认</view>
                </view>
            </view>
		</u-popup>
    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { dateFormatYMSHMS, filterPrice } from "@/tools/util";
    class BroadCast {
        start_at = 0;
        end_at = 0;
        link = ""
    }
    const stateMap = {
        '-100':{
            stateName:"待提交",
            stateStyle:{
                color:'#E02020'
            },
            btnName:"提交审核",
            btnStyle:{},
            linkName:"清空",
            linkStyle:{
                color:'#0091FF'
            }
        },
        '-1':{
            stateName:"审核驳回",
            stateStyle:{
                color:'#E02020'
            },
            btnName:"重新提交",
            btnStyle:{},
            linkName:"清空",
            linkStyle:{
                color:'#0091FF'
            }
        },
        0:{
            stateName:"审核中",
            stateStyle:{
                color:'#F7B500'
            },
            btnName:"审核中",
            btnStyle:{
                color:'#ffffff',
                background:'#AEAEB2'
            },
            linkName:"",
            linkStyle:{}
        },
        1:{
            stateName:"直播中",
            stateStyle:{
                color:'#6DD400'
            },
            btnName:"手动下播",
            btnStyle:{},
            linkName:"复制",
            linkStyle:{
                color:'#E02020'
            }
        }
    }
    @Component({})
    export default class ClassName extends BaseNode {
        goodsManaager = app.goods;
		filterPrice = filterPrice;
        broadCastState = {};
        broadCast = new BroadCast();
        list = [];
        startShow = false;
        startTime = Number(new Date());
        overShow = false;
        overTime = Number(new Date());
        showExplain = false;
        back = false;
        dragable = false;
        dragList = [];
        onLoad(query: any) {
            this.initEvent()
        }
        refresh(){
        }
        onBackPress(event:any){
            const { start_at, end_at, link } = this.broadCast
			if(this.notPass&&(start_at || end_at || link!="")){
                this.back = true;
                this.showExplain = true
                return true
            }
			return
		}

        
        public get hasBroadCast() : boolean {
            return !uni.$u.test.isEmpty(this.broadCastState)
        }
        public get stateData() : any {
            return stateMap[this.broadCastState.state]
        }
        public get popupData() : any {
            const { back } = this;
            return {
                title: back ? '未提交' : '说明',
                text: back ? '当前申请未提交，确认返回后填写内容将清空' : '商家在填写直播时间段以及抖音直播链接后，提交审核，审核通过后app内将显示为直播状态，并推送至首页边播边拆板块，用户可通过直播链接进入观看直播'
            }
        }
        public get listHeight() : number {
            return Math.floor(this.list.length * uni.upx2px(210))
        }
        public get inLiveBroadcast() : boolean {
            return this.broadCastState.state==1
        }
        public get notPass() : boolean {
            return [-1,-100].includes(this.broadCastState.state)
        }

        onClickRecord(){
            uni.navigateTo({url:"/pages/merchant/dyBroadcast_record"})
        }
        onClickAt(type){
            if(!this.notPass) return;
            
            (type == 'start') && (this.startShow=true);
            (type == 'end') && (this.overShow=true);
        }
        onConFirmStart(e){
            this.broadCast.start_at = dateFormatYMSHMS(e.value/1000);
            this.startShow = false
        }
        onConFirmOver(e){
            this.broadCast.end_at = dateFormatYMSHMS(e.value/1000);
            this.overShow = false
        }
        onClickPopupConfirm(){
            if(this.back){
                this.broadCast = new BroadCast();
                uni.navigateBack({ delta:1 })
            }
            this.showExplain = false;
        }
        onClickLink(){
            if(this.notPass){
                this.broadCast.link=''
            }else{
                uni.setClipboardData({
                    data:this.broadCast.link,
                    showToast:false,
                    success: ()=> {
                        uni.showToast({
                            title:'复制成功',
                            icon:'none'
                        })
                    }
                });
            }
        }
        onClickDragable(){
            if(this.dragable){
                this.setGoodSort();
            }
            this.dragable = !this.dragable
        }
        onConfirmDrag(e){
            this.dragList = e.list.map(x=>x.goodCode);
        }
        onClickBtn(){
            if(this.notPass){
                uni.showModal({
                    title: '提示',
                    content: '确认申请边播边拆?',
                    success: (res: any) => {
                        const params = {
                            ...this.broadCast,
                            link:encodeURIComponent(this.broadCast.link)
                        }
                        app.http.Post('me/shop/dyBroadcast/create',params,(res)=>{
                            uni.showToast({title:"申请成功",icon:"none"});
                            this.initEvent();
                        })
                    }
                })
            }else if(this.inLiveBroadcast){
                uni.showModal({
                    title: '提示',
                    content: '确认提前下播?',
                    success: (res: any) => {
                        app.http.Post('me/shop/dyBroadcast/finish',{},(res)=>{
                            uni.showToast({title:"操作成功",icon:"none"});
                            this.initEvent();
                        })
                    }
                })
            }
        }
        initEvent(){
            app.http.Get("me/shop/dyBroadcast/state",{},(res)=>{
                this.broadCastState = res.data;
                for (const key in res.data) {
                    if (this.broadCast.hasOwnProperty(key)) {
                        this.broadCast[key] = key=='link' ? decodeURIComponent(res.data[key]) : dateFormatYMSHMS(res.data[key]);
                    }
                }
                if(res.data.state == -1){
                    this.startTime = res.data.start_at*1000;
                    this.overTime = res.data.end_at*1000
                }
                if(res.data.state == 1){
                    this.getSaleGoods()
                }
            })
        }
        setGoodSort(){
            app.http.Post('me/shop/dyBroadcast/good/od/edit',{goodCodes:this.dragList},(res:any)=>{
                uni.showToast({title:"修改成功",icon:"none"});
                this.dragList = [];
            })
        }
        getSaleGoods() {
            // 在售商品
            app.http.Get("me/shop/dyBroadcast/good/list", {}, (data: any) => {
                this.list = data.list || [];
            });
        }
    }
</script>

<style lang="scss">
    page {
        width: 100%;
		height:100%;
        background:#F6F7FB;
    }
    @mixin lineBox {
        width: 100%;
        box-sizing: border-box;
        display: flex;
    }

    @mixin font($size) {
        font-size: $size;
        font-weight: 600;
        color: #333;
    }
    .nav-right-btn{
        font-size: 24rpx;
    }
    .dy-container{
        width: 100%;
        box-sizing: border-box;
        padding:16rpx;
        padding-bottom: calc(178rpx);
		padding-bottom: calc(178rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(178rpx + env(safe-area-inset-bottom));
    }
    .dy-box{
        width: 100%;
        box-sizing: border-box;
        background:#fff;
        padding:20rpx;
        border-radius: 4rpx;
        margin-bottom: 14rpx;
        .header{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-title{
            font-size: 28rpx;
            font-weight: 500;
            display: flex;
            align-items: center;
            color:#333333
        }
        .icon-help{
            width: 20rpx;
            height:20rpx;
            background: url(@/static/goods/tishi@2x.png) no-repeat center / 100% 100%;
            margin-left: 10rpx;
        }
        .header-right{
            font-size: 24rpx;
        }
        .line{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            margin-top: 30rpx;
        }
        .line-title{
            font-size: 24rpx;
            color:#333333
        }
        .line-right{
            height:60rpx;
            display: flex;
            align-items: center;        
            font-size: 24rpx;  
            color:#333333              
        }
        .icon-right{
            width: 10rpx;
            height:16rpx;
            background: url(@/static/goods/v3/cuoka_right.png) no-repeat center / 100% 100%;
            margin-left: 10rpx;
        }
        .dy-input{
            width: 100%;
            box-sizing: border-box;
            margin-top: 20rpx;
        }
        .link-text{
            font-size: 20rpx;
            color: #333333;
            line-height: 28rpx;
        }
    }
    .bottom-btn{
        width: 100%;
		height: calc(162rpx);
		height: calc(162rpx + constant(safe-area-inset-bottom));
		height: calc(162rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
        box-sizing: border-box;
        padding-top: 34rpx;
    }
    .dy-btn{
        width: 686rpx;
        height: 84rpx;
        background: #FA1545;
        border-radius: 5rpx;
        box-sizing: border-box;
        height:84rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        font-weight: 600;
        color:#fff;
        margin:0 auto;
    }
    .popup-content{
        width: 618rpx;
        box-sizing: border-box;
        padding:36rpx 40rpx;
        background: #fff;
        border-radius: 10rpx;
        .popup-title{
            width: 100%;
            text-align: center;
            font-weight: 500;
            font-size: 32rpx;
            color: #333333;
            margin-bottom: 32rpx;
        }
        .popup-text{
            font-size: 28rpx;
            color: #AEAEB2;
            line-height: 40rpx;
        }
        .btn-box{
            width: 100%;
            height:88rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 56rpx;
        }
        .btn{
            width: 260rpx;
            height:88rpx;
            box-sizing: border-box;
            border-radius: 4rpx;
            border: 2rpx solid #DADCE1;
            font-size: 32rpx;
            color: #9FA4B0;
            text-align: center;
            line-height: 84rpx;
        }
        .con-btn{
            background:#FA1545;
            border: 2rpx solid #FA1545;
            color:#FFFFFF;
        }
    }
    .good-container{
        width: 100%;
        height:210rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid rgba(174,174,178,0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .good-container-pic{
            width: 232rpx;
            height:180rpx;
            margin-right: 20rpx;
        }
        .good-container-info{
            flex: 1;
            height:150rpx;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
        }
        .good-container-title{
            width: 100%;
            font-size: 24rpx;
            height:68rpx;
            color: #333333;
            line-height: 32rpx;
        }
        .good-container-price{
            font-size:30rpx;
            font-weight: 600;
            color: #333333;
            height: 40rpx;
            display: flex;
            align-items: flex-end;

            text.text-price {
                font-size: 34rpx;
                color: #333333;
                line-height: 38rpx;
                margin-right: 2rpx;
            }
            .decimal {
                font-size: 24rpx;
                font-weight: 600;
                color: #333333;
                margin-bottom: 3rpx;
            }
        }
    }
</style>