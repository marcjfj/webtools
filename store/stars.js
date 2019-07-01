export const state = () => ({
    list: []
  })
  
  export const mutations = {
    add(state, tag) {
      state.list.push(tag)
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