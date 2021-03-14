<template>
  <section class="review-container">
    <form class="review-form" @submit.prevent="saveReview">
      <!-- <input
        id="name"
        type="text"
        ref="start"
        placeholder="toy player"
        v-model="review.name"
      /> -->
      <div class="rate">
        <label for="rate">Rate:</label>
        <ul class="review-rate">
          <li
            v-for="(star, idx) in 5"
            :key="idx"
            @click="setRate(star)"
            :class="{ fill: star <= review.rate }"
          ></li>
        </ul>
      </div>
      <textarea cols="30" rows="10" v-model="review.content"></textarea>
      <button>Save</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      review: {
        rate: 0,
        content: "",
      },
    };
  },
  methods: {
    saveReview() {
      console.log("this.review: ", this.review);
      this.$emit("reviewSaved", this.review);
      // TODO:add review service which save reviews
    },
    setRate(rate) {
      console.log(rate);
      this.review.rate = rate;
    },
  },
  // mounted() {
  //   this.$refs.start.focus();
  // },
};
</script>




