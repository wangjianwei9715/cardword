<template>
	<view class="content">
		<view class="orther-setting">
			<view
				class="setting"
				v-for="item in settingTab"
				:key="item.id"
				@click="onClickEdit(item.id)"
			>
				<view v-if="item.id==1">
					<muqian-lazyLoad class="avatar" :src="item.avatar!=''?item.avatar:defaultAvatar" mode="" />
				</view>
				<view v-else class="name">{{ item.name }}</view>

				<view v-if="item.id==4" class="right">
					<picker @change="bindPickerChange" :value="sexIndex" :range="sexArray">
                        <view >{{sexIndex>=0?sexArray[sexIndex]:'请选择'}}</view>
                    </picker>
					<view class="icon-right"></view>
				</view>
				<view v-else-if="item.id==5" class="right" >
					<picker  mode="date" @change="bindDateChange" :value="dateValue" >
                        <view>{{dateValue==''?'请选择':dateValue}}</view>
                    </picker>
					<view class="icon-right"></view>
				</view>
				<view v-else class="right" @click="onClickC(item.id)">
					{{ item.desc }}
					<view class="icon-right"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import ossUtils from "../../tools/ossUtils";
	@Component({})
	export default class ClassName extends BaseNode {
		defaultAvatar = app.defaultAvatar
		settingTab:{[x: string]: any} = {
			avatar:{ id: 1, name: "头像",avatar:'',desc:''},
			name:{ id: 2, name: "修改昵称", desc:''},
			sign:{ id: 3, name: "个性签名", desc:''},
			sex:{ id: 4, name: "性别", desc:''},
			birth:{ id: 5, name: "生日",desc:''},
			userId:{ id: 6, name: "ID", desc:''}
		};
		sexArray:any = ['男','女'];
		sexIndex:any = -1;
		ossutils = ossUtils.getInstance();
		changeAvatar = '';
		changeAvatarOne = false;
		dateValue = '';
		clearNum = 0;
		onLoad(query:any) {
			if(query.data){
				let data;
				data = JSON.parse(query.data)
				for (const key in this.settingTab) {
					if (Object.prototype.hasOwnProperty.call(data, key)) {
						if(key=='avatar'){
							this.settingTab[key].avatar = decodeURIComponent(data[key]);
						}else{
							this.settingTab[key].desc = data[key];
						}
						
					}
				}
			}
			this.onEventUI('finishName',(res:any)=>{
				this.settingTab.name.desc = res.name
			});
			this.onEventUI('finishSign',(res:any)=>{
				this.settingTab.sign.desc = res.sign
			});
			this.onEventUI('finishAvatar',(res:any)=>{
				if(!this.changeAvatarOne){
					this.changeAvatarOne = true
					this.onClickAddImg(res.image);
				}
			});
		}
		bindPickerChange(val:any){
			this.sexIndex = val.detail.value
			
		}
		bindDateChange(val:any){
			this.dateValue = val.detail.value
		}
		onClickEdit(id:any){
			if(id==1){
				this.onClickChangeAvatar()
			}
			if(id==2){
				uni.navigateTo({url:'/pages/userinfo/setting_name?name='+this.settingTab.name.desc});
			}
			if(id==3){
				uni.navigateTo({url:'/pages/userinfo/setting_sign?sign='+this.settingTab.sign.desc});
			}
			

		}
		async onClickAddImg(src:any){
			let filePath = 'images/'+ this.ossutils.getFileName(src); // 自定义上传后的文件名称
			let sign: any = await this.ossutils.getSTS(); // 获取签名等信息
			uni.showLoading({
				title: '上传图片中...'
			});
			uni.uploadFile({
				url: sign.host,
				filePath: src,
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
						let avatar = sign.host + '/' + filePath
						this.changeAvatar = avatar
						this.postEdit((res:any)=>{
							uni.showToast({
								title:'头像审核中,过审后将立即更新',
								icon:'none'
							})
							
						})
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
		async onClickChangeAvatar(){
			let imageSrc = await this.ossutils.getImage();

			uni.navigateTo({
				url: "/pages/userinfo/setting_avatar?data=" + encodeURIComponent(JSON.stringify(imageSrc))
			})
		}
		postEdit(cb?:Function){
			let params = {
				avatar:encodeURIComponent(this.changeAvatar),
			}
			app.http.Post('me/editAvatar',params,(res:any)=>{
				if(cb) cb(res)
 			})
		}
		onClickC(id:number){
			if(id!=6) return;
			if(this.clearNum<9){
				this.clearNum++;
			}else{
				this.clearNum = 0;
				uni.removeStorageSync('launchUrl');
				uni.removeStorageSync('configLaunchUrl');
				uni.removeStorageSync('launchData');
				uni.showToast({
					title:'已清除launch',
					icon:'none'
				})
			}
		}
		
	}
</script>

<style lang="scss">
	.icon-right {
		width: 10rpx;
		height: 16rpx;
		background: url(../../static/goods/jinru@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 8rpx;
	}
	.orther-setting {
		width: 100%;
		box-sizing: border-box;
		padding: 0 32rpx;
		.setting {
			width: 100%;
			box-sizing: border-box;
			padding:32rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #f1f1f4;
			.name {
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: #14151a;
			}
			.avatar{
					width: 100rpx;
					height:100rpx;
					border-radius: 50%;
				}
			.right {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #aaaabb;
			}
		}
	}
</style>
