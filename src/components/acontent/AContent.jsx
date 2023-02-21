import React, { Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { fullScreen } from '../../redux/actions/layout/LayoutAction'

// routes config
import routes from '../../routes'

const AContent = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  // setup full screen
  let active = routes.find((e) => e.path == location.pathname)
  if (active) {
    if (active.fullScreen) {
      dispatch(fullScreen(true))
    } else if (active.fullScreen == undefined) {
      dispatch(fullScreen(false))
    }
  }

  return (
    <div className="w-full h-full">
      <Suspense fallback={<span>Loading</span>}>
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

          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="*" exact element={<Navigate exact to="404" replace />} />

        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AContent)
