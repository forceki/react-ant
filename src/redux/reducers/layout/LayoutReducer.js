import { SetCollapsed, SetFullScreen, SetUserBar } from "../../actions/layout/LayoutAction"

const initialState = {
    collapsed: false,
    fullScreen: false,
    userBar : false
}

const Layout = (state = initialState, action) => {
    switch (action.type) {
        case SetCollapsed:
            return {
                ...state,
                collapsed: action.payload.collapsed,
            }
        case SetFullScreen:
            return {
                ...state,
                fullScreen: action.payload.fullScreen
            }
        case SetUserBar:
            return{
                ...state,
                userBar: action.payload.userBar
            }
        default:
            return state
    }
}



export default Layout