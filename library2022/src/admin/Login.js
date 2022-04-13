import React, { useEffect, useState } from "react";
import Validation from "../component/Validation";
import { Link, useHistory, useParams,Redirect } from "react-router-dom";
import adminService from '../services/admin.service';
import "./Login.css";
function Login() {

  //setting errors to empty object
  const [errors, setErrors] = useState({});
  //setting defalut values
 const [email, setEmail] = useState();
 const [password, setPassword] = useState();
 // const [id, setId] = useState();
  const history = useHistory();


  const [values, setValues] = useState({
    
    email: "",
    password: ""
  });
  //on typing values it will get stored here

  // const handleChange= (event) => {
  //   console.log("..............", event.target.value,event.target.email);
  //   setValues({
  //     ...values,
  //     [event.target.email]: event.target.value
  //   });
  // };

  //to avoid refreshment of page after clicking login
  const handleLogin = (props) => {
    props.preventDefault();

    //calling validation
    const admin = {email,password };
    setErrors(Validation(values));
    adminService.login(admin)
    .then(response => {
      //let admin=JSON.parse(localStorage.setItem(response));
      localStorage.setItem("admin",JSON.stringify(response))
      //sessionStorage.setItem("admin", JSON.stringify(response));
      console.log("from tushar",admin)
        console.log("admin logged successfully", response.data);
        console.log("Name", response.data.name);
        console.log("Email", response.data.email);
        localStorage.setItem('isLoggedIn',true);
        history.push("/welcome");
        setTimeout(() => {
            window.location.reload();
        }, 100);
        
      
     
        // if(response.data)
        // history.push("/Welcome");
    })
    .catch(error => {
        console.log('Login Failed', error);
      
          history.push("/login");
      
    })
  };


  return (
    <div className="back container fluid">
      <div
        class="lcontainer"
        style={{ marginTop: "250px", marginBottom: "100px" }}
      >
        <div class="brand-logo"></div>
        <div class="brand-title">Login To Your Account</div>
        <br />
        <div class="linputs">
          <label>EMAIL</label>    
             <input
              type="email"
              name="email"
              id="email"
              value={email}
              //onChange={handleChange}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@test.com"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          {/* <input type="email" placeholder="example@test.com" /> */}
          <label>PASSWORD</label>
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
            {errors.password && <p className="error">{errors.password}</p>}
          {/* <input type="password" placeholder="Min 6 charaters long" /> */}
          {/* <button type="submit">LOGIN</button> */}
          <br/>
          <button className="btn_login"
              type="submit"
              onClick={(props) => handleLogin(props)}
            >
              LOGIN
            </button>

            
        </div>
      </div>
    </div>
  );
}

export default Login;