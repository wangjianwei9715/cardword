<template>
  <view class="content">
    <view class="header-banner">
      <statusbar />
      <view class="tab-header">
        <view class="icon-back" @click="onClickBack(true)"></view>
        <view class="header-title">商家入驻</view>
        <view class="header-icon">
          <view class="icon-share" @click="onClickKef"></view>
        </view>
      </view>
    </view>

    <view style="padding-top:88rpx">
      <statusbar />
    </view>
    <template v-if='(merchantHelloState == 0)'>
      <view class="title" style="margin-top: 30rpx;">入驻流程</view>
      <view class="step-content">
        <view class="step-index" v-for="(item, index) in stepData" :key="index">
          <view class="step-yuan" :class="{ 'yuan-line': index < 3 }"></view>
          <view class="step-desc">{{ item }}</view>
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
        <view class="info-index">
          <view class="info-left" style="width:300rpx">是否拥有对公账户</view>
          <picker :range="has_public_accountOptions" class="flex1" style="width: 100%;" range-key='label'
            @change="pickerChange($event, has_public_accountOptions, merchant, 'has_public_account')">
            <view class="uni-flex alc flex1">
              <input class="info-input flex1" disabled :value="has_public_accountLabel" placeholder="请选择" />
              <u-icon name='arrow-right' size='11' color='#555674'></u-icon>
            </view>
          </picker>
        </view>
        <view class="info-tip">平台承诺保护商家个人隐私信息,仅用于核实身份</view>
      </view>
      <view class="title" style="margin-top:44rpx">店铺信息填写</view>
      <view class="info-content">
        <view class="info-index">
          <view class="info-left" style="width:200rpx">经营形式</view>
          <picker :range="isRealOptions" class="flex1" style="width: 100%;" range-key='label'
            @change="pickerChange($event, isRealOptions, merchant, 'isReal')">
            <view class="uni-flex alc flex1">
              <input class="info-input flex1" disabled :value="filterPickLabel(merchant.isReal, isRealOptions)"
                placeholder="请选择" />
              <u-icon name='arrow-right' size='11' color='#555674'></u-icon>
            </view>
          </picker>

        </view>
        <view class="info-index" v-if="merchant.isReal == 1">
          <view class="info-left" style="width:200rpx">店铺详细地址</view>
          <input class="info-input" v-model="merchant.address" placeholder="请输入店铺详细地址" />
        </view>
        <view class="info-index">
          <view class="info-left" style="width:200rpx">货源渠道</view>
          <picker :range="cargo_sourceRange"
            @change="pickerChange($event, cargo_sourceRange, merchant, 'cargo_source', '')" class="flex1"
            style="width: 100%;">
            <view class="uni-flex alc flex1">
              <input class="info-input flex1" disabled v-model="merchant.cargo_source" placeholder="请输入" />
              <u-icon name='arrow-right' size='11' color='#555674'></u-icon>
            </view>
          </picker>

        </view>
        <view class="info-index" v-if="merchant.cargo_source == '其他'">
          <view class="info-left" style="width:200rpx">货源渠道说明</view>
          <input class="info-input" v-model="merchant.cargo_source_description" placeholder="请输入货源渠道说明" />
        </view>
        <view class="info-index noneBorder">
          <view class="info-left flex1">上传营业执照</view>
        </view>
        <view class="imgContainer uni-flex">
          <image class="info-img" @click="onClickUpload('Image', 'manage_pic')"
            :src="merchant.manage_pic ? parsePic(decodeURIComponent(merchant.manage_pic)) : '../../static/userinfo/v2/addImage.png'"
            mode="aspectFill" />
        </view>
        <view class="info-index">
          <view class="info-left">社群情况</view>
        </view>
        <u--textarea class="textarea" v-model="merchant.active_platform" placeholder="请输入" :heigth="57"
          :maxlength="-1" :showConfirmBar="false" confirmType="done"></u--textarea>
          <view class="tips" style="margin-top:20rpx">请描述主要活动的平台</view>
        <view class="imgContainer uni-flex" style="margin-top:40rpx">
          <image class="info-img" v-for="(item, index) in merchant.colony_pics"
            :src="parsePic(decodeURIComponent(item))" mode="aspectFill" @longtap="delResources('colony_pics', index)" />
          <image class="info-img" v-if="(merchant.colony_pics.length < 6)"
            @click="onClickUpload('Images', 'colony_pics')" src="../../static/userinfo/v2/addImage.png"
            mode="aspectFill" />
        </view>
        <view class="tips" style="margin-bottom:40rpx">图片上传【举例:抖音、微信社群截图、月销总额截图,最大6张】</view>
        <view class="imgContainer uni-flex" style="z-index: 1;">
          <image class="info-img" v-if="!merchant.open_card_video" @click="onClickUpload('Video', 'open_card_video')"
            src="../../static/userinfo/v2/addImage.png" mode="scaleToFill" />
          <view @longtap="delResources('open_card_video')" v-else>
            <video :direction="0" class="info-img" :src="decodeURIComponent(merchant.open_card_video)"></video>
          </view>
        </view>
        <view class="tips">视频上传【上传一段平时的拆卡视频】</view>
        <view class="info-index noneBorder">
          <view class="info-left flex1">库存情况描述</view>
        </view>
        <u--textarea class="textarea" v-model="merchant.inventory_description" placeholder="简单描述一下当前的库存情况"
          heigth="211rpx" :maxlength="-1" :showConfirmBar="false" confirmType="done"></u--textarea>
        <view class="info-index noneBorder">
          <view class="info-left flex1">近三个月开卡强度</view>
        </view>
        <u--textarea class="textarea" v-model="merchant.open_card_description" placeholder="简单描述近三个月的开卡情况"
          heigth="211rpx" :maxlength="-1" :showConfirmBar="false" confirmType="done"></u--textarea>
        <view class="info-tip">提交信息后我们将在1个工作日内和您取得联系</view>
      </view>
      <view class="safeBottom"></view>
      <cover-view class="info-btn" @click="onClickConfirm">提交</cover-view>
    </template>
    <template v-if="(merchantHelloState != 0)">
      <view class="alreadySubmit" :class="[`joinState${merchantHelloState}`]"></view>
      <view class="alreadyTips">
        {{
            merchantHelloState == 2 ? reason : `您的入驻信息已递交至平台，我们会尽快审核并与您联系，请留意消息通知`
        }}
      </view>
      <button class="info-btn" @click='onClickBack(false)'>{{ merchantHelloState == 2 ? '重新申请' : '确定' }}</button>
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
    label: "线下实体店",
    value: 1
  },
  {
    label: "线上break",
    value: 0
  }
];
const has_public_accountOptions: any = [
  {
    label: "是",
    value: 1
  },
  {
    label: "没有，但愿意配合开通",
    value: 2
  }
];
const checkMap = {
  name: {
    tips: '请输入姓名'
  },
  shop: {
    tips: '请输入店铺名称'
  },
  phone: {
    tips: "请输入联系方式"
  },
  contact: {
    tips: '请输入微信号'
  },
  has_public_account: {
    type: "Number",
    tips: "请选择是否拥有对公账户"
  },
  isReal: {
    type: "Number",
    tips: '请选择经营形式'
  },
  address: {
    onlyKey: "isReal",
    onlyValue: 1,
    tips: '请输入店铺线下地址'
  },
  cargo_source: {
    tips: "请选择货源渠道"
  },
  cargo_source_description: {
    onlyKey: "cargo_source",
    onlyValue: "其他",
    tips: "请输入货源渠道说明"
  },
  active_platform: {
    tips: "请输入社群情况说明"
  },
  manage_pic: {
    tips: '请上传营业执照'
  },
  colony_pics: {
    type: "Array",
    tips: '请上传社群截图'
  },
  open_card_video: {
    type: "Array",
    tips: "请上传拆卡视频"
  },

  inventory_description: {
    tips: "请输入库存情况"
  },
  open_card_description: {
    tips: "请输入近三个月开卡强度"
  },
}
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
    colony_pics: [],//社群截图
    open_card_video: "",//拆卡视频
    cargo_source: "",//货源渠道 例如: 睿卡,美盘,香港等
    cargo_source_description: "",//货源渠道说明
    phone: "",
    has_public_account: null,
    active_platform: "",//主要活动平台,社群活动说明
    inventory_description: "",//库存情况描述
    open_card_description: "",//近三个月开卡强度描述
  };
  ossutils = ossUtils.getInstance();
  checkMap: any = Object.assign({}, checkMap)
  isRealOptions: any = isRealOptions;
  has_public_accountOptions: any = has_public_accountOptions;
  cargo_sourceRange: any = cargo_sourceRange;
  // alreadySubmit: Boolean = false
  merchantHelloState: number = -1
  reason: string = ""
  sign: any = null
  private get isRealShow() {
    if (typeof this.merchant.isReal == "number") {
      return this.merchant.isReal == 1 ? "是" : "否";
    } else {
      return "";
    }
  }
  private get has_public_accountLabel() {
    if (typeof this.merchant.has_public_account == "number") {
      const findItem: any = this.has_public_accountOptions.find((item: any) => item.value == this.merchant.has_public_account)
      return findItem.label
    } else {
      return "";
    }
  }

  onLoad(query: any) {
    app.http.Get('dataApi/me/merchant/hello/state', {}, (res: any) => {
      this.merchantHelloState = res.helloState
      if (res.reason) this.reason = res.reason
    })
  }
  pickerChange(event: any, range: any, assignData: any, assignDataKey: any, valueKey = 'value') {
    const index = +event.detail.value
    const assignValue = valueKey ? range[index][valueKey] : range[index]
    assignData[assignDataKey] = assignValue
  }
  filterPickLabel(value: any, range: any, valueKey = 'value', returnAll = false) {
    const findItem = range.find((item: any) => {
      return item[valueKey] == value
    })
    if (!findItem) {
      return returnAll ? {} : ""
    }
    return returnAll ? findItem : findItem.label
  }
  onClickBack(isBack: boolean) {
    if (isBack) {
      app.platform.pageBack()
      return
    }
    this.merchantHelloState == 2 ? this.merchantHelloState = 0 : app.platform.pageBack()
  }
  async onClickUpload(type: string, keyName: string) {
    //type: "Video" || "Image" || "Images"
    try {
      if (!this.sign) this.setOssSing()
      const ossUtilsTypeMap: any = {
        "Video": "getVideo",
        "Image": "getImage",
        "Images": "getImages"
      }
      //@ts-ignore
      const src: any = type == "Images" ? await this.ossutils[ossUtilsTypeMap[type]](6 - this.merchant.colony_pics.length) : await this.ossutils[ossUtilsTypeMap[type]]();
      this.upLoad(src, type, keyName)
    } catch (err) {
      //@ts-ignore
      uni.showToast(err.message || err)
    }
  }
  upLoad(src: any, type: string, keyName: string) {
    const isArr: boolean = typeof src != 'string';
    const filePaths = (isArr ? src : [src]).map((item: any) => {
      return {
        fileName: `merchantJoin${type}/${this.ossutils.getFileName(item)}`,
        url: item
      }
    })
    uni.showLoading({
      title: "上传中..."
    });
    this.uniUpLoad(filePaths).then((result: any) => {
      uni.hideLoading()
      console.log(result);
      //@ts-ignore
      isArr ? this.merchant[keyName].push(...result) : this.merchant[keyName] = result[0]
    }).catch((err: any) => {
      uni.showToast({
        title: err,
        icon: 'none'
      })
    })
  }
  uniUpLoad(filePaths: any) {
    let fileArr: any = []
    return new Promise((resolve, reject) => {
      let erroBol: boolean = false
      for (let i = 0; i < filePaths.length; i++) {
        if (erroBol) break;
        uni.uploadFile({
          url: this.sign.host,
          filePath: filePaths[i].url,
          name: "file",
          fileType: "image",
          formData: {
            key: filePaths[i].fileName,
            policy: this.sign.policy,
            OSSAccessKeyId: this.sign.accessId,
            success_action_status: 200,
            signature: this.sign.signature,
            "x-oss-security-token": this.sign.security_token
          },
          success: (result: any) => {
            if (result.statusCode == 200) {
              const finSrc = this.sign.host + "/" + filePaths[i].fileName;
              fileArr.push(encodeURIComponent(finSrc))
              if (fileArr.length == filePaths.length) resolve(fileArr);
            }
          },
          fail: (err: any) => {
            erroBol = true
            reject(err.errMsg)
          }
        })
      }

    })
  }
  delResources(key: string, index?: number) {
    app.platform.UIClickFeedBack()
    uni.showModal({
      title: "提示",
      content: "确认删除当前照片或视频资源?",
      success: (result: any) => {
        if (result.confirm) {
          if (key == 'colony_pics') {
            this.merchant.colony_pics.splice(index, 1)
          } else {
            this.merchant[key] = ""
          }
        }
      }
    })
  }
  async setOssSing() {
    this.sign = await this.ossutils.getSTS();
  }
  onClickKef() {
    let params = {
      agentExten: ''
    }
    app.platform.heliService(params)
  }
  onClickConfirm() {
    const deepData = JSON.parse(JSON.stringify(this.merchant));
    deepData.open_card_videos = [deepData.open_card_video];
    if (deepData.isReal != 1) deepData.address = ""
    if (deepData.cargo_source != '其他') delete deepData.cargo_source_description
    for (const checkKey in this.checkMap) {
      const formCheckItem: any = this.checkMap[checkKey]
      if (formCheckItem.onlyKey) {
        const { onlyKey, onlyValue } = formCheckItem
        if (onlyValue != deepData[onlyKey]) continue;
        if (onlyValue == deepData[onlyKey]) {
          if (!this.checkItemUtil(checkKey, formCheckItem, deepData)) return
        }
      } else {
        if (!this.checkItemUtil(checkKey, formCheckItem, deepData)) return
      }
    }
    app.http.Post("me/merchant/hello/apply", deepData, (res: any) => {
      this.merchantHelloState = 99
    });
    return
  }
  checkItemUtil(checkKey: string, formCheckItem: any, deepData: any) {
    const { type, tips } = formCheckItem
    const fakerMap: any = [null, undefined, ""]
    if ((!type || type == 'String') && fakerMap.includes(deepData[checkKey])) {
      this.tipsUtil(tips)
      return false
    }
    if (type && type == "Array" && deepData[checkKey].length === 0) {
      this.tipsUtil(tips)
      return false
    }
    if (type && type == "Number" && typeof deepData[checkKey] !== "number") {
      this.tipsUtil(tips)
      return false
    }
    return true
  }
  tipsUtil(title: string) {
    uni.showToast({
      title,
      icon: 'none'
    })
  }
}
</script>

