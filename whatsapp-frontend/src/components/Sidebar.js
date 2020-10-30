import React, { useState } from "react";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Api from "../Api";

function Sidebar() {
  const [{ user, group, joined_groups }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [joingroupopen, Setjoingroupopen] = useState(false);
  const [creategroupopen, Setcreategroupopen] = useState(false);
  const [joingroupcode,Setjoingroupcode]=useState("");
  const [groupcreatedetails, Setgroupcreatedetails] = useState({
    group_name: "",
    description: "",
    image_url: "",
    email: user.email,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    window.location.reload();
  }

  function JoinGroupOpen() {
    Setjoingroupopen(true);
    setAnchorEl(null);
  }

  function JoinGroupClose() {
    Setjoingroupopen(false);
    Setjoingroupcode("")
  }

  function groupcodeChange(e) {
    Setjoingroupcode(e.target.value);
  }

  function JoinGroup() {
    Api.post("/group/join",{group_code:joingroupcode,email:user.email}).then((res) =>{
      console.log(res.data);
      Setjoingroupopen(false);
      Setjoingroupcode("")
    })
  }

  function CreateGroupOpen() {
    Setcreategroupopen(true);
    setAnchorEl(null);
  }

  function CreateGroupClose() {
    Setcreategroupopen(false);
    Setgroupcreatedetails({
      group_name: "",
      description: "",
      image_url: "",
      email: user.email,
    });
  }

  function createDetailsChange(e) {
    Setgroupcreatedetails({
      ...groupcreatedetails,
      [e.target.name]: e.target.value,
    });
  }

  function CreateGroup() {
    Api.post("/group/new", { group_name:groupcreatedetails.group_name,description:groupcreatedetails.description,image_url:groupcreatedetails.image_url , email:groupcreatedetails.email}).then((res) => {
      console.log(res.data);
      Setcreategroupopen(false);
      Setgroupcreatedetails({
        group_name: "",
        description: "",
        image_url: "",
        email: user.email,
      });
    });
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
            <MenuItem onClick={JoinGroupOpen}>Join Group</MenuItem>
            <MenuItem onClick={CreateGroupOpen}>Create Group</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
          <Dialog
            open={joingroupopen}
            onClose={JoinGroupClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Enter the Group Code you want to join
            </DialogTitle>
            <DialogContent>
              <TextField id="standard-basic" name="joingroupcode" value={joingroupcode} onChange={groupcodeChange} label="Code here ......" />
            </DialogContent>
            <DialogActions>
              <Button onClick={JoinGroupClose} color="primary">
                Cancel
              </Button>
              <Button onClick={JoinGroup} color="primary" autoFocus>
                Join
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={creategroupopen}
            onClose={CreateGroupClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Enter the Group Code you want to join
            </DialogTitle>
            <DialogContent>
              <TextField
                id="standard-basic"
                name="group_name"
                style={{ marginRight: "20px" }}
                value={groupcreatedetails.group_name}
                onChange={createDetailsChange}
                label="Enter group name"
              />
              <TextField
                id="standard-basic"
                name="image_url"
                value={groupcreatedetails.image_url}
                onChange={createDetailsChange}
                label="provide image url"
              />
              <TextField
                id="standard-full-width"
                fullWidth
                name="description"
                value={groupcreatedetails.description}
                onChange={createDetailsChange}
                label="Enter description "
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={CreateGroupClose} color="primary">
                Cancel
              </Button>
              <Button onClick={CreateGroup} color="primary" autoFocus>
                Join
              </Button>
            </DialogActions>
          </Dialog>
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
              group_code={grp.group_code}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
