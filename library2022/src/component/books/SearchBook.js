import { React, useState,useEffect } from "react";
import { Link ,useHistory,useParams} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import bookService from "../../services/book.service";

//  let title = "";
// let author = "";

function SearchBook() {
let Searchbook="";
    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    let [books, setBooks] = useState([]);
    const history = useHistory();
    const {id} = useParams();


const SearchByTitle= (books) => {

  console.log(title)
  bookService.bookByTitle(title)
    .then(response => {
      Searchbook=response;
      console.log('user data updated successfully', response.data);
      setBooks(response.data);
     

  })
  .catch(error => {
      console.log('Something went wrong', error);
  })
}
const SearchByAuthor=(books)=>{
  console.log(author);
  bookService.bookByAuthor(author)
    .then(response => {
      
      console.log('user data updated successfully', response.data);
      setBooks(response.data);
      console.log(books)
     

  })
  .catch(error => {
      console.log('Something went wrong', error);
  })
}
const clearBook=()=>{
  console.log(books)
  setBooks([]);
  console.log(books)
}
useEffect(() => {
  if (id) {
    bookService.get(id)
          .then(books => {
          // id,first_name,middle_name,last_name,gender,address,mobile,dept,dob,join_date,yr_experience,salary,bonus
            
            setTitle(books.data.title);
            setAuthor(books.data.author);


          })
          .catch(error => {
              console.log('Something went wrong', error);
          })
  }
}, [])
const cancelAddUser=(event)=>{
event.defaultPrevented();
}
  
    
      return (
        <div className="container"  >
          <div className="row searchBox" style={{marginTop:"80px"}}>
            <div className="col-4">
                  <h3>Search Book</h3> 
                
                  <div style={{marginTop:"80px"}} >
                  <div>
                      <h3>search book by author name</h3>
                  <div>
                  <input id="author" name="bookAuthor" value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder="enter Author name"></input>
                  <button type="button" className="btn btn-outline-warning" onClick={(e) => SearchByAuthor(e.target.value)}>search</button>
                  </div>
                
                  <br>
                  </br>
                  <br>
                  </br>
                  <br>
                  </br>
                  <h3>search book by Title</h3>
                      <div>
                  <input id="title" name="bookAuthor" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="enter book title"></input>
                  <button type="button" className="btn btn-outline-warning" onClick={(e) => SearchByTitle(e.target.value)}>search</button>
                  </div>
                  </div>
                  </div>
            </div>
            <div className="col-8">
                <table className="table table-bordered table-striped" style={{marginTop:"170px"}}>
                  <thead className="thead-dark">
                    <tr>
                          <th>Book Id</th>
                          <th>Book Title</th>
                          <th>noOfCopies Available</th>
                          <th>Author</th>
                          <th>Publisher</th>
                          <th>Langauge</th>
                          <th>Category/Owner of BookS</th>             
                                             
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
                            </tr>
                          ))
                  }
                  
                  </tbody>
                </table>      
                <button className="button_del" onClick={()=>clearBook()}>Clear</button>     
            </div>
          </div>
       </div>
      
      );
  
}

export default SearchBook;