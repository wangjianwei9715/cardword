<template>
	<view class="content" >
		<navigationbar title="详情" :shareData="shareData"/>
		
		<view class="index">
			<comments ref="comments" :articleData="articleData" :commentsList="commentsList" :isFetchEnd="commentParams.isFetchEnd" @reply="onReply" @moreComments="onMoreComments"/>
		</view>
		
		<commentsTabbar :data="articleData" :commentNum="articleData.comment" :show="chatData.focus" @comment="onReply" @chat="onReply"/>
		<commentsTextarea :focus.sync="chatData.focus" :replyName="chatData.replyName" @chatConfirm="onChatConfirm"/>

		<share :operationShow="operationShow" :shareData="shareData"  @operacancel="operationShow = false"></share>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import comments from './components/comments.vue'
	import commentsTabbar from './components/commentsTabbar.vue'
	import commentsTextarea from './components/commentsTextarea.vue'
	const commentParams = {
		fetchFrom:1,
		fetchSize:10,
		isFetchEnd:false
	}
	const chat = {
		replyId:0,
		replyName:'',
		fatherId:0,
		focus:false
	}
	@Component({
		components:{
			comments,
			commentsTabbar,
			commentsTextarea
		}
	})
	export default class ClassName extends BaseNode {
		code = '';
		articleData:any = {};
		operationShow=false;
		shareData:any = {
			shareUrl:'',  
			title:'',      
			summary:'',    
			thumb:''       
		}
		chatData = {...chat};
		commentParams = {...commentParams};
		commentsList:any = [];
		typeAD = 0;
		onLoad(query:any) {
			if(query.code){
				this.code = query.code;
				this.typeAD = query.ad
				this.getArticleDetail()
			}
		}
		//   加载更多数据
		onReachBottom() {
			this.getArticleComment();
		}
		onClickBack(){
			uni.navigateBack({ delta: 1 });
		}
		onPageScroll() {
			//@ts-ignore
			this.$refs.comments.tapTimer && clearTimeout(this.$refs.comments.tapTimer)
			//@ts-ignore
			this.$refs.comments.lontapTimer && clearTimeout(this.$refs.comments.lontapTimer)
		}
		// 获取资讯详情
		getArticleDetail(){
			app.http.Get('dataApi/article/detail/'+this.code,{channel:Number(this.typeAD)},(res:any)=>{
				this.articleData = res.data;
				this.shareData = {
					shareUrl:"share/h5/index.html#/pages/information/index?code="+this.code,  
					title:res.data.title,      
					summary:res.data.title,    
					thumb:decodeURIComponent(res.data.cover)
				}
				this.getArticleComment()
			})
		}
		// 获取资讯评论
		getArticleComment(){
			const { commentParams } = this;
			if(commentParams.isFetchEnd){
				return;
			}
			app.http.Get(`dataApi/article/comment/list/${this.code}`,commentParams,(res:any)=>{
				commentParams.isFetchEnd = res.isFetchEnd;
				commentParams.fetchFrom += commentParams.fetchSize
				if(res.list){
					this.commentsList = [...this.commentsList,...res.list];
				}
			})
		}
		// 获取更多评论
		onMoreComments(id:number){
			const findItem = this.commentsList.find((item:any)=>{
				return item.id == id;
			})
			const params = {
				fetchFrom:findItem.fetchFrom?findItem.fetchFrom:1,
				fetchSize:5
			}
			app.http.Get(`dataApi/article/comment/morelist/${id}`,params,(res:any)=>{
				findItem.lower.push(...res.data.list);
				findItem.remainNum = res.data.remainNum;
				findItem.fetchFrom = params.fetchFrom+params.fetchSize;
			})
		}
		// 开始回复
		onReply(res?:any){
			app.platform.hasLoginToken(()=>{
				this.chatData = {
					replyId:res?res.replyId:0,
					replyName:res?res.replyName:'',
					fatherId:res?res.fatherId:0,
					focus:true
				}
			})
		}
		// 提交评论或回复
		onChatConfirm(content:string){
			console.log('评论内容：',content);
			if (!content||!content.replace(/\s/g,"")){
				uni.showToast({
					title:"请输入评论内容",
					icon:"none"
				})
				return
			}
			app.platform.hasLoginToken(()=>{
				const data = this.chatData;
				const url = data.replyId == 0 ? `article/comment/issue/${this.code}` : `article/reply/comment/${data.replyId}`;
				const { articleData } = this;
				app.http.Post(url,{content},(res:any)=>{
					articleData.comment++;
					if(data.replyId==0){
						this.commentsList.unshift(res.data)
					}else{
						let findItem = this.commentsList.find((item: any) => {
							return item.id == data.fatherId;
						});
						findItem.lower.unshift(res.data)
					}
					this.chatData = {...chat}
					uni.showToast({ title:'评论成功', icon:'none' })
					uni.$emit('informationChange', articleData)
				})
			})
		}
		
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.index{
		width: 100%;
		padding: 40rpx 40rpx 0 40rpx;
		padding-bottom: calc(164rpx);
		padding-bottom: calc(164rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(164rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
	}
	.bottom-box{
		width: 100%;
		height:calc(104rpx);
		height:calc(104rpx + constant(safe-area-inset-bottom));
		height:calc(104rpx + env(safe-area-inset-bottom));
		background:#fff;
		position:fixed;
		bottom:0;
		left:0;
		border-top: 4rpx solid #F8F9FA;
	}
	.bottom{
		width: 100%;
		height:104rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding:0 40rpx;
		justify-content: space-between;
		.input{
			width: 470rpx;
			height: 62rpx;
			background: #F5F5F8;
			border-radius: 31rpx;
			text-align: left;
			box-sizing: border-box;
			line-height: 62rpx;
			padding:0 38rpx;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #BDBEC5;
		}
		.desc-index{
			width: 200rpx;
			height:40rpx;
			display: flex;
			align-items: center;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #BDBEC5;
			justify-content: flex-end;
		}
		.icon-pl{
			width: 33rpx;
			height:30rpx;
			background:url(../../static/index/pl.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 7rpx;
		}
		.icon-dz{
			width: 32rpx;
			height:31rpx;
			background:url(../../static/index/zan.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 7rpx;
			margin-left: 32rpx;
		}
		.icon-dzed{
			width:32rpx;
			height:31rpx;
			background:url(../../static/index/zan_.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 7rpx;
			margin-left: 32rpx;
		}
		
	}
	
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 10;
		border-bottom: 1px solid #F4F3F2;
		.tab-header{
			width: 100%;
			height:88rpx;
			display: flex;
			box-sizing: border-box;
			padding:0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}
		.header-title{
			height:88rpx;
			line-height: 88rpx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.icon-share{
			width: 42rpx;
			height:42rpx;
			position: absolute;
			right:32rpx;
			top:50%;
			margin-top: -21rpx;
			background:url(../../static/goods/fenxiang@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
