<template>
	<view class="scroll-view">
        <view class="scroll-operate">
            <view class="operate-filter"> 
                <view class="input-box">
                    <view class="search-icon"></view>
                    <input class="input-operate" :adjust-position="false" v-model="listQ" placeholder='填加"空格"可输入多个关键词搜索' @confirm="againList()"/>
                </view>
                <view class="filter-box" @click="onClickGoFilter">
                    <image class="icon-filter" src="@/static/illustration/icon_filter.png"/>筛选
                </view>
            </view>
            <view class="operate-line flex-line" v-show="tp!=2">
                <view class="line-title">卡种</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.cardSets)}" v-for="(item,index) in search.cardSets" :key="index" @click="onClickSelectTab(item,select.cardSets)">{{item.name}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line" v-show="tp!=1">
                <view class="line-title">球员</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.players)}" v-for="(item,index) in search.players" :key="index" @click="onClickSelectTab(item,select.players)">{{item.name}}</view>
                </scroll-view>
            </view>
            <view class="operate-line flex-line" v-show="tp==0">
                <view class="line-title">限编</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':selectTab(item,select.seqs)}" v-for="(item,index) in search.seqs" :key="index" @click="onClickSelectTab(item,select.seqs)">{{item.name}}</view>
                </scroll-view>
            </view>
        </view>
        <view class="card-list">
            <view class="card-index" v-show="tp==0" v-for="(item,index) in cardSetList" :key="index">
                <view class="card-team">
                    <view class="team">NO.{{item.number}} {{item.team}}</view>
                    <view class="check" :class="{'check_':selectNo.includes(index)}" @click="onClickSelectNo(index)"></view>
                </view>
                <view class="player">{{item.player}}</view>
                <view class="cardset">{{item.seq}}编，{{item.cardSet}}</view>
            </view>
