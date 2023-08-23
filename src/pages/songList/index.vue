<script setup>
import { songPlaylist } from '@/api/api'
const router = useRouter()
const state = reactive({
	list: [],
	currentPage: 1,
	loading: true,
	songListCount: 0
})
const {
	list,
	currentPage,
	loading,
	songListCount
} = toRefs(state)

onMounted(() => {
	getSongList()
})

const getSongList = async () => {
	state.loading = true
	const { data } = await songPlaylist({ limit: 30, offset: (state.currentPage - 1) * 30 })
	state.list = data
	state.songListCount = data.total
	state.loading = false

}


// 改变页数触发
const handleCurrentChange = (e) => {
	getSongList()
}

</script>
<template>
	<div>
		<div class="content-section menuBar-mv">
			<el-skeleton :rows="5" animated :loading="loading">
				<template #default>
					<div class="apps-card">
						<div class="apps-item" v-for="(item, idx) in list.playlists" :key="idx"
							@click="router.push({ path: '/playList', query: { id: item.id } })">
							<div class="app-card">
								<img :src="item.coverImgUrl + '?param=200y200'" alt="">
							</div>
							<a href="javascript:;">{{ item.name }}</a>
						</div>
					</div>
					<div class="pagination">
						<el-pagination @current-change="handleCurrentChange" v-model:currentPage="currentPage"
							:page-size="30" layout="prev, pager, next, jumper" :total="songListCount">
						</el-pagination>
					</div>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>
<style lang='scss' scoped></style>
