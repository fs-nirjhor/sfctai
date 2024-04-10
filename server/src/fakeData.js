// fake data for seeding

const fakeData = {
  configuration: [
    {
      transferAddress: "TKhcwK1YQtiQ8W68JF9Mste4rtCN2DtqDV",
      minimumRecharge: 10, // USDT
      minimumWithdraw: 6, // USDT
      withdrawFee: 3, // %
      monthlyProfit: 2.3, // %
      orderPerDay: 4, // per day
      level1Commission: 14, // %
      level2Commission: 7, // %
      level3Commission: 4, // %
      canMessage: true,
      canOrder: true,
      canWithdraw: true,
    },
  ],
};

module.exports = fakeData;
