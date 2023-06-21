import axios from "axios"
import Swal from "sweetalert2"
import apiService from "../../../utils/apiService"

export const SetProduct = "SetProduct"
export const SetIndex = "SetIndex"

export const getListProduct = (current, pagesize) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('inventory/items/list', {
            limit: pagesize,
            page: current
        });
        const ListData = response.data.data
        for(let i = 0; i < ListData.length ; i++){
            ListData.data[i].key = i
        }

        dispatch({
            type: SetProduct,
            payload: {
                data: ListData
            },
            target: 'list'
        })
    }
}

export const getListFilterProduct = (filter, data) => {
    return async (dispatch) => {
        const response = await apiService.apiGet('inventory/items/list', {
            key: data,
            type: filter
        });
        const ListData = response.data.data
        for(let i = 0; i < ListData.length ; i++){
            ListData.data[i].key = i
        }

        dispatch({
            type: SetProduct,
            payload: {
                data: ListData
            },
            target: 'list'
        })
    }
}

export const AddInputProduct = (e, target) => {
    return (dispatch) => {
        dispatch({
            type: SetProduct,
            payload: {
                data: e
            },
            target: target
        })
    }
}
export const AddInputProductIndex = (e, target, main, i) => {
    return (dispatch) => {
        dispatch({
            type: SetIndex,
            payload: {
                data: e
            },
            target: target,
            main: main,
            index: i
        })
    }
}

export const getCategory = (e) => {
    return async (dispatch) => {
        const category = await apiService.apiGet('master/setting/category');
        const dataCategory = category.data.data

        dispatch({
            type: SetProduct,
            payload: {
                data: dataCategory
            },
            target: 'category_api'
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
            type: SetProduct,
            payload: {
                data: dataBrand
            },
            target: 'brand_api'
        })
    }
}

export const getColour = (e) => {
    return async (dispatch) => {

        const colour = await apiService.apiGet('master/setting/mastering', {
            type: 'COLOUR'
        })

        const dataColour = colour.data.data

        dispatch({
            type: SetProduct,
            payload: {
                data: dataColour
            },
            target: 'colour_api'

        })
    }
}


export const PushProduct = (e, table) => {
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
            "item_name" : e.product_name,
            "msku" : e.msku,
            "brand" : e.brand,
            "category" : e.category,
            "subcategory" : e.subcategory,
            "colour" : e.colour,
            "gender" : e.gender,
            "descriptions" : e.description,
            "cogs" : parseFloat(e.cogs),
            "retail_price" : parseFloat(e.retail_price),
            "notes" : e.notes,
            "images" : e.images,
            "item_detail" : table,
            "product_information" : {
                "season" : e.season,
                "design_type" :e.design_type,
                "fabric" : e.fabric,
                "fabric_colour" : e.fabric_colour,
                "finishing" : e.finishing,
                "collabs" : e.collabs,
                "sleeve_length" : e.sleeve_length,
                "motif" : e.motif
            },
            "delivery" : {
                "length" : parseFloat(e.length_item),
                "width" : parseFloat(e.width),
                "heigth" : parseFloat(e.heigth),
                "weight" : parseFloat(e.weight),
                "po" : e.po
            } 
        }

        try{
            const resp = await apiService.apiPost('inventory/items/add', data);
            if (resp.data.status == 1) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: 'Your data has been saved',
                        showConfirmButton: false,
                        timer: 3000
                    }
                ).then(() =>
                    window.location.href = '/product'
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
            type: SetProduct,
            payload: {
                data: false
            },
            target: 'loading'
        })
    }

}


