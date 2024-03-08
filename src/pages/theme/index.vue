<script setup>
import axios from "axios";

const themeStore = useThemeStore();

const { switchDark } = useTheme();
const { changePrimary } = useTheme();

const isDarkRef = ref(themeStore.isDark);

// 颜色集合
const colorList = ref([]);

function onAddDarkChange() {
  themeStore.setIsDark(!themeStore.isDark);
  switchDark();
}

onMounted(() => {
  axios({
    method: "get",
    url: "https://mock.mengxuegu.com/mock/634f6425369a770d74bbf7b9/example/colorsList",
  }).then(({ data }) => {
    colorList.value = data;
  });
});

function changeColor(color) {
  themeStore.setPrimary(color);
  changePrimary(color);
}

// 更改主题
const changePrimarys = (e) => {
  const resultHex = rgbaToHex(e);
  changePrimary(resultHex);
};

/**
 * Rgba转换hex
 * @param rgba 颜色的字符串
 * @returns 返回处理后的颜色值
 */
function rgbaToHex(rgba) {
  const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/;
  const match = rgba.match(regex);
  if (!match) {
    throw new Error("Invalid RGBA string");
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}`;
}
</script>
<template>
  <div class="list-container">
    <div class="list-item">
      <div class="list-title">黑暗模式</div>
      <div class="list-content">
        <el-switch v-model="isDarkRef" @change="onAddDarkChange" />
      </div>
    </div>
    <div class="list-item">
      <div class="list-title">主题颜色</div>
      <div class="list-content">
        <div class="card-color h-[500px]">
          <div
            v-for="item in colorList"
            :key="item.hex"
            class="cards-item"
            @click="changeColor(item.hex)"
          >
            <div class="color-item">
              <div :style="{ backgroundColor: item.hex }"></div>
            </div>
            <span class="text-[14px] text-ellipsis text-[var(--prism-color)]"
              >{{ item.name }}({{ item.pinyin }})</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-title">自定义</div>
      <div class="list-content">
        <el-color-picker
          v-model="themeStore.primary"
          show-alpha
          @change="changePrimarys"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "index";
</style>
