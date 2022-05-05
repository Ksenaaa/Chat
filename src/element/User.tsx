import React from 'react'
import '../App.css'

const User = ({icon, name}: any) => {
    return (
        <div className="iconWithUser">
            <img src={icon} alt='' className="icon"></img>
            <div>{name}</div>
        </div>
    );
}

export default User;
