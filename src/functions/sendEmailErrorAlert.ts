import { transporter, verifyEmailTransport } from '../configurations/NodeMailer'


export const sendEmailErrorAlert = async (error: any) => {
	const mailOptions = {
		from: 'developmentwitharre@gmail.com', //TODO: change this to .env file
		to: 'developmentwitharre@gmail.com',
		subject: 'Bitup: Validate Your Account',
		text: 'error occured',
	}

	verifyEmailTransport()
	transporter.sendMail(mailOptions, (error: any, response: any) => {
		console.log('DOCUMENTING THE ERROR..............................')
		if (error) {
			console.error('there was an error: ', error)
		}
		return response.end()
	})

}