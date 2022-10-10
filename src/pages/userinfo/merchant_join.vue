<template>
  <view class="content">
    <view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">商家入驻</view>
				<view class="header-icon">
					<!-- <view :class="['icon-collect',{'icon-favored':favorType}]" @click="onClickFavor"></view> -->
					<view class="icon-share" @click="onClickKef"></view>
				</view>
			</view>
		</view>

		<view style="padding-top:88rpx">
			<statusbar />
		</view>
    <template v-if='merchantHelloState==0'>
      <view class="title" style="margin-top: 30rpx;">入驻流程</view>
      <view class="step-content">
        <view class="step-index" v-for="(item,index) in stepData" :key="index">
          <view class="step-yuan" :class="{'yuan-line':index<3}"></view>
          <view class="step-desc">{{item}}</view>
        </view>
      </view>
      <view class="title">个人信息填写</view>
      <view class="info-content">
        <view class="info-index">
          <view class="info-left">姓名</view>
          <input class="info-input" v-model="merchant.name" placeholder="请输入姓名" />
        </view>
        <view class="info-index">
          <view class="info-left">店铺名称</view>
          <input class="info-input" v-model="merchant.shop" placeholder="请输入店铺名称" />
        </view>
        <view class="info-index">
          <view class="info-left">联系方式</view>
          <input class="info-input" v-model="merchant.phone" placeholder="请输入联系手机" />
        </view>
        <view class="info-index">
          <view class="info-left">微信号</view>
          <input class="info-input" v-model="merchant.contact" placeholder="请输入微信号" />
        </view>
        <view class="info-tip">平台承诺保护商家个人隐私信息,仅用于核实身份</view>

      </view>
      <view class="title" style="margin-top:44rpx">店铺信息填写</view>

      <view class="info-content">
        <view class="info-index">
          <view class="info-left" style="width:300rpx">是否拥有线下实体店</view>
          <picker :range="isRealOptions" class="flex1" style="width: 100%;" range-key='label' @change="realChange($event)">
            <view class="uni-flex alc flex1">
              <input class="info-input flex1" disabled :value="isRealShow" placeholder="请选择" />
              <u-icon name='arrow-right' size='11' color='#555674'></u-icon>
            </view>
          </picker>

        </view>
        <view class="info-index" v-if="merchant.isReal==1">
          <view class="info-left" style="width:200rpx">店铺详细地址</view>
          <input class="info-input" v-model="merchant.address" placeholder="请输入店铺详细地址" />
        </view>
        <view class="info-index">
          <view class="info-left" style="width:200rpx">货源渠道说明</view>
          <picker :range="cargo_sourceRange" class="flex1" style="width: 100%;" @change="cargoChange($event)">
            <view class="uni-flex alc flex1">
              <input class="info-input flex1" v-model="merchant.cargo_source" placeholder="请输入" />
              <u-icon name='arrow-right' size='11' color='#555674'></u-icon>
            </view>
          </picker>
          
        </view>
        <template v-if="merchant.isReal==1">
          <view class="info-index noneBorder">
            <view class="info-left flex1">上传营业执照</view>
          </view>
          <view class="imgContainer uni-flex">
            <image class="info-img" @click="onClickChangeAvatar('manage_pic')"
              :src="merchant.manage_pic?parsePic(decodeURIComponent(merchant.manage_pic)):'../../static/userinfo/v2/addImage.png'"
              mode="scaleToFill" />
  
          </view>
        </template>
        <view class="info-index noneBorder">
          <view class="info-left flex1">社群截图上传</view>
        </view>
        <view class="imgContainer uni-flex">
          <image class="info-img" @click="onClickChangeAvatar('colony_pic')"
            :src="merchant.colony_pic?parsePic(decodeURIComponent(merchant.colony_pic)):'../../static/userinfo/v2/addImage.png'"
            mode="scaleToFill" />
          <!-- <image class="info-img" v-if="merchant.colony_pic" :src=""
            mode="scaleToFill" /> -->
        </view>
        <view class="info-tip">提交信息后我们将在1个工作日内和您取得联系</view>
      </view>
      <view class="safeBottom"></view>
      <button class="info-btn" @click="onClickConfirm">提交</button>
    </template>
    <template v-else>
      <view class="alreadySubmit flexCenter">已提交</view>
      <view class="alreadyTips">
        您的入驻信息已递交至平台，我们会1个工作日内审核并与您联系，请留意消息通知
      </view>
      <button class="info-btn" @click='onClickBack'>确定</button>
    </template>
  </view>
