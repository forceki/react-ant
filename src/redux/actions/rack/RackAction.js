import axios from "axios"
import Swal from "sweetalert2"
import { cvtelp } from "../../../helpers"
import apiService from "../../../utils/apiService"

export const SetRack = "SetRack"

export const getListRack = (e) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('inventory/rack', {
            limit: 10,
            page: 1,
            warehouse_id: e
        });
        const ListData = response.data.data
        for(let i = 0; i < ListData.length ; i++){
            ListData[i].key = i
        }

        dispatch({
            type: SetRack,
            payload: {
                data: ListData
            },
            target: 'list'
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
            type: SetRack,
            payload: {
                data: dataWarehouse
            },
            target: 'warehouse_api'
        })
    }
}

export const AddInputRack = (e, target) => {
    return (dispatch) => {
        dispatch({
            type: SetRack,
            payload: {
                data: e
            },
            target: target
        })
    }
}

export const PushRack = (e) => {
    return async (dispatch) => {
        const data =
        {
            "rack_area": e.rack_area,
            "rack_name": e.rack_name,
            "warehouse_id": e.warehouse.id,
            "warehouse_code": e.warehouse.code,
            "warehouse_name": e.warehouse.name,
            "warehouse_type": e.warehouse.type,
            "description": e.description,
        }

        const resp = await apiService.apiPost('inventory/rack', data);

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

