<template>
	<view class="scroll-view">
        <view class="scroll-operate">
            <view class="operate-filter"> 
                <view class="input-box">
                    <view class="search-icon"></view>
                    <input class="input-operate" :adjust-position="false" v-model="listQ" placeholder="搜索球员/卡种/限编球队" @confirm="onClickSearch()"/>
                </view>
                <view class="filter-box" @click="onClickGoFilter">
                    <image class="icon-filter" src="@/static/illustration/icon_filter.png"/>筛选
                </view>
            </view>
            <view class="operate-line">
                <u-tabs :list="list" :current="current" lineHeight="0" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle" itemStyle="padding:0;height:41rpx;margin-right:40rpx" @change="onChangeTabs"></u-tabs>
                <view class="layout" :class="{'layout2':layoutLine==2}" @click="layoutLine=layoutLine==2?1:2"></view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">卡种</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.cardSets)}" v-for="(item,index) in search.cardSets" :key="index" @click="onClickSelectTab(item,select.cardSets,'cardSet')">{{item.name}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">球员</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.players)}" v-for="(item,index) in search.players" :key="index" @click="onClickSelectTab(item,select.players,'player')">{{item.name}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">限编</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.seqs)}" v-for="(item,index) in search.seqs" :key="index" @click="onClickSelectTab(item,select.seqs,'seq')">{{item.name}}</view>
                </scroll-view>
            </view>
        </view>
        <view v-show="layoutLine==1" class="card-list">
            <view class="card-index" v-for="(item,index) in cardSetList" :key="index" @click="onClickCard(item,index)">
                <view v-if="item.frontPic" class="card-pic">
                    <muqian-lazyLoad v-if="item.frontPic" class="pic" mode="aspectFit" :src="decodeURIComponent(item.frontPic)" />
                </view>
                <view v-else class="card-wait-up">
                    <view>
                        <view class="wait-pic"></view>
                        <view class="wait-kb">上传可得{{item.point}}卡币</view>
                    </view>
                </view>
                <view class="card-info">
                    <muqian-lazyLoad class="card-teamlogo" mode="aspectFit" :src="decodeURIComponent(item.teamLogo)" />
                    <view class="card-player">{{item.player}}</view>
                    <view class="card-set u-line-2">{{item.seq==0?"无限":item.seq}}编，{{item.cardSet}}</view>
                    <view class="card-logo-box">
                        <view v-if="item.seq<25&&item.seq>0" class="logo-seq" :class="`logo-seq-${item.seq}`">{{item.seq}}编</view>
                        <image v-if="item.cardSetLogo" class="logo-pic" :src="decodeURIComponent(item.cardSetLogo)"/>
                    </view>
                </view>
            </view>
        </view>
        <view v-show="layoutLine==2" class="layou2-list">
            <view class="list-index" v-for="(item,index) in cardSetList" :key="index" @click="onClickCard(item,index)">
                <view v-if="item.frontPic" class="pic-box">
                    <muqian-lazyLoad v-if="item.frontPic" class="pic" mode="aspectFit" :src="decodeURIComponent(item.frontPic)" />
                </view>
                <view v-else class="upload">
                    <view>
                        <view class="wait-pic"></view>
                        <view class="wait-kb">上传可得{{item.point}}卡币</view>
                    </view>
                </view>
                <view class="bottom">
                    <view class="player u-line-1">{{cardSetTitle(item)}}</view>
                    <view class="setcard u-line-2">
                        <image v-if="item.cardSetLogo" class="logo" :src="decodeURIComponent(item.cardSetLogo)"/>
                        {{item.cardSet}}
                    </view>
                </view>
            </view>
        </view>

        <u-loadmore v-show="listOrther.end" status="nomore" line/>

        <view class="back-top" @click="pageScrollTop"></view>
    </view>
</template>

<script lang="ts">
	import { Component, Prop,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
    import { app } from "@/app";
    import { Md5 } from "ts-md5";
    class ListOrther {
        st = 0;
        scrollId = "";
        end = false;
    }
    class Select {
        cardSets=[];
        players=[];
        seqs=[]
    }
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:""})
		seriesCode!:string;
        @Prop({default:{}})
		search!:any;

        pageScrollTop = app.platform.pageScrollTop;
        listQ="";
        list = [
            {id:0,name:'全部'},
            {id:1,name:'已有图鉴'},
            {id:2,name:'待补充图鉴'},
        ]
        current = 0;
        activeStyle={
            fontSize: '27rpx',
            fontFamily: 'PingFang SC',
            fontWeight: 600,
            color: '#FA1545'
        }
        inactiveStyle={
            fontSize: '27rpx',
            fontFamily: 'PingFang SC',
            fontWeight: 400,
            color: '#959695'
        }
        select:{[x:string]:any} = new Select()
        cardSetList = [];
        listOrther = new ListOrther();
        filterList = [];
        listParams = {};
        total = 0;
        layoutLine = 1;
        @Watch('seriesCode')
		onSeriesCodeChanged(val: any, oldVal: any){
            if(oldVal&&val!=oldVal){
                this.listQ = "";
                this.initEventSelect();
                this.againList()
            }
		}
		mounted(){//挂载到实例上去之后调用
            uni.$on("seriesFilter",(res:any)=>{
                this.initEventSelect();
                Object.keys(this.search).forEach((x:any)=>{
                    res.forEach((item:any)=>{
                        if(x== item.type+'s'){
                            this.$set(this.select, x, app.platform.removeDuplicate([...this.select[x],item],'nameId'));
                        }
                    })
                })
                this.filterList = res.filter((x:any)=>!['cardSet','player','seq'].includes(x.type));
                this.againList()
            })
			this.getSeriesGroup()
		}
        cardSetTitle(item:any){
            return `${item.seq==0?"无限":item.seq}编 ${item.player}`
        }
        initEventSelect(){
            this.select = new Select();
            this.filterList=[];
        }
        selectTab(item:any,list:string[]){
			return list.some((x:any)=>{
                return x.nameId == item.nameId
			})
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
            const { scrollId, st } = this.listOrther;
            const cardList = this.cardSetList.map((x:any)=>x.code);
            const httpParams = {
                url:`dataApi/cardIllustration/series/${this.seriesCode}/search/no`,
                scrollId,
                st,
            }
            uni.navigateTo({
                url:`/pages/illustration/cardSetUpload?noCode=${item.code}&nowIndex=${(index+1)}&indexAll=${this.total}&cardList=${encodeURIComponent(JSON.stringify(cardList))}&params=${encodeURIComponent(JSON.stringify(this.listParams))}&httpParams=${encodeURIComponent(JSON.stringify(httpParams))}`
            })
        }
        onClickSearch(){
            const text = this.listQ; 
            const seriesCodeRegex = /[:][A-Za-z]{6}/; 
            const noCodeRegex = /[:][A-Za-z0-9]{12}/;
            if (text && (seriesCodeRegex.test(text) || noCodeRegex.test(text))) {
                if (seriesCodeRegex.test(text)) { 
                    uni.redirectTo({ 
                        url: `/pages/illustration/seriesDetail?seriesCode=${text.slice(1, 7)}` 
                    }); 
                    return; 
                }
                if (noCodeRegex.test(text)) { 
                    this.onClickCard({ code: text.slice(1, 13) }, 0); 
                    return; 
                } 
            }
            this.againList()
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
        onClickSelectTab(item: any, list: string[],type:string) { 
            const repeatIndex = list.findIndex((x: any) => x.nameId === item.nameId);
            if (repeatIndex !== -1) { 
                list.splice(repeatIndex, 1); 
            } else {
                list.push({...item,type})
            }
            console.log(repeatIndex);
            
            app.platform.UIClickFeedBack(); 
            this.againList(); 
        }
        getSeriesGroup(){
            if(this.listOrther.end) return;
            uni.showLoading({ title: '加载中' });
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
                teams:this.filterList.filter((x:any)=>x.type=="team").map((x:any)=>x.nameId) || null,
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
                this.total = res.total;
                setTimeout(() => {
					uni.hideLoading();
				}, 100);
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
        background:#fff;
        box-sizing: border-box;
        padding:34rpx 0 24rpx 33rpx;
    }
    .operate-filter{
        width: 100%;
        height:69rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding-right: 34rpx;
    }
    .input-box{
        width: 566rpx;
        height: 69rpx;
        background:#F5F5F5;
        border-radius:3rpx;
        box-sizing: border-box;
        padding-left: 72rpx;
        position: relative;
    }
    .input-operate{
        width: 100%;
        height: 69rpx;
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
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #707070;
    }
    .icon-filter{
        width: 25rpx;
        height:27rpx;
        margin-right: 10rpx;
    }
    .operate-line{
        width: 100%;
        height:41rpx;
        margin-top: 21rpx;
        position: relative;
        .layout{
            width: 27rpx;
            height:28rpx;
            background:url(@/static/illustration/layout_1.png) no-repeat center/ 100% 100%;
            position: absolute;
            top:50%;
            margin-top: -14rpx;
            right:34rpx;
        }
        .layout2{
            background:url(@/static/illustration/layout_2.png) no-repeat center/ 100% 100%;
        }
    }
    .flex-line{
        display: flex;
    }
    .line-title{
        width: 94rpx;
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        word-break: keep-all;
        height:41rpx;
        line-height: 41rpx;
    }
    .line-scroll{
        width:622rpx;
        white-space: nowrap;
    }
    .line-scroll-box{
        height:44rpx;
        box-sizing: border-box;
        background: #F5F5F5;
        border-radius: 1rpx;
        text-align: center;
        line-height: 44rpx;
        padding:0 18rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
        display: inline-block;
        margin-right: 24rpx;
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
        height:253rpx;
        border-radius: 3rpx;
        background: #fff;
        display: flex;
        margin-bottom: 20rpx;
	}
    .card-pic{
        width: 180rpx;
        height: 253rpx;
        border-radius: 3rpx;
        box-sizing: border-box;
        background:$pic-bg;
        .pic{
            width: 180rpx;
            height: 253rpx;
        }
    }
    .card-wait-up{
        width: 180rpx;
        height: 253rpx;
        border-radius: 3rpx;
        border: 1px dashed #DFDFDF;
        box-sizing: border-box;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .wait-pic{
            width: 91rpx;
            height:78rpx;
            border-radius: 3rpx;
            margin:0 auto;
            margin-bottom: 20rpx;
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
            font-size: 23rpx;
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
        width: 530rpx;
        height:253rpx;
        box-sizing: border-box;
        padding:30rpx 40rpx;
        position: relative;
        overflow: hidden;
    }
    .card-teamlogo{
        width: 300rpx;
        height:300rpx;
        position: absolute;
        bottom:-100rpx;
        right:-100rpx;
        opacity: 0.2;
    }
    .card-player{
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 20rpx;
    }
    .card-set{
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        word-break: break-all;
    }
    .card-logo-box{
        width: 100%;
        height:31rpx;
        position: absolute;
        bottom:30rpx;
        left:0;
        box-sizing: border-box;
        padding: 0 40rpx;
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
    .layou2-list{
        width: 100%;
        box-sizing: border-box;
        padding:20rpx 24rpx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .list-index{
            width: 341rpx;
            height:650rpx;
            margin-bottom: 20rpx;
            background:#fff;
            .pic-box{
                width: 341rpx;
                height:479rpx;
                border-radius: 3rpx 3rpx 0rpx 0rpx;
                background:$pic-bg;
                overflow: hidden;
            }
            .pic{
                width: 341rpx;
                height:479rpx;
            }
            .bottom{
                width: 100%;
                height:171rpx;
                box-sizing: border-box;
                padding:20rpx;
                .player{
                    width: 100%;
                    font-size: 25rpx;
                    font-family: PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    margin-bottom: 20rpx;
                }
                .setcard{
                    display: flex;
                    font-size: 25rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    word-break: break-all;
                }
                .logo{
                    width: 67rpx;
                    height:28rpx;
                    margin-right: 6rpx;
                }
            }
            .upload{
                width: 341rpx;
                height:479rpx;
                border-radius: 3rpx 3rpx 0rpx 0rpx;
                background:#F5F5F5;
                border: 1px dashed #DFDFDF;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
            }
            .wait-pic{
                width: 113rpx;
                height:98rpx;
                border-radius: 3rpx;
                margin:0 auto;
                margin-bottom: 31rpx;
                background: url(@/static/illustration/icon_wait.png) no-repeat center / 100% 100%;
            }
            .wait-bc{
                width: 100%;
                font-size: 29rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #959695;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .icon-add{
                width: 28rpx;
                height:28rpx;
                background: url(@/static/illustration/icon_add__.png) no-repeat center / 100% 100%;
                margin-right: 6rpx;
            }
            .wait-kb{
                width: 100%;
                font-size: 25rpx;
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
    }
    .back-top{
        width: 112rpx;
        height:112rpx;
        background: url(@/static/illustration/top.png) no-repeat center / 100% 100%;
        position: fixed;
        bottom:36rpx;
        bottom:calc(36rpx + constant(safe-area-inset-bottom));
        right: 15rpx;
        z-index: 66;
    }
</style>
