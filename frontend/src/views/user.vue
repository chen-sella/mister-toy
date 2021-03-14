<template>
  <section class="user app-main">
    <section v-if="loggedInUser" class="loggedIn">
      <h2>Hello, {{ loggedInUser.username }}</h2>
      <button @click="logout">Logout</button>
    </section>
    <section v-else class="forms">
      <form @submit.prevent="login">
        <h3>Already Have an account?</h3>
        <input
          type="text"
          placeholder="nickname"
          v-model="userLogin.username"
        />
        <input
          type="password"
          placeholder="password"
          v-model="userLogin.password"
        />
        <button>login</button>
      </form>
      <form @submit.prevent="signUp">
        <h3>SignUp!</h3>
        <input
          type="text"
          placeholder="full name"
          v-model="userSignup.fullname"
        />
        <input
          type="text"
          placeholder="nickname"
          v-model="userSignup.username"
        />
        <input
          type="password"
          placeholder="password"
          v-model="userSignup.password"
        />
        <button>signUp</button>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      userLogin: { username: null, password: null },
      userSignup: {
        username: null,
        password: null,
        fullname: null,
        isAdmin: true,
      },
    };
  },
  methods: {
    login() {
      console.log(this.userLogin);
      this.$store.dispatch({ type: "login", user: this.userLogin });
    },
    signUp() {
      console.log(this.userSignup);
      this.$store.dispatch({ type: "signUp", user: this.userSignup });
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.userLogin = { username: null, password: null };
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>

