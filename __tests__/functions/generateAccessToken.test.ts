import jwt from 'jsonwebtoken'
import { generateAccessToken, getEnviromentBased_authenticationSecret } from 'src/functions'

jest.mock('jsonwebtoken')

describe('generateAccessToken', () => {
	it('should call jwt.sign with the correct arguments', () => {
		const email = 'test@example.com'
		const expectedToken = 'fake_token'

		// Manually create a Jest mock function for jwt.sign
		const signMock = jest.fn().mockReturnValueOnce(expectedToken)
		jwt.sign = signMock

		// Call generateAccessToken
		const token = generateAccessToken(email)

		// Check that jwt.sign was called with the correct arguments
		expect(signMock).toHaveBeenCalledWith({ email }, getEnviromentBased_authenticationSecret(), { expiresIn: '1h' })

		// Check that the generated token matches the expected token
		expect(token).toEqual(expectedToken)
	})
})