import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import staffService from "../services/staff.service";
import { toast, ToastContainer } from "react-toastify";
const AddStaff = () => {
 
  const[first_name, setName] = useState('');
  const[dob, setDOB] = useState('');
  const[bonus, setBonus] = useState('');
  const[dept, setDept] = useState('');
  const[yr_experience, setExperience] = useState('');
  const[join_date, setJoinDate] = useState('');
  const[salary, setSalary] = useState('');
  const[middle_name, setMiddle] = useState('');
  const[last_name, setLast] = useState('');
  const[address, setAddress] = useState('');
  const[gender, setGender] = useState('');
  const[mobile, setMobile] = useState('');
  const[leaving_date, setLeaveDate] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[aadhar, setAadhar] = useState('');
  const history = useHistory();
    const {id} = useParams();

    const saveStaff = (e) => {
        e.preventDefault();
        
        const staff = {id,first_name,middle_name,last_name,gender,address,mobile,dept,dob,join_date,yr_experience,salary,bonus,leaving_date,email,password,aadhar};
        if (id) {
            //update
            staffService.update(staff)
                .then(response => {
                    console.log('user data updated successfully', response.data);
                    toast("Staff registered  successfuly");
                    history.goBack();
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            //create
            staffService.create(staff)
            .then(response => {
                console.log("user added successfully", response.data);
                toast("Staff registered  successfuly");
                history.goBack();
            })
            .catch(error => {
                console.log('something went wroing', error);
            })
        }
    }


      useEffect(() => {
      if (id) {
        staffService.get(id)
              .then(staff => {
              // id,first_name,middle_name,last_name,gender,address,mobile,dept,dob,join_date,yr_experience,salary,bonus
                
                setName(staff.data.first_name);
                setMiddle(staff.data.middle_name);
                setLast(staff.data.last_name);
                setGender(staff.data.gender);
                setAddress(staff.data.address);

                setMobile(staff.data.mobile);
                setDept(staff.data.dept);
                setDOB(staff.data.dob);

                setJoinDate(staff.data.join_date);
                setExperience(staff.data.yr_experience);
                setSalary(staff.data.salary);
                setBonus(staff.data.bonus);
                setLeaveDate(staff.data.leaving_date);
                setEmail(staff.data.email);
                setPassword(staff.data.password);
                setAadhar(staff.data.aadhar);

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
         
            <div >
            <div>
            <h2 className='title'> Register as Staff</h2>
          </div>
            <form >
            <div className='name'>
                       <label className='label'>Enter First Name</label>
                         <input type="text"
                        id="first_name"
                         className='input' 
                         name='first_name'
                         value={first_name}
                         onChange={(e) => setName(e.target.value)}
                         placeholder="Enter First Name"/>
                       
                      </div>

                      <div className='name'>
                       <label className='label'>Enter Middle Name</label>
                         <input type="text"
                        id="middle_name"
                         className='input' 
                         name='middle_name'
                         value={middle_name}
                         onChange={(e) => setMiddle(e.target.value)}
                         placeholder="Enter Middle Name"/>
                       
                      </div>

                      <div className='name'>
                       <label className='label'>Enter Last Name</label>
                         <input type="text"
                        id="last_name"
                         className='input' 
                         name='last_name'
                         value={last_name}
                         onChange={(e) => setLast(e.target.value)}
                         placeholder="Enter Last Name"/>
                       
                      </div>

                      <div className='name'>
                      <label className='label'>Enter Gender</label>
                        <input type="text"
                         id="gender"
                          className='input'
                           name='gender' value={gender}
                            onChange={(e) => setGender(e.target.value)}
                             placeholder="Enter gender"/>
                        
                      </div>

                      <div className='name'>
                      <label className='label'>Enter Address</label>
                        <input type="text"  
                        id="address" 
                        className='input' 
                        name='address' 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter full Address"/>
                        
                      </div>
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
                      <div className='name'>
                      <label className='label'>Enter Department</label>
                        <input type="text"  
                        id="dept" 
                        className='input' 
                        name='dept' 
                        value={dept} 
                        onChange={(e) => setDept(e.target.value)}
                        placeholder="Enter Library Dept you work"/>
                       
                      </div>
                      <div className='date'>
                        <label className='label'>Date of Birth</label>
                        <input type="date"  
                        id="dob" 
                        className='input' 
                        name='dob' 
                        value={dob} 
                        onChange={(e) => setDOB(e.target.value)}/>
                    </div>
                    <div className='date'>
                        <label className='label'>Join Date</label>
                        <input type="date"  
                        id="join_date" 
                        className='input' 
                        name='join_date' 
                        value={join_date} 
                        onChange={(e) => setJoinDate(e.target.value)}/>
                    </div>

                    <div className='name'>
                      <label className='label'>Enter Year of Experience</label>
                        <input type="number"  
                        id="yr_experience" 
                        className='input' 
                        name='yr_experience' 
                        value={yr_experience} 
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Enter year of experience you have"/>
                        
                      </div>

                      <div className='name'>
                      <label className='label'>Enter Salary</label>
                        <input type="number"  
                        id="salary" 
                        className='input' 
                        name='salary' 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Enter Salary you Offered"/>
                       
                      </div>
                      
                       <div className='name'>
                      <label className='label'>Enter Bonus</label>
                        <input type="number"  
                        id="bonus" 
                        className='input' 
                        name='bonus' 
                        value={bonus} 
                        onChange={(e) => setBonus(e.target.value)}
                        placeholder="Enter Bonus Offered"/>
                       
                      
                      
                      </div>

                      <div className='date'>
                        <label className='label'>Leaving Date</label>
                        <input type="date"  
                        id="leaving_date" 
                        className='input' 
                        name='leaving_date' 
                        value={leaving_date} 
                        onChange={(e) => setLeaveDate(e.target.value)}/>
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
                      
                      
                      
                   
                        
                      
                     
                <div >
                  
                    <button onClick={(e) => saveStaff(e)} className="submit" type="submit">Register</button>
                    {/* <button type='button' className='cancel' onClick={cancelAddUser} > Back</button> */}<br/>
                    <Link to="/StaffList"><button className="submit">Back to List</button></Link>
                </div>
            </form>
            </div>
           
        </div>
    )
}
export default AddStaff;
