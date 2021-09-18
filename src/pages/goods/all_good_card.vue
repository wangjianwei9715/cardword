<template>
	<view class="content">
		<view class="tab-header">
			<searchinput :searchText="'搜索球员、球队'" @clicksearch="onClickSearch()"></searchinput>
			<image src="../../static/goods/icon_fanyi.png" style="width: 42rpx; height: 40rpx; margin: 0 28rpx;"
				@click="onClickTranslate()">
			</image>
		</view>

		<view class="item-content">
			<view class="title-middle" v-for="(item,index) in itemListName" :key="index">
				<text class="text-name">{{item}}</text>
			</view>
		</view>

		<!-- 单数行用灰色背景，双数行用白色背景 -->
		<view :class="index%2==0?'title-middle2':'title-middle3'" v-for="(item,index) in teamDataList" :key="index">
			<text class="text-name">{{item.team}}</text>
			<text class="text-name">{{item.name}}</text>
			<text class="text-name">{{item.xb}}</text>
			<text class="text-name">{{item.cardtype}}</text>
			<text class="text-name">{{item.bh}}</text>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		itemListName=['球队','球员','限编','卡种','编号'];
		teamDataList = [{
				team: '圣安东尼奥马刺队',
				name: '帕特里克·威廉姆斯',
				xb: '49',
				cardtype: 'Apprentice Lnk',
				bh: '14'
			},
			{
				team: '圣安东尼奥马刺队',
				name: '帕特里克·威廉姆斯',
				xb: '49',
				cardtype: 'Apprentice Lnk',
				bh: '14'
			},
			{
				team: '圣安东尼奥马刺队',
				name: '帕特里克·威廉姆斯',
				xb: '49',
				cardtype: 'Apprentice Lnk',
				bh: '14'
			},
			{
				team: '圣安东尼奥马刺队',
				name: '帕特里克·威廉姆斯',
				xb: '49',
				cardtype: 'Apprentice Lnk',
				bh: '14'
			}
		];
		onLoad(query: any) {

		}

		onClickSearch() {
			console.log('搜索')
		}

		onClickTranslate() {
			console.log('翻译')
			uni.navigateTo({
				url:'confirmorder'
			})
		}
	}
</script>

<style lang="scss">
	$font-22:22rpx;
	$font-24:24rpx;

	.tab-header {
		width: 100%;
		height: 104rpx;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		z-index: 10;
	}

	.item-content{
		width: 710rpx;
		height: 60rpx;
		background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.title-middle {
		font-size: $font-22;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 32rpx;
	}

	.title-middle2 {
		width: 710rpx;
		height: 100rpx;
		background: #F6F6F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.title-middle3 {
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.text-name {
		width: 25%;
		text-align: center;
		margin-left: 10rpx;
	}

</style>
