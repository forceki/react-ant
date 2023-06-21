import axios from "axios";
import { errorHandling } from "./errorHandling";

// // const envTemp = "https://dev-penjaminan.nexamedia.co.id/response/api"
// const envTemp = "http://localhost:8000/api"
// const loginPage = "https://dev-login.nexamedia.co.id/#/login?client_id=ad42033d8d065cef050a0cbf60414254"
 //@ts-ignore
const api = import.meta.env.VITE_API_URL
const header = {
    //@ts-ignore
    'Inventory' : localStorage.getItem('inventory')
}

const apiService = {
    apiGet: async (uri: string, params: any) => {
       
        try {
            let res = await axios.get(
                api + uri, {params: params, headers : header},
            )

            return res;            
        } catch (error) {
            errorHandling(error)
        }
    },
    apiPost: async (uri: string, body: any) => {
        try {
            let res = axios.post(
                api + uri, body, {headers : header}
            )

            return res;
                  
        } catch (error) {
           errorHandling(error)
        }
    },
    apiPut: async (uri: string, body: any, config: any = {}) => {
        config['headers'] = header
        try {
            let res = axios.put(
                api + uri, body, config
            )

            return res;      
        } catch (error) {
           errorHandling(error)
        }
    },
    apiDelete: async (uri: string, params: any) => {
        try {
            let res = axios.delete(
                api + uri, {params: params, headers: header}
            )

            return res;      
        } catch (error) {
           errorHandling(error)
        }
    },
}

export default apiService;