<template>
  <li class="toy-preview">
    <div class="preview-content">
      <h3>{{ toy.name }}</h3>

      <p>Price: ${{ toy.price }}</p>
      <div class="btn-container">
        <router-link :to="'/edit/' + toy._id">
          <el-button icon="el-icon-edit" circle></el-button>
        </router-link>
        <router-link :to="'/toy/' + toy._id">
          <el-button icon="el-icon-info" circle></el-button>
        </router-link>
        <el-button
          @click="removeToy"
          icon="el-icon-delete-solid"
          circle
        ></el-button>
      </div>
    </div>
    <img :src="toy.img" />
  </li>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);
library.add(faInfo);
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
