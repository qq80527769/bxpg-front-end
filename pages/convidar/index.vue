<template>
	<view class="d_convidar">
		<view class="d_co_tabs d_flex">
			<view 
			class="d_flex"
			v-for="item in tabList"
			:key="item.name"
			:class="['d_flex', currTab == item.name ? 'curr_tabs' : '']"
			@tap="currTab = item.name"
			>
				<u-icon :name="item.url" color="#999" size="52rpx"></u-icon>
				<view>
					<text>{{item.name}}</text>
				</view>
			</view> 
		</view>
		<view class="d_co_con">
			<view class="one_cons" v-if="currTab === $t('convidar.tabs1')">
				<view class="o_c_banner">
					<view class="text">
						{{$t('convidar.text1')}}
 					</view>
				</view>
				
				<view class="o_c_yaoqing">
					<view class="yaoqing_one">{{$t('convidar.copyLink')}}</view>
					<view class="d_flex yaoqing_tow">
						<text class="d_flex d_bgColor border_shadow d_border12 d_ellipsis">{{inviteLink}}</text>
						<text class="d_border12" @tap="copyData">
							{{$t('convidar.copy')}}
						</text>
					</view>
				</view>
				
				<view class="o_c_yaoqing">
					<view class="yaoqing_one">
						{{$t('convidar.socialLink')}}
					</view>
					<view class="yaoqing_three  d_border12" >
					</view>
				</view>
				
				<view class="team_exm">
						<u--image :showLoading="true" 
						mode="widthFix"
						src="../../static/images/convidar/6.svg" width="100%" height="200rpx" @click="click"></u--image>
				</view>
				
				<view class="team_fwb">
					<u-parse :content="content.content"></u-parse>
				</view>
			</view>
			
			
			<view v-if="currTab === $t('convidar.tabs2')">
				<view class="tow_cons">
					<view class="t_c_tabs">
						    <u-tabs 
							:activeStyle="{
							        color: '#fff',
							        fontWeight: 'bold',
							        transform: 'scale(1.05)'
							    }" 
							:list="
							[{name: $t('convidar.text6'), type: 'tier1'}, 
							{name: $t('convidar.text7'), type: 'tier2'},
							{name: $t('convidar.text8'), type:'tier3'}]
							" @click="clickTCTabs"></u-tabs>
					</view>
					
					<!-- <view class="d_p_re_time d_flex d_border12 d_bgColor">
						<view @tap="showStartDate = true">{{form.startDateTime || '开始时间'}}</view>
						<view>-</view>
						<view @tap="showEndDate = true">{{form.endDateTime || '结束时间'}}</view>
						<u-icon style="margin-left: 20rpx;" name="arrow-down" color="#999" size="28rpx"></u-icon>
					
						<view class="all d_flex" @tap="filterCustomer=true">
							<text>213</text>
							<u-icon name="arrow-down" color="#999" size="28rpx"></u-icon>
						</view>
					</view> -->
					
					<view class="d_p_re_list">
						
						<view class="re_total d_bgColor">
							{{$t('convidar.text10')}} ：{{invitationLists[`${summation}_num`] || 0}}
						</view>
						
						<view class="re_total d_bgColor">
							{{$t('convidar.text11')}} ：{{invitationLists[`${summation}_total_recharge`] || 0}}
						</view>
						
						<view class="re_total d_bgColor">
							{{$t('convidar.text12')}} ：{{invitationLists[`${summation}_total_wih`] || 0}}
						</view>
						
						<view class="tit d_bgColor d_flex">
							<view class="rows d_flex">
								{{$t('convidar.text2')}}
							</view>
							<view class="rows d_flex">
								{{$t('convidar.text3')}}
							</view>
							<view class="rows d_flex">
								{{$t('convidar.text4')}}
							</view>
							<view class="rows d_flex">
								{{$t('convidar.text5')}}
							</view>
						</view>
					
					
						<scroll-view scroll-y="true" class="re_lists"
							>
							
							<view class="re_lists_items d_flex d_bgColor" v-for="item in invitationList" :key="item.id">
								<text>{{item.createtime}}</text>
								<text>{{item.mobile}}</text>
								<text>{{item.total_recharge}}</text>
								<text>{{item.total_bet}}</text>
							</view>
							
							
							
						</scroll-view>
					
					</view>
				</view>
			</view>
		</view>
		
				<u-picker 
				:cancelText="$t('popUp.text2')"
				:confirmText="$t('popUp.text3')"
				:show="filterCustomer" :columns="columns"
				closeOnClickOverlay
				@close="filterCustomer=false"
				@cancel="filterCustomer=false"
				keyName="name"
				></u-picker>
	</view>
</template>

