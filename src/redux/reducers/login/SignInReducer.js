import { SetSignIn } from "../../actions/login/SignInAction"

const initialState = {
    username: '',
    password: '',
    warehouse: {},
    user: JSON.parse(localStorage.getItem('user')),
    message: ''
}

const SignInReducer = (state = initialState, action) => {
    switch (action.type) {
        case SetSignIn:
            return {
                ...state,
                [action.target]: action.payload.data,
            }
        default:
            return state
    }
}


export default SignInReducer