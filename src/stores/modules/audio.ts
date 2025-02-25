import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/helper/persist'
import { trackListData } from "@/mock";
import { AudioState, trackModel } from "@/stores/interface";
/**
 * 音频
 */
export const AudioStore = defineStore({
    id: 'AudioStore',
    state: (): AudioState => ({
        // 歌曲缓存
        trackList: trackListData,
        // 当前播放歌曲索引
        currentSongIndex: 0,
        // 音量
        volume: 50,
        // 音质
        quality: 'exhigh',
    }),
    actions: {
        //set AudioStore
        setAudioStore(...args: ObjToKeyValArray<AudioState>) {
            this.$patch({ [args[0]]: args[1] } as Record<string, any>);
        },
        // 新增歌曲或歌曲数组到 trackList
        addTracks(newTracks: trackModel | trackModel[]) {
            // 收集现有歌曲的ID
            const existingIds = new Set(this.trackList.map((track: { id: any; }) => track.id))
            // 将参数归一化为数组
            const tracksToAdd = Array.isArray(newTracks) ? newTracks : [newTracks]
            for (const track of tracksToAdd) {
                if (existingIds.has(track.id)) {
                    this.currentSongIndex = this.trackList.findIndex((existingTrack: { id: string; }) => existingTrack.id === track.id);
                    break;
                } else {
                    this.trackList.push(track);
                    this.currentSongIndex = this.trackList.length - 1;
                }
            }
        },
        // 删除指定歌曲
        deleteTrack(id: number | string) {
            this.trackList = this.trackList.filter((track: { id: string | number; }) => track.id !== id)
        },
    },
    persist: piniaPersistConfig('AudioStore'),
})