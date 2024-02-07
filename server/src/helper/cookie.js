const { clientUrl } = require("../secret");

//TODO: secure cookies not work in postman but work in browser well. need 4 change in this file
const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("access_token", accessToken, {
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    httpOnly: true,
    secure: true, // not include in headers
    sameSite: "none", // none: call from multiple addresses
  });
};
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
