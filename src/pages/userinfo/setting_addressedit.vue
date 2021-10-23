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
		<view class="add-btn" @click="onClickAddressConfirm">保存</view>
		<view class="default-index">
			设为默认地址<switch style="margin-left:20rpx" color="#14151B" :checked="addressDefault" @change="onClickDefault" />
		</view>
		
		
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		address = '浙江省杭州市西湖区';
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
				// #ifndef MP 
				this.editData = JSON.parse(query.data);
				// #endif
				// #ifdef MP
				this.editData = JSON.parse(decodeURIComponent(query.data));
				// #endif
				
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
		min-height: 98rpx;
		box-sizing: border-box;
		padding: 0 32rpx;
		background: #fff;
		
	}

	.setting-view {
		width: 100%;
		min-height: 98rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1px solid #F4F3F2;
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
		font-size: 26rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
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
		height:60rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
	}
	.add-btn{
		width: 718rpx;
		height: 88rpx;
		background: #14151B;
		border-radius: 4rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		margin-top: 40rpx;
		box-sizing: border-box;
		margin-bottom: 60rpx;
	}
</style>
