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
      if (Array.isArray(param)) {
        this.trackList = this.trackList.concat(param)
      } else {
        this.trackList.push(param)
      }
    },
    addTrackAndPlay(param: Track | Track[]) {
      let addedIndex = -1 // 用于记录新添加的歌曲索引
      let existingIndex = -1 // 用于记录已存在歌曲的索引

      const addTrack = (track: Track) => {
        existingIndex = this.trackList.findIndex(
          (existingTrack) => existingTrack.id === track.id
        )

        if (existingIndex === -1) {
          this.trackList.push(track)
          addedIndex = this.trackList.length - 1 // 记录新添加的歌曲索引
        } else {
          // console.warn(`Track with ID ${track.id} already exists at index ${existingIndex}.`);
          addedIndex = existingIndex // 更新 addedIndex 为已存在歌曲的索引
        }
      }

      if (Array.isArray(param)) {
        param.forEach((track) => addTrack(track))
      } else {
        addTrack(param)
      }

      // 设置当前歌曲为新添加的或已存在的歌曲
      if (addedIndex !== -1) {
        this.setCurrentSong(addedIndex)
      }
    },
    // 删除指定歌曲
    deleteTrack(id: number | string) {
      this.trackList = this.trackList.filter(track => track.id !== id)
    },
    clearAllSong() {
      this.trackList = []
    },
  },
  persist: piniaPersistConfig('AudioStore'),
})
