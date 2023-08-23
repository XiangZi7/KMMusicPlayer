<script setup>
import { GlobalStore } from "@/stores/index";
import musicTable from "@/components/musicTable.vue";
import mv from "@/pages/mv/index.vue";
import songList from "@/pages/songList/index.vue";
import { newMusic, songPlaylist, recommendSongs } from '@/api/api'
const globalstore = GlobalStore()
const currentUserstatus = computed(() => globalstore.isLogin)
const state = reactive({
	activeName: "first",
	buttonList: [
		{ title: "每日推荐", color: "#409EFF" },
		{ title: "最新MV", color: "#FF98A5" },
		{ title: "排行榜", color: "#626aef" },
		{ title: "歌手", color: "#EBA5F0" },
	],
	currentPage: 1,
	songTotal: 0,
	tableData: []
})
const {
	activeName,
	buttonList,
	tableData,

} = toRefs(state)

const handleClick = async (e) => {
	state.tableData = []
	switch (e.props.label) {
		case "热门歌曲":
			toSearch()
			break;
		case "每日推荐":
			const { data } = await recommendSongs()
			state.tableData = data.data.dailySongs.map(item => {
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
			break;

		default:
			break;
	}
}
onMounted(() => {
	toSearch()
})
const toSearch = async () => {
	// 获取新歌
	const { data } = await newMusic()
	state.tableData = data.result.map(item => {
		const names = item.song.artists.map(subItem => subItem.name).join(',');
		return {
			cover: item.picUrl,
			title: item.name,
			singer: names,
			album: item.song.album.name,
			time: item.song.duration,
			id: item.id,
			mv: item.song.mvid
		}
	})
}

</script>
<template>
	<div>
		<div class="content-wrapper-header" style="margin-top: -10px;">
			<video src="@/static/mp4/B站.mp4" autoplay loop muted style="border-radius: 14px;width: 100%;"></video>
		</div>
		<div class="m-lib">
			<el-button v-for="(item, index) in buttonList" :key="index" :color="item.color" round class="m-lib-btn">{{
				item.title }}</el-button>
		</div>
		<div class="content-section">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="热门歌曲" name="first">
					<musicTable :data="tableData"></musicTable>
				</el-tab-pane>
				<el-tab-pane label="歌单" name="second">
					<songList />
				</el-tab-pane>
				<el-tab-pane label="MV" name="third">
					<mv />
				</el-tab-pane>
				<el-tab-pane label="每日推荐" name="four" v-if="currentUserstatus">
					<musicTable :data="tableData"></musicTable>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<style lang='scss' >
.m-lib {
	margin-top: 20px;
	display: flex;
	justify-content: space-around;

	span {
		color: #fff;
	}

	.m-lib-btn {
		height: 40px;
		width: 250px;
		color: #fff;

	}
}

.content-section .el-tabs__nav-wrap::after {
	background-color: transparent;
}
</style>
