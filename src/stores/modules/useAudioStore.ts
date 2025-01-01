import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { AudioStore, Track } from '../interface'
import { LyricData } from '@/utils/parseLyrics'

/**
 * 音频
 */
export const useAudioStore = defineStore({
  id: 'useAudioStore',
  state: (): AudioStore => ({
    // 歌曲缓存
    trackList: [
      {
        id: '27591651',
        title: 'Intro AE 86',
        singer: '陈光荣',
        album: '頭文字[イニシャル]D THE MOVIE SOUND TUNE',
        cover:
          'http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg',
        source: 'http://music.163.com/song/media/outer/url?id=27591651.mp3',
        time: 149000,
      },
      {
        id: '409872504',
        title: 'Ninelie',
        singer: 'Aimer',
        album: 'ninelie EP',
        cover:
          'http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg',
        source: 'http://music.163.com/song/media/outer/url?id=409872504.mp3',
        time: 260675,
      },
    ],
    currentSongIndex: 0,
  }),
  actions: {
    // 设置当前歌曲
    setCurrentSong(index: number) {
      if (index >= 0 && index < this.trackList.length) {
        this.currentSongIndex = index
      }
    },
    // 设置当前歌曲链接
    setCurrentSongUrl(url: string) {
      this.trackList[this.currentSongIndex as number].source = url
    },
    // 设置当前歌曲歌词
    setCurrentSonglyrics(Lyric: LyricData) {
      this.trackList[this.currentSongIndex as number].Lyric = Lyric
    },
    addTrack(param: Track | Track[]) {
      // 收集现有歌曲的ID
      const existingIds = new Set(this.trackList.map((track) => track.id))
      // 将参数归一化为数组
      const tracksToAdd = Array.isArray(param) ? param : [param]
      tracksToAdd.forEach((track) => {
        if (!existingIds.has(track.id)) {
          // 检查 ID 是否已存在
          this.trackList.push(track) // 如果不存在，添加到 trackList
        }
      })
    },
    addTrackAndPlay(param: Track | Track[]) {
      const tracksToAdd = Array.isArray(param) ? param : [param] // 确保 param 是数组
      let addedIndex = -1 // 用于记录新添加或更新歌曲的索引

      tracksToAdd.forEach((track) => {
        const existingIndex = this.trackList.findIndex(
          (existingTrack) => existingTrack.id === track.id
        )

        if (existingIndex === -1) {
          this.trackList.push(track) // 如果不存在则添加
          addedIndex = this.trackList.length - 1 // 更新添加索引为新添加的歌曲
        } else {
          addedIndex = existingIndex // 如果存在，则更新为已存在歌曲的索引
        }
      })

      // 设置当前歌曲为新添加的或已存在的歌曲
      this.setCurrentSong(addedIndex)
    },
    // 删除指定歌曲
    deleteTrack(id: number | string) {
      this.trackList = this.trackList.filter((track) => track.id !== id)
    },
    clearAllSong() {
      this.trackList = []
    },
  },
  persist: piniaPersistConfig('AudioStore'),
})
