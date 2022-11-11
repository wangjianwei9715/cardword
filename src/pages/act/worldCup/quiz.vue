<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:32:37
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-11 18:26:51
 * @FilePath: \card-world\src\pages\act\worldCup\quiz.vue
 * @Description: quiz
-->
<template>
    <view class="content">
        <view class="quizContainer">
            <view v-for="(item, index) in list" :key="index">
                <view class="quiz_schedule" :class="{ hasSafe: index == 0 }">
                    <view class="schedule_groupMsg">
                        <view class="group flexCenter">
                            <text>{{ item.schedule }}</text>
                        </view>
                        <view class="state">{{ stateOption[item.state] }}</view>
                    </view>
                    <view class="schedule_confrontation">
                        <view class="teamBlock">
                            <muqian-lazyLoad class="teamImg" :src="$parsePic(decodeURIComponent(item.home_logo))" />
                            <view class="teamName u-line-1">{{ item.home_team }}</view>
                        </view>
                        <view class="schedule_center">
                            <view class="VS">VS</view>
                            <view class="manyButton flexCenter">{{ item.guessNum }}个竞猜</view>
                            <view class="manyNum">已有{{ item.guessPeopleNum }}人参与</view>
                        </view>
                        <view class="teamBlock">
                            <muqian-lazyLoad class="teamImg" :src="$parsePic(decodeURIComponent(item.home_logo))" />
                            <view class="teamName u-line-1">{{ item.home_team }}</view>
                        </view>
                    </view>
                </view>
                <view class="questionContainer" v-for="(question, questionIndex) in item.questions">
                    <view class="question_top">
                        <!-- :style="{ opacity: item.state >= 2 ? 1 : 0 }" -->
                        <view class="haoManyGuessIt">{{ question.hitNum
                        }}人猜中
                        </view>
                        <view class="question_title">{{ question.title }}</view>
                        <view class="question_state">{{ filterQuestionText(item.state, question) }}</view>
                    </view>
                    <view class="answerContainer">
                        <view class="answer" v-for="(answer, answerIndex) in question.answers"
                            @click="onClickAnswer(item, question, answer)"
                            :style="{ marginRight: (index + 1) % 3 == 0 ? `0rpx` : `20rpx` }">
                            <view class="answer_top flexCenter" :class="{ answer_top_select: item.isLike }">
                                <text>{{ answer.name }}</text>
                            </view>
                            <view class="answer_bottom flexCenter">{{ answer.multiple }}倍</view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="schedule_situation">
                <view class="tag flexCenter" :class="{ selectTag: index == tagData.index }"
                    v-for="(item, index) in tagData.list" :key="index" @click="onClickTag(item, index)">{{
                            item.label
                    }}</view>
            </view>
        </view>
        <u-popup :show="popShow" @close="popShow = false" mode="center">
            <view>
                <view>
                    {{ clickSchedule.home_team }}VS{{ clickSchedule.away_team }}
                </view>
                <view>
                    {{ clickQuestion.title }}:{{ clickAnswer.name }} (已投:{{ clickAnswer.betNum }})
                </view>
                <view>
                    当前倍率:{{ clickAnswer.multiple }}<br />
                    投注上限:{{ clickQuestion.topBetNum }}
                    剩余可投:{{ clickQuestion.topBetNum - clickAnswer.betNum }}
                </view>
                <view>
                    投注选项
                    <button :class="{ red: item == selectBeanNum }" v-for="(item, index) in quizBeanConfList"
                        @click="selectBeanNum = item, isCustom = false">{{ item }}</button>
                    <button :class="{ red: clickQuestion.topBetNum - clickAnswer.betNum == selectBeanNum && isCustom }"
                        @click="selectBeanNum = clickQuestion.topBetNum - clickAnswer.betNum, isCustom = true">最大投入:{{
                                clickQuestion.topBetNum - clickAnswer.betNum
                        }}</button>
                </view>
                <button @click="popShow = false">取消</button>
                <button @click="confirmQuiz">{{ clickAnswer.betNum ? '追加' : '投注' }}</button>
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 5,
        tp: 1
    }
    list: any = []
    isFetchEnd: boolean = true
    quizBeanConfList: any = []
    popShow: boolean = false
    tagData: any = {
        index: 0,
        list: [{ label: '进行中', value: 1 }, { label: '往期', value: 2 }, { label: '我的', value: 3 }]
    }
    clickSchedule: any = {}
    clickQuestion: any = {}
    clickAnswer: any = {}
    selectBeanNum: number = 0
    isCustom: boolean = false
    stateOption: any = {
        1: '进行中',
        2: '待结算',
        3: '已结束'
    }
    mounted(query: any) {
        this.reqNewData()
        this.reqQuizBeanConfig()
    }
    onReachBottomCom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPulldDownRefreshCom() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    onClickTag(item: any, index: number) {
        if (this.tagData.index == index) return
        this.tagData.index = index
        this.queryParams.tp = this.tagData.list[this.tagData.index].value
        this.queryParams.fetchFrom = 1
        this.reqNewData()
    }
    confirmQuiz() {
        this.joinQuiz(this.clickSchedule.id, this.clickAnswer.answerId, this.selectBeanNum)
        return
        uni.showModal({
            title: '提示',
            content: '确认投注？',
            success: (data: any) => {
                if (data.confirm) {
                    this.joinQuiz(this.clickSchedule.id, this.clickAnswer.answerId, this.selectBeanNum)
                }
            }
        })
    }
    joinQuiz(scheduleId: any, answerId: any, worldBean: any) {
        app.http.Post(`worldCup/bean/guessing/go/${scheduleId}`, { answerId, worldBean }, (res: any) => {
            app.platform.UINotificationFeedBack('success')
            uni.showToast({
                title: '投注成功',
                icon: 'none'
            })
            this.queryParams.fetchFrom = 1
            this.reqNewData()
            this.popShow=false
        })
    }
    filterQuestionText(state: any, question: any) {
        if (state == 1) return '进行中'
        if (question.win_num && typeof question.win_num != undefined) return question.win_num
    }
    onClickAnswer(schedule: any, question: any, answer: any) {
        this.clickSchedule = schedule
        this.clickQuestion = question
        this.clickAnswer = answer
        app.http.Get(`dataApi/worldCup/bean/guessing/answer/bet/data/${answer.answerId}`, {}, (res: any) => {
            this.clickAnswer.multiple = res.data.multiple
            this.clickAnswer.betNum = res.data.betNum || 0
            this.selectBeanNum=0
            this.popShow = true
        })
    }
    reqQuizBeanConfig() {
        app.http.Get(`dataApi/worldCup/bean/guessing/bet/cfg`, {}, (res: any) => {
            this.quizBeanConfList = res.list || []
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/guessing/list`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.totalPage
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
}

.quizContainer {
    width: 711rpx;
    margin-top: 18rpx;
    min-height: 1371rpx;
    background: rgba(2, 16, 37, .58);
    border: 1rpx solid;
    border-image: linear-gradient(0deg, rgba(52, 57, 255, .58), rgba(92, 235, 116, .58)) 10 10;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 0 14rpx;
    display: flex;
    flex-wrap: wrap;
    position: relative;
}

.quiz_schedule {
    width: 681rpx;
    height: 376rpx;
    background-color: #fff;
    border-radius: 5rpx;
    position: relative;
    margin-top: 42rpx;
    margin-bottom: 20rpx;
    padding-top: 20rpx;
}

.hasSafe {
    padding-top: 70rpx;
    background: linear-gradient(0deg, #FFFFFF 60%, #FFFFFF, #7DD3FF 90%);
}

.red {
    background-color: red;
}

.schedule_groupMsg {
    display: flex;
    justify-content: space-between;
    padding: 0 16rpx;
    align-items: center;

    .group {
        height: 38rpx;
        background: #FFFFFF;
        border: 1rpx solid #F23349;
        border-radius: 19rpx;

        text {
            font-size: 24rpx;
            font-weight: normal;
            color: #FB494C;
            padding: 0 16rpx;
        }
    }

    .state {
        font-size: 22rpx;
        color: #6E6E6E;
    }
}

.schedule_situation {
    width: 681rpx;
    height: 67rpx;
    background-size: 100% 100%;
    background-image: url('/static/act/worldCup/quizTop.png');
    box-sizing: border-box;
    padding: 0 42rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 21rpx;
    left: 0;
    right: 0;
    margin: auto;

    .tag {
        width: 120rpx;
        height: 46rpx;

        border-radius: 23rpx;
        font-size: 28rpx;
        font-family: FZLTHK;
        font-weight: normal;
        color: #FFFFFF;
    }

    .selectTag {
        background: #004396;
    }
}

.schedule_confrontation {
    padding: 0 41rpx;
    display: flex;
    justify-content: space-between;
    margin-top: 48rpx;

    .teamBlock {
        width: 154rpx;

        .teamImg {
            width: inherit;
            height: 154rpx;

        }

        .teamName {
            font-size: 24rpx;
            color: #939191;
            margin-top: 8rpx;
            text-align: center;
        }
    }

    .schedule_center {
        display: flex;
        flex-direction: column;
        align-items: center;

        .VS {
            font-size: 100rpx;
            color: #2063B5;
            line-height: 90rpx;
        }

        .manyButton {
            width: 193rpx;
            height: 50rpx;
            background: linear-gradient(180deg, #FE534D, #F63C4B, #EC2846);
            border-radius: 25rpx;
            font-size: 24rpx;
            color: #FEFFFF;
            margin-top: 10rpx;
        }

        .manyNum {
            font-size: 22rpx;
            color: #6E6E6E;
            text-align: center;
            margin-top: 15rpx;
        }
    }
}

.question_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .haoManyGuessIt {
        width: 185rpx;
        height: 42rpx;
        background: #4BB91C;
        border-radius: 0rpx 19rpx 23rpx 0rpx;
        font-size: 22rpx;
        color: #FFFFFF;
        box-sizing: border-box;
        padding-left: 10rpx;
        line-height: 42rpx;
    }

    .question_title {
        font-size: 42rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
    }

    .question_state {
        font-size: 22rpx;
        color: #FFFFFF;
    }
}

.answerContainer {
    display: flex;
    flex-wrap: wrap;

    .answer {
        width: 212rpx;
        height: 82rpx;
        overflow: hidden;
        border-radius: 5rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 23rpx;
    }

    .answer_top {
        width: inherit;
        height: 54rpx;
        background-color: #fff;

        text {
            font-size: 28rpx;
            color: #0A0A0A;
        }
    }

    .answer_top_select {
        background-color: #F5394A;

        text {
            font-size: 28rpx;
            color: #fff;
        }
    }

    .answer_bottom {
        flex: 1;
        background: linear-gradient(0deg, #FFFFFF, #E5E5E5);
        width: inherit;
        font-size: 20rpx;
        color: #0A0A0A;
    }
}
</style>