<script>
	import { inviteLink, invitationList } from '@/api/convidar.js'
	import { eventDetails } from '@/api/jogos.js'
	export default {
		
		data() {
			return {
				tabList: [
					{name: this.$t('convidar.tabs1'), url: require('../../static/images/convidar/1.png')},
					{name: this.$t('convidar.tabs2'), url: require('../../static/images/convidar/3.png')},
				],
				currTab: this.$t('convidar.tabs1'),
				form: {
					page: 1,
					list: 10,
					startDateTime : '',
					endDateTime  : '',
				},
				columns: [
					[
						{name: '全部', index: 1},
						{name: '已存入', index: 2},
						{name: '未存入', index: 3},
					]
				],
				filterCustomer: false,
				
				inviteLink: '',
				content: '',
				
				invitationLists: [],
				invitationList: [],
				
				// 记录当前哪个阶段的总和
				summation: 'one'
			};
		},
		onLoad() {
			this.getInviteLink()
			this.getEventDetails()
			this.getInvitationList()
		},
		methods: {
			clickTCTabs({type}){
				this.invitationList = this.invitationLists[type]
				if(type == 'tier1'){
					this.summation = 'one'
				} else if (type == 'tier2'){
					this.summation = 'two'
				}else if (type == 'tier3'){
					this.summation = 'three'
				}
			},
			
			async getInviteLink(){
				let {code, data} = await inviteLink()
				if(code == 200){
					this.inviteLink = data.share_link
				}
			},
			async getEventDetails(){
				let {code, data} = await eventDetails(4)
				if(code == 200){
					this.content = data
				}
			},
			
			async getInvitationList(){
				let {code, data } = await invitationList()
				if(code == 200){
					this.invitationLists = data
					this.invitationList = data.tier1
					this.summation = 'one'
				}
			},
			
			// 复制内容
			copyData(){
				let _this = this
				uni.setClipboardData({
					data: _this.inviteLink,
					success: function () {	
							_this.$modal.msg(_this.$t('popUp.text16'))
						}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.d_convidar{
	color: #fff;
	.d_co_tabs{
		padding: 20rpx 0;
		justify-content: space-around;
		& > view{
			align-items: center;
			color: #888;
			& > view {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
			}
		}
		.curr_tabs{
			position: relative;
			color: #fff;
			&::before{
				content: '';
				position: absolute;
				bottom: -20rpx;
				left: 46%;
				background-color: #49acfb;
				width: 70rpx;
				height: 4rpx;
			}
		}
	}
	
	.d_co_con{
		.one_cons{
			.o_c_banner{
				position: relative;
				height: 400rpx;
				background: url('../../static/images/convidar/4.jpg') no-repeat;
				background-size: 100% 100%;
				.text{
					position: absolute;
					right: 80rpx;
					top: 130rpx;
					width: 500rpx;
				}
			}
			
			.o_c_yaoqing{
				padding: 20rpx;
				font-size: 30rpx;
				.yaoqing_one{
					height: 80rpx;
					line-height: 80rpx;
					color: #3270f5;
				}
				.yaoqing_tow{
					height: 80rpx;
					& > text:nth-child(1){
						padding: 0 20rpx;
						flex: 1;
						align-items: center;
					}
					& > text:nth-child(2){
						width: 120rpx;
						line-height: 80rpx;
						text-align: center;
						background: linear-gradient(60deg,#3378ee 0%,#0de5ff 100%);
					}
				}
				
				.yaoqing_three{
					height: 120rpx;
					background: url('../../static/images/convidar/5.png') no-repeat;
					background-size: 100% 100%;
				}
			}
			
			.team_fwb{
				padding: 20rpx;
			}
		}
	
		.tow_cons{
			padding: 20rpx;
			.t_c_tabs{
				::v-deep .u-tabs__wrapper__nav__item {
					flex: 1;
				}
				
			}
			
			.d_p_re_time {
				margin: 20rpx 0;
				justify-content: center;
				padding: 10rpx 20rpx;
				width: 500rpx;
			
				&>view:nth-child(2) {
					margin: 0 10rpx;
				}
			
				&>view:last-child {
					margin-left: 10rpx;
				}
				
				.all{
					margin-left: 40rpx !important; 
					align-items: center;
					& > text {
						margin-right: 20rpx;
					}
				}
			}
			
			.d_p_re_list {
			
				.tit {
					margin-top: 20rpx;
					border-radius: 12rpx 12rpx 0 0;
					text-align: center;
			
					.rows {
						flex: 1;
						height: 100rpx;
						justify-content: center;
						align-items: center; 
					}
				}
			
				.re_lists {
					overflow: hidden;
					height: calc(100vh - 580rpx);
			
					.re_lists_items {
						height: 80rpx;
			
						&>text {
							width: 25%;
							text-align: center;
						}
					}
					
					
				}
				.re_total{
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
				}
			
			}
		}
	}
}
</style>
