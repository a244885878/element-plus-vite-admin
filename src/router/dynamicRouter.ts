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
  }
]
