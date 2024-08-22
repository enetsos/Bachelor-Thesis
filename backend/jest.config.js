module.exports = {
    preset: 'ts-jest', // Utilizza ts-jest per eseguire i file TypeScript
    testEnvironment: 'node', // Specifica l'ambiente di test (node è comune per backend)
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Pattern per identificare i file di test
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Estensioni dei file supportate
  };