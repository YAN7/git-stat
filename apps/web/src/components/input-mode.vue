<template>
  <div
    class="search-box"
    :class="{ active: !!newAccount || inputActive }"
    @mouseleave="setInputActive"
  >
    <input
      type="text"
      class="search-txt"
      v-model="newAccount"
      @keyup.enter="() => queryUserInfo()"
      placeholder="请输入用户账号"
    />
    <p class="search-btn" @mouseenter="onEnterIcon">
      <icon-user class="mr-8" />
      <span>{{ userName }} - {{ userAccount }}</span>
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { setToken, setUserInfo } from '@/utils/auth'

const newAccount = ref<string>('')
const inputActive = ref<boolean>(false)
const userName = ref<string>('廖晓进')
const userAccount = ref<string>('772352')

const ucHttp = axios.create({
  baseURL: '',
})

const setInputActive = () => {
  inputActive.value = !!newAccount.value
}

const queryUserInfo = async (defaultAccount?: string) => {
  const res = await ucHttp.post('/uc/tokenapi/get', {
    account: defaultAccount || newAccount.value,
    // 这里需要传当前租户的id，请联系后端或者朱雀项目组获取
    tenantId: '0',
  })
  if (res?.data?.data[0]?.userInfo?.account) {
    const { token, userInfo } = res.data.data[0]
    setToken(token)
    setUserInfo(userInfo)
    userAccount.value = userInfo.account
    userName.value = userInfo.realName
    if (!defaultAccount) {
      window.$message.success('账号更新成功')
    }
    newAccount.value = ''
    inputActive.value = false
  } else {
    window.$message.error('账号不存在')
  }
}

const onEnterIcon = () => {
  if (import.meta.env.PROD) return
  inputActive.value = !inputActive.value
}

onMounted(() => {
  // 每次进来默认会刷新token
  // queryUserInfo('772352')
})
</script>
<style scoped lang="less">
.search-box {
  height: 40px;
  margin-right: 24px;
  border-radius: 40px;
  &.active {
    box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.1);
    .search-txt {
      width: 200px;
      padding: 0 6px;
    }
  }
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  padding: 0;
  font-size: 16px;
  line-height: 40px;
  width: 0;
  transition: 0.4s;
}
.search-btn {
  float: right;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
