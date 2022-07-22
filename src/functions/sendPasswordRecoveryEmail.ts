import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import StatusCode from '../configurations/StatusCode'

dotenv.config()
const {
	EMAIL,
	CLIENT_ID,
	CLIENT_SECRET,
	REFRESH_TOKEN,
} = process.env

export const sendPasswordRecoveryEmail = async (databaseResponse: any, token: any) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'developmentwitharre@gmail.com',
			pass: 'developmentwitharre123'
		}
	})

	const mailOptions = {
		from: 'developmentwitharre@gmail.com',
		to: `${databaseResponse.email}`,
		subject: 'Link To Reset Password',
		text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
      + `http://localhost:3000/reset/${token}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
	}

	console.log(`SENDING EMAIL TO: ${databaseResponse.email}`)

	transporter.sendMail(mailOptions, (error: any, response: any) => {
		if (error) {
			console.error('there was an error: ', error)
		} else {
			console.log('here is the response: ', response)
			response.status(StatusCode.OK).send(response)
		}
	})
}