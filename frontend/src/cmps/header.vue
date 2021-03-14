<template>
  <section class="app-header">
    <div class="header-content">
      <section class="logo">
      <router-link to="/">Mister Toy</router-link> 
      <img :src="require(`@/assets/img/icon/icons8-pyramid-toy-16.png`)" />
      </section>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/toy">Toys</router-link>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: "appHeader",
};
</script>