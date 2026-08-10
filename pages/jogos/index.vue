<template>
	<view class="d_jogos">
		<view class="d_j_head d_flex">
			<u-icon class="off_icon" name="../../static/images/off.png" color="#666" size="48rpx"
				@click="showFlPopup=true"></u-icon>

			<view @tap="showLanguage=true" class="d_language d_flex">
				<!-- <text>{{$t('settings.text4')}}</text> -->
				<!-- <u-icon name="reload" color="#fff" size="30rpx"></u-icon> -->
			</view>
			<view class="d_j_h_con">

				<!-- 已登录 -->
				<view v-if="token" class="d_balance d_bgColor d_border12 d_flex">
					<u-icon name="reload" color="#fff" size="40rpx" @tap="refresh"></u-icon>
					<text @tap="$tab.navigateTo('/pages/mine/account/index')">{{userInfo.money}}</text>
				</view>
				<!-- 未登录 -->
				<u-button v-else :customStyle="{height: '50rpx', width: '200rpx'}" :text="$t('jogos.login')"
					shape="circle" color="linear-gradient(to right, rgb(57, 129, 239), rgb(101, 219, 251))"
					@tap="$store.dispatch('LoginPopup', true)"></u-button>
			</view>
			<view class="d_j_h_yj d_bgColor d_flex border_shadow" @tap="to('/pages/jogos/notice/index')">
				<u-icon name="email" color="#2979ff" size="50rpx"></u-icon>
				<!-- <text class="dot"></text> -->
			</view>
		</view>

		<view class="d_j_wrap d_bgColor">
			<view>
				<i>17 </i>
				<i style="font-size: 28rpx;"> Slots</i>
			</view>
			<view>
				merece
			</view>
			<view>
				<u-button type="primary" :text="$t('jogos.eyeDetails')" size="mini" style="height: 60rpx"
					color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
					@tap="$tab.navigateTo('/pages/jogos/about-us/index')"></u-button>
			</view>
		</view>
		<view class="d_j_banner">
			<u-swiper :list="bannerList" previousMargin="30" nextMargin="30" circular height="300rpx" bgColor="#2f3141"
				keyName="image"></u-swiper>
		</view>
		<view class="d_j_nav d_flex d_bgColor" style="display: none">
			<u-transition :show="!showSearch" mode="slide-left">
				<view v-for="item in gameNavList"
					:class="[item.status == navItemStatus ? 'cu_d_j_n_item' : '', 'd_j_n_item', 'd_flex']"
					@tap="changeNavItem(item.status)">
					<view class="top">
						<u--image :src="item.url" width="60rpx" height="60rpx">
							<template v-slot:loading>
								<u-loading-icon color="#666"></u-loading-icon>
							</template>
						</u--image>
					</view>
					<view class="foo">
						{{item.name}}
					</view>

				</view>
				<view class="d_j_n_search d_flex border_shadow " @tap="showSearch=true">
					<u-icon name="search" color="#666" size="28"></u-icon>
				</view>
			</u-transition>

			<u-transition :show="showSearch" mode="slide-right">
				<!-- showSearchList=false -->
				<view class="show_search">
					<u--input :placeholder="$t('jogos.fl8')" border="none" v-model="searchForm.keyword" @blur="handleBlur()"
						:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666'}">
						<template #suffix>
							<u-button type="primary" size="mini" @click="handleSearch">procurar</u-button>
						</template>
					</u--input>
				</view>
			</u-transition>


		</view>
		<!--搜索框-->
		<view class="d_j_nav d_flex d_bgColor">
			<view class="show_search">
				<u--input :placeholder="$t('jogos.fl8')" border="none" v-model="searchForm.keyword" @blur="handleBlur()" :customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666'}">
					<template #suffix>
						<u-button type="primary" size="mini" @click="handleSearch">procurar</u-button>
					</template>
				</u--input>
			</view>
		</view>
		<!--搜索列表-->
		<view class="d_j_search_list d_bgColor d_border12">
			<u-transition :show="showSearchList" mode="slide-right">
				<!-- 	<view class="search_list">
					<view class="search_list_item"
					v-for="item in searchGameList"
					:key="item.id"
					>
						<u--image radius="10rpx" :showLoading="true" :src="item.imageUrl" width="220rpx"
							height="150rpx"></u--image>
						<view class="text d_ellipsis">
						 {{item.gameName}}
						</view>
					</view>
				</view> -->
				<scroll-view scroll-y="true" class="search_list" @scrolltolower="searchScrolltolower">
					<view class="search_list_item" v-for="item in searchGameList" :key="item.id" @tap="enterGameBtn(item)">
						<u--image radius="10rpx" :src="$config.baseImgUrl+item.imageUrl" width="220rpx" height="150rpx">
							<template v-slot:loading>
								<u-loading-icon color="#666"></u-loading-icon>
							</template>
						</u--image>
						<view class="text d_ellipsis">
							{{item.gameName}}
						</view>
					</view>


					<u-empty :show="total == 0" style="margin: 0 auto;" :text="$t('global.title1')"> </u-empty>
				</scroll-view>
			</u-transition>
		</view>

		<view class="d_j_list d_bgColor d_border12" v-for="(key,value) in gameList" :key="value">

			<view class="d_jl_top d_flex">
				<u--image class="fl" src="../../static/images/jogos/youxi1.png" width="50rpx" height="50rpx">
					<template v-slot:loading>
						<u-loading-icon color="#666"></u-loading-icon>
					</template>
				</u--image>
				<view class="con">
					{{value}}
				</view>
				<view class="fr d_flex"
					@tap="$tab.navigateTo(`/pages/jogos/game-details/index?gameType=${key[0].gameType}&platType=${key[0].platType}`)">
					<text>{{$t('jogos.all')}}</text>
					<u-icon name="arrow-right" color="#fff" size="20rpx"></u-icon>
				</view>
			</view>
			<view class="d_jl_list d_flex">
				<view class="d_jl_list_item" v-for="item in key" :key="item.id" @tap="enterGameBtn(item)">
					<u--image radius="10rpx" :src="$config.baseImgUrl+item.imageUrl" width="220rpx" height="150rpx">
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


		<view class="d_j_footer d_bgColor">
			<view class="foo_one d_flex">
				<u--image
					src="../../static/images/logo.png"
					width="500rpx"
					height="100rpx">
					<template v-slot:loading>
					  <u-loading-icon color="#666"></u-loading-icon>
					</template>
					</u--image>
			</view>
			<view class="foo_tow">
				© 2024 源码分享站ymfxz.com {{$t('jogos.fooCopyright')}}
			</view>
			<view class="foo_three d_flex">
				<u--image :showLoading="true" src="../../static/images/jogos/foo1.png" width="70rpx"
					height="50rpx"></u--image>
				<u--image :showLoading="true" src="../../static/images/jogos/foo2.png" width="70rpx"
					height="50rpx"></u--image>
				<u--image :showLoading="true" src="../../static/images/jogos/foo3.png" width="70rpx"
					height="50rpx"></u--image>
				<u--image :showLoading="true" src="../../static/images/jogos/foo4.png" width="70rpx"
					height="50rpx"></u--image>
				<u--image :showLoading="true" src="../../static/images/jogos/foo6.png" width="70rpx"
					height="50rpx"></u--image>
				<u--image :showLoading="true" src="../../static/images/jogos/foo7.png" width="70rpx"
					height="50rpx"></u--image>
			</view>
			<view class="foo_four">
				<view>
					{{$t('jogos.fooIntro')}}
				</view>
				<!-- <view style="color: #06a7cd; margin-top: 10rpx;">mostrar</view> -->
			</view>

			<view class="foo_bar">
				<u--image src="../../static/images/bar.png" width="100%" height="50rpx">
					<template v-slot:loading>
						<u-loading-icon color="#666"></u-loading-icon>
					</template>
				</u--image>
			</view>

		</view>

		<view class="d_download" @tap="$tab.navigateTo('/pages/telegram/index')">
			<u-icon name="../../static/images/jogos/dianban1.png" color="#2979ff" size="100rpx"></u-icon>
		</view>


		<u-popup :show="showFlPopup" mode="left" @close="showFlPopup=false">
			<view class="d_fl_popup d_bgColor">
				<view class="fl_top d_flex" v-show="token">
					<u-avatar :src="userInfo.avatar" shape="circle" size="100rpx"></u-avatar>
					<view class="d_flex">
						<view>{{userInfo.username}}</view>
						<view>ID:{{userInfo.id}}</view>
						<u--image @tap="copyData" src="../../static/images/copy.png" width="28rpx" height="28rpx">
							<template v-slot:loading>
								<u-loading-icon color="#666"></u-loading-icon>
							</template>
						</u--image>
					</view>
				</view>
				<view class="fl_con">
					<view class="f_c_items d_border12 d_flex" @tap="$tab.navigateTo('/pages/telegram/index')">
						<view>{{$t('jogos.fl1')}}</view>
						<u--image src="../../static/images/jogos/fl11.png" width="58rpx" height="58rpx">
							<template v-slot:loading>
								<u-loading-icon color="#666"></u-loading-icon>
							</template>
						</u--image>
					</view>
					<view class="f_c_items d_border12 d_flex" @tap="$tab.navigateTo('/pages/first-storage/index')">
						<view>{{$t('jogos.fl2')}} + 20%</view>
					</view>
					<view class="f_c_items d_border12 d_flex" @tap="$tab.navigateTo('/pages/return-cash/index')">
						<view>{{$t('jogos.fl3')}} + 10%</view>
					</view>


					<view class="f_c_items d_border12 d_flex" @tap="$tab.switchTab('/pages/convidar/index')">
						<u-icon name="../../static/images/jogos/fl22.png" color="#2979ff" size="45rpx"></u-icon>
						<view style="margin-left: 15rpx;">
							{{$t('jogos.fl4')}}
						</view>
					</view>

					<view class="f_c_items d_border12 d_flex" @tap="$tab.navigateTo('/pages/buddy/index')">
						<u-icon name="plus-people-fill" color="#999" size="45rpx"></u-icon>
						<view style="margin-left: 15rpx;">{{$t('jogos.fl5')}}</view>
					</view>

					<view class="f_c_items d_border12 d_flex" @tap="$tab.switchTab('/pages/vip/index')">
						<u-icon name="level" color="#999" size="45rpx"></u-icon>
						<view style="margin-left: 15rpx;">{{$t('jogos.fl6')}}</view>
					</view>

					<view class="f_c_items d_border12 d_flex" @tap="download">
						<u-icon name="download" color="#999" size="45rpx"></u-icon>
						<view style="margin-left: 15rpx;">{{$t('jogos.fl7')}}</view>
					</view>
				</view>

				<u-icon class="off_icon" name="../../static/images/off.png" color="#666" size="48rpx"
					@tap="showFlPopup=false"></u-icon>
			</view>
		</u-popup>

		<u-popup :show="loginPopup" mode="center" @close=" loginNavIndex=0" :round="10">
			<view class="d_login_popup d_bgColor d_border12">
				<view class="login_nav">
					<u-tabs :list="loginNavInfo" :current="loginNavIndex" @click="clickNav" lineWidth="30"
						lineColor="#49acfb" :activeStyle="{
							            color: '#49acfb',
							            fontWeight: 'bold',
							            transform: 'scale(1.05)'
							        }" :inactiveStyle="{
							            color: '#999',
							            transform: 'scale(1)'
							        }"></u-tabs>
				</view>


				<view class="login_from">
					<!-- 登录 -->
					<template v-if="loginNavIndex == 0">
						<view class="fr_one d_flex">
							<u--image :showLoading="true" src="../../static/images/logo.png" width="500rpx"
								height="100rpx"></u--image>

							<!-- <text>77VIP Slots</text> -->
						</view>

						<view style="margin-bottom: 20rpx;">
							<u-tabs
								:list="[{name: $t('popUp.text7'),logins:true}, {name: $t('popUp.text8'),logins:false}]"
								@change="changeTabs" :activeStyle="{
							        color: '#49acfb',
							        fontWeight: 'bold',
							        transform: 'scale(1.05)'
							    }"></u-tabs>
						</view>


						<view class="" style="height: 80rpx;" v-if="logins">
							<u--input :placeholder="LoginName" border="none" v-model="loginForm.username"
								@change="change" shape="circle" color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0px 0px 0px 120rpx', border: '1px solid #666'}"></u--input>

							<view class="" style="width: 120rpx;height: 80rpx;position: relative;top: -80rpx;line-height: 80rpx;
    text-align: center;font-size: 28rpx;">
								+55
							</view>

						</view>


						<view class="" style="height: 80rpx;" v-if="em">
							<u--input :placeholder="LoginName" v-if="em" border="none" v-model="loginForm.username"
								@change="change" shape="circle" color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0px 20rpx', border: '0 20rpx'}"></u--input>
						</view>



						<u--input :placeholder="$t('popUp.text24')" border="none" v-model="loginForm.password"
							shape="circle" @change="change" color="#fff"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}">
							<template slot="suffix">
								<u-icon name="eye" color="#999" size="38rpx"></u-icon>
							</template>
						</u--input>
						<!--
						<view class="fr_four" @tap="loginNavIndex = 2">
						{{$t('popUp.text9')}}
						</view> -->
						<view style="height: 40rpx">

						</view>

						<u-button style="height: 80rpx" type="primary" :text="$t('popUp.text5')" shape="circle"
							@tap="loginSubmit"></u-button>
					</template>
					<template v-if="loginNavIndex == 1">

						<view style="margin-bottom: 20rpx;">
							<u-tabs
								:list="[{name: $t('popUp.text7'),logins:true}, {name: $t('popUp.text8'),logins:false}]"
								@change="changeTabs" :activeStyle="{
							        color: '#49acfb',
							        fontWeight: 'bold',
							        transform: 'scale(1.05)'
							    }"></u-tabs>
						</view>


						<!-- <view style="margin-bottom: 20rpx;">
							<u-tabs :list="[{name: $t('popUp.text7')}, {name: $t('popUp.text8')}]" @change="changeTabs"
								:activeStyle="{
							        color: '#49acfb',
							        fontWeight: 'bold',
							        transform: 'scale(1.05)'
							    }"></u-tabs>
						</view> -->


						<view class="" style="height: 80rpx;" v-if="logins">
							<u--input :placeholder="LoginName" border="none" v-model="loginForm.username"
								@change="change" shape="circle" color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0px 0px 0px 120rpx', border: '1px solid #666', marginTop: '40rpx'}"></u--input>

							<view class=""
								style="width: 120rpx;height: 80rpx;position: relative;top: -80rpx;line-height: 80rpx;text-align: center;font-size: 28rpx;">
								+55</view>

						</view>

						<view class="" style="height: 80rpx;" v-if="em">
							<u--input :placeholder="LoginName" border="none" v-model="loginForm.username"
								@change="change" shape="circle" color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0px 20rpx', border: '1px solid #666'}"></u--input>

						</view>

						<!-- 验证码 -->
					<!-- 	<u--input :placeholder="$t('jogos.title2')" border="none" v-model="loginForm.codes"
							@change="change" shape="circle"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666', marginTop: '20rpx'}">
							<template slot="suffix">
								<u-code ref="uCode" :startText="$t('jogos.title2')" :endText="$t('jogos.title2')"
									@change="codeChange" seconds="60" :changeText="'X' + $t('jogos.title3')"></u-code>
								<u-button :text="tips" type="success" size="mini" color="orange" shape="circle"
									@tap="getVerificationCode('register')"></u-button>
							</template>
						</u--input> -->


						<u--input :placeholder="$t('popUp.text11')" border="none" v-model="loginForm.password"
							@change="change" shape="circle" color="#fff"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666', marginTop: '20rpx'}">
							<template slot="suffix">
								<u-icon name="eye" color="#999" size="38rpx"></u-icon>
							</template>
						</u--input>
						<u--input :placeholder="$t('popUp.text12')" border="none" v-model="loginForm.newPassword"
							@change="change" shape="circle" color="#fff"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666', marginTop: '20rpx'}">
							<template slot="suffix">
								<u-icon name="eye" color="#999" size="38rpx"></u-icon>
							</template>
						</u--input>

						<u--input :placeholder="$t('popUp.text13')" border="none" v-model="loginForm.invitation_code"
							shape="circle" color="#fff"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666', marginTop: '20rpx'}">
						</u--input>

						<view style="height: 60rpx">

						</view>
						<u-button style="height: 80rpx" type="primary" :text="$t('popUp.text6')" shape="circle"
							@tap="signInBtn"></u-button>
					</template>

					<template v-if="loginNavIndex == 3">

						<u--input :placeholder="$t('popUp.text10')" border="none" v-model="loginForm.username"
							@change="change" shape="circle"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666', marginTop: '50rpx'}"></u--input>

						<!-- 	<u--input placeholder="输入验证码" border="none" v-model="loginForm.code" @change="change"
							shape="circle"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666', marginTop: '50rpx'}">
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button :text="tips" type="success" size="mini" color="orange" shape="circle"
									@tap="getVerificationCode('register')"></u-button>
							</template>
						</u--input> -->

						<u--input placeholder="输入新密码" border="none" v-model="loginForm.password" @change="change"
							shape="circle"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', border: '1px solid #666', marginTop: '50rpx'}">
							<template slot="suffix">
								<u-icon name="eye" color="#999" size="38rpx"></u-icon>
							</template>
						</u--input>

						<view style="height: 60rpx">

						</view>
						<u-button style="height: 80rpx" type="primary" text="确定" shape="circle"
							@tap="forgotPasswordBtn"></u-button>
					</template>

				</view>

				<u-icon class="off_icon" name="close-circle" color="#fff" size="48rpx"
					@tap="$store.dispatch('LoginPopup', false); loginNavIndex=0"></u-icon>
			</view>
		</u-popup>

		<u-popup :show="showBonusPopup" mode="center" @close=" loginNavIndex=0" :round="10">
			<view class="d_bonus_popup d_bgColor d_border12">
				<u--image radius="10rpx" :src="$config.baseImgUrl+bonusPopupImg" width="510rpx" height="682rpx" @click="getReceiveBonus">
					<template v-slot:loading>
						<u-loading-icon color="#666"></u-loading-icon>
					</template>
				</u--image>
				<u-icon class="off_icon" name="close-circle" color="#fff" size="48rpx" @tap="showBonusPopup=false; loginNavIndex=0"></u-icon>
			</view>
		</u-popup>


		<u-picker :cancelText="$t('popUp.text2')" :confirmText="$t('popUp.text3')" :show="showLanguage"
			:columns="columns" closeOnClickOverlay @close="showLanguage=false" @cancel="showLanguage=false"
			@confirm="confirmLanguage" keyName="name"></u-picker>
	</view>
