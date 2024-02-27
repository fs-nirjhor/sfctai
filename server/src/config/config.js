// website configuration
const path = require("path");

const transferAddress = "TSarEYNTV9eupDFfGGLf9oHMVnTRNxs9E6&778jhjhHHuyi";

const minimumRecharge = 10; // USDT

const minimumWithdraw = 6; // USDT
const withdrawFee = 3; // %
const withdrawTime = "09:00 to 21:00 United Kingdom";

const monthlyProfit = 2.3 // %
const orderPerDay = 4; // per day

const level1Commission = 14; // %
const level2Commission = 7; // %
const level3Commission = 4; // %

const defaultUserImagePath = "/images/avatar/avatar1.png";

const mainDirectory = path.dirname(require.main.filename);


module.exports = {
  defaultUserImagePath,
  minimumWithdraw,
  withdrawFee,
  minimumRecharge,
  withdrawTime,
  monthlyProfit,
  orderPerDay,
  level1Commission,
  level2Commission,
  level3Commission,
  transferAddress,
  mainDirectory
};
