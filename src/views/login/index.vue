<template>
  <div class="login-page">
    <h1>系统登录</h1>
    <el-form
      ref="ruleFormRef"
      :model="state.ruleForm"
      :rules="state.rules"
      status-icon
      class="login-box"
    >
      <el-form-item prop="username" class="form-item">
        <el-input
          v-model="state.ruleForm.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input
          type="password"
          show-password
          v-model="state.ruleForm.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-button
        style="width: 100%"
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { useRouter } from "vue-router"
import { setToken } from "@/utils/auth"

const router = useRouter()

const ruleFormRef = ref<FormInstance>()

type State = {
  ruleForm: {
    username: string
    password: string
  }
  rules: FormRules
}
const state: State = reactive({
  ruleForm: {
    username: "",
    password: ""
  },
  rules: {
    username: [
      {
        required: true,
        message: "请输入",
        trigger: "blur"
      }
    ],
    password: [
      {
        required: true,
        message: "请输入",
        trigger: "blur"
      }
    ]
  }
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (valid) {
      setToken("main")
      router.push("/")
    }
  })
}
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100vh;
  background: url(https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr)
    no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 150px;
  min-width: 450px;

  .login-box {
    width: 400px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

    .form-item {
      width: 100%;
    }
  }
}
</style>
