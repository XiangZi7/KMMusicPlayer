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
