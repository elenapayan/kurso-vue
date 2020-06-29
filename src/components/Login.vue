<template>
  <div class="login-container">
    <p>Do you have an account?</p>
    <Button type="button" label="Sign in" @click.prevent="handleForm('signIn')" />
    <p>
      If you don't have don't worry, you can
      <Button
        class="p-button-link"
        label="Sign up"
        @click="handleForm('signUp')"
        style="padding:0; font-size: 16px; text-decoration-line: underline"
      />
    </p>
    <div v-if="show" class="form-container">
      <i class="pi pi-times-circle" @click.prevent="handleForm('')"></i>
      <form>
        <span class="p-float-label" style="width: 100%; margin-bottom: 25px">
          <InputText
            id="username"
            type="text"
            class="p-inputtext-sm"
            style="width: 100%"
            v-model="user.username"
          />
          <label for="username">Username</label>
        </span>
        <span class="p-float-label" style="width: 100%; margin-bottom: 25px">
          <InputText
            id="password"
            type="password"
            class="p-inputtext-sm"
            style="width: 100%"
            v-model="user.password"
          />
          <label for="password">Password</label>
        </span>
        <Button
          v-if="signIn"
          type="submit"
          class="p-button-sm p-button-raised p-button-success"
          label="Send"
          @click.prevent="login(user)"
        />
        <Button
          v-else
          type="submit"
          class="p-button-sm p-button-raised p-button-success"
          label="Send"
          @click.prevent="register(user)"
        />
      </form>
    </div>
    <span
      v-if="error"
      style="color: red; display: block; margin-top: 10px"
    >Ups! Username or password incorrect</span>
  </div>
</template>

<script>
import loginService from "../services/authService";
import proxy from "../services/ProxyService.js";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  name: "Login",
  components: {
    Button: Button,
    InputText: InputText
  },
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
        this.reset();
      } else {
        this.show = !this.show;
        this.signIn = false;
        this.reset();
      }
    },
    reset() {
      (this.user = {
        username: "",
        password: ""
      }),
        (this.error = false);
    }
  }
};
</script>

<style scoped>
.login-container {
  margin: 70px 0 0 50px;
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid rgba(192, 192, 192, 0.7);
  border-radius: 5px;
  max-width: 300px;
  height: 200px;
  margin-top: 30px;
  padding: 10px;
}
.form-container .pi {
  align-self: flex-end;
}
</style>