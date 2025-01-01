import { Comment } from '@/api/interface'
import { commentMusic } from '@/api'

export async function fetchComments(
  currentSongId: number | string,
  offset: number = 1
): Promise<{ comments: Comment[]; total: number }> {
  const res = await commentMusic({ offset, id: currentSongId })
  return { comments: res.comments, total: res.total }
}

export function formatNumber(num: number): string {
  if (num < 10000) {
    return num.toString()
  } else if (num < 100000) {
    const formatted = (num / 10000).toFixed(1)
    return formatted.endsWith('.0')
      ? formatted.slice(0, -2) + '万'
      : formatted + '万'
  } else {
    return (num / 10000).toFixed(0) + '万'
  }
}
