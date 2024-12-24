export function parseLyricInfo(lyricString: string): string {
  return lyricString.replace(/\n/g, '<br />').replace(/^\s*|\s*$/g, '')
}
