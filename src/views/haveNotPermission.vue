<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="gray"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link :to="{ name: 'mainPage' }"> Wróć do strony głównej </router-link>
      </el-menu-item>
    </el-menu>
    <div class="container text-center">
      Nie posiadasz dostępu do tej strony! Wróć na stronę główną!
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  color: white;
  font-size: 5vh;
}
</style>
