import axios from 'axios'
import store from './store'
import router from './router'

//设置全局axios默认值

axios.defaults.baseURL = 'http://10.0.5.115:5001/';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

instance.interceptors.request.use = axios.interceptors.request.use;

//request拦截器
instance.interceptors.request.use(
  config => {
    //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
//respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('UserLogout'); //可能是token过期，清除它
          router.replace({ //跳转到登录页面
            path: 'login',
            query: {redirect: router.currentRoute.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
    }
    return error.response
  }
);

export default {
  //用户注册
  userRegister(data) {
    return instance.post('/api/auth/register', data);
  },

  //用户登录
  userLogin(data) {
    return instance.post('/api/auth/login', data);
  },

  //admin 获取 list
  getAllCompany(per, page) {
    return instance.get('/api/admin/company?per_page=' + per + '&page=' + page);
  },

  //admin 获取 list
  getIdCompany(id) {
    return instance.get('/api/admin/company/' + id);
  },

  //admin 删除用户
  delUser(id) {
    return instance.delete('/api/admin/user/' + id);
  },

  //admin get all prod
  getAllProd(per, page) {
    return instance.get('/api/admin/prod?page=' + page + '&per_page=' + per);
  },

  //admin get prod by id
  getIdProd(id, per, page) {
    return instance.get('/api/admin/prod/' + id + '?page=' + page + '&per_page=' + per);
  },

  //admin get all prod_stg
  getAllProdStg(per, page) {
    return instance.get('/api/admin/prod_stg?page=' + page + '&per_page=' + per);
  },

  //admin git prod_stg by id
  getIdProdStg(id, per, page) {
    return instance.get('/api/admin/prod_stg/' + id + '?page=' + page + '&per_page=' + per);
  },

  //admin get all staff
  getAllStaff(per, page) {
    return instance.get('/api/admin/staff?page=' + page + '&per_page=' + per);
  },

  //admin get staff by id
  getIdStaff(id, per, page) {
    return instance.get('/api/admin/staff/' + id + '?page=' + page + '&per_page=' + per);
  },

  //admin get all stg
  getAllStg(per, page) {
    return instance.get('/api/admin/stg?page=' + page + '&per_page=' + per);
  },

  //admin get stg by id
  getIdStg(id, per, page) {
    return instance.get('/api/admin/stg/' + id + '?page=' + page + '&per_page=' + per);
  },

  //admin get user list
  getUser(per, page) {
    return instance.get('/api/admin/user?page=' + page + '&per_page=' + per);
  },

  //get invitation
  sendMail(data) {
    return instance.post('/api/admin/send_mail', data);
  },

  //获取company
  getCompany() {
    return instance.get('/api/company/self');
  },

  //设置company
  setCompany(data) {
    return instance.put('/api/company/self', data);
  },

  //获取职工list
  getStaff(per, page) {
    return instance.get('/api/staff/?page=' + page + '&per_page=' + per);
  },

  //新增职工
  addStaff(data) {
    return instance.post('/api/staff/', data);
  },

  //删除职工
  delStaff(id) {
    return instance.delete('/api/staff/' + id);
  },

  //获取某个职工
  getStaffId(id) {
    return instance.get('/api/staff/' + id);
  },

  //修改职工
  setStaff(id, data) {
    return instance.put('/api/staff/' + id, data);
  },

  //获取策略list
  getStg(per, page) {
    return instance.get('/api/stg/?page=' + page + '&per_page=' + per);
  },

  //新增策略
  addStg(data) {
    return instance.post('/api/stg/', data);
  },

  //删除策略
  delStg(id) {
    return instance.delete('/api/stg/' + id);
  },

  //获取某个策略
  getStgId(id) {
    return instance.get('/api/stg/' + id);
  },

  //修改策略
  setStg(id, data) {
    return instance.put('/api/stg/' + id, data);
  },

  //获取产品list
  getProduct(per, page) {
    return instance.get('/api/product/?page=' + page + '&per_page=' + per);
  },

  //新增产品
  addProduct(data) {
    return instance.post('/api/product/', data);
  },

  //删除产品
  delProduct(id) {
    return instance.delete('/api/product/' + id);
  },

  //获取某个产品
  getProductId(id) {
    return instance.get('/api/product/' + id);
  },

  //修改产品
  setProduct(id, data) {
    return instance.put('/api/product/' + id, data);
  },

  //获取产品策略list
  getProdStg(per, page) {
    return instance.get('/api/prod_stg/?page=' + page + '&per_page=' + per);
  },

  //新增产品策略
  addProdStg(data) {
    return instance.post('/api/prod_stg/', data);
  },

  //删除产品策略
  delProdStg(id) {
    return instance.delete('/api/prod_stg/' + id);
  },

  //获取某个产品策略
  getProdStgId(id) {
    return instance.get('/api/prod_stg/' + id);
  },

  //修改产品策略
  setProdStg(id, data) {
    return instance.put('/api/prod_stg/' + id, data);
  }

}
