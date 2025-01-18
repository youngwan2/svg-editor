import styles from './styles/App.module.css';

import { useState, useRef } from 'react';

import ShapeControls from './components/ShapeControls';
import Canvas from './components/Canvas';
import Header from './components/Header';
import Footer from './components/Footer';

import { Shape } from './types/shape.types';
import { Toaster } from 'react-hot-toast';

import { exportSVG } from './utils/shapes';

function App() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const updateShapes = (newShapes: Shape[]) => setShapes(newShapes);
  const updateSelectedShape = (shape: Shape | null) => setSelectedShape(shape);
  const canvasRef = useRef<SVGSVGElement>(null); // canvasRef 생성

  const onExportSvg = () => {
    exportSVG(canvasRef)
  }

  return (
    <div className={styles.app__container}>
      <Header />
      <Toaster
        containerStyle={{ zIndex: 100000 }}
        position="top-center"
      />

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
      <Footer />
    </div>
  )
}

export default App
