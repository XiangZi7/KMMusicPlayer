<script setup>
import axios from "axios";
import { videoUrl } from '@/api/api'
import { GlobalStore } from "@/stores/index";
const globalstore = GlobalStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
	list: {},
	loading: true
})
const {
	list,
	loading
} = toRefs(state)

onMounted(async () => {
	state.loading = true
	const { data } = await videoUrl({ id: route.params.id })
	console.log("🚀 => file: [id].vue:13 => data:", data)
	state.loading = false
	state.list = data.data
	globalstore.setAnthologyObj(data.data)
})

</script>
<template>
	<div>
		<div class="content-section menuBar-mv">
			<el-skeleton :rows="5" animated :loading="loading">
				<template #default>
					<div class="m-artist">
						<div style="width: 250px;">
							<el-image :src="list.cover" style="width: 220px; height:250px"></el-image>
						</div>
						<div class="artist-name">
							<h2 class="artist-h2">{{ list.title }}</h2>
							<div class="listcover">
								<span href="javascript:;">{{ list.actor }}</span>
								<span href="javascript:;">{{ list.director }}</span>
							</div>
							<div class="playerButton">
								{{ list.region }}
							</div>
							<div class="tags">
								<el-tag class="tags-item">{{ list.videoType }}</el-tag>
							</div>
							<p> {{ list.descs }}</p>
						</div>
					</div>
					<div class="anthology">
						<el-button class="antBtn" type="primary"
							@click="router.push({ name: `playerAnimation`, params: { id: item.chapterPath } })" round
							v-for="item in list.chapterList">{{ item.title
							}}</el-button>
					</div>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>
<style lang='scss' scoped>
.anthology {
	margin-top: 30px;

	.antBtn {
		margin-top: 10px;
	}
}

.listcover {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
</style>
