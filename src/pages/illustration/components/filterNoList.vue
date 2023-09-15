<template>
	<view class="scroll-view">
        <u-sticky>
			<u-tabs 
				:list="tabsData.list" :current="tabsData.current" @change="onChangeTabs" lineWidth="375rpx" lineHeight="6rpx" lineColor="#FA1545"
				:itemStyle="{width:'375rpx',height:'78rpx',lineHeight:'72rpx',padding:0,background:'#fff'}"
				:activeStyle="{color: '#333333',fontSize: '33rpx',fontWeight:'600'}" 
				:inactiveStyle="{color: '#959695',fontSize: '27rpx'}" 
			/>
		</u-sticky>
        <view class="scroll-operate" v-show="!byPlyaer">
            <view class="operate-filter"> 
                <view class="input-box">
                    <view class="search-icon"></view>
                    <input class="input-operate" :adjust-position="false" v-model="cardSetQ" placeholder='搜索卡种' @confirm="againList()"/>
                </view>
            </view>
            <view class="operate-line flex-line">
                <view class="line-title">热门</view>
                <scroll-view class="line-scroll" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':item.nameId===select.cardSets}" v-for="(item,index) in search.cardSets" :key="`cardSet_${index}`" @click="onClickSelectTab(item,'cardSets')">{{item.name}}</view>
                </scroll-view>
            </view>
        </view>

        <view class="scroll-operate" v-show="byPlyaer">
            <view class="player-header"> 
                <view class="player-title">已选球员</view>
                <view class="player-select">
                    <view class="player-q">{{playerQ||"请选择球员"}}<u-icon name="close-circle-fill" v-show="playerQ" class="player-close" @click="onClickClosePlayer"></u-icon></view>
                    <view class="player-search" @click="onClickGoSearch">
                        <view class="icon"></view> 搜索球员
                    </view>
                </view>
            </view>
            <view class="operate-line flex-line">
                <scroll-view class="line-scroll" style="width:716rpx" :scroll-x="true">
                    <view class="line-scroll-box" :class="{'current':item.nameId===select.players}" v-for="(item,index) in search.players" :key="`playes_${index}`" @click="onClickSelectTab(item,'players')">{{item.name}}</view>
                </scroll-view>
            </view>
        </view>

        <view class="card-list">
            <view class="no-index" v-show="!byPlyaer" v-for="(item,index) in noList" :key="`noList_${index}`" @click="onClickCardSetNo(item)">
                <view class="no-header">
                    <view class="left">
                        <view class="name">{{ item.cardSet}}</view>
                        <view class="num">
                            <text class="num-text">{{item.total}}</text>条卡种
                            <text class="num-text">，{{item.playerNum}}</text>名球员  
                        </view>
                    </view>
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>

            <view class="card-index" v-show="byPlyaer" v-for="(item,index) in playerList" :key="`cardSetList_${index}`" @click="onClickSelectNo(item)">
                <view class="card-team">
                    <view class="team">NO.{{item.number}} {{item.team}}</view>
                    <view class="team-right">
                        <view v-show="!item.split&&item.seq>1" class="split" @click.stop="onClickSplitNo(index)">拆分限编</view>
                        <view v-show="item.split" class="split-c" @click.stop="onClickSplitCancel(item)">取消拆分</view>
                        <view class="check" :class="{'check_':selectNo.includes(item.code)}"></view>
                    </view>
                </view>
                <view class="player">{{item.player}}</view>
                <view class="cardset"><text v-show="item.split" class="split-text">拆分限编 x/{{item.seq}}编</text>{{item.split?"":item.seq+"编"}}，{{item.cardSet}}</view>
            </view>
            <view class="player-empty" v-show="byPlyaer&&playerList.length===0">
                <view class="icon-empty"></view>
                <view class="empty-text">请先选择球员</view>
            </view>
            <u-loadmore v-show="(byPlyaer&&listOrther.end) || (!byPlyaer&&noParams.end)" status="nomore" line/>
        </view>

        <view class="bottom-box" v-show="byPlyaer">
            <view class="all-select" @click="onClickAllSelect">
                <view class="check" :class="{'check_':allPlayerSelect}"></view>
                <view>全选</view>
            </view>
            <view class="clear" @click="selectNo=[]">清空</view>
            <view class="btn-confirm" :class="{'red-btn':canNext}" @click="onClickConfirm()">下一步</view>
        </view>
    </view>
