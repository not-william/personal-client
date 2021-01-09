import axios from 'axios'

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
  },

  getters: {
    authenticated (state) {
      return state.token && state.user
    },

    user (state) {
      return state.user
    }
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },

    SET_USER (state, data) {
      state.user = data
    }
  },

  actions: {
    async signIn ({ dispatch}, credentials) {
      let response = await axios.post('token/', credentials)

      return dispatch('attempt', response.data.access)
    },

    async attempt ({ commit, state }, token) {
      console.log("attempting")
      if (token) {
        console.log("setting token")
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        console.log("No token")
        return
      }

      try {
        let response = await axios.get('users/me/')

        console.log("Logging user in")
        console.log(response)
        commit('SET_USER', response.data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    signOut ( { commit } ) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null) 
    }
  },
}