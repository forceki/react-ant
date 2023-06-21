import axios from "axios"
import Swal from "sweetalert2"
import { cvtelp } from "../../../../helpers"
import apiService from "../../../../utils/apiService"

export const SetForm = "SetForm"
export const SetAddress = "SetAddress"

export const getListSupplier = (current, pagesize) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('master/supplier', {
            limit:pagesize,
            page:current
        });
        const ListData = response.data.data

        dispatch({
            type: SetForm,
            payload: {
                data: ListData
            },
            target: 'list'
        })
    }
}

export const getDetailSupplier = (id) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('master/supplier/by', {
            id: id
        });
        const ListData = response.data.data

        for (const data in ListData) {
            dispatch({
                type: SetForm,
                payload: {
                    data: ListData[data]
                },
                target: data
            })
        }

        dispatch({
            type: SetForm,
            payload: {
                data: ListData
            },
            target: 'detail'
        })

    }
}

export const AddInputSupplier = (e, target) => {
    return (dispatch) => {
        dispatch({
            type: SetForm,
            payload: {
                data: e
            },
            target: target
        })
    }
}

export const getProvince = (e) => {
    return async (dispatch) => {
        const province = await apiService.apiGet('master/setting/address', {
            type: 'PROVINCE'
        });
        const dataProvince = province.data.data

        dispatch({
            type: SetAddress,
            payload: {
                data: dataProvince
            },
            target: 'province_api'
        })
    }
}

export const getCity = (e) => {
    return async (dispatch) => {

        const city = await apiService.apiGet('master/setting/address', {
            type: 'CITY',
            reff: e
        })

        const dataCity = city.data.data

        dispatch({
            type: SetAddress,
            payload: {
                data: dataCity
            },
            target: 'city_api'

        })
    }
}


export const PushAddSupplier = (e) => {
    return async (dispatch) => {
        const data =
        {
            supplier_code: e.supplier_code,
            supplier_name: e.supplier_name,
            address: e.address,
            city: e.city,
            province: e.province,
            postalcode: e.postalcode,
            country: e.country,
            phone1: await cvtelp(e.phone1),
            phone2: await cvtelp(e.phone2),
            fax: e.fax,
            email: e.email,
            contact_name: e.contact_name,
            contact_phone1: await cvtelp(e.contact_phone1),
            contact_phone2: await cvtelp(e.contact_phone2),
            notes: e.notes,
            supplier_status: e.supplier_status
        }

       

        try{
            const resp = await apiService.apiPost('master/supplier', data);
            if (resp.data.status == 1) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: 'Your data has been saved',
                        showConfirmButton: false,
                        timer: 3000
                    }
                ).then(() =>
                    window.location.href = '/master/supplier'
                )
            }
        }catch(error){
            let errors = error.response.data.data 
            if( errors.length > 0){

                let required = errors.map((e)=> {return JSON.stringify(e.Message)}).join(',')
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

export const PushEditSupplier = (e) => {
    return async (dispatch) => {
        
        const data =
        {
            supplier_code: e.supplier_code,
            supplier_name: e.supplier_name,
            address: e.address,
            city: e.city,
            province: e.province,
            postalcode: e.postalcode,
            country: e.country,
            phone1: await cvtelp(e.phone1),
            phone2: await cvtelp(e.phone2),
            fax: e.fax,
            email: e.email,
            contact_name: e.contact_name,
            contact_phone1: await cvtelp(e.contact_phone1),
            contact_phone2: await cvtelp(e.contact_phone2),
            notes: e.notes,
            supplier_status: e.supplier_status
        }

        const config = {
            params: {
                supplier_id: e.supplier_id,
            }
        }

        try{
            const resp = await apiService.apiPut('master/supplier', data, config);

            if (resp.data.status == 1) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: 'Your data has been saved',
                        showConfirmButton: false,
                        timer: 3000
                    }
                ).then(() =>
                window.location.href = '/master/supplier'
            )
            }
        }catch(error){
            let errors = error.response.data.data 
            if( errors.length > 0){

                let required = errors.map((e)=> {return JSON.stringify(e.Message)}).join(',')
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