</template>

<script lang="ts">
	import { Component, Prop,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
    import { app } from "@/app";
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
        cardSets = 0;
        players = 0;
    }
	@Component({})
	export default class ClassName extends BaseComponent {
        @Prop({default:{}})
		search!:any;
        @Prop({default:0})
        numAll!:number
        @PropSync('selectSeries',{type:Object})
        seriesData!:any

        isPullDown = app.platform.isPullDown;
        tabsData = {
			list:[{name:'按卡种收集'},{name:'按球员收集'}],
			current:0
		}
        cardSetQ="";
        playerQ="";
        select:{[x:string]:any} = new Select()
        playerList:any = [];
        listOrther = new ListOrther();
        filterList = [];
        noParams = new NoParams();
        noList = [];
        selectNo:any = [];
        loading = false;
        removeDuplicate=[];
		mounted(){//挂载到实例上去之后调用
            this.checkNoType(()=>{
                this.getNoGroup();
            });
		}
        public get getSelectList() : any {
            const list:any[] = [];
            this.selectNo.forEach((code:any)=>{
                const item = this.playerList.find((item:any)=>item.code == code);
                if(item.split){
                    for(let i=1 ; i<=item.seq ; i++){
                        list.push({...item,seqIndex:i,seq:item.seq,split:true});
                    }
                }else{
                    list.push(item)
                }
            })
            return list;
        }
        public get byPlyaer() : boolean {
            return this.tabsData.current == 1;
        }
        public get canNext() : boolean {
            return this.getSelectNoTotal>=2;
        }
        public get allPlayerSelect() : boolean {
            const selectLength = this.selectNo.length;
            return selectLength>0 && (this.playerList.length === selectLength)
        }
        public get playerListTotalNo() : boolean {
            const total = this.playerList.reduce((total:number,item:any)=>{
                return total + (item&&item.split ? item.seq : 1);
            },0);
            return total>500;
        }
        public get seriesDataNolist() : any[] {
            return this.seriesData.noList
        }
        public get getSelectNoTotal() : number {
            const total = this.selectNo.reduce((total:number,code:any)=>{
                const item = this.playerList.find((item:any)=>item.code == code);
                return total + (item&&item.split ? item.seq : 1);
            },0);
            return total;
        }
        onClickGoSearch(){
            uni.navigateTo({
                url:`/pages/illustration/album/searchPlayer?code=${this.seriesData.seriesCode}`
            })
        }
        checkNoType( cb?:Function){
            if(this.seriesDataNolist.length>0){
                const playerName= this.seriesDataNolist[0].player;
                const isPlayer = this.seriesDataNolist.every((item:any) => item.player == playerName );
                this.tabsData.current = isPlayer ? 1 : 0 ;
                if(isPlayer){
                    this.playerQ = playerName;
                    this.removeDuplicate = app.platform.removeDuplicate(this.seriesDataNolist,'code');
                    this.getSeriesPlayer();
                    this.selectNo = this.removeDuplicate.map((item:any)=>item.code)
                }
            }
            cb?.();
		}
        onChangeTabs(event:any){
			this.tabsData.current = event.index;
		}
        initEventSelect(){
            this.select = new Select();
            this.filterList=[];
        }
        onClickConfirm(){
            if(!this.canNext) return;

            const { seriesCode:code, name } = this.seriesData;
            this.seriesData.noList = this.getSelectList.map((x:any)=>{
                const editItem = this.seriesDataNolist.find((item:any)=>{
                    return item.code==x.code && (item.split?item.seqIndex==x.seqIndex:true)
                });
                return editItem ?? {...x,frontPic:"",backPic:"",series:{code,name}}
            });
            this.$emit('next')
        }
        async onClickSelectNo(item:any){
            if(this.selectNo.includes(item.code)){
                const indexOf = this.selectNo.indexOf(item.code);
                this.selectNo.splice(indexOf,1)
            }else{
                await this.maxNoTotal(item.split?item.seq:1);
                this.selectNo.push(item.code);
                app.platform.UIClickFeedBack(); 
            }
        }
        onClickAllSelect(){
            if(this.allPlayerSelect) return;
            if(this.playerListTotalNo){
                uni.showToast({title:"超出500张无法全选",icon:"none"});
                return;
            }
            this.selectNo = this.playerList.map(({code}:any)=> code);
        }
        reachBottom(){
            if(this.byPlyaer){
                this.getSeriesPlayer()
            }else{
                this.getNoGroup()
            }
        }
        againList(){
            if(this.byPlyaer){
                this.playerList = [];
                this.selectNo = [];
                this.listOrther = new ListOrther();
            }else{
                this.noList = [];
                this.noParams = new NoParams();
            }
            this.reachBottom();
        }
        onClickSelectTab({name,nameId}:any,type:string){
            if(type==="players"){
                if(this.playerQ===name) return;
                this.playerQ = name;
                this.select[type] = nameId;
            }else{
                this.select[type] = this.select[type]===nameId ? 0 : nameId;
            }
            app.platform.UIClickFeedBack(); 
            this.againList(); 
        }
        setPlayer(item:any){
            this.playerQ = item.player;
            this.select.players=item.playerNameId;
            this.againList();
        }
        onClickClosePlayer(){
            this.playerQ = "";
            this.select.players=0;
            this.againList(); 
        }
        getNoGroup(){
            if(this.noParams.end)  return;
            uni.showLoading({ title: '加载中',mask:true });
            const get = `group=cardset`;
            const { fetchFrom, fetchSize } = this.noParams;
            const params = {
                fetchFrom,
                fetchSize,
                q:this.cardSetQ,
                cardSets:this.select.cardSets==0?null:[this.select.cardSets],
            }
            app.http.PostWithCrypto(`dataApi/cardIllustration/series/${this.seriesData.seriesCode}/search/no/group?${get}`,params,(res:any)=>{
                if(res.groups){
                    const list = res.groups||[];
                    this.noList = fetchFrom==1 ? list : [...this.noList,...list];
                }
                uni.hideLoading();
                this.noParams.fetchFrom += fetchSize;
                this.noParams.end = res.end || res.groups.length<10;
            })
        }
        getSeriesPlayer(){
            if(this.listOrther.end || (this.select.players==0&&this.playerQ=="")) return;

            !this.loading && uni.showLoading({ title: '加载中',mask:true });
            this.loading = true;
            const { scrollId } = this.listOrther;
            const _url = scrollId ? `scrollId=${scrollId}&pageSize=10` : `noSplit=1`

            const params = {
                pageSize:30,
                q:this.playerQ,
                players:this.select.players==0?null:[this.select.players],
            }
            app.http.PostWithCrypto(`dataApi/cardIllustration/series/${this.seriesData.seriesCode}/search/no/plain?${_url}`,params,(res:any)=>{
                if(res.list){
                    const list = res.list;
                    this.removeDuplicate.forEach((item:any)=>{
                        if(item.split){
                            list.forEach((x:any)=>{
                                (x.code===item.code) && (x.split = true);
                            })
                        }
                    })
                    this.playerList = scrollId ? [...this.playerList,...list] : list;
                    this.listOrther.scrollId = res.scrollId;
                }else if(res.total==0){
                    this.playerList = [];
                }
                this.listOrther.end = res.end || res.list.length<10;
                setTimeout(() => {
                    if(!this.listOrther.end){
                        this.getSeriesPlayer()
                    }else{
                        uni.hideLoading();
                        this.loading=false;
                    }
                }, 100);
            })
        }
        async onClickSplitNo(noIndex:number){
			const list = this.playerList;
			const { seq ,...rest } = list[noIndex];
			await this.maxNoTotal(seq-1);
			this.playerList.splice(noIndex,1,{...rest,seq,split:true});
            this.setSeriesNolistSplit(list[noIndex].code,true)
		}
        onClickSplitCancel(noItem:any){
            noItem.split = false;
            this.setSeriesNolistSplit(noItem.code,false)
		}
        setSeriesNolistSplit(code:string,bool:boolean){
            this.seriesData.noList.forEach((item:any)=>{
                (item.code===code) && (item.split=bool)
            })
        }
        maxNoTotal(num:number): Promise<any> {
			return new Promise((resolve, reject) => {
				if(num + this.getSelectNoTotal > 500){
					uni.showToast({title:"最多支持500张，请重新选择",icon:"none"});
					reject();
					return;
				}
				resolve && resolve(true)
			})
		}
        // 计算卡种分类卡密
        onClickCardSetNo({ cardSet, groupId } :any){
            uni.showLoading({ title: '加载中',mask:true })
            this.sampleMore([],cardSet,groupId,(list:any)=>{
                uni.hideLoading();
                const { seriesCode:code, name } = this.seriesData;
                this.seriesData.noList = list.map((x:any)=>{
                    return {...x,frontPic:"",backPic:"",series:{code,name}}
                });
                this.$emit('next')
            });
        }
        sampleMore(list:any[],cardSet:string,groupId:string,cb?:Function){
            const params = {
                fetchFrom:list.length+1,
                fetchSize:30,
                groupId
            }
            app.http.Get(`dataApi/cardIllustration/series/${this.seriesData.seriesCode}/search/no/group/more`,params,(res:any)=>{
                const List = res.list.map((x:any)=>({...x,cardSet}))
                list = [...list,...List]
                if(!res.end){
                    setTimeout(()=>{
                        this.sampleMore(list,cardSet,groupId,cb)
                    },100)
                }else{
                    cb?.(list);
                }
            })
        }
	}
