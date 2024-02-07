const createRandomString = (length = 7) => {
    const pattern = /[A-Za-z1-9]/;
    let result = "";
    for (var i = 0; i < length; i++) {
      var char = String.fromCharCode(Math.floor(Math.random() * 256));
      if (pattern.test(char)) {
        result += char;
      } else {
        i--;
      }
    }
    return result;
  }

  const createRandomNumber = (length) => {
    let randomNumber = "";
    for (let i = 0; i < length; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return Number(randomNumber);
  }
  
module.exports = {createRandomString, createRandomNumber};


  