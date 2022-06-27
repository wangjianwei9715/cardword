<template>
  <view>
    <vue-tinder ref="tinder" key-name="id" :queue.sync="queue" :offset-y="0" @submit="onSubmit" :allowDown="true">
      <template slot-scope="scope">
        <view
          class="pic"
          :style="{
            'background-image': `url(${scope.data.pic})`
          }"
        />
      </template>
    </vue-tinder>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
@Component({})
export default class ClassName extends BaseNode {
  queue:any = [{id:1,pic: '../../static/goods/drawcard/card_gold.png'},
    {id:2,pic: '../../static/goods/drawcard/card_red.png'},
    {id:3,pic: '../../static/goods/drawcard/card_blue.png'},
    {id:4,pic: '../../static/goods/drawcard/card_gold.png'},
    {id:5,pic: '../../static/goods/drawcard/card_gold.png'}];
  offset = 0
  onLoad(query: any) {
    
  }
  mock(count = 5) {
  }
  onSubmit(type:string, key:any, item:any) {
    // type: result，'like': swipe right, 'nope': swipe left, 'super': swipe up
    // key:  The keyName of the removed card
    // item: Child object in queue
    if (this.queue.length < 3) {
      this.mock()
    }
  }
  
 
}
</script>

<style lang="scss">
  .vue-tinder {
    position: fixed;
    left: 50%;
    margin-left: -264rpx;
    top: 100rpx;
    width: 528rpx;
    height: 741rpx;
  }
  .pic {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
</style>
