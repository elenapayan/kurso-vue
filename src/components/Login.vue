<template>
  <div>
    <p>Do you have an account?</p>
    <button type="button" @click.prevent="handleForm('signIn')">Sign in</button>
    <p>
      If you don't have don't worry, you can
      <a @click="handleForm('signUp')">Sign up</a>
    </p>
    <form v-if="show">
      <label for="username">Username</label>
      <input type="text" name="username" v-model="user.username" />
      <label for="password">Password</label>
      <input type="password" name="password" v-model="user.password" />
      <button v-if="signIn" @click.prevent="login(user)">Sign in</button>
      <button v-else @click.prevent="register(user)">Sign up</button>
    </form>
    <span v-if="error">Ups! Username or password incorrect</span>
  </div>
</template>

<script>
import loginService from "../services/authService";
import proxy from "../services/ProxyService.js";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      error: false,
      show: false,
      signIn: false
    };
  },
  methods: {
    login(user) {
      loginService
        .login(user)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/backOffice");
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    },
    register(user) {
      proxy.saveUser(user);
    },
    handleForm(x) {
      if (x === "signIn") {
        this.show = !this.show;
        this.signIn = true;
      } else {
        this.show = !this.show;
        this.signIn = false;
      }
    }
  }
};
</script>

<style scoped>
a {
  color: #42b983;
  text-decoration-line: underline;
}
</style>