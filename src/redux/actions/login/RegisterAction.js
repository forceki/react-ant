import Swal from "sweetalert2"
import { cvtelp, limitText } from "../../../helpers"
import apiService from "../../../utils/apiService"

export const SetRegister = "SetRegister"
export const SetNull = "SetNull"


export const InputRegister = (e, target) => {
    return (dispatch) => {
        dispatch({
            type: SetRegister,
            payload: {
                data: e
            },
            target: target
        })
    }
}

export const getListUser = (current, pagesize) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('users/list', {
            limit: pagesize,
            page: current
        });
        const ListData = response.data.data

        dispatch({
            type: SetRegister,
            payload: {
                data: ListData
            },
            target: 'list'
        })
    }
}

export const setNullForm = () => {
    return async (dispatch) => {
        dispatch({
            type: SetNull
        })
    }
}

export const getRole = (e) => {
    return async (dispatch) => {
        const role = await apiService.apiGet('users/role');
        const dataRole = role.data.data

        dispatch({
            type: SetRegister,
            payload: {
                data: dataRole
            },
            target: 'role_api'
        })
    }
}

export const PostRegister = (e) => {
    return async (dispatch) => {

        const data = {
            username: e.username,
            email: e.email,
            phone: await cvtelp(e.phone),
            password: e.password,
            roles: e.role

        }
        try {
            if (e.password == e.confirm_password) {

                try {
                    const resp = await apiService.apiPost('users/register', data);
                    if (resp.data.status == 1) {
                        Swal.fire(
                            {
                                icon: 'success',
                                title: 'Your data has been saved',
                                showConfirmButton: false,
                                timer: 3000
                            }
                        )
                        return true
                    }
                } catch (error) {
                    let errors = error.response.data.data
                    if (errors) {

                        let required = errors.map((e) => { return JSON.stringify(e.Message) }).join(',')
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong',
                            text: required,
                            showConfirmButton: false,
                            timer: 4000
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong',
                            text: error.response.data.message,
                            showConfirmButton: false,
                            timer: 4000
                        })
                    }
                }


            } else {
                Swal.fire({
                    icon: 'warning',
                    titleText: 'Password and Confirm Password not matched!',
                    timer: 3000,
                    showConfirmButton: false,
                })
            }



        } catch (error) {
            // Swal.fire({
            //     icon: 'warning',
            //     title: limitText(error.response.data.message, 500),
            //     showConfirmButton: false,
            //     timer: 2000
            // })
        }
    }
}

export const EditRegister = (e, reducer) => {
    return async (dispatch) => {
        const role = reducer.role_api.find(i =>
            i.name == e.roles
        )

        if (e.password != undefined && e.confirm_password != undefined) {

          

            if (e.password == e.confirm_password) {

                try {
                    const data = {
                        username: e.username,
                        email: e.email,
                        phone: await cvtelp(e.phone),
                        password: e.password,
                        roles: role != undefined ? role.id : e.roles
                    }

                    const resp = await apiService.apiPut('users/'+ e.users_id, data);
                    if (resp.data.status == 1) {
                        Swal.fire(
                            {
                                icon: 'success',
                                title: 'Your data has been saved',
                                showConfirmButton: false,
                                timer: 3000
                            }
                        )
                        return true
                    }
                } catch (error) {
                    let errors = error.response.data.data
                    if (errors) {

                        let required = errors.map((e) => { return JSON.stringify(e.Message) }).join(',')
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong',
                            text: required,
                            showConfirmButton: false,
                            timer: 4000
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong',
                            text: error.response.data.message,
                            showConfirmButton: false,
                            timer: 4000
                        })
                    }
                }


            } else {
                Swal.fire({
                    icon: 'warning',
                    titleText: 'Password and Confirm Password not matched!',
                    timer: 3000,
                    showConfirmButton: false,
                })
            }
        } else {
            const data = {
                username: e.username,
                email: e.email,
                phone: await cvtelp(e.phone),
                roles: role != undefined ? role.id : e.roles
            }

            try {
                const data = {
                    username: e.username,
                    email: e.email,
                    phone: await cvtelp(e.phone),
                    password: e.password,
                    roles: role != undefined ? role.id : e.roles
                }

                const resp = await apiService.apiPut('users/'+ e.users_id, data);
                if (resp.data.status == 1) {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: 'Your data has been saved',
                            showConfirmButton: false,
                            timer: 3000
                        }
                    )
                    return true
                }
            } catch (error) {
                let errors = error.response.data.data
                if (errors) {

                    let required = errors.map((e) => { return JSON.stringify(e.Message) }).join(',')
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: required,
                        showConfirmButton: false,
                        timer: 4000
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: error.response.data.message,
                        showConfirmButton: false,
                        timer: 4000
                    })
                }
            }
        }

    }
}
