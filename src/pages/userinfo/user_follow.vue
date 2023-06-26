<template>
	<view class="followContent">
		<!-- <u-sticky bgColor="#fff">
			<u-tabs :list="tab.list" :current="tab.index" @click="onClickTab"></u-tabs>
		</u-sticky> -->
		<!-- view. -->
		<!-- <view class='follow uni-flex' v-for="(item, index) in currentList" :key='index' @click='toDetail(item)'>
			<template>
				<muqian-lazyLoad :src='decodeURIComponent(item.logo)' class="follow-avart" mode="aspectFill" />
				<view class="follow-info uni-flex">
					<view class="name">{{ item.name }}</view>
					<view class="num">在售{{ item.sale_num }}件</view>
				</view>
				<view class="follow-action">
					<followButton :follow='item.follow || true' :followID='item.alias'
						@handleSuccess='followSuccess($event, item, index)'></followButton>
				</view>
			</template>
		</view> -->
		<!-- <empty v-if='empty'></empty> -->
	</view>
</template>

<script lang="ts">
import {
	app
} from "@/app";
import {
	Component,
	Watch
} from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
interface Tab {
	name: string;
	url: string;
	queryParams: any
	isFetchEnd: boolean
	dataList: Array<any>
}
interface FollowTab {
	index: number;
	list: Array<Tab>
}
const queryParams = {
	fetchFrom: 1,
	fetchSize: 15
}
const tabList = [
	{ name: "用户", url: "cardCircle/me/follow/user" },
	{ name: "商家", url: "me/follows/list" },
	{ name: "话题", url: "cardCircle/follow/topic" },
	{ name: "图鉴", url: "cardCircle/follow/tujian" }
]
@Component({})
export default class ClassName extends BaseNode {
	followList: any = [];
	totalPage = 0;
	queryParams = {
		pageIndex: 1,
		pageSize: 20
	};
	empty = false;
	tab: FollowTab = {
		index: 0,
		list: []
	}
	@Watch('tab.index')
	onTabIndexChange(val: any, oldVal: any) {
		if (!this.current.dataList.length) {
			this.current.queryParams.fetchFrom = 1
			this.reqData()
		}
	}
	onLoad() {
		tabList.forEach((item: any) => {
			const assignItem = JSON.parse(JSON.stringify({ ...item, queryParams, dataList: [], isFetchEnd: true }))
			this.tab.list.push(assignItem)
		})
		this.reqData()
		// this.getFollowList();
		// this.onEventUI('followAction', ((res: any) => {
		// 	if (!res || !res.alias) return
		// 	const findIndex = this.followList.findIndex((item: any) => {
		// 		return item.alias == res.alias
		// 	})
		// 	//取关
		// 	if (!res.followed && findIndex >= 0) this.followList.splice(findIndex, 1);
		// }))
	}
	onPullDownRefresh() {
		// this.queryParams.pageIndex = 1;
		// this.getFollowList();
		this.current.queryParams.fetchFrom = 1
		this.reqData(() => {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
		})
	}
	onReachBottom() {
		if (this.current.isFetchEnd) return
		this.current.queryParams.fetchFrom += this.current.queryParams.fetchSize
		this.reqData()
		// if (this.queryParams.pageIndex < this.totalPage) {
		// 	this.queryParams.pageIndex += 1;
		// 	this.getFollowList();
		// }
	}
	public get currentList() {
		return this.tab.list[this.tab.index].dataList
	}
	public get current() {
		return this.tab.list[this.tab.index]
	}
	onClickTab(tab: any) {
		(this.tab.index != tab.index) && (this.tab.index = tab.index)
	}
	reqData(cb?: Function): void {
		app.http.Get(this.current.url, this.current.queryParams, (res: any) => {
			this.current.isFetchEnd = res.isFetchEnd ?? true
			const list = res.list || []
			this.current.dataList = res.list
			this.current.queryParams.fetchFrom == 1 ? this.current.dataList = list : this.current.dataList.push(...list)
		})
	}
	getFollowList() {
		app.http.Get("me/follows/list", this.queryParams, (res: any) => {
			this.totalPage = res.totalPage;
			if (res.total == 0) {
				this.empty = true
			} else {
				this.empty = false
			};
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
		this.goMerchantPage(item.alias)
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
