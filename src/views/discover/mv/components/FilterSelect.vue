<template>
  <div class="flex gap-4 mb-6">
    <el-select v-model="selectedArea" placeholder="选择地区" @change="onChange">
      <el-option
        v-for="area in areas"
        :key="area"
        :label="area"
        :value="area"
      />
    </el-select>

    <el-select v-model="selectedType" placeholder="选择类型" @change="onChange">
      <el-option
        v-for="type in types"
        :key="type"
        :label="type"
        :value="type"
      />
    </el-select>

    <el-select
      v-model="selectedOrder"
      placeholder="选择排序"
      @change="onChange"
    >
      <el-option
        v-for="order in orders"
        :key="order"
        :label="order"
        :value="order"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
// 定义 props 类型
interface Props {
  areas: string[]
  types: string[]
  orders: string[]
}

// 定义 events 类型
type Emits = {
  (
    event: 'change',
    selectedValues: { area: string; type: string; order: string }
  ): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 选择的区域、类型和排序
const selectedArea = ref(props.areas[0])
const selectedType = ref(props.types[0])
const selectedOrder = ref(props.orders[0])

// 处理选择变化
function onChange() {
  emit('change', {
    area: selectedArea.value,
    type: selectedType.value,
    order: selectedOrder.value,
  })
}
</script>
