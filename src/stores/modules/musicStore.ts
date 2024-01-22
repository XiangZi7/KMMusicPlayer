import { defineStore } from "pinia";
import { MusicState, Track } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";
export const useMusicStore = defineStore({
  id: "useMusicStore",
  state: (): MusicState => {
    return {
      count: 0,
      // 歌曲缓存
      trackList: [
        {
          id: "27591651",
          title: "Intro AE 86",
          singer: "陈光荣",
          album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE",
          cover:
            "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg",
          source: "http://music.163.com/song/media/outer/url?id=27591651.mp3",
          time: 149000,
          mv: "",
          Lyric: {},
        },
        {
          id: "409872504",
          title: "Ninelie",
          singer: "Aimer",
          album: "ninelie EP",
          cover:
            "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg",
          source: "http://music.163.com/song/media/outer/url?id=409872504.mp3",
          time: 260675,
          mv: "",
          Lyric: {},
        },
      ],
      // 当前播放的歌曲位置
      currentIndex: 0,
    };
  },
  actions: {
    addTrackAndPlay(param: Track | Track[]) {
      if (Array.isArray(param)) {
        this.trackList = this.trackList.concat(param);
      } else {
        this.trackList.push(param);
      }
    },
    setCurrentIndex(index: number) {
      this.currentIndex = index;
    },
  },
  persist: piniaPersistConfig("musicStore"),
});
