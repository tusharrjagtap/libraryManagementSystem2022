import React, { useState,useEffect } from 'react';
import classNames from 'classnames';
import { useRef } from 'react';
import bookService from '../../services/book.service';
import { useHistory,useParams } from 'react-router-dom';
import { Link } from "react-router-dom";



const FindBook = () => {
    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    const history = useHistory();
    
      return (
        <div className="whole-page"  >
        <div className="container" style={{marginTop:"80px"}}>
        <h3>Search Book</h3> 
           <div style={{marginTop:"80px"}} >
       <div>
           <h3>search book by author name</h3>
           <div>
      <input id="author" name="bookAuthor" onChange={(e)=>setAuthor(e.target.value)} placeholder="enter Author name"></input>
      <Link to={`/author/${author}`}><button type="button" className="btn btn-outline-warning" >search</button></Link>
      </div>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <h3>search book by Title</h3>
           <div>
      <input id="title" name="bookAuthor" onChange={(e)=>setTitle(e.target.value)} placeholder="enter book title"></input>
      <Link to={`/title/${title}`}><button type="button" className="btn btn-outline-warning" >search</button></Link>
      </div>
       </div>
       </div>
       </div>
       </div>
      
      );
}

export default FindBook