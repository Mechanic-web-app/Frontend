<template>
  <b-nav-item-dropdown right>
    <template #button-content>
      <em>Pracownik</em>
    </template>
    <b-dropdown-item to="/employee/menu"> Menu pracownika </b-dropdown-item>
    <b-dropdown-item @click="destroySession"> Wyloguj się </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "employeeNavbar",
  methods: {
    ...mapActions(["destroySession"]),
  },
};
</script>

<style></style>
