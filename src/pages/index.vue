<script setup>
import musicTable from "@/components/musicTable.vue";
import { newMusic, songPlaylist } from '@/api/api'
const router = useRouter()
const state = reactive({
	searchKw: "",
	tableData: [],
	playlists: [],
	loading: true
})
const {
	tableData,
	playlists,
	loading
} = toRefs(state)

onMounted(async () => {
	state.loading = true
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
	state.loading = false
	// 获取热门歌单
	const songPlay = await songPlaylist({ limit: 30, offset: 0 })
	state.playlists = songPlay.data.playlists
})
</script>
<template>
	<div>
		<div class="content-wrapper-header">
			<div class="content-wrapper-context">
				<h3 class="img-content">
					<svg t="1648788969161" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="5991" width="25" height="25">
						<path
							d="M1006.652621 469.673144l-114.751779-114.751778V192.356347a60.318243 60.318243 0 0 0-60.318242-59.950449H669.385374L554.633596 17.65412a59.950448 59.950448 0 0 0-84.960452 0L354.921366 132.405898H192.356347A59.950448 59.950448 0 0 0 132.405898 192.356347v162.565019L17.65412 469.673144a59.950448 59.950448 0 0 0 0 84.960452L132.405898 669.385374v162.197226a59.950448 59.950448 0 0 0 59.950449 59.950448h162.565019l114.751778 115.119573a60.686037 60.686037 0 0 0 84.960452 0l114.751778-115.119573h162.197226a60.318243 60.318243 0 0 0 60.318242-59.950448V669.385374l114.751779-114.751778a60.686037 60.686037 0 0 0 0-84.960452z m-36.779417 49.652212l-116.590749 116.59075a44.503094 44.503094 0 0 0-12.872796 31.262503v164.403991a10.666031 10.666031 0 0 1-10.66603 10.66603h-162.56502a43.767505 43.767505 0 0 0-31.262503 12.872796l-116.222956 116.222955a10.298237 10.298237 0 0 1-15.07956 0l-116.222955-116.222955a43.767505 43.767505 0 0 0-31.262504-12.872796H192.356347a10.666031 10.666031 0 0 1-10.298237-10.66603v-164.403991a43.399711 43.399711 0 0 0-13.24059-31.262503l-116.222955-116.59075a10.298237 10.298237 0 0 1 0-14.711766l116.222955-116.222955a44.135299 44.135299 0 0 0 13.24059-31.630298V192.356347A10.298237 10.298237 0 0 1 192.356347 183.897081h164.771784a44.135299 44.135299 0 0 0 31.262504-13.24059l118.061926-118.061926a11.033825 11.033825 0 0 1 7.355883-2.942353 11.401619 11.401619 0 0 1 7.723677 2.942353l116.222955 116.222955a44.135299 44.135299 0 0 0 31.262504 13.24059h164.40399a10.298237 10.298237 0 0 1 10.666031 10.298237V356.760337a45.606476 45.606476 0 0 0 12.872796 31.630298l116.590749 116.222955a10.298237 10.298237 0 0 1-1.838971 14.711766z"
							p-id="5992" fill="#1296db"></path>
						<path
							d="M693.659789 331.014746l-187.207228 274.374444-141.232958-110.338248c-16.182943 0-24.642209 8.459266-24.642209 26.848973l176.173403 159.254872 207.803702-331.014745c5.516912-9.930442-23.538826-31.262504-30.89471-19.125296z"
							p-id="5993" fill="#1296db"></path>
					</svg>
					境界的彼方
				</h3>
				<div class="content-text">
					《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。
					改编自小说的同名电视动画已于2013年10月至12月播出。
				</div>
			</div>
			<img class="content-wrapper-img" src="../static/img/danceMk.png" alt="">
		</div>
		<el-skeleton :rows="5" animated :loading="loading">
			<template #default>
				<div class="content-section">
					<musicTable :data="tableData"></musicTable>
				</div>
				<div style="margin-top: 50px;">
					<div class="apps-card">
						<el-skeleton :rows="5" animated :loading="loading" />
						<div class="apps-item" v-for="(item, index) in playlists" :key="index"
							@click="router.push({ path: '/playList', query: { id: item.id } })">
							<div class="app-card">
								<img :src="item.coverImgUrl + '?param=200y200'" alt="">
							</div>
							<a href="javascript:;">{{ item.name }}</a>
						</div>
					</div>
				</div>
			</template>
		</el-skeleton>
	</div>
</template>
<style lang='scss' scoped></style>
