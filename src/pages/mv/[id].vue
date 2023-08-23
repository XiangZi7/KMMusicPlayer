<script setup>
import { mvUrl, commentMV, mvDetail } from '@/api/api'

const route = useRoute();

const state = reactive({
	list: [],
	mvUrls: "",
	commList: {},
	mvDetails: {
		artists: [{
			name: ""
		}]
	}
})
const {
	list,
	mvUrls,
	commList,
	mvDetails
} = toRefs(state)


onMounted(async () => {
	// 1.获取MV地址
	const { data } = await mvUrl({ id: route.params.id })
	state.mvUrls = data.data.url
	// 2.获取MV的详情
	const mvDeta = await mvDetail(route.params.id)
	state.mvDetails = mvDeta.data.data
	console.log("🚀 => file: [id].vue:27 => state.mvDetails:", state.mvDetails)
	// 3.获取MV评论
	const comm = await commentMV({ id: route.params.id, limit: 30, offset: 0 })
	state.commList = comm.data
})
</script>
<template>
	<div class="content-section menuBar-mv">
		<video controls loop autoplay :src="mvUrls" style="width: 100%; border-radius: 10px;"></video>
		<div class="content-section-title">
			<h2>{{ mvDetails.artists.map(item => item.name).join() }} <span style="margin:0px 10px;">-</span><span>
					{{ mvDetails.name }}</span>
			</h2>
			{{ route.query.id }}
			<!-- 评论 -->
			<div class="content-section-title comstitle">
				<h2>评论<span>共{{ commList.total }}条 </span></h2>
			</div>
			<div class="content-section " style="margin-top: 0;">
				<div class="apps-card">
					<div class="app-card usercom" v-for="(item, idx) in commList.comments" :key="idx">
						<span>
							<img class="useravatar" :src="item.user.avatarUrl + '?param=32y32'" alt="">
							{{ item.user.nickname }}
						</span>
						<div class="app-card__subtext">{{ item.content }}</div>
						<div class="com-time">
							<span>{{ item.ipLocation.location }}</span>
							<span class="usercountlike">{{ item.timeStr }}</span>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<style lang='scss' scoped></style>
