<template>
  <li class="toy-preview">
    <div class="preview-content">
      <h3>{{ toy.name }}</h3>
      <p>Price: ${{ toy.price }}</p>
      <div class="btn-container">
        <router-link :to="'/edit/' + toy._id"
          ><i class="far fa-edit"></i
        ></router-link>
        <router-link :to="'/toy/' + toy._id"
          ><i class="fas fa-info"></i
        ></router-link>
        <button @click="removeToy"><i class="far fa-trash-alt"></i></button>
      </div>
    </div>
    <img :src="toy.img" />
  </li>
</template>

<script>
export default {
  name: "toyPreview",
  props: {
    toy: Object,
  },
  methods: {
    removeToy() {
      this.$emit("removeToy", this.toy._id);
    },
  },
  computed: {
    imgUrl(name) {
      return name.replace(/\s/g, "").toLowerCase();
    },
  },
};
</script>
