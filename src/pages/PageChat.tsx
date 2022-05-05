import React, { useContext, useState, useEffect } from 'react'

import { AuthContext, FriendsContext } from '../tool/Context';
import { IMessage } from '../types/IMessage'
import InputArea from '../element/InputArea'
import OutputArea from '../element/OutputArea'
import UserArea from '../element/UserArea'
import { useHttp } from '../hooks/http.hook';
import '../App.css'

export const PageChat = () => {
    const [friends, setFriends] = useState([])
    const [saveMesById, setSaveMesById] = useState<IMessage[]>([])
    const [recipientActiveId, setRecipientActiveId] = useState('')
    const { userAuth } = useContext(AuthContext)
    const {request} = useHttp()

    const getFriends = async () => {
        const result = await request(`api/auth/friends/${userAuth.userId}`)
        setFriends(result)
    }
    useEffect(() => {
        getFriends()
    }, [userAuth.userId])
    

    const getMessages = async () => {
        const data = await request(`api/messages/messages/${userAuth.userId}/${recipientActiveId}`)
        setSaveMesById(data)
    }
    useEffect(() => {
        recipientActiveId && getMessages()
    }, [recipientActiveId])

    const onSave = (message: IMessage) => 
        setSaveMesById(prevSaveMesById => [...prevSaveMesById, message])

    return (
        <FriendsContext.Provider value={{friends}}>
            <div className="chatWrapper">
                <div className="wrapperArea">
                    <UserArea recipientActiveId={recipientActiveId} 
                              setRecipientActiveId={setRecipientActiveId} 
                    />
                    <div>
                        <OutputArea messages={saveMesById} recipActiveId={recipientActiveId}/>
                        <InputArea 
                            onChange={(mes) => onSave(mes)} 
                            activeId={recipientActiveId} 
                        />
                    </div>
                </div>
            </div>
        </FriendsContext.Provider>
    )
}