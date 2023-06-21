import { combineReducers } from "redux"
import LayoutReducer from './layout/LayoutReducer'
import DashboardReducer from './dashboard/DashboardReducer'
import SignInReducer from './login/SignInReducer'
import RegisterReducer from './login/RegisterReducer'
import UserReducer from './UserReducer'





export default combineReducers({
    LayoutReducer,
    DashboardReducer,
    SignInReducer,
    RegisterReducer,
    UserReducer
})