import axios from "axios"
import Swal from "sweetalert2"
import apiService from "../../../utils/apiService"

export const SetInbound = "SetInbound"

export const getListInbound = (current, pagesize) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('trans/invent/receive', {
            limit: pagesize,
            page: current
        });
        const ListData = response.data.data
        for (let i = 0; i < ListData.length; i++) {
            ListData[i].key = i
        }

        dispatch({
            type: SetInbound,
            payload: {
                data: ListData
            },
            target: 'list'
        })
    }
}

export const getDetailInbound = (id) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('trans/invent/receive/detail', {
            no_trans : id
        });
        const ListData = response.data.data
        for (let i = 0; i < ListData.length; i++) {
            ListData.Detail[i].key = i
        }

        dispatch({
            type: SetInbound,
            payload: {
                data: ListData
            },
            target: 'detail'
        })
    }
}

export const AddInputInbound = (e, target) => {
    return (dispatch) => {
        dispatch({
            type: SetInbound,
            payload: {
                data: e
            },
            target: target
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
            type: SetInbound,
            payload: {
                data: dataWarehouse
            },
            target: 'warehouse_api'
        })
    }
}

export const getBrand = (e) => {
    return async (dispatch) => {
        const brand = await apiService.apiGet('master/brand', {
            status: "select"
        });
        const dataBrand = brand.data.data

        dispatch({
            type: SetInbound,
            payload: {
                data: dataBrand
            },
            target: 'brand_api'
        })
    }
}

export const PushInbound = (e, table) => {
    return async (dispatch) => {
        dispatch({
            type: SetInbound,
            payload: {
                data: true
            },
            target: 'loading'
        })

        const data =
        {
            "warehouse_id": e.warehouse_id,
            "warehouse_code": e.warehouse_code,
            "warehouse_type": e.warehouse_type,
            "warehouse_name": e.warehouse_name,
            "brand_code": e.brand_code,
            "brand_name": e.brand_name,
            "date_trans": e.date_trans,
            "receive_no": e.receive_no,
            "notes": e.notes,
            "items": table
        }

        const resp = await apiService.apiPost('trans/invent/receive', data);

        if (resp.data.status == 1) {
            Swal.fire(
                {
                    icon: 'success',
                    title: 'Your data has been saved',
                    showConfirmButton: false,
                    timer: 3000
                }
            ).then(() =>
            window.location.href = '/product/Inbound'
        )
        }
        dispatch({
            type: SetInbound,
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
            type: SetInbound,
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
            type: SetInbound,
            payload: {
                data: false
            },
            target: 'loading'
        })
    }

}

