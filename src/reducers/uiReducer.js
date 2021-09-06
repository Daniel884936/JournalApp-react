import { types } from "../types/types";

const initialState = {
    loading : false,
    msgError: null
}
 

export const uiReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.setError:
            return{
                ...state,
                msgError: action.payload
            }                        
            
            case types.removeError:
            return{
                ...state,
                msgError: null
            }
            case types.uiFinishLoading:

            return{
                ...state,
                loading: action.payload
            }
            
            case types.uiStartLoading:
            return{
                ...state,
                loading: action.payload
            }
        default:
           return state;        
    }
}