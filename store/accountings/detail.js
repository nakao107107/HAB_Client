import { notStrictEqual } from "assert";

export const state = () => ({
  
    /*
    APIのレスポンス
    */
    accounting: {},

    /*
    派生前の指定日
    */
    date: ''
  
  })
  
  
  export const getters = {

    accounting  : (state) => state.accounting,
    date        : (state) => state.date

  }
  
  
  export const mutations = {

    initState(state){
      state.accounting = {}
    },

    setAccounting(state, payload) {

      state.accounting = payload

    },

    setDate(state, payload) {

      state.date = payload

    }
  
  }


  
  
  export const actions = {
  
    /*
    収支情報を取得する
    */
    async init({ state, commit }, accounting_id)
    {
        commit('initState');

        if(accounting_id === undefined){
            return
        }

        const {data, error} = await this.$resource().get(`/accountings/${accounting_id}`)

        if(data && data.error) {

        }
        else if(error){

        }

        commit('setAccounting', data);
    },

    async saveAttribute({ state, commit, router }, payload){

      let options

      /*
      日付情報の入力
      */
      if(state.date === undefined){
        var today = new Date();
        var date = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
        commit("setDate", date)
      }

      if(state.accounting.id){
        console.log("aa")
        options = {
          method: 'PUT',
          url   : `/accountings/${state.accounting.id}`,
          data  : payload
        }
      }
      else{
        options = {
          method: 'POST',
          url   : `/accountings`,
          data  : Object.assign(payload, {date: state.date})
        }
      }

      const {data, error} = await this.$resource().request(options)

      if(data && data.error) {

      }
      else if(error){

      }

  
      commit('setAccounting', data)

    },

    async deleteAttribute({ state, commit, router }){

      let options

      const {data, error} = await this.$resource().delete(`/accountings/${state.accounting.id}`)


      if(error) {

      }
  
      commit('setAccounting', {})

    }
  
  }
  