import { Avatar } from '@material-ui/core'
import React from 'react'
import "../css/SidebarChat.css"

function SidebarChat({url,roomname,lastmessage}) {
    return (
        <div className="sidebarChat">
            <Avatar src={url} />
            <div className="sidebarChat_info">
                <h2>{roomname}</h2>
                <p>{lastmessage}</p>
            </div>
        </div>
    )
}

export default SidebarChat
