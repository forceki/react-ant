import axios from "axios"
import Swal from "sweetalert2"

export const SetCollapsed = "SetCollapsed"
export const SetUserBar = "SetUserBar"
export const SetFullScreen = "SetFullScreen"

export const SwitchCollapsed = (e) => {
    return (dispatch) => {
        dispatch({
            type: SetCollapsed,
            payload: {
                collapsed: e
            }
        })
    }
}

export const SwitchUserBar = (e) => {
    return (dispatch) => {
        dispatch({
            type: SetUserBar,
            payload: {
                userBar: !e
            }
        })
    }
}


export const fullScreen = (e) => {
    return (dispatch) => {
        dispatch({
            type: SetFullScreen,
            payload: {
                fullScreen: e
            }
        })
    }
}

