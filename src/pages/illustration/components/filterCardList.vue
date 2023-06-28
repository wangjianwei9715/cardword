<template>
	<view class="scroll-view">
        <view class="scroll-operate">
            <view class="operate-filter"> 
                <view class="input-box">
                    <view class="search-icon"></view>
                    <input class="input-operate" :adjust-position="false" v-model="listQ" placeholder="搜索球员/卡种/限编球队" @confirm="againList()"/>
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
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.cardSets)}" v-for="(item,index) in search.cardSets" :key="index" @click="onClickSelectTab(item,select.cardSets)">{{item.name}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">球员</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.players)}" v-for="(item,index) in search.players" :key="index" @click="onClickSelectTab(item,select.players)">{{item.name}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">限编</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.seqs)}" v-for="(item,index) in search.seqs" :key="index" @click="onClickSelectTab(item,select.seqs)">{{item.name}}</view>
                </scroll-view>
            </view>
        </view>
        <view class="card-list">
            <view class="card-index" v-for="(item,index) in cardSetList" :key="index" @click="onClickCard(item,index)">
                <muqian-lazyLoad v-if="item.frontPic" class="card-pic" mode="aspectFit" :src="decodeURIComponent(item.frontPic)" />
                <view v-else class="card-wait-up">
                    <view>
                        <view class="wait-pic"></view>
                        <view class="wait-bc">
                            <view class="icon-add"></view>我来补充
                        </view>
                        <view class="wait-kb">
                            可获卡币<view class="icon-kb"></view>
                        </view>
                    </view>
                </view>
                <view class="card-info">
                    <muqian-lazyLoad class="card-teamlogo" mode="aspectFit" :src="decodeURIComponent(item.teamLogo)" />
                    <view class="card-player">{{item.player}}</view>
                    <view class="card-set">{{item.cardSet}}</view>
                    <view class="card-logo-box">
                        <view v-if="item.seq<25" class="logo-seq" :class="`logo-seq-${item.seq}`">{{item.seq}}编</view>
                        <image v-if="item.cardSetLogo" class="logo-pic" :src="decodeURIComponent(item.cardSetLogo)"/>
                    </view>
                </view>
            </view>
        </view>

        <u-loadmore v-show="listOrther.end" status="nomore" line/>
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
        @Prop({default:0})
        numAll!:number
        @PropSync("reachNum",{type:Number})
        reachNumber!:Number

        listQ="";
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
        select:{[x:string]:any} = {
            cardSets:[],
            players:[],
            seqs:[]
        }
        cardSetList = [];
        listOrther = new ListOrther();
        filterList = [];
        listParams = {};
        @Watch('reachNum')
		onReachNumChanged(val: any, oldVal: any){
            this.againList(val)
		}
        @Watch('seriesCode')
		onSeriesCodeChanged(val: any, oldVal: any){
            if(oldVal&&val!=oldVal){
                this.againList()
            }
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
            uni.$on("seriesFilter",(res:any)=>{
                const list:any = [...res];
                this.select = {
                    cardSets:[],
                    players:[],
                    seqs:[]
                }
                Object.keys(this.search).forEach((x:any)=>{
                    this.search[x].forEach((y:any)=>{
                        list.forEach((t:any,index:number)=>{
                            if(y.nameId == t.nameId){
                                this.$set(this.select, x, app.platform.removeDuplicate([...this.select[x],t],'nameId'));
                                list.splice(index,1)
                            }
                        })
                    })
                })
                this.filterList = list;
                this.againList()
            })
			this.getSeriesGroup()
		}
        selectTab(item:any,list:string[]){
            let repeat = false;
			list.forEach((x:any)=>{
                if(x.nameId == item.nameId){
                    repeat = true;
                }
			})
			return repeat
        }
        onClickGoFilter(){
            const { cardSets, players, seqs } = this.select;
            const removeDuplicate= app.platform.removeDuplicate([...cardSets,...players,...seqs,...this.filterList],'nameId')
            const list = encodeURIComponent(JSON.stringify(removeDuplicate))

            uni.navigateTo({
                url:`/pages/illustration/seriesFilter?seriesCode=${this.seriesCode}&selectList=${list}`
            })
        }
        onClickCard(item:any,index:number){
            app.platform.hasLoginToken(()=>{
                const { scrollId, st } = this.listOrther;
                const cardList = this.cardSetList.map((x:any)=>x.code);
                const httpParams = {
                    url:`dataApi/cardIllustration/series/${this.seriesCode}/search/no`,
                    scrollId,
                    st,
                }
                uni.navigateTo({
                    url:`/pages/illustration/cardSetUpload?noCode=${item.code}&nowIndex=${(index+1)}&indexAll=${this.numAll}&cardList=${encodeURIComponent(JSON.stringify(cardList))}&params=${encodeURIComponent(JSON.stringify(this.listParams))}&httpParams=${encodeURIComponent(JSON.stringify(httpParams))}`
                })
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
            let repeat = false;
			list.forEach((x:any,index:number)=>{
                if(x.nameId == item.nameId){
                    repeat = true;
                    list.splice(index,1)
                }
			})
            if(!repeat){
                list.push(item);
            }
            app.platform.UIClickFeedBack()
            this.againList()
        }
        getSeriesGroup(){
            if(this.listOrther.end) return;
            uni.showLoading({
				title: '加载中'
			});
            const { scrollId, st } = this.listOrther;
            const ts = Math.floor(new Date().getTime()/1000);
            const _url = scrollId ? `scrollId=${scrollId}&st=${st}&pageSize=10` : `ts=${ts}&noSplit=1`
            const sn = Md5.hashStr(`${scrollId?st:ts}_${scrollId?`${scrollId}_`:''}scrollSearchTujian`);
            
            const rookieList:any = this.filterList.filter((x:any)=> x.rookie);
            const signList:any = this.filterList.filter((x:any)=> x.signature);

            const params = {
                pageSize:10,
                q:this.listQ,
                tp:this.current,
                rookie:rookieList.length?(rookieList[0].name=="新秀"?1:2):0,
                signature:signList.length?(signList[0].name=="签字"?1:2):0,
                players:this.select.players.map((x:any)=> x.nameId) || null,
                teams:this.filterList.filter((x:any)=>x.team).map((x:any)=>x.nameId) || null,
                cardSets:this.select.cardSets.map((x:any)=> x.nameId) || null,
                seqs:this.select.seqs.map((x:any)=> x.nameId) || null
            }
            this.listParams = params;
            app.http.Post(`dataApi/cardIllustration/series/${this.seriesCode}/search/no?${_url}&sn=${sn}`,params,(res:any)=>{
                if(res.list){
                    this.cardSetList = scrollId ? [...this.cardSetList,...res.list] : res.list;
                    this.listOrther.scrollId = res.scrollId;
                    this.listOrther.st = ts;
                }else if(res.total==0){
                    this.cardSetList = [];
                }
                uni.hideLoading();
                this.listOrther.end = res.end || res.list.length<10;
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
        box-sizing: border-box;
    }
    .card-wait-up{
        width: 175rpx;
        height: 227rpx;
        border-radius: 3rpx;
        border: 1px dashed #C0C0C0;
        box-sizing: border-box;
        background: #E6E6E6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .wait-pic{
            width: 71rpx;
            height:64rpx;
            border-radius: 3rpx;
            margin:0 auto;
            margin-bottom: 16rpx;
            background: url(@/static/illustration/icon_wait.png) no-repeat center / 100% 100%;
        }
        .wait-bc{
            width: 100%;
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #959695;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .icon-add{
            width: 18rpx;
            height:18rpx;
            background: url(@/static/illustration/icon_add_.png) no-repeat center / 100% 100%;
            margin-right: 6rpx;
        }
        .wait-kb{
            width: 100%;
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #C0C0C0;
            margin-top: 10rpx;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .icon-kb{
            width: 23rpx;
            height:23rpx;
            background: url(@/static/illustration/icon_kab.png) no-repeat center / 100% 100%;
            margin-left: 5rpx;
        }
    }
    .card-info{
        width: 535rpx;
        height:227rpx;
        box-sizing: border-box;
        padding:25rpx;
        position: relative;
        overflow: hidden;
    }
    .card-teamlogo{
        width: 300rpx;
        height:300rpx;
        position: absolute;
        bottom:-100rpx;
        right:-100rpx;
        opacity: 0.5;
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
