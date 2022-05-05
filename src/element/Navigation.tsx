import React, { useContext } from 'react'
import { AuthContext } from '../tool/Context'
import User from './User'

export const Navigation = () => {
    const {logout, userAuth} = useContext(AuthContext)
    return (
    <div className="navigationWrapper">
        {userAuth.userId ?
            <>
            <div className="profilLogo">
                <User
                    icon={userAuth.userIcon}
                    name={userAuth.userName}
                />  
            </div>
            <div className="navigationText">
                <div className="navigationButton">Page</div>
                <div className="navigationButton"
                    onClick={logout}
                >
                    Exit
                </div>
            </div>
            </>    
            : ''
        }
    </div>
    )
}