</template>

<script>
	import {
		banner,
		gameList,
		enterGame,
		notice,
		popup,
		receiveBonus,
		downloadAddress,
		fuzzyQueryGame
	} from '@/api/jogos.js'
	import {
		login,
		register,
		verificationCode,
		forgotPassword
	} from '@/api/login.js'

	import {
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapGetters(['userInfo', 'token', 'loginPopup'])
		},
		data() {
			return {
				showFlPopup: false,
				tips: '',
				logins: true,
				em: false,

				loginNavIndex: 0,
				showSearch: false,
				navItemStatus: 1,
				bannerList: [],
				loginNavInfo: [{
						name: this.$t('popUp.text5')
					},
					{
						name: this.$t('popUp.text6')
					},
				],
				value: '',
				gameNavList: [
					{
						name: 'PG slots',
						url: require('@/static/images/jogos/pg.png'),
						status: 1
					},
					{
						name: 'PP slots',
						url: require('@/static/images/jogos/pp.png'),
						status: 2
					},
					{
						name: 'WG',
						url: require('@/static/images/jogos/wg.png'),
						status: 3
					},
				],
				gameList: [],

				loginForm: {
					account: '',
					password: '',
					username: '',
					codes: '',
					invitation_code: '',
					newPassword: ''
				},
				LoginName: this.$t('popUp.text7'),
				showLanguage: false,
				columns: [
					[{
							name: this.$t('settings.text5'),
							label: 'zh'
						},

						{
							name: this.$t('settings.text6'),
							label: 'Portugal'
						},
					]
				],
				showNoticeDot: false,
				downloadLink: '',
				showSearchList: false,
				searchForm: {
					keyword: '',
					page: 1,
					list: 10
				},
				total: undefined,
				status: 'loadmore',
				searchGameList: [],

				showBonusPopup:false,// 显示彩金领取弹窗
				bonusPopupImg:'',// 显示彩金领取弹窗图片
			}
		},
		onShow() {
			// this.getNoticeDot()
			this.getPopup()
		},
		onLoad() {
			this.getBanner()
			this.getBameList()
			this.getDownloadAddress()
			if (this.getUrlParam('pid')) {
				this.loginNavIndex = 1
				this.logins = true
				this.$store.dispatch('LoginPopup', true)
				this.loginForm.invitation_code = this.getUrlParam('pid')

				console.log(this.loginForm)
			}
		},
		methods: {
			to(url) {
				uni.navigateTo({
					url
				})
			},

			clickNav({
				index
			}) {
				this.loginNavIndex = index
			},
			codeChange(val) {
				this.tips = val
			},

			// 获取验证码

			async getVerificationCode(event) {
				if (!this.loginForm.username) return
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading()
					const form = {
						username: this.loginForm.username,
						event
					}
					const {
						code,
						data
					} = await verificationCode(form)
					uni.hideLoading();
					if (code == 200) {
						this.$modal.msg(this.$t('jogos.title5'))
						this.$refs.uCode.start();
					}
				} else {
					this.$modal.msg(this.$t('jogos.title4'))
				}
			},
			change(e) {},

			async getBanner() {
				let {
					data,
					code
				} = await banner()
				if (code == 200) {
					data.map(item => {
						return item.image = this.$config.baseImgUrl + item.image
					})
					this.bannerList = data
				}
			},

			async getBameList() {
				let {
					data,
					code
				} = await gameList({
					status: this.navItemStatus
				})
				if (code == 200) {
					this.gameList = data
				}
			},

			changeNavItem(status) {
				this.navItemStatus = status
				this.getBameList()
			},

			// 登录
			async loginSubmit() {
				// console.log(this.loginForm)
				await this.$store.dispatch('Login', this.loginForm)

				this.$modal.msg(this.$t('popUp.text14'))
				this.$store.dispatch('LoginPopup', false)
				this.$store.dispatch('GetInfo')
				this.getPopup()
			},

			// 注册
			async signInBtn() {
				let {
					account,
					username,
					password,
					// codes,
					invitation_code
				} = this.loginForm
				console.log(this.loginForm)
				const data = await register({
					username,
					password,
					// codes,
					invitation_code
				})
				if (data.code == 200) {
					this.$modal.msg(this.$t('popUp.text17'))
					this.$dDelay(1000).then(res => {
						this.loginNavIndex = 0
					})
				}
			},

			// 进入游戏
			async enterGameBtn(row) {
				if (!this.$isLogin()) {
					return this.$store.dispatch('LoginPopup', true)
				}

				uni.showLoading()
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
				uni.hideLoading()
			},

			// 找回密码
			async forgotPasswordBtn() {
				let {
					code,
					data
				} = await forgotPassword(this.loginForm)
				if (code == 200) {
					this.$modal.msg(this.$t('popUp.text18'))
					this.$dDelay(1000).then(res => {
						this.loginNavIndex = 0
					})
				}
			},

			//刷新余额
			async refresh() {
				await this.$store.dispatch('GetInfo')
				this.$modal.msg(this.$t('popUp.text25'))
			},

			changeTabs({
				name,
				logins
			}) {

				this.LoginName = name
				if (logins) {
					this.em = false
				} else {
					this.em = true
				}

				this.logins = logins
			},

			// 如果检测有pid 打开注册弹窗
			getUrlParam(param) {
				// let urlObj = new URL(url);
				// return urlObj.searchParams.get(param);
				const options = uni.getLaunchOptionsSync();
				if (options.query && options.query[param]) {
					return options.query[param];
				}
				return null;
			},

			getDetails(val) {
				console.log(val)

			},

			async confirmLanguage({
				value
			}) {

				await this.$store.dispatch('Language', value[0].label)
				this.showLanguage = false
				this.$i18n.locale = value[0].label
				this.$modal.msg(this.$t('popUp.text15'))
				this.setTabBarItem()
			},

			setTabBarItem() {
				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabbar.one')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabbar.tow')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabbar.three')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabbar.four')
				})
				uni.setTabBarItem({
					index: 4,
					text: this.$t('tabbar.five')
				})
			},

			// 复制内容
			copyData() {
				let _this = this
				uni.setClipboardData({
					data: String(_this.userInfo.id),
					success: function() {
						_this.$modal.msg(_this.$t('popUp.text16'))
					}
				})
			},

			async getNoticeDot() {
				let {
					code,
					data
				} = await notice()
				if (code == 200) {
					this.showNoticeDot = data
				}
			},
			// 获取弹窗图片
			async getPopup() {
				let {
					code,
					data
				} = await popup()
				if (code == 200) {
					if (data.is_bonus === 0){
						this.$store.dispatch('LoginPopup', false)
						this.showBonusPopup = !data.is_bonus
						this.bonusPopupImg = data.img
					}
				}
			},
			// 领取彩金
			async getReceiveBonus() {
				if (!this.$isLogin()) {
					this.showBonusPopup = false
					return this.$store.dispatch('LoginPopup', true)
				}
				uni.showLoading()
				let {
					code,
					data,
					msg
				} = await receiveBonus()

				if (code == 200) {
					this.showBonusPopup = false
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: msg
					})
				}
			},

			async getDownloadAddress() {
				let {
					code,
					data
				} = await downloadAddress()
				if (code == 200) {
					this.downloadLink = data
				}
			},

			download() {
				window.location.href = this.downloadLink.appd
			},

			async getFuzzyQueryGame() {
				this.showSearchList = true

				let {
					code,
					data
				} = await fuzzyQueryGame(this.searchForm)
				if (code == 200) {

					this.total = data.tal
					this.status = 'loadmore'
					this.searchGameList = this.searchGameList.concat(data.data)
					if (this.searchForm.list > data.data.length) {
						return this.status = 'nomore'
					}
				}
			},

			async searchScrolltolower() {

				if (this.total < (this.searchForm.page + 1) * this.searchForm.list) {
					return false
				}
				this.searchForm.page += 1
				this.getFuzzyQueryGame()
			},
			// 点击搜索
			handleSearch() {
				this.searchGameList = []
				this.total = 0
				this.searchForm.page = 1
				this.searchForm.list = 10

				if (this.searchForm.keyword) {
					this.getFuzzyQueryGame()
				}
			},
			handleBlur() {
				// 延迟关闭，避免点击搜索按钮时冲突
				setTimeout(() => {
					// this.showSearch = false;
					// // this.showSearch=false;
					// // this.showSearchList=false;
					// this.searchForm.keyword = ''
				}, 200);
			},
		},
		watch: {
			loginNavIndex(index) {
				if (index == 2) {
					this.loginNavInfo = [{
						name: '忘记密码'
					}]

				} else {
					this.loginNavInfo = [{
							name: this.$t('popUp.text5')
						},
						{
							name: this.$t('popUp.text6')
						},
					]
				}
				this.loginForm.account = ''
				this.loginForm.password = ''
				this.loginForm.username = ''
				this.loginForm.codes = ''
				this.loginForm.newPassword = ''
				this.LoginName = this.$t('popUp.text7')
			},

			'searchForm.keyword'() {
				if (this.searchForm.keyword == '') {
					this.showSearch=false;
					this.showSearchList=false;
				}
			}
		},
		onHide() {
			this.showFlPopup = false
		}
	}
