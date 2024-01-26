//SECTION - validate Email addrees
 const  emilRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 export const validateEmail=(email)=> {
   return emilRegex.test(email);
}

//SECTION - validate phone number
const phoneNumberRegex = /^\d{10}$/;  

export const validatePhoneNumber = (phoneNumber) => {
   
 return phoneNumberRegex.test(phoneNumber);
};
//SECTION - validate password
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;
export const validatePassword=(password)=>{

return passwordRegex.test(password);
}

export const validateImgType=(imgType)=>{
 
const imgTypes=["image/jpeg","image/png"];
return imgTypes.includes(imgType);
}
// module.exports={validateEmail,validatePhoneNumber,validatePassword,validateImgType}