import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  //歌曲生成周期
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],

  state: {
    //搜索关键字
    songkeyworks:"",
    //歌曲搜索总数
    songcount:"",

    audioInfo: [
      {
        name: "Daisy",
        artist: "STEREO DIVE FOUNDATION",
        url: "https://sound-ks1.cdn.missevan.com/aod/202103/06/4e0afafd500b0a063b2f0f25ff56c0106f185049.m4a",
        cover: "https://p1.music.126.net/YF4U3T8KAdSp7LiJ0s_7Sg==/109951163914073982.jpg",
        lrc: "[00:00.000] 作词 : STEREO DIVE FOUNDATION\n[00:00.000] 作曲 : STEREO DIVE FOUNDATION\n[00:00.00]\n[00:34.90]静寂を切り裂くよう訪れたのは\n[00:40.58]必然としての邂逅僕等の為に\n[00:46.23]後悔を嘆く瞳に映る君はそう\n[00:51.18]憂いを纏って美しく咲いた\n[00:57.84]誰かの生命に溶ける花\n[01:02.08]ねぇ君にも見えるだろう\n[01:08.12]きっと\n[01:11.65]重ねた過ち塗り替えるよう\n[01:17.25]何度でもいいさ繰返していくスタートライン\n[01:22.91]過去とは違う明日を\n[01:28.57]二人だけの希望描くスタートライン\n[01:34.53]I never say good bye\n[01:38.02]いつだってそうさ\n[01:39.87]...\n[01:51.16]継続していく証明としての結晶\n[01:54.31]仄かに揺れる灯を宿して\n[01:57.15]光彩を放つ未来焼付けた\n[01:59.95]君の瞳は少し悲しそうで\n[02:02.76]Take a look into my eyes\n[02:05.46]最後の一滴を拭って\n[02:08.42]Every time you wanna see call me\n[02:11.12]最初に出会ったあの場所でさ\n[02:14.07]散り行く運命に抗って\n[02:18.35]そう鮮やかに咲き誇れ\n[02:24.36]Always...\n[02:27.86]君の詠う声と繋がるよう\n[02:33.53]心の奥鳴り響いた僕の音\n[02:39.17]祈りに浮かぶ明日は\n[02:44.83]生きる意味を希望に変えるから\n[02:50.81]I wanna be with you\n[02:55.28]二度とは無い今の現実を\n[02:58.06]手に入れる為の犠牲なんて\n[03:00.49]決して孤独と決別仕切れない\n[03:03.33]今の僕に計れない\n[03:05.48]それでもいいんだ\n[03:07.34]響き渡れ祈りよ\n[03:10.09]木霊する僕らの歌声\n[03:13.61]一寸の光を描いた\n[03:16.18]照らし出す一輪の花よ\n[03:19.05]君と二人手を繋いで\n[03:22.64]ずっといたいんだ\n[03:24.38]...\n[03:49.78]重ねた過ち塗り替えるよう\n[03:55.39]何度でもいいさ繰返していくスタートライン\n[04:01.06]過去とは違う明日を\n[04:06.68]二人だけの希望描くスタートライン\n[04:12.63]I never say good bye\n[04:16.26]いつだってそうさ\n",
        // name: "At The Edge",
        // artist: "千板",
        // url: "http://m7.music.126.net/20211228234124/75a205fed9edfa0ac2cb6bd861c3c6b1/ymusic/3a75/a801/a29f/e04ebd17d085dd5a338e9e33076863ac.mp3",
        // cover: "https://p2.music.126.net/j0kTkSQDEn3MksdJ3S3BSQ==/109951163825143640.jpg",
        // lrc: "https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc",
      }],
  },
  //mutations用于修改state
  //Async 异步
  mutations: {
    addsong(state, adds) {
      state.audioInfo.push({
        name: adds.amount1,
        artist: adds.amount2,
        url: adds.amount3,
        cover: adds.amount4,
        lrc: adds.amount5,
      })
    },
  },
  //actions专门用来做异步处理
  actions: {
   
  }
})