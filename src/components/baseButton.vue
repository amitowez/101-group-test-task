<script setup>
import { defineProps, defineEmits } from 'vue';
import { ElButton } from 'element-plus';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['action']);

const handleClick = () => {
  emit('action');
};
</script>

<template>
  <el-button  @click="handleClick">
    {{ text }}
  </el-button>
</template>