<template>
  <el-drawer
    v-if="store.drawerMenuRender"
    :with-header="false"
    v-model="show"
    direction="ltr"
    @closed="closed()"
    size="210px"
    body-class="No_padding_drawer"
  >
    <MenuBox></MenuBox>
  </el-drawer>
</template>

<script setup lang="ts">
import MenuBox from "@/components/MenuBox/index.vue"
import useStore from "@/store"

const { store } = useStore()
const show = defineModel("show", { type: Boolean, default: false })

const closed = () => {
  store.collapse = true
}
</script>

<style scoped lang="scss"></style>