</script>

<style lang="scss" scoped>
	.d_jogos {
		.d_j_head {
			padding: 10rpx;
			align-items: center;

			.d_language {
				padding-left: 20rpx;
				color: #fff;
				width: 120rpx;
			}

			.d_balance {
				padding: 15rpx 20rpx;
				color: #fff;
				justify-content: space-between;
				min-width: 200rpx;
				align-items: center;

				&>text {
					// margin-left: 20rpx;
				}
			}

			.d_j_h_con {
				margin: 0 20rpx 0 280rpx;
			}

			.d_j_h_yj {
				align-items: center;
				justify-content: center;
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;

				.dot {
					position: absolute;
					right: 15rpx;
					top: 15rpx;
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background-color: #eb488a;
				}
			}
		}

		.d_j_wrap {
			padding: 20rpx;
			margin: 10rpx 0 20rpx 0;
			height: 200rpx;

			&>view:nth-child(1) {
				color: #ff328b;
				font-weight: 700;
				font-size: 40rpx;
			}

			&>view:nth-child(2) {
				margin: 10rpx 0 20rpx 0;
				color: #999;
			}

			&>view:nth-child(3) {
				display: inline-block;
				min-width: 200rpx;
			}
		}

		.d_j_banner {}

		.d_j_nav {
			position: relative;
			margin-bottom: 20rpx;
			align-items: center;

			.u-transition {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.show_search {
				margin: 30rpx 0 40rpx 30rpx;
				width: 700rpx;
			}

			.d_j_n_item {
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 125rpx;
				height: 160rpx;
				color: #838ca0;

				.foo {
					margin-top: 6rpx;
				}
			}

			.cu_d_j_n_item {
				position: relative;
				color: #fff;

				&::before {
					position: absolute;
					bottom: 10rpx;
					content: '';
					width: 40rpx;
					height: 4rpx;
					background-color: #70aaf8;
					border-radius: 4rpx;
				}
			}

			.d_j_n_search {
				justify-content: center;
				align-items: center;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
		}

		.d_j_search_list {
			// padding: 10rpx;
			margin: 0 10rpx 20rpx 10rpx;

			.search_list {
				padding-top: 20rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				height: 600rpx;

				.search_list_item {
					margin-bottom: 20rpx;
					width: 220rpx;

					.text {
						margin: 10rpx;
						color: #838ca0;
						font-size: 24rpx;
					}
				}
			}

			::v-deep .uni-scroll-view-content {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.search_list_item:nth-child(3n-1) {
					margin: 0 20rpx;
				}
			}
		}

		.d_j_list {
			padding: 10rpx;
			margin: 0 10rpx 20rpx 10rpx;

			.d_jl_top {
				color: #fff;
				align-items: center;

				.con {
					margin: 0 20rpx;
					flex: 1;
					font-size: 34rpx;
					font-weight: 700;
				}

				.fr {
					padding: 0 16rpx;
					height: 50rpx;
					align-items: center;
					border-radius: 45rpx;
					background: linear-gradient(90deg, #3c4256 0%, transparent 100%);
				}
			}

			.d_jl_list {
				padding-top: 20rpx;
				flex-wrap: wrap;

				.d_jl_list_item {
					margin-bottom: 20rpx;
					width: calc(100% / 3);
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;

					.text {
						margin: 10rpx;
						color: #838ca0;
						font-size: 24rpx;
					}
				}
			}



		}

		.d_fl_popup {
			padding: 60rpx 20rpx 20rpx 20rpx;
			position: relative;
			width: 600rpx;
			height: 100%;
			color: #fff;

			.fl_top {
				flex-direction: column;
				align-items: center;

				&>view:last-child {
					align-items: center;
					margin-top: 20rpx;
					font-size: 30rpx;

					&>view:nth-child(1) {
						padding-right: 20rpx;
						border-right: 1px solid #999;
					}

					&>view:nth-child(2) {
						margin: 0 20rpx;
					}
				}
			}

			.fl_con {
				margin-top: 20rpx;

				.f_c_items {
					padding: 0 30rpx;
					align-items: center;
					height: 70rpx;
					width: 100%;
					font-size: 26rpx;
				}

				.f_c_items:nth-child(1) {
					margin-bottom: 20rpx;
					background: url('../../static/images/jogos/fl1.png') no-repeat;
					background-size: 100% 100%;
				}

				.f_c_items:nth-child(2) {
					margin-bottom: 20rpx;
					background: url('../../static/images/jogos/fl2.png') no-repeat;
					background-size: 100% 100%;
				}

				.f_c_items:nth-child(3) {
					margin-bottom: 20rpx;
					background: url('../../static/images/jogos/fl3.png') no-repeat;
					background-size: 100% 100%;
				}

				// .f_c_items:nth-child(4) {
				// 	margin-bottom: 20rpx;
				// 	background: url('../../static/images/jogos/fl4.png') no-repeat;
				// 	background-size: 100% 100%;
				// }
			}

			.off_icon {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
			}
		}

		.d_j_footer {
			padding: 40rpx 20rpx;
			margin-top: 20rpx;
			height: 600rpx;
			color: #eaeaea;

			.foo_one {
				justify-content: center;
				align-items: center;

				&>text {
					margin-left: 20rpx;
				}
			}

			.foo_tow {
				margin-top: 20rpx;
				height: 70rpx;
				text-align: center;
			}

			.foo_three {
				margin: 20rpx 0 40rpx 0;
				justify-content: space-around;
			}

			.foo_four {
				text-align: center;
				color: #999;
			}

			.foo_bar {
				margin-top: 20rpx;
			}
		}


		.d_login_popup {
			padding: 30rpx;
			height: 850rpx;
			width: 680rpx;
			color: #fff;

			.login_nav {
				::v-deep .u-tabs__wrapper__nav__item {
					flex: 1;
				}
			}

			.login_from {

				.fr_one {
					margin: 20rpx 0;
					flex-direction: column;
					align-items: center;
					font-size: 34rpx;

					&>text {
						margin-top: 20rpx;
					}
				}

				.fr_four {
					height: 80rpx;
					line-height: 80rpx;
				}
			}

			.off_icon {
				position: absolute;
				bottom: -80rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.d_download {
			position: fixed;
			bottom: 200rpx;
			right: 40rpx;
			border-radius: 50%;
		}

		.d_bonus_popup {
			color: #fff;

			.off_icon {
				position: absolute;
				bottom: -80rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
</style>