<template>
  <div class="home app-main">
    <img src="../assets/img/home.jpg" />
    <div class="text-container">
      <h1>Welcome to Mister Toy</h1>
      <p>Find the perfect pal for your next adventure.</p>
      <router-link to="/user">Login</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {},
};
</script>
