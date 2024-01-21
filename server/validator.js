//SECTION - validate Email addrees
 const  emilRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const validateEmail=(email)=> {
    return emilRegex.test(email);
}

//SECTION - validate phone number
 const phoneNumberRegex = /^\d{10}$/;  

 const validatePhoneNumber = (phoneNumber) => {
    
  return phoneNumberRegex.test(phoneNumber);
};
//SECTION - validate password
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;
const validatePassword=(password)=>{
  // console.log(password);
return passwordRegex.test(password);
}
module.exports={validateEmail,validatePhoneNumber,validatePassword}