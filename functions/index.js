const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors", ({origin: true}));
admin.initializeApp();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "diegodelgadoalejandro@gmail.com",
    pass: "MasterData1976$0",
  },
});

exports.sendMail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const dest = request.query.dest;

    const mailOptions = {
      from: "Diego Delgado <noreply@diegodelgado.com>",
      to: dest,
      subject: "Inventory Report - " + (request.query.business || ""),
      html: `<p>It works!</p>`,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) { 
        return response.send(error.toString());
      }
      return response.send('Sended');
    });
  });
});
