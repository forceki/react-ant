import { SetNull, SetRegister } from "../actions/login/RegisterAction"
import { UserInput } from "../actions/login/SignInAction"


const initialState = {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    role_api: [],

    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    role: ''

}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserInput:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,

            }
        case SetRegister:
            return {
                ...state,
                [action.target]: action.payload.data,
            }
        case SetNull:
            return {
                ...state,
                username: '',
                email: '',
                phone: '',
                password: '',
                confirm_password: '',
                role: ''
            }
        default:
            return state
    }
}


export default UserReducer