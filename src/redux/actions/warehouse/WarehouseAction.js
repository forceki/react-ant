import axios from "axios"
import Swal from "sweetalert2"
import { cvtelp } from "../../../helpers"
import apiService from "../../../utils/apiService"

export const SetWarehouse = "SetWarehouse"

export const getListWarehouse = (current, pagesize) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('inventory/warehouse', {
            limit: pagesize,
            page: current
        });
        const ListData = response.data.data
        for(let i = 0; i < ListData.length ; i++){
            ListData[i].key = i
        }

        dispatch({
            type: SetWarehouse,
            payload: {
                data: ListData
            },
            target: 'list'
        })
    }
}

export const AddInputWarehouse = (e, target) => {
    return (dispatch) => {
        dispatch({
            type: SetWarehouse,
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
            type: SetWarehouse,
            payload: {
                data: dataProvince
            },
            target: 'province_api'
        })
    }
}

export const getWarehouse = (e) => {
    return async (dispatch) => {
        const warehouse = await apiService.apiGet('inventory/warehouse', {
            status: 'select'
        });
        const dataWarehouse = warehouse.data.data

        dispatch({
            type: SetWarehouse,
            payload: {
                data: dataWarehouse
            },
            target: 'warehouse_api'
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
            type: SetWarehouse,
            payload: {
                data: dataCity
            },
            target: 'city_api'

        })
    }
}

export const PushWarehouse = (e) => {
    return async (dispatch) => {

        const data =
        {
            "warehouse_code": e.warehouse_code,
            "warehouse_name": e.warehouse_name,
            "warehouse_type": e.warehouse_type,
            "warehouse_reff": e.warehouse_reff,
            "address": e.address,
            "city": e.city,
            "province": e.province,
            "country": e.country,
            "phone" : await cvtelp(e.phone),
            "email" : e.email,
            "notes" : e.notes,
            "warehouse_status" : e.warehouse_status
        }

        const resp = await apiService.apiPost('inventory/warehouse', data);

        if (resp.data.status == 1) {
            Swal.fire(
                {
                    icon: 'success',
                    title: 'Your data has been saved',
                    showConfirmButton: false,
                    timer: 3000
                }
            )
        }
       
    }

}

export const PushEditBrand = (e) => {
    return async (dispatch) => {
        dispatch({
            type: SetProduct,
            payload: {
                data: true
            },
            target: 'loading'
        })
        const data =
        {
            // brand_code: e.brand_code,
            // brand_name: e.brand_name,
            // address: e.address,
            // city: e.city,
            // province: e.province,
            // postalcode: e.postalcode,
            // country: e.country,
            // phone1: e.phone1,
            // phone2: e.phone2,
            // fax: e.fax,
            // email: e.email,
            // contact_name: e.contact_name,
            // contact_phone1: e.contact_phone1,
            // contact_phone2: e.contact_phone2,
            // notes: e.notes,
            // brand_type: e.brand_type,
            // brand_status: e.brand_status
        }

        const config = {
            params: {
                brand_id: e.brand_id,
            }
        }

        const resp = await apiService.apiPut('master/brand', data, config);

        if (resp.data.status == 1) {
            Swal.fire(
                {
                    icon: 'success',
                    title: 'Your data has been saved',
                    showConfirmButton: false,
                    timer: 3000
                }
            )
        }
        dispatch({
            type: SetProduct,
            payload: {
                data: false
            },
            target: 'loading'
        })
    }

}

