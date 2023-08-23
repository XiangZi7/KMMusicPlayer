<script setup>
import { cloudsearch, songUrl } from '@/api/api'
import musicTable from "@/components/musicTable.vue";
import songList from "./components/songList.vue";
import mv from "./components/mv.vue";
import artists from "./components/artists.vue";
const route = useRoute()
const state = reactive({
	list: [],
	activeName: "1",
	tableData: [],
	currentPage: 1,
	songTotal: 0,
	loading: true,
})
const {
	list,
	activeName,
	tableData,
	currentPage,
	songTotal,
	loading,
} = toRefs(state)
const handleClick = (e) => {
	// console.log("🚀 => file: index.vue:20 => e:", e.props.name)
	state.tableData = []
	toSearch(e.props.name)
}

onMounted(() => {
	toSearch("1")
})
// 侦听搜索的关键字
watch(() => route.query.keyWorks, () => {
	if (!route.query.keyWorks) return
	toSearch("1")
})
// 搜索歌曲方法
const toSearch = async (activeName) => {
	state.loading = true
	const { data } = await cloudsearch({
		keywords: route.query.keyWorks,
		offset: (state.currentPage - 1) * 30,
		limit: 30,
		type: activeName
	})

	// 2.歌曲
	switch (state.activeName) {
		case "1":
			state.tableData = data.result.songs.map(item => {
				const names = item.ar.map(subItem => subItem.name).join(',');
				return {
					cover: item.al.picUrl,
					title: item.name,
					singer: names,
					album: item.al.name,
					time: item.dt,
					id: item.id,
					mv: item.mv
				}
			})
			// 1.歌曲总数量
			state.songTotal = data.result.songCount
			break;
		case "1000":
			state.tableData = data.result.playlists
			state.songTotal = data.result.playlistCount
			break;
		case "1004":
			state.tableData = data.result.mvs
			state.songTotal = data.result.mvCount
			break;
		case "100":
			state.tableData = data.result.artists
			state.songTotal = data.result.artistCount
			break;

		default:
			break;
	}

	state.loading = false
}
const handleCurrentChange = (e) => {
	toSearch(state.activeName)
}
</script>
<template>
	<div>
		<div class="content-section menuBar-mv">
			<div class="content-section-title">
				<h1>{{ route.query.keyWorks }}</h1> <span>{{ songTotal }}个结果</span>
			</div>
			<div class="content-section menuBar-mv">
				<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane label="热门歌曲" name="1">
						<musicTable :data="tableData"></musicTable>
					</el-tab-pane>
					<el-tab-pane label="歌单" name="1000">
						<songList :data="tableData"></songList>
					</el-tab-pane>
					<el-tab-pane label="MV" name="1004">
						<mv :data="tableData"></mv>
					</el-tab-pane>
					<el-tab-pane label="专辑" name="100">
						<artists :data="tableData"></artists>
					</el-tab-pane>
				</el-tabs>
				<div class="flex" style="justify-content: center;margin-top: 20px;">
					<el-pagination @current-change="handleCurrentChange" v-model:currentPage="currentPage" :page-size="30"
						layout="prev, pager, next, jumper" :total="songTotal">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang='scss' scoped></style>
