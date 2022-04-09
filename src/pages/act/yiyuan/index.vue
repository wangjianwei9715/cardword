<template>
	<view class="content">
        <image class="banner" src="/pages/act/static/yiyuan/banner.jpg "></image>
        <view class="yiyuan-index">
            <view class="list">
                <view :class="[{'index':true,'current':tabsCheck==item.id},'index-'+item.id]" v-for="item in tabc" :key="item.id" @click="onClickIndex(item.id)">{{item.name}}</view>
            </view>
            <view class="goodslist-index" v-show="goodsList!=''">
                <goodslist  :goodsList="goodsList"  @send="onClickJumpDetails" :presell="tabsCheck==2"/>
            </view>
            <view class="goodslist-index" v-show="goodsList==''">
                <view class="empty">好箱马上就来~</view>
            </view>
        </view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
        
        tabc = [
            {id:1,name:'正在热抢'},
            {id:2,name:'下期预告'}
        ];
		tabsCheck = 1;
        goodsList:any = [];
        currentPage = 1;
        pageSize = 20;
		noMoreData = false;
        onLoad(query:any) {
			this.reqNewData()
		}
        //   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
        onClickIndex(id:number){
            if(id==this.tabsCheck){
                return;
            }
			this.tabsCheck = id;
            this.currentPage = 1;
            this.goodsList = []
			this.noMoreData = false;
			this.reqNewData()
		}
        // 跳转商品详情
		onClickJumpDetails(id:any){
            if(this.tabsCheck==2){
                return;
            }
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+id
			})
		}
        reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
            let url = 'activity/plat/2/goodList'
			if(this.tabsCheck==2){
                url = 'activity/plat/2/preGoodList'
            }
			app.http.Get(url, params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.goodList){
					if(this.currentPage==1){
						this.goodsList = []
					}
					this.goodsList = this.goodsList.concat(data.goodList);
				}
				
				this.currentPage++;
				if(cb) cb()
			});
		}
	}
</script>

<style lang="scss">
    page{
        background:#0B44B3
    }
	.content{
		width: 100%;
		box-sizing:border-box;
        background:#0B44B3
	}
	.banner{
        width: 750rpx;
        height:1212rpx;
        position: relative;
        left:0;
        top:0;
        z-index: 1;
    }
    .yiyuan-index{
        width: 100%;
        box-sizing: border-box;
        margin-top: -360rpx;
        position: relative;
        z-index: 2;
        .list{
            width: 100%;
            height:90rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 130rpx;
            position: relative;
        }
        .index{
            height:90rpx;
            line-height: 90rpx;
            font-size: 28rpx;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #FFFFFF;
        }
        .current{
            font-weight: 600;
            font-size: 30rpx;
            position: relative;
        }
        .current::before{
            width: 80rpx;
            height: 7rpx;
            background: #FB4E3E;
            content: '';
            background-size: 100% 100%;
            position: absolute;
            bottom:10rpx;
            left:50%;
            margin-left:-40rpx;
            border-radius: 3rpx;
        }
    }
    .goodslist-index{
		width: 100%;
		box-sizing: border-box;
		padding:25rpx 20rpx;
	}
    .empty{
        width: 100%;
        padding-top: 40rpx;
        color:#fff;
        font-size: 30rpx;
        text-align: center;
    }
</style>
