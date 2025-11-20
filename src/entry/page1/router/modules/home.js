import layout from '@/viewLayout/homeMenu/index.vue'
import icon from "@/assets/iconWork.png"
import activeIcon from "@/assets/iconWork.png"
export default [
  {
    path: '/page1',
    name: '/page1',
    meta: { title: '工作台', sort: 1, icon, activeIcon, isShow: true},
    component: layout,
    redirect: '/page1/test',
    children: [
      {
        path: 'test',
        name: '/page1/test',
        meta: { title: 'page1测试', token: false, isShow: true },
        component: () => import(/* webpackChunkName: "page1" */'@/views/page1Test/index.vue'),
        children: []
      },
    ]
  },
]