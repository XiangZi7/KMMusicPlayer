import axios from "axios";
import nProgress from "nprogress";
import { ChatGPTModel, SendMessageRequest } from "@/hooks/interface";
/**
 * @description chatGPT - Hook
 */
export const useChat = (
  callback: () => void,
  // eslint-disable-next-line no-unused-vars
  showErrorMessage: (msg: string) => void,
) => {
  // 模型
  const select = ref<string>("gpt-3.5-turbo-0613");
  const selectList = ref<ChatGPTModel[]>([]);
  // loading
  const loading = ref<boolean>(false);
  // 返回的文本
  const lastMessage = ref<string>("");
  // 绘制的AI图片
  const Drawimg = ref<string>("");
  /**
   * @description 获取ChatGPT模型
   */
  function getChatGPTModel() {
    const config = {
      method: "get",
      url: "https://api.chatanywhere.com.cn/v1/models",
      headers: {
        Authorization:
          "Bearer sk-ADjDpi2dQxYS186eDyx0aiIRcpty65qWDvjaKqnmgd67hbsX",
        "Content-Type": "application/json",
      },
      timeout: 5000, // 设置超时时间
    };
    axios(config)
      .then(({ data }) => {
        selectList.value = data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * @description 发送数据
   */
  async function sendMessage(requestData: SendMessageRequest): Promise<void> {
    lastMessage.value = "";
    loading.value = true;
    try {
      // 发起网络请求
      nProgress.start();
      const response = await fetch(
        `https://api.chatanywhere.com.cn/v1/chat/completions`,
        {
          method: "POST",
          body: JSON.stringify(requestData), // 发送请求数据
          headers: {
            "Content-Type": "application/json", // 设置内容类型为JSON
            Authorization:
              "Bearer sk-ADjDpi2dQxYS186eDyx0aiIRcpty65qWDvjaKqnmgd67hbsX",
          },
        },
      );
      nProgress.done();

      if (response.status === 429) {
        // 如果响应状态码为429，则显示错误信息，并返回
        displayErrorMessage("请求频率过快，请稍后重试");
        return;
      }

      // 处理响应的数据流
      await processStream(response);
    } catch (error) {
      console.error("Fetching error:", error); // 打印获取错误
    } finally {
      loading.value = false; // 无论请求成功还是失败，都结束加载状态
    }
  }
  // 处理服务器返回的消息流
  async function processStream(response: Response): Promise<void> {
    const reader = response.body!.getReader();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read(); // 读取数据流的下一块
      if (done) {
        console.log("Stream ended"); // 数据流结束
        break;
      }
      // 提取内容并添加至最后一条消息
      lastMessage.value = extractContent(value as BufferSource);
      callback();
    }
  }
  // 提取和解析流中的内容
  function extractContent(streamValue: BufferSource) {
    const chars = new TextDecoder().decode(streamValue);
    // 分割并处理每一行数据
    return chars
      .split("data:")
      .map((line) => line.trim()) // 去除每行的空白字符
      .filter((line) => line && line !== "[DONE]") // 过滤掉空行和结束标志
      .map((line) => {
        try {
          const obj = JSON.parse(line); // 尝试解析JSON
          return (obj.choices[0].delta && obj.choices[0].delta.content) || ""; // 返回消息内容
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return ""; // 解析失败返回空字符串
        }
      })
      .join(""); // 合并所有消息内容到一个字符串中
  }
  // 显示错误信息
  function displayErrorMessage(msg: string) {
    console.log("=>(useChat.js:150) msg", msg);
    showErrorMessage(msg);
    loading.value = false; // 结束加载状态
  }
  //AI作画
  async function aiDraw(messages: string) {
    try {
      loading.value = true;
      nProgress.start();
      const drarResult = await axios({
        url: "http://8.218.198.198:8094/ai/v1/image",
        method: "post",
        headers: {
          Authorization: "Basic cXExMjM0NTY6cXExMjM0NTY=",
          "Content-Type": "application/json",
        },
        data: { messages },
      });
      Drawimg.value = JSON.parse(drarResult.data).data[0].url;
    } catch (error) {
      console.error("An error occurred: ", error);
      displayErrorMessage("文本中有敏感词");
      // 在此处处理错误，比如提示用户
    } finally {
      // 不管请求成功还是失败，都会执行这里的代码
      loading.value = false;
      nProgress.done();
    }
  }
  onMounted(() => {
    getChatGPTModel();
  });
  return {
    select,
    selectList,
    loading,
    sendMessage,
    lastMessage,
    aiDraw,
    Drawimg,
  };
};