<style lang="scss">
.content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 30rpx;
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

.tips {
  font-size: 24rpx;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #c7c8c8;
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

.textarea {
  font-size: 30rpx;
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
  bottom: 64rpx;
  left: 50%;
  margin-left: -334rpx;
  z-index: 3;
  height: $btn-height;
  line-height: $btn-height;
  font-size: $btn-fontSize;
  border-radius: $btn-radius;
  font-weight: $btn-weight;
}

.safeBottom {
  width: 750rpx;
  height: 244rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
  // margin: 20rpx 0;
  flex-wrap: wrap;
}

.info-img {
  margin-right: 21rpx;
  width: 210rpx;
  height: 210rpx;
  border-radius: 3rpx;
  display: block;
  margin-bottom: 16rpx;
  z-index: 2;
}

.alreadySubmit {
  width: 264rpx;
  height: 264rpx;
  background-size: 100% 100%;
  // background: #c8c8c8;
  // border-radius: 50%;
  // font-size: 42rpx;
  // font-family: HYQiHei;
  // font-weight: normal;
  // color: #ffffff;
  margin-top: 265rpx;
}

.joinState1 {
  background-image: url("/static/userinfo/v2/join_state_1.png");
}

.joinState2 {
  background-image: url("/static/userinfo/v2/join_state_2.png");
}

.joinState99 {
  background-image: url("/static/userinfo/v2/join_state_99.png");
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
  margin-top: 47rpx;
}
</style>