<template>
	<view class="d_play_record">
		<u-navbar :title="$t('title.text20')" :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff" leftIconSize="40rpx"
			:titleStyle="{color: '#fff', fontSize: '32rpx'}" height="120rpx">
		</u-navbar>


		<view class="d_p_re_time d_flex d_border12 d_bgColor">
			<view @tap="showStartDate = true">{{form.startDateTime || $t('playRecord.text1')}}</view>
			<view>-</view>
			<view @tap="showEndDate = true">{{form.endDateTime || $t('playRecord.text2')}}</view>
			<u-icon name="arrow-down" color="#999" size="28rpx"></u-icon>
		</view>

		<view class="d_p_re_list">
			<view class="tit d_bgColor d_flex">
				<view class="rows d_flex">
					{{$t('playRecord.text3')}}
				</view>
				<view class="rows d_flex">
					{{$t('playRecord.text4')}}
				</view>
				<view class="rows d_flex">
					{{$t('playRecord.text5')}}
				</view>
				<view class="rows d_flex">
					{{$t('playRecord.text6')}}
				</view>
			</view>


			<scroll-view scroll-y="true" class=" re_lists" @scrolltolower="scrolltolowers">
				<view class="re_lists_items d_flex d_bgColor" v-for="item in gameList" :key="item.id">
					<text>{{item.game_type_name}}</text>
					<text>{{item.create_at}}</text>
					<text>{{item.bet_amount}}</text>
					<text>{{item.net_amount}}</text>
				</view>

				<u-loadmore 
				:loadmoreText="$t('global.title2')"
				:loadingText="$t('global.title3')"
				:nomoreText="$t('global.title4')"
				:status="status" />
			</scroll-view>

		</view>
		<u-datetime-picker 
		:cancelText="$t('popUp.text3')"
		:confirmText="$t('popUp.text2')"
		:show="showStartDate" mode="date" @close="showStartDate=false" @cancel="showStartDate=false"
			:closeOnClickOverlay="true" @confirm="confirmStartDate"></u-datetime-picker>

		<u-datetime-picker 
		:cancelText="$t('popUp.text3')"
		:confirmText="$t('popUp.text2')"
		:show="showEndDate" mode="date" @close="showEndDate=false" @cancel="showEndDate=false"
			:closeOnClickOverlay="true" @confirm="confirmEndDate"></u-datetime-picker>
	</view>
</template>

<script>
	import {
		gameRecord
	} from '@/api/mine.js'
	export default {
		data() {
			return {
				form: {
					page: 1,
					list: 10,
					startDateTime: '',
					endDateTime: '',
				},
				gameList: [],
				status: 'loadmore',
				total: 0,
				showStartDate: false,
				showEndDate: false
			};
		},
		onLoad() {
			this.getGameRecord()
		},
		methods: {
			async getGameRecord() {
				let {
					code,
					data
				} = await gameRecord(this.form)
				if (code == 200) {
					this.gameList = this.gameList.concat(data.data)
					this.total = data.tal
					this.status = 'loadmore'

					if (this.form.list > data.data.length) {
						return this.status = 'nomore'
					}

				}
			},

			scrolltolowers() {
				if (this.total <= (this.form.page + 1) * this.form.list) {
					return false
				}
				this.form.page += 1
				this.getGameRecord()
			},

			confirmStartDate({
				value
			}) {
				this.form.startDateTime = this.$u.timeFormat(value, 'yyyy-mm-dd')
				this.showStartDate = false
				if (!this.form.endDateTime) return
				this.clear()
				this.getGameRecord()
			},

			confirmEndDate({
				value
			}) {
				this.form.endDateTime = this.$u.timeFormat(value, 'yyyy-mm-dd')
				this.showEndDate = false
				if (!this.form.startDateTime) return
				this.clear()
				this.getGameRecord()
			},
			clear() {
				this.form.page = 1
				this.gameList = []
			}

		}
	}
</script>

<style lang="scss" scoped>
	.d_play_record {
		padding: 130rpx 20rpx 20rpx 20rpx;
		color: #fff;

		.d_p_re_time {
			justify-content: center;
			padding: 10rpx 20rpx;
			width: 380rpx;

			&>view:nth-child(2) {
				margin: 0 10rpx;
			}

			&>view:last-child {
				margin-left: 10rpx;
			}
		}

		.d_p_re_list {

			.tit {
				margin-top: 20rpx;
				border-radius: 12rpx 12rpx 0 0;

				.rows {
					flex: 1;
					height: 100rpx;
					justify-content: center;
					align-items: center;
				}
			}

			.re_lists {
				overflow: hidden;
				height: calc(100vh - 320rpx);

				.re_lists_items {
					height: 80rpx;

					&>text {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
					}
				}
			}

		}
	}
</style>