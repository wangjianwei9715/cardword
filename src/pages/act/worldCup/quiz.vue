<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:32:37
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-16 14:22:55
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
                            <muqian-lazyLoad class="teamImg" :src="$parsePic(decodeURIComponent(item.away_logo))" />
                            <view class="teamName u-line-1">{{ item.away_team }}</view>
                        </view>
                    </view>
                </view>
                <view class="questionContainer" v-for="(question, questionIndex) in item.questions">
                    <view class="question_top">
                        <!-- :style="{ opacity: item.state >= 2 ? 1 : 0 }" -->
                        <view class="haoManyGuessIt">{{ queryParams.tp == 1 ? `进行中` : `${question.hitNum}人猜中`
                        }}
                        </view>
                        <view class="question_title">{{ question.title }}</view>
                        <view class="question_state">{{ filterQuestionText(item.state, question) }}</view>
                    </view>
                    <view class="answerContainer">
                        <view class="answer" v-for="(answer, answerIndex) in question.answers"
                            @click="onClickAnswer(item, question, answer)"
                            :style="{ marginRight: (answerIndex + 1) % 3 == 0 ? `0rpx` : `20rpx` }">
                            <view class="answer_top flexCenter" :class="{ answer_top_select: answer.isLike }">
                                <text>{{ answer.name }}</text>
                                <view class="correct" v-if="answer.answerId == question.correctId"></view>
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
        <u-popup :show="popShow" :round="20" @close="popShow = false" mode="bottom">
            <view class="quizPopup">
                <view class="quiz_title flexCenter">确认投注情况</view>
                <view class="quiz_team">
                    <view class="teamContainer">
                        <view class="team">
                            <muqian-lazyLoad class="logo"
                                :src="$parsePic(decodeURIComponent(clickSchedule.home_logo))" />
                            <view class="teamName">{{ clickSchedule.home_team }}</view>
                        </view>
                        <view class="vs">VS</view>
                        <view class="team">
                            <muqian-lazyLoad class="logo"
                                :src="$parsePic(decodeURIComponent(clickSchedule.away_logo))" />
                            <view class="teamName">{{ clickSchedule.away_team }}</view>
                        </view>
                    </view>
                    <view class="quiz_team_info">
                        <view class="left">{{ clickQuestion.title }}：{{ clickAnswer.name }}</view>
                        <view class="right">已投：{{ clickAnswer.betNum }}</view>
                    </view>
                </view>
                <view class="quiz_numContainer">
                    <view class="chips flexCenter" :style="{ marginRight: (index + 1) % 3 == 0 ? `0rpx` : `8rpx` }"
                        :class="{ chips_select: item.isSelect }" v-for="(item, index) in assignBeanList" :key="index"
                        @click="onClickBean(item)">{{ item.isCustom ? '最大投注:' : '' }}{{ item.num }}</view>
                    <view class="chips_tips">
                        <view class="left">当前倍率：{{ clickAnswer.multiple }}</view>
                        <view class="right">投注上限：{{ clickQuestion.topBetNum }}</view>
                    </view>
                </view>
                <view class="quiz_buttonContainer">
                    <view class="button flexCenter" @click="popShow = false">取消</view>
                    <view class="button button_green flexCenter" @click="$u.throttle(confirmQuiz, 500)">确定</view>
                </view>
            </view>
            <view class="bottomSafeArea"></view>
        </u-popup>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Prop } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    @Prop({ default: 0 })
    bean!: number;
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 5,
        tp: 1
    }
    list: any = []
    isFetchEnd: boolean = true
    quizBeanConfList: any = []
    assignBeanList: any = []
    popShow: boolean = false
    tagData: any = {
        index: 0,
        list: [{ label: '进行中', value: 1 }, { label: '往期', value: 2 }, { label: '我的', value: 3 }]
    }
    clickSchedule: any = {}
    clickQuestion: any = {}
    clickAnswer: any = {}
    selectBeanNum: number = 0
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
        if (!this.selectBeanNum) {
            uni.showToast({
                title: '请选择投注数量',
                icon: 'none'
            })
            return
        }
        uni.showModal({
            title: '提示',
            content: '确认投注?',
            success: (result: any) => {
                if (result.confirm) this.joinQuiz(this.clickSchedule.id, this.clickAnswer.answerId, this.selectBeanNum)
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
            setTimeout(() => {
                this.queryParams.fetchFrom = 1
                this.reqNewData()
            }, 200)
            this.popShow = false
            this.$emit('getNewBean')
        }, (err: any) => {
            app.platform.UINotificationFeedBack('error')
            setTimeout(() => {
                this.queryParams.fetchFrom = 1
                this.reqNewData()
                this.popShow = false
            }, 200)
        })
    }
    hasOneLike(answers: any) {
        const likesArray: any = answers.filter((item: any) => item.isLike)
        return likesArray.length > 0
    }
    filterQuestionText(state: any, question: any) {
        if (state == 1) return '进行中'
        const winNum_isUnde = typeof question.win_num == undefined
        if (winNum_isUnde || !this.hasOneLike(question.answers)) return '未参与'
        if (!winNum_isUnde) return question.win_num >= 0 ? `+${question.win_num}` : question.win_num
    }
    onClickBean(item: any) {
        this.assignBeanList.forEach((element: any) => {
            element.isSelect = false
        });
        item.isSelect = true
        this.selectBeanNum = item.num
    }
    onClickAnswer(schedule: any, question: any, answer: any) {
        if (schedule.state != 1) return
        if (!this.bean) {
            uni.showToast({
                title: '世界豆数量不足',
                icon: 'none'
            })
            return
        }
        this.clickSchedule = schedule
        this.clickQuestion = question
        this.clickAnswer = answer
        app.http.Get(`dataApi/worldCup/bean/guessing/answer/bet/data/${answer.answerId}`, {}, (res: any) => {
            this.clickAnswer.multiple = res.data.multiple
            this.clickAnswer.betNum = res.data.betNum || 0
            this.selectBeanNum = 0
            this.beanConfArray()
            this.popShow = true
        })
    }
    beanConfArray() {
        if (!this.clickSchedule.id || !this.clickQuestion.id || !this.clickAnswer.answerId) this.assignBeanList = []
        let list: any = this.quizBeanConfList.map((item: any) => {
            return {
                num: item,
                isCustom: false,
                isSelect: false
            }
        })
        list.push({
            num: (this.clickQuestion.topBetNum || 0) - (this.clickAnswer.betNum || 0),
            isCustom: true,
            isSelect: false
        })
        this.assignBeanList = list
        // return list
    }
    reqQuizBeanConfig() {
        app.http.Get(`dataApi/worldCup/bean/guessing/bet/cfg`, {}, (res: any) => {
            this.quizBeanConfList = res.list || []
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/guessing/list`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
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
        text-align: center;
        flex: 1;
        color: #FFFFFF;
    }

    .question_state {
        min-width: 180rpx;
        font-size: 22rpx;
        text-align: right;
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
        position: relative;

        text {
            font-size: 28rpx;
            color: #0A0A0A;
        }

        .correct {
            width: 27rpx;
            height: 27rpx;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 10rpx;
            background-size: 100% 100%;
            background-image: url('/static/act/worldCup/guessBall.png');
            // background: linear-gradient(90deg, #FF414B, #FF977F);
            // border-radius: 50%;
            position: absolute;
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

.quizPopup {
    width: 750rpx;
    background-color: #fff;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    box-sizing: border-box;

    .quiz_title {
        font-size: 34rpx;
        font-weight: bold;
        color: #333333;
        height: 100rpx;
    }

    .quiz_team {
        width: inherit;
        height: 242rpx;
        background-size: 100% 100%;
        background-image: url('/static/act/worldCup/quizBack.png');
        box-sizing: border-box;
        padding: 21rpx 60rpx 0 60rpx;

        .teamContainer {
            height: 164rpx;
            background: #FFFFFF;
            border-radius: 10rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            padding: 0 109rpx;
            align-items: center;

            .team {
                width: 84rpx;
                position: relative;
                height: 84rpx;
                position: relative;
                bottom: 6rpx;

                .logo {
                    width: 84rpx;
                    height: 84rpx;
                    display: block;
                }

                .teamName {
                    position: absolute;
                    font-size: 28rpx;
                    color: #6A6969;
                    left: 50%;
                    white-space: nowrap;
                    transform: translate(-50%, 0);
                }
            }
        }

        .vs {
            font-size: 88rpx;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #2063B5;
        }

        .quiz_team_info {
            display: flex;
            justify-content: space-between;
            font-size: 28rpx;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 12rpx;
        }
    }

    .quiz_numContainer {
        width: 100%;
        box-sizing: border-box;
        padding: 0 32rpx;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20rpx;
        align-content: flex-start;

        .chips {
            width: 221rpx;
            height: 83rpx;
            background: #FFFFFF;
            border: 2rpx solid #D7D7D7;
            border-radius: 10rpx;
            font-size: 28rpx;
            color: #1C1C1C;
            margin-bottom: 20rpx;
        }

        .chips_select {
            color: #35BD2A;
            border: 2rpx solid #2EAB24;
        }

        .chips_tips {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 28rpx;
            justify-content: space-between;
            color: #1C1C1C;
            margin-bottom: 40rpx;
        }
    }

    .quiz_buttonContainer {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding: 0 32rpx;
        margin-bottom: 16rpx;
        justify-content: space-between;

        .button {
            width: 310rpx;
            height: 75rpx;
            border: 1rpx solid #000000;
            border-radius: 10rpx;
            font-size: 30rpx;
            color: #000000;
        }

        .button_green {
            background: #238E1A;
            border: 1rpx solid #238E1A;
            color: #fff;
        }
    }
}
</style>
