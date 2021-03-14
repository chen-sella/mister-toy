<template>
  <div class="container app-main">
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from "./cmps/header.vue";
import appFooter from "./cmps/footer.vue";

export default {
  data() {
    return {
    };
  },
  created() {
    // reducing API calls
    this.$store.dispatch("loadToys");
  },
  components: {
    appHeader,
    appFooter,
  },
};
</script>

