import bcrypt from 'bcrypt'
import { encryptPassword } from 'src/functions'

jest.mock('bcrypt', () => ({
	hash: jest.fn(() => 'hashedPassword'),
}))

describe('encryptPassword', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should call bcrypt.hash with the correct arguments', () => {
		const mockPassword = 'password123'
		encryptPassword(mockPassword)

		expect(bcrypt.hash).toHaveBeenCalledTimes(1)
		expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, expect.any(Number))
	})

	it('should return the hashed password', () => {
		const mockPassword = 'password123'
		const hashedPassword = encryptPassword(mockPassword)

		expect(hashedPassword).toBe('hashedPassword')
	})
})