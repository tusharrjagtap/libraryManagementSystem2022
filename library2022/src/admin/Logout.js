
import "./Login.css";
import React, { Component } from 'react';
import { NavLink,useHistory } from "react-router-dom";

function Logout() {
   
      
//let user=JSON.parse(localStorage.setItem());
const history=useHistory();
// function logout(){
 
// }
const handleLogout = (props) => {
    props.preventDefault();
    console.log("user data")
    console.log("-----Clearing the session------")
    localStorage.setItem("isLoggedIn",false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
    history.push("/login");
    

    //window.location.reload();
  //   window.localStorage.removeItem("isLoggedIn");
  //  let isLoggedIn= window.localStorage.clear()
  //   if(window.localStorage.clear()==false){
  //     console.log("in iffff......")
  //     history.push("/login") ;
  //   }
   
  //   else{
  //       console.log("logout Failed")
  //       history.push("/logout") 
  //   }
   

//     localStorage.setItem('isLoggedIn',false)
//     if(isLoggedIn==false)
//     props.history.push("/");
 }

return (
   
   <div>  
       <h3>are you sure want log out</h3>
       <button className="btn_login"
              type="submit"
              onClick={(props) => handleLogout(props)}
            >
              LOGOUT
            </button>
    </div>
  );
 }

 export default Logout;