import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  auth: {
    isLogin: false,
    createdUser: {
      name: "",
      password: "",
      email: ""
    },
    defaultUserSet: {
      name: "",
      password: "",
      email: ""
    }
  },
  foo: "bar"
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  Store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('Store', JSON.stringify(state));
  });
  return Store
}
