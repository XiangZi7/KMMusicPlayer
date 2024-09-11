<script setup lang='ts'>

const input = ref<string>('');
const history = ref<string[]>([]);
const buttons: string[] = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    '(', ')', 'sin', 'cos', 'tan', 'bin', 'dec'
];

const handleButtonClick = (button: string) => {
    if (button === '=') {
        calculate();
    } else if (button === 'bin') {
        convertBase('bin');
    } else if (button === 'dec') {
        convertBase('dec');
    } else if (button === 'sin' || button === 'cos' || button === 'tan') {
        handleTrigFunction(button);
    } else {
        input.value += button;
    }
};

const calculate = () => {
    try {
        input.value = eval(input.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
        );

        history.value.push(`${input.value}`); // 记录历史
    } catch (error) {
        input.value = '错误';
    }
};

const clear = () => {
    input.value = '';
};

// 进制转换
const convertBase = (base: 'bin' | 'dec') => {
    if (base === 'bin') {
        const decimalValue = parseInt(input.value, 10);
        input.value = decimalValue.toString(2);
    } else if (base === 'dec') {
        const binaryValue = parseInt(input.value, 2);
        input.value = binaryValue.toString(10);
    }
};

// 处理三角函数
const handleTrigFunction = (func: string) => {
    const value = parseFloat(input.value);
    if (func === 'sin') {
        input.value = Math.sin(value).toString();
    } else if (func === 'cos') {
        input.value = Math.cos(value).toString();
    } else if (func === 'tan') {
        input.value = Math.tan(value).toString();
    }
};

</script>

<template>
    <div class="p-2 bg-gray-50 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">多功能计算器</h2>
        <el-input v-model="input" placeholder="输入表达式" class="mb-4" />

        <div class="grid grid-cols-4 gap-2">
            <el-button v-for="button in buttons" :key="button" @click="handleButtonClick(button)">
                {{ button }}
            </el-button>
        </div>

        <div class="mt-4">
            <el-button type="success" @click="calculate" class="w-full">等于</el-button>
            <el-button type="danger" @click="clear" class="w-full mt-2">清除</el-button>
            <el-popover trigger="click" placement="bottom">
                <template #reference>
                    <el-button class="w-full mt-2" type="primary">查看计算历史</el-button>
                </template>
                <h3 class="text-lg font-bold">计算历史</h3>
                <ul>
                    <li v-for="(item, index) in history" :key="index">{{ item }}</li>
                </ul>
            </el-popover>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.el-button+.el-button {
    margin-left: 0;
}
</style>