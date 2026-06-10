export default {
  routes: [
    {
      method: "POST",
      path: "/client/register",
      handler: "signup.register",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/client/verify-email",
      handler: "signup.verifyEmail",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/client/login",
      handler: "signup.login",
      config: {
        auth: false,
      },
    },
  ],
};