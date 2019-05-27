<template>
  <section class="container">
    <div>
        <p>TopPage</p>
    </div>
  </section>
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
      let poolData = {
        UserPoolId: "ap-northeast-1_i4n2ZAFTI",
        ClientId: "1jjjavjsmqtretgbsjidvbm94d"
      };
      let userData = {
          Username: this.input.username,
          Pool: new CognitoUserPool(poolData)
      };
      let cognitoUser = new CognitoUser(userData);

      let authenticationData = {
          Username: this.input.username,
          Password: this.input.password
      };
      let authenticationDetails = new AuthenticationDetails(authenticationData);

      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            console.log(result);
            let idToken = result.getIdToken().getJwtToken();
            console.log(idToken);
          },
          onFailure: function (err) {
              console.log(err);
          },
          newPasswordRequired: function (userAttributes, requiredAttributes) {
            console.log(userAttributes);
            console.log(requiredAttributes);
            cognitoUser.completeNewPasswordChallenge("Nakao107", {}, this);
          }
      });
    },

    getCurrentUser(){
      let poolData = {
        UserPoolId: "ap-northeast-1_i4n2ZAFTI",
        ClientId: "1jjjavjsmqtretgbsjidvbm94d"
      };

      const userPool = new CognitoUserPool(poolData);

      const cognitoUser = userPool.getCurrentUser()
      console.log(cognitoUser);
    },

    signOut(){
      let poolData = {
        UserPoolId: "ap-northeast-1_i4n2ZAFTI",
        ClientId: "1jjjavjsmqtretgbsjidvbm94d"
      };
      const userPool = new CognitoUserPool(
        poolData
      );

      const cognitoUser = userPool.getCurrentUser()

      if(cognitoUser){
        cognitoUser.signOut()
      }

    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
