import React, { useState } from "react";
import "../css/Chat.css";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import { useStateValue } from '../context-api/StateProvider';
import Api from '../Api'

function Chat({messages}) {

  const [{user,group},dispatch] = useStateValue()

  const [input,setInput] = useState("")

  const sendMessage = async (e) => {
      e.preventDefault()
      await Api.post('/messages/new',{
        message:input,
        name:user.displayName,
        group:group.name,
        timestamp:new Date().toUTCString()
      })
      setInput("")
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={group.image} />
        <div className="chat_headerInfo">
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
      {messages.map((msg) => (
        <p className={`chat_message ${msg.name==user.displayName && "chat_reciever"}`}>
          <span className="chat_name">{msg.name}</span>
          {msg.message}
          <span className="chat_timestamp">{msg.timestamp}</span>
        </p>
      ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonOutlinedIcon />
        </IconButton>

        <form>
          <input value={input} onChange={(e) => setInput(e.target.value) } placeholder="type a message" type="text" />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
