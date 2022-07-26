import { transporter, verifyEmailTransport } from '../configurations/NodeMailer'
import { determineBaseURL } from './determineBaseURL'

export const sendAccountValidationEmail = async (email: string, token: string) => {
	const mailOptions = {
		from: 'developmentwitharre@gmail.com',
		to: `${email}`,
		subject: 'Bitup: Validate Your Account',
		text: `Please click on the following link to verify your account: ${determineBaseURL()}/validate/${token}`,
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