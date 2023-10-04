const jwt = require("jsonwebtoken")

const generateToken = (id) =>{
    const token = jwt.sign({id},process.env.SECRET,{
        expiresIn : "15d"
    });
    return token;
}

const generateShortUUID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const generateRandom = ()=>{
  // Generate a random number between 0 and 999 (inclusive)
  const randomNum = Math.floor(Math.random() * 1000);

  // Ensure the number is exactly 3 digits long by padding with leading zeros if needed
  const formattedNum = String(randomNum).padStart(3, '0');

  return formattedNum;
}

module.exports = {generateToken, generateShortUUID,generateRandom};