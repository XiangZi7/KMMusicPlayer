<script setup>
import { newMV } from '@/api/api'

const router = useRouter();
const state = reactive({
	list: [],
	loading: true
})
const {
	list,
	loading
} = toRefs(state)



const toMV = (id) => {
	router.push({ name: `mv`, params: { id } })
}

onMounted(async () => {
	state.loading = true
	const { data } = await newMV()
	state.list = data.data
	state.loading = false

})
</script>
<template>
	<div>
		<div class="content-section menuBar-mv">
			<el-skeleton :rows="5" animated :loading="loading">
				<template #default>
					<div class="apps-card ">
						<div class="apps-item mv-text" @click="toMV(item.id)" v-for="(item, idx) in list" :key="idx">
							<div class="app-card m-mv">
								<img :src="item.cover + '?param=370y220'" alt="">
							</div>
							<a href="javascript:;">{{ item.name }}</a>
						</div>
					</div>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>
<style lang='scss' scoped></style>
