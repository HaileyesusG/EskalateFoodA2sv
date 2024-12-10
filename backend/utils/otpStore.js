const otpStore = {};

module.exports = {
  otpStore,
  setOtp: (email, otpData) => {
    otpStore[email] = otpData;
  },
  getOtp: (email) => otpStore[email],
  deleteOtp: (email) => {
    delete otpStore[email];
  },
};
