/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest', // ts-jest 프리셋 사용
  testEnvironment: 'jsdom', // React 컴포넌트 테스트를 위한 브라우저 환경 설정
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'], // 테스트 파일 매칭
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // CSS 모듈 매핑
    '^@/(.*)$': '<rootDir>/src/$1', // Alias 설정 (선택 사항)
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Jest 초기화 파일 설정
};