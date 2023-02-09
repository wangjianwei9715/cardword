<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-02-09 11:41:27
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-02-09 16:36:14
 * @FilePath: \card-world\src\pages\userinfo\user_identity.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="title">实名认证服务协议</view>
        <view class="desc">更新时间：2023年2月10日</view>
        <view class="desc">欢迎使用实名认证服务！</view>
        <view class="desc">为使用实名认证服务（以下称“本服务”），更好地保障你的权益,<text class="desc desc_weight">你应当阅读并遵守<text @click="goToXy" class="redBook">《卡世界用户服务协议》</text>（以下称“本协议”），同时遵守以及平台不时公布的其它各项制度规范。</text></view>
        <view class="desc desc_weight">
            平台已经以字体加粗或其他合理方式提示用户重点阅读协议中相关免除或限制责任条款，用户和平台均认可其合法性及有效性。如你不同意本协议，或拒绝提供个人信息进行实名认证，这将导致我们无法为你提供完整的产品和服务，你也可以选择停止使用。如你自主选择同意或使用本服务，则视为你已充分理解本协议，并同意作为本协议的一方当事人接受本协议以及其他与本服务相关的协议和规则的约束。
        </view>
        <!-- <text class="desc desc_weight"></text> -->
        <view class="desc">1 定义</view>
        <view class="desc">1.1 平台：本协议所称"平台"是指杭州卡沃王科技有限公司（以下简称“公司”）拥有或实际运营的"卡世界"客户端，以下合称“平台”。</view>
        <view class="desc">1.2 实名认证服务：是指由平台或平台指定的第三方机构提供的，通过身份证件信息比对，核验用户身份，并将认证结果及认证相关信息反馈至向你提供产品或服务的主体。</view>
        
        <view class="desc">2 个人信息处理与用途</view>
        <view class="desc">2.1 为对申请实名认证的账号进行审核和安全验证，你同意使用公司提供的实名认证服务，即公司通过身份证件信息验证核验你的身份，以确保账号实名认证人。</view>
        <view class="desc">2.2 为提升实名认证服务的准确性和安全性，<text class="desc desc_weight">你同意授权公司及其合作的服务商（此处为公司名）核验你的身份信息并做出必要处理。你理解并同意公司及其合作的服务商可以将你在使用本服务时提供的身份信息（例如：姓名、身份证号），在法律法规允许或政府机关授权机构存储的信息进行比对核验。关于实名信息的收集、使用、存储、传输、共享（如适用）与保护，我们将按照法律法规的规定，保护你的个人信息及隐私安全。</text></view>
        <view class="desc">2.3<text class="desc desc_weight">你承诺提供的信息合法、有效、真实、准确并完整，不采取任何违法违规、不正当或欺骗手段使用实名认证服务。</text></view>
        <view class="desc">2.4 公司将严格按照法律法规保护你的个人信息。</view>
        
        <view class="desc">3 用户使用须知</view>
        <view class="desc">3.1 我们努力在现有技术能力基础上保障实名认证服务有效、稳定运行，但是，<text class="desc desc_weight">由于核验信息过程中存在受到网络环境等不特定因素的影响，公司暂时无法保证每次实名认证都能成功。</text></view>
        <view class="desc">3.2 如果你发现实名认证不成功，你可重新发起认证流程，或通过“卡世界客服”联系我们。</view>
        <view class="desc">3.3 为保护你或他人的合法权益，公司有权在认为可能存在风险时暂停向你提供实名认证相关服务。</view>

        <view class="desc">4 附则</view>
        <view class="desc">4.1 <text class="desc desc_weight">为给你提供更好的服务或因国家法律法规、政策调整、技术条件、产品功能等变化需要，公司会适时对本协议进行修订，平台将不定期对本协议进行修订，并根据相关法律法规进行公示。如你对修订后的内容存有异议的，请立即停止使用本服务。若你知晓并继续使用平台及相关服务，即视为你认可并接受修订后的本管理规范内容。</text></view>
        <view class="desc">4.2 用户应遵守国家法律法规及相关部门规章制度等规范性文件。对任何涉嫌违反国家法律法规、行政法规及相关部门规范的行为，本协议已有约定的适用本协议，本协议尚未涉及的，平台有权依据各项平台制度规范酌情处理，但不免除用户应承担的法律责任。用户在平台的全部行为，都应同时遵守与平台及其关联公司签订的各项协议及规则。</view>
        <view class="desc">4.3 本协议未涉及的问题参见国家有关法律法规，当本协议与国家法律法规冲突时，以国家法律法规为准</view>
        <view class="desc">4.4本协议中的标题仅为方便阅读而设，并不影响本协议中任何规定的含义或解释</view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    onLoad(query: any) {
    }
    goToXy(){
        uni.navigateTo({
            url:'/pages/userinfo/user_agreement'
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
}
.content {
    width: 750rpx;
    box-sizing: border-box;
    padding: 20rpx 50rpx;
    display: block;
}

.title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
}

.desc {
    font-size: 23rpx;
    color: #333333;
    margin-top: 30rpx;
    letter-spacing: 2rpx;
}

.desc_weight {
    font-weight: bold;
}


.redBook{
    color: #E6384B;
    text-decoration:underline
}
</style>
