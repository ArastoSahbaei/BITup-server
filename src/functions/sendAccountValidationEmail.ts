import { transporter, verifyEmailTransport } from '../configurations/NodeMailer'
import { getWebURL } from './getWebURL'

export const sendAccountValidationEmail = async (email: string, token: string) => {
	const mailOptions = {
		from: 'developmentwitharre@gmail.com', //TODO: change this to .env file
		to: email,
		subject: 'Bitup: Validate Your Account',
		text: `Please click on the following link to verify your account: ${getWebURL()}/validate/${token}`,
	}

	verifyEmailTransport()
	transporter.sendMail(mailOptions, (error: any, response: any) => {
		console.log(`SENDING EMAIL TO: ${email}`)
		if (error) {
			console.error('there was an error: ', error)
		}
		return response.end()
	})
}