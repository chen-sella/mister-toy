<template>
  <div class="toy-app app-main">
    <toy-filter @setFilter="setFilter"></toy-filter>
    <router-link class="add-toy" to="/edit">Add toy +</router-link>
    <toy-list v-if="toys" :toys="toys" @removeToy="removeToy"></toy-list>
    <section v-if="isLoading" class="loader">
      <img :src="require(`@/assets/img/svg-loaders/audio.svg`)" width="50" />
    </section>
    <section class="paging-container">
      <button @click="nextPage(-1)"><i class="fas fa-angle-left"></i></button>
      <button @click="nextPage(1)"><i class="fas fa-angle-right"></i></button>
    </section>
  </div>
</template>

<script>
import toyList from "@/cmps/toyList.vue";
import toyFilter from "@/cmps/toyFilter.vue";

export default {
  name: "toyApp",
  data() {
    return {
      page: 0,
    };
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch({ type: "removeToy", toyId }).then(() => {
        this.$store.dispatch("loadToys");
      });
    },
    setFilter(filterBy) {
      // filterBy.pageIdx = this.page;
      console.log("filterBy", filterBy);
      this.$store.commit({ type: "filter", filterBy });
      this.$store.dispatch("loadToys");
    },
    nextPage(diff) {
      this.page += diff;
      const maxPage = this.$store.getters.maxPage;

      if (this.page < 0) {
        this.page = 0;
      }
      if (this.page > maxPage) {
        this.page = maxPage;
      }

      this.$store.commit({ type: "nextPage", pageIdx: this.page });
      this.$store.dispatch("loadToys");
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toysForDisplay;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  components: {
    toyList,
    toyFilter,
  },
};
</script>
