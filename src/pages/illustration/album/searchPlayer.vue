<template>
	<view class="search-player">
		<view class="player-header"> 
			<view class="input-box">
				<view class="search-icon"></view>
				<input class="input-operate" :adjust-position="false" v-model="searchQ" placeholder='搜索球员' @confirm="onClickConfirm"/>
			</view>
		</view>
		<view class="card-list">
            <view class="no-index" v-for="(item,index) in noList" :key="`noList_${index}`" @click="onClickSelectPlayer(item)">
                <view class="no-header">
                    <view class="left">
                        <view class="name">{{ item.player}}</view>
                        <view class="num">
                            <text class="num-text">{{item.total}}</text>张卡片
                        </view>
                    </view>
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <u-loadmore v-show="noParams.end" status="nomore" line/>
        </view>
	</view>
</template>

<script lang="ts">
	import { app } from '@/app';
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	class NoParams {
        fetchFrom=1;
        fetchSize=20;
        end = false;
    }
	@Component({})
	export default class ClassName extends BaseNode {
		seriesCode="";
		searchQ="";
		noParams = new NoParams();
		noList = [];
		onLoad(query: any) {
			if(query.code){
				this.seriesCode = query.code;
			}
		}
		onReachBottom() {
			this.getNoGroup();
		}
		onClickSelectPlayer(item:any){
			uni.$emit("albumSelectPlayer",item);
			app.navigateTo.navigateBack()
		}
		onClickConfirm(){
			this.noParams = new NoParams();
			this.getNoGroup();
		}
		getNoGroup(){
            if(this.noParams.end)  return;
            uni.showLoading({
				title: '加载中'
			});
            const get = `group=player`;
            const { fetchFrom, fetchSize } = this.noParams;
            const params = {
                fetchFrom,
                fetchSize,
                q:this.searchQ,
            }
            app.http.PostWithCrypto(`dataApi/cardIllustration/series/${this.seriesCode}/search/no/group?${get}`,params,(res:any)=>{
                if(res.groups){
                    const list = res.groups||[]
                    this.noList = fetchFrom==1 ? list : [...this.noList,...list];
                }
                uni.hideLoading();
                this.noParams.fetchFrom += fetchSize;
                this.noParams.end = res.end || res.groups.length<10;
            })
        }
	}
</script>

<style lang="scss">
	@mixin flex {
        display: flex;
        justify-content: center;
    }
	page{
        background:#F6F7F8;
    }
	.player-header{
		width: 100%;
        height:99rpx;
        @include flex;
        box-sizing: border-box;
		background:#fff;
		padding-top: 10rpx;
	}
	.input-box{
        width: 682rpx;
        height: 69rpx;
        background:#F5F5F5;
        border-radius:3rpx;
        box-sizing: border-box;
        padding-left: 72rpx;
        position: relative;
    }
    .input-operate{
        width: 100%;
        height: 69rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
    }
    .search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(@/static/index/sousuo@2x.png) no-repeat center / 100% 100%;
		position: absolute;
		left:32rpx;
		top:50%;
		margin-top: -14rpx;
	}
	.card-list{
        width: 100%;
        box-sizing: border-box;
        padding:20rpx;
        padding-bottom:179rpx;
        padding-bottom:calc(179rpx + env(safe-area-inset-bottom));
    }
    .no-index{
        width: 100%;
        border-radius: 3rpx;
        background: #fff;
        margin-bottom: 15rpx;
        box-sizing: border-box;
        .no-header{
            width: 100%;
            padding: 20rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                width: 600rpx;
                .name{
                    width: 100%;
                    font-size: 25rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    margin-bottom: 15rpx;
                }
                .num{
                    font-size: 25rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                }
                .num-text{
                    font-weight: 600;
                }
            }
        }
        .no-center{
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 20rpx;
            .card-index{
                padding:0;
                width: 670rpx;
                margin:0 auto;
                .card-team{
                    margin-top: 20rpx;
                }
                .cardset{
                    margin-bottom: 20rpx;
                }
            }
        }
    }
</style>