</template>

<script lang="ts">
  import { app } from "@/app";
  import { Component } from "vue-property-decorator";
  import BaseNode from "../../base/BaseNode.vue";
  import ossUtils from "@/tools/ossUtils";
  import { parsePic } from "@/tools/util";
  const isRealOptions: any = [
    {
      label: "是",
      value: 1
    },
    {
      label: "否",
      value: 0
    }
  ];
  const cargo_sourceRange: any = ["睿卡", "美盘", "香港", "淘宝", "其他"];
  @Component({})
  export default class ClassName extends BaseNode {
    stepData = ["提交个人信息", "等待客服联系", "对接入驻材料", "入驻成功"];
    parsePic: any = parsePic
    merchant: any = {
      name: "",
      shop: "",
      contact: "",
      isReal: null,
      address: "",
      manage_pic: "",
      colony_pic: "",
      cargo_source: "",
      phone: ""
    };
    manage_picList: any = []
    colony_picList: any = []
    ossutils = ossUtils.getInstance();
    isRealOptions: any = isRealOptions;
    cargo_sourceRange: any = cargo_sourceRange;
    alreadySubmit: Boolean = false
    merchantHelloState: number = 0
    private get isRealShow() {
      if (typeof this.merchant.isReal == "number") {
        return this.merchant.isReal == 1 ? "是" : "否";
      } else {
        return "";
      }
    }
    onLoad(query: any) {
      this.merchantHelloState = query.merchantHelloState != 'undefined' ? Number(query.merchantHelloState) : 0
      console.log(this.merchantHelloState);
      // if(query.alreadySubmit) this.alreadySubmit=true
    }
    realChange(event: any) {
      const index = event.detail.value;
      this.merchant.isReal = this.isRealOptions[index].value;
      this.$forceUpdate();
    }
    cargoChange(event: any) {
      const index = event.detail.value;
      this.merchant.cargo_source = this.cargo_sourceRange[index];
      this.$forceUpdate();
    }
    findRangeLabel(val: any, range: any, returnAll?: boolean) {
      const findItem: any = range.find((item: any) => item.value == val) || {};
      return returnAll ? findItem : findItem.label || "";
    }
    onClickBack() {
      uni.navigateBack({ delta: 1 });
    }
    async onClickChangeAvatar(keyName: string) {
      let imageSrc = await this.ossutils.getImage();
      // console.log(imageSrc);
      await this.onClickAddImg(imageSrc, keyName);
    }
    async onClickAddImg(src: any, keyName: string) {
      let filePath = "images/" + this.ossutils.getFileName(src); // 自定义上传后的文件名称
      let sign: any = await this.ossutils.getSTS(); // 获取签名等信息
      uni.showLoading({
        title: "上传图片中..."
      });
      uni.uploadFile({
        url: sign.host,
        filePath: src,
        fileType: "image",
        name: "file",
        formData: {
          key: filePath,
          policy: sign.policy,
          OSSAccessKeyId: sign.accessId,
          success_action_status: "200",
          //让服务端返回200,不然，默认会返回204
          signature: sign.signature,
          "x-oss-security-token": sign.security_token
        },
        success: (res: any) => {
          uni.hideLoading();
          if (res.statusCode == 200) {
            let avatar = sign.host + "/" + filePath;
            const src = encodeURIComponent(avatar);
            //@ts-ignore
            this.merchant[keyName] = src
          }
        },
        fail: err => {
          uni.hideLoading();
          uni.showModal({
            content: err.errMsg,
            showCancel: false
          });
        }
      });
    }
    onClickKef(){
      let params = {
					agentExten:''
				}
				app.platform.heliService(params)
    }
    onClickConfirm() {
      for (let i in this.merchant) {
        if ((i == 'address' && this.merchant.isReal != 1) || (i == 'manage_pic' && this.merchant.isReal != 1) || i=='isReal') continue;
        if (this.merchant[i] == "") {
          uni.showToast({
            title: "请正确填写信息",
            icon: "none"
          });
          return;
        }
      }
      if (this.merchant.isReal != 1) this.merchant.address = ""
      app.http.Post("user/merchant/registe", this.merchant, (res: any) => {
        this.merchantHelloState = 1
        // uni.showModal({
        //   title: "提示",
        //   content: "提交成功",
        //   showCancel: false,
        //   success: (action: any) => {
        //     if (action.confirm) {
        //       this.onClickBack();
        //     }
        //   }
        // });
        // uni.showToast({
        //   title: "提交成功",
        //   icon: "none"
        // });
        // this.merchant = Object.assign({}, merchant);
      });
    }
  }
