<script setup>
import { buttonGroups } from "./settingData";

const state = reactive({
  Message: "",
  loading: false,
  buttonGroupss: buttonGroups,
  checked: false,
  cdk: "",
});
const { cdk, Message, buttonGroupss, checked } = toRefs(state);
// eslint-disable-next-line no-undef
const visible = defineModel();
const emits = defineEmits(["send"]);

function handleSendMessage() {
  const stores = [];
  state.buttonGroupss.forEach((item) => {
    item.buttons.forEach((item2) => {
      if (item2.severity == "success") {
        stores.push(item2.en);
      }
    });
  });
  emits("send", {
    keyword: stores.join(" ") + state.Message,
    isDraw: state.checked,
    cdk: state.cdk,
  });
  visible.value = false;
}
// 修改按钮状态
function setButtonSuccess(groupIndex, buttonIndex) {
  // 找到对应的按钮组和按钮，并将 severity 设置为 'success'
  const button = state.buttonGroupss[groupIndex].buttons[buttonIndex];
  // 如果目标按钮的 severity 是 'success'，则切换为 'secondary'，反之则切换为 'success'
  let newSeverity = button.severity === "success" ? "secondary" : "success";
  // 先将同组的所有按钮恢复到原始状态，然后设置点击的按钮
  state.buttonGroupss[groupIndex].buttons.forEach((btn, idx) => {
    btn.severity = idx === buttonIndex ? newSeverity : "secondary";
  });
}
</script>
<template>
  <div>
    <el-dialog v-model="visible" maximizable modal style="width: 50%">
      <div>
        <div class="m-1">
          <i class="pi pi-book fs-color" />
          <span class="fs-color ml-1">CDK</span>
        </div>
        <el-input
          v-model="cdk"
          class="w-full"
          style="max-height: 45px; margin: 0 5px"
        />
        <div class="m-1">
          <i class="pi pi-book fs-color" />
          <span class="fs-color ml-1">写作</span>
        </div>
        <el-input
          v-model="Message"
          type="textarea"
          class="w-full"
          style="max-height: 45px; margin: 0 5px"
          disabled
          placeholder="你的其他需求...需求空格隔开如： 搞笑的 可爱的"
        />
        <div
          v-for="(group, groupIndex) in buttonGroupss"
          :key="group.title"
          class="m-1"
        >
          <!--          <i :class="group.icon" />-->
          <span class="fs-color ml-1">{{ group.title }}</span>
          <div class="row gap-2">
            <el-button
              v-for="(button, buttonIndex) in group.buttons"
              :key="button.label"
              style="padding: 5px"
              :severity="button.severity"
              type="primary"
              @click="setButtonSuccess(groupIndex, buttonIndex)"
            >
              {{ button.label }}
            </el-button>
          </div>
        </div>
        <div class="m-1">
          <i-material-symbols:book-2-outline />
          <span class="fs-color ml-1">AI绘制</span>
        </div>
        <div class="flex flex-items-center">
          <el-switch v-model="checked" />
        </div>
      </div>
      <template #footer>
        <el-button @click="handleSendMessage"> OK </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.fs-color {
  color: #7c7e80;
}
</style>
