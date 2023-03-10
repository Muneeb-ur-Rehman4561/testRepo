import React, { Fragment, useState } from 'react'
import "./Header.css";
import {SpeedDial, SpeedDialAction} from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import DashboardIcon from "@material-ui/icons/Dashboard"
import {useNavigate} from 'react-router-dom';
import {useAlert} from 'react-alert';
import {useDispatch} from "react-redux";
import {logout} from "./../../../actions/userAction";



const UserOptions = ({user}) => {
  
  const dispatch = useDispatch();
  const alert = useAlert();
  const history= useNavigate();

  const [open, setOpen]= useState(false);
  const options = [
    {icon: <ListAltIcon/>, name: "Orders", func:orders},
    {icon: <PersonIcon/>, name: "Profile", func:account},
    {icon: <ExitToAppIcon/>, name: "Logout", func:logoutUser},
  ]

  if(user.role==="admin"){
    options.unshift({
        icon: <DashboardIcon/>, name: "Dashboard", func:dashboard
    })
  }

  function dashboard(){
    history("/dashboard");
  };
  function orders(){
    history("/orders");
  };
  function account(){
    history("/account");
  };
  function logoutUser(){
    dispatch(logout());
    alert.success("Logout successfully");
  }

  return (
  <Fragment>
      <SpeedDial className='speedDial'
      ariaLabel='SpeedDial tooltip example'
      onClose={()=> setOpen(false)}
      onOpen={()=> setOpen(true)}
      open={open}
      direction="down"
  icon={<img className='speedDialIcon' src={user.avatar.url? user.avatar.url:"/Profile.png"} alt="Profile"/>}>

{options.map((item)=>(
        <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
      ))}
      </SpeedDial>
  </Fragment>
  )
}

export default UserOptions