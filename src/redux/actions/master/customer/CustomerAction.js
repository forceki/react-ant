import axios from "axios"
import Swal from "sweetalert2"
import apiService from "../../../../utils/apiService"

export const SetForm = "SetForm"

export const getListCustomer = (current, pagesize) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('master/customer', {
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

export const AddInputCustomer = (e, target) => {
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


export const PushAddCustomer = (e) => {
    return async (dispatch) => {
        const data =
        {
            custname: e.custname,
            custgroup: e.custgroup,
            id_card: e.id_card,
            gender: e.gender,
            birthdate: e.birthdate,
            phone: e.phone,
            email: e.email,
          
            notes: e.notes,
            province: e.province,
            city: e.city,
            country: e.country,
            postalcode: e.postalcode,
            address: e.address,
        
        }

        const resp = await apiService.apiPost('master/customer', data);
    }

}

