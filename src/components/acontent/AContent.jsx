import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { fullScreen } from '../../redux/actions/layout/LayoutAction'

// routes config
import routes from '../../routes'
import apiService from '../../utils/apiService'

const AContent = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  let local = JSON.parse(localStorage.getItem('access'))
  const access = local ? JSON.parse(localStorage.getItem('access')) : []

  access.push("54524280-d149-46a5-a38b-dff4a5b47261",
    "c94b03ff-7336-4682-9520-fcc26a5553e2",
    "a8685a04-080f-4dc0-a60f-b168c542a55a",
    "24fa6ea1-afad-4d5f-b080-271f3226968e")

  // setup full screen
  let active = routes.find((e) => e.path == location.pathname)

  if (active) {
    if (active.fullScreen) {
      dispatch(fullScreen(true))
    } else if (active.fullScreen == undefined) {
      dispatch(fullScreen(false))
    }
    if (active.exact) {

    } else {
      apiService.apiGet('users/me')
    }
  }

  useEffect(() => {
    if (active != undefined) {
      let validate = access.find((e) => e == active.id)
      if (validate == undefined) {
        navigate('/503')
      }
    } else {
        navigate('/404')
    }
    
    // if (active == undefined) {
    // }

  }, [dispatch])

  return (
    <div className="w-full h-full">
      <Suspense fallback={<span>Loading...</span>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}

                />
              )
            )
          })}

          <Route path="/" element={<Navigate to="Splash Screen" replace />} />
          <Route path="*" exact element={<Navigate exact to="404" replace />} />
          <Route path="/503" exact element={<Navigate exact to="503" replace />} />


        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AContent)
