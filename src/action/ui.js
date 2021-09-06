import { types } from "../types/types"


export const setError = (error)=>({
    type: types.setError,
    payload: error
})


export const removeError = () =>({
    type : types.removeError
})

export const startLoading = () =>({
    type: types.uiStartLoading,
    payload: true
})

export const finishLoading  = () =>({
    type: types.uiFinishLoading,
    payload: false
})