// jest.config.js
module.exports = {
  preset: "ts-jest", // Use ts-jest for handling TypeScript files
  testEnvironment: "node", // Set the testing environment to Node.js
  transformIgnorePatterns: [
    "node_modules", // Ignore node_modules except specific dependencies if needed
  ],
};
