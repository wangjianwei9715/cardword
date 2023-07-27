<template>
	<view>
		<view class="header-sort">
			<view class="header-sort-index" @click="rest" :class="{'current-name':isDefault}" v-if="needDefault">
				默认
			</view>
			<view class="header-sort-index" :class="{'current-name':item.isDefault||(item.children&&item.index>=0)||(item.odType!=0&&item.key=='sort')}" v-for="(item,index) in copyData" :key="index" @click="tabClick(item,index)">
				{{formatText(item)}}
				<view class="header-sort-icon" v-if="item.needOrder || item.children">
					<view v-if='item.needOrder' :class="{'icon-sort-upn':item.odType!=1,'icon-sort-up':item.odType==1}"></view>
					<view :class="{'icon-sort-downn':item.odType!=2,'icon-sort-down':item.odType==2}"></view>
				</view>
			</view>
			<view :class="['header-sort-classify',{'classify-show':selectItem.selectShow&selectItem.key!='state','classify-short':selectItem.selectShow&&selectItem.key=='state'}]">
				<view :class="['header-sort-classify-index',{'classify-opt':selectItem.index==index}]" @click="selectMenuClick(item,index)" v-for="(item,index) in selectItem.children" :key="index">{{item.name}} </view>
			</view>
		</view>
		<view class="sort-shadow" :style="{top:maskTop+'rpx'}" v-show="selectItem.selectShow" @click="selectMenuIndex=-1"></view>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
@Component({})
export default class ClassName extends BaseComponent {
  @Prop({
    default: []
  })
  sortData: any;
  @Prop({ default: false })
  needDefault?: boolean;
  @Prop({ default: 0 })
  maskTop?: number;

  sortComData: any = [];
  sort = "";
  // odType 0:默认 1:升序 2:降序
  isDefault: boolean = true;
  copyData: any = [];
  selectMenuIndex: number = -1;
  created() {
    //在实例创建完成后被立即调用
  }
  mounted() {
    //挂载到实例上去之后调用
    this.copyData = JSON.parse(JSON.stringify(this.sortData));
	this.sendData();
  }
  destroyed() {}
  //----------------------
  formatText(item: any) {
    if (!item.children) return item.name;
    if (item.children && item.children.length) {
      let text = "";
      item.index >= 0
        ? (text = item.children[item.index].name)
        : (text = item.name);
      return text;
    }
  }
  tabClick(item: any, index: number) {
    this.selectMenuIndex = index;
    if (item.children) {
      item.selectShow = true; //开启下拉
    } else {
      this.isDefault = false;
      let od = item.odType;
      for(let i in this.copyData){
        this.copyData[i].odType = 0;
      }
      item.odType = od==2?item.odType=0:od+1;
      this.sendData(true);
    }
  }
  selectMenuClick(item: any, index: number) {
    this.selectItem.index = index;
    this.selectItem.selectShow = false; //关闭下拉
    this.isDefault = false;
    this.sendData(true);
  }
  rest() {
    this.isDefault = true;
    this.copyData = JSON.parse(JSON.stringify(this.sortData));
    this.sendData(true);
  }
  //数据
  sendData(refresh:boolean=false) {
    let data: any = {};
    for (let i: number = 0, len: number = this.copyData.length; i < len; i++) {
      if (!this.copyData[i].key) continue; //无key跳过
      let forItem = this.copyData[i];
      if (forItem.children && forItem.index >= 0) {
        data[forItem.key] = this.formatChild(forItem);
      }
      if (
        forItem.needOrder &&
        forItem.searchText &&
        forItem.odType &&
        forItem.odType != 0
      ) {
        data[forItem.key] = `${
          data[forItem.key]
            ? data[forItem.key] + "," + this.formatOdType(forItem)
            : this.formatOdType(forItem)
        }`;
      }
    }
    this.$emit("tagChange", {data,refresh});
  }
  formatChild(item: any) {
    return item.children[item.index].value;
  }
  formatOdType(item: any) {
    return item.odType == 1 ? item.searchText : item.searchText + ":desc";
  }
  private get selectItem() {
    const { copyData, selectMenuIndex } = this;
    if (
      !copyData ||
      !copyData.length ||
      selectMenuIndex < 0 ||
      !copyData[selectMenuIndex].children
    )
      return [];
    return copyData[selectMenuIndex];
  }
}
</script>

<style lang="scss">
.header-sort {
  width: 100%;
  height: 72rpx;
  box-sizing: border-box;
  padding: 0 56rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 67;
  background-color: #fff;
  &-index {
    height: 72rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    z-index: 92323;
  }
  .current-name {
    color: #e23737;
  }
  .header-sort-icon {
    width: 17rpx;
    margin-left: 4rpx;
    margin-bottom: -4rpx;
    .icon-sort-up {
      width: 17rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_u_.png) no-repeat center;
      background-size: 100% 100%;
      margin-bottom: 2rpx;
    }
    .icon-sort-upn {
      width: 17rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_u.png) no-repeat center;
      background-size: 100% 100%;
      margin-bottom: 2rpx;
    }
    .icon-sort-down {
      width: 17rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_d_.png) no-repeat center;
      background-size: 100% 100%;
    }
    .icon-sort-downn {
      width: 17rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_d.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  &-classify {
    width: 100%;
    height: 0;
    box-sizing: border-box;
    position: absolute;
    top: 72rpx;
    left: 0;
    padding: 0 36rpx;
    background: #fff;
    transition: height 0.2s linear;
    opacity: 0;
    overflow: hidden;
    z-index: 9;
    &-index {
      width: 100%;
      height: 80rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #f1f1f4;
      display: flex;
      align-items: center;
      font-size: 24rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #14151a;
    }
    &-index:last-child {
      border: none;
    }
  }
  .classify-show {
    height:480rpx;
    opacity: 1;
  }
  .classify-short {
    height:90rpx;
    opacity: 1;
  }
  .classify-opt {
    color: #f65d2d;
  }
}
.sort-shadow {
  width: 100%;
  height: 100%;
  position: fixed;
  //   top: 0;
  left: 0;
  z-index: 8;
  background: rgba(0, 0, 0, 0.5);
}
</style>
