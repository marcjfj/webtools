export const state = () => ({
    list: []
  })
  
  export const mutations = {
    add(state, user) {
      state.list.push(user)
    },
    emptyList(state) {
      state.list = []
    }
  }
  
  export const getters = {
    list: (state) => {
      return state.list
    }
  }