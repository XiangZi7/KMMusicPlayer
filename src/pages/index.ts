// 定义搜索结果中的歌曲和歌单的类型
interface ISong {
  id: number;
  name: string;
  ar: Array<{id: number; name: string;}>;
  al: {id: number; name: string; picUrl: string;};
  dt: number;
  mv: number;
}

interface ISongList {
  id: number;
  coverImgUrl: string;
  name: string;
}

// 定义状态的接口
export interface IState {
  SongList: ISongList[];
  SongsList: ISong[];
}
