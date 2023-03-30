<template>
  <div class="container-full pr-20 pl-20 w-full bg-green-300 flex items-center h-14">
    <div class="w-10">1</div>
    <div class="slogo flex-1 bg-yellow-100 text-lg">{{ state.slogo }}</div>
    <div class="flex">
        <div class="flex w-40">{{state.phone}}</div>
        <div class="flex w-40">{{state.qq}}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
    slogo:'无边界校园',
    phone: '400-8785-593',
    qq: '400-8785-593'
})
</script>

<style>

</style>