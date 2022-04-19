<template>
  <view>
    <view
      class="actionItem"
      :class="{ redAction: !follow }"
      @click.stop="handleAction"
      :style="
        'height:' +
        height +
        'rpx;line-height:' +
        height +
        'rpx;width:' +
        width +
        'rpx;font-size:' +
        fontSize +
        'rpx'
      "
    >
      {{ follow ? "已关注" : "关注" }}
    </view>
    <followModal
      v-if="modalShow"
      @cancel="modalShow = false"
      @confirm="followAction"
    ></followModal>
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

  modalShow = false;
  followCopy = false;
  handleAction() {
    if (!this.follow) this.followAction();
    if (this.follow) this.modalShow = true;
  }
  followAction() {
    if (!this.followID) return;
    app.http.Post("merchant/follow/" + this.followID, {}, (res: any) => {
      this.$emit("handleSuccess", res.data);
      this.modalShow = false;
    });
  }
  created() {
    //在实例创建完成后被立即调用
  }
  mounted() {
    //挂载到实例上去之后调用
  }
  destroyed() {}
}
</script>

<style lang="scss">
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
.redAction {
  background: $btn-red;
  border: 1rpx solid $btn-red;
  color: #fff;
}
</style>
