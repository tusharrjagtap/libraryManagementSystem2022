
// import {useState} from 'react';
import userService from "../../services/user.service";
// import "./RenewBook.css";
import { Link } from "react-router-dom";
// import React, { Component }  from 'react';
// import React from 'react';
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 
const RenewBook = () => {
 
    const [books, setBooks] = useState([]);
    const[user,setuser]=useState(JSON.parse(localStorage.getItem('user')))  ;
    const init = () => {
     
 
     userService.AllIssuedBookByUser()
        .then(response => {
           
          console.log('+++++++++Printing users data', response.data);
         
          setBooks(response.data);
             
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
 
    }
   
      const renew= (iid) => {
        console.log('Printing id',iid);
        userService.renewBook(iid)
          .then(response => {
            console.log('user renewed successfully', response.data);
           toast("renewed successfuly");
            init();
          })
          .catch(error => {
            if(user.fine!=null)
           toast.warning("you have to first pay fine");
            else
            toast.warning("this book is renewed more than 5 times ");
            console.log('Something went wrong', error);
          })
      }
      const returnB= (iid) => {
        console.log('Printing id',iid);
        userService.returnBook(iid)
          .then(response => {
            console.log('user returned successfully', response.data);
           toast("returned successfuly");
            init();
          })
          .catch(error => {
            if(user.fine!=null)
           toast.warning("you have to first pay fine");
            else
            
            console.log('Something went wrong', error);
          })
      }
      

      useEffect(() => {
        init();
      }, []);

      return (
        <>
        <div className="whole-page"  >
        <div className="container" style={{marginTop:"-90px"}}>
        <h3>Renew Book</h3> 
           <div>
             
                   
          <div>
          {/* id,aadhar,first_name,middle_name,last_name, address,email, mobile, password ,dept,join_date,yr_experience,salary */}
            <table className="table table-bordered table-striped" style={{marginTop:"170px"}}>
              <thead className="thead-dark">
                 
                <tr>
                   
                <th>Issue Id</th>  
                <th>Book Id</th>
                <th>User Id</th>
                <th>Issue Date</th>
                <th>Return Date</th>              
                 <th>Due Date</th>
                 <th>Renew Date</th>
                 <th>No.of times renewed</th>
                 
                 <th>Renew Book</th>
                 <th>Return Book</th>
                 {/* <th>reservation</th> */}
 
                </tr>
              </thead>
              <tbody>
              {
                //id,first_name,middle_name,last_name,gender,address,mobile,dept,dob,join_date,yr_experience,salary,bonus
                books.map(books => (
                  <tr key={books.iid}>
                      <td>{books.iid}</td>
                    <td>{books.book_id}</td>
                    <td>{books.user_id}</td>
                    <td>{books.issue_date}</td>
                    <td>{books.retrunDate}</td>
                    <td>{books.due_date}</td>
                    <td>{books.renewedAt}</td>
                    <td>{books.numOfTimesRenewed}</td>                  
                    <td><button type="submit" className="button_del"  onClick={()=>renew(books.iid)} >RenewBook</button></td>
                    <td><button type="submit" className="button_del"  onClick={()=>returnB(books.iid)} >Return Book</button></td>
                    {/* onClick={() => {handleUpdate(user.id);}} */}
                    </tr>
                ))
              }
              </tbody>
            </table>
            <div className="issuebtn">
            <Link to="/Welcome"> <button className="btn btn-primary">Back</button></Link>
       
             </div>
          </div>
        </div>
       </div>
       </div>
       <ToastContainer/>
       </>
      );
            }
 
export default RenewBook;        

