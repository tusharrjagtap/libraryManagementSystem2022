import { Logout } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Container, Dropdown, DropdownButton, FormControl, InputGroup, Nav, NavDropdown } from "react-bootstrap";
import { NavLink,useHistory } from "react-router-dom";



const Navbar = () => {


  const history=useHistory();
  const handleLogout = (props) => {
    props.preventDefault();
    console.log("user data")
    console.log("-----Clearing the session------")
    localStorage.setItem("isLoggedIn",false);
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
    history.push("/login")
   

  }

  
  // Close the dropdown menu if the user clicks outside of it

  return (
    <>
   
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="primary" className="AppBar">
          <Toolbar>
            <Typography
              className="IACSD"
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
            >  
              <h3>
                {" "}
                <img
                  className="logo"
                  src="https://thumbs.dreamstime.com/b/open-book-profit-icons-above-close-up-hd-video-big-concept-221172255.jpg "
                />{" "}
                &nbsp;&nbsp;IACSD Library
              </h3>
              
            </Typography>
            <div class="navbar">
              <Button component={NavLink} to="/Contact">
                Contact
              </Button>
            
              <Button component={NavLink} to="/userlogin">
                  UserLogin
              </Button>
              <Button component={NavLink} to="/stafflogin">
                   StaffLogin
              </Button>

              <div class="navbar">

                {( (localStorage.getItem("isLoggedIn"))) ? (
             
                  <button className="btn_login"
                    type="submit"
                    onClick={(props) => handleLogout(props)}
                  >
                    LOGOUT
                  </button>

              
                ) : (

                  <Button component={NavLink} to="/login">
                  AdminLogin
                  </Button>

                )}
                {/* <Button  component={NavLink} to="/logout" >
                  Logout
                </Button> */}
            </div>
         </div>
          </Toolbar>
          <Toolbar class="active">
            <Typography>
              <div class="navbar">
                <NavLink exact activeClassName="active_class" to="/">Home</NavLink>
                <NavLink exact activeClassName="active_class" to="/About">About Library</NavLink>
                <NavLink exact activeClassName="active_class" to="/Department">Department</NavLink>
                <NavLink exact activeClassName="active_class" to="/EBook">E-Book</NavLink>
                <NavLink exact activeClassName="active_class" to="/Service">Sevices</NavLink>
                <NavLink exact activeClassName="active_class" to="/SearchBook">Search Book</NavLink>
              </div>
              
            </Typography>
          </Toolbar>

        </AppBar>
      </Box>

                           

                   

      {/* style={({isActive}) => 
                { return { backgroundColor: isActive ? '#6d1b7b' : ''}}} sx={{color:'white' , textTransform:'none'}}  */}
    </>
  );
};
export default Navbar;
