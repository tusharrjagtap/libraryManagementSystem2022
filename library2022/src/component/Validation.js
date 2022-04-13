const Validation = (values) => {
    let errors={};
    //validating username
if(!values.email){
    errors.email="Email is required";
}else if(!/\S+@\S+\.\S+/.test(values.email)){
    errors.email="Invalid Username"
}//validating pssword
if(!values.password){
    errors.password="Password is required"
}else if(values.password.length > 6 ){
    errors.password="Password length should be more than 6"
}
//validating customer name
// if(!values.name){
//     errors.name="Name required"
// }
// if(!values.address){
//     errors.address="Address required"
// }
// if(!values.mobile){
//     errors.mobile="Mobile number is required"
// }
    return errors;
};

export default Validation;

