import { Track } from '@/stores/interface'
import { urlV1 } from '@/api'
import { showNotification } from '@/utils/notification'
export function setupAudio(
  audio: HTMLAudioElement,
  currentSong: Ref<Track>,
  currentTime: Ref<number>,
  duration: Ref<number>,
  volume: Ref<number>,
  playNext: () => void,
  handleAudioError: () => Promise<void>
) {
  audio.src = currentSong.value.source
  audio.ontimeupdate = () => {
    currentTime.value = audio.currentTime
  }

  audio.onloadedmetadata = () => {
    duration.value = audio.duration
  }

  audio.volume = volume.value / 100

  audio.onended = () => {
    playNext()
  }

  audio.onerror = async () => {
    await handleAudioError()
  }
}

export async function handleAudioError(
  audio: HTMLAudioElement,
  currentSong: Ref<Track>,
  currentTime: Ref<number>,
  duration: Ref<number>,
  audioStore: any,
  pause: () => void,
  play: () => void
) {
  if (!audio.error) return

  if (audio.error.code === audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
    currentTime.value = 0
    duration.value = 0
    try {
      const { data } = await urlV1(currentSong.value.id)
      if (!data[0].url) {
        showNotification('提示', '获取新源失败。', 'error')
        pause()
      }
      audio.src = data[0].url
      audioStore.setCurrentSongUrl(data[0].url)
      audio.load()
      play()
    } catch (e) {
      // errorMessage = "获取新源失败。";
    }
  }
}
