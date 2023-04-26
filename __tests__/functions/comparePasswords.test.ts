import bcrypt from 'bcrypt'
import { comparePasswords } from '../../src/functions'

describe('comparePasswords function', () => {
	let encryptedPassword: string

	beforeAll(async () => {
		// Generate an encrypted password to use in the tests
		encryptedPassword = await bcrypt.hash('testPassword123', 10)
	})

	it('should return true for matching passwords', async () => {
		const result = await comparePasswords('testPassword123', encryptedPassword)
		expect(result).toBe(true)
	})

	it('should return false for non-matching passwords', async () => {
		const result = await comparePasswords('wrongPassword456', encryptedPassword)
		expect(result).toBe(false)
	})
})