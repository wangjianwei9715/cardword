<template>
  <view>
    <view v-if="!newMerchantPage" class="flexCenter" :class="[!follow?normClass:selectClass,normClass]"
      @click.stop="handleAction" :style="{
        width:`${width}rpx`,
        height:`${height}rpx`,
        fontSize:`${fontSize}rpx`,
        transform:`scale(${hideCancel&&follow?0:1})`
      }">

      {{ follow ? textArr[1] : textArr[0] }}
    </view>
    <view v-else class="followBtton flexCenter" :class="{isFollo:follow}" @click.stop="handleAction" :style="{
      width:`${width}rpx`,
      height:`${height}rpx`,
      fontSize:`${fontSize}rpx`
    }">

      {{ follow ? textArr[1] :textArr[0] }}
    </view>
    <followModal v-if="modalShow" @cancel="modalShow = false" @confirm="followAction"></followModal>
  </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { app } from "@/app";
import BaseComponent from "@/base/BaseComponent.vue";
@Component({})
export default class ClassName extends BaseComponent {
  @Prop({
    default: false,
  })
  follow: boolean | undefined;
  @Prop({
    default: 0,
  })
  followID: any;
  @Prop({
    default: 56,
  })
  height?: any;
  @Prop({
    default: 144,
  })
  width?: any;
  @Prop({
    default: 25,
  })
  fontSize?: any;
  @Prop({
    default: false,
  })
  newMerchantPage?: any;
  @Prop({
    default: () => {
      return ['关注', '已关注']
    }
  })
  textArr?: any
  @Prop({
    default: "actionItem"
  })
  normClass?: string
  @Prop({
    default: "redAction"
  })
  selectClass?: string
  @Prop({
    default: false
  })
  hideCancel?: boolean
  modalShow = false;
  followCopy = false;
  handleAction() {
    app.platform.hasLoginToken(() => {
      if (!this.follow) this.followAction();
      if (this.follow) this.modalShow = true;
    })

  }
  followAction() {
    if (!this.followID) return;
    // merchant/follow/  (oldAPI)
    app.http.Post("merchant/1/follow/" + this.followID, {}, (res: any) => {
      this.$emit("handleSuccess", res.data);
      uni.$emit('followAction', {
        ...res.data,
        alias: this.followID
      })
      this.modalShow = false;
    });
  }
  created() {
    //在实例创建完成后被立即调用
  }
  mounted() {
    //挂载到实例上去之后调用
  }
  destroyed() { }
}
</script>

<style lang="scss">
.followBtton {
  width: 127rpx;
  height: 52rpx;
  background: #FA1545;
  border-radius: 3rpx;
  font-size: 29rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #F6F7FB;

}

.isFollo {

  background: #F2F2F2;
  color: #7C7C7C;
}

.actionItem {
  width: 144rpx;
  height: 56rpx;
  font-size: 25rpx;
  font-family: PingFangSC-Regular;
  box-sizing: border-box;
  font-weight: 400;
  color: #88878c;
  line-height: 56rpx;
  text-align: center;
  letter-spacing: 1rpx;
  border: 1rpx solid #dbdbdb;
}

.v2Button {
  width: 120rpx;
  height: 47rpx;
  background: #FA1545;
  border: 1rpx solid #FA1545;
  border-radius: 3rpx;
  font-size: 29rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #F6F7FB;
}

.v2SelectButton {
  background-color: #fff;
}

.redAction {
  background: $btn-red;
  border: 1rpx solid $btn-red;
  color: #fff;
}
</style>
