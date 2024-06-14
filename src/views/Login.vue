<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', { username: this.username, password: this.password });
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
};
</script>
