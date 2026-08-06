<template>
	<view class="d_vip">
		<view class="d_v_top">
			<view class="d_v_t d_flex">
				<view class="t_fl">
					<u--image :showLoading="true" src="../../static/images/vip-background.png" width="240rpx"
						height="160rpx" mode="scaleToFill"></u--image>

					<text class="vip_text">VIP{{userInfo.level}}</text>
				</view>
				<view class="t_fr">
					<u--image :showLoading="true" src="../../static/images/vip/v2.png" width="400rpx" height="130rpx"
						mode="widthFix"></u--image>

				</view>
			</view>
			<view class="d_v_fo">
				<u-scroll-list>
					<view v-for="(item,index) in VIPList" :key="index" class="d_v_fo_list">
						<view class="d_v_fo_item d_border12 d_flex"
							:class="[currLevel == item.level ? 'd_v_fo_curritem' : '']"
							@tap="changeVipIndex(item.level)">
							<u-icon v-if="item.is_vip != 1" name="lock-fill" color="#fff" size="32rpx"></u-icon>
							<text>{{item.name}}</text>
						</view>
					</view>
				</u-scroll-list>
			</view>

			<view class="d_v_nav">
				<view class="nav_item d_flex">
					<u--image src="../../static/images/vip/vip_one.png" mode="widthFix" width="140rpx"
						height="100rpx"></u--image>
					<view>
						<text> {{$t('vip.text1')}}: </text>
						<text style="color: orange; margin-left: 10rpx;">R${{VipData.vip_up}}</text>
					</view>
				</view>

				<view class="nav_items d_flex">
					<view class="fl">
						<text> {{$t('vip.text2')}}: </text>
						<text style="color: orange">R${{VipData.single_withdraw}}</text>
					</view>
					<view class="fr">
						<text> {{$t('vip.text3')}}: </text>
						<text style="color: orange">{{VipData.day_withdraw}}</text>
					</view>
				</view>
			</view>

			<view class="_d_v_info">
				<view>{{$t('vip.text4')}}</view>
				<view class="d_border12 d_bgColor border_shadow">
					<view class="io_items"> {{$t('vip.text5')}}: {{VipData.total_recharge}}</view>
					<view class="io_items" style="border: none"> {{$t('vip.text6')}}: {{VipData.total_bet}}</view>
				</view>
			</view>

			<view class="_d_v_jdt">
				<view>{{$t('vip.text7')}}</view>
				<view class="d_border12 d_bgColor border_shadow">
					<view class="io_items">
						<view>
							<text>{{$t('vip.text5')}}</text>
							<text style="margin-left: 10rpx; color: orange;">{{VipData.recharge}}</text>
						</view>
					</view>
					<view class="io_items d_flex" style="border: none">
						<u-line-progress style="height: 30rpx" :percentage="VipData.recharge_b"
							activeColor="#84dd84"></u-line-progress>
						<view class="d_border12" @tap="$tab.navigateTo('/pages/mine/account/index?index=0')">
							IR
						</view>
					</view>
				</view>

				<view class="d_border12 d_bgColor border_shadow" style="margin-top: 20rpx;">
					<view class="io_items">
						<view>
							<text>{{$t('vip.text6')}}</text>
							<text style="margin-left: 10rpx; color: orange;">{{VipData.bet}}</text>
						</view>
					</view>
					<view class="io_items d_flex" style="border: none">
						<u-line-progress style="height: 30rpx" :percentage="VipData.bet_b"
							activeColor="#84dd84"></u-line-progress>
						<view class="d_border12" @tap="$tab.switchTab('/')">
							IR
						</view>
					</view>
				</view>


			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		VIPList,
		memberInfo
	} from '@/api/vip.js'
	export default {
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				VIPList: [],
				VipData: {},
				currLevel: undefined
			};
		},
		onLoad() {
			this.getVIPList()
		},
		methods: {
			async getVIPList() {
				let {
					code,
					data
				} = await VIPList()
				if (code == 200) {
					this.VIPList = data
					this.currLevel = data[0].level
					this.getMemberInfo()
				}
			},

			async getMemberInfo() {
				let {
					code,
					data
				} = await memberInfo(this.currLevel)
				if (code == 200) {
					this.VipData = data
				}
			},

			changeVipIndex(level) {
				this.currLevel = level
				this.getMemberInfo()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d_vip {
		padding-top: 60rpx;
		color: #fff;

		.d_v_top {
			background: url('../../static/images/vip/home_bg.png') no-repeat;
			background-size: 100% 100%;

			.d_v_fo {
				.d_v_fo_list {
					.d_v_fo_item {
						margin-right: 20rpx;
						align-items: center;
						justify-content: center;
						width: 120rpx;
						height: 60rpx;
						background-color: #8619f2;
					}

					.d_v_fo_curritem {
						color: #841c00;
						background-color: #ffcf35;
					}
				}
			}

			.d_v_t {
				margin: 0 0 20rpx 40rpx;
				height: 150rpx;

				.t_fl {
					position: relative;
					margin-right: 20rpx;

					.vip_text {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -40%);
						font-weight: 700;
					}
				}

				.t_fr {
					flex: 1;
				}
			}

			.d_v_nav {
				padding: 0 40rpx;

				.nav_item {
					align-items: center;
					height: 140rpx;
					font-weight: 700;
					border-bottom: 1px solid #999;

					&>view:last-child {
						margin: 0 40rpx;
					}

				}

				.nav_items {
					margin: 20rpx 0;
					font-weight: 700;

					.fl,
					.fr {
						text-align: center;
					}

					&>view:last-child {
						margin: 0 40rpx;
					}
				}
			}

			._d_v_info {
				margin: 20rpx 30rpx;

				.io_items {
					padding: 0 20rpx;
					height: 100rpx;
					line-height: 100rpx;
					border-bottom: 1px solid #444;
				}

				&>view:nth-child(1) {
					height: 60rpx;
					line-height: 60rpx;
				}
			}

			._d_v_jdt {
				margin: 20rpx 30rpx;

				.io_items {
					padding: 20rpx;
					align-items: center;

					&>view:nth-child(2) {
						margin-left: 30rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						width: 120rpx;
						color: #8a1d0a;
						background-color: #ffd737;
					}
				}

				&>view:nth-child(1) {
					height: 60rpx;
					line-height: 60rpx;
				}

			}
		}
	}
</style>