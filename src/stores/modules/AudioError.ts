// 错误信息映射表
const errorMessages: Record<number, string> = {
    [MediaError.MEDIA_ERR_ABORTED]: "播放被终止。",
    [MediaError.MEDIA_ERR_NETWORK]: "下载过程中发生网络错误。",
    [MediaError.MEDIA_ERR_DECODE]: "解码过程中发生错误。",
    [MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED]: "音频格式不支持。",
  };
  
  /**
   * 获取播放器错误消息
   * @param {MediaError} error - audio元素的错误对象
   * @returns {string} 错误消息字符串
   */
  export function getErrorMessage(error: MediaError): string {
    const errorCode = error.code as number;
    return errorMessages[errorCode] || "发生了未知错误。";
  }