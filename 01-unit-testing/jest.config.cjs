module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { // Responsável por permitir .js nas importações de teste
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
