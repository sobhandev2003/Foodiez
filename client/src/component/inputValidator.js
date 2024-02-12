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
//NOTE - validate image type
export const validateImgType=(imgType)=>{
 
const imgTypes=["image/jpeg","image/png"];
return imgTypes.includes(imgType);
}
//NOTE - validate maximum words
export const validateWords=(value,numberOfWord=2)=>{
  // Split the address into words
  const words = value.trim().split(/\s+/);
  // Check if the address has exactly two words
  return words.length <= numberOfWord;
}

export const isValidMongoObjectId=(id)=> {
  if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
    return true;
  }
  return false;
}
// module.exports={validateEmail,validatePhoneNumber,validatePassword,validateImgType}