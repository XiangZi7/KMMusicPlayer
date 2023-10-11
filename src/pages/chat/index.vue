<script setup>
import request from "@/api/request.js";
import axios from 'axios'
import MarkdownIt from 'markdown-it';

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

onMounted(() => {
  axios.get(import.meta.env.VITE_API_AIURL + "/models").then(({data}) => {
    state.selectList = data.data
  })
})

function sendMessage() {
  if (state.newMessage.trim() !== "") {
    state.loading = true
    state.messages.push({id: state.messages.length + 1, text: state.newMessage, isOther: false});
    handlescrollbar()
    axios.get(import.meta.env.VITE_API_AIURL +`/chat`,
        {
          params: {
            kw: state.newMessage,
            model: state.select
          }
        }).then(({data}) => {
      state.messages.push({
        id: state.messages.length + 1,
        name: data.model,
        text: data.choices[0].message.content,
        isOther: true
      });
      handlescrollbar()
      state.loading = false
    })
    state.newMessage = "";
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