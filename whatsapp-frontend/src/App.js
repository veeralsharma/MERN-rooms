import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from 'pusher-js'
import Api from './Api'

function App() {

  const [messages,setMessages] = useState([])

  useEffect(() => {
    Api.get('/messages/sync').then((res) => {
      setMessages(res.data)
    })
  },[])

  useEffect(() => {
    var pusher = new Pusher('8cadf13e057b0770bd69', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessages([...messages,data])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
    
  },[messages])

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
      <Sidebar />
      <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
