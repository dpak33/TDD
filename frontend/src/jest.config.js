module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.svg$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jsdom',
};
