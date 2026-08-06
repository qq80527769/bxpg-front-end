<template>
	<view class="game_details">
		<u-navbar :title="$t('title.text19')" :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff"
			leftIconSize="40rpx" :titleStyle="{color: '#fff', fontSize: '32rpx'}" height="120rpx">
		</u-navbar>

		<view class="game_list d_flex">
			<view class="d_jl_list_item" v-for="item in gameList" :key="item.id" @tap="enterGameBtn(item)">
				<u--image radius="10rpx" :src="item.imageUrl" width="220rpx" height="150rpx">
					<template v-slot:loading>
						<u-loading-icon color="#666"></u-loading-icon>
					</template>
				</u--image>

				<view class="text d_ellipsis">
					{{item.gameName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		gameLists,
		enterGame
	} from '@/api/jogos.js'
	export default {
		data() {
			return {
				gameList: [],
				gameType: '',
				platType: ''
			};
		},
		onLoad({
			gameType,
			platType
		}) {
			this.gameType = gameType
			this.platType = platType
			this.getGameList()
		},
		methods: {
			async getGameList() {
				uni.showLoading()
				let {
					code,
					data
				} = await gameLists({
					gameType: this.gameType,
					platType: this.platType
				})
				if (code == 200) {
					uni.hideLoading()
					this.gameList = data.data
				}
			},

			// 进入游戏
			async enterGameBtn(row) {
				if (!this.$isLogin()) {
					return false
				}
				const form = {
					ispc: "device1",
					back: "/",
					gameCode: row.gameCode,
					gameType: row.gameType,
					platType: row.platType

				}
				let {
					code,
					data
				} = await enterGame(form)
				if (code == 200) {
					window.location.href = data
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.game_details {
		padding: 130rpx 20rpx 20rpx 20rpx;

		.game_list {
			padding-top: 20rpx;
			flex-wrap: wrap;
			justify-content: space-between;

			.d_jl_list_item {
				margin-bottom: 20rpx;
				width: 220rpx;

				.text {
					margin: 10rpx;
					color: #838ca0;
					font-size: 24rpx;
				}
			}
		}
	}
</style>