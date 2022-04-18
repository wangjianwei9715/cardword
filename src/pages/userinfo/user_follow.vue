<template>
	<view class="followContent">
		<view class='follow uni-flex' v-for="(item,index) in followList" :key='index' @click='toDetail(item)'>
			<template v-if="item.follow">
				<image :src='decodeURIComponent(item.logo)' class="follow-avart" mode="aspectFill" />
				<view class="follow-info uni-flex">
					<view class="name">{{item.name}}</view>
					<view class="num">在售{{item.sale_num}}件</view>
				</view>
				<view class="follow-action">
					<followButton :follow='item.follow||true' :followID='item.id'
						@handleSuccess='followSuccess($event,item,index)'></followButton>
				</view>
			</template>
		</view>
		<empty v-if='empty'></empty>
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
		};
		empty = false;
		onLoad() {
			this.getFollowList();
			this.onEventUI('followAction', ((res: any) => {
				if (!res || !res.id) return
				const findIndex = this.followList.findIndex((item: any) => {
					return item.id == res.id
				})
				//取关
				if (!res.followed && findIndex >= 0) this.followList.splice(findIndex, 1);
			}))
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1;
			this.getFollowList();
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1;
				this.getFollowList();
			}
		}
		getFollowList() {
			app.http.Get("me/follows/list", this.queryParams, (res: any) => {
				this.totalPage = res.totalPage;
				if(res.total == 0) this.empty = true;
				if (this.queryParams.pageIndex === 1) this.followList = [];
				const dataList = (res.list || []).map((item: any) => {
					item.follow = true;
					return item;
				});
				this.followList = [...this.followList, ...dataList];
			});
			uni.stopPullDownRefresh();
		}
		followSuccess(event: any, item: any, index: number) {
			this.followList.splice(index, 1);
		}
		toDetail(item: any) {
			uni.navigateTo({
				url: "/pages/userinfo/merchant_shopsV2?id=" + item.id
			});
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
			margin-right: 48rpx;
		}

		&-info {
			flex-direction: column;
			flex: 1;

			.name {
				font-size: 29rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				margin-bottom: 24rpx;
			}

			.num {
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #88878c;
			}
		}

	}

	.follow:first-child {
		margin-top: 56rpx;
	}
</style>
