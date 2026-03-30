import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^next-intl$': '<rootDir>/__mocks__/next-intl.ts',
    '^next-intl/(.*)$': '<rootDir>/__mocks__/next-intl.ts',
    '^next/image$': '<rootDir>/__mocks__/next/image.tsx',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};

export default config;