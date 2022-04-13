import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import userService from "../services/user.service";
import { toast, ToastContainer } from "react-toastify";
const AddUser = () => {
 
  const[first_name, setFName] = useState('');
  const[lastName, setLName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[collegeId, setCollegeId] = useState('');
  const[role, setRole] = useState('');
  const[dob, setBirthDate] = useState('');
  const[address, setAddress] = useState('');
  const[aadhar, setAadhar] = useState('');
  const[mobile, setMobile] = useState('');
  const history = useHistory();
    const {id} = useParams();

    const saveUser = (e) => {
        e.preventDefault();
        
        const user = {id,address,collegeId,dob, first_name,lastName, mobile, role,email,password,aadhar};
        if (id) {
            //update
            userService.update(user)
                .then(response => {
                    console.log('user data updated successfully', response.data);
                    toast("user registered  successfuly");
                    history.push('/AddUser');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            //create
            userService.create(user)
            .then(response => {
                console.log("user added successfully", response.data);
                toast("user registered  successfuly");
                history.goBack();
            })
            .catch(error => {
                console.log('something went wroing', error);
            })
        }
    }

//id,address,college_id,birth_date, fname,lname, mobile, role,email,password,aadhar
      useEffect(() => {
      if (id) {
        userService.get(id)
              .then(user => {
                setAddress(user.data.address);
                setCollegeId(user.data.collegeId);
                setBirthDate(user.data.dob);
                  setFName(user.data.first_name);
                  setLName(user.data.lastName);
                  setMobile(user.data.mobile);
                  setRole(user.data.role);
                  setEmail(user.data.email);
                  setPassword(user.data.password);
                  setAadhar(user.data.aadhar);
              })
              .catch(error => {
                  console.log('Something went wrong', error);
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
            <h2 className='title'> Register new User</h2>
          </div>
            <form className='form-wrapper'>
                  <div className='name'>
                       <label className='label'>First Name</label>
                         <input type="text"
                        id="first_name"
                         className='input' 
                         name='first_name'
                         value={first_name}
                         onChange={(e) => setFName(e.target.value)}
                         placeholder="Enter name"/>
                       
                  </div>
                  <div className='name'>
                      <label className='label'>Last Name</label>
                         <input type="text"
                        id="lastName"
                         className='input' 
                         name='lastName'
                         value={lastName}
                         onChange={(e) => setLName(e.target.value)}
                         placeholder="Enter last name"/>
                  </div>

                  <div className='name'>
                      <label className='label'>Enter college_id</label>
                        <input type="text"
                        id="collegeId"
                        className='input'
                        name='collegeId' 
                        value={collegeId}
                        onChange={(e) => setCollegeId(e.target.value)}
                        placeholder="Enter college Id"/>                       
                  </div>

                  <div className='name'>
                      <label className='label'>Enter Role</label>
                        <input type="text"
                         id="role"
                          className='input'
                           name='role' value={role}
                            onChange={(e) => setRole(e.target.value)}
                             placeholder="Enter Role Student/Reader"/>
                        
                  </div>

                    <div className='name'>
                        <label className='label'>EMAIL</label>    
                        <input
                          type="email"
                          name="email"
                          className='input'
                          id="email"
                          value={email}
                          //onChange={handleChange}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@test.com"
                        />
                    </div>
                    <div className='name'>
                      <label className='label'>Enter Password</label>
                        <input type="text" 
                        id="password" 
                        className='input' 
                        name='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                       
                    </div>

                    <div className='name'>
                      <label className='label'>Enter City</label>
                        <input type="text"  
                        id="address" 
                        className='input' 
                        name='address' 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter full Address"/>
                    </div>

                    <div className='date'>
                        <label className='label'>Birth Date</label>
                        <input type="date"  
                        id="dob" 
                        className='input' 
                        name='dob' 
                        value={dob} 
                        onChange={(e) => setBirthDate(e.target.value)}/>
                    </div>
                      
                    {/* <div className='name'>
                      <label className='label'>Enter Aadhar number</label>
                        <input type="text"  
                        id="aadhar" 
                        className='input' 
                        name='aadhar' 
                        value={aadhar} 
                        onChange={(e) => setAadhar(e.target.value)}
                        placeholder="Enter 12 digit Aadhar Number"/>
                    </div> */}



                    <div className='name'>
                      <label className='label'>Enter Mobile No</label>
                        <input type="number"  
                        id="mobile" 
                        className='input' 
                        name='mobile' 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter 10 digit Moblie Number"/>
                    </div>
                    <button onClick={(e) => saveUser(e)} className="submit" type="submit">Register/Update</button>
                    {/* <button type='button' className='cancel' onClick={cancelAddUser} > Back</button> */}
                    <br/>
                    <Link to="/UserList"><button className="submit">Back to List</button></Link>
              
            </form>
            </div>
           </div>
       
    )
}
export default AddUser;
