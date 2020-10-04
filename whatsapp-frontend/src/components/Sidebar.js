import React from "react";
import "../css/Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/
                images?q=tbn%3AANd9GcS_Ap2vH4q2oChRKUAq8cwahQ6yi1hpqL5RXw&usqp=CAU"
        />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="search or start a new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat 
        url="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6xhytlrcUemgvBvuccp4E6FARuSkoMqkB1w&usqp=CAU"
        roomname="Health Support"
        lastmessage="beds empty at ...."
         />
        <SidebarChat 
        url="https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg"
        roomname="Food Support"
        lastmessage="Free Lunch facility in area ...."
         />
        <SidebarChat 
        url="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHfcrpjN7KPP_CGeaSRkrB1RTzCaz-8bGS6Q&usqp=CAU"
        roomname="Transportation Support"
        lastmessage="train to bihar with 100 seats will leave at ...."
         />
      </div>
    </div>
  );
}

export default Sidebar;
