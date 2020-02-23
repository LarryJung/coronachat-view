export default {
  setCreatedUser(state, payload) {
    console.log(payload)
    state.auth.createdUser = payload
  },
  login(state) {
    state.auth.isLogin = true
    console.log(state.auth.isLogin)
  },
  logout(state) {
    state.auth.isLogin = false
    state.auth.createdUser = state.auth.defaultUserSet
    console.log(state.auth.isLogin)
  },
  initialiseStore(state) {
    // Check if the ID exists
    // if(localStorage.getItem('Store')) {
    //   // Replace the state object with the stored item
    //   this.replaceState(
    //     Object.assign(state, JSON.parse(localStorage.getItem('Store')))
    //   );
    // } else {
      localStorage.setItem('Store', JSON.stringify(state))
    // }
  }
}