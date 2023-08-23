<script setup>
import { videoSearch } from '@/api/api'
import axios from "axios";
const router = useRouter()
const state = reactive({
	list: [],
	input: "",
	loading: false,
	total: 0,
	currentPage: 1
})
const {
	list,
	input,
	loading,
	total,
	currentPage
} = toRefs(state)

const toResult = async () => {
	state.loading = true
	const { data } = await videoSearch({ name: state.input })
	state.list = data.data
	state.total = data.count
	state.loading = false
}
</script>
<template>
	<div>
		<div class="content-section">
			<!-- <span class="mb-20 text-center">因vecel被ban了，可能需要魔法上网才能搜索得到动漫</span> -->
			<div class="video">
				<input type="text" placeholder="请输入动漫名称" @keyup.enter='toResult' v-model="input">
				<el-button type="primary" round @click="toResult">搜索</el-button>
			</div>
			<el-skeleton :rows="5" animated :loading="loading">
				<template #default>
					<div class="apps-card" style="margin-top: 20px;">
						<div class="apps-item mv-text"
							@click="router.push({ name: `animation`, params: { id: item.videoId } })"
							v-for="(item, idx) in list" :key="idx">
							<div class="app-card" style="width: 239px;height: 300px;">
								<img :src="item.cover" alt="" style="width: 239px;height: 300px;">
							</div>
							<a class="aniTile" href="javascript:;">{{ item.title }}</a>
						</div>
					</div>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>
<style lang='scss' scoped>
.aniTile {
	margin-top: 10px;
}

.video {
	display: flex;
	align-items: center;
	justify-content: center;

	input {
		// width: 100%;
		height: 40px;
		border: none;
		background-color: var(--search-bg);
		border-radius: 30px;
		font-family: var(--body-font);
		font-size: 15px;
		font-weight: 500;
		padding: 0 20px 0 60px;
		box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
		background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
		background-size: 14px;
		background-repeat: no-repeat;
		background-position: 30px 48%;
		color: var(--theme-color);
	}
}
</style>
