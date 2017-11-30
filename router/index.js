import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'

Vue.use(Router);

//路由

import Login from '../auth/login.vue'
import Home from '../pages/home.vue'
import Menu from '../components/menu.vue'
import User from '../components/user.vue'
import Invitation from '../auth/invitation.vue'
import Staff from '../components/staff.vue'
import Company from '../components/company.vue'
import allCompany from '../components/allCompany.vue'
import editStaff from '../components/editStaff.vue'
import addStaff from '../components/addStaff.vue'
import editCompany from '../components/editCompany.vue'
import Stg from '../components/stg.vue'
import editStg from '../components/editStg.vue'
import addStg from '../components/addStg.vue'
import Product from '../components/product.vue'
import editProduct from '../components/editProduct.vue'
import addProduct from '../components/addProduct.vue'
import prodStg from '../components/prodStg.vue'
import editProdStg from '../components/editProdStg.vue'
import addProdStg from '../components/addProdStg.vue'
import Error404 from '../components/404.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/home/user',
          name: 'user',
          component: User,
          meta: {
            requiresAuth: 'admin'
          }
        },
        {
          path: '/home/editStaff',
          name: 'editStaff',
          component: editStaff,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/addStaff',
          name: 'addStaff',
          component: addStaff,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/editCompany',
          name: 'editCompany',
          component: editCompany,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/editStg',
          name: 'editStg',
          component: editStg,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/addStg',
          name: 'addStg',
          component: addStg,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/editProduct',
          name: 'editProduct',
          component: editProduct,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/addProduct',
          name: 'addProduct',
          component: addProduct,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/editProdStg',
          name: 'editProdStg',
          component: editProdStg,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/addProdStg',
          name: 'addProdStg',
          component: addProdStg,
          meta: {
            requiresAuth: 'user'
          }
        },
        {
          path: '/home/staff',
          name: 'staff',
          component: Staff,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/home/company',
          name: 'company',
          component: Company,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/home/stg',
          name: 'stg',
          component: Stg,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/home/product',
          name: 'product',
          component: Product,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/home/prodStg',
          name: 'prodStg',
          component: prodStg,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/home/allCompany',
          name: 'allCompany',
          component: allCompany,
          meta: {
            requiresAuth: 'admin'
          }
        },
        {
          path: '/home/invitation',
          name: 'invitation',
          component: Invitation,
          meta: {
            requiresAuth: 'admin'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'error',
      component: Login
    }
  ]
});

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  let admin = store.state.admin;
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (to.meta.requiresAuth == 'admin' && token && admin == 'true') { //admin login
      next();
    } else if (to.meta.requiresAuth == 'user' && token && admin == 'false') {//普通用户
      next();
    } else if (to.meta.requiresAuth === true) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next();//如果无需token,那么随它去吧
  }
});

export default router;


