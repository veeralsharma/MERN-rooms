import { Avatar } from '@material-ui/core'
import React from 'react'
import "../css/SidebarChat.css"
import { useStateValue } from '../context-api/StateProvider';
import { actionTypes } from '../context-api/reducer'

function SidebarChat({url,roomname,description,group_code}) {

    const [{user,group},dispatch] = useStateValue()

    const handleClick = (e) => {
        dispatch({
            type:actionTypes.SET_GROUP,
            group:{
                name:roomname,
                description:description,
                image:url,
                group_code:group_code
            }
        })
        console.log(url);
    }

    return (
        <div className="sidebarChat" onClick={handleClick}>
        <Avatar src={url} />
            <div className="sidebarChat_info">
                <h2>{roomname}</h2>
                <p>{description}</p>
            </div>           
        </div>
    )
}

export default SidebarChat
