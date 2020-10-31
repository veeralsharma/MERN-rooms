
import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from 'pusher-js'
import Api from './Api'
import { useStateValue } from './context-api/StateProvider';
import Login from './components/Login';


function App() {

  const [{user,group,joined_groups},dispatch] = useStateValue()

  const [messages,setMessages] = useState([])

  useEffect(() => {
    Api.post('/messages/sync',{group:group.name}).then((res) => {
      setMessages(res.data)
    })
  },[group])

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

  return (
    <div className="app">
    {!user ? (<Login />) : (
      <div className="app_body">
      <Sidebar />
      <Chat messages={messages} />
      </div>
    )}
      
    </div>
  );
}

export default App;
