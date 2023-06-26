<template>
	<view class="scroll-view">
        <view class="scroll-operate">
            <view class="operate-filter"> 
                <view class="input-box">
                    <view class="search-icon"></view>
                    <input class="input-operate" placeholder="搜索球员/卡种/限编球队"/>
                </view>
                <view class="filter-box" @click="onClickGoFilter">
                    <image class="icon-filter" src="@/static/illustration/icon_filter.png"/>筛选
                </view>
            </view>
            <view class="operate-line">
                <u-tabs :list="list" :current="current" lineHeight="0" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle" itemStyle="padding:0;height:41rpx;margin-right:34rpx" @change="onChangeTabs"></u-tabs>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">卡种</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.cardSets)}" v-for="(item,index) in cardSetTab" :key="index" @click="onClickSelectTab(item,select.cardSets)">{{item}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">球员</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.players)}" v-for="(item,index) in cardSetTab" :key="index" @click="onClickSelectTab(item,select.players)">{{item}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">限编</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.seqs)}" v-for="(item,index) in cardSetTab" :key="index" @click="onClickSelectTab(item,select.seqs)">{{item}}</view>
                </scroll-view>
            </view>
        </view>
        <view class="card-list">
            <view class="card-index" v-for="(item,index) in cardSetList" :key="index">
                <muqian-lazyLoad v-if="item.frontPic" class="card-pic" :src="decodeURIComponent(item.frontPic)" />
                <view v-else></view>
                <view class="card-info">
                    <view class="card-player">{{item.player}}</view>
                    <view class="card-set">{{item.cardSet}}</view>
                    <view class="card-logo-box">
                        <view v-if="item.seq<25" class="logo-seq" :class="`logo-seq-${item.seq}`">{{item.seq}}编</view>
                        <image v-if="item.cardSetLogo" class="logo-pic" :src="decodeURIComponent(item.cardSetLogo)"/>
                    </view>
                </view>
            </view>
        </view>

        <u-loadmore v-show="listOrther.end" status="nomore" />
    </view>
</template>

<script lang="ts">
	import { Component, Prop,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
    import { app } from "@/app";
    import { Md5 } from "ts-md5";
    class ListOrther {
        st = 0;
        scrollId = "";
        end = false;
    }
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:""})
		seriesCode!:string;
        @Prop({default:{}})
		search!:any;
        @PropSync("reachNum",{type:Number})
        reachNumber!:Number

        statusBarHeight = app.statusBarHeight;
        list = [
            {id:0,name:'全部'},
            {id:1,name:'已有图鉴'},
            {id:2,name:'待补充图鉴'},
        ]
        current = 0;
        activeStyle={
            fontSize: '25rpx',
            fontFamily: 'PingFang SC',
            fontWeight: 600,
            color: '#FA1545'
        }
        inactiveStyle={
            fontSize: '25rpx',
            fontFamily: 'PingFang SC',
            fontWeight: 400,
            color: '#959695'
        }
        refresherTriggered = false;
        cardSetTab = [
            '星云','黑折','logoman签','闪回签','名人堂签','大家发挥就好','星云','黑折','logoman签','闪回签','名人堂签',
        ]
        select = {
            cardSets:[],
            players:[],
            seqs:[]
        }
        cardSetList = [
            { 
                "code": "11",  //编号code
                "cardSet": "Craftsmen Press Proof Black",
                "player": "勒布朗·詹姆斯",
                "team":"湖人",
                "number":10,
                "seq":1, //限编
                "seqIndex":1, //第几编
                "frontPic":"http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685348082327rg7zpaz63r.jpg",
                "cardSetLogo":"", 
            }
        ]
        listOrther = new ListOrther();
        @Watch('reachNum')
		onReachNumChanged(val: any, oldVal: any){
            this.againList(val)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			this.getSeriesGroup()
		}
        selectTab(item:any,list:string[]){
            return list.includes(item)
        }
        onClickGoFilter(){
            uni.navigateTo({
                url:`/pages/illustration/seriesFilter?seriesCode=${this.seriesCode}`
            })
        }
        againList(val=0){
            if(val==0){
                this.listOrther = new ListOrther();
            }
            this.getSeriesGroup()
        }
		onChangeTabs(event:any){
            if(this.current == event.index) return;

            this.current = event.index;
            this.againList()
        }
        onClickSelectTab(item:any,list:string[]){
            const index = list.indexOf(item);
            if(index == -1){
                list.push(item);
            }else{
                list.splice(index,1)
            }
            this.againList()
        }
        getSeriesGroup(){
            const { scrollId, st } = this.listOrther;
            const ts = Math.floor(new Date().getTime()/1000);
            const _url = scrollId ? `scrollId=${scrollId}&st=${st}` : `ts=${ts}`
            const sn = Md5.hashStr(`${scrollId?st:ts}_${scrollId?`${scrollId}_`:''}scrollSearchTujian`);
            
            const params = {
                pageSize:10,
                q:'',
                numberFrom:null,
                numberEnd:null,
                tp:this.current,
                rookie:null,
                signature:null,
                players:null,
                teams:null,
                cardSets:null,
                seqs:null
            }
            app.http.Post(`dataApi/cardIllustration/serie/${this.seriesCode}/search/no?${_url}&sn=${sn}`,params,(res:any)=>{
                if(res.list){
                    this.cardSetList = scrollId ? [...this.cardSetList,...res.list] : res.list;
                    this.listOrther.scrollId = res.scrollId;
                    this.listOrther.st = ts;
                }
                this.listOrther.end = res.end;
            })
        }
	}
