import layout from '@/viewLayout/homeMenu/index.vue'
import icon from "@/assets/iconWork.png"
import activeIcon from "@/assets/iconWork.png"
export default [
  {
    path: '/page2',
    name: '/page2',
    meta: { title: '工作台', sort: 1, icon, activeIcon, isShow: true},
    component: layout,
    redirect: '/page2/test',
    children: [
      {
        path: 'test',
        name: '/page2/test',
        meta: { title: 'page2测试', token: false, isShow: true },
        component: () => import(/* webpackChunkName: "page1" */'@/views/page2Test/index.vue'),
        children: []
      },
    ]
  },
]