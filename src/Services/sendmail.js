require("dotenv").config();
const nodemailer = require("nodemailer");

const SendEstimationPriceMail = (email, price) => {
    try {

        const auth = nodemailer.createTransport({
            service: process.env.NODEMAILER_SERVICE,
            secure: true,
            port: process.env.NODEMAILER_PORT,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });



        const reciver = {
            from: "raheelsh653@gmail.com",
            to: email,
            subject: "Estimation Price From Pak Car Bazaar",
            text: `Your Estimation price is ${price}`
        }

        auth.sendMail(reciver, (error, emailresponse) => {
            if (error) {

                throw error;
            }
            console.log("success");

        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = SendEstimationPriceMail;