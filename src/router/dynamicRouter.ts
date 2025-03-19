export default [
  {
    path: "/demo",
    name: "demo",
    component: "/demo/index",
    redirect: "/demo/demo2",
    meta: {
      title: "demo",
      icon: "ChatDotRound"
    },
    children: [
      {
        path: "/demo/demo2",
        name: "demo2",
        component: "/demo/demo2/index",
        meta: {
          title: "demo2"
        }
      },
      {
        path: "/demo/demo3",
        name: "demo3",
        component: "/demo/demo3/index",
        meta: {
          title: "demo3"
        }
      }
    ]
  },
  {
    path: "/flow",
    name: "flow",
    component: "/flow/index",
    redirect: "/flow/create",
    meta: {
      title: "审批管理",
      icon: "Edit"
    },
    children: [
      {
        path: "/flow/create",
        name: "create",
        component: "/flow/create/index",
        meta: {
          title: "创建审批"
        }
      },
      {
        path: "/flow/template",
        name: "template",
        component: "/flow/template/index",
        meta: {
          title: "审批模板"
        }
      }
    ]
  }
]
