<script setup>
import Setting from "./components/setting.vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // 可随个人喜好更换主题
import { useChat } from "@/hooks/useChat";

const scrollbarRef = ref();
const innerRef = ref();

// eslint-disable-next-line no-unused-vars
const {
  selectList,
  select,
  loading,
  sendMessage,
  lastMessage,
  aiDraw,
  Drawimg,
} = useChat(callback, showErrorMessage);
const state = reactive({
  messages: [
    {
      title: "默认会话",
      messages: [],
    },
  ],
  currentActivity: 0,
  newMessage: "",
  showSetting: false,
  settingMsg: "",
  hoveredMessageIndex: -1, //鼠标经过左边聊天item,
  isDraw: false,
  isVIP: false,
});

// eslint-disable-next-line no-unused-vars
const {
  messages,
  showSetting,
  newMessage,
  currentActivity,
  hoveredMessageIndex,
} = toRefs(state);

// 初始化页面时获取模型列表
onMounted(async () => {
  hljs.highlightAll();
});
watch(
  () => lastMessage.value,
  () => {
    let lastIndex = state.messages[state.currentActivity].messages.length;
    state.messages[state.currentActivity].messages[lastIndex - 1].text +=
      lastMessage.value;
  },
);

// 发送消息的函数
async function handleSendMessage() {
  // 添加密钥条件
  if (!state.isVIP) return messagePro(1, `请前往发送右边的设置按钮输入正确CDK`);
  // 如果新消息为空白，则不执行任何操作
  if (state.newMessage.trim() === "") return;

  // 创建用户消息
  const userMessage = createUserMessage(state.newMessage, "right");
  state.messages[state.currentActivity].messages.push(userMessage); // 将用户消息添加到状态中
  handLeScrollBar(); // 处理滚动条以显示最新消息
  const requestData = createRequestData(); // 创建请求数据
  //创建机器人消息
  if (state.isDraw) {
    await aiDraw(state.newMessage);
    const robotMessage = createUserMessage(Drawimg.value, "left");
    state.messages[state.currentActivity].messages.push(robotMessage); // 将机器人消息添加到状态中
    handLeScrollBar();
  } else {
    sendMessage(requestData);
    const robotMessage = createUserMessage("", "left");
    state.messages[state.currentActivity].messages.push(robotMessage); // 将机器人消息添加到状态中
    state.newMessage = "";
  }
}

// 创建用户消息对象
function createUserMessage(text, user) {
  return {
    id: state.messages[state.currentActivity].messages.length + 1, // 设置消息ID
    text, // 消息文本
    isOther: user == "right" ? false : true, // 标记是用户的消息
    date: formatCurrentDateTime(), // 消息时间
    isDraw: state.isDraw,
  };
}

// 创建请求发送给服务器的数据
function createRequestData() {
  return {
    messages: state.messages[state.currentActivity].messages
      .filter((item) => !item.isDraw) // 使用filter方法过滤掉isDraw为true的消息
      .map((item) => ({
        // 映射消息数组，每条消息都转换为服务器期待的格式
        role: item.isOther ? "assistant" : "user", // 角色转换（用户还是助手）
        content: state.settingMsg ? state.settingMsg + item.text : item.text, // 消息内容
      })),
    stream: true,
    temperature: 0.7,
    model: select.value,
  };
}

function callback() {
  handLeScrollBar();
}

// 处理滚动条位置函数
function handLeScrollBar() {
  nextTick(() => {
    if (innerRef.value?.clientHeight > 400) {
      scrollbarRef.value.scrollTop = innerRef.value?.clientHeight;
    }
  });
}

// 创建具有代码高亮功能的 MarkdownIt 实例
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {
        /* empty */
      }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

// 定义返回 HTML 函数
function retHtml(text) {
  return md.render(text);
}

// 获取设置的配置
function getSettingMsg(e) {
  state.isDraw = e.isDraw;
  if (e.cdk == "yxcr666") {
    state.isVIP = true;
  } else {
    state.isVIP = false;
  }
  if (e.keyword) {
    state.settingMsg =
      e.keyword + "Output in Chinese(Simplified)" + " The topic is: ";
  } else {
    state.settingMsg = "";
  }
}

// 新增会话
function addChat() {
  state.messages.push({
    title: `默认会话${state.messages.length}`,
    messages: [],
  });
}

// 删除会话
function deleteMes(idx) {
  state.messages.splice(idx, 1);
}

