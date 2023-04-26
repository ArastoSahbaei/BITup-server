import { generateUUID } from 'src/functions'

test('generateUUID should return a string with the correct format', () => {
	const uuid = generateUUID()
	const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[a-f\d]{4}-[a-f\d]{12}$/i

	expect(typeof uuid).toBe('string')
	expect(uuid).toMatch(uuidRegex)
})