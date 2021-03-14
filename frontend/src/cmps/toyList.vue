<template>
  <ul class="toy-list">
    <toy-preview
      v-for="toy in toys"
      :key="toy._id"
      :toy="toy"
      @removeToy="removeToy"
    ></toy-preview>
  </ul>
</template>


<script>
import toyPreview from "@/cmps/toyPreview.vue";

export default {
  name: "toyList",
  props: {
    toys: Array,
  },
  methods: {
    removeToy(toyId) {
      this.$emit("removeToy", toyId);
    },
  },
  components: {
    toyPreview,
  },
};
</script>
