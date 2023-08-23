<script setup>
import { videoPlay } from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import { GlobalStore } from "@/stores/index";
const globalstore = GlobalStore()
const route = useRoute()
const state = reactive({
	list: [],
	src: route.params.id,
	type: 'm3u8', //视频类型
	title: ''
})
const {
	list,
	type,
	title,
	src
} = toRefs(state)
watch(() => route.params.id, () => {
	state.src = route.params.id
})

</script>
<template>
	<div class="sp">
		<videoPlay width="1200px" :title="title" :src="src" :control="true" :type="type" :autoPlay="false" />
		<div class="anthology">
			<el-button class="antBtn" type="primary" @click="src = item.chapterPath" round
				v-for="item in globalstore.anthologyObj.chapterList">{{ item.title
				}}</el-button>
		</div>
	</div>
</template>
<style lang='scss' scoped>
.anthology {
	margin-top: 30px;
}
</style>
