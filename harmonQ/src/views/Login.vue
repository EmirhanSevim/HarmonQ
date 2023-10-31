<template>
  <div class="login-container gradient-animation">
    <div class="login-form">
      <img src="harmonyerp_white.svg" alt="Logo" class="logo" />
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username"></label>
          <input type="text" id="username" v-model="username" required placeholder="Username" class="input-field" />
        </div>
        <div class="form-group">
          <label for="password"></label>
          <input type="password" id="password" v-model="password" required placeholder="Password" class="input-field" />
        </div>
        <button type="submit" class="login-button">GİRİŞ YAP</button>

        <p>Şifremi unuttum?</p>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
}

p {
  font-size: 9px;
  font-family: 'Arial', 'Times New Roman', Times, serif;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  width: 100vw; /* Set the width to cover the entire viewport width */
}

.login-form {
  background-color: #ffffff7a;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  width: 100%;
  text-align: center;
}

.logo {
  width: 170px;
  height: auto;
  margin-bottom: 10px;
}

.form-group {
  margin: 4;
}

input.input-field {
  width: 70%;
  padding: 5px;
  font-size: 11px;
  border: 1px solid #ccc;
  border-radius: 5px;
  opacity: 0.7;
}

button.login-button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 5px 70px;
  margin: 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 9px;
  font-family: 'Arial', 'Times New Roman', Times, serif;
}

.gradient-animation {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  animation: gradient 7s ease infinite;
  background-size: 400% 400%;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const hardcodedUsername = '1';
      const hardcodedPassword = '1';
      if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
        this.$router.push('/Home');
      } else {
        alert('Kullanıcı Adı veya Şifre Yanlış!');
      }
    },
  },
};
</script>
