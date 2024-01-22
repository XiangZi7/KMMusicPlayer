// 定义搜索结果中的歌曲和歌单的类型
interface ISong {
  id: number;
  name: string;
}

interface ISongList {
  id: number;
  coverImgUrl: string;
  name: string;
}

// 定义状态的接口
export interface IState {
  SongsList: ISong[];
  SongList: ISongList[];
}
