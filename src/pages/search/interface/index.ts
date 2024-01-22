interface ISongList {
  id: number;
  coverImgUrl: string;
  name: string;
}
export interface total {
  songCount: number;
  playlistCount: number;
  mvCount: number;
}
export interface ResSearch {
  list: ISongList[];
  activeName: number | string;
  songTotal: total;
}

export interface IMSongList {
  id: number;
  coverImgUrl: string;
  name: string;
  creator: {
    nickname: string;
  };
}

export interface IMV {
  id: number;
  cover: string;
  name: string;
  artistName: string;
}
