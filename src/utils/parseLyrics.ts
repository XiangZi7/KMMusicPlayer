import { BilingualLyricLine, LyricLine } from "@/utils/interface";

/**
 * 解析歌词
 * @param lyric
 */
const parseLyrics = (lyric: string): LyricLine[] => {
  if (!lyric) return [];
  const lines = lyric.split("\n");
  const parsedLines: LyricLine[] = [];

  lines.forEach((line) => {
    const matches = [...line.matchAll(/\[(\d{2}):(\d{2}\.\d{2,3})\]/g)];
    const parts = line.split(/\[.*?\]/g);
    const lrc = parts.pop()?.trim() ?? ""; // 使用可选链和空值合并操作符

    if (matches.length && lrc) {
      matches.forEach((match) => {
        const minutes = parseInt(match[1]);
        const seconds = parseFloat(match[2]);
        parsedLines.push({ time: minutes * 60 + seconds, lrc });
      });
    }
  });

  return parsedLines;
};
/**
 * 构建歌词数组
 * @param lrc
 * @param tlyric
 */
export const createBilingualData = (
  lrc: string,
  tlyric: string,
): BilingualLyricLine[] => {
  const lrcLines = parseLyrics(lrc || "");
  const tlyricLines = parseLyrics(tlyric || "");

  const bilingualData: BilingualLyricLine[] = [];

  lrcLines.forEach((lrcLine) => {
    const tlyricText =
      tlyricLines.find((line) => line.time === lrcLine.time)?.lrc || "";
    bilingualData.push({
      time: lrcLine.time,
      tlyric: tlyricText,
      lrc: lrcLine.lrc,
    });
  });

  return bilingualData;
};
