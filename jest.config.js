module.exports = {
    preset: "ts-jest",
    testEnvironment: 'node',
    coverageReporters: ["html", "lcov", "text"],
    coverageDirectory: "<rootDir>/coverage",
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
    modulePathIgnorePatterns: [
        "<rootDir>/build"
    ]
};