import { SetDashboard } from "../../actions/master/dashboard/DashboardAction"

const initialState = {
   top5 : []
    
}

const Dashboard = (state = initialState, action) => {
    switch (action.type) {
        case SetDashboard:
            return {
                ...state,
                [action.target]: action.payload.data,
            }
        default:
            return state
    }
}


export default Dashboard