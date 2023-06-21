import { SetRegister } from "../../actions/login/RegisterAction"

const initialState = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
}

const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SetRegister:
            return {
                ...state,
                [action.target]: action.payload.data,
            }
        default:
            return state
    }
}


export default RegisterReducer