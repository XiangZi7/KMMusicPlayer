import {
  HomeFilled,
  VideoCamera,
  SetUp,
  Setting,
} from "@element-plus/icons";
import MdiMusicBoxMultipleOutline from "@/components/MdiMusicBoxMultipleOutline.vue";
import StreamlineMusicFolderSong from "@/components/StreamlineMusicFolderSong.vue";
import MingcuteMovieLine from "@/components/MingcuteMovieLine.vue";
import MdiTestTube from "@/components/MdiTestTube.vue";

export const SideBarData = [
  { title: "", child: [{ title: "首页", icon: HomeFilled, router: "/" }] },
  {
    title: "发现",
    child: [
      { title: "乐库", icon: MdiMusicBoxMultipleOutline, router: "/library" },
      { title: "视频", icon: VideoCamera, router: "/video" },
      { title: "歌单", icon: StreamlineMusicFolderSong, router: "/songList" },
      { title: "动漫", icon: MingcuteMovieLine, router: "/anim" },
      { title: "设置", icon: Setting, router: "/setting" },
      { title: "测试", icon: MdiTestTube, router: "/test" },
    ],
  },
  {
    title: "美化",
    child: [{ title: "主题", icon: SetUp, router: "/theme" }],
  },
];
