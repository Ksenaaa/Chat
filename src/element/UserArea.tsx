import React, { useContext, useEffect} from 'react'
import {FriendsContext } from '../tool/Context';
import User from './User';
import '../App.css'

const UserArea = ({recipientActiveId, setRecipientActiveId }:any) => {
  const {friends} = useContext(FriendsContext)

  useEffect(()=> {
    setRecipientActiveId(friends[0]?.id)
  }, [friends])

  return (
    <div className="wrapperUser">
      <h2>Users:</h2>
          {friends?.map((friend:any) => 
            <div 
              onClick={() => setRecipientActiveId(friend?.id)}
              className={(recipientActiveId === friend?.id) ? "active" : ""}
              key={friend?.id}
            >
              <User 
                  icon={friend.icon}
                  name={friend.name}
              />
            </div>
          
          )}
    </div>
  );
}

export default UserArea;
