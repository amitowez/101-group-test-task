<script setup>
import { defineProps } from 'vue';
import { ElDatePicker } from 'element-plus';

const props = defineProps({
  dataComposible: {
    type: Object
  }
})

</script>

<template>
    <el-date-picker
      v-model="props.dataComposible.dateRange"
      type="daterange"
      range-separator="-"
      start-placeholder="Дата начала"
      end-placeholder="Дата конца"
      style="width: 300px;"
    />
</template>