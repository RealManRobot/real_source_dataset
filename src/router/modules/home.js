import layout from '@/viewLayout/homeMenu/index.vue'
export default [
  // {
  //   path: '/home',
  //   name: '/home',
  //   meta: { title: '工作台', sort: 1, icon, activeIcon, isShow: true},
  //   component: layout,
  //   redirect: '/home/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: '/home/index',
  //       meta: { title: '工作台', token: false, isShow: true },
  //       component: () => import(/* webpackChunkName: "home" */'../../views/home/index.vue'),
  //       children: []
  //     },
  //   ]
  // },
  {
    path: '/',
    name: '/',
    meta: { title: '数据采集系统', sort: 1, isShow: true},
    component: () => import(/* webpackChunkName: "index" */'../../views/home/index.vue'),
  },
]