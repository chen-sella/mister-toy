<template>
  <div class="about app-main">
    <img src="../assets/img/chen.jpg" />
    <div class="abount-text flex column">
      <p class="about-name">Chen Sella</p>
      <p class="about-details">
        My name is Chen, I'm 28 Years Old and i live in Tel Aviv, Israel. I'm a
        graduate of the Faculty of Mechanical Engineering from Tel Aviv
        University. Passionate about Web design, love taking on new challenges
        and exploring different fields. I live from one adventure to another,
        love to travel and playing the piano.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
};
</script>
