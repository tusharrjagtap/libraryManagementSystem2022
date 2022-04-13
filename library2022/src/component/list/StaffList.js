import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import staffService from '../../services/staff.service';

const StaffList = () => {

  const [staffs, setStaffs] = useState([]);

  const init = () => {
    staffService.getAll()
      .then(response => {
        console.log('Printing users data', response.data);
        setStaffs(response.data);
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
    staffService.remove(id)
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
      {/* id,aadhar,first_name,middle_name,last_name, address,email, mobile, password ,dept,join_date,yr_experience,salary */}
      
      <h2>List of Staff</h2>  
      <table className="table table-bordered table-striped" style={{marginTop:"40px"}}>
          <thead className="thead-dark">
         
            <tr>
                
            <th>First Name</th>  
              
              <th>Middle Name</th>
              <th>Last Name</th> 
              <th>Gender</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Department</th>
              
              <th>Date of Birth</th>
              
              <th>Join Date</th>
              <th>Year Of Experience</th>
              <th>Salary</th>
              <th>Bonus</th>
              <th>leaving_date</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            //id,first_name,middle_name,last_name,gender,address,mobile,dept,dob,join_date,yr_experience,salary,bonus
            staffs.map(staff => (
              <tr key={staff.id}>
                <td>{staff.first_name}</td>
                <td>{staff.middle_name}</td>
                <td>{staff.last_name}</td>
                <td>{staff.gender}</td>
                <td>{staff.address}</td>
                <td>{staff.mobile}</td>
                <td>{staff.dept}</td>
                
                <td>{staff.dob}</td>
                
                <td>{staff.join_date}</td>
                <td>{staff.yr_experience}</td>
                <td>{staff.salary}</td>
                <td>{staff.bonus}</td>
                <td>{staff.leaving_date}</td>
                <td>
                <Link className="button_update" to={`staffs/edit/${staff.id}`}>Update</Link>
                  
                  <button className="button_del" onClick={() => {
                    handleDelete(staff.id);
                  }}>Delete</button>
                </td>
                
              </tr>
            ))
          }
          </tbody>
        </table>
        <Link to="/AddStaff" className="btn btn-primary mb-2">Add Staff</Link>
      </div>
    </div>
    
  );
        }

export default StaffList;