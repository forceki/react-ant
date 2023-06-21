import Swal from "sweetalert2"
import { limitText } from "../../../helpers"
import apiService from "../../../utils/apiService"

export const SetSignIn = "SetSignIn"
export const UserInput = "UserInput"


export const InputSignIn = (e, target) => {
    return (dispatch) => {
        dispatch({
            type: SetSignIn,
            payload: {
                data: e
            },
            target: target
        })
    }
}

export const PostSignIn = (username, password) => {
    return async (dispatch) => {

        try {


            let resp = await apiService.apiPost('users/auth/login', {
                username: username,
                password: password
            })

            let data = resp.data.data

            let module = []

            //admin
            if (data.user.roles == 'ad93e908-b9cb-42a4-af99-8655755bea5f') {
                module = [
                    "54524280-d149-46a5-a38b-dff4a5b47261",
                    "c94b03ff-7336-4682-9520-fcc26a5553e2",
                    "a8685a04-080f-4dc0-a60f-b168c542a55a",
                    "24fa6ea1-afad-4d5f-b080-271f3226968e",
                    '17eb0409-2a52-478c-b5f4-eb6bdf5c7dad',
                    '518db87d-668b-4f2e-b498-1b299e796242',
                    '86490898-83cc-47d1-8108-b311e2fa459e',
                    'faadfcb7-e7d0-43da-a48b-792ba1f4a5d3',
                    '393f6e35-055d-49d4-95ba-4ee54c541b1c',
                    'a59db4e8-9c4d-4ecc-880c-cf6fa61a11f8',
                    '420bb99e-19ff-4189-b6f3-1aad487f4b18',
                    'f9a8e9c9-e9f6-4463-9d86-e2c8c3008a18',
                    '531527e1-f168-481a-bf99-0da2942e1b99'
                ];
            }
            // Warehouse manager
            else if (data.user.roles == '821a1d66-6edd-4f54-b9c0-054d24d9e49e') {
                module = [
                    "54524280-d149-46a5-a38b-dff4a5b47261",
                    "c94b03ff-7336-4682-9520-fcc26a5553e2",
                    "a8685a04-080f-4dc0-a60f-b168c542a55a",
                    "24fa6ea1-afad-4d5f-b080-271f3226968e",
                    '86490898-83cc-47d1-8108-b311e2fa459e',
                    'faadfcb7-e7d0-43da-a48b-792ba1f4a5d3',
                    'a59db4e8-9c4d-4ecc-880c-cf6fa61a11f8',
                    '420bb99e-19ff-4189-b6f3-1aad487f4b18'
                ];
            }
            // cashier
            else if (data.user.roles == '48a4ba50-fcd0-4771-9c97-e338cc9b53c4') {
                module = [
                    "54524280-d149-46a5-a38b-dff4a5b47261",
                    "c94b03ff-7336-4682-9520-fcc26a5553e2",
                    "a8685a04-080f-4dc0-a60f-b168c542a55a",
                    "24fa6ea1-afad-4d5f-b080-271f3226968e",
                    '420bb99e-19ff-4189-b6f3-1aad487f4b18',
                    '531527e1-f168-481a-bf99-0da2942e1b99'
                ];
            }
            // shopkeeper
            else if (data.user.roles == '1cf41cf9-7e7f-4b27-b58f-fb664d734d46') {
                module = [
                    "54524280-d149-46a5-a38b-dff4a5b47261",
                    "c94b03ff-7336-4682-9520-fcc26a5553e2",
                    "a8685a04-080f-4dc0-a60f-b168c542a55a",
                    "24fa6ea1-afad-4d5f-b080-271f3226968e",
                    '86490898-83cc-47d1-8108-b311e2fa459e'
                ];
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: 'Anda tidak memiliki akses untuk masuk',
                    showConfirmButton: false,
                    timer: 5000
                })

                return false
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('inventory', JSON.stringify(data.warehouse));
            localStorage.setItem('access', JSON.stringify(module));

            dispatch(InputSignIn(data.token, 'token'));
            dispatch(InputSignIn(data.user, 'user'));
            dispatch(InputSignIn(data.warehouse, 'warehouse'));
            dispatch(InputSignIn(module, 'module'));




            return true

        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: limitText(error.response.data.message, 500),
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
}
