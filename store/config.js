export const state = () => ({
  categories       : {}
})


export const getters = {

  categories       : (state) => state.categories

}


export const mutations = {

  setCategory(state, payload) {

    state.categories = payload;
    
  }
}


export const actions = {

  async fetch({ commit })
  {
    const {data, error} = await this.$resource().get('/categories')

    if(data && data.error) {

    }
    else if(error){
      
    }

    commit('setCategory', data)
  }

}