</script>

<style lang="scss">
	.scroll-box{
		// #ifdef APP-PLUS
		box-sizing: border-box;
		padding-bottom: calc(104rpx);
		padding-bottom: calc(104rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(104rpx + env(safe-area-inset-bottom));
		// #endif
	}
	.scroll-view{
		width: 100%;
		height:100%;
        box-sizing: border-box;
        position: relative;
	}
    .scroll-operate{
        width: 100%;
        height:362rpx;
        background:#fff;
        box-sizing: border-box;
        padding:34rpx 0 0 34rpx;
    }
    .operate-filter{
        width: 100%;
        height:73rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding-right: 34rpx;
    }
    .input-box{
        width: 566rpx;
        height: 73rpx;
        background:#F5F5F5;
        border-radius:3rpx;
        box-sizing: border-box;
        padding-left: 72rpx;
        position: relative;
    }
    .input-operate{
        width: 100%;
        height: 73rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
    }
    .search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(@/static/index/sousuo@2x.png) no-repeat center / 100% 100%;
		position: absolute;
		left:32rpx;
		top:50%;
		margin-top: -14rpx;
	}
    .filter-box{
        height:26rpx;
        display: flex;
        align-items: center;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #707070;
    }
    .icon-filter{
        width: 25rpx;
        height:26rpx;
        margin-right: 8rpx;
    }
	
    .operate-line{
        width: 100%;
        height:41rpx;
        margin-top: 20rpx;
    }
    .flex-line{
        display: flex;
    }
    .line-title{
        width: 83rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        word-break: keep-all;
        height:41rpx;
        line-height: 41rpx;
    }
    .line-scroll{
        width:633rpx;
        white-space: nowrap;
    }
    .line-scroll-box{
        height:41rpx;
        box-sizing: border-box;
        background: #F5F5F5;
        border-radius: 1rpx;
        text-align: center;
        line-height: 41rpx;
        padding:0 12rpx;
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
        display: inline-block;
        margin-right: 15rpx;
    }
    .current{
        background: #FFE8E8;
        color: #FA1545;
    }
    .card-list{
        width: 100%;
        box-sizing: border-box;
        padding:20rpx;
    }
    .card-index{
		width: 100%;
        height:227rpx;
        border-radius: 3rpx;
        background: #fff;
        display: flex;
        margin-bottom: 15rpx;
	}
    .card-pic{
        width: 175rpx;
        height: 227rpx;
        border-radius: 3rpx;
    }
    .card-info{
        width: 535rpx;
        height:227rpx;
        box-sizing: border-box;
        padding:25rpx;
        position: relative;
    }
    .card-player{
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 15rpx;
    }
    .card-set{
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }
    .card-logo-box{
        width: 100%;
        height:31rpx;
        position: absolute;
        bottom:18rpx;
        left:0;
        box-sizing: border-box;
        padding: 0 25rpx;
        display: flex;
        align-items: center;
    }
    .logo-seq{
        width: 74rpx;
        height: 31rpx;
        box-sizing: border-box;
        line-height: 31rpx;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        text-align: center;
        border-radius: 1rpx;
    }
    .logo-seq-1{
        background: #000000;
        color: #FFFFFF;
    }
    .logo-seq-10{
        background: #BFBF3D;
        color: #FFFF54;
    }
    .logo-pic{
        width: 74rpx;
        height: 31rpx;
        border-radius: 1rpx;
        margin-left: 20rpx;
    }
</style>
