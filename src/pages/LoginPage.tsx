import React, {useContext, useEffect, useState } from 'react'
import { RegistrationWindow } from '../element/RegistrationWindow';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../tool/Context';

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const [modalRegistration, setModalRegistration] = useState(false)
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

    const loginHandler = async () => {
        const data = await request('api/auth/login', 'POST', {...form} )
        auth.login(data.token, data.userId, data.userName, data.userIcon)
    }
    
    return (
    <>
    <RegistrationWindow 
        visible={modalRegistration}
        onClose={() => setModalRegistration(false)}
    />
    <div className="wrapperLogin">
       <h1>LOG IN or SIGN UP</h1> 
       <div className="formLogin">
           <h2>Username</h2>
           <input 
            type="text" 
            name="login" 
            placeholder="Enter login"
            onChange={changeHandler}
           />
       </div>
       <div className="formLogin">
           <h2>Password</h2>
           <input 
            type="password" 
            name="password" 
            placeholder="Enter password"
            onChange={changeHandler}
           />
       </div>
       <div className="buttonLoginWrapper">
        <button  
            className="buttonLogin"
            onClick={() => setModalRegistration(true)}
        >
            Regestration
        </button>
        <button  
            className="buttonLogin" 
            onClick={loginHandler}
            disabled={loading}
        >
            Login
        </button>
       </div>
    </div>
    </>
    )
}