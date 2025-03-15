<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import { ElForm, ElFormItem, ElInput, ElDatePicker, ElSelect, ElOption, ElButton } from 'element-plus'

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  options:{
    type: Array
  }  
})


const emit = defineEmits(['submit'])

const formData = ref({ ...props.initialData })

const rules = computed(() => {
  const formRules = {};
  props.fields.forEach((field) => {
    const fieldRules = []

    // Обязательное поле
    if (field.require) {
      fieldRules.push({
        required: true,
        message: `${field.label} обязателен для заполнения`,
        trigger: 'blur',
      })
    }

    // Валидация по типу
    if (field.fieldType === 'number') {
      fieldRules.push({
        type: 'number',
        message: `${field.label} должен быть числом`,
        trigger: 'blur',
        transform: (value) => Number(value),
      })
    } else if (field.fieldType === 'date') {
      fieldRules.push({
        type: 'date',
        message: `${field.label} должен быть датой`,
        trigger: 'change',
      })
    } else if (field.fieldType === 'string') {
      fieldRules.push({
        type: 'string',
        message: `${field.label} должен быть строкой`,
        trigger: 'blur',
      })
    } else if (field.fieldType === 'select') {
      fieldRules.push({
        type: 'string',
        message: `Выберите ${field.label.toLowerCase()}`,
        trigger: 'change',
      })
    }

    formRules[field.prop] = fieldRules
  });
  return formRules
})

const formRef = ref(null);



const createOrUpdate = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', { ...formData.value })
    }
  })
}
</script>

<template>
  <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
    <el-form-item

      v-for="field in fields"
      v-show="field.prop !== 'id'"
      :key="field.prop"
      :label="field.label"
      :prop="field.prop"
    >

      <el-input
        v-if="field.fieldType === 'string'"
        v-model="formData[field.prop]"
        :placeholder="field.label"
      />

      <el-input
        v-if="field.fieldType === 'number'"
        v-model.number="formData[field.prop]"
        type="number"
        :placeholder="field.label"
      />

      <el-date-picker
        v-if="field.fieldType === 'date'"
        v-model="formData[field.prop]"
        type="date"
        :placeholder="field.label"
        format="YYYY-MM-DD"         
        value-format="YYYY-MM-DD"   
        style="width: 100%;"
      />

      <el-select
        v-if="field.fieldType === 'select'"
        v-model="formData[field.prop]"
        :placeholder="field.label"
        style="width: 100%;"
      >
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="createOrUpdate">Отправить</el-button>
    </el-form-item>
  </el-form>
</template>