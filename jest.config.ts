module.exports = {
	// ...
	testEnvironment: 'node',
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^tests/(.*)$': '<rootDir>/tests/$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { /* ts-jest config goes here in Jest */ }],
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.mjs$': 'babel-jest',
	},
	// ...
	globals: {
		'ts-jest.transform': {
			// ...
		},
	},
}