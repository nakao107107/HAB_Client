export const state = () => ({
})

export const mutations = {
}

export const actions = {

  /*
  init
  */
  async nuxtServerInit({ dispatch, commit }, { app, req, route, redirect, error }) {

    /*
    SSR時じゃないときは処理しない
    */
    if (!process.server) {
      return
    }

    /*
    セッションの確認と初回データの読み込み
    読み込めないと言うことはログインしていないのでログインページへ飛ばす
    */

    var session = dispatch('auth/getCognitoSession')

    if (Object.keys(session).length == 0){
        return redirect('/auth/login')
    }
  }

}
