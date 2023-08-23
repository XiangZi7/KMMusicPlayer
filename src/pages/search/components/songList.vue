<script setup>
import { songPlaylist } from '@/api/api'
const router = useRouter()
const state = reactive({
	list: [],
	currentPage: 1
})
const {
	list,
	currentPage
} = toRefs(state)

const props = defineProps({
	data: {
		type: Object,
		default: () => []
	}
})

</script>
<template>
	<div>
		<div class="content-section menuBar-mv">
			<div class="apps-card">
				<div class="apps-item" v-for="(item, idx) in props.data" :key="idx"
					@click="router.push({ path: '/playList', query: { id: item.id } })">
					<div class="app-card">
						<img :src="item.coverImgUrl + '?param=200y200'" alt="">
					</div>
					<a href="javascript:;">{{ item.name }}</a>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang='scss' scoped></style>
