<template>
  <ul class="review-list">
    <li class="review-item" v-for="rev in reviews" :key="rev._id">
      <ul class="stars">
        <li v-for="(star, idx) in rev.rate" :key="idx"></li>
      </ul>
      <h2 v-if="rev.user.username">{{ rev.user.username }}</h2>
      <p>{{ rev.content }}</p>
      <button @click="removeReview(rev._id)">x</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "reviewList",
  props: {
    reviews: {
      type: Array,
    },
  },
  methods: {
    removeReview(id) {
      this.$emit("removeReview", id);
    },
  },
};
</script>

