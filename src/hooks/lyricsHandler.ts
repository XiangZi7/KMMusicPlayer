import { Ref } from 'vue'
import { lyric } from '@/api'
import { LyricData } from '@/utils/parseLyrics'

export async function loadLyrics(
  currentSong: Ref<any>,
  lyricsData: Ref<LyricData>,
  audioStore: any,
  findCurrentLyricIndex: () => void
) {
  lyricsData.value = { lines: [] }
  try {
    if (
      currentSong.value.Lyric &&
      (currentSong.value.Lyric.lines.length > 0 ||
        currentSong.value.Lyric.remark)
    ) {
      lyricsData.value = currentSong.value.Lyric
    } else {
      const result = await lyric(currentSong.value.id)
      lyricsData.value = parseAndMergeLyrics(result)
      audioStore.setCurrentSonglyrics(lyricsData.value)
    }
    findCurrentLyricIndex()
  } catch (error) {
    console.error('获取歌词时出错:', error)
  }
}

export function findCurrentLyricIndex(
  lyricsData: Ref<LyricData>,
  currentLyricIndex: Ref<number>,
  newTime: number = 0
) {
  if (lyricsData.value.lines.length === 0) return

  const targetIndex = lyricsData.value.lines.findIndex(
    (line) => line.time > newTime * 1000
  )
  currentLyricIndex.value =
    targetIndex === -1 ? lyricsData.value.lines.length - 1 : targetIndex - 1
}
