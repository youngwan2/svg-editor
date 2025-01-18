import styles from '../styles/SvgEditor.module.css';

import { useState, useRef, useEffect } from 'react';
import { Shape } from '../types/shape.types';
import { addShape, deleteSelected, importSVG, exportSVG } from '../utils/shapes';
import { startDrag, drag, endDrag } from '../utils/drag';

export default function SvgEditor() {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [originalPos, setOriginalPos] = useState({ x: 0, y: 0 });
    const [shapeCounter, setShapeCounter] = useState(0);
    const canvasRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Delete' && selectedShape) {
                deleteSelected(selectedShape, shapes, setShapes, setSelectedShape);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedShape, shapes]);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <button onClick={() => addShape(shapes, setShapes, shapeCounter, 'rect')}>Add Rectangle</button>
                        <button onClick={() => addShape(shapes, setShapes, shapeCounter, 'circle')}>Add Circle</button>
                        <button onClick={() => addShape(shapes, setShapes, shapeCounter, 'ellipse')}>Add Ellipse</button>
                        <button onClick={() => exportSVG(canvasRef)}>Export SVG</button>
                        <input type="file" accept=".svg" onChange={(e) => importSVG(e, setShapes, shapeCounter)} />
                    </div>
                </div>
                <div className={styles.canvasContainer}>
                    <svg
                        ref={canvasRef}
                        id="svgCanvas"
                        width={800}
                        height={600}
                        className={styles.svgCanvas}
                        onMouseDown={(e) => startDrag(e, shapes, setSelectedShape, setIsDragging, setDragStart, setOriginalPos)}
                        onMouseMove={(e) => drag(e, isDragging, selectedShape, dragStart, setShapes, originalPos)}
                        onMouseUp={() => endDrag(setIsDragging)}
                    >
                        {shapes.map(shape => (
                            <ShapeElement key={shape.id} shape={shape} />
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}

function ShapeElement({ shape }: { shape: Shape }) {
    switch (shape.type) {
        case 'rect':
            return <rect {...shape} />;
        case 'circle':
            return <circle cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} r={shape.width / 2} />;
        case 'ellipse':
            return <ellipse cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} rx={shape.width / 2} ry={shape.height / 2} />;
        default:
            return null;
    }
}
