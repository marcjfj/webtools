export const state = () => ({
    list: []
  })
  
  export const mutations = {
    add(state, tool) {
      state.list.push(tool)
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
  