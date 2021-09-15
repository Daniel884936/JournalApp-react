import React from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import {removeError, setError} from '../../action/ui'
import { startRegisterWithEmailPasswordName } from '../../action/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

     const {msgError} = useSelector(state => state.ui)
     

    const [formValues,handleInputChange] = useForm({
        'name':'',
        'email':'',
        'password': '',
        'password2':''
    });

    const {name, email ,password,password2} = formValues;

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isFormValid()){
            //console.log(formValues)
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = ()=>{
        if(name.trim().length ===  0){            
            console.log('Is requiered')
            dispatch(setError(
                 'Is requiered'
            ))
            return false;
        }
        else if(!validator.isEmail(email)){
            dispatch(setError(
                 'Invalid email'
            ))            
            return false;
        }
        else if(password !== password2 || password.length < 5){
            dispatch(setError(
                 'Password should be at least 6 characters and match each other'
            ))              
            return false
        }

        dispatch(removeError())
        return true;
    }
    return (        
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                    onSubmit = {handleSubmit}
                    className = "animate__animated animate__fadeIn animate__faster"
                    
                    >
                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value = {name}
                    onChange = {handleInputChange}
                    className="auth__input"
                    autoComplete="off"
                />

                <input 
                    type="text"
                    placeholder="Email"
                    onChange = {handleInputChange}
                    value = {email}
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    onChange = {handleInputChange}
                    value = {password}
                    name="password"
                    className="auth__input"
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    onChange = {handleInputChange}
                    value = {password2}
                    name="password2"
                    className="auth__input"
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
