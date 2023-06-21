import React from 'react'

const Page404 = React.lazy(() => import('./views/pages/page404/404'))
const Page503 = React.lazy(() => import('./views/pages/page503/503'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const splash = React.lazy(() => import('./views/revota'))


const signin = React.lazy(() => import('./views/pages/login/signIn'))
const Register = React.lazy(() => import('./views/pages/login/register'))


const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { id: '17eb0409-2a52-478c-b5f4-eb6bdf5c7dad', path: '/dashboard', name: 'Dashboard', element: Dashboard },



  { id: '54524280-d149-46a5-a38b-dff4a5b47261', path: '/404', name: '404', exact: true, element: Page404, fullScreen: true },
  { id: 'c94b03ff-7336-4682-9520-fcc26a5553e2', path: '/503', name: '503', exact: true, element: Page503, fullScreen: true },
  { id: 'a8685a04-080f-4dc0-a60f-b168c542a55a', path: '/signin', name: 'Sign In', exact: true, element: signin, fullScreen: true },
  // { id: '', path: '/register', name: 'Register', exact: true, element: Register, fullScreen: true },
  { id: '24fa6ea1-afad-4d5f-b080-271f3226968e', path: '/', name: 'Splash Screen', element: splash },





]

export default routes
