export interface Track {
  id: number;
  title: string;
  singer: string;
  album: string;
  cover: string;
  source: string;
  time: number;
  mv: number;
}

export interface Artist {
  name: string;
}

export interface Album {
  name: string;
  picUrl: string;
  artists: { name: string }[];
}

export interface Song {
  id: number;
  name: string;
  ar: Artist[];
  al: Album;
  dt: number;
  mv: number;
}

export interface ArtistToplist {
  name: string; // 排行榜名称
  artists: ArtistRanking[]; // 艺术家排行数据
  upateFrequency: string; // 更新频率
}

export interface ArtistRanking {
  id: number; // 艺术家信息
  first: string; // 艺术家信息
}

export interface RewardToplist {
  name: string; // 排行榜名称
  songs: SongReward[]; // 歌曲奖励数据
  updateFrequency: string; // 更新频率
}

export interface SongReward {
  id: number; // 艺术家信息
  album: Album;
  name: string;
}

export interface ToplistDetail {
  artistToplist: ArtistToplist;
  rewardToplist: RewardToplist;
}

interface commend {
  id: number;
  picUrl: string;
  playcount: number;
  name: string;
}

export interface libraryState {
  dailySongs: Song[];
  recommend: commend[];
  Toplist: ToplistDetail;
}
