<script setup lang="ts">
import Home from "@/pages/home/home.vue";
import HeaderWidget from "@/widgets/header/headerWidget.vue";
import AddCar from "@/features/add-car/addCar.vue";
import AppDialog from "@/shared/ui/AppDialog.vue";
import { ref } from "vue";

const dialogTarget = ref<InstanceType<typeof AppDialog>>()
const showDialog = () => dialogTarget.value?.show()
</script>

<template>
  <div class="body__inner">
    <HeaderWidget @show-dialog="showDialog"/>
    <Home/>
    <AppDialog ref="dialogTarget">
      <AddCar :dialog="dialogTarget"/>
    </AppDialog>
  </div>
</template>
<style lang="scss" scoped>
.body__inner {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>