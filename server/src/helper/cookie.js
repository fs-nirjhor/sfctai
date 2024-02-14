const { clientUrl } = require("../secret");

//TODO: secure cookies not work in postman but work in browser well. need 4 change in this file
const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("access_token", accessToken, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 3 days
    httpOnly: true,
    secure: true, // not include in headers
    sameSite: "none", // none: call from multiple addresses
  });
};
  
module.exports = { setAccessTokenCookie };
