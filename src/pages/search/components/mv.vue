<script setup>
import { newMV } from '@/api/api'

const router = useRouter();
const state = reactive({
	list: [],
})
const {
	list,
} = toRefs(state)



const toMV = (id) => {
	router.push({ name: `mv`, params: { id } })
}

// onMounted(async () => {
// 	const { data } = await newMV()
// 	state.list = data.data
// })

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
			<div class="apps-card ">
				<div class="apps-item mv-text" @click="toMV(item.id)" v-for="(item, idx) in props.data" :key="idx">
					<div class="app-card m-mv">
						<img :src="item.cover + '?param=370y220'" alt="">
					</div>
					<a href="javascript:;">{{ item.name }}</a>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang='scss' scoped></style>
