
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddUser from './user/AddUser';
import Login from './admin/Login';
import StaffLogin from './staff/StaffLogin'
import UserLogin from './user/UserLogin'
import Logout from './admin/Logout';
import Welcome from './admin/Welcome';
import UserWelcome from './user/UserWelcome';
import StaffWelcome from './staff/StaffWelcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './component/list/UserList'
import StaffList from './component/list/StaffList';
import BookList from './component/list/BookList'
import AddStaff from './staff/AddStaff';
import About from './navComp/About';
import Service from './navComp/Service'
import RenewBook from './component/books/RenewBook'
import StaffForgetPassword from './staff/StaffForgetPassword';
import UserForgetPassword from './user/UserForgetPassword';
import AddBook from './component/books/AddBook';
import Header from './component/Header';
import Footer from "./component/Footer";
import Home from './component/Home';
import SearchBook from './component/books/SearchBook'
import "./App.css"
// import AdminLogin from './admin/AdminLogin'
import {Dropdown, DropdownButton, FormControl, InputGroup, Nav } from "react-bootstrap";
import Contact from './navComp/Contact';


function App() {
  return (
  
    <BrowserRouter>
      <Header/>
 
        <div className="container">
    
          <Switch>
            <Route exact  path="/" component={Home} />
            {/* <Route  path="/AdminLogin" component={AdminLogin} /> */}
            <Route  path="/Login" component={Login} />
            <Route  path="/Logout" component={Logout} />
            <Route  path="/Welcome" component={Welcome} />
            <Route  path="/UserWelcome" component={UserWelcome} />
            <Route  path="/StaffWelcome" component={StaffWelcome} />
            <Route  path="/UserList" component={UserList} />
            <Route path="/AddUser" component={AddUser} />
            <Route path="/AddBook" component={AddBook} />
            <Route  path="/BookList" component={BookList} />
            <Route path="/edit/:id" component={AddBook} />
            <Route path="/RenewBook" component={RenewBook} />
            <Route path="/Service" component={Service} />
            <Route path="/users/edit/:id" component={AddUser} />
            <Route  path="/UserLogin" component={UserLogin} />
            <Route  path="/UserForgetPassword" component={UserForgetPassword} />
            <Route  path="/StaffForgetPassword" component={StaffForgetPassword} />
            <Route  path="/StaffList" component={StaffList} />
            <Route  path="/StaffLogin" component={StaffLogin} />
            <Route path="/AddStaff" component={AddStaff} />
            <Route path="/staffs/edit/:id" component={AddStaff} />
            <Route  path="/SearchBook" component={SearchBook} />
            <Route  path="/About" component={About} />
            <Route  path="/Contact" component={Contact} />
            <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
          </Switch>
        </div>
        <Footer/>
      
    </BrowserRouter>
  );
}


export default App;
