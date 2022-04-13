import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/user.service';

const UserList = () => {

  const [users, setUsers] = useState([]);

  const init = () => {
    userService.getAll()
      .then(response => {
        console.log('Printing users data', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log('Printing id', id);
    userService.remove(id)
      .then(response => {
        console.log('user deleted successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }


  return (
    
    <div className="container" style={{marginTop:"90px"}}>
    
      <hr/>
      

      <div>
      <h2>List of Users</h2>
      
        <table className="table table-hover" style={{marginTop:"40px"}}>
       
          <thead className="thead-dark">
            
            <tr>
              <th>ID</th>
              <th>College_id</th>
              <th>Address</th>
              <th>Birth Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Fine</th>
              <th>Actions</th>
            </tr>
          </thead>
         
          <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.collegeId}</td>
                <td>{user.address}</td>
                <td>{user.dob}</td>
                <td>{user.first_name}</td>
                <td>{user.lastName}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
                <td>{user.fine}</td>
                <td>
                  <Link className="button_update" to={`users/edit/${user.id}`}>Update</Link>
                  
                  <button className="button_del" onClick={() => {
                    handleDelete(user.id);
                  }}>Delete</button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <Link to="/AddUser" className="btn btn-primary mb-2">Add User</Link>
      </div>
    </div>
    
  );
        }

export default UserList;