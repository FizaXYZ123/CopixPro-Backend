export default {
  routes: [
    {
      method: "GET",
      path: "/purchase-payment",
      handler: "purchase.getLatestPurchase",
      config: {
        auth: {},
      },
    },
  ],
};