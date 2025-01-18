import styles from './styles/App.module.css';

import { useState, useRef } from 'react';
import ShapeControls from './components/ShapeControls';
import Canvas from './components/Canvas';
import Header from './components/Header';
import { exportSVG } from './utils/shapes';

function App() {
  const [shapes, setShapes] = useState<any[]>([]);
  const [selectedShape, setSelectedShape] = useState<any | null>(null);

  const updateShapes = (newShapes: any[]) => setShapes(newShapes);
  const updateSelectedShape = (shape: any) => setSelectedShape(shape);
  const canvasRef = useRef<SVGSVGElement>(null); // canvasRef 생성

  const onExportSvg = () => {
    exportSVG(canvasRef)
  }

  return (
    <div className={styles.app__container}>
      <Header />
      <div className={styles.editor__container}>
        <ShapeControls
          shapes={shapes}
          selectedShape={selectedShape}
          setSelectedShape={updateSelectedShape}
          updateShapes={updateShapes}
          onExportSvg={onExportSvg}
        />
        <Canvas
          shapes={shapes}
          setShapes={updateShapes}
          selectedShape={selectedShape}
          setSelectedShape={updateSelectedShape}
          canvasRef={canvasRef} // canvasRef 전달
        />
      </div>
    </div>
  )
}

export default App
