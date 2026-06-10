export default {
  routes: [
    {
  method: "POST",
  path: "/client/forgot-password",
  handler: "forgot-password.forgotPassword",
  config: { auth: false },
},
{
  method: "POST",
  path: "/client/verify-reset-otp",
  handler: "forgot-password.verifyResetOtp",
  config: { auth: false },
},
{
  method: "POST",
  path: "/client/resend-otp",
  handler: "forgot-password.resendOtp",
  config: { auth: false },
},
{
  method: "POST",
  path: "/client/reset-password",
  handler: "forgot-password.resetPassword",
  config: { auth: false },
},
  ]}