import _ from 'lodash';

export const state = () => ({

    /*
    検索結果
    */
    accountings: [],

    /*
    検索クエリ
    */
    query: {}

})


export const getters = {
    accountings   : (state) => state.accountings
}


export const mutations = {

    initState(state)
    {
        state.items = [];
    },

    setQuery(state, payload) {
        state.query = payload
    },

    setAccountings(state, payload) {
        state.accountings = payload
    }

}


export const actions = {
    /*
    初回表示用
    */
    async init({ dispatch, commit }, date)
    {
        commit('initState')

        var query = {date: date}
        await dispatch('search', query)
        
    },

    /*
    検索を実行する
    */
    async search({ state, commit }, query)
    { 

        const {headers, data, error} = await this.$resource().get(`/accountings`, query)
        commit('setAccountings', data)
        
    }
}