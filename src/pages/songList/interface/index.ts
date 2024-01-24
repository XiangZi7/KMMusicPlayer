export interface MaybePlaylist {
  coverImgUrl?: string;
  name?: string;
  creator?: {
    avatarUrl?: string;
    nickname?: string;
  };
  description?: string;
  tags?: string[];
  tracks?: Track[];
  id?: number;
}

export interface Playlist {
  playlists?: MaybePlaylist;
}
export interface Track {
  id: string;
  title: string;
  singer: string;
  album: string;
  cover: string;
  source: string;
  time: number;
  mv: string;
  Lyric?: {
    lrc?: string;
    tlyric?: string;
  };
}

interface CatItem {
  name: string;
  label: string;
}

export interface State {
  Playlist: MaybePlaylist[];
  CatList: CatItem[];
  currentCat: string | string[];
}
