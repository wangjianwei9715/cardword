<template>
	<view>
		<view class="tabbar" v-show="!show">
			<view class="tabbar-chat" @click="onClickChat">说点什么...</view>
			<view class="tabbar-gn">
				<view class="tabbar-item" v-for="(item,index) in tabbarData" :key="index" @click="$u.throttle(()=>{onClickTabbar(index)},500)">
					<view class="pic-box">
						<image :class="'pic-'+index" :src="item.boolean?item.piced:item.pic" />
					</view>
					<view class="num">{{item.num}}</view>
				</view>
			</view>
		</view>

		
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	const tabbarData = {
		comment:{pic:'../../static/information/icon_t_pl.png',piced:'',num:0,boolean:false},
		likes:{pic:'../../static/information/icon_t_like.png',piced:'../../static/information/icon_t_liked.png',num:0,boolean:false},
		favorite:{pic:'../../static/information/icon_t_collect.png',piced:'../../static/information/icon_t_collectd.png',num:0,boolean:false}
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		data:any
		@Prop({default:true})
		show:any
		@Prop({default:0})
		commentNum:number|undefined

		tabbarData:any = {...tabbarData};
		@Watch('data')
		onDataChanged(val: any, oldVal: any) {
			if(val){
				this.setTabbarNum(val)
			}
		}
		@Watch('commentNum')
		onNumChanged(val: any, oldVal: any) {
			if(val){
				this.tabbarData.comment.num = val;
			}
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			this.setTabbarNum(this.data)
		}
		destroyed(){
			
		}
		onClickChat(){
			this.$emit('chat')
		}
		setTabbarNum(data:any){
			let tab:any = {
				comment:{num:data.comment||0,boolean:false},
				likes:{num:data.likes||0,boolean:data.isLikes},
				favorite:{num:data.favorite||0,boolean:data.isFavorite}
			}
			for (const key in this.tabbarData) {
				this.tabbarData[key].num = tab[key].num;
				this.tabbarData[key].boolean = tab[key].boolean;
			}
		}
		onClickTabbar(str:string){
			app.platform.hasLoginToken(()=>{
				if(str == 'comment'){
					this.$emit('comment')
				}else if( str == 'likes' || str == 'favorite'){
					const isLikes = str == 'likes';
					const url = isLikes ? 'like/or/cancel' : 'favorite/or/unFavorite'
					app.http.Post(`article/${url}/${this.data.articleCode}`,{},(res:any)=>{
						this.tabbarData[str].boolean = isLikes ? res.liked : res.isFavorite;
						this.tabbarData[str].num = isLikes ? res.likes : res.favorite;

						if(isLikes){
							const data = {
								articleCode:this.data.articleCode,
								isLikes:res.liked,
								comment:this.tabbarData.comment.num,
								likes:res.likes
							}
							uni.$emit('informationChange', data)
						}
						
					})
				}
			})
		}
		
	}
</script>

<style lang="scss">
	.tabbar{
		width: 100%;
		height: calc(124rpx);
		height: calc(124rpx + constant(safe-area-inset-bottom));
		height: calc(124rpx + env(safe-area-inset-bottom));
		background:#fff;
		position: fixed;
		bottom:0;
		left:0;
		box-sizing: border-box;
		border-top: 1px solid #E8E8E8;
		display: flex;
		justify-content: space-between;
		padding: 0 44rpx;
		padding-top: 30rpx;
		.tabbar-chat{
			width: 332rpx;
			height: 63rpx;
			box-sizing: border-box;
			background: #EFEFEF;
			border-radius: 3rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			line-height: 63rpx;
			padding:0 30rpx;
		}
		.tabbar-gn{
			width: 250rpx;
			height:70rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			.tabbar-item{
				width: 50rpx;
				height:70rpx;
				.pic-box{
					width: 50rpx;
					height:43rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.pic-comment{
					width: 35rpx;
					height:33rpx;
				}
				.pic-likes{
					width: 35rpx;
					height:34rpx;
				}
				.pic-favorite{
					width: 37rpx;
					height:35rpx;
				}
				.num{
					width: 100%;
					height:20rpx;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					text-align: center;
				}
			}
		}
	}
	
</style>
