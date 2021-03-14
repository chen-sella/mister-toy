<template>
  <section class="toy-filter">
    <input type="text" placeholder="filter..." v-model="filterBy.searchStr" @input="setFilter" />
    <select v-model="filterBy.filter" @change="setFilter">
      <option value="all">All</option>
      <option value="inStock">In Stock</option>
    </select>
  </section>
</template>

<script>
export default {
  name: "toyFilter",
  data() {
    return {
      filterBy: { filter: "all", searchStr: "", pageIdx:0 },
    };
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
</script>
