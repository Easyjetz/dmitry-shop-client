import React from 'react'

type MessagePops = {
  success: boolean;
  message: string;
}


export const Message: React.FC<MessagePops> = ({ success, message }) => {
  return (
    <div className={`message ${success ? 'success' : 'error'}`}>{message}!</div>
  )
}

