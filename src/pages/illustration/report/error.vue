<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\report\error.vue
 * @Author: wjw
 * @Date: 2023-06-26 19:47:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-19 14:48:49
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<navigationbar title="有奖报错" rightText="我的记录" rightFont="12" @onClickRightText="onClickRecord" />
		<view class="error-box">
			<view class="title">请上传相关错误图片，最多3张（选填)</view>
			<view class="pic-box">
				<view class="pic-index" v-for="(item,index) in reportPicList" :key="index">
					<image class="pic" :src="decodeURIComponent(item)"/>
					<view class="pic-close" @click="reportPicList.splice(index,1)"></view>
				</view>
				<view class="upload-box" v-show="reportPicList.length<3" @click="onClickAddError">
					<image class="icon-add" src="@/static/illustration/icon_add.png"/>
				</view>
			</view>
			<u-line color="#dadbde" margin="0 0 40rpx 0"></u-line>
			<view class="title">添加描述（必填)</view>
			<u--textarea v-model="desc" height="410rpx"  :placeholder="`请描述错误原因，审核通过后获得${point}卡币`" count :maxlength="200" border="none" confirmType="done"></u--textarea>
			<u-line color="#dadbde" margin="0 0 40rpx 0"></u-line>
			<view class="title">请上传正确图片（选填)</view>
			<view class="pic-box">
				<view class="pic-index" v-if="frontPic">
					<image class="pic" :src="decodeURIComponent(frontPic)"/>
					<view class="pic-close" @click="frontPic=''"></view>
				</view>
				<view class="upload-box" v-else @click="onClickAddImg('front')">
					<image class="icon-add" src="@/static/illustration/icon_add.png"/>
					<view class="upload-msg">上传正面</view>
				</view>

				<view class="pic-index" v-if="backPic">
					<image class="pic" :src="decodeURIComponent(backPic)"/>
					<view class="pic-close" @click="backPic=''"></view>
				</view>
				<view class="upload-box" v-else @click="onClickAddImg('back')">
					<image class="icon-add" src="@/static/illustration/icon_add.png"/>
					<view class="upload-msg">上传反面</view>
				</view>
			</view>
			<u-line color="#dadbde" margin="0 0 40rpx 0"></u-line>
			<view class="tips">采纳后额外获得{{point}}卡币</view>
			<view class="btn" @click="$u.throttle(onClickReport,1000)">提交</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import Upload from "@/tools/upload"
	@Component({})
	export default class ClassName extends BaseNode {
		code="";
		reportPicList:any = [];
		desc="";
		frontPic="";
		backPic="";
		point = 0;
		peer = 0;
		onLoad(query: any) {
			this.code = query.code;
			this.point = query.point;
			this.peer = query.peer
		}
		onClickRecord(){
			uni.navigateTo({
				url:'/pages/illustration/report/record'
			})
		}
		async onClickAddError(type:string) {
			const length =  3-this.reportPicList.length;
			const list:any = await this.addImg(length);
			this.reportPicList = [...this.reportPicList,...list]
		}
		async onClickAddImg(type:string){
			const list:any =  await this.addImg(1);
			if(type=='front'){
				this.frontPic = list[0]
			}else{
				this.backPic = list[0]
			}
		}
		async addImg(length:number){
			const picList:any = await Upload.getInstance().uploadSocialImgs(length, "report", ["album"]);
			return picList
		}
		onClickReport(){
			if(!this.desc){
				uni.showToast({
					title:'请填写错误原因',
					icon:'none'
				})
				return;
			}
			uni.showModal({
                content: '是否提交报错?',
                success: (res: any) => {
                    if (res.confirm){
						const params = {
							descPics:this.reportPicList.join(","),
							content:decodeURIComponent(this.desc),
							frontPic:this.frontPic,
							backPic:this.backPic
						}
						const peerTo = this.peer>0? `/peer/to/${this.peer}` :''
						app.http.Post(`cardIllustration/err/${this.code}${peerTo}`,params,(res:any)=>{
							uni.showToast({
								title:'提交成功'
							});
							uni.redirectTo({
								url: '/pages/illustration/report/record'
							})
						})
					}
                }
            })
		}
	}
</script>

<style lang="scss">
	page{
        background:#fff;
    }
	.content{
		width: 100%;
		padding:20rpx;
		box-sizing: border-box;
	}
	.error-box{
		width: 100%;
		box-sizing: border-box;
		padding:10rpx 20rpx;
		padding-bottom: env(safe-area-inset-bottom);
		.title{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin-bottom: 22rpx;
		}
		.pic-box{
			width: 100%;
			height:200rpx;
			display: flex;
		}
		.pic-index{
			width: 162rpx;
			height:162rpx;
			position: relative;
			margin-right: 25rpx;

		}
		.pic{
			width: 162rpx;
			height:162rpx;
			border-radius: 3rpx;
		}
		.pic-close{
			width: 50rpx;
			height:50rpx;
			position: absolute;
			right:-10rpx;
			top:-10rpx;
			background: url(@/static/illustration/icon_close.png) no-repeat center /100% 100%;
		}
		.upload-box{
			width: 162rpx;
			height: 162rpx;
			border: 1px dashed #dadbde;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 25rpx;
			flex-wrap: wrap;
			padding:30rpx 0;
			box-sizing: border-box;
		}
		.upload-msg{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
			text-align: center;
		}
		.icon-add{
			width: 41rpx;
			height:41rpx;
		}
		.tips{
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
		}
		.btn{
			width: 100%;
			height:92rpx;
			background: #FA1545;
			border-radius: 5rpx;
			margin:0 auto;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
			line-height: 92rpx;
			margin-top: 124rpx;
		}
	}
	
</style>
