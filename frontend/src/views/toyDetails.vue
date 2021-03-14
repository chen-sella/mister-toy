<template>
  <section class="app-main">
    <div v-if="toy" class="toy-details">
      <h2>{{ toy.name }}</h2>
      <p>Price: ${{ toy.price }}</p>
      <p>Type: {{ toy.type }}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est qui labore
        itaque, sed rerum facere, illum soluta veritatis maiores saepe magnam
        tempore sequi earum autem optio aliquam provident accusamus quod.
      </p>
      <button @click="addReview = !addReview">Add review</button>
      <add-review v-if="addReview" @reviewSaved="saveReview"></add-review>
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

export default {
  name: "toyDetails",
  data() {
    return {
      toy: null,
      addReview: false,
    };
  },
  methods: {
    getToyById(id) {
      toyService.getById(id).then((toy) => {
        this.toy = toy;
      });
    },
    saveReview(review) {
      console.log("review", review);
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    const id = this.$route.params.toyId;
    console.log(id);
    this.getToyById(id);
  },
  components: {
    addReview,
  },
};
</script>
