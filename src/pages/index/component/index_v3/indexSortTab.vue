<template>
	<div>
		<div class="sort">
			<div class="sort-index" v-for="item in sortTab" :key="item.id" @click="onClickSort(item)">
				<text class="sort-name" :class="{'current-text':item.current>=0||(item.type=='updown'&&item.select!='')}">{{tabName(item)}}</text>
				<div class="sort-filter" v-if="item.type=='filter'">
					<image class="icon-filter" :src="`/static/index/v3/filter_dowm${item.current>=0?'_':''}.png`"/>
				</div>
				<div class="sort-filter" v-if="item.type=='updown'">
					<image class="icon-updown icon-up" :src="`/static/index/v3/up${item.select=='up'?'_':''}.png`"/>
					<image class="icon-updown" :src="`/static/index/v3/down${item.select=='down'?'_':''}.png`"/>
				</div>
			</div>
		</div>
		<div v-if="sortHeight>0" class="sort-container" :style="{height:sortHeight+'rpx'}">
			<div class="filter-index" :class="{'current-index':currentTab.current==index}" v-for="(item,index) in filterList" :key="index" @click="onClickFilter(index)">
				<text class="filter-text" :class="{'current-text':currentTab.current==index}">{{item.name}}</text>
			</div>
		</div>
	</div>
</template>

<script >
	export default {
		data(){
			return {
				sortTab:[
					{
						id:1,
						name:'综合',
						type:'filter',
						height:102,
						current:0,
						list:[ 
							{name:"综合"},
							{name:"新上架"},
						]
					},
					{
						id:2,
						name:'价格',
						od:"price",
						type:'updown',
						select:"",
						height:0
					},
					{
						id:3,
						name:'进度',
						od:"progress",
						type:'updown',
						select:"",
						height:0
					},
					{
						id:4,
						name:'玩法',
						type:'filter',
						height:168,
						current:-1,
						list:[
							{name:"卡种随机",tp:1},
							{name:"球队随机",tp:2},
							{name:"球员随机",tp:3},
							{name:"自选球队",tp:10},
							{name:"选队随机",tp:11},
						]
					}
				],
				currentId:0
			}
		},
		mounted(){
			
		},
		computed:{
			sortHeight(){
				const height = this.currentId>0 ? this.sortTab.find(x=>x.id==this.currentId).height : 0;
				return height
			},
			currentTab(){
				return this.sortTab.find(x=>x.id==this.currentId)
			},
			filterList(){
				return [1,4].includes(this.currentId) ? this.currentTab.list : [] 
			}
		},
		methods: {
			tabName(item){
				if(item.type=='updown') return item.name;

				return item.current>=0 ? item.list[item.current].name : item.name
			},
			onClickSort({id, type, select, height}){
				this.currentId = this.currentId==id ? 0 : id;
				if(type == 'updown'){
					this.sortTab.forEach(x=>{
						if(x.type==type && x.id!=id){
							x.select = ""
						}else if(x.id==id){
							x.select = select=="" ? "up" : (select=="up" ? "down" : "")
						}
					});
					this.emitIndex()
				}
			},
			onClickFilter(index){
				this.sortTab.forEach(x=>{
					if(x.type=='filter'){
						x.current = x.id==this.currentId ? index : -1
					}
				});
				this.currentId = 0;
				this.emitIndex()
			},
			emitIndex(){
				const { sortTab } = this
				const pintuanCurrent = sortTab[3].current;
				const odItem = sortTab.find(x=>{
					return (x.type=='updown') && (x.select!='')
				})
				const data = {
					pintuan_type:pintuanCurrent>=0?sortTab[3].list[pintuanCurrent].tp:null,
					genre:Number(sortTab[0].current==1?1:0),
					od:!uni.$u.test.isEmpty(odItem) ? `${odItem.od}:${odItem.select=='up'?'asc':'desc'}` : ""
				}
				this.$emit('sortChange',data)
			}
		}
	}
</script>

<style scoped lang="scss">
	@mixin flexCenter{
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
	}
	.sort{
		width: 750rpx;
		height:76rpx;
		background: #fff;
		@include flexCenter;
		justify-content: space-between;
		padding:0 35rpx;
	}
	.sort-index{
		width: 156rpx;
		height: 48rpx;
		background: #F3F5FB;
		border-radius: 2rpx;
		@include flexCenter;
	}
	.sort-name{
		font-size: 22rpx;
		color: #8D8D8D;
	}
	.sort-filter{
		width: 16rpx;
		height:20rpx;
		margin-left: 10rpx;
		@include flexCenter;
	}
	.icon-filter{
		width: 15rpx;
		height:10rpx;
	}
	.icon-updown{
		width: 11rpx;
		height:7rpx;
	}
	.icon-up{
		margin-top: 2rpx;
		margin-bottom: 2rpx;
	}
	.sort-container{
		width: 750rpx;
		height:0rpx;
		background: #F3F5FB;
		@include flexCenter;
		justify-content: flex-start;
		align-items: flex-start;
		padding-left: 20rpx;
		padding-top: 14rpx;
	}
	.filter-index{
		width: 230rpx;
		height: 64rpx;
		background: #FFFFFF;
		border-radius: 2rpx;
		@include flexCenter;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		border: 1rpx solid #fff;
	}
	.filter-text{
		font-size: 22rpx;
		color: #333333;
	}
	.current-index{
		border: 1rpx solid #FA1545;
	}
	.current-text{
		color:#FA1545
	}
</style>
