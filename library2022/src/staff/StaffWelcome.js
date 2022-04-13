import React, { useState } from "react";
import "../admin/Welcome.css";
import { Link } from "react-router-dom";
import { Carousel ,Card,Container} from "react-bootstrap";

export default function Welcome() {
  const [index, setIndex] = useState(0);
let user=JSON.parse(localStorage.getItem("admin")).data
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
   
      
      <div className="container">
          <div className="row searchBox" style={{marginTop:"80px"}}>
            <div className="col-4">
          <Container className="text-white">
        <Card className={'border border-dark bg-dark text-white'}>
          <Card.Header>Profile</Card.Header>
          <Card.Body>
            <h4>Personal Information</h4>
            <div>Name : {user.name}</div>
            <div>Email : {user.email}</div>
            <div>Role : {user.role}</div>
          </Card.Body>
        </Card>
        </Container>
        </div>
        
        
        <div className="list col-4" style={{marginTop:"325px"}}>
       
                <h4><Link to="/UserList" className="btn btn-primary mb-2">user list</Link></h4>
                <h4><Link to="/BookList" className="btn btn-primary mb-2">See Available Books</Link></h4>
                <h4><Link to="/RenewBook" className="btn btn-primary mb-2">Renew/Return/issuedBookList</Link></h4>
         
          </div>
          <div className="list col-4" style={{marginTop:"325px"}}>
         
              <h4><Link to="/AddBook" className="btn btn-primary mb-2">AddBook</Link></h4>
              <h4><Link to="/AddUser" className="btn btn-primary mb-2">Add Users</Link></h4>
              <h4><Link className="btn btn-primary mb-2" to={`staffs/edit/${user.staffID}`}>Update</Link></h4>
              <h4><Link to="/SearchBook" className="btn btn-primary mb-2">Search Book</Link></h4>
          </div>
        
        
        </div>

    </div>
  );
}
