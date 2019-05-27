<template>
  <div class="form-container">
    <div class="form">
      <div>
        <h3 class="text-sign-in">SIGN IN</h3>
      </div>
      <input class="form-input" type="text" placeholder="User ID" v-model="input.username">
      <input class="form-input" type="password" placeholder="Password" v-model="input.password">   
      <button class="sign-in-button" type="submit" @click="login">SIGN IN</button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

export default {
  components: {
    Logo
  },
  data(){
    return {
      input: {
        username: "",
        password: "",
      }
    }
  },

  methods: {

    async login(){
        try {
            //ログイン実行
            await this.$store.dispatch('auth/login', this.input)

            //初回データの読み込み
            await this.$store.dispatch('config/fetch')
            //トップへ
            this.$router.push('/accountings/list');
        }
        catch(e) {
            console.log("ログインに失敗しました")
        }
    }
    
  }
}
</script>

<style scoped>

.form-container {
  height: calc( 100vh - 50px );
  width: 100vw; 
  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: #27ae60;

}

.form {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 50px 50px;
  align-items: center;

  min-width: 400px;

}

.form-input {
  margin-bottom: 30px;
  padding: 10px;
  font-size: 16px;
  border-style: none;
  background-color: white;
  width: 100%;
  color: #2c3e50;
  border-bottom: 1px solid #95a5a6;
}

.form-input:focus{
  border-bottom: 2px solid #27ae60;
  transition: .3s;
}

.text-sign-in {
  display: block;
  width: 100%;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #2c3e50;
}

.sign-in-button {
  padding: 10px 30px;
  background-color: #ffffff;
  border: 1px solid #27ae60;
  font-size: 16px;
  font-weight: 700;
  color: #27ae60;
  border-radius: 100px;
  cursor: pointer;
  width: 100%;
  transition: .3s;
}

.sign-in-button:hover {
  transition: .3s;
  background-color:#27ae60; 
  color: #ffffff;
}
</style>
