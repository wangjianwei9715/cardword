<template>
	<view class="content">
		<view class="tabsContainer">
			<view class="tabs" @click="onClickTab(index)" v-for="(item, index) in tab.list"
				:class="{ tabs_select: index == tab.index }">
				{{ item.name }}
			</view>
		</view>
		<view class="listContainer">
			<template v-if="tab.index == 0">
				<view class="userItem" v-for="(item, index) in currentList" :key="index" @click="goPersonHome(item)">
					<muqian-lazyLoad class="avatar"
						:src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : defaultAvatar"
						borderRadius="50%"></muqian-lazyLoad>
					<view class="userInfo">
						<view class="userName">{{ item.userName }}</view>
						<view class="userData">
							粉丝{{ item.fans }} {{ item.dtNum ? ` | 动态${item.dtNum}` : "" }}
						</view>
					</view>
					<view class="followButton flexCenter" @click.stop="onClickFollow(item, index, 0)">已关注</view>
				</view>
			</template>
			<template v-if="tab.index == 1">
				<view class="userItem" v-for="(item, index) in currentList" :key='index' @click='toDetail(item)'>
					<muqian-lazyLoad :src='decodeURIComponent(item.logo)' class="avatar" mode="aspectFill" />
					<view class="userInfo">
						<view class="userName">{{ item.name }}</view>
						<view class="userData">在售{{ item.sale_num }}件</view>
					</view>
					<!-- <followButton :follow='item.follow || true' :followID='item.alias'
							@handleSuccess='followSuccess($event, item, index)'></followButton> -->
					<view class="followButton flexCenter" @click.stop="onClickFollow(item, index, 1)">
						已关注

					</view>
				</view>
			</template>
			<template v-if="tab.index == 2">
				<topicList :value="currentList"></topicList>
			</template>
			<template v-if="tab.index == 3">
				<view class="userItem" v-for="(item, index) in currentList" :key="index" @click="goTuj(item)">
					<muqian-lazyLoad class="avatar" style="border-radius: 0rpx;"
						:src="$parsePic(decodeURIComponent(item.logo))" borderRadius="3rpx"></muqian-lazyLoad>
					<view class="userInfo">
						<view class="userName">{{ item.name }}</view>
						<view class="userData">
							图鉴完成度 {{ item.uploadNum }}/{{ item.totalNum }}
						</view>
					</view>
					<view class="followButton flexCenter" @click.stop="onClickFollow(item, index, 3)">已关注</view>
				</view>
			</template>
			<empty v-if="!currentList.length"></empty>
		</view>
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
import { followActionByUser } from "@/pages/cardForum/func"
import topicList from "@/pages/cardForum/components/topicList.vue"
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
	{ name: "话题", url: "cardCircle/me/follow/topic" },
	{ name: "图鉴", url: "cardCircle/me/follow/tujian" }
]
@Component({
	components: {
		topicList
	}
})
export default class ClassName extends BaseNode {
	followList: any = [];
	totalPage = 0;
	queryParams = {
		pageIndex: 1,
		pageSize: 20
	};
	defaultAvatar = app.defaultAvatar
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
	goPersonHome(item: any) {
		uni.navigateTo({
			url: "/pages/cardForum/personHomePage?userId=" + item.userId
		})
	}
	onClickFollow(item: any, index: number, tabIndex: number) {
		uni.showModal({
			title: '提示',
			content: "确认不再关注?",
			success: (res: any) => {
				if (res.confirm) {
					if (tabIndex == 0) {
						followActionByUser(item.userId, true).then(() => {
							this.tab.list[tabIndex] && this.tab.list[tabIndex].dataList.length && this.tab.list[tabIndex].dataList.splice(index, 1)
						})
					}
					if (tabIndex == 1) {
						app.http.Post("merchant/1/follow/" + item.alias, {}, (res: any) => {
							// this.$emit("handleSuccess", res.data);
							uni.$emit('followAction', {
								...res.data,
								alias: item.alias
							})
							this.tab.list[tabIndex] && this.tab.list[tabIndex].dataList.length && this.tab.list[tabIndex].dataList.splice(index, 1)
						});
					}
					if (tabIndex == 3) {
						// const type = this.seriesData.followed ? 'unfollow' : 'follow';
						app.http.Post(`cardIllustration/series/${item.code}/unfollow`, {}, (res: any) => {
							this.tab.list[tabIndex] && this.tab.list[tabIndex].dataList.length && this.tab.list[tabIndex].dataList.splice(index, 1)
							// !this.seriesData.followed && uni.showToast({ title: '关注成功', icon: 'none' });
							// this.seriesData.followed = !this.seriesData.followed;
						})
					}
				}
			}
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
	onClickTab(index: any) {
		(this.tab.index != index) && (this.tab.index = index)
	}
	reqData(cb?: Function): void {
		app.http.Get(this.current.url, this.current.queryParams, (res: any) => {
			this.current.isFetchEnd = res.isFetchEnd ?? true
			const list = res.list || []
			this.current.dataList = res.list
			this.current.queryParams.fetchFrom == 1 ? this.current.dataList = list : this.current.dataList.push(...list)
		})
	}
	goTuj(item:any){
		uni.navigateTo({
			url:`/pages/illustration/seriesDetail?seriesCode=${item.code}`
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
.tabsContainer {
	display: flex;
	flex-wrap: nowrap;
	width: 750rpx;
	margin-top: 34rpx;

	.tabs {
		width: 25%;
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #959695;
		text-align: center;
		padding-bottom: 13rpx;
	}

	.tabs_select {
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		border-bottom: 6rpx solid #FA1545;
	}
}

.listContainer {
	width: 750rpx;
	box-sizing: border-box;
	// padding: 0 34rpx;
}

.userItem {
	display: flex;
	align-items: center;
	margin-top: 52rpx;
	box-sizing: border-box;
	padding: 0 34rpx;

	.avatar {
		width: 73rpx;
		height: 73rpx;
		// background: #FA1545;
		border-radius: 50%;
		margin-right: 22rpx;
	}

	.userInfo {
		flex: 1;
		justify-content: center;
		display: flex;
		flex-direction: column;

		.userName {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-bottom: 8rpx;
		}

		.userData {
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
		}


	}

	.followButton {
		width: 115rpx;
		height: 48rpx;
		border: 1rpx solid #C0C0C0;
		border-radius: 3rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C0C0;
	}
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
