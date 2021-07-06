const { default: Axios } = require("axios");

class EmailService {
  constructor() {
    let service = Axios.create({
      baseURL: process.env.API_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.service = service;
  }

  sendResetPasswordEmail = (email) => {
    return this.service
      .post("/email/resetPassword", {
        email,
      })
      .then((res) => res.data);
  };
}

export default EmailService;