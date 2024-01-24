// 代表单个歌单项的接口
export interface PlaylistItem {
  id: number;
  name: string;
  coverImgUrl: string;
}
export interface ISideBar {
  playlist: PlaylistItem[];
}