<!-- 
            <view class="no-index" v-show="tp!=0" v-for="(item,index) in noList" :key="index">
                <view class="no-header">
                    <view class="left">
                        <view class="name">{{ tp==1 ? item.cardSet : item.player}}</view>
                        <view class="num">
                            <text class="num-text">{{item.total}}</text>条卡种
                            <text v-show="tp==1" class="num-text">，{{item.playerNum}}</text>{{tp==1?"名球员":""}}  
                        </view>
                    </view>
                    <u-icon :name="item.unfold?'arrow-up':'arrow-down'" @click="item.unfold=!item.unfold"></u-icon>
                </view>
                <view class="no-center" v-show="item.unfold">
                    <view class="card-index" v-for="(sample,sampleIndex) in item.sample" :key="sampleIndex">
                        <u-line color="#b4b3b1"></u-line>
                        <view class="card-team">
                            <view class="team">NO.{{sample.number}} {{sample.team}}</view>
                            <view class="check" :class="{'check_':sampleIsSelect(index,sampleIndex)}" @click="onClickSelectSample(index,sampleIndex)"></view>
                        </view>
                        <view class="player">{{sample.player}}</view>
                        <view class="cardset">{{sample.seq}}编，{{tp==1?item.cardSet:sample.cardSet}}</view>
                    </view>
                    <u-loadmore class="margin20" line :status="item.loading?'loading':(item.sample.length<item.total?'loadmore':'nomore')" @loadmore="sampleMore(item)"/>
                </view>
            </view> -->
            <u-loadmore v-show="(tp==0&&listOrther.end) || (tp!=0&&noParams.end)" status="nomore" line/>
        </view>

        <view class="bottom-box">
            <view class="btn-look" @click="onClickPopup">查看已选({{selectNo.length}})</view>
            <view class="btn-confirm" @click="onClickConfirm()">确定</view>
        </view>

        <u-popup :show="showPopup" closeable @close="closePopup">
            <view class="popup-box">
                <view class="header">已选LIST</view>
                <view class="center">
                    <view class="card-index" v-for="(item,index) in getSelectList" :key="index">
                        <view class="card-team">
                            <view class="team">NO.{{item.number}} {{item.team}}</view>
                            <view class="icon-clear" @click="selectNo.splice(index,1)"></view>
                        </view>
                        <view class="player">{{item.player}}</view>
                        <view class="cardset">{{item.seq}}编，{{item.cardSet}}</view>
                    </view>
                </view>
                <view class="bottom">
                    <view class="clear" @click="selectNo=[]">
                        <view class="icon-clear"></view>
                        <view class="msg">清空</view>
                    </view>
                    <view class="confirm" @click="onClickConfirm()">确定选择</view>
                </view>
            </view>
		</u-popup>
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
    class NoParams {
        fetchFrom=1;
        fetchSize=20;
        end = false;
    }
    class Select {
        cardSets = [];
        players = [];
        seqs = [];
    }
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:""})
		seriesCode!:string;
        @Prop({default:{}})
		search!:any;
        @Prop({default:0})
        numAll!:number
        @Prop({default:0})
        tp!:number

        isPullDown = app.platform.isPullDown;
        listQ="";
        select:{[x:string]:any} = new Select()
        cardSetList = [];
        listOrther = new ListOrther();
        filterList = [];
        // noParams = new NoParams();
        // noList = [];
        selectNo:any = [];
        // selectSample:any = {};
        showPopup = false;
        @Watch('seriesCode')
		onSeriesCodeChanged(val: any, oldVal: any){
            if(oldVal&&val!=oldVal){
                this.againList()
            }
		}
        @Watch('tp')
		onTpChanged(val: any, oldVal: any){
            if(val!=oldVal){
                this.select = new Select();
                this.filterList = [];
                this.againList()
            }
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
            uni.$on("seriesFilter",(res:any)=>{
                const list:any = [...res];
                this.select = new Select();
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
        public get getSelectList() : any {
            return this.selectNo.map((x:any)=>{
                return this.cardSetList[x]
            })
        }
        onClickPopup(){
            if(this.selectNo.length == 0){
                uni.showToast({ title:'未选择卡种', icon:'none' })
                return;
            }
            this.isPullDown(false);
            this.showPopup=true
        }
        closePopup(){
            this.isPullDown(true);
            this.showPopup = false;
        }
        onClickConfirm(){
            if(this.selectNo.length==0){
                uni.showToast({ title:'未选择卡种', icon:'none' })
                return;
            }
            this.closePopup();
            uni.$emit('albumNoList',{list:this.getSelectList,code:this.seriesCode});
			app.navigateTo.navigateBack()
        }
        selectTab(item:any,list:string[]){
			return list.some((x:any)=>{
                return x.nameId == item.nameId
			})
        }
        onClickSelectNo(index:number){
            if(this.selectNo.includes(index)){
                const indexOf = this.selectNo.indexOf(index);
                this.selectNo.splice(indexOf,1)
            }else{
                this.selectNo.push(index);
                app.platform.UIClickFeedBack(); 
            }
        }
        // sampleIsSelect(index:number,sampleIndex:number){
        //     if(index in this.selectSample){
        //         return this.selectSample[index].includes(sampleIndex);
        //     }else{
        //         return false
        //     }
        // }
        // onClickSelectSample(index:number,sampleIndex:number){
        //     let list = [sampleIndex]
        //     if(index in this.selectSample){
        //         if(this.selectSample[index].includes(sampleIndex)){
        //             const indexOf = this.selectSample[index].indexOf(sampleIndex);
        //             this.selectSample[index].splice(indexOf,1);
        //             list = this.selectSample[index];
        //         }else{
        //             list = [...this.selectSample[index],sampleIndex];
        //         }
        //     }
        //     this.$set(this.selectSample, index, list)
        // }
        onClickGoFilter(){
            const { cardSets, players, seqs } = this.select;
            const removeDuplicate= app.platform.removeDuplicate([...cardSets,...players,...seqs,...this.filterList],'nameId')
            const list = encodeURIComponent(JSON.stringify(removeDuplicate))

            uni.navigateTo({
                url:`/pages/illustration/seriesFilter?seriesCode=${this.seriesCode}&selectList=${list}&tp=${this.tp}`
            })
        }
        againList(val=0){
            if(val==0){
                this.cardSetList = [];
                this.selectNo = [];
                this.listOrther = new ListOrther();
                // this.noList=[];
                // this.selectSample = {};
                // this.noParams = new NoParams();
            }
            
            if(this.tp==0){
                this.getSeriesGroup()
            }else{
                // this.getNoGroup()
            }
        }
        onClickSelectTab(item:any,list:string[]){
            const repeatIndex = list.findIndex((x: any) => x.nameId === item.nameId);
            if (repeatIndex !== -1) { 
                list.splice(repeatIndex, 1); 
            } else {
                list.push(item)
            }
            app.platform.UIClickFeedBack(); 
            this.againList(); 
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
                rookie:rookieList.length?(rookieList[0].name=="新秀"?1:2):0,
                signature:signList.length?(signList[0].name=="签字"?1:2):0,
                players:this.select.players.map((x:any)=> x.nameId) || null,
                teams:this.filterList.filter((x:any)=>x.team).map((x:any)=>x.nameId) || null,
                cardSets:this.select.cardSets.map((x:any)=> x.nameId) || null,
                seqs:this.select.seqs.map((x:any)=> x.nameId) || null
            }
            app.http.Post(`dataApi/cardIllustration/series/${this.seriesCode}/search/no/plain?${_url}&sn=${sn}`,params,(res:any)=>{
                if(res.list){
                    this.cardSetList = scrollId ? [...this.cardSetList,...res.list] : res.list;
                    this.listOrther.scrollId = res.scrollId;
                    this.listOrther.st = ts;
                }else if(res.total==0){
                    this.cardSetList = [];
                }
                setTimeout(() => {
					uni.hideLoading();
				}, 100);
                this.listOrther.end = res.end || res.list.length<10;
            })
        }
        // getNoGroup(){
        //     if(this.noParams.end)  return;
        //     uni.showLoading({
		// 		title: '加载中'
		// 	});
        //     const ts = Math.floor(new Date().getTime()/1000);
        //     const sn = Md5.hashStr(`${ts}_scrollSearchTujian`);
        //     const group = this.tp==1?"cardset":"player";
        //     const get = `noSplit=1&ts=${ts}&sn=${sn}&group=${group}`;
        //     const { fetchFrom, fetchSize } = this.noParams;

        //     const params = {
        //         fetchFrom,
        //         fetchSize,
        //         q:this.listQ,
        //         players:this.tp==2?(this.select.players.map((x:any)=> x.nameId) || null):null,
        //         cardSets:this.tp==1?(this.select.cardSets.map((x:any)=> x.nameId) || null):null,
        //     }
        //     app.http.Post(`dataApi/cardIllustration/series/${this.seriesCode}/search/no/group?${get}`,params,(res:any)=>{
        //         if(res.groups){
        //             const list = res.groups.map((x:any)=>{
        //                 return {...x,unfold:false,loading:false}
        //             })
        //             this.noList = fetchFrom==1 ? list : [...this.noList,...list];
        //         }else if(res.total==0){
        //             this.cardSetList = [];
        //         }
        //         uni.hideLoading();
        //         this.noParams.fetchFrom += fetchSize;
        //         this.noParams.end = res.end || res.groups.length<10;
        //     })
        // }
        // sampleMore(item:any){
        //     item.loading = true;
        //     const params = {
        //         fetchFrom:item.sample.length+1,
        //         fetchSize:10,
        //         groupId:item.groupId
        //     }
        //     app.http.Get(`dataApi/cardIllustration/series/${this.seriesCode}/search/no/group/more`,params,(res:any)=>{
        //         if(res.list){
        //             item.sample = [...item.sample,...res.list];
        //         }
        //         item.loading = false;
        //     })
        // }
        
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
        padding:14rpx 0 37rpx 34rpx;
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
        padding-bottom:calc(179rpx + env(safe-area-inset-bottom));
    }
    .card-index{
		width: 100%;
        border-radius: 3rpx;
        background: #fff;
        margin-bottom: 15rpx;
        box-sizing: border-box;
        padding: 20rpx;
        .card-team{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height:36rpx;
        }
        .team{
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }
        .check{
            width: 36rpx;
            height:36rpx;
            border: 1px solid #C0C0C0;
            border-radius: 50%;
        }
        .check_{
            border: none;
            background:url(@/static/illustration/album/icon_g.png) no-repeat center / 100% 100%;
        }
        .player{
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-top: 16rpx;
        }
        .cardset{
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
            margin-top: 23rpx;
            line-height: 36rpx;
            word-break: break-all;
        }
	}
    .no-index{
        width: 100%;
        border-radius: 3rpx;
        background: #fff;
        margin-bottom: 15rpx;
        box-sizing: border-box;
        .no-header{
            width: 100%;
            padding: 20rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                width: 600rpx;
                .name{
                    width: 100%;
                    font-size: 25rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    margin-bottom: 15rpx;
                }
                .num{
                    font-size: 25rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                }
                .num-text{
                    font-weight: 600;
                }
            }
        }
        .no-center{
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 20rpx;
            .card-index{
                padding:0;
                width: 670rpx;
                margin:0 auto;
                .card-team{
                    margin-top: 20rpx;
                }
                .cardset{
                    margin-bottom: 20rpx;
                }
            }
        }
    }
    .margin20{
        margin-top:20rpx !important;
    }
    .bottom-box{
        width: 100%;
        height:calc(159rpx + env(safe-area-inset-bottom));
        position: fixed;
		bottom: 0;
		left: 0;
		background:#fff;
		z-index: 8;
		box-sizing: border-box;
		padding: 33rpx 20rpx 0 20rpx;
		border-top: 1px solid #F5F5F8;
		display: flex;
		justify-content: space-between;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
        .btn-look{
            width: 345rpx;
            height: 93rpx;
            border: 1px solid #C0C0C0;
            border-radius: 5rpx;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }
        .btn-confirm{
            width: 345rpx;
            height: 93rpx;
            background: #FA1545;
            border: 1px solid #FA1545;
            border-radius: 5rpx;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
    .popup-box{
        width: 100%;
        height:1200rpx;
        .header{
            width: 100%;
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color:#000;
            text-align: center;
            height:100rpx;
            line-height: 100rpx;
            background:#fff;
        }
        .center{
            width: 100%;
            height:941rpx;
            background: #F6F7F8;
            overflow: auto;
            box-sizing: border-box;
            padding:20rpx;
            .icon-clear{
                width: 37rpx;
                height:37rpx;
                background:url(@/static/illustration/album/icon_sub.png) no-repeat center / 100% 100%;
            }
        }
        .bottom{
            width: 100%;
            height:159rpx;
            display: flex;
            justify-content: space-between;
            padding: 33rpx 20rpx 0 20rpx;
            border-top: 1px solid #F5F5F8;
            box-sizing: border-box;
            .clear{
                width: 80rpx;
                height:93rpx;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                box-sizing: border-box;
                padding-top: 5rpx;
                .icon-clear{
                    width: 50rpx;
                    height:50rpx;
                    background:url(@/static/illustration/album/icon_sub.png) no-repeat center / 100% 100%;
                }
                .msg{
                    width: 100%;
                    font-size: 23rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #959695;
                    text-align: center;
                }
            }
            .confirm{
                width: 600rpx;
                height: 93rpx;
                background: #FA1545;
                border: 1px solid #FA1545;
                border-radius: 5rpx;
                display: flex;
                box-sizing: border-box;
                align-items: center;
                justify-content: center;
                font-size: 33rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
    }
</style>
