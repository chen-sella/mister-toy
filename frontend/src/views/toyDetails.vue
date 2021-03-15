<template>
  <section class="app-main">
    <div v-if="toy" class="toy-details">
      <h2>{{ toy.name }}</h2>
      <p>Price: ${{ toy.price }}</p>
      <p>Type: {{ toy.type }}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est qui labore
        itaque, sed rerum facere, illum soluta veritatis maiores saepe magnam.
      </p>
      <button @click="addReview = !addReview">Add review</button>
      <add-review v-if="addReview" @reviewSaved="saveReview"></add-review>
      <review-list v-if="toyReviews" :reviews="toyReviews" @removeReview="deleteReview"></review-list>
      <img :src="toy.img" />
      <router-link to="/toy">Back</router-link>
    </div>
    <section v-if="isLoading" class="loader">
      <img :src="require(`@/assets/img/svg-loaders/audio.svg`)" width="50" />
    </section>
  </section>
</template>

<script>
import { toyService } from "../services/toy-service.js";
import addReview from "../cmps/addReview";
import reviewList from "../cmps/review-list";

export default {
  name: "toyDetails",
  data() {
    return {
      toy: null,
      addReview: false,
      toyReviews: null,
    };
  },
  methods: {
    getToyById(id) {
      toyService.getById(id).then((toy) => {
        this.toy = toy;
      });
    },
    saveReview(review) {
      review.toyId = this.$route.params.toyId;
      console.log("review", review);
      this.$store.dispatch({ type: "addReview", review });
      this.addReview = false;
      this.loadReviews();
    },
    deleteReview(id){
      this.$store.dispatch({type:'removeReview', id})
    },
    async loadReviews() {
      try {
        const id = this.$route.params.toyId;
        await this.$store.dispatch({
          type: "loadReviews",
          filterBy: { toyId: id },
        });
        this.toyReviews = this.$store.getters.reviewsToShow;
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    const id = this.$route.params.toyId;
    this.getToyById(id);
  },
  mounted() {
    this.loadReviews();
  },
  components: {
    addReview,
    reviewList,
  },
};
</script>
