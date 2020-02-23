import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/createAccount', component: () => import('pages/CreateAccount.vue') },
      {
        path: '/channels/:id',
        component: () => import('pages/ChatStream.vue'),
        props: true,
        beforeEnter: (to, from, next) => {
          const isLogin = JSON.parse(window.localStorage.getItem("Store")).auth.isLogin
          if (!isLogin) {
            Notify.create('로그인이 필요합니다.')
            next('/login')
          }
          else next()
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
