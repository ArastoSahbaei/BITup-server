import { transporter, verifyEmailTransport } from '../configurations/NodeMailer'

export const sendAccountValidationEmail = async (email: string) => {
	const mailOptions = {
		from: 'developmentwitharre@gmail.com',
		to: `${email}`,
		subject: 'Bitup: Validate Your Account',
		text:
			'Validate your account fool'
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