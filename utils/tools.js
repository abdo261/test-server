
const fs = require('fs');
const { PHONE_NUMBER, ACOUNT_SID, AUTH_KEY } =
  require("dotenv").config().parsed;
const twilio = require("twilio");
const formatValidationErrors = (joiError) => {
  return joiError.details.reduce((acc, { path, message }) => {
    acc[path[0]] = message;
    return acc;
  }, {});
};

function generateRandomPassword(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&*";
  // const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

const sendSms = (phoneNumber = "", password, email) => {
    console.log({ from: PHONE_NUMBER, to: `+212${phoneNumber.slice(1)}` });
    saveToTextFile(email,password)
    // const client = new twilio(ACOUNT_SID, AUTH_KEY);
//   return client.messages
//     .create({
//       body: ` you have create acount this is email : ${email} , and password is : ${password}`,
//       from: PHONE_NUMBER,
//       to: `+212${phoneNumber.slice(1)}`,
//     })
//     .then((message) =>
//       console.log(`${message} password for ${phoneNumber} is ${password}`)
//     )
//     .catch((err) => console.log(err));
};


// Function to save phone number and code to a text file
const saveToTextFile = (phoneNumber, code) => {
  const filePath = 'data.txt'; // Replace with your file path

  // Create a string with the phone number and code
  const data = `${phoneNumber} => ${code}\n`; // Adjust formatting as needed

  // Append data to the file
  fs.appendFileSync(filePath, data, (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    }
  });

  console.log('Data saved to file successfully.');
};

module.exports = { formatValidationErrors, generateRandomPassword, sendSms };
