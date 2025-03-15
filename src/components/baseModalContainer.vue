<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { ElDialog } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const handleClose = () => {
  visible.value = false
}
</script>

<template>
  <el-dialog
    :title="title"
    v-model="visible"
    @close="handleClose"
  >
    <slot />
  </el-dialog>
</template>