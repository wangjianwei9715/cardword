<template>
	<view >
		<view class="operation-shadow" v-show="operationShow" @click="onClickOperaCancel"></view>
		<view class="operation-content" :class="operationShow?'operation-show':''">
			<view class="operation-index">
				<view class="operation-btn" @click="operationStart(item)" v-for="item in operationData" :key="item.id"> 
					<image class="operation-img" :src="item.img" mode=""></image>
					<view class="operation-text">{{item.text}}</view>
				</view>
			</view>
			<view class="operation-cancel" @click="onClickOperaCancel">取消</view>
		</view>
	</view>
	
</template>

<script lang="ts">
	import { Component, Prop,Vue,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { wxShare } from "@/net/DataDefine"
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		// @Prop({ default: false })
		// operationShow:boolean|undefined;
		@PropSync("operationShow",{
			type:Boolean
		}) showValue!: Boolean;

		@Prop({ default: [] })
		shareData!:wxShare.shareData;
		@Prop({ default: false })
		report!:boolean;
		@Prop({ default: ()=>{
			return []
		} })
		extra!:Array<Object>;
		
		operationData:any = [
			{img:'/static/share/weixin@2x.png',text:'微信好友',scene:'WXSceneSession'},
			{img:'/static/share/pyq@2x.png',text:'朋友圈',scene:'WXSenceTimeline'},
			{img:'/static/share/lianjie@2x.png',text:'分享链接',scene:''},
		];
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			if(this.report){
				this.operationData.push({ img: '/static/share/report.png', text: '举报', scene: '', emit: 'report' })
			}
			if(this.extra&&this.extra.length){
				this.operationData.push(...this.extra)
			}
			
		}
		destroyed(){
			
		}
		setClipboardData(){
			if(!this.canShare(this.shareData.shareUrl)){
				uni.showToast({
					title:'维护中',
					icon:'none'
				})
				return
			}
			const href=`${app.H5Url}/${this.shareData.shareUrl}`
			uni.setClipboardData({
				data:href,
				showToast:false,
				success: ()=> {
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}
			});
		}
		weChatShare(scene:string){
			uni.showLoading({
				title: '加载中'
			});
			if(!this.canShare(this.shareData.shareUrl)){
				uni.showToast({
					title:'分享维护中',
					icon:'none'
				})
				return
			}
			setTimeout(()=> {
				uni.hideLoading();
				this.$emit('delyCallBack');
			}, 2000);
			const href=`${app.H5Url}/${this.shareData.shareUrl}`
			uni.share({
				provider: "weixin",
				//@ts-ignore
				scene: scene,
				type: 0,
				href,
				title: this.shareData.title,
				summary: this.shareData.summary,
				imageUrl: this.shareData.thumb,
				success: (res)=> {
					console.log("success:" + JSON.stringify(res));
					this.$emit("shareSuccess",true)
				},
				fail: function (err) {
					console.log("fail:" + JSON.stringify(err));
				}
			});
		}
		canShare(url:string){
			const goodsShareUrl=['/pages/goods/goods_details','/pages/calendar/goods_details']
			let bol:boolean=true
			// const list=goodsShareUrl.filter((item:any)=>{
			// 	return url.indexOf(item)!=-1
			// })
			// if(list && list.length) bol=true
			return bol
		}
		// isGoodsShare(url:string){
		// 	const goodsShareUrl=['/pages/goods/goods_details','/pages/calendar/goods_details']
		// 	let bol:boolean=false
		// 	const list=goodsShareUrl.filter((item:any)=>{
		// 		return url.indexOf(item)!=-1
		// 	})
		// 	if(list && list.length) bol=true
		// 	return bol
		// }
		operationStart(item:any){
			if(item.emit){
				this.$emit(item.emit)
				this.onClickOperaCancel()
				return
			}
			if(item.scene==''){
				this.setClipboardData()
			}else{
				this.weChatShare(item.scene)
			}
			this.onClickOperaCancel()
		}
		onClickOperaCancel(){
			this.$emit("operacancel");
			this.showValue=false
		}
	}
</script>

<style>
	.operation-content{
		width: 100%;
		height:calc(340rpx);
		height:calc(340rpx + constant(safe-area-inset-bottom));
		height:calc(340rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom:-500rpx;
		left:0;
		border-radius: 12rpx 12rpx 0px 0px;
		box-sizing: border-box;
		border-top: 1px solid #F4F3F2;
		transition: all 0.2s linear;
		z-index:802;
		background:#fff
	}
	.operation-shadow{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		z-index: 801;
		background: rgba(0, 0, 0, 0.5);
	}
	.operation-show{
		bottom:0
	}
	.operation-index{
		width: 100%;
		height:232rpx;
		box-sizing: border-box;
		padding: 0 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.operation-btn{
		width: 120rpx;
		height:170rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.operation-img{
		width: 120rpx;
		height:120rpx;
		margin-bottom: 14rpx;
	}
	.operation-text{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		
		font-weight: normal;
		color: #3B3B3B;
	}
	.operation-cancel{
		width: 100%;
		height:106rpx;
		line-height: 106rpx;
		text-align: center;
		font-size: 28rpx;
		
		font-weight: 500;
		color: #A9ABB4;
		border-top: 1px solid #F4F3F2;
	}
</style>
