import apiService from "../../../../utils/apiService"
import dayjs from "dayjs"

export const SetDashboard = "SetDashboard"

export const getDashboard = (link, to, date) => {
    return async (dispatch) => {
        const response = await apiService.apiGet(link, {
            startDate: dayjs(date[0]).format('YYYY-MM-DD'),
            endDate:  dayjs(date[1]).format('YYYY-MM-DD')
        });
        const ListData = response.data.data

        dispatch({
            type: SetDashboard,
            payload: {
                data: ListData
            },
            target: to
        })
    }
}


