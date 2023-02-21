import React from 'react'

const Page404 = React.lazy(() => import('./views/pages/page404/404'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/404', name: '404', exact:true, element: Page404, fullScreen: true },

 
]

export default routes
