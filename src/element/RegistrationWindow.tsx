import React, { FC, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

type ModalWindow = {
    visible: boolean,
    onClose: () => void
}

export const RegistrationWindow:FC<ModalWindow> = ({visible, onClose}) => {
    const [form, setForm] = useState({login: '', password: ''})
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    
    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form} )
            message(data.message)
        } catch (e) {}
    }
    
    return (
        <>
        {visible &&  
        <div className="wrapperRegistration">
            <h2>Registration:</h2>
            <div className="wrapperFormLogin">
                <div className="formLogin">
                    <h2>Login</h2>
                    <input 
                        type="text" 
                        name="login" 
                        onChange={changeHandler} 
                    />
                </div>
                <div className="formLogin">
                    <h2>Password</h2>
                    <input 
                        type="password" 
                        name="password"  
                        onChange={changeHandler} 
                    />
                </div>
                <div className="formLogin">
                    <h2>Repeat password</h2>
                    <input 
                        type="password" 
                        name="checkPassword"  
                        onChange={changeHandler} 
                    />
                </div>
            </div>
            <div className="wrapperCloseWindow" onClick={onClose}>
                <img src="https://cdn-icons-png.flaticon.com/512/51/51517.png"  alt=''/>
            </div>
            <button 
                className="buttonLogin" 
                onClick={registrationHandler}
                disabled={loading}
            >
                Register
            </button>
        </div>
        }
        </>
    )
}