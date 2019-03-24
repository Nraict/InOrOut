import Vue from 'vue'
import Router from 'vue-router'
import signInComponent from './pages/signIn'
import homeComponent from './pages/home'
import allReceiverComponent from './pages/home/children/allReceiver'
import wuhanReceiverComponent from './pages/home/children/wuhanReceiver'
import registerComponent from './pages/register'


Vue.use(Router)


let router =  new Router({
  routes: [
    { path:'/', redirect:'/signIn' },
    { path:'/signIn', component:signInComponent },
    { path:'/register', component:registerComponent },
    { path:'/home',  component:homeComponent, redirect:'/home/allReceiver',
    children:[
      {path:'allReceiver', component:allReceiverComponent},
      {path:'wuhanReceiver', component:wuhanReceiverComponent}
    ] }
  ]
})



//路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  //当是已经登入了的,想返回登入页面,就让他停留在home页面.不允许跳转
  if(token && to.path === '/signIn' ){
    return next('/home')
  }
  if(token && to.path === '/register' ){
    return next('/home')
  }
  //如果token是false,而且不是去的登入页面,那么就不允许跳转,
  //如果有一个为真的话,就允许跳转.也只能跳转到登入页面
  if(token || to.path === '/signIn' || to.path === '/register'){
    next()
  }else {
    next('/')
  }
})

export default router
