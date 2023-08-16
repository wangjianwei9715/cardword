<template>
	<view class="kww-swiper">
		<view class="bg-gradient"></view>
		<swiper class="list-swiper" :style="{ height:swiperHeight }" :current="current" @change="e=> current=e.detail.current">
			<swiper-item v-for="(item,index) in goodsList" :key="index" class="list-box">
                <goodslist :class="`goodsList${index}`" :goodsList="item.list" :indexAddList="index==1?addList:[]" :indexSwiper="true" @send="onClickJumpDetails" :presell="false" :empty="item.empty" :nomore="item.noMoreData" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue,PropSync ,Watch} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	//@ts-ignore
	import KwwConfusion from "@/net/kwwConfusion.js"
	class ListParams {
		fetchFrom=1;
		fetchSize=10;
		noMoreData=false;
		empty=false;
		height=app.platform.systemInfo.screenHeight;
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: [] })
		tabs: any;
		@Prop({ default: [] })
		addList?:any
		@PropSync('tabCurrent',{type:Number})
		current!:number

		kwwConfusion = new KwwConfusion();
		app=app;
		goodsList:any = [];
		@Watch('current')
		onCurrentChange(val:any,oldVal:any){
			if(val!=oldVal){
				if(val == 0) {
					if(app.token.accessToken == ''){
						this.current = val;
						setTimeout(()=>{ this.current = oldVal; },500)
						uni.navigateTo({ url:'/pages/login/login' })
						return;
					}
					this.$emit('followed')
					this.$set(this.goodsList, 0, { list:[], ...new ListParams()})
				}
				this.reqNewMainList()
			}
		}
		created() {
			this.reload()
		}
		mounted() {
		}
		public get currentItem() : any {
			return this.goodsList[this.current]
		}
		public get swiperHeight() : string {
			return `${this.currentItem.height}px`
		}
		reload(){
			this.goodsList = Array.from({length:this.tabs.length},()=> ({ list:[], ...new ListParams()}) );
			this.reqNewMainList()
		}
		onClickJumpDetails(goodCode: any) {
			app.navigateTo.goGoodsDetails(goodCode)
		}
		getListHeight() {
			const lenght = Math.ceil((this.currentItem.list.length + (this.current==1&&this.addList.length>0?1:0))/2);
			this.currentItem.height = uni.upx2px((lenght * 514)+200);
			uni.createSelectorQuery().select(`.goodsList${this.current}`).boundingClientRect((res) => {
				this.currentItem.height = Math.max(res.height||0,this.currentItem.height);
			}).exec()
		}
		reqNewMainList(cb ? : Function) {
			const { fetchFrom, fetchSize, noMoreData } = this.currentItem;
			if (noMoreData) return;
			const urlNamr = this.tabs[this.current].url;
			const params: { [x: string]: any } = {
				fetchFrom,
				fetchSize,
			}
			const hash = this.kwwConfusion.goodsSwiper(urlNamr,fetchFrom,fetchSize)
			app.http.Get(`dataApi/goodlist/forsale/${urlNamr}`, {...params,...hash}, (data: any) => {
				this.currentItem.noMoreData = data.isFetchEnd;
				if (fetchFrom == 1) this.currentItem.list = [];

				if (data.goodList) {
					const list = fetchFrom == 1 ? data.goodList : [...this.currentItem.list,...data.goodList];
					this.currentItem.list = app.platform.removeDuplicate(list,'goodCode');
					this.$nextTick(()=>{
						this.getListHeight();
					})
				}
				this.currentItem.empty = this.currentItem.list.length==0;
				this.currentItem.fetchFrom += fetchSize;
				cb && cb()
			});
		}
	
	}
</script>

<style lang="scss">
	.kww-swiper{
		width: 750rpx;
		box-sizing: border-box;
		overflow: hidden;
		background:#F6F7FB;
		position: relative;
		.bg-gradient{
			width: 100%;
			height:100rpx;
			background: linear-gradient(to bottom, #fff, $content-bg);
			position: absolute;
			top:0;
			left:0
		}
		.list-swiper{
			width: 100%;
		}
		.scroll-Y{
			width: 100%;
			height:100%;
		}
		.list-box{
			width: 750rpx;
		}
	}
</style>
