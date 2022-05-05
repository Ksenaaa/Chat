import { useCallback, useEffect, useState } from "react"

const storageName = 'userData'

export const useAuth = () => {
     const [userAuth, setUserAuth] = useState({
        token: '',
        userId: '',
        userName: '',
        userIcon: ''
     })

     const login = useCallback( (jwtToken: any, id: any, login: any, icon:any) => {
         setUserAuth({
            token: jwtToken,
            userId: id,
            userName: login,
            userIcon: icon
         })
         localStorage.setItem(storageName, JSON.stringify({
            userId: id, 
            token: jwtToken, 
            userName: login,
            userIcon: icon
         }))
     },[])

     const logout = useCallback( () => {
        setUserAuth({
            token: '',
            userId: '',
            userName: '',
            userIcon: ''
        })
        localStorage.removeItem(storageName)
     },[])


     useEffect( () => {
         const data = JSON.parse(localStorage.getItem(storageName) as any)
         if(data && data.token) {
            login(data.token, data.userId, data.userName, data.userIcon)
         }
     }, [login])

     return {login, logout, userAuth}
}
