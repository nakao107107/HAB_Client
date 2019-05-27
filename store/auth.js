import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';




export const state = () => ({
  
  cognito_cookie: {}
    
})


export const getters = {


}


export const mutations = {


}


export const actions = {


  /*
  cookieの情報からcognito-session-objectを返す
  トークンの期限が切れていたら勝手に更新してくれる
  */
  async getCognitoSession({ dispatch })
  {
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId  : process.env.COGNITO_CLIENT_ID
    });

    const cognitoUser = userPool.getCurrentUser()
    

    //cookie情報が無い or 不正
    if(!cognitoUser){
      return null
    }

    const session = await new Promise((resolve, reject) => {

      cognitoUser.getSession((err, session) => {
        err ? reject(err.message) : resolve(session)
      })

    }).catch(() => {
      return null
    });

    return session
  },


  /*
  ログインする
  */
  async login({ dispatch }, payload)
  {

    const authenticationDetails = new AuthenticationDetails({
      Username: payload.username,
      Password: payload.password
    });

    const userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId  : process.env.COGNITO_CLIENT_ID
    });

    const cognitoUser = new CognitoUser({
      Username: payload.username,
      Pool    : userPool
    });

    await new Promise((resolve, reject) => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: res => resolve(res),
        onFailure: err => reject(err)
      })

    }).catch(() => {
      throw new ApplicationError()
    });
  },


  /*
  ログアウトする
  */
  async logout({ dispatch })
  {

    const storage = await dispatch('_storage')

    const userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId  : process.env.COGNITO_CLIENT_ID
    });

    const cognitoUser = userPool.getCurrentUser()

    if(cognitoUser){
      cognitoUser.signOut()
    }
  },

}
