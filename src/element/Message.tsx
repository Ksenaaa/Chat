import React, { FC } from 'react'
import '../App.css'

type MessageType = {
    date: string,
    text: string,
    icon?: string,
    name?: string,
}
const Message:FC<MessageType> = ({date, text, icon, name}) => {
    return (
        <div className="messageStyle">
            <img src={icon}  alt='' className="messageIconStyle"></img>
            <div className="messageTextAllStyle">
                <div className="messageTextStyle">
                    <div className="messageNameStyle">{name}</div>
                    <div className="messageDateStyle">{new Date(date).toLocaleDateString()}</div>
                    <div className="messageDateStyle">{new Date(date).toLocaleTimeString()}</div>
                </div>
                <div className="messageValueStyle">{text}</div>
            </div>
        </div>
    );
}

export default Message;
