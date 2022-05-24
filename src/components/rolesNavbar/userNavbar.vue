<template>
  <b-nav-item-dropdown right>
    <template #button-content>
      <em>{{ userName }}</em>
    </template>
    <b-dropdown-item to="/user/profile"> Profil </b-dropdown-item>
    <b-dropdown-item @click="destroySession"> Wyloguj się </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "userNavbar",
  methods: {
    ...mapActions(["destroySession"]),
  },

  computed: {
    ...mapGetters(["userName"]),
  },
};
</script>

<style></style>
