<template>
  <view class="content">
    <informationList class="list-box" :list="information" :type="101"/>
    <empty v-show="empty" />
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { getGoodsImg,dateFormatMS } from "@/tools/util"
const Params = {
		fetchFrom:1,
		fetchSize:10,
		isFetchEnd:false
	}
@Component({})
export default class ClassName extends BaseNode {
  getGoodsImg = getGoodsImg;
  dateFormatMS = dateFormatMS;
  listParams = {...Params}
  information: { [x: string]: any } = [];
  empty = false
  onLoad(query: any) {
    this.onEventUI("informationChange", (res: any) => {
      if (res && res.articleCode) {
        let findItem = this.information.find((item: any) => {
          return item.articleCode == res.articleCode;
        });
        if (findItem) {
          findItem.isLikes = res.isLikes;
          findItem.likes = res.likes;
          findItem.comment = res.comment
        }
      }
    });
    this.reqNewData();
  }
  //   加载更多数据
  onReachBottom() {
    this.reqNewData();
  }
  reqNewData(cb?: Function) {
    const params = this.listParams
    // 获取更多商品
    if (params.isFetchEnd) {
      return;
    }
    app.http.Get("dataApi/article/favorite/list", params, (data: any) => {
      params.isFetchEnd = data.isFetchEnd;
      if (params.fetchFrom == 1) {
        this.information = [];
      }
      if (data.list) {
        this.information = this.information.concat(data.list);
      }
      this.empty = params.fetchFrom == 1 && this.information.length==0
      params.fetchFrom+=params.fetchFrom
      if (cb) cb();
    });
  }
}
</script>

<style lang="scss">
page {
  background: #fff;
}
.content {
  width: 100%;
}

.list-box {
  width: 100%;
  background:#fff;
  box-sizing: border-box;
  margin-top: 40rpx;
}
</style>
