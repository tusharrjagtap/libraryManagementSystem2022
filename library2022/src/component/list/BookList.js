import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import bookService from "../../services/book.service";
import userService from '../../services/user.service';

const BookList = () => {
  // let userRole = "";
  // userRole = JSON.parse(localStorage.getItem('user')).data.role;

  const [books, setBooks] = useState([]);
  
  
  const init = () => {
    //console.log(userRole);
    bookService.getAll()
      .then(response => {
        console.log('Printing users data', response.data);
        setBooks(response.data);
      })
      .catch(error => {
        alert("error");
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);


  const issueBook = (bid) => {
    let userId = JSON.parse(localStorage.getItem('user')).data.userID;
    console.log('Printing id',bid,JSON.parse(localStorage.getItem('user')).data);
    userService.issueBookByUser(userId,bid)
      .then(response => {
        console.log('book issued successfully', response.data);
        alert("📖 book issued successfully 📖 ");
        init();
      })
      .catch(error => {
       
        console.log('Something went wrong', error);
      })
  }


  return (
    
    <div className="container" style={{marginTop:"120px"}}>
    
      <hr/>
      

      <div>
      <h2>List of Books</h2>
      
        <table className="table table-bordered table-striped" style={{marginTop:"40px"}}>
       
          <thead className="thead-dark">
           
            <tr>
              <th>Book Id</th>
              <th>Book Title</th>
              <th>noOfCopies Available</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Langauge</th>
              <th>Category/Owner of BookS</th>             
              <th>createdAt</th>
              {/* <th>updatedAt</th> */}
              {/* <th>Actions</th> */}
              <th>Issue Book</th>

            </tr>
          </thead>
         
          <tbody>
          {
            books.map(book => (
               //title,noOfCopies,author, publisher,language, category ,createdAt,updatedAt
              <tr key={book.bid}>
                <td>{book.bid}</td>
                <td>{book.title}</td>
                <td>{book.noOfCopies}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.language}</td>
                <td>{book.category}</td>
                <td>{book.createdAt}</td>
                {/* <td>{book.updatedAt}</td> */}
              
                {/* <td>
                <Link className="button_update" to={`/edit/${book.bid}`}>Update</Link>
                </td> */}
                <td>
                {/* {((userRole === "STUDENT")) ? (
                  <button className="button_del" onClick={()=>issueBook(book.bid)}>Issue</button>
                ) : (

                  {userRole}
                )} */}
                 <button className="button_update" onClick={()=>issueBook(book.bid)}>Issue</button> 
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <Link to="/AddBook" className="btn btn-primary mb-2">Add Book</Link>
      </div>
    </div>

    
  );
        }

export default BookList;