function showErrorMessage(e) {
  messagePro(1, e);
}
</script>

<template>
  <div class="app">
    <div class="header">
      <div class="logo">
        <svg
          viewBox="0 0 513 513"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256.025.05C117.67-2.678 3.184 107.038.025 245.383a240.703 240.703 0 0085.333 182.613v73.387c0 5.891 4.776 10.667 10.667 10.667a10.67 10.67 0 005.653-1.621l59.456-37.141a264.142 264.142 0 0094.891 17.429c138.355 2.728 252.841-106.988 256-245.333C508.866 107.038 394.38-2.678 256.025.05z"
          />
          <path
            d="M330.518 131.099l-213.825 130.08c-7.387 4.494-5.74 15.711 2.656 17.97l72.009 19.374a9.88 9.88 0 007.703-1.094l32.882-20.003-10.113 37.136a9.88 9.88 0 001.083 7.704l38.561 63.826c4.488 7.427 15.726 5.936 18.003-2.425l65.764-241.49c2.337-8.582-7.092-15.72-14.723-11.078zM266.44 356.177l-24.415-40.411 15.544-57.074c2.336-8.581-7.093-15.719-14.723-11.078l-50.536 30.744-45.592-12.266L319.616 160.91 266.44 356.177z"
            fill="#fff"
          />
        </svg>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    <div class="wrapper">
      <!-- 左列 -->
      <div class="conversation-area">
        <div
          v-for="(item, idx) in messages"
          :key="idx"
          class="msg online"
          :class="{ active: currentActivity == idx }"
          @mousemove="hoveredMessageIndex = idx"
          @mouseout="hoveredMessageIndex = -1"
          @click="currentActivity = idx"
        >
          <div class="yx-col-6">
            <div class="msg-profile group">
              <img class="chat-msg-img" src="@/assets/1.png" alt="" />
            </div>
          </div>
          <div class="msg-detail flex-1">
            <div class="flex justify-content-between w-full flex-items-center">
              <div class="msg-username">{{ item.title }}</div>
              <i
                v-show="hoveredMessageIndex === idx"
                class="pi pi-times"
                @click="deleteMes(idx)"
              ></i>
            </div>
            <div class="msg-content">
              <span class="msg-message">{{
                item.messages[item.messages.length - 1]?.text
              }}</span>
              <span class="msg-date">1s</span>
            </div>
          </div>
        </div>
        <button class="add" @click="addChat"></button>
      </div>
      <!-- 右列 -->
      <div ref="scrollbarRef" class="chat-area">
        <div class="chat-area-header">
          <div class="chat-area-title">
            {{ messages[currentActivity]?.title }}
          </div>
        </div>
        <div
          ref="innerRef"
          class="chat-area-main h-full flex-1 overflow-y-auto"
        >
          <!-- 聊天气泡 -->
          <div
            v-for="message in messages[currentActivity]?.messages"
            :key="message.id"
            class="chat-msg"
            :class="{ owner: !message.isOther }"
          >
            <div class="chat-msg-profile">
              <img class="chat-msg-img" src="@/assets/1.png" />
              <div class="chat-msg-date">{{ message.date }}</div>
            </div>
            <div class="chat-msg-content">
              <div
                v-if="!message.isDraw"
                class="chat-msg-text p-2"
                v-html="retHtml(message.text)"
              ></div>

              <div
                v-else-if="message.isDraw && !message.isOther"
                class="chat-msg-text"
                v-html="retHtml(message.text)"
              ></div>
              <div
                v-else
                class="chat-msg-text flex items-center"
                style="height: 260px"
              >
                <img :src="message.text" alt="Image" class="rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        <!-- 聊天框尾部 -->
        <div class="chat-area-footer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-image"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>

          <el-select
            v-model="select"
            class="m-2"
            placeholder="Select"
            size="large"
            style="width: 140px"
          >
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            />
          </el-select>
          <el-input
            v-model="newMessage"
            type="textarea"
            class="flex-1"
            :disabled="loading"
            placeholder="Type something here..."
          />
          <el-button type="primary" @click="handleSendMessage">
            发送
          </el-button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-smile"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </svg>
          <i-mingcute:settings-5-line
            class="text-xl"
            @click="showSetting = true"
          />
        </div>
      </div>
    </div>
    <!--设置-->
    <Setting v-model="showSetting" @send="getSettingMsg" />
  </div>
</template>

<style lang="scss" scoped>
@use "./chat.scss";
</style>
