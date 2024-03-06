<script setup lang="ts">
import { recommendResource, recommendSongs, toplistDetail, urlV1 } from "@/api";
import { Track } from "@/stores/interface";
import { MusicPlayer } from "@/hooks/type";
import { isEmptyObject } from "@/utils/utils";

const router = useRouter();
const musicStore = useMusicStore();
const musicPlayer = inject<MusicPlayer>("musicPlayer");
if (!musicPlayer) {
  // 提供了错误处理
  throw new Error("musicPlayer is not provided");
}
const { addTrackAndPlay } = musicPlayer;
const state = reactive({
  dailySongs: [],
  recommend: [],
  Toplist: {
    artistToplist: [],
    rewardToplist: [],
  },
});
const { dailySongs, recommend, Toplist } = toRefs(state);

onMounted(() => {
  Promise.all([recommendSongs(), recommendResource(), toplistDetail()]).then(
    (res) => {
      console.log("=>(index.vue:21) res", res);
      state.dailySongs = res[0].data.dailySongs;
      state.recommend = res[1].recommend;
      state.Toplist = res[2];
    },
  );
});

function ListFormattingTime(time: number) {
  return formatTimes(time);
}

function addMusic(item: any) {
  urlV1(item.id).then(({ data }) => {
    let param: Track = {
      id: item.id,
      title: item.name,
      singer: item.ar.map((ar: any) => ar.name).join(" / "),
      album: item.al.name,
      cover: item.al.picUrl,
      source: data[0].url,
      time: item.dt,
      mv: item.mv,
    };
    musicStore.addTrackAndPlay(param);
    addTrackAndPlay();
  });
}
</script>
<template>
  <div class="flex h-full">
    <main class="flex-1 min-w-0">
      <section v-if="dailySongs.length > 0" class="mb-6">
        <h3 class="text-xl font-semibold mb-4">每日歌曲</h3>
        <div class="grid grid-cols-5 gap-6">
          <div
            class="rounded-lg border bg-white bg-card text-card-foreground shadow-sm col-span-2"
          >
            <div class="p-6">
              <img
                alt="Sleep 4Ever"
                class="rounded-lg w-full h-full"
                :src="dailySongs[0].al.picUrl + '?param=900y900'"
                style="aspect-ratio: 480/240; object-fit: cover"
              />
              <div class="mt-4">
                <h4 class="text-lg font-semibold">{{ dailySongs[0].name }}</h4>
                <p class="text-sm text-gray-600">
                  {{ dailySongs[0].ar.map((item) => item.name).join("、") }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-3 space-y-4 bg-white p-3 rounded-xl">
            <el-scrollbar height="250">
              <div
                v-for="item in dailySongs"
                :key="item.id"
                class="flex items-center justify-between py-1.5 hover:bg-[lightgray] px-2 rounded-xl transition"
                @dblclick="addMusic(item)"
              >
                <div class="flex items-center">
                  <el-avatar
                    shape="square"
                    :src="item.al.picUrl + '?param=60y60'"
                  />
                  <div class="ml-2">
                    <h4 class="text-sm font-medium">{{ item.name }}</h4>
                    <p class="text-xs text-gray-500">
                      {{ item.ar.map((item2) => item2.name).join("、") }}
                    </p>
                  </div>
                </div>
                <span class="text-xs text-gray-500"
                  >{{ ListFormattingTime(item.dt) }}
                </span>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </section>
      <section v-if="recommend.length > 0" class="mb-6">
        <h3 class="text-xl font-semibold mb-4">每日歌单</h3>
        <div class="grid grid-cols-5 gap-6">
          <div
            v-for="item in recommend"
            :key="item.id"
            class="relative rounded-lg overflow-hidden group"
            @click="
              router.push({ path: `/songList/songListDetails/${item.id}` })
            "
          >
            <img
              alt="cover"
              class="rounded-lg w-full h-full transform transition duration-300 ease-in-out group-hover:scale-105"
              :src="item.picUrl + '?param=300y300'"
            />
            <!-- 播放量 -->
            <div
              class="text-xs flex gap-1 items-center absolute top-0 right-0 text-white p-1 rounded-br-lg transition duration-300 ease-in-out group-hover:bg-opacity-70"
            >
              <i-material-symbols:play-circle-outline />
              {{ item.playcount }}
            </div>
            <!-- 歌单名字 -->
            <div
              class="text-xs text-center absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm p-2 text-white truncate transition duration-300 ease-in-out group-hover:bg-opacity-70"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </section>
    </main>
    <aside class="w-64 ml-8">
      <section v-if="!isEmptyObject(Toplist.artistToplist)" class="mb-6">
        <h3 class="text-lg font-semibold mb-4">
          {{ Toplist.artistToplist.name }}
        </h3>
        <div class="space-y-3">
          <div
            v-for="item in Toplist.artistToplist.artists"
            :key="item.id"
            class="flex items-center justify-between bg-white rounded-xl p-3"
          >
            <div class="flex items-center">
              <div class="ml-2">
                <h4 class="text-sm font-medium">{{ item.first }}</h4>
                <p class="text-xs text-gray-500">
                  {{ Toplist.artistToplist.upateFrequency }}
                </p>
              </div>
            </div>
            <i-ic:baseline-more-vert />
          </div>
        </div>
      </section>
      <section v-if="!isEmptyObject(Toplist.rewardToplist)">
        <h3 class="text-lg font-semibold mb-4">
          {{ Toplist.rewardToplist.name }}
        </h3>
        <div class="space-y-3">
          <div
            v-for="item in Toplist.rewardToplist.songs"
            :key="item.id"
            class="flex items-center justify-between bg-white rounded-xl p-3"
          >
            <div class="flex items-center">
              <el-avatar :src="item.album.picUrl + '?param=60y60'" />
              <div class="ml-2">
                <h4 class="text-sm font-medium">{{ item.name }}</h4>
                <p class="text-xs text-gray-500">
                  {{ item.album.artists.map((item2) => item2.name).join() }}
                </p>
              </div>
            </div>
            <i-ic:baseline-more-vert />
          </div>
        </div>
      </section>
    </aside>
  </div>
</template>
<style lang="scss" scoped></style>
