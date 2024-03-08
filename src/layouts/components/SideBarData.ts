import { HomeFilled, SetUp, Setting } from "@element-plus/icons";
import FileIconsTestTypescript from "~icons/file-icons/test-typescript";
import MaterialSymbolsLibraryMusicOutlineRounded from "~icons/material-symbols/library-music-outline-rounded";
import StreamlineMusicFolderSong from "~icons/streamline/music-folder-song";
import MingcuteMovieLine from "~icons/mingcute/movie-line";
import BxMoviePlay from "~icons/bx/movie-play";
export const SideBarData = [
  { title: "", child: [{ title: "首页", icon: HomeFilled, router: "/" }] },
  {
    title: "发现",
    child: [
      {
        title: "乐库",
        icon: MaterialSymbolsLibraryMusicOutlineRounded,
        router: "/library",
      },
      { title: "视频", icon: BxMoviePlay, router: "/video" },
      {
        title: "歌单",
        icon: StreamlineMusicFolderSong,
        router: "/songList",
      },
      {
        title: "分类",
        icon: StreamlineMusicFolderSong,
        router: "/category",
      },
      { title: "动漫", icon: MingcuteMovieLine, router: "/anim" },
      { title: "设置", icon: Setting, router: "/setting" },
      { title: "测试", icon: FileIconsTestTypescript, router: "/test" },
    ],
  },
  {
    title: "美化",
    child: [{ title: "主题", icon: SetUp, router: "/theme" }],
  },
];
