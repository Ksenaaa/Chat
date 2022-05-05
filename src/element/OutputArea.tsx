import React, { FC, useContext} from 'react'
import { IMessage } from '../types/IMessage'
import Message from './Message'
import '../App.css'
import { AuthContext, FriendsContext } from '../tool/Context'

type MessageProps = {
  messages: IMessage[],
  recipActiveId: string
}

const OutputArea:FC<MessageProps> = ({messages, recipActiveId}) => {
  const {userAuth} = useContext(AuthContext)
  const {friends} = useContext(FriendsContext)

  const sender = (message: IMessage) => { 
    if (message.senderIdUser === userAuth.userId) {
      return {
        icon: userAuth.userIcon,
        name: userAuth.userName,
      } 
    } else {
      return { ...friends.find(friend => friend.id === recipActiveId) }
    }
  }
  
  return (
    <div className="wrapperOutput">
      {messages?.map((message) =>
      <div className={(message.senderIdUser === userAuth.userId) ? "senderMessage" : ''}
           key={message._id} 
      > 
        <Message 
          {...message}
          {...sender(message)}
        />
      </div>
      )}
    </div>
  );
}

export default OutputArea;