</script>

<style lang="scss">
    @mixin flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
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
        padding:14rpx 0 24rpx 34rpx;
    }
    .operate-filter{
        width: 100%;
        height:69rpx;
        @include flex;
        box-sizing: border-box;
        padding-right: 34rpx;
    }
    .player-header{
        width: 100%;
    }
    .player-title{
        width: 100%;
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #707070;
    }
    .player-select{
        width: 100%;
        height:60rpx;
        box-sizing: border-box;
        padding-right: 24rpx;
        @include flex;
        .player-q{
            @include flex;
            font-size: 34rpx;
            font-weight:600;
            color: #333;
            .player-close{
                margin-left: 6rpx;
            }
        }
        .player-search{
            height:46rpx;
            border-radius: 30rpx;
            font-size: 20rpx;
            color:#707070;
            background:#F5F5F5;
            box-sizing: border-box;
            padding:0 20rpx;
            display: flex;
            align-items: center;
            .icon{
                width: 20rpx;
                height:20rpx;
                background:url(@/static/index/sousuo@2x.png) no-repeat center / 100% 100%;
                margin-right: 6rpx;
            }
        }
    }
    .input-box{
        width: 682rpx;
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
        padding-bottom:179rpx;
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
        .team-right{
            @include flex
        }
        .check{
            width: 36rpx;
            height:36rpx;
            border: 1px solid #C0C0C0;
            border-radius: 50%;
            box-sizing: border-box;
        }
        .check_{
            border: none;
            background:url(@/static/illustration/album/icon_g.png) no-repeat center / 100% 100%;
        }
        .player{
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 600;
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
        height:159rpx;
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
        .all-select{
            width: 80rpx;
            height:93rpx;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding-top: 10rpx;
        }
        .check{
            width: 46rpx;
            height:46rpx;
            border: 1px solid #C0C0C0;
            border-radius: 50%;
            box-sizing: border-box;
        }
        .check_{
            border: none;
            background:url(@/static/illustration/album/icon_g.png) no-repeat center / 100% 100%;
        }
        .clear{
            width: 200rpx;
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
            width: 390rpx;
            height: 93rpx;
            background: #C0C0C0;
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
        .red-btn{
            background: #FA1545;
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
    .split{
        height: 34rpx;
        border: 1px solid #D8D8D8;
        font-size: 17rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #aaaaaa;
        box-sizing: border-box;
        padding:0 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30rpx;
    }
    .split-c{
        @extend .split;
        background: #FFE8E8;
        border: 1px solid #FFE8E8;
        color: #FA1545;
    }
    .split-text{
        color: #FA1545;
    }
    .player-empty{
        width: 100%;
        height:800rpx;
        box-sizing: border-box;
        padding-top: 260rpx;
        .icon-empty{
            width: 333rpx;
            height:312rpx;
            background:url(@/static/cardForum/forumEmpty.png) no-repeat center / 100% 100%;
            margin:0 auto;
            margin-left: 246rpx;
        }
        .empty-text{
            width: 100%;
            text-align: center;
            color:rgb(192, 192, 192);
        }
    }
</style>
