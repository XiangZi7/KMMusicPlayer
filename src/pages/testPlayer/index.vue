<script setup>
const audio = ref()
const state = reactive({
	list: [],
	playing: false,
	currentIndex: 0,
	mode: 0, // 0: 顺序播放，1: 循环播放，2: 随机播放
	progress: 0,
	duration: 0,
	currentTime: 0,
	songs: [
		{ name: '歌曲1', src: 'https://cn-scya-ct-01-03.bilivideo.com/mefmxcodeboss/aod/202112/13/76e0f45f3b756cb5fd82f4024a7e4b7e.m4a?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1685005922&gen=playurlv2&os=bcache&oi=2104912314&trid=0000e70271b5204f4af5bc9ee48f1da1d033B&mid=0&platform=html5&upsig=13e2f675be1a5aeb3dfdd01c79f6dae1&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&cdnid=62703&bvc=vod&nettype=0&orderid=0,1&logo=00000000' },
		{ name: '歌曲2', src: 'https://cn-jxjj-ct-01-01.bilivideo.com/mefmxcodeboss/aod/202106/14/f14b848a15d6357bf2b5dc9c14fcb633.m4a?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1685005996&gen=playurlv2&os=bcache&oi=2104912314&trid=0000067ed8353dcc4d5096a47f4dbf757368B&mid=0&platform=html5&upsig=ab517e53df7a09c7cb1fc36ab45886ae&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&cdnid=4261&bvc=vod&nettype=0&orderid=0,1&logo=00000000' },
	],
})
const {
	list,
	currentTime,
	duration,
	progress,
} = toRefs(state)

const currentSong = computed(() => state.songs[state.currentIndex])

const modeText = computed(() => {
	const modes = ['顺序播放', '单曲循环', '随机播放'];
	return modes[state.mode]
})

onMounted(() => {
	// audio.value.addEventListener('ended', handleEnded())
	// audio.value.addEventListener('timeupdate', handleTimeUpdate())
	// audio.value.addEventListener('durationchange', handleDurationChange())
	audio.value.src = currentSong.value.src
})

const play = () => {
	state.playing = true
	audio.value.play()
}
const pause = () => {
	state.playing = false
	audio.value.pause()
}
const togglePlay = () => {
	if (state.playing) {
		pause()
	} else {
		play()
	}
}
const prevSong = () => {
	if (state.currentIndex === 0) {
		state.currentIndex = state.songs.length - 1
	} else {
		state.currentIndex--
	}
	playSong()
}

//下一首
const nextSong = () => {
	if (state.currentIndex === state.songs.length - 1) {
		state.currentIndex = 0
	} else {
		state.currentIndex++
	}
	playSong()
}
// 播放歌曲
const playSong = () => {
	audio.value.src = currentSong.value.src
	audio.value.play()
	state.playing = true
}
const handleEnded = () => {
	switch (state.mode) {
		case 0: // 顺序播放
			nextSong()
			break
		case 1: // 单曲循环
			playSong()
			break
		case 2: // 随机播放
			const randomIndex = Math.floor(Math.random() * state.songs.length)
			state.currentIndex = randomIndex
			playSong()
			break
	}
}
// 更新
const handleTimeUpdate = () => {
	state.currentTime = Math.floor(audio.value.currentTime)
	state.progress = (state.currentTime / state.duration) * 100
}
// 当前时间更改
const handleDurationChange = () => {
	state.duration = Math.floor(audio.value.duration)
}
// 更改播放模式
const toggleMode = () => {
	if (state.mode === 2) {
		state.mode = 0
	} else {
		state.mode++
	}
}
// 格式化时间
const formatTime = (time) => {
	const minutes = Math.floor(time / 60)
	const seconds = time % 60
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
// 控制歌曲时长
const seek = (event) => {
	const progressBar = event.currentTarget.getBoundingClientRect()
	const progressWidth = progressBar.width
	const clickX = event.clientX - progressBar.left
	const percentage = clickX / progressWidth
	audio.value.currentTime = state.duration * percentage
}

</script>
<template>
	<div class="music-player">
		<div class="controls">
			<button @click="prevSong">上一首</button>
			<button @click="togglePlay">{{ playing ? '暂停' : '播放' }}</button>
			<button @click="nextSong">下一首</button>
			<button @click="toggleMode">{{ modeText }}</button>
		</div>
		<div class="progress" @click="seek($event)">
			<div class="bar" :style="{ width: progress + '%' }"></div>
			<div class="thumb" :style="{ left: progress + '%' }"></div>
			<div class="time">
				{{ formatTime(currentTime) }} / {{ formatTime(duration) }}
			</div>
		</div>
		<audio ref="audio" :src="currentSong.src" @timeupdate="handleTimeUpdate" @durationchange="handleDurationChange"
			@ended="handleEnded"></audio>
	</div>
</template>
<style lang='scss' scoped>
.music-player {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px;
}

.controls {
	margin-bottom: 16px;
}

button {
	margin: 8px;
	padding: 8px;
	border: none;
	background-color: #2196F3;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
}

.progress {
	width: 100%;
	height: 24px;
	position: relative;
	margin-top: 16px;
	cursor: pointer;
}

.bar {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background-color: #ccc;
}

.thumb {
	position: absolute;
	top: 0;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: #2196F3;
	transform: translate(-50%, -50%);
}

.time {
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	margin-right: 8px;
	font-size: 14px;
	color: #555;
}
</style>
