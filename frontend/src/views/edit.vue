<template>
  <div class="toy-edit app-main">
    <h2>{{ title }}</h2>
    <form v-if="toyToEdit" @submit.prevent="saveToy">
      <label>
        Name:
        <input type="text" v-model="toyToEdit.name" />
      </label>
      <label>
        Price:
        <input type="number" v-model="toyToEdit.price" />
      </label>
      <label>
        Type:
        <input v-model="toyToEdit.type" />
      </label>
      <p class="in-stock">
        In Stock?<span @click="toggleStock" :class="stock"></span>
      </p>
      <button>Save</button>
    </form>
    <section v-if="isLoading" class="loader">
      <img :src="require(`@/assets/img/svg-loaders/audio.svg`)" width="50" />
    </section>
  </div>
</template>

<script>
import { toyService } from "../services/toy-service.js";

export default {
  name: "edit",
  data() {
    return {
      toyId: null,
      toyToEdit: null,
    };
  },
  computed: {
    stock() {
      return { stock: this.toyToEdit.inStock };
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    title() {
      return this.toyId ? "Edit Toy Details" : "Create New Toy";
    },
  },
  methods: {
    async getToyById() {
      try {
        const toy = await toyService.getById(this.toyId);
        this.toyToEdit = JSON.parse(JSON.stringify(toy));
      } catch (err) {
        console.log("cant get toy by id", err);
      }
    },
    async saveToy() {
      try {
        await this.$store.dispatch({
          type: "saveToy",
          toyToSave: this.toyToEdit,
        });
        this.$store.dispatch("loadToys");
        this.$router.push("/toy");
      } catch (err) {
        console.log("cant save toy", err);
      }
    },
    toggleStock() {
      this.toyToEdit.inStock = !this.toyToEdit.inStock;
    },
  },
  created() {
    this.toyId = this.$route.params.toyId;
    console.log(this.toyId);
    if (this.toyId) {
      this.getToyById();
    } else {
      this.toyToEdit = toyService.getEmptyToy();
    }
  },
};
</script>
