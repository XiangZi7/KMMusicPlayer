<script setup>
const state = reactive({
	list: [],
})
const {
	list,
} = toRefs(state)
const props = defineProps({
	data: {
		type: Object,
		default: {
			comments: {
				user: {
					avatarUrl: "",
					nickname: ""
				}
			}
		}
	}
})

</script>
<template>
	<div>
		<div class="content-section " style="margin-top: 0;">
			<div class="apps-card">
				<div class="app-card usercom" v-for="(item, index) in props.data.comments" :key="index">
					<span>
						<el-image class="useravatar" :src="item.user.avatarUrl + '?param=32y32'" alt=""></el-image>
						{{ item.user.nickname }}
					</span>
					<div class="app-card__subtext">{{ item.content }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang='scss' scoped></style>
