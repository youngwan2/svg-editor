/**
 * Jest configuration to handle CSS and static files.
 * 
 * Jest cannot process non-JavaScript files like CSS or static assets (images, fonts, etc.)
 * by default. If these files are imported into your code (e.g., in a React component),
 * Jest will throw errors when running tests. 
 * 
 * To avoid these issues, mock files are used:
 * - **CSS Files**: Mocked as an empty object or `identity-obj-proxy` to prevent errors.
 * - **Static Files**: Mocked as a simple string (`'test-file-stub'`) to simulate file imports.
 * 
 * This approach simplifies the testing environment by replacing unneeded files with
 * placeholders, allowing tests to focus only on the JavaScript logic.
 * 
 * @reason Jest is optimized for testing JavaScript logic, not styles or assets.
 * @example
 * // Mock CSS file:
 * moduleNameMapper: {
 *   '\\.(css|scss)$': 'identity-obj-proxy',
 * }
 * 
 * // Mock static file:
 * moduleNameMapper: {
 *   '\\.(jpg|png)$': '<rootDir>/__mocks__/fileMock.js',
 * }
 */

/**
 * Jest 설정에서 CSS 및 정적 파일을 처리하는 이유.
 * 
 * Jest는 기본적으로 CSS나 정적 파일(이미지, 폰트 등)을 처리할 수 없다.
 * React 컴포넌트에서 이러한 파일을 import할 경우, Jest는 테스트 실행 시 에러를 발생시킨다.
 * 
 * 이를 방지하기 위해 모의(Mock) 파일을 사용한다.
 * - CSS 파일: 빈 객체나 `identity-obj-proxy`로 Mock 처리하여 Jest가 에러를 내지 않도록 한다.
 * - 정적 파일: 간단한 문자열(`'test-file-stub'`)로 Mock 처리하여 파일 import를 대체한다.
 * 
 * 이 방식은 테스트 환경을 단순화하고, 스타일이나 에셋이 아닌 JavaScript 로직 테스트에 집중할 수 있도록 돕는다.
 * 
 * @reason Jest는 JavaScript 로직 테스트에 최적화되어 있으며, 스타일이나 에셋은 테스트의 핵심이 아니다.
 * @example
 * // CSS 파일 Mock 처리:
 * moduleNameMapper: {
 *   '\\.(css|scss)$': 'identity-obj-proxy',
 * }
 * 
 * // 정적 파일 Mock 처리:
 * moduleNameMapper: {
 *   '\\.(jpg|png)$': '<rootDir>/__mocks__/fileMock.js',
 * }
 */
module.exports = {};
