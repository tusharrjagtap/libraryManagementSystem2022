import React, { useEffect, useState } from "react";
import Validation from "../component/Validation";
import { Link, useHistory, useParams,Redirect } from "react-router-dom";
import userService from '../services/user.service';
import "../admin/Login.css"

function UserForgetPassword() {

  //setting errors to empty object
  const [errors, setErrors] = useState({});
  //setting defalut values
 const [email, setEmail] = useState();
 const [password, setPassword] = useState();
 const [newPassword, setNewPassword] = useState();
 // const [id, setId] = useState();
  const history = useHistory();


  const [values, setValues] = useState({
    
    email: "",
    password: "",
    newPassword:""
  });

  //to avoid refreshment of page after clicking login
  const handleLogin = (props) => {
    props.preventDefault();

    //calling validation
    const user = {email,password ,newPassword};

    userService.reset(user)
    .then(response => {
      //let admin=JSON.parse(localStorage.setItem(response));
      console.log(response);
      localStorage.setItem("user",JSON.stringify(response))
      //sessionStorage.setItem("admin", JSON.stringify(response));
      console.log("from tushar",user)
        console.log("user reset successfully?", response.data);
        localStorage.setItem('isChanged',response);
        if(response==true)
        history.push("/userLogin");
       else
       history.push("/");
        
      
     
        // if(response.data)
        // history.push("/Welcome");
    })
    .catch(error => {
        console.log('something went wrong', error);
      
          history.push("/userforgetpassword");
      
    })
  };


  return (
    <div className="back container fluid">
      <div
        class="lcontainer"
        style={{ marginTop: "250px", marginBottom: "100px" }}
      >
        <div class="brand-logo"></div>
        <div class="brand-title">Change your Password</div>
        <br />
        <div class="linputs">
          <label className="passs">EMAIL</label>    
             <input
              type="email"
              name="email"
              id="email"
              value={email}
              //onChange={handleChange}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@test.com"
            />
           
          <label className="passs">PASSWORD</label>
              <input
              type="password"
              name="password"
              id="password"
              // name="password"
              placeholder="Min 6 charaters long" 
              value={password}
              //onChange={handleChange}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="passs">New PASSWORD</label>
              <input
              type="password"
              name="password"
              id="newpassword"
              // name="password"
              placeholder="Min 6 charaters long" 
              value={newPassword}
              //onChange={handleChange}
              onChange={(e) => setNewPassword(e.target.value)}
            />

          <br/>
          <button className="btn_login"
              type="submit"
              onClick={(props) => handleLogin(props)}
            >
              Submit
            </button>
           
            <Link to="/AddUser"><span className="pass"> Register</span> </Link>

        </div>
      </div>
    </div>
  );
}

export default UserForgetPassword;