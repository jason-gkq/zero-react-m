module.exports.routes = [
  {
    path: 'index',
    children: [
      {
        path: 'index',
      },
    ],
  },
  {
    path: 'tools',
  },
  {
    path: 'login',
  },
  {
    path: 'personal',
    children: [
      {
        path: 'center',
      },
    ],
  },
  {
    path: 'work',
    children: [
      {
        path: 'dotask',
        component: 'work/dotask',
        children: [
          {
            path: 'agree',
          },
          {
            path: 'disagree',
          },
        ],
      },
      {
        path: 'donetask',
      },
      {
        path: 'backlog',
      },
    ],
  },
  {
    path: 'common',
    children: [
      {
        path: 'preview',
      },
    ],
  },
];
