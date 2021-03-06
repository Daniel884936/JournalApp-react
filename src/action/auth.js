import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import {noteLogout} from './notes'

export const login = (uid, name) =>({
    type: types.login,
    payload: {
        uid,
        name
    }
});



export const startloginEmailPassword  = (email, password) =>{    
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
                 dispatch(finishLoading())
    })
    .catch(error =>{        
        
        Swal.fire('Error', error.message, 'error')
        dispatch(finishLoading())
    })
}
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{        
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(({user}) =>{
            dispatch(login(user.uid, user.displayName))            
        })
        .catch(error =>{                   
            Swal.fire('Error', error.message, 'error') 
            dispatch(finishLoading())
        })
    }
}


export const startRegisterWithEmailPasswordName = (email,password, name)=>{
    return (dispatch) =>{
        dispatch(startLoading())
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async ({user}) =>{
            await user.updateProfile({
                displayName: name
            });
            dispatch(login(user.uid , user.displayName));
            dispatch(finishLoading())
        })
        .catch(e => {
            console.log(e)
            Swal.fire('Error', e.message, 'error')
            dispatch(finishLoading())
        })
    }
}

export const startLogout  = ()=>{
    return async (dispatch)=>{
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(noteLogout())
    }
}

export const logout  = ()=>({
    type : types.logout
})