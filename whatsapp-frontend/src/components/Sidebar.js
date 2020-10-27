import React from "react";
import "../css/Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../context-api/StateProvider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

function Sidebar() {
  const [{ user, group, joined_groups }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout(){
    window.location.reload()
  }

  function JoinGroup(){
  }

  function CreateGroup(){
  }

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={JoinGroup}>Join Group</MenuItem>
            <MenuItem onClick={CreateGroup}>Create Group</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="search or start a new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        {joined_groups.map((grp) => {
          return (
            <SidebarChat
              url={grp.image_url}
              roomname={grp.group_name}
              description={grp.description}
              code={grp.group_code}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
