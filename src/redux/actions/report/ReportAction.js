import apiService from "../../../utils/apiService"
import dayjs from 'dayjs';
import queryString from "query-string";
import axios from "axios";

export const SetReport = "SetReport"
export const SetNull = "SetNull"


export const getReport = (e, date, query, current, pagesize) => {
    const route = [{
        name: 'sales',
        route: 'master-product'
    }, { name: 'transaction', route: 'transaction' }]

    const date1 = dayjs(date[0]).format('YYYY-MM-DD')
    const date2 = dayjs(date[1]).format('YYYY-MM-DD')

    const active = route.find(o => o.name == e)

    return async (dispatch) => {

        if (Object.keys(query).length > 0) {
            const response = await apiService.apiGet('report/' + active.route, {
                startDate: dayjs(query.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(query.endDate).format('YYYY-MM-DD'),
                limit: pagesize ? pagesize : query.pagesize,
                page: current ? current : query.current
            });

            const ListData = response.data.data ? response.data.data : []
            
            if (ListData.data) {
                for (let i = 0; i < ListData.data.length; i++) {
                    ListData.data[i].key = i
               
                }
            }

            console.log(ListData)

            dispatch({
                type: SetReport,
                payload: {
                    data: ListData
                },
                target: 'list'
            })


        } else {
            const response = await apiService.apiGet('report/' + active.route, {
                startDate: date1,
                endDate: date2,
                limit: pagesize,
                page: current
            });

            const ListData = response.data.data ? response.data.data : []

            if (ListData.data) {
                for (let i = 0; i < ListData.data.length; i++) {
                    ListData.data[i].key = i
                }
            }
            dispatch({
                type: SetReport,
                payload: {
                    data: ListData
                },
                target: 'list'
            })

        }

        let search = []

        // if(Object.keys(query).length > 0){
        search.push({
            'startDate': date1,
            'endDate': date2,
            'current': current ? current : 1,
            'pagesize': pagesize ? pagesize : 10
        })

        // }

        return search

        // location.search = search


    }
}

export const ReportNull = () => {
    return async (dispatch) => {
        dispatch({
            type: SetNull,
            target: 'list'
        })

    }
}

export const  ReportExport = (url, date, col) => {
    let name = col.find(e => e.report == url)
    let datenow = dayjs().format('YYYY-MM-DD')
    const date1 = dayjs(date[0]).format('YYYY-MM-DD')
    const date2 = dayjs(date[1]).format('YYYY-MM-DD')

    axios({

        url: import.meta.env.VITE_API_URL+url,
  
        method: 'GET',
        params: {
            'startDate': date1,
            'endDate': date2,
        },
        responseType: 'blob',
    
    }).then((response) => {
    
         var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    
         var fileLink = document.createElement('a');
    
      
    
         fileLink.href = fileURL;
    
         fileLink.setAttribute('download', name.name+'_'+datenow+'.xlsx');
    
         document.body.appendChild(fileLink);
    
       
    
         fileLink.click();
    
    });
    // return async (dispatch) => {
    //     dispatch({
    //         type: SetNull,
    //         target: 'list'
    //     })

    // }
}





