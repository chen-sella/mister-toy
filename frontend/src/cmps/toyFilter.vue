<template>
  <section class="toy-filter-container">
    <div class="filter-item">
      <label class="label">Search</label>
      <el-input
        type="text"
        @input="setFilter"
        class="input-item"
        placeholder="Search toy..."
        prefix-icon="el-icon-search"
        size="small"
        v-model="filterBy.name"
        clearable
      ></el-input>
    </div>
    <section class="selects-container">
      <div class="filter-item">
        <label for="isInStock" class="label">Availability:</label>
        <el-select
          name="isInStock"
          class="input-item"
          size="small"
          @change="setFilter"
          v-model="filterBy.isInStock"
        >
          <el-option
            v-for="item in stockOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label for="type" class="label">Type:</label>
        <el-select
          name="type"
          class="input-item"
          size="small"
          @change="setFilter"
          v-model="filterBy.type"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label for="sort" class="label">Sort:</label>
        <el-radio-group
          v-model="filterBy.sortBy"
          name="sort"
          class="input-item flex"
          @change="sort()"
          size="small"
        >
          <el-radio-button label="name" value="name"></el-radio-button>
          <el-radio-button label="price" value="price"></el-radio-button>
        </el-radio-group>
      </div>
    </section>
  </section>
</template>

<script>
import { utilService } from "../services/util-service.js";

export default {
  name: "toyFilter",
  data() {
    return {
      filterBy: {
        name: "",
        isInStock: "all",
        type: "all",
        sortBy: "name",
      },
      typeOptions: [
        { value: "all", label: "All" },
        { value: "educational", label: "Educational" },
        { value: "funny", label: "Funny" },
        { value: "adult", label: "Adult" },
      ],
      stockOptions: [
        { value: "all", label: "All" },
        { value: "true", label: "In Stock" },
        { value: "false", label: "Not in Stock" },
      ],
    };
  },
  methods: {
    setFilter() {
      console.log('this.filterBy', this.filterBy);
      this.$emit("setFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
    sort() {
      this.filterBy.sortBy = this.filterBy.sortBy === "name" ? "name" : "price";
      this.setFilter();
    },
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 500);
  },
};
</script>


