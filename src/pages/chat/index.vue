<script setup>
import MarkdownIt from "markdown-it";
import axios from 'axios'

const scrollbarRef = ref()
const innerRef = ref()
const md = new MarkdownIt();
const state = reactive({
  messages: [
    {id: 1, name: "GPT-3.5", text: "Hello", isOther: true},
    {id: 2, name: "GPT-3.5", text: "Hi", isOther: false},
    {id: 3, name: "GPT-3.5", text: "How are you?", isOther: true},
    {id: 4, name: "GPT-3.5", text: "I'm good, thanks!", isOther: false}
  ],
  newMessage: "",
  loading: false,
  select: "gpt-3.5-turbo-0613",
  selectList: [],
})
const {
  messages,
  newMessage,
  loading,
  select,
  selectList
} = toRefs(state)


onMounted(async () => {
  axios.get(import.meta.env.VITE_API_AIURL + "/models").then(({data}) => {
    state.selectList = data.data
  })
});

async function sendMessage() {
  if (state.newMessage.trim() !== "") {
    state.loading = true
    state.messages.push({id: state.messages.length + 1, text: state.newMessage, isOther: false});
    handlescrollbar()

    const data = JSON.stringify({
      model: state.select,
      messages: [
        {
          role: "user",
          content: state.newMessage,
        },
      ],
      temperature: 0.7,
      stream: true,
    });

    try {
      const response = await fetch(
          "https://api.chatanywhere.com.cn/v1/chat/completions",
          {
            method: "POST",
            body: data,
            headers: {
              Authorization:
                  "Bearer sk-ADjDpi2dQxYS186eDyx0aiIRcpty65qWDvjaKqnmgd67hbsX",
              "Content-Type": "application/json",
            },
          }
      );
      //清空输入框文本
      state.newMessage = "";
      const reader = response.body.getReader();
      //
      state.messages.push({
        id: 1,
        text:"",
        name: state.select,
        isOther: true
      })
      // 缓存最后一条消息对象，用于追加文本内容
      let lastMessage = state.messages[state.messages.length - 1];
      while (true) {
        const {done, value} = await reader.read();

        if (done) {
          console.log("Stream ended");
          state.loading = false
          break;
        }

         // 将每一块数据追加到 lastMessage.text
        let chars = new TextDecoder().decode(value);
        let lines = chars.split("data:");

        for (let i = 0; i < lines.length; i++) {
          chars = lines[i].replace(/\s*/, "").replace(/\s*$/, "");
          if (!chars) {
            continue;
          }

          let obj = JSON.parse(chars);
          // 检查是否存在有效的文本内容，然后追加到最后一条消息
          if (obj && obj.choices[0].delta && obj.choices[0].delta.content != undefined && obj.choices[0].delta.content != 'undefined') {
            lastMessage.text += obj.choices[0].delta.content;
            handlescrollbar()
          }
        }
      }
    } catch (error) {
      console.error(error);
      state.loading = false
    }
  }
}

// 始终保持在底部
function handlescrollbar() {
  nextTick(() => {
    if (innerRef.value?.clientHeight > 400) {
      scrollbarRef.value?.setScrollTop(innerRef.value?.clientHeight)
    }
  })
}

function retHtml(text) {
  return md.render(text)
}
</script>

<template>
  <div class="box">
    <div id="chatbox">
      <el-scrollbar ref="scrollbarRef" height="580">
        <div ref="innerRef">
          <div v-for="message in messages" :key="message.id"
               class="msg"
               :class="{'message-left': message.isOther, 'message-right': !message.isOther}">
            <div v-if="message.isOther" class="robot">
              <img class="avatar" src="@/static/img/1.png"/>
              <div class="msg-name">{{ message.name.toUpperCase() }}</div>
            </div>
            <div class="message-bubble" v-html="retHtml(message.text)"></div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div id="inputbox">
      <el-input placeholder="Type your message here" @keyup.enter='sendMessage' v-model="newMessage"
                class="input-with-select">
        <template #prepend>
          <el-select v-model="select" placeholder="请选择模型">
            <el-option v-for="item in selectList" :key="item.id"
                       :label="item.id"
                       :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-input>
      <el-button class="ipt-btn" type="primary" @click="sendMessage" :loading="loading">发送</el-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.box {
  max-height: 100vh;
  position: relative;
}

.avatar {
  border-radius: 50%;
  width: 40px
}

.robot {
  display: flex;
  align-items: center;
}

.msg-name {
  color: #919191;
  font-size: 14px;
  margin-left: 10px;
}

#chatbox {
  padding: 20px;
}

.message-left {
  text-align: left;
}

.message-right {
  text-align: right;
}

.message-bubble {
  display: inline-block;
  background-color: #e1e1e1;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}

#inputbox {
  padding: 10px;
  display: flex;
  align-items: center;
  height: 55px;

  .ipt-btn {
    margin-left: 10px;
  }
}

.msg {
  margin: 10px 0;
}

</style>
