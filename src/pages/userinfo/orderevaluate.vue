<template>
	<view class="content">
		<view class="center">
			<view>
				<view class="center-desc">
					<image class="desc-img" :src="goodsData.pic?getGoodsImg(decodeURIComponent(goodsData.pic)):''" mode="aspectFill"></image>
					<view class="desc-right">
						<view class="desc-title">{{goodsData.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="evaluate">
			<view class="eva-title">总体评价</view>
			<view class="eva-star" :class="starIndex>=index?'star-check':''" v-for="(item,index) in starStr" :key="index" @click="onClickStar(index)"></view>
			<view class="eva-desc">{{starStr[starIndex]}}</view>
		</view>
		<view class="index">
			<textarea maxlength="200" class="index-texta" auto-height="true" v-model="complainText" placeholder="说说您对本次购物的评价吧.." />
		</view>
		<view class="initiate-index">
			<view class="add-img-content">
				<image v-show="evaimages!=''" v-for="(item,index) in imgData" :key="index" class="good-pic" :src="item" mode="aspectFit"></image>
				<view class="add-img" @click="onClickAddImg"><view class="icon-add"></view></view>
			</view>
		</view>
		<view class='btn-content' @click="onClickConfirm">提交</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { getGoodsImg } from "../../tools/util";
	import ossUtils from "../../tools/ossUtils";
	@Component({})
	export default class ClassName extends BaseNode {
		ossutils = ossUtils.getInstance();
		evaimages = '';
		imgData:any = [];
		code = '';
		goodsData:{[x:string]:any} = {};
		getGoodsImg = getGoodsImg;
		complainText = '';
		starIndex = -1;
		starStr = ['很差','一般','不错','满意','超棒'];
		onLoad(query:any) {
			if(query){
				this.code = query.code;
				this.goodsData = JSON.parse(query.data);
			}
		}
		onClickStar(index:number){
			if(this.starIndex==index) return;

			this.starIndex = index
		}
		async onClickAddImg(){
			let images = await this.ossutils.getImages();
			for (let index = 0; index < images.length; index++) {
				const imageSrc = images[index];
				let filePath = 'images/'+ this.ossutils.getFileName(imageSrc); // 自定义上传后的文件名称
				let sign: any = await this.ossutils.getSTS(); // 获取签名等信息
				uni.showLoading({
					title: '上传图片中...'
				});
				uni.uploadFile({
					url: sign.host,
					filePath: imageSrc,
					fileType: 'image',
					name: 'file',
					formData: {
						key: filePath,
						policy: sign.policy,
						OSSAccessKeyId: sign.accessId,
						success_action_status: '200',
						//让服务端返回200,不然，默认会返回204
						signature: sign.signature,
						'x-oss-security-token': sign.security_token
					},
					success: (res: any) => {
						uni.hideLoading();
						if (res.statusCode == 200) {
							if(this.imgData.length>0){
								this.evaimages+=','
							}
							this.evaimages+=sign.host + '/' + filePath;
							this.imgData.push(sign.host + '/' + filePath)
						}
					},
					fail: (err) => {
						uni.hideLoading();
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					}
				});
			}
		}
		onClickConfirm(){
			let params:{[x:string]:any} = {
				star:this.starIndex+1
			}
			if(this.complainText!=''){
				params.content = encodeURIComponent(this.complainText)
			}
			if(this.evaimages!=''){
				params.pics = encodeURIComponent(this.evaimages)
			}
			app.http.Post('order/appraise/'+this.code,params,(res:any)=>{
				uni.$emit('orderchange')
				setTimeout(()=>{
					uni.showToast({
						title:'评价成功',
						icon:'none'
					})
				},100)
				
				this.complainText = ''
				uni.navigateBack({
					delta:1
				})
			})
		}
	}
</script>

<style>
	.content{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
		padding-bottom: 100rpx;
		
	}
	.center{
		width:100%;
		box-sizing: border-box;
		border-bottom: 1px solid #F4F3F2;
		padding:30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.center{
		width:100%;
		box-sizing: border-box;
		border-bottom: 14rpx solid #F5F5F9;
		padding:45rpx 30rpx 30rpx 30rpx;
	}
	.center-desc{
		width: 100%;
		height:185rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.desc-img{
		width: 204rpx;
		height:185rpx;
		border-radius: 10rpx;
		margin-right: 26rpx;
	}
	.desc-right{
		width: 460rpx;
		height:185rpx;
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	.desc-title{
		width: 460rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 50rpx;
		word-break: break-all;
	}
	.index{
		width: 100%;
		box-sizing: border-box;
		padding:0 30rpx 30rpx 30rpx;
	}
	.index-texta{
		width: 100%;
		font-size: 26rpx;
		
		font-weight: normal;
		color: #7B7B7B;
		line-height: 40rpx;
	}
	.btn-content{
		background:#4DCDCC;
		width: 590rpx;
		height:80rpx;
		text-align: center;
		line-height: 80rpx;
		position: fixed;
		left:80rpx;
		bottom:30rpx;
		font-size: 30rpx;
		
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
	.evaluate{
		width: 100%;
		height:120rpx;
		box-sizing: border-box;
		padding:0 30rpx;
		display: flex;
		align-items: center;
	}
	.eva-title{
		height:100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		
		font-weight: bold;
		color: #3B3B3B;
		margin-right: 30rpx;
	}
	.eva-star{
		width: 49rpx;
		height:47rpx;
		background:url(../../static/userinfo/icon_xing2.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 24rpx;
	}
	.star-check{
		width: 49rpx;
		height:47rpx;
		background:url(../../static/userinfo/icon_xing1.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 24rpx;
	}
	.eva-desc{
		height:100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		
		font-weight: normal;
		color: #7B7B7B;
		padding-left:10rpx
	}
	.initiate-index{
		width: 100%;
		box-sizing: border-box;
		padding:30rpx 30rpx 0 30rpx;
		border-bottom: 14rpx solid #F5F5F9;
	}
	.add-img-content{
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 58rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.add-img{
		width: 206rpx;
		height:204rpx;
		background: #FFFFFF;
		border: 1px dashed #7B7B7B;
		border-radius: 10rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
	}
	.icon-add{
		width: 35rpx;
		height:35rpx;
		background:url(../../static/index/icon_add.png) no-repeat center;
		background-size: 100% 100%;
	}
	.good-pic{
		width: 208rpx;
		height:206rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		background:#F5F5F9
	}
</style>
