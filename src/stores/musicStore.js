// src/stores/counter.ts
import { defineStore } from 'pinia'

export const musicStore = defineStore({
	id: "musicStore",
	state: () => {
		return {
			count: 0,
			// 歌曲缓存
			songs: [
				{ id: "27591651", title: 'Intro AE 86', singer: "陈光荣", album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE", cover: "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg", src: 'http://music.163.com/song/media/outer/url?id=27591651.mp3', time: 149000, mv: "", Lyric: "" },
				{ id: "409872504", title: 'Ninelie', singer: "Aimer", album: "ninelie EP", cover: "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg", src: 'http://music.163.com/song/media/outer/url?id=409872504.mp3', time: 260675, mv: "", Lyric: "" },
			],
			// 当前播放的歌曲位置
			currentIndex: 0
		}
	},
	actions: {
		inc() {
			this.count++
		},
		updateSongs(param) {
			this.songs[this.currentIndex] = Object.assign(this.songs[this.currentIndex], { ...param })
		}
	},
	// 开启数据缓存
	persist: {
		enabled: true,
		strategies: [
			{
				paths: ["songs"],
				storage: localStorage,
			},
		],
	},
})
