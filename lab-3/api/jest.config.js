module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
    collectCoverage: true,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
}