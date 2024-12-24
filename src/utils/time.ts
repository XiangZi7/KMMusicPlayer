export function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

export function getCurrentTime(): string {
  return new Date().toLocaleTimeString()
}

export function formatMillisecondsToTime(totalMilliseconds: number) {
  const totalSeconds = Math.floor(totalMilliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((n) => (n < 10 ? `0${n}` : n.toString()))
    .filter((val, index) => val !== '00' || index > 0) // 移除开头的"00"小时
    .join(':')
}