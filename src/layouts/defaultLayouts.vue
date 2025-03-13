<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeRoute = computed(() => route.path)

const handleSelect = (index) => {
  router.push(index) 
};
</script>

<template>
    <el-container>
      <el-header>
        <el-menu :default-active="activeRoute" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/transactions">
            Транзакции
          </el-menu-item>
          <el-menu-item index="/orders">
            Заказы
          </el-menu-item>
          <el-menu-item index="/users">
            Пользователи
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view :key="route.path" />
      </el-main>
    </el-container>
</template>
  
<style scoped>

.el-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.el-main {
  padding: 20px; 
}

</style>