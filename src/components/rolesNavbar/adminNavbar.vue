<template>
  <b-nav-item-dropdown right>
    <template #button-content>
      <em>Admin</em>
    </template>
    <b-dropdown-item to="/admin/menu"> Panel admina </b-dropdown-item>
    <b-dropdown-item @click="destroySession"> Wyloguj się </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "adminNavbar",
  methods: {
    ...mapActions(["destroySession"]),
  },
};
</script>

<style></style>
