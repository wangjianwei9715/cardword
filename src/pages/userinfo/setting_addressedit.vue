<template>
	<view class="content">
		<view class="setting-index">
			<view class="setting-view">
				<view class="left-content">
					<text class="left-title">收货人</text>
				</view>
				<input class="input-content" type="text" v-model="userName" placeholder="请输入收货人姓名" @input="onInputName"/>
			</view>
		</view>
		<view class="setting-index">
			<view class="setting-view">
				<view class="left-content">
					<text class="left-title">手机号</text>
				</view>
				<input class="input-content" type="number" v-model="userPhone"  placeholder="请输入收货人手机号" @input="onInputName"/>
			</view>
		</view>
		<view class="setting-index" @click="onClickAddress">
			<view class="setting-view">
				<view class="left-content">
					<text class="left-title">所在地区</text>
				</view>
				<view class="input-content"><text :style="address==''?'color:#BABDC7':'color:#3C3C3C'">{{address!=''?address:'省份、城市、区县'}}</text></view>
				<button class="btn-back">&#xe470;</button>
			</view>
		</view>
		<view class="setting-index">
			<view class="setting-view">
				<view class="left-content">
					<text class="left-title">详细地址</text>
				</view>
				<input class="input-content" type="text" placeholder="街道、小区、门牌号" v-model="addressDetail" @input="onInputName"/>
			</view>
		</view>
		<view class="default-index">
			<view :class="addressDefault?'adress-default':'icon-default'" @click="onClickDefault"></view>设为默认地址
		</view>
		
		<view class="add-btn" @click="onClickAddressConfirm">保存</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		address = '';
		userName = '';
		userPhone = '';
		addressDetail = '';
		addressDefault = false
		editData:{[x:string]:any} = []
		onLoad(query:any) {
			if (query.title) {
				uni.setNavigationBarTitle({title: query.title});
			}else{
				uni.setNavigationBarTitle({title: '地址编辑'});
			}

			if(query.data){
				console.log(query.data)
				this.editData = JSON.parse(query.data);
				this.userName = this.editData.name;
				this.userPhone = this.editData.phone;
				this.address = this.editData.district;
				this.addressDetail = this.editData.detail;
				this.addressDefault = this.editData.default;
			}
		}
		onInputName(){
		}
		onClickAddress(){
			uni.chooseLocation({
				keyword:'中国',
				success:(res)=>{
					this.address = res.address+' '+res.name;
				}
			});
		}
		onClickDefault(){
			this.addressDefault = !this.addressDefault
		}
		onClickAddressConfirm(){
			if(this.userName==''){
				uni.showToast({
					title:'请输入收货人姓名',
					icon:'none',
				})
				return;
			}
			if(this.userPhone==''){
				uni.showToast({
					title:'请输入收货人手机号',
					icon:'none',
				})
				return;
			}
			if(this.address==''){
				uni.showToast({
					title:'请选择所在地区',
					icon:'none',
				})
				return;
			}
			if(this.addressDetail==''){
				uni.showToast({
					title:'请输入详细地址',
					icon:'none',
				})
				return;
			}
			let isDefault = 0;
			if(this.addressDefault){
				isDefault = 1;
			}
			let url = 'me/delivery/add';
			let params:{[x:string]:any} = {
				name:this.userName,
				phone:this.userPhone,
				district:this.address,
				detail:this.addressDetail,
				isDefault:isDefault
			}
			if(this.editData.id){
				params.id = this.editData.id
				url = 'me/delivery/edit'
			}
			app.http.Post(url,params,(res:any)=>{
				uni.$emit('addressedit')
				uni.navigateBack({
				    delta: 1
				});
			})
		}
	}
</script>

<style>
	.setting-index {
		width: 100%;
		min-height: 125rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
		background: #fff;
		border-bottom: 1px solid #F4F3F2;
	}

	.setting-view {
		width: 100%;
		min-height: 125rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
	.left-content{
		width: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.left-title {
		width: 120rpx;
		font-size: 30rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #3C3C3C;
		line-height: 40rpx;
	}

	.input-content{
		width: 500rpx;
		min-height: 110rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		box-sizing: border-box;
		padding:20rpx 32rpx;
		color:#3C3C3C;
		word-wrap: break-word;
		word-break: break-all;
		display:flex;
		align-items: center;
		font-size: 28rpx;
		line-height: 36rpx;
		margin:0;
	}
	.btn-back {
		width: 50rpx;
		height: 50rpx;
		background-color: rgba(0, 0, 0, 0);
		font-family: uniicons;
		font-size: 28rpx;
		font-weight: normal;
		font-style: normal;
		line-height: 50rpx;
		color: #747474;
		margin: 0
	}
	.default-index{
		width: 100%;
		box-sizing: border-box;
		padding:0 32rpx;
		height:100rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
	}
	.icon-default{
		width: 29rpx;
		height:29rpx;
		background:url(../../static/userinfo/icon_check.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 16rpx;
	}
	.adress-default{
		width: 29rpx;
		height:29rpx;
		background:url(../../static/userinfo/icon_check_.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 16rpx;
	}
	.add-btn{
		width: 690rpx;
		height: 78rpx;
		background: #4DCDCC;
		border-radius: 39rpx;
		position: fixed;
		bottom:70rpx;
		left:50%;
		margin-left:-345rpx;
		text-align: center;
		line-height: 78rpx;
		font-size: 36rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #FFFFFF;
	}
</style>
