import { combineReducers } from "redux";
import authReducer from "./authReducer";
import  currencyReducer  from "./currencyReducer";



const rootReducer = combineReducers({
    currencies : currencyReducer,
    authentication : authReducer,
})

export default rootReducer;