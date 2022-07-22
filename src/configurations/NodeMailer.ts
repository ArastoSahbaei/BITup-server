import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()
const {
	EMAIL_PW
} = process.env

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'developmentwitharre@gmail.com',
		pass: EMAIL_PW,
	}
})

export const verifyEmailTransport = () => {
	transporter.verify(function (error: any, success: any) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email transporter ready: ' + success)
		}
	})
}