</script>

<style lang="scss">
  .content {
    width: 100%;
    box-sizing: border-box;
    padding:0 30rpx;
  }

  .title {
    width: 100%;
    font-size: 34rpx;
    font-family: HYQiHei;
    font-weight: bold;
    color: #1b1b1d;
  }

  .step-content {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40rpx auto;
    margin-bottom: 80rpx;
  }

  .step-index {
    width: 100rpx;
    height: 100rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .step-yuan {
    width: 20rpx;
    height: 20rpx;
    background: #fb4e3e;
    border-radius: 50%;
    position: relative;
  }

  .yuan-line::after {
    content: "";
    width: 156.6rpx;
    height: 2rpx;
    background: #fb4e3e;
    position: absolute;
    left: 30rpx;
    top: 50%;
    margin-top: -1rpx;
  }

  .step-desc {
    width: 100%;
    height: 60rpx;
    text-align: center;
    font-size: 24rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #34363a;
  }
  .header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		border-bottom: 1px solid #F4F3F2;

		.tab-header {
			width: 100%;
			height: 88rpx;
			display: flex;
			box-sizing: border-box;
			padding: 0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}

		.icon-back {
			width: 80rpx;
			height: 88rpx;
			background: url(../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.header-title {
			height: 88rpx;
			line-height: 88rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}

		.header-icon {
			height: 88rpx;
			display: flex;
			align-items: center;
			position: absolute;
			right: 40rpx;
			top: 0;
		}

		.icon-collect {
			width: 44rpx;
			height: 41rpx;
			background: url(../../static/goods/v2/icon_collect.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 40rpx;
		}

		.icon-favored {
			background: url(../../static/goods/v2/icon_collect_.png) no-repeat center;
			background-size: 100% 100%;
		}

		.icon-share {
			width: 46rpx;
			height: 46rpx;
			background: url(../../static/userinfo/v2/kef.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
  .info-content {
    width: 100%;
    margin-top: 15rpx;
  }

  .info-index {
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;
    border-bottom: 1px solid $content-bg;
    display: flex;
    align-items: center;
  }

  .info-left {
    width: 170rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    font-size: 30rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #34363a;
  }

  .info-input {
    flex: 1;
    //   width: 520rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #34363a;
  }

  .info-tip {
    margin-top: 30rpx;
    font-size: 24rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #c7c8c8;
  }

  .info-btn {
    width: 668rpx;
    background: #fb4e3e;
    text-align: center;
    font-family: Microsoft YaHei;
    color: #ffffff;
    position: fixed;
    bottom: calc(64rpx + constant(safe-area-inset-bottom));
    bottom: calc(64rpx + env(safe-area-inset-bottom));
    left: 50%;
    margin-left: -334rpx;
    height: $btn-height;
    line-height: $btn-height;
    font-size: $btn-fontSize;
    border-radius: $btn-radius;
    font-weight: $btn-weight;
  }

  .safeBottom {
    width: 100%;
    height: calc(156rpx + constant(safe-area-inset-bottom) + 88rpx);
    height: calc(156rpx + env(safe-area-inset-bottom) + 88rpx);
    opacity: 0;
  }

  .noneBorder {
    border: 0;
  }

  .alc {
    align-items: center;
  }

  .flex1 {
    flex: 1;
  }

  .imgContainer {
    margin: 35rpx 0;
  }

  .info-img {
    margin-right: 21rpx;
    width: 210rpx;
    height: 210rpx;
  }

  .alreadySubmit {
    width: 156rpx;
    height: 156rpx;
    background: #c8c8c8;
    border-radius: 50%;
    font-size: 42rpx;
    font-family: HYQiHei;
    font-weight: normal;
    color: #ffffff;
    margin-top: 265rpx;
  }

  .alreadyTips {
    font-size: 30rpx;
    font-family: HYQiHei;
    font-weight: normal;
    color: #010000;
    text-align: center;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 82rpx;
    line-height: 60rpx;
    margin-top: 77rpx;
  }
</style>