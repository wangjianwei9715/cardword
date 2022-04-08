<template>
	<view class="followContent">
		<view class='follow uni-flex' v-for="(item,index) in followList" :key='index'>
			<image :src='decodeURIComponent(item.logo)' class="follow-avart" mode="aspectFill" />
			<view class="follow-info uni-flex">
				<view class="name">{{item.name}}</view>
				<view class="num">在售{{item.num}}件</view>
			</view>
			<view class="follow-action">
				<followButton :follow='item.follow||true' :followID='item.id'
					@handleSuccess='followSuccess($event,item,index)'></followButton>
				<!-- <view class="actionItem" @click="cancleFollow">已关注</view> -->
			</view>
		</view>
		<empty v-if='!followList.length'></empty>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	@Component({})
	export default class ClassName extends BaseNode {
		followList: any = [];
		totalPage = 0;
		queryParams = {
			pageIndex: 1,
			pageSize: 20
		}
		getFollowList() {
			app.http.Get('me/follows/list', this.queryParams, (res: any) => {
				this.totalPage = res.totalPage
				if (this.queryParams.pageIndex === 1) this.followList = []
				const dataList = res.list || []
				this.followList = [...this.followList, ...dataList]
			})
			uni.stopPullDownRefresh()
		}
		followSuccess(event: any, item: any, index: number) {
			this.queryParams.pageIndex = 1
			this.getFollowList()
		}
		onLoad() {
			this.getFollowList()
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1
			this.getFollowList()
		}
		onReachBottom() {
			// console.log(333)
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1
				this.getFollowList()
			}
		}
	}
</script>

<style lang='scss'>
	.followContent {
		padding: 0 41rpx;
	}



	.follow {
		margin-bottom: 37rpx;
		align-items: center;

		&-avart {
			width: 103rpx;
			height: 103rpx;
			display: block;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 37rpx;
		}

		&-info {
			flex-direction: column;
			flex: 1;

			.name {
				font-size: 26rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #333333;
				margin-bottom: 24rpx;
			}

			.num {
				font-size: 22rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #88878C;
			}
		}

		&-action {
			.actionItem {
				width: 122rpx;
				height: 44rpx;
				font-size: 22rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #88878c;
				line-height: 44rpx;
				text-align: center;
				letter-spacing: 1rpx;
				background-size: 100% 100%;
				background-image: url("../../static/userinfo/v2/whiteCard.png");
			}

			.redAction {
				background-image: url("../../static/userinfo/v2/redCard.png");
				color: #fff;
			}
		}
	}

	.follow:first-child {
		margin-top: 56rpx;
	}
</style>
