<template>
	<div class="content">
		<div v-if="apkNeedUpdate" class="update-content">
			<div class="panel-shadow" @touchmove.stop.prevent="doNothing"></div>
			<div class="panel-bg">
				<div class="panel-title">
					<image class="title-image" src="@/static/index/update_bg.png"/>
					<text class="panel-title-text">版本更新公告</text>
					<text class="panel-title-ver">V{{version}}</text>
				</div>
				<div class="panel-content">
					<div class="progress-msg">
						<text class="update-msg">
							{{updateMsg}}
						</text>
					</div>
					<text v-if="!updateStart" class="download-button" @click="onClickDownload">立即更新</text>
					<text v-else class="download-text">{{downloadText}}</text>
				</div>
			</div>
		</div>
		<div v-if="wgtUpdate" class="update-content">
			<div class="panel-shadow"></div>
			<div class="panel-bg">
				<div class="panel-title">
					<image class="title-image" src="@/static/index/update_bg.png"/>
					<text class="panel-title-text">正在更新</text>
					<text class="panel-title-ver">V{{version}}</text>
				</div>
				<div class="panel-content">
					<div class="progress-content"><progress :percent="wgtUpNum" active-mode="forwards" active
							stroke-width="6" border-radius="20px" activeColor="#FB4E3E" /></div>
					<text class="progress-wait">正在更新中，请您耐心等待...</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const app = getApp().globalData.app;
	export default {
		data(){
			return {
				apkNeedUpdate:false,
				updateStart:false,
				downloadText:'下载中：0 MB/0 MB, 0%',
				updateMsg:'暂无',
				version:"",
				wgtUpdate:false,
				wgtUpNum:0
			}
		},
		mounted(){
			uni.$on("apkNeedUpdate", (version) => {
				this.version = version;
				this.updateShow();
			});
			uni.$on("wgtNeedUpdate", (version) => {
				this.version = version;
				this.wgtUpdate = true;
			});
			uni.$on("wgtUpdateNum", (res) => {
				this.wgtUpNum = res;
			});
		},
		methods: {
			updateShow() {
				uni.hideTabBar();
				this.updateMsg = decodeURIComponent("");
				this.apkNeedUpdate = true;
			},
			onClickDownload() {
				// #ifdef APP-NVUE
				if (uni.getSystemInfoSync().platform == 'ios') {
					plus.runtime.openURL('https://itunes.apple.com/cn/app/id1593158816?mt=8')
					return;
				}
				let downloadTask = uni.downloadFile({
					url: app.update.apkData.pkg_url,
					success: (downloadResult) => {
						if (downloadResult.statusCode === 200) {
							let path = downloadResult.tempFilePath;
							plus.runtime.install(path, {
								force: true
							});
						}
					},
					fail: (result) => {
						console.error('install fail...', result);
					}
				});
				this.updateStart = true;
				downloadTask.onProgressUpdate((result) => {
					let downMB = Math.floor(result.totalBytesWritten / 1024 / 1024) + ' MB/' + Math.floor(result
						.totalBytesExpectedToWrite / 1024 / 1024) + ' MB'
					this.downloadText = '下载中：' + downMB + ', ' + result.progress + '%';
				});
				// #endif
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
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
	}
	.update-content {
		width: 750rpx;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.panel-shadow {
		width: 750rpx;
		position: absolute;
		background: rgba(0, 0, 0, 0.3);
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1001
	}
	.panel-bg {
		width: 500rpx;
		border-radius: 40rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0;
		z-index: 1002;
	}
	.panel-title {
		width: 500rpx;
		height: 188rpx;
		display: flex;
		flex-wrap: wrap;
		position: relative;
		padding: 50rpx 0 20rpx 0;
	}
	.title-image{
		width: 500rpx;
		height: 188rpx;
		position: absolute;
		left:0;
		top:0;
	}
	.panel-title-text {
		width: 500rpx;
		text-align: center;
		font-size: 43rpx;
		font-weight: 400;
		color: #FFFFFF;
		@include flexCenter
	}
	.panel-title-ver {
		width: 500rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
		@include flexCenter
	}

	.panel-content {
		width: 500rpx;
		height: 420rpx;
		background: #fff;
		text-align: center;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		@include flexCenter;
		flex-wrap: wrap;
	}

	.update-msg {
		width: 440rpx;
		font-size: 28rpx;
		color: #9397A7;
		line-height: 40rpx;
		text-align: left;
	}

	.progress-content {
		width: 374rpx;
		margin-top: 150rpx;
		border-radius: 7px;
		overflow: hidden;
	}

	.progress-msg {
		width: 500rpx;
		margin-top:80rpx;
		margin-bottom: 80rpx;
	}

	.progress-wait {
		width: 500rpx;
		text-align: center;
		font-size: 18rpx;
		@include flexCenter;
		font-weight: normal;
		color: #C0C0C0;
		margin-top: 18rpx;
	}

	.download-button {
		width: 400rpx;
		height: 88rpx;
		background: #FB4E3E;
		border-radius: 44rpx;
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 88rpx;
		@include flexCenter;
		text-align: center;
	}

	.download-text {
		height: 88rpx;
		margin-top: 10rpx;
		@include flexCenter
		font-size: 28rpx;
		color: #292929;
		line-height: 88rpx;
	}
</style>
