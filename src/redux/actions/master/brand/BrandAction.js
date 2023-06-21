import axios from "axios"
import Swal from "sweetalert2"
import { cvtelp } from "../../../../helpers"
import apiService from "../../../../utils/apiService"

export const SetForm = "SetForm"
// export const SetAddress = "SetAddress"

export const getListBrand = (current, pagesize) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('master/brand', {
            limit: pagesize,
            page: current
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

export const getDetailBrand = (id) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('master/brand/by', {
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

export const AddInputBrand = (e, target) => {
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
            type: SetForm,
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
            type: SetForm,
            payload: {
                data: dataCity
            },
            target: 'city_api'

        })
    }
}


export const PushAddBrand = (e) => {
    return async (dispatch) => {
        dispatch({
            type: SetForm,
            payload: {
                data: true
            },
            target: 'loading'
        })
        const data =
        {
            brand_code: e.brand_code,
            brand_name: e.brand_name,
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
            brand_type: e.brand_type,
            brand_status: e.brand_status
        }
    
        try{
            const resp = await apiService.apiPost('master/brand', data);
            if (resp.data.status == 1) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: 'Your data has been saved',
                        showConfirmButton: false,
                        timer: 3000
                    }
                ).then(() =>
                    window.location.href = '/master/brand'
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
        
        dispatch({
            type: SetForm,
            payload: {
                data: false
            },
            target: 'loading'
        })
    }

}

export const PushEditBrand = (e) => {
    return async (dispatch) => {
        dispatch({
            type: SetForm,
            payload: {
                data: true
            },
            target: 'loading'
        })
        const data =
        {
            brand_code: e.brand_code,
            brand_name: e.brand_name,
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
            brand_type: e.brand_type,
            brand_status: e.brand_status
        }

        const config = {
            params: {
                brand_id: e.brand_id,
            }
        }

        try{
            const resp = await apiService.apiPut('master/brand', data, config);

            if (resp.data.status == 1) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: 'Your data has been saved',
                        showConfirmButton: false,
                        timer: 3000
                    }
                ).then(() =>
                window.location.href = '/master/brand'
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
        
        dispatch({
            type: SetForm,
            payload: {
                data: false
            },
            target: 'loading'
        })
    }

}

