import React, { ChangeEvent, FC, useContext, useState } from 'react'
import { AuthContext} from '../tool/Context'
import { IMessage } from '../types/IMessage'
import '../App.css'
import { useHttp } from '../hooks/http.hook'

type Props = {
  onChange: (mes: IMessage) => void,
  activeId: string
}

const InputArea: FC<Props> = ( {onChange, activeId} ) => {
  const {userAuth} = useContext(AuthContext)
  const {loading, request} = useHttp()
  const [value, setValue] = useState<string>()
  
  const newMessage = async () => {
    if (!value) return
    const mes = {
      _id: '', 
      senderIdUser: userAuth.userId, 
      recipientIdUser: activeId, 
      date: new Date, 
      text: value
    }
    onChange(mes)
    await request('api/messages/sendMess', 'POST', {...mes} )
    setValue('')
  } 

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  
  return (
    <div className="wrapperInput">
      <textarea 
        placeholder="Enter text..." 
        value={value} 
        onChange={handleChange}
      />
      <button 
        className="button-17"
        onClick={newMessage}
        disabled={loading}
        >
        Send
      </button>
    </div>
  );
}

export default InputArea;
