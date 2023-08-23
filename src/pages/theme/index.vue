<script setup>
import { GlobalStore } from "@/stores/index";
import { useTheme } from "@/hooks/useTheme";
import { DEFAULT_PRIMARY } from "@/config/config";
import darkSwitch from "@/components/darkSwitch.vue";
import axios from "axios";
const { changePrimary } = useTheme();
const globalstore = GlobalStore()
const themeConfig = computed(() => globalstore.themeConfig);
const state = reactive({
	list: [],
})
const {
	list,
} = toRefs(state)

// const getAssetImgs = (imgname) => {
// 	return new URL(`../../static/img/thme/${imgname}`, import.meta.url).href
// }
const preset = reactive([
	{
		colorName: '默认',
		colorUrl: '默认.png',
		gbrUrl: DEFAULT_PRIMARY
	},
	{
		colorName: '牡丹粉红',
		gbrUrl: '#eea2a4'
	},
	{
		colorName: '栗紫',
		gbrUrl: '#5a191b'
	},
	{
		colorName: '香叶红',
		gbrUrl: '#f07c82'
	},
	{
		colorName: '艳红',
		gbrUrl: '#ed5a65'
	},
	{
		colorName: '茶花红',
		gbrUrl: '#ee3f4d'
	},

])

const predefineColors = [
	DEFAULT_PRIMARY,
	'#ff4500',
	'#ff8c00',
	'#ffd700',
	'#90ee90',
	'#00ced1',
	'#1e90ff',
	'#c71585',
]

// 主题模板
const showTheme = (preset) => {
	globalstore.setThemeConfig({ ...themeConfig.value, primary: preset })
	changePrimary(themeConfig.value.primary)
}
// 更改主题
const changePrimarys = (e) => {
	const resultHex = rgbaToHex(e)
	changePrimary(resultHex)
}
/**
 * Rgba转换hex
 * @param rgba 颜色的字符串
 * @returns 返回处理后的颜色值
 */
function rgbaToHex(rgba) {
	const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/;
	const match = rgba.match(regex);
	if (!match) {
		throw new Error('Invalid RGBA string');
	}
	const r = parseInt(match[1], 10);
	const g = parseInt(match[2], 10);
	const b = parseInt(match[3], 10);
	const a = match[4] ? parseFloat(match[4]) : 1;
	const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	return `#${hex}`;
}

onMounted(() => {
	axios.get(`${import.meta.env.VITE_ColorAPI_URL}/colorsList`).then(res => {
		state.list = res.data
		state.list.unshift({ hex: DEFAULT_PRIMARY, name: "默认", pinyin: "moren" })
	})
})

</script>
<template>
	<div>
		<div class="content-section menuBar-mv">
			<div class="content-section-title">
				<h2 class="theme-h2">深色模式</h2>
				<div class="theme-preset">
					<div class="content-section">
						<darkSwitch />
					</div>
				</div>
			</div>
			<div class="content-section-title" style="margin-bottom: 0px;">
				<h2 class="theme-h2">主题</h2>
			</div>
			<div class="theme-preset">
				<div class="content-section" style="margin-top: 0px;">
					<el-scrollbar height="350">
						<div class="apps-card">
							<div class="apps-item mv-text" v-for="(item, index) in list" :key="index"
								@click="showTheme(item.hex)">
								<div class="app-card m-theme">
									<div :style="{ backgroundColor: item.hex }"
										style="width: 230px;height: 123px;border-radius: 5px;"></div>
								</div>
								<a href="javascript:;">{{ item.name }}({{ (item.pinyin) }})</a>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
			<div class="content-section-title">
				<h2 class="theme-h2">自定义</h2>
			</div>
			<el-color-picker v-model="themeConfig.primary" show-alpha :predefine="predefineColors"
				@change="changePrimarys" />
			<div class="footer">
				Copyright © 2013 by Perchouli Shanzhai to Nipponcolors<br />
				参考: 色谱 中科院科技情报编委会名词室.科学出版社,1957. Adobe RGB / CMYK FOGRA39, Dot Gain 15% Screenshot沪ICP备17025116号-2
			</div>

		</div>
	</div>
</template>
<style lang='scss' scoped>
.theme-h2 {
	color: var(--theme-color);
}


.infinite-list {
	height: 300px;
	padding: 0;
	margin: 0;
	list-style: none;
}

.infinite-list .infinite-list-item {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	background: var(--el-color-primary-light-9);
	margin: 10px;
	color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
	margin-top: 10px;
}
</style>
