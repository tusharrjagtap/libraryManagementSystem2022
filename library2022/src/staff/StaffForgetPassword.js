import React, { useEffect, useState } from "react";
import Validation from "../component/Validation";
import { Link, useHistory, useParams,Redirect } from "react-router-dom";
import staffService from '../services/staff.service';
import "../admin/Login.css"

function StaffForgetPassword() {

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

    staffService.reset(user)
    .then(response => {
      //let admin=JSON.parse(localStorage.setItem(response));
      console.log(response);
      localStorage.setItem("user",JSON.stringify(response))
      //sessionStorage.setItem("admin", JSON.stringify(response));
      console.log("from tushar",user)
        console.log("user logged successfully", response.data);
        console.log("Name", response.data.name);
        console.log("Email", response.data.email);
        localStorage.setItem('isChanged',true);
        history.push("/StaffLogin");  
        // if(response.data)
        // history.push("/Welcome");
    })
    .catch(error => {
        console.log('Unable to change password', error);
      
          history.push("/staffforgetpassword");
      
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
           
            <Link to="/AddStaff"><span className="pass"> Register</span> </Link>

        </div>
      </div>
    </div>
  );
}

export default StaffForgetPassword;