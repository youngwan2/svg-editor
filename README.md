# 단순한 SVG 에디터

React와 TypeScript로 구축한 간단한 SVG 에디터로, 사용자가 사각형, 원, 타원형을 그릴 수 있으며, 드래그로 이동하고, 가져오기 및 내보내기 기능을 제공합니다. 또한, 선택한 도형을 삭제하거나 수정할 수 있습니다.
![image](https://github.com/user-attachments/assets/5445ff52-8cf2-4c55-bbaf-19607a163515)

## 기능

- 도형 추가: 사각형, 원, 타원형.
- 도형을 드래그하여 캔버스에서 이동.
- "Delete" 키를 이용해 선택한 도형 삭제.
- SVG 파일을 가져와 캔버스에 도형 추가.
- 캔버스 전체를 SVG로 내보내고 클립보드에 복사.

## 시작하기

### 필수 조건

Node.js 및 npm (또는 Yarn)이 설치되어 있어야 합니다.
React와 TypeScript에 대한 기본적인 이해가 필요합니다.

### 설치 방법

리포지토리를 클론:

```bash
git clone https://github.com/yourusername/svg-editor.git
cd svg-editor
```

의존성 설치:

```bash
npm install
```

개발 서버 실행:

```bash
npm start
```

애플리케이션은 http://localhost:3000에서 사용할 수 있습니다.

## 폴더 구조

```
<-- Temp -->
src/
├── components/
│ └── SvgEditor.tsx # 메인 SVG 에디터 컴포넌트
├── App.tsx # 루트 컴포넌트
├── index.tsx # React 진입점
└── styles.css # 전역 스타일

```

## 사용법

### 간단 사용법

앱이 실행되면 다음을 할 수 있습니다.

- "Add Rectangle", "Add Circle", "Add Ellipse" 버튼을 클릭하여 각각 사각형, 원, 타원형 도형을 캔버스에 추가합니다.
- 도형을 클릭한 후 드래그하여 위치를 이동시킬 수 있습니다.
- "Delete" 키를 눌러 선택한 도형을 캔버스에서 삭제할 수 있습니다.
- 파일 입력을 통해 SVG 파일을 가져올 수 있습니다 (.svg 파일 지원).
- "Export SVG" 버튼을 클릭하여 현재 SVG 캔버스를 클립보드에 복사할 수 있습니다.

### 주요 코드 함수

- addShape(type: 'rect' | 'circle' | 'ellipse'): 새로운 도형(사각형, 원, 타원형)을 캔버스에 추가합니다.
- startDrag(e: React.MouseEvent<SVGElement>): 도형을 클릭하면 드래그를 시작합니다.
  drag(e: React.MouseEvent): 사용자가 드래그할 때 도형의 위치를 업데이트합니다.
- endDrag(): 드래그 작업을 종료합니다.
- importSVG(event: React.ChangeEvent<HTMLInputElement>): SVG 파일을 가져와 도형을 캔버스에 추가합니다.
- exportSVG(): 현재 캔버스를 SVG 코드로 복사하여 클립보드에 저장합니다.
- createSVGElement(shape: Shape): 도형 객체를 대응하는 SVG 요소(사각형, 원, 타원형)로 변환합니다.

## 라이선스

- 자유 입니다.
