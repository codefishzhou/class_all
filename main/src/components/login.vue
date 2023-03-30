<template>
  <div class="login">
    登陆
  </div>
</template>

<script setup>
import {getAllSchool} from '@/api/school'
import {loginfn} from '@/api/user'
import { reactive } from 'vue'
import store from '@/store'
import {useRouter} from 'vue-router'
const state = reactive({
  school: '473',
  number: 'cde12',
  password: 'qwe@123'
})
const getSchoolList = async()=>{
  const data =await getAllSchool()
  state.schoolList = data
}
const router = useRouter()
const loginFn = async()=>{
  const params = {
    email:'cde12@test.com',
    password: 'qwe@123'
  }
  const result =await loginfn(params)
  if(result.status==200){
    store.commit('user/changeUserInfo', result.data)
    store.commit('user/changeToken', result.data.userToken.oauth_token)
    router.push('/')
  }
  console.log(result,'result--',store)
  // store.commit('user/changeToken', {oauth_token:'',oauth_token_secret:''})
  // state.schoolList = data
}
getSchoolList()
loginFn()
</script>

<style>

</style>