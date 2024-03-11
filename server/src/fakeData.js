// fake data for seeding

const fakeData = {
  users: [
    {
      name: "SFCTAI",
      loginPassword:
        "$2a$10$73gynJYOiWWv9SLTwpFO5ehoLX05je.n6Wwf4pXBHJghGZ/RNRxh2",
      withdrawalPassword:
        "$2a$10$SaCo7/./5SbHtNllP6RPau9wP87LFDKF5UmJccZeM9fz5r6x797gm",
      phone: "12345678",
      invitedBy: "659418a59265b59000175731",
      invitationCode: "SFCTAI",
      trc20Address: "",
      team: {
        level1: [],
        level2: [],
        level3: [],
      },
      transaction: {
        balance: 0,
        todaysIncome: 0,
        totalIncome: 0,
        todaysTeamIncome: 0,
        todaysRecharge: 0,
        totalRecharge: 0,
        todaysWithdraw: 0,
        totalWithdraw: 0,
        todaysOrder: 0,
        todaysOrderAmount: 0,
        totalOrderAmount: 0,
        isOrderPending: false,
        lastResetTimestamp: "2024-01-14T18:15:20.305+00:00",
      },
      isAdmin: true,
      isBanned: false,
      userId: "12345678",
    },
  ],
  configuration: [
    {
      transferAddress: "TSarEYNTV9eupDFfGGLf9oHMVnTRNxs9E6",
      minimumRecharge: 10, // USDT
      minimumWithdraw: 6, // USDT
      withdrawFee: 3, // %
      monthlyProfit: 2.3, // %
      orderPerDay: 4, // per day
      level1Commission: 14, // %
      level2Commission: 7, // %
      level3Commission: 4, // %
    },
  ],
};

module.exports = fakeData;
