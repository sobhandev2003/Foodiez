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
 
return passwordRegex.test(password);
}

const validateImgType=(imgType)=>{
  
const imgTypes=["image/jpeg","image/png"];
return imgTypes.includes(imgType);
}
//NOTE -  fixed number of words validate
const wordsValidator=(value,numberOfWord=2)=>{
  // Split the address into words
  const words = value.trim().split(/\s+/);
  // Check if the address has exactly two words
  return words.length <= numberOfWord;
}
module.exports={validateEmail,validatePhoneNumber,validatePassword,validateImgType,wordsValidator}