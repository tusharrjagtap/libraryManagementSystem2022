import { useEffect, useState } from 'react';
import { Link ,useHistory,useParams} from 'react-router-dom';
import bookService from "../../services/book.service";



function AddBook() {
  const [book,setBook] = useState([]);
  const[title, setTitle] = useState('');
  const[noOfCopies, setNoOfCopies ]= useState('');
  const[author, setAuthor] = useState('');
  const[publisher,setPublisher] = useState('');
  const[language,  setLanguage] = useState('');
  const[category,  setCategory] = useState('');
  const history = useHistory();
    const {id} = useParams();

    const saveBook = (e) => {
        e.preventDefault();

        const book = {id,title,noOfCopies,author, publisher,language, category };
        if (id) {
            //update
            bookService.update(book)
                .then(response => {
                    console.log('user data updated successfully', response.data);
                    history.push("/BookList");
                })
                .catch(error => {
                    console.log('Something went wrong', error);

                    history.goBack();
                }) 
        } else {
            //create
          
            bookService.create(book)
            .then(response => {
                console.log("user added successfully", response.data);
                history.push("/BookList");
            })
            .catch(error => {
                console.log('something went wroing', error);
            })
        }
    }

//title,noOfCopies,author, publisher,language, category
      useEffect(() => {
      if (id) {
        bookService.get(id)
              .then(book => {
                    setTitle(book.data.title);
                    setNoOfCopies(book.data.noOfCopies);
                    setAuthor(book.data.author);
                    setPublisher(book.data.publisher);
                    setLanguage(book.data.language);
                    setCategory(book.data.category);
                 
              })
              .catch(error => {
                  console.log('Something went wrong', error);
                  history.goBack();
              })
      }
  }, [])
    const cancelAddUser=(event)=>{
    event.defaultPrevented();
  }
    return(
      <div className="container">
         
          <div className='app-wrapper'>
              <div>
              <h2 className='title'> Add Book</h2>
              </div>
              <form className='form-wrapper'>

              <div className='name'>
                <label className='label'>Book Name</label>
                <input type="text"
                id="title"
                className='input' 
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Book name" required/>

              </div>
              <div className='name'>
                <label className='label'>Quantity of Books</label>
                <input type="text"
                id="noOfCopies"
                className='input' 
                name='noOfCopies'
                value={noOfCopies}
                onChange={(e) => setNoOfCopies(e.target.value)}
                placeholder="Enter Quantity"/>
              </div>
                
              <div className='name'>
                <label className='label'>Author Name</label>
                <input type="text"
                id="author"
                className='input'
                name='author' 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author" required/>

              </div>
              <div className='name'>
                <label className='label'>Enter Publication Name</label>
                <input type="text"
                id="publisher"
                className='input'
                name='publisher' 
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Publisher Name"/>

              </div>
               
              <div className='name'>
                <label className='label'>Book Language</label>
                <input type="text"  
                id="language" 
                className='input' 
                name='language' 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Enter book language"/>
              </div>
              <div className='date'>
                <label className='label'>Book Owner/Category</label>
                <input type="text"  
                id="category" 
                className='input' 
                name='category' 
                value={category}
                placeholder="Category(LIBRARY/DONATED/SHARED)"
                onChange={(e) => setCategory(e.target.value)} required/>
                
              </div>


              <div>
                <button onClick={(e) => saveBook(e)} className="submit" type="submit">Add/Update Book</button>
                {/* <button type='button' className='cancel' onClick={cancelAddUser} > Back</button> */}
                <br/>
                <Link to="/BookList">Back to List</Link>
              </div>


              </form>
           </div>
    </div>   
    
   )
}

export default AddBook;
             
      