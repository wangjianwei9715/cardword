<template>
  <view class="content">
    <view class="orther-setting">
      <view
        class="setting"
        v-for="item in settingTab"
        :key="item.id"
        @click="onClickNavigateto(item.url)"
      >
        <view class="name">{{ item.name }}</view>
        <view v-if="item.id == 3" class="right">
          <switch
            class="switch"
            color="#14151B"
            :checked="xiaoxiDefault"
            @change="onClickDefault"
          />
        </view>
        <view v-else-if="item.id == 4" class="right" @click="onClickRemoveFile">
          {{ fileSizeString }}
          <view class="icon-right"></view>
        </view>
        <view v-else class="icon-right"></view>
      </view>
    </view>
    <view class="logout" @click="onClickLogout">退出登录</view>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
@Component({})
export default class ClassName extends BaseNode {
  settingTab = [
    { id: 1, name: "修改密码/设置登录密码", url: "" },
    { id: 2, name: "地址管理", url: "/pages/userinfo/setting_addresses" },
    { id: 3, name: "消息通知", url: "" },
    { id: 4, name: "清除缓存", url: "" },
    { id: 5, name: "用户协议", url: "" },
    { id: 6, name: "关于我们", url: "" },
  ];
  xiaoxiDefault = false;
  fileSizeString = "";
  needRemove = true;
  onLoad(query: any) {
    this.formatSize();
  }
  onClickNavigateto(url: any) {
    uni.navigateTo({
      url: url,
    });
  }
  onClickDefault() {
    this.xiaoxiDefault = !this.xiaoxiDefault;
  }
  formatSize() {
    // #ifdef APP-PLUS
    plus.cache.calculate((size: any) => {
      if (size <= 0) {
        this.needRemove = false;
        this.fileSizeString = "0B";
        return;
      }
      if (size < 1024) {
        this.fileSizeString = size + "B";
      } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
        this.fileSizeString = Math.floor((size / 1024) * 100) / 100 + "KB";
      } else if (size / 1024 / 1024 >= 1) {
        this.fileSizeString =
          Math.floor((size / 1024 / 1024) * 100) / 100 + "M";
      }
    });
    // #endif
  }
  onClickRemoveFile() {
    if (!this.needRemove) {
      return;
    }
    uni.showModal({
      title: "提示",
      content: "是否清除缓存?",
      success: (res: any) => {
        if (res.confirm) {
          plus.cache.clear(() => {
            uni.showToast({
              title: "清理成功",
              icon: "none",
              duration: 2000,
            });
            this.formatSize();
          });
        }
      },
    });
  }
  onClickLogout() {
    app.http.Post("user/logout", {}, (res: any) => {
      uni.removeStorageSync("token");
      uni.reLaunch({
        url: "/pages/login/login",
      });
    });
  }
}
</script>

<style lang="scss">
.icon-right {
  width: 10rpx;
  height: 16rpx;
  background: url(../../static/goods/jinru@2x.png) no-repeat center;
  background-size: 100% 100%;
  margin-left: 8rpx;
}
.content {
  width: 100%;
  box-sizing: border-box;
}
.orther-setting {
  width: 100%;
  box-sizing: border-box;
  padding: 0 32rpx;
  .setting {
    width: 100%;
    height: 98rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f4;
    .name {
      font-size: 24rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #14151a;
    }
    .right {
      height: 98rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #aaaabb;
    }
  }
}
uni-switch .uni-switch-input {
  margin-right: 0 !important;
}
.logout {
  width: 718rpx;
  height: 88rpx;
  background: #14151b;
  border-radius: 4rpx;
  margin: 0 auto;
  margin-top: 60rpx;
  text-align: center;
  line-height: 88rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}
</style>
