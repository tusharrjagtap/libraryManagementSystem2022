import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Carousel ,Card,Container} from "react-bootstrap";

export default function Service() {

  return (
    <div className="wcontainer">
      <div className="row searchBox" style={{marginTop:"80px"}}>
      
         <div className="list col-4" style={{marginTop:"120px"}}>


          </div>
          <div className="list col-4" style={{marginTop:"120px"}}>
              <div><h3><Link to="/SearchBook">Search Book</Link></h3></div>
              <div><h3><Link to="/AddUser">Register New Users</Link></h3></div>
              <div><h3><Link to="/AddStaff">Register New Staff</Link></h3></div>
              
              
              
          </div>
          
        
      </div>
    </div>
   
  );
}
