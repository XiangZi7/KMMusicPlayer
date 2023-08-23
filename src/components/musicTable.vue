<script setup>
import { cloudsearch, songUrl, lyric } from '@/api/api'
import { formatTime } from '@/composables/formatTime'
import { musicStore } from '@/stores/musicStore'
const router = useRouter()
const musicstore = musicStore()

const state = reactive({
	data: [],
})
const {
	data,
} = toRefs(state)
const props = defineProps({
	data: {
		type: Array,
		default: () => []
	}
})
const Emits = defineEmits(['rowdbclick'])

const playerMusic = async (params) => {
	const isExisting = musicstore.songs.findIndex(item => item.id == params.id)
	if (isExisting != -1) {
		musicstore.currentIndex = isExisting
	} else {
		// 1.获取歌曲链接
		const { data } = await songUrl(params)
		musicstore.songs.push({
			title: params.title,
			singer: params.singer,
			cover: params.cover,
			src: data.data[0].url,
			time: params.time,
			album: params.album,
			id: params.id,
			mv: params.mv,
		})
		musicstore.currentIndex = musicstore.songs.length - 1
	}
}
const rowdbclick = (row, column, event) => {
	playerMusic(row)
}

</script>
<template>
	<el-table :data="props.data" style="width: 100%" @row-dblclick="rowdbclick">
		<el-table-column label="歌曲名" width="400">
			<template #default="scope">
				<div style="display: flex;align-items: center;">
					<el-image :src="scope.row.cover + '?param=28y28'"
						style="flex-shrink: 0;border-radius: 6px;margin-right: 16px;" />
					<span>{{ scope.row.title }}</span>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="歌手">
			<template #default="scope">
				<span style="cursor: pointer;" @click="router.push({ path: `/search`, query: { keyWorks: scope.row.singer } })">{{
					scope.row.singer
				}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="album" label="专辑"> </el-table-column>
		<el-table-column label="时间" width="120">
			<template #default="scope">
				<span>{{ formatTime(scope.row.time) }}</span>
			</template>
		</el-table-column>
		<el-table-column width="130">
			<template #default="scope">
				<div class="button-wrapper">
					<!-- 播放 -->
					<svg t="1648883741930" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
						p-id="2199" width="28" height="28" @click="playerMusic(scope.row)">
						<path
							d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
							p-id="2200" fill="#525B72"></path>
						<path
							d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
							p-id="2201" fill="#525B72"></path>
					</svg>
					<!-- MV -->
					<svg @click="router.push({ name: `mv`, params: { id: scope.row.mv } })" t="1648883775602" class="icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3156" width="40" height="40"
						v-if="scope.row.mv">
						<path
							d="M590.3 532.7l-118 88.5c-9.8 7.3-23.6 5.3-31-4.4-2.9-3.8-4.4-8.5-4.4-13.3v-177c0-12.2 9.9-22.1 22.1-22.1 4.8 0 9.4 1.6 13.3 4.4l118 88.5c9.8 7.3 11.8 21.2 4.4 31-1.2 1.6-2.7 3.1-4.4 4.4zM247.5 205.3h530.9c48.9 0 88.5 39.6 88.5 88.5v442.4c0 48.9-39.6 88.5-88.5 88.5H247.5c-48.9 0-88.5-39.6-88.5-88.5V293.8c0-48.9 39.7-88.5 88.5-88.5z m442.4 44.3H336v530.9h353.9V249.6zM203.3 382.3h88.5V249.6h-44.2c-24.4 0-44.2 19.8-44.2 44.2v88.5z m619.3 0v-88.5c0-24.4-19.8-44.2-44.2-44.2h-44.2v132.7h88.4zM203.3 647.7v88.5c0 24.4 19.8 44.2 44.2 44.2h44.2V647.7h-88.4z m0-44.2h88.5v-177h-88.5v177z m619.3 44.2h-88.5v132.7h44.2c24.4 0 44.2-19.8 44.2-44.2v-88.5z m0-44.2v-177h-88.5v177h88.5z"
							p-id="3157" fill="#525B72"></path>
					</svg>

				</div>
			</template>
		</el-table-column>
	</el-table>
</template>
<style lang='scss' scoped